#!/usr/bin/env node
// const chalk = require("chalk");
const shell = require("shelljs");
const fs = require("fs");
const {
  findIssueKeysFromBranchName,
  addIssueKeysToMessage,
} = require("./utils");

function exec(cmd, options) {
  const defaultOptions = { silent: true };
  let output = shell.exec(cmd, { ...defaultOptions, ...(options || {}) });
  if (options && options.toString !== false) {
    output = output.toString();
    output = options.trim ? output.trim() : output;
  }

  return output;
}

const message = fs.readFileSync(process.argv[2], "utf8").trim();

const branchName = exec("git rev-parse --abbrev-ref HEAD", { trim: true });

const issueKeys = findIssueKeysFromBranchName(branchName);

// TODO
// - what about messages that have already been tagged?
// - what about merge commits? see https://gist.github.com/aquiseb/6cd2f0e311ee5f54c5b0c8db39f606b4
// - write tests

const newMessage = addIssueKeysToMessage(issueKeys, message);

if (newMessage !== message) {
  console.log("new message is", newMessage);
  // use chalk here?
  fs.writeFileSync(process.argv[2], newMessage);
}

process.exit(0);
