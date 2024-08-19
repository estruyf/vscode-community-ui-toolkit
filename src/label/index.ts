import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('vscode-label')
export class Label extends LitElement {
  static override styles = css`
    :host {
      color: var(--vscode-foreground);
      font-family: var(--vscode-font-family);
      font-size: var(--vscode-font-size);
      font-weight: 400;
      margin: 0;
      overflow: hidden;
      padding: 4px 0 0;
      text-overflow: ellipsis;
      display: block;
      white-space: nowrap;
    }
  `;

  override render() {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-label': Label;
  }
}
