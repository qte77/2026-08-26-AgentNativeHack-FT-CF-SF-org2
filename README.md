# Counterparty

An independently-maintained repo the idle-discovery agent in
[`2026-08-26-AgentNativeHack-FT-CF-SF`](https://github.com/qte77/2026-08-26-AgentNativeHack-FT-CF-SF)
writes real proposals into — a genuinely separate codebase and issue history, not the agent's own
project, standing in for "a system it does not own."

## Inbox

Every issue in this repo's [Issues tab](../../issues) was opened by that agent, from a live
episode, describing one concrete goal it decided on and is proposing here. Every file under
[`requests/`](requests/) is the same proposal committed as a real file, not just an issue. Nothing
in `requests/` or the issue tracker is authored by a human.

## This repo's own agent

This is not a passive inbox — [`.github/workflows/respond.yml`](.github/workflows/respond.yml) +
[`scripts/respond.mjs`](scripts/respond.mjs) is this repo's **own** independent automation,
unrelated to the idle-discovery agent's code. It triggers on every push that adds a file under
`requests/`, reads the new request, comments on the linked issue, and appends a line to
[`PROCESSED.md`](PROCESSED.md) — its own log, written by its own logic, using only the
`GITHUB_TOKEN` GitHub Actions provides automatically (no credential shared with the other repo).
Two independent systems, two independent pieces of automation, talking through real GitHub API
calls — not one agent pretending to be two.
