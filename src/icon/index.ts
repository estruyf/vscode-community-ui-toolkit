import { css, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { codiconsLibrary } from './codicons';

export const COMPONENT_NAME = 'vscode-icon';

/**
 * Icon component
 *
 * @element vscode-icon
 *
 * @cssprop --vscode-ui-icon-size - Icon size
 */
@customElement(COMPONENT_NAME)
export class Icon extends LitElement {
  static override styles = css`
    :host {
      font: normal normal normal var(--vscode-ui-icon-size, 16px) / 1 codicon;
      display: inline-block;
      text-decoration: none;
      text-rendering: auto;
      text-align: center;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      color: inherit;
    }

    @keyframes codicon-spin {
      100% {
        transform: rotate(360deg);
      }
    }

    :host([spin]) {
      /* Use steps to throttle FPS to reduce CPU usage */
      animation: codicon-spin 1.5s steps(30) infinite;
    }

    /* custom speed & easing for loading icon */
    :host([name='loading'][spin]) {
      animation-duration: 1s !important;
      animation-timing-function: cubic-bezier(
        0.53,
        0.21,
        0.29,
        0.67
      ) !important;
    }

    ${unsafeCSS(
      Object.entries(codiconsLibrary)
        .map(
          ([name, code]) =>
            /*css*/ `:host([name="${name}"])::before { content: '${code}'; }`
        )
        .join('')
    )}
  `;

  @property({ reflect: true })
  name?: keyof typeof codiconsLibrary;

  @property()
  size?: string;

  @property({ type: Boolean, reflect: true })
  spin = false;

  override updated(changedProperties: Map<string, unknown>) {
    if (
      changedProperties.has('size') &&
      this.style.getPropertyValue('--vscode-ui-icon-size') !== this.size
    ) {
      if (this.size === undefined) {
        this.style.removeProperty('--vscode-ui-icon-size');
      } else {
        this.style.setProperty('--vscode-ui-icon-size', this.size);
      }
    }
    super.update(changedProperties);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [COMPONENT_NAME]: Icon;
  }
}
