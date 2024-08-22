import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('vscode-tag')
export class Tag extends LitElement {
  static override styles = css`
    :host {
      background-color: var(--vscode-badge-background);
      border: 1px solid var(--vscode-button-border);
      border-radius: 2px;
      color: var(--vscode-badge-foreground);
      padding: 2px 4px;
      text-transform: uppercase;
    }
  `;

  override render() {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-tag': Tag;
  }
}
