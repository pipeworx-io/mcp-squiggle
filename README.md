# @pipeworx/squiggle

[Squiggle](https://api.squiggle.com.au) MCP — AFL (Australian Football League) fixture, results, ladder, and crowd-sourced tips. Keyless.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

- `teams(year?)` — team list
- `games(year?, round?, complete?)` — fixture + results
- `standings(year?, round?)` — ladder
- `sources()` — registered tipping sources
- `tips(year?, round?, source?)` — tips per game per source
- `ladder(year?, round?, source?)` — projected ladder per source

## Data source

`https://api.squiggle.com.au` (Squiggle ToS asks for a descriptive UA).

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "squiggle": {
      "url": "https://gateway.pipeworx.io/squiggle/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Squiggle data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
