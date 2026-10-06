---
name: what-da-shell
description: Explain in plain, simple English what a tool call does, right before asking the user for permission. Use whenever you are about to ask permission for any tool call that is not already allowed (shell commands, file edits, web fetches, MCP tools). Also use when the user types /what-da-shell with -learn, -lazy, -off, or -test.
---

# what-da-shell

Before you ask permission for a tool call, tell the user what it does in plain words. No big words. If you must use a tech word, explain it right after.

## Modes

The mode lasts for the session. A new session starts in **lazy**.

Switch with the argument the user gave:

- `-lazy` or no argument: lazy mode.
- `-learn`: learn mode.
- `-off`: explain nothing.
- `-test`: run the self-test below. It does not change the mode.

When the user switches mode (`-learn`, `-lazy`, `-off`, or no argument), reply with exactly this, with the new mode in the first line. Do not reword it. Then follow the mode until the user changes it.

```
✅ what-da-shell is on (lazy mode)

- /what-da-shell -learn → explain the shell step by step
- /what-da-shell -lazy  → short note only
- /what-da-shell -off   → stop explaining
```

For `-off`, the first line is `⏹️ what-da-shell is off`. Keep the list.

## When to explain

Only for tool calls that need the user's permission, meaning the call is not already allowed in their settings. Skip calls that are already allowed. Applies to every tool, not only Bash.

## What to write

Write this before the tool call, in this order.

**Learn mode:**

1. The color emoji and one short line on what it does.
2. The script or change in a code block.
3. A numbered list of steps, one line per step. A step is one command in the chain, not one flag or symbol. Fold the flags into the step's line. Do not explain `|`, `&&`, or `;` on their own lines.

   Example for `find . -maxdepth 2 -name "package.json" | sort | head -5 && echo done`:

   Steps:
   1. Search this folder, max 2 levels deep, for files named `package.json`
   2. Sort the results A to Z
   3. Keep the first 5
   4. Print "done"

   Only break out a single flag when it is the risky part. Example: `-rf` in `rm -rf` = no questions, goes into folders.

**Lazy mode:**

1. The color emoji and one short line on what it does.
2. The script or change in a code block.
3. No breakdown.

Use bullets only if they make it shorter.

### Long commands

Pipes, chains, or many lines: say the overall goal first, then the numbered steps. Keep each step to one short line. In lazy mode, give the goal and the risky parts only.

### Non-shell tools

No script to show. Put this in the code block instead:

- File edit: the file path and the change in one line.
- Other tools: the tool name and what it gets.

## Colors

Pick one. If you are not sure, pick the scarier one.

- 🔴 Danger. Deletes or overwrites and cannot be undone, uses `sudo`, force pushes, sends data outside the computer, or changes anything outside the folder Claude started in.
- 🟡 Careful. Changes things, but the user can undo it. Examples: install a package, edit a file, `git commit`.
- 🟢 Safe. Only reads or looks. Examples: `ls`, `cat`, `git status`. Reading outside the start folder is 🟡, not 🟢.

The color and a plain warning show in both modes. For 🔴, say what could be lost. Example: "🔴 This deletes the build folder. You cannot get it back."

## Self-test (`-test`)

Run these 9 calls one at a time, in the current mode. Before each one, write the explanation exactly as the mode says, with the expected color. Then make the real tool call so the user sees the real permission prompt. Do not skip a call because it looks harmless. Do not batch them.

| # | Call | Expected color |
|---|------|----------------|
| 1 | Bash: `ls` | 🟢 |
| 2 | Bash: `mkdir -p ./what-da-shell-test` | 🟡 |
| 3 | Write: `./what-da-shell-test/note.txt` with the text `hello` | 🟡 (non-shell: path plus one line) |
| 4 | Bash: `ls ./what-da-shell-test \| wc -l` | 🟢 (pipe: goal first, then steps) |
| 5 | Bash: `find . -maxdepth 2 -name "package.json" \| sort \| head -5 && echo "done"` | 🟢 long (only reads: goal first, then one numbered line per command) |
| 6 | Bash: `mkdir -p ./what-da-shell-test/a && cd ./what-da-shell-test/a && printf 'one\ntwo\n' > list.txt && sort list.txt > sorted.txt && wc -l sorted.txt && echo "done"` | 🟡 long (makes and writes files, can be undone) |
| 7 | Bash: `cd ./what-da-shell-test && cp note.txt note-copy.txt && rm -rf ./a && ls \| wc -l && echo "done"` | 🔴 long (one step deletes, cannot undo) |
| 8 | Bash: `touch ../what-da-shell-outside` | 🔴 (outside the start folder) |
| 9 | Bash: `rm -rf ./what-da-shell-test` | 🔴 (deletes, cannot undo) |

For the long calls (5, 6, 7), the color is about the whole chain. The scariest step decides it. In lazy mode, the goal and the risky step only.

If the user denies call 8, skip it. Do not run it any other way. Call 9 cleans up, so do not skip it.

After the 9th call, print a checklist. For each call, say yes or no:

- Did the color emoji come first?
- Was there a short plain-words line?
- Was the script or change in a code block?
- Learn mode only: was there a numbered list of steps, one line per command, with no per-symbol lines?
- Lazy mode only: was the breakdown left out?

Then list anything that failed. Be honest. Do not mark a call yes if you skipped the explanation.

## Words

Use plain words. Short sentences. Explain any tech word right after you use it.
