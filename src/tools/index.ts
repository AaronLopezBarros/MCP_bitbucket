import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createPullRequestAuto } from "./createPullRequestAuto";
import { listPullRequest } from "./ListPullRequest";
import { preparePullRequestAuto } from "./preparePullRequestAuto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const tools = [createPullRequestAuto, preparePullRequestAuto, listPullRequest];

export const registerTools = (server: McpServer) => {
  for (const tool of tools) {
    server.tool(tool.name, tool.description, tool.inputSchema, tool.run);
  }
};
