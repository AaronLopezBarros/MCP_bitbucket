import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTools } from "./tools/index.js";

// Server
// Manage the communication between the client and the server
const server = new McpServer({
  name: "Bitbucket server",
  version: "1.0.0",
  capabilities: {
    tools: {},
  },
});

// Tools
// The tools allow LLM to do actions on the server
registerTools(server);

// Listen to the client
const transport = new StdioServerTransport();
await server.connect(transport);
