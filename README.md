# Jira commit msg hook

Installing Jira commit msg hook into your project will mean everyone contributing code to your project will automatically tag each commit with
it's associated issue key based off the branch name. 

So if your branch name is `feature/TEST-123-new-feature`, then when you commit with a message `"initial commit"` it will automatically become `"TEST-123: initial commit"`.

Why would you want this? Well, Jira has many hidden goodies, and this is one of them! If you include an issue key in your commit messages AND you have your deployment pipeline connected to Jira this will unlock many bonus features, such as the Deployments view, Cycle time report, Deployment frequency report and I've heard many more features are coming soon!

## Quick install
Quick install is for people that hate reading and just want the thing to work.
`npm install husky --save-dev && npx husky install && npm set-script prepare "husky install" && npx husky add .husky/commit-msg 'npx --no-install jira-commit-msg-hook "$1"'`

## Considered install

Jira commit msg hook uses Husky to easily install git hooks. If your project doesn't already include husky you'll need to install it.
### Install husky
Incase these docs come out of date please read the source at https://typicode.github.io/husky/#/?id=automatic-recommended
#### via npm
`npm install husky --save-dev && npx husky install && npm set-script prepare "husky install"`

#### via yarn
`yarn add husky --dev && npx husky install && npm set-script prepare "husky install"`

#### via yarn 2
See https://typicode.github.io/husky/#/?id=yarn-2

### Install commit-msg hook
`npx husky add .husky/commit-msg 'npx --no-install jira-commit-msg-hook "$1"'`

## Install global hook
If you prefer you can install Jira commit msg hook globally to work with all git projects.
1. `mkdir -p ~/git/hooks`
2. copy `index.js` from this repo into `~/git/hooks` and rename it `commit-msg`
3. make this file executable `chmod +x commit-msg`
4. configure a global git hooks path `git config --global core.hooksPath ~/git/hooks`
5. Note global hooks will override local repository hooks if the projects you are using utilises them.
6. I haven't tested this yet...it should work!

## Developer TODO
- If the branch name does not include an issue key should we fail the commit message by default? The message could warn the user and they will be forced to change the branch name, include an issue key in the commit message or use `git commit --no-verify` option.