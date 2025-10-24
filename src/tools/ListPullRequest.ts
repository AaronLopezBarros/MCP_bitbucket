import { z } from "zod";
import { fetchBitbucket } from "../utils/fetchBitbucket";

export const listPullRequest = {
  name: "list-pull-request",
  description: "List all the pull requests of the repository",
  inputSchema: {
    project: z.string(),
  },
  async run({ project }) {
    const apiBaseUrl =
      process.env.BITBUCKET_API_BASE_URL || "https://api.bitbucket.org/2.0";
    const url = `${apiBaseUrl}/repositories/${process.env.BITBUCKET_WORKSPACE}/${project}/pullrequests`;
    try {
      const response = await fetchBitbucket(url, "GET");
      const data = await response.json();

      return {
        content: [
          {
            type: "text" as const,
            text: `Here you can see the pull requests: ${JSON.stringify(data)}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Failed to list pull requests: ${error}`,
          },
        ],
      };
    }
  },
};
