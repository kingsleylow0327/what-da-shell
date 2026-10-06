# what-da-shell 🐚

A Claude Code skill that tells you, in plain English, what Claude is about to run (especially long shell scripts) before it asks for your permission (or not).

## What it does

- Explains the command in one short, simple line.
- Gives it a color, so you know how scared to be:
  - 🔴 Danger: deletes, overwrites, `sudo`, or touches things outside your start folder
  - 🟡 Careful: changes things, but you can undo it
  - 🟢 Safe: only looks, never touches

## The scenario

Claude is working on your project. Then it stops and asks:

```
Do you want to proceed?
  find . -maxdepth 2 -name "package.json" | sort | head -5 && echo "done"
```

You go "...what da shell is that?" You don't want to say yes to something you can't read. You also don't want to stop and google every command.

That's the whole point: `/what-da-shell` reads it for you.

## Modes

There are two modes you will use, plus an off switch.

- **Lazy** (the default): the color, one plain line, and the script.
- **Learn**: the same, plus the steps, so you pick things up as you go.
- **Off**: no explaining.

**Why lazy by default?** Most of the time you don't need a lesson. You just want to know "is this safe?" Lazy mode gives you the color and one plain line, and that's enough. It also costs fewer tokens (the words Claude pays for). Want to learn what each part of a command does? Switch to `-learn` any time.

## Before and after

**Without what-da-shell.** A short title and a wall of command:

```
Bash command
  Search for package.json files
  find . -maxdepth 2 -name "package.json" | sort | head -5 && echo "done"
Do you want to proceed?
```

**With what-da-shell (lazy mode).** A color and a plain line first:

> 🟢 **what-da-shell**
> Looks for `package.json` files near here. It only reads.

```
find . -maxdepth 2 -name "package.json" | sort | head -5 && echo "done"
```

**With what-da-shell (learn mode).** Same thing, plus the steps:

> 🟢 **what-da-shell**
> Looks for `package.json` files near here. It only reads.
>
> Steps:
> 1. Search this folder, max 2 levels deep, for files named `package.json`
> 2. Sort the results A to Z
> 3. Keep the first 5
> 4. Print "done"

And when something is truly scary, it waves a big red flag:

> 🔴 **what-da-shell**
> Deletes the build folder. You cannot get it back.

```
rm -rf ./build
```

## Install

One line:

```
npx @kingsley_low_94/what-da-shell
```

It lands in `~/.claude/skills/what-da-shell`. Run it again any time to update.

Only want it in one project?

```
npx @kingsley_low_94/what-da-shell --project
```

Run it from a normal folder. Not from inside this repo.

## Uninstall

Changed your mind? No hard feelings:

```
npx @kingsley_low_94/what-da-shell --uninstall
```

Add `--project` to remove the project copy.

## How to run

Open a new Claude Code session after installing. Type `/what-da-shell`. It starts in lazy mode and works by itself.

Switch modes any time:

- `/what-da-shell -lazy`: a short note and the script
- `/what-da-shell -learn`: the steps too
- `/what-da-shell -off`: shhh, no explaining
- `/what-da-shell -test`: take it for a spin with the self-test

A mode lasts for the session. A new session starts at lazy again.

It only jumps in when Claude is about to ask your permission:

- ✅ It speaks up for a command, file edit, or web fetch you have not already allowed.
- 🤐 It stays quiet for a call you already allowed, like `ls` in your allow list.
- 🤐 It stays quiet after `/what-da-shell -off`.
