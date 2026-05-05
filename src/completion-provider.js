const vscode = require('vscode');
const languageData = require('./language-data');

function createOpeningTagCompletionItem(tag, range) {
  const item = new vscode.CompletionItem(
    tag,
    vscode.CompletionItemKind.Snippet,
  );

  if (languageData.pairedTags.includes(tag)) {
    item.insertText = new vscode.SnippetString(`${tag}]$0[/${tag}]`);
  } else {
    item.insertText = new vscode.SnippetString(`${tag}]$0`);
  }

  item.range = range;
  item.detail = 'FUMBBL BBCode tag';
  return item;
}

function createClosingTagCompletionItem(tag, range) {
  const item = new vscode.CompletionItem(
    tag,
    vscode.CompletionItemKind.Property,
  );

  item.insertText = `${tag}]`;
  item.range = range;
  item.detail = 'FUMBBL BBCode closing tag';
  return item;
}

function createCompletionProvider() {
  return {
    provideCompletionItems(document, position) {
      const line = document.lineAt(position.line).text;
      const linePrefix = line.slice(0, position.character);
      const hasClosingBracket = line[position.character] === ']';

      const closingMatch = linePrefix.match(/\[\/([a-z]*)$/i);
      if (closingMatch) {
        const typedPrefix = closingMatch[1].toLowerCase();
        const range = new vscode.Range(
          position.line,
          position.character - typedPrefix.length,
          position.line,
          position.character + (hasClosingBracket ? 1 : 0),
        );

        return languageData.pairedTags
          .filter((tag) => tag.startsWith(typedPrefix))
          .map((tag) => createClosingTagCompletionItem(tag, range));
      }

      const openingMatch = linePrefix.match(/\[([a-z]*)$/i);
      if (!openingMatch) {
        return undefined;
      }

      const typedPrefix = openingMatch[1].toLowerCase();
      const range = new vscode.Range(
        position.line,
        position.character - typedPrefix.length,
        position.line,
        position.character + (hasClosingBracket ? 1 : 0),
      );

      return languageData.tags
        .filter((tag) => tag.startsWith(typedPrefix))
        .map((tag) => createOpeningTagCompletionItem(tag, range));
    },
  };
}

module.exports = {
  createCompletionProvider,
};
