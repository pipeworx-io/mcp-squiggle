interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * Squiggle MCP — AFL fixture / results / tips.
 *
 * Auth: none. ToS asks for a descriptive UA with contact.
 * Docs: https://api.squiggle.com.au
 */


const BASE = 'https://api.squiggle.com.au';
const UA = 'pipeworx-mcp-squiggle/1.0 (contact: ops@pipeworx.io; +https://pipeworx.io)';

const tools: McpToolExport['tools'] = [
  {
    name: 'teams',
    description: 'Team list.',
    inputSchema: {
      type: 'object',
      properties: { year: { type: 'number' } },
    },
  },
  {
    name: 'games',
    description: 'Fixture + results.',
    inputSchema: {
      type: 'object',
      properties: {
        year: { type: 'number' },
        round: { type: 'number' },
        complete: { type: 'boolean', description: 'Filter to completed games.' },
      },
    },
  },
  {
    name: 'standings',
    description: 'Ladder.',
    inputSchema: {
      type: 'object',
      properties: {
        year: { type: 'number' },
        round: { type: 'number' },
      },
    },
  },
  {
    name: 'sources',
    description: 'Registered tipping sources.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'tips',
    description: 'Tips per game per source.',
    inputSchema: {
      type: 'object',
      properties: {
        year: { type: 'number' },
        round: { type: 'number' },
        source: { type: 'number', description: 'Source id (from /sources).' },
      },
    },
  },
  {
    name: 'ladder',
    description: 'Projected ladder per source.',
    inputSchema: {
      type: 'object',
      properties: {
        year: { type: 'number' },
        round: { type: 'number' },
        source: { type: 'number' },
      },
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams({ q: name });
  for (const [k, v] of Object.entries(args)) {
    if (v == null) continue;
    if (typeof v === 'boolean') params.set(k, v ? '1' : '0');
    else params.set(k, String(v));
  }
  const res = await fetch(`${BASE}?${params}`, { headers: { Accept: 'application/json', 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Squiggle: ${res.status} ${await res.text().then((t) => t.slice(0, 200))}`);
  return res.json();
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
