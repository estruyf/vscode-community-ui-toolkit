import { html, css, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import {
  badgeBackground,
  badgeForeground,
  buttonBorder,
  fontFamily,
} from '../constants';

@customElement('vscode-badge')
export class Badge extends LitElement {
  static override styles = css`
    :host {
      background-color: ${unsafeCSS(badgeBackground)};
      border: 1px solid ${unsafeCSS(buttonBorder)};
      border-radius: 11px;
      box-sizing: border-box;
      color: ${unsafeCSS(badgeForeground)};
      font-family: ${unsafeCSS(fontFamily)};
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
