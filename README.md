# what-da-shell

A Claude Code skill. Before Claude asks permission to run a tool, it explains
what the call does in plain English, with a color for how risky it is.

- 🔴 Danger: deletes, overwrites, `sudo`, or changes things outside the start folder
- 🟡 Careful: changes things, but you can undo it
- 🟢 Safe: only reads

## Install

```
npx @kingsley_low_94/what-da-shell
```

Installs to `~/.claude/skills/what-da-shell`. Run it again to update.

For this project only:

```
npx @kingsley_low_94/what-da-shell --project
```

## Remove

```
npx @kingsley_low_94/what-da-shell --uninstall
```

Add `--project` to remove the project copy.

## Modes

Open a new Claude Code session after installing. The default is lazy.

- `/what-da-shell -lazy`: short note and the script
- `/what-da-shell -learn`: also explains the command step by step
- `/what-da-shell -off`: stop explaining
- `/what-da-shell -test`: run the self-test
