const {
  findIssueKeysFromBranchName,
  addIssueKeysToMessage,
} = require("./utils");

test("can find issue keys in a branch name", () => {
  const testCases = [
    {
      branchName: "TST-123/test-branch-name",
      result: ["TST-123"],
    },
    {
      branchName: "TST-123-TST-456/test-branch-name",
      result: ["TST-123", "TST-456"],
    },
  ];

  testCases.forEach((testCase) => {
    expect(findIssueKeysFromBranchName(testCase.branchName)).toEqual(
      testCase.result
    );
  });
});

test("prepends issue keys to the message", () => {
  const testCases = [
    {
      issueKeys: ["TST-123"],
      message: "hello there",
      result: "TST-123: hello there",
    },
    {
      issueKeys: ["TST-123", "TST-456"],
      message: "hello there",
      result: "TST-123-TST-456: hello there",
    },
  ];

  testCases.forEach((testCase) => {
    expect(addIssueKeysToMessage(testCase.issueKeys, testCase.message)).toEqual(
      testCase.result
    );
  });
});
