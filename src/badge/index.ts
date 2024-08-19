import {html, css, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('vscode-badge')
export class Badge extends LitElement {
  static override styles = css`
    :host {
      background-color: var(--vscode-badge-background);
      border: 1px solid var(--vscode-button-border);
      border-radius: 11px;
      box-sizing: border-box;
      color: var(--vscode-badge-foreground);
      font-family: var(--vscode-font-family);
      font-size: 11px;
      line-height: 16px;
      min-width: 18px;
      min-height: 18px;
      padding: 3px 6px;
      text-align: center;
    }
  `;

  override render() {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-badge': Badge;
  }
}
