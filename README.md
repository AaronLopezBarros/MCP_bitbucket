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
BITBUCKET_EMAIL=your_email@example.com
BITBUCKET_API_TOKEN=your_api_token
BITBUCKET_WORKSPACE=your_workspace
BITBUCKET_REVIEWER_UUID=reviewer_uuid_optional
BITBUCKET_API_BASE_URL=https://api.bitbucket.org/2.0
BITBUCKET_DEFAULT_DESTINATION_BRANCH=develop
BITBUCKET_CLOSE_SOURCE_BRANCH=true
```

**Variable descriptions:**

- `BITBUCKET_EMAIL`: Your Bitbucket account email
- `BITBUCKET_API_TOKEN`: Your Bitbucket App Password (not your regular password)
- `BITBUCKET_WORKSPACE`: Your Bitbucket workspace name
- `BITBUCKET_REVIEWER_UUID`: (Optional) UUID of a default reviewer for pull requests
- `BITBUCKET_API_BASE_URL`: (Optional) Base URL for Bitbucket API (default: https://api.bitbucket.org/2.0)
- `BITBUCKET_DEFAULT_DESTINATION_BRANCH`: (Optional) Default destination branch for pull requests (default: develop)
- `BITBUCKET_CLOSE_SOURCE_BRANCH`: (Optional) Whether to close source branch after merge (default: true)

## MCP Configuration

Add the following configuration to your MCP settings file (usually in `~/.config/mcp/settings.json` or similar):

```json
{
  "mcpServers": {
    "bitbucket": {
      "command": "npx",
      "args": ["tsx", "/full/path/to/project/src/server.ts"],
      "env": {
        "BITBUCKET_EMAIL": "your_email@example.com",
        "BITBUCKET_API_TOKEN": "your_api_token",
        "BITBUCKET_WORKSPACE": "your_workspace",
        "BITBUCKET_REVIEWER_UUID": "reviewer_uuid_optional",
        "BITBUCKET_API_BASE_URL": "https://api.bitbucket.org/2.0",
        "BITBUCKET_DEFAULT_DESTINATION_BRANCH": "develop",
        "BITBUCKET_CLOSE_SOURCE_BRANCH": "true"
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
