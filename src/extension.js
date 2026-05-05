const vscode = require("vscode");

function activate(context) {
  const provider = {
    provideFoldingRanges(document) {
      const ranges = [];
      const stack = [];

      // Only fold real paired containers from the sample/docs usage.
      // toggle is a control tag, not a reliable multiline container.
      const tagRegex = /\[\/?(block|table)\b[^\]]*\]/gi;

      for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber++) {
        const line = document.lineAt(lineNumber).text;
        let match;

        while ((match = tagRegex.exec(line)) !== null) {
          const fullTag = match[0];
          const tagName = match[1].toLowerCase();
          const isClosing = fullTag.startsWith("[/");

          if (!isClosing) {
            stack.push({ tag: tagName, line: lineNumber });
            continue;
          }

          for (let i = stack.length - 1; i >= 0; i--) {
            if (stack[i].tag !== tagName) {
              continue;
            }

            const startLine = stack[i].line;
            stack.splice(i, 1);

            if (lineNumber > startLine) {
              ranges.push(new vscode.FoldingRange(startLine, lineNumber));
            }
            break;
          }
        }
      }

      return ranges;
    },
  };

  context.subscriptions.push(
    vscode.languages.registerFoldingRangeProvider("fumbbl", provider),
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
