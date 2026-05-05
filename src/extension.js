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
      '=',
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '#',
    ),
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
