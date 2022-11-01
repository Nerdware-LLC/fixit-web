/**
 * Found this nifty Jest reporter at the link below. It ensures output from
 * Jest tests can be parsed by the GitHub Actions runner, thereby providing
 * more helpful test feedback in GitHub.
 * https://joelhooks.com/jest-and-github-actions
 */
class GitHubActionsJestReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(contexts, results) {
    results.testResults.forEach((testResultItem) => {
      const testFilePath = testResultItem.testFilePath;

      testResultItem.testResults.forEach((result) => {
        if (result.status !== "failed") {
          return;
        }

        result.failureMessages.forEach((failureMessages) => {
          const newLine = "%0A";
          const message = failureMessages.replace(/\n/g, newLine);
          const captureGroup = message.match(/:([0-9]+):([0-9]+)/);

          if (!captureGroup) {
            console.log("Unable to extract line number from call stack");
            return;
          }

          const [, line, col] = captureGroup;
          console.log(`::error file=${testFilePath},line=${line},col=${col}::${message}`);
        });
      });
    });
  }
}

module.exports = GithubActionsReporter;
