# MCP Bitbucket Server

An MCP (Model Context Protocol) server to interact with Bitbucket through automated tools.

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd bitbucket
```

### 2. Install dependencies

**Option A: With pnpm (recommended)**

```bash
pnpm install
```

**Option B: With npm**

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root with your Bitbucket credentials:

```env
BITBUCKET_USERNAME=your_username
BITBUCKET_APP_PASSWORD=your_app_password
BITBUCKET_WORKSPACE=your_workspace
```

## MCP Configuration

Add the following configuration to your MCP settings file (usually in `~/.config/mcp/settings.json` or similar):

```json
{
  "mcpServers": {
    "bitbucket": {
      "command": "npx",
      "args": ["tsx", "/full/path/to/project/src/server.ts"],
      "env": {
        "BITBUCKET_USERNAME": "your_username",
        "BITBUCKET_APP_PASSWORD": "your_app_password",
        "BITBUCKET_WORKSPACE": "your_workspace"
      }
    }
  }
}
```

**Note:** Replace `/full/path/to/project` with the absolute path where you have cloned this project.

## Usage

Once configured, you can use the following tools from your MCP client:

- **Create Pull Request**: Automatically create pull requests
- **List Pull Requests**: View all pull requests in the repository
- **Prepare Pull Request**: Automatically generate titles and descriptions for pull requests

## Development

To run the server in development mode:

**With pnpm:**

```bash
pnpm run inspector
```

**With npm:**

```bash
npm run inspector
```

## Requirements

- Node.js 18+
- pnpm or npm
- Bitbucket account with App Password configured
