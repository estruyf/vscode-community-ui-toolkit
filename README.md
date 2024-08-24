# Visual Studio Code - Community UI Toolkit

> [!WARNING]
> This project is in an early stage of development and not ready for production use.

The `vscode-community-ui-toolkit` is a web components library provided by the Visual Studio Code community for building [webview-based extensions](https://code.visualstudio.com/api/extension-guides/webview) in Visual Studio Code.

> [!NOTE]
> The library is based on the [VS Code Webview UI Toolkit](https://github.com/microsoft/vscode-webview-ui-toolkit), which has announced to be deprecated on January 1, 2025. See the [deprecation announcement](https://github.com/microsoft/vscode-webview-ui-toolkit/issues/561) for more details.

## Join the community

Join the [VS Code UI Toolkit](https://discord.gg/wtv7wS2A79) Discord server to discuss the development of the `vscode-community-ui-toolkit`.

## Contributing

If you want to contribute, please find an open issue you would like to work on and leave us a comment. If you have any questions, feel free to ask in the issue or in the Discord server.

## Web Components

Check our issue list for the current status of the components.

### Existing component support

- [x] badge
- [x] button
- [ ] checkbox
- [ ] data-grid
- [x] divider
- [ ] dropdown
- [x] link
- [ ] option
- [ ] panels
- [ ] progress-ring
- [ ] radio
- [ ] radio-group
- [x] tag
- [ ] text-area
- [ ] text-field

### New components

- [x] icon
- [x] label
- [ ] loader
- [ ] ...

## Local Development

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev:start` to start the development server
4. Open the `http://localhost:8000/dev/index.html` in your browser

## Todo

- [ ] Project name
- [ ] Add all components from the `@vscode/webview-ui-toolkit` package
- [ ] Add documentation for all components
- [ ] Add examples for all components
- [ ] Release process
- [ ] React support (separate package)
- [ ] ...

## References

- <https://lit.dev/>
- <https://github.com/microsoft/vscode-webview-ui-toolkit>
