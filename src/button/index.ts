import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

const COMPONENT_NAME = 'vscode-button';

export type ButtonAppearance = 'primary' | 'secondary' | 'icon';

@customElement(COMPONENT_NAME)
export class Button extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      outline: none;
      font-family: var(--vscode-font-family);
      font-size: var(--vscode-font-size, 13px);
      line-height: normal;
      color: var(--vscode-button-foreground, #ffffff);
      background: var(--vscode-button-background, #0e639c);
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
      border: 1px solid var(--vscode-button-border, transparent);
      color: inherit;
      border-radius: inherit;
      fill: inherit;
      cursor: inherit;
      font-family: inherit;

      &:focus-visible {
        outline: 1px solid var(--vscode-focusBorder, #007fd4);
        outline-offset: 2px;
      }

      &::-moz-focus-inner {
        border: 0;
      }
    }

    :host(:hover) {
      background: var(--vscode-button-hoverBackground, #1177bb);
    }

    :host(:active) {
      background: var(--vscode-button-background, #0e639c);
    }

    :host([disabled]) {
      opacity: 0.4;
      background: var(--vscode-button-background, #0e639c);
      cursor: not-allowed;
    }

    /* Secondary button */
    :host([appearance='secondary']) {
      background: var(--vscode-button-secondaryBackground, #3a3d41);
      color: var(--vscode-button-secondaryForeground, #ffffff);
    }

    :host([appearance='secondary']:hover) {
      background: var(--vscode-button-secondaryHoverBackground, #484b4f);
    }

    :host([appearance='secondary']:active) {
      background: var(--vscode-button-secondaryBackground, #3a3d41);
    }

    :host([appearance='secondary'][disabled]) {
      background: var(--vscode-button-secondaryBackground, #3a3d41);
    }

    /* Icon button */
    :host([appearance='icon']) {
      background: transparent;
      border-radius: 5px;
      color: var(--vscode-foreground, #cccccc);
    }

    :host([appearance='icon']:hover) {
      background: rgba(90, 93, 94, 0.31);
      outline: 1px dotted var(--vscode-contrastActiveBorder, #f38518);
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
      outline: 1px solid var(--vscode-focusBorder, #007fd4);
      outline-offset: 0;
    }

    :host([appearance='icon'][disabled]) {
      background: transparent;
    }

    .start,
    .end,
    .content {
      display: flex;
    }

    .start ::slotted(*) {
      margin-inline-end: 8px;
    }

    .end ::slotted(*) {
      margin-inline-start: 8px;
    }
  `;

  @property({ type: String })
  appearance: ButtonAppearance = 'primary';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  form?: string;

  @property({ type: String, reflect: true })
  formaction?: string;

  @property({ type: String, reflect: true })
  formenctype?:
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data'
    | 'text/plain';

  @property({ type: String, reflect: true })
  formmethod?: 'get' | 'post';

  @property({ type: Boolean, reflect: true })
  formnovalidate = false;

  @property({ type: String, reflect: true })
  formtarget?: '_self' | '_blank' | '_parent' | '_top';

  @property({ type: String, reflect: true })
  name?: string;

  @property({ type: String, reflect: true })
  value?: string;

  @property({ type: String, reflect: true })
  type?: 'button' | 'submit' | 'reset' | 'menu';

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
      <button
        class="${this.appearance}"
        aria-label="${this.ariaLabel || nothing}"
        form="${ifDefined(this.form)}"
        formaction="${ifDefined(this.formaction)}"
        formenctype="${ifDefined(this.formenctype)}"
        formmethod="${ifDefined(this.formmethod)}"
        ?formnovalidate=${this.formnovalidate}
        formtarget="${ifDefined(this.formtarget)}"
        name="${ifDefined(this.name)}"
        value="${ifDefined(this.value)}"
        type="${this.type || 'button'}"
        ?autofocus=${this.autofocus}
        ?disabled=${this.disabled}
      >
        <span class="start">
          <slot name="start"></slot>
        </span>
        <span class="content">
          <slot></slot>
        </span>
        <span class="end">
          <slot name="end"></slot>
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
