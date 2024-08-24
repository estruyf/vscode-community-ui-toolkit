import {
  fontFamily,
  fontSize,
  foreground,
  buttonForeground,
  buttonBackground,
  buttonBorder,
  focusBorder,
  buttonHoverBackground,
  buttonSecondaryBackground,
  buttonSecondaryForeground,
  buttonSecondaryHoverBackground,
  contrastActiveBorder,
} from './../constants';
import { LitElement, html, css, unsafeCSS } from 'lit';
import { property, customElement } from 'lit/decorators.js';

const COMPONENT_NAME = 'vscode-button';

export type ButtonAppearance = 'primary' | 'secondary' | 'icon';

@customElement(COMPONENT_NAME)
export class Button extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      outline: none;
      font-family: ${unsafeCSS(fontFamily)};
      font-size: ${unsafeCSS(fontSize)};
      line-height: normal;
      color: ${unsafeCSS(buttonForeground)};
      background: ${unsafeCSS(buttonBackground)};
      border-radius: 2px;
      fill: currentColor;
      cursor: pointer;
    }

    :host button {
      background: transparent;
      height: inherit;
      flex-grow: 1;
      box-sizing: border-box;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 4px 11px;
      white-space: wrap;
      outline: none;
      text-decoration: none;
      border: 1px solid ${unsafeCSS(buttonBorder)};
      color: inherit;
      border-radius: inherit;
      fill: inherit;
      cursor: inherit;
      font-family: inherit;

      &:focus-visible {
        outline: 1px solid ${unsafeCSS(focusBorder)};
        outline-offset: 2px;
      }

      &::-moz-focus-inner {
        border: 0;
      }
    }

    :host(:hover) {
      background: ${unsafeCSS(buttonHoverBackground)};
    }

    :host(:active) {
      background: ${unsafeCSS(buttonBackground)};
    }

    :host([disabled]) {
      opacity: 0.4;
      background: ${unsafeCSS(buttonBackground)};
      cursor: not-allowed;
    }

    /* Secondary button */
    :host([appearance='secondary']) {
      background: ${unsafeCSS(buttonSecondaryBackground)};
      color: ${unsafeCSS(buttonSecondaryForeground)};
    }

    :host([appearance='secondary']:hover) {
      background: ${unsafeCSS(buttonSecondaryHoverBackground)};
    }

    :host([appearance='secondary']:active) {
      background: ${unsafeCSS(buttonSecondaryHoverBackground)};
    }

    :host([appearance='secondary'][disabled]) {
      background: ${unsafeCSS(buttonSecondaryHoverBackground)};
    }

    /* Icon button */
    :host([appearance='icon']) {
      background: transparent;
      border-radius: 5px;
      color: ${unsafeCSS(foreground)};
    }

    :host([appearance='icon']:hover) {
      background: rgba(90, 93, 94, 0.31);
      outline: 1px dotted ${unsafeCSS(contrastActiveBorder)};
      outline-offset: -1px;
    }

    :host([appearance='icon']) button {
      padding: 3px;
      border: none;
    }

    :host([appearance='icon']:active) {
      background: rgba(90, 93, 94, 0.31);
    }

    :host([appearance='icon']) .control:focus-visible {
      outline: 1px solid ${unsafeCSS(focusBorder)};
      outline-offset: 0;
    }

    :host([appearance='icon'][disabled]) {
      background: transparent;
    }

    .start {
      display: flex;
    }

    .content {
      display: flex;
    }

    .start ::slotted(*) {
      margin-inline-end: 8px;
    }
  `;

  @property({ type: String })
  appearance: ButtonAppearance = 'primary';

  /**
   * Component lifecycle method that runs when the component is inserted
   * into the DOM.
   *
   * @internal
   */
  override connectedCallback() {
    super.connectedCallback();

    // If the appearance property has not been set, set it to the
    // value of the appearance attribute.
    if (!this.appearance) {
      const appearanceValue = this.getAttribute('appearance');
      this.appearance = appearanceValue as ButtonAppearance;
    }
  }

  /**
   * Component lifecycle method that runs when an attribute of the
   * element is changed.
   *
   * @param name - The attribute that was changed
   * @param oldVal - The old value of the attribute
   * @param newVal - The new value of the attribute
   */
  override attributeChangedCallback(
    name: string,
    oldVal: string | null,
    newVal: string | null
  ) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === 'appearance' && newVal !== oldVal) {
      this.appearance = newVal as ButtonAppearance;
    }
  }

  /**
   * Render the component template.
   */
  override render() {
    return html`
      <button class="${this.appearance}">
        <span class="start">
          <slot name="start"></slot>
        </span>
        <span class="content">
          <slot></slot>
        </span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [COMPONENT_NAME]: Button;
  }
}
