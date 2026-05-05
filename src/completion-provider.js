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

function createImplicitValueCompletionItem(tag, value, range) {
  const item = new vscode.CompletionItem(
    value,
    vscode.CompletionItemKind.Value,
  );

  if (languageData.pairedTags.includes(tag)) {
    item.insertText = new vscode.SnippetString(`${value}]$0[/${tag}]`);
  } else {
    item.insertText = new vscode.SnippetString(`${value}]$0`);
  }

  item.range = range;
  item.detail = `FUMBBL BBCode ${tag} pattern`;
  return item;
}

function createFreeformImplicitValueCompletionItem(tag, value, range) {
  const item = new vscode.CompletionItem(
    `${value}] [/${tag}]`,
    vscode.CompletionItemKind.Snippet,
  );

  if (languageData.pairedTags.includes(tag)) {
    item.insertText = new vscode.SnippetString(`${value}]$0[/${tag}]`);
  } else {
    item.insertText = new vscode.SnippetString(`${value}]$0`);
  }

  item.range = range;
  item.detail = `Complete ${tag}=... tag`;
  item.filterText = value;
  item.sortText = '0';
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

      const implicitValueMatch = linePrefix.match(/\[([a-z]+)=([^\]]*)$/i);
      if (implicitValueMatch) {
        const tag = implicitValueMatch[1].toLowerCase();
        const typedValue = implicitValueMatch[2];
        const normalizedValue = typedValue.toLowerCase();
        const range = new vscode.Range(
          position.line,
          position.character - typedValue.length,
          position.line,
          position.character + (hasClosingBracket ? 1 : 0),
        );

        const items = [];
        const values = languageData.implicitValueTags[tag];

        if (values) {
          items.push(
            ...values
              .filter((value) => value.startsWith(normalizedValue))
              .map((value) =>
                createImplicitValueCompletionItem(tag, value, range),
              ),
          );
        }

        if (languageData.freeformImplicitValueTags.includes(tag)) {
          items.push(
            createFreeformImplicitValueCompletionItem(tag, typedValue, range),
          );
        }

        return items.length > 0 ? items : undefined;
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
