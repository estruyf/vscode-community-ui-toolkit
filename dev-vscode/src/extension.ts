import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

const viewType = "communityUiToolkitDev";

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('openDevWebview', () => {
			renderPanelNew(context.extensionUri);
		})
	);

	if (vscode.window.registerWebviewPanelSerializer) {
		// Make sure we register a serializer in activation event
		vscode.window.registerWebviewPanelSerializer(viewType, {
			async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
				console.log(`Got state: ${state}`);
				// Reset the webview options so we use latest uri for `localResourceRoots`.
				webviewPanel.webview.options = getWebviewOptions(context.extensionUri);
			}
		});
	}
}

function getWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewOptions {
	return {
		// Enable javascript in the webview
		enableScripts: true,

		// And restrict the webview to only loading content from our extension's `media` directory.
		localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media'),
		vscode.Uri.joinPath(extensionUri, 'node_modules'),
		vscode.Uri.joinPath(extensionUri, 'media-dev')
		]
	};
}


function renderPanelNew(extensionUri: vscode.Uri) {
	// create a new panel.
	const panel = vscode.window.createWebviewPanel(viewType,
		'Community UI Toolkit Dev Extension',
		vscode.ViewColumn.One,
		getWebviewOptions(extensionUri),
	);

	const filePath: vscode.Uri = vscode.Uri.file(path.join(extensionUri.path, 'media', 'index.html'));
	const html = fs.readFileSync(filePath.fsPath, 'utf8');
	panel.webview.html = html;
}

