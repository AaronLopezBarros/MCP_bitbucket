import { z } from "zod";
import { fetchBitbucket } from "../utils/fetchBitbucket";

export const listPullRequest = {
  name: "list-pull-request",
  description: "List all the pull requests of the repository",
  inputSchema: {
    project: z.string(),
  },
  async run({ project }) {
    const url = `https://api.bitbucket.org/2.0/repositories/iati-devs/${project}/pullrequests`;
    try {
      const response = await fetchBitbucket(url, "GET");
      const data = await response.json();

      return {
        content: [{ type: "text" as const, text: `Here you can see the pull requests: ${JSON.stringify(data)}` }],
      };
    } catch (error) {
      return {
        content: [{ type: "text" as const, text: `Failed to list pull requests: ${error}` }],
      };
    }
  },
};
