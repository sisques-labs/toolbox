export interface GitCheatsheetEntry {
  command: string;
  description: string;
}

const ENTRIES: GitCheatsheetEntry[] = [
  { command: 'git init', description: 'Create a new local repository' },
  { command: 'git clone <url>', description: 'Clone a remote repository' },
  { command: 'git status', description: 'Show the working tree status' },
  { command: 'git add <file>', description: 'Stage a file for commit' },
  { command: 'git add -A', description: 'Stage all changes' },
  {
    command: 'git commit -m "message"',
    description: 'Commit staged changes with a message',
  },
  {
    command: 'git commit --amend',
    description: 'Undo the previous commit and rewrite it',
  },
  { command: 'git push', description: 'Push commits to the remote' },
  {
    command: 'git push -u origin <branch>',
    description: 'Push a new branch and track it',
  },
  { command: 'git pull', description: 'Fetch and merge from the remote' },
  {
    command: 'git fetch',
    description: 'Download objects and refs without merging',
  },
  { command: 'git branch', description: 'List local branches' },
  { command: 'git branch <name>', description: 'Create a new branch' },
  { command: 'git checkout <branch>', description: 'Switch to a branch' },
  {
    command: 'git checkout -b <branch>',
    description: 'Create and switch to a new branch',
  },
  {
    command: 'git switch <branch>',
    description: 'Switch to a branch (modern)',
  },
  {
    command: 'git merge <branch>',
    description: 'Merge a branch into the current one',
  },
  {
    command: 'git rebase <branch>',
    description: 'Reapply commits on top of another branch',
  },
  { command: 'git log', description: 'Show commit history' },
  {
    command: 'git log --oneline',
    description: 'Show condensed commit history',
  },
  { command: 'git diff', description: 'Show unstaged changes' },
  { command: 'git diff --staged', description: 'Show staged changes' },
  {
    command: 'git reset --soft HEAD~1',
    description: 'Undo the last commit, keep changes staged',
  },
  {
    command: 'git reset --hard HEAD~1',
    description: 'Undo the last commit and discard changes',
  },
  {
    command: 'git restore <file>',
    description: 'Undo unstaged changes to a file',
  },
  {
    command: 'git revert <commit>',
    description: 'Create a new commit that undoes another',
  },
  {
    command: 'git stash',
    description: 'Temporarily shelve uncommitted changes',
  },
  { command: 'git stash pop', description: 'Reapply the most recent stash' },
  {
    command: 'git tag <name>',
    description: 'Create a tag on the current commit',
  },
  { command: 'git remote -v', description: 'List configured remotes' },
  {
    command: 'git cherry-pick <commit>',
    description: 'Apply a specific commit onto the current branch',
  },
];

export class SearchGitCheatsheetUseCase {
  execute(query: string): GitCheatsheetEntry[] {
    const q = query.trim().toLowerCase();
    if (!q) return ENTRIES;

    return ENTRIES.filter(
      (entry) =>
        entry.command.toLowerCase().includes(q) ||
        entry.description.toLowerCase().includes(q),
    );
  }
}
