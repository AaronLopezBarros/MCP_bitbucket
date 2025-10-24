import path from "path";
import simpleGit from "simple-git";

import { getProjectFromRepoUrl, generateDescriptionFromChanges, getCurrentBranch } from "../utils/git";
import { z } from "zod";

export const preparePullRequestAuto = {
  name: "prepare-pull-request-automatically",
  description:
    "Prepares a pull request by generating the title, description, destination branch, source branch, project and close source branch. \
    You need the current path of the repository with the branch name to get all the information. \
    When you create the description, you have to create a elaborated description in markdown with the changes.",
  inputSchema: {
    currentPath: z.string().min(1, "Current path is required"),
  },
  async run({ currentPath }) {
    const repoPath = path.resolve(currentPath);
    const git = simpleGit(repoPath);
    const title = await getCurrentBranch(git);
    const sourceBranch = await getCurrentBranch(git);
    const destinationBranch = "develop";
    const description = await generateDescriptionFromChanges(sourceBranch, destinationBranch, git);
    const project = await getProjectFromRepoUrl(git);
    const closeSourceBranch = true;

    return {
      content: [
        {
          type: "text" as const,
          text: `Do you want to create a pull request with the following information?\
          \nTitle: ${title}\nDescription: ${description}\nDestination Branch: ${destinationBranch} \ 
          \nSource Branch: ${sourceBranch}\nClose Source Branch: ${closeSourceBranch}\nProject: ${project}`,
        },
      ],
    };
  },
};
