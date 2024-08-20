# Visual Studio Code - Community UI Toolkit

> [!WARNING]
> This project is in an early stage of development and not ready for production use.

The `vscode-community-ui-toolkit` is a web components library provided by the Visual Studio Code community for building [webview-based extensions](https://code.visualstudio.com/api/extension-guides/webview) in Visual Studio Code.

> [!NOTE]
> The library is based on the [VS Code Webview UI Toolkit](https://github.com/microsoft/vscode-webview-ui-toolkit), which has announced to be deprecated on January 1, 2025.

## Web Components

### Existing component support

- [x] badge
- [ ] button
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
- [ ] tag
- [ ] text-area
- [ ] text-field

### New components

- [ ] icon
- [x] label
- [ ] loader
- [ ] ...

## Local Development

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev:start` to start the development server
4. Open the `http://localhost:8000/dev/index.html` in your browser

## Todo

- [ ] Add all components from the `@vscode/webview-ui-toolkit` package
- [ ] Add documentation for all components
- [ ] Add examples for all components
- [ ] Release process
- [ ] React support (separate package)
- [ ] ...

## References

- <https://lit.dev/>
- <https://github.com/microsoft/vscode-webview-ui-toolkit>
