import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

const COMPONENT_NAME = 'vscode-divider';

@customElement(COMPONENT_NAME)
export class Divider extends LitElement {
  static override styles = css`
    :host {
      border: none;
      border-top: 1px solid var(--vscode-settings-dropdownListBorder);
      box-sizing: content-box;
      display: block;
      height: 0;
      margin: 4px 0;
      width: 100%;
    }
  `;

  override render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [COMPONENT_NAME]: Divider;
  }
}
