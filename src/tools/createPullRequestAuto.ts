import { z } from "zod";
import { fetchBitbucket } from "../utils/fetchBitbucket";

export const createPullRequestAuto = {
  name: "create-pull-request",
  description:
    "Creates a pull request automatically using the current path. \
    If the user does not provide the title, description, destination branch, source branch, close source branch and project, \
    you need to prepare the pull request first using the prepare-pull-request-automatically tool.",
  inputSchema: {
    title: z.string(),
    description: z.string(),
    destinationBranch: z.string(),
    sourceBranch: z.string(),
    closeSourceBranch: z.boolean(),
    project: z.string(),
  },
  async run({
    title,
    description,
    destinationBranch,
    sourceBranch,
    closeSourceBranch,
    project,
  }) {
    const apiBaseUrl =
      process.env.BITBUCKET_API_BASE_URL || "https://api.bitbucket.org/2.0";
    const url = `${apiBaseUrl}/repositories/${process.env.BITBUCKET_WORKSPACE}/${project}/pullrequests`;

    const body = {
      title: title,
      source: { branch: { name: sourceBranch } },
      destination: { branch: { name: destinationBranch } },
      description,
      close_source_branch: closeSourceBranch,
      reviewers: [{ uuid: process.env.BITBUCKET_REVIEWER_UUID }],
    };

    try {
      const response = await fetchBitbucket(url, "POST", body);

      if (!response.ok) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Failed to create pull request: ${response.status} ${response.statusText}`,
            },
          ],
        };
      }

      const data = await response.json();

      return {
        content: [
          {
            type: "text" as const,
            text: `Pull request created successfully: ${data.links.html.href}`,
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Failed to create pull request: ${
              error.message || "Unknown error"
            }`,
          },
        ],
      };
    }
  },
};
