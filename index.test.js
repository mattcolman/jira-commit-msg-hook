const {
  findIssueKeysFromBranchName,
  addIssueKeysToMessage,
} = require("./utils");

test("can find issue keys in a branch name", () => {
  const MESSAGE = "hello there";
  const testCases = [
    {
      branchName: "TASK-100",
      expectedIssueKeys: ["TASK-100"],
      result: "TASK-100: hello there",
    },
    {
      branchName: "JIRA-1-is-the-best",
      expectedIssueKeys: ["JIRA-1"],
      result: "JIRA-1: hello there",
    },
    {
      branchName: "ROBOT-777-LETS-get-it-done-2",
      expectedIssueKeys: ["ROBOT-777"],
      result: "ROBOT-777: hello there",
    },
    {
      // with an issue directory
      branchName: "issue/EASY-42-its-too-easy-baby",
      expectedIssueKeys: ["EASY-42"],
      result: "EASY-42: hello there",
    },
    {
      // issue key as a directory
      branchName: "TST-123/test-branch-name",
      expectedIssueKeys: ["TST-123"],
      result: "TST-123: hello there",
    },
    {
      // two issue keys in a branch is a bit crazy, but it works!
      branchName: "TST-123-TST-456/test-branch-name",
      expectedIssueKeys: ["TST-123", "TST-456"],
      result: "TST-123 TST-456: hello there",
    },
    {
      branchName: "test-500-lowercase-wont-work",
      expectedIssueKeys: null,
      result: "hello there",
    },
    {
      branchName: "TEST100-nope-not-like-this",
      expectedIssueKeys: null,
      result: "hello there",
    },
  ];

  testCases.forEach((testCase) => {
    const issueKeys = findIssueKeysFromBranchName(testCase.branchName);
    expect(issueKeys).toEqual(testCase.expectedIssueKeys);
    expect(addIssueKeysToMessage(issueKeys, MESSAGE)).toEqual(testCase.result);
  });
});
