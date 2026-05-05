const vscode = require('vscode');
const { createFoldingProvider } = require('./folding-provider');
const { createCompletionProvider } = require('./completion-provider');

function activate(context) {
  context.subscriptions.push(
    vscode.languages.registerFoldingRangeProvider(
      'fumbbl',
      createFoldingProvider(),
    ),
  );

  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      'fumbbl',
      createCompletionProvider(),
      '[',
      '/',
    ),
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
