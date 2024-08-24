import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

const viewType = 'communityUiToolkit';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('openSamplesWebview', async () => {
      const doc = await vscode.workspace.openTextDocument(
        vscode.Uri.parse('vscode://schemas/workbench-colors')
      );
      const contents = JSON.parse(doc.getText());

      const cssVariables: { id: string; value: string }[] = Object.entries<{
        oneOf: { defaultSnippets: { body: string }[] }[];
      }>(contents.properties).map(([key, value]) => {
        const cssValue = `--vscode-${key.split('.').join('-')}`;
        const cssVariableName = key
          .split('.')
          .map((part, idx) => {
            if (idx === 0) {
              return part;
            }
            return part.charAt(0).toUpperCase() + part.slice(1);
          })
          .join('');

        const oneOf = value.oneOf;
        if (!oneOf) {
          return {
            id: cssVariableName,
            value: `var(${cssValue})`,
          };
        }

        const snippets = oneOf[0].defaultSnippets;
        if (!snippets) {
          return {
            id: cssVariableName,
            value: `var(${cssValue})`,
          };
        }

        const defaultValue = snippets[0].body;
        const colorValue = defaultValue.replace(/\$\{1:(.*)\}/, '$1');
        return {
          id: cssVariableName,
          // value: `var(${cssValue}, ${colorValue})`,
          value: `var(${cssValue})`,
        };
      });

      // Remove duplicates
      const cssVariablesMap = new Map<string, string>();
      cssVariables.forEach((variable) => {
        cssVariablesMap.set(variable.id, variable.value);
      });

      const cssVariablesTxt = Array.from(cssVariablesMap).map(
        ([id, value]) => `export const ${id} = '${value}';`
      );

      const fsWorkspace = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
      const cssVariablesPath = path.join(fsWorkspace || '', 'css-variables.ts');
      fs.writeFileSync(cssVariablesPath, cssVariablesTxt.join(`\n`), 'utf8');

      renderPanelNew(context.extensionUri);
    })
  );

  if (vscode.window.registerWebviewPanelSerializer) {
    // Make sure we register a serializer in activation event
    vscode.window.registerWebviewPanelSerializer(viewType, {
      async deserializeWebviewPanel(
        webviewPanel: vscode.WebviewPanel,
        state: any
      ) {
        console.log(`Got state: ${state}`);
        // Reset the webview options so we use latest uri for `localResourceRoots`.
        webviewPanel.webview.options = getWebviewOptions(context.extensionUri);
      },
    });
  }
}

function getWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewOptions {
  return {
    // Enable javascript in the webview
    enableScripts: true,

    // And restrict the webview to only loading content from our extension's `media` directory.
    localResourceRoots: [
      vscode.Uri.joinPath(extensionUri, 'media'),
      vscode.Uri.joinPath(extensionUri, 'node_modules'),
      vscode.Uri.joinPath(extensionUri, 'media-dev'),
    ],
  };
}

function renderPanelNew(extensionUri: vscode.Uri) {
  // Otherwise, create a new panel.
  const panel = vscode.window.createWebviewPanel(
    viewType,
    'Community UI Toolkit Samples',
    vscode.ViewColumn.One,
    getWebviewOptions(extensionUri)
  );

  const filePath: vscode.Uri = vscode.Uri.file(
    path.join(extensionUri.path, 'media', 'index.html')
  );
  let html = fs.readFileSync(filePath.fsPath, 'utf8');

  const webcomponentsLoaderJs = panel.webview.asWebviewUri(
    vscode.Uri.joinPath(
      extensionUri,
      'node_modules',
      '@webcomponents',
      'webcomponentsjs',
      'webcomponents-loader.js'
    )
  );
  const polyfillSupportJs = panel.webview.asWebviewUri(
    vscode.Uri.joinPath(
      extensionUri,
      'node_modules',
      'lit',
      'polyfill-support.js'
    )
  );
  const bundleJs = panel.webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, 'media', 'bundle.js')
  );

  html = html.replace(
    'webcomponents-loader.js',
    webcomponentsLoaderJs.toString()
  );
  html = html.replace('polyfill-support.js', polyfillSupportJs.toString());
  html = html.replace('bundle.js', bundleJs.toString());

  panel.webview.html = html;
}
