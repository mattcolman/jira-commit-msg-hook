#!/usr/bin/env node
// const chalk = require("chalk");
const shell = require("shelljs");
const fs = require("fs");

console.log("node js here");

function exec(cmd, options) {
  const defaultOptions = { silent: true };
  let output = shell.exec(cmd, { ...defaultOptions, ...(options || {}) });
  if (options && options.toString !== false) {
    output = output.toString();
    output = options.trim ? output.trim() : output;
  }

  return output;
}

console.log("args", process.argv);
const message = fs.readFileSync(process.argv[2], "utf8").trim();

console.log("message", message);

const branchName = exec("git rev-parse --abbrev-ref HEAD", { trim: true });

const issueKeys = branchName.match(
  /((?!([A-Z0-9a-z]{1,10})-?$)[A-Z]{1}[A-Z0-9]+-\d+)/g
);

// TODO
// - what about messages that have already been tagged?
// - what about merge commits? see https://gist.github.com/aquiseb/6cd2f0e311ee5f54c5b0c8db39f606b4
// - write tests
if (issueKeys) {
  const newMessage = `${issueKeys.join("-")}-${message}`;
  console.log("new message is", newMessage);

  fs.writeFileSync(process.argv[2], newMessage);
  console.log("write new message", newMessage);
}

process.exit(0);
