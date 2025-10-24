import { SimpleGit } from "simple-git";

export async function getCurrentBranch(git: SimpleGit): Promise<string> {
  const branchSummary = await git.branch();
  return branchSummary.current;
}

export async function getProjectFromRepoUrl(git: SimpleGit): Promise<string> {
  const remotes = await git.getRemotes(true);
  const originRemote = remotes.find((remote) => remote.name === "origin");

  if (originRemote && originRemote.refs.fetch) {
    const url = originRemote.refs.fetch;
    const match = url.match(/\/([^\/]+)\/([^\/]+?)(?:\.git)?$/);
    if (match) {
      return match[2];
    }
  }
  throw new Error("Could not determine the project name from the repository URL.");
}

export async function generateDescriptionFromChanges(
  sourceBranch: string,
  destinationBranch: string,
  git: SimpleGit
): Promise<string> {
  const base = await git.raw(["merge-base", destinationBranch, sourceBranch]);

  const log = await git.log({
    from: base.trim(),
    to: sourceBranch,
    "--first-parent": null,
    "--no-merges": null,
  });

  const sections: Record<string, string[]> = {
    feat: [],
    fix: [],
    docs: [],
    style: [],
    refactor: [],
    perf: [],
    test: [],
    build: [],
    ci: [],
    chore: [],
    revert: [],
    other: [],
  };

  // Classify each commit according to the type
  log.all.forEach((commit) => {
    const msg = commit.message.trim();

    // Regex for conventional commits: type(scope): description
    const match = msg.match(/^(\w+)(\([^)]+\))?:\s+(.+)$/i);

    if (match) {
      const type = match[1].toLowerCase();
      const description = match[3];

      if (sections[type]) {
        sections[type].push(description);
      } else {
        sections.other.push(msg); // Valid type but not listed
      }
    } else {
      sections.other.push(msg); // Invalid message
    }
  });

  // Sort alphabetically within each type
  for (const key in sections) {
    sections[key].sort();
  }

  const sectionTitles: [keyof typeof sections, string][] = [
    ["feat", "🚀 Nuevas funcionalidades"],
    ["fix", "🐛 Correcciones"],
    ["docs", "📄 Documentación"],
    ["style", "🎨 Estilo"],
    ["refactor", "🧹 Refactorización"],
    ["perf", "⚡ Mejoras de rendimiento"],
    ["test", "🧪 Tests"],
    ["build", "🔧 Construcción"],
    ["ci", "🚀 Integración continua"],
    ["chore", "🧰 Tareas"],
    ["revert", "⏪ Reversiones"],
    ["other", "🔧 Otros"],
  ];

  const formatSection = (title: string, items: string[]) =>
    items.length ? `### ${title}\n` + items.map((m) => `- ${m}`).join("\n") + "\n" : "";

  return sectionTitles.map(([key, title]) => formatSection(title, sections[key])).join("\n");
}
