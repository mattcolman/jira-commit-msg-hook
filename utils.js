const findIssueKeysFromBranchName = (branchName) => {
  return branchName.match(/((?!([A-Z0-9a-z]{1,10})-?$)[A-Z]{1}[A-Z0-9]+-\d+)/g);
};

const addIssueKeysToMessage = (issueKeys, message) => {
  if (issueKeys) {
    return `${issueKeys.join(" ")}: ${message}`;
  }
  return message;
};

// const addIssueKeysFromBranchNameToMessage = (branchName, message) => {
//   const issueKeys = findIssueKeysFromBranchName(branchName);
//   if (issueKeys) {
//     return addIssueKeysToMessage(issueKeys, message);
//   }
//   return message;
// };

exports.findIssueKeysFromBranchName = findIssueKeysFromBranchName;
exports.addIssueKeysToMessage = addIssueKeysToMessage;
