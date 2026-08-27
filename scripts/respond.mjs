// This repo's own agent: reacts autonomously to new requests landing under
// requests/ - no human writes PROCESSED.md or comments on the linked issue,
// this script does, triggered by GitHub Actions on every push that adds one.
import { readFileSync, appendFileSync, existsSync, writeFileSync } from "node:fs";

const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPOSITORY; // "owner/repo"
const changedFiles = process.argv.slice(2);

if (!existsSync("PROCESSED.md")) {
  writeFileSync("PROCESSED.md", "# Processed requests\n\nAppended automatically by scripts/respond.mjs on every new request. No human edits this file.\n\n");
}

for (const file of changedFiles) {
  if (!file.startsWith("requests/") || !file.endsWith(".md")) continue;
  const body = readFileSync(file, "utf-8");
  const issueMatch = body.match(/Issue opened here: (\S+)/);
  const goalMatch = body.match(/^Goal: (.+)$/m);
  const goal = goalMatch ? goalMatch[1] : "(no goal line found)";
  const issueUrl = issueMatch ? issueMatch[1] : null;

  appendFileSync("PROCESSED.md", `- \`${file}\` — ${goal}${issueUrl ? ` ([issue](${issueUrl}))` : ""}\n`);
  console.log(`processed ${file}: ${goal}`);

  if (issueUrl && token) {
    const num = issueUrl.split("/").pop();
    const res = await fetch(`https://api.github.com/repos/${repo}/issues/${num}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        body: `Received and logged in PROCESSED.md by this repo's own automation — not the idle-discovery agent, this counterparty repo's own reaction to the incoming request.`,
      }),
    });
    console.log(`comment on #${num}: ${res.status}`);
  }
}
