import { html, LitElement } from "lit";

export class AppHeader extends LitElement {
  createRenderRoot() { return this; }

  static get properties() {
    return {
      _mode: { state: true, type: String }
    };
  }

  connectedCallback() {
    super.connectedCallback();

    const userPreferredTheme = localStorage.getItem("ditella-sl-theme");
    if (!userPreferredTheme) {
      const darkModePreference = "(prefers-color-scheme: dark)";
      this._mode = window.matchMedia(darkModePreference).matches ? "dark" : "light";
    } else { this._mode = userPreferredTheme; }
  }

  _setPreferredTheme() {
    localStorage.setItem("ditella-sl-theme", this._mode);

    const htmlTag = document.querySelector("html");
    if (this._mode === "dark") { htmlTag.classList.add("sl-theme-dark"); }
    else { htmlTag.classList.remove("sl-theme-dark"); }
  }

  firstUpdated() {
    this._setPreferredTheme();
    document.querySelector("sl-switch").checked = this._mode === "dark";
  }

  updated(_changedProperties) {
    if (_changedProperties.get('_mode')) {
      this._setPreferredTheme();
    }
  }

  _handleSwitcherChange(ev) {
    this._mode = ev.target.checked ? "dark" : "light";
  }

  render() {
    return html`
      <header class="header">
        <div class="header__title">
          <strong>Proyecto de prueba</strong>
        </div>
        <sl-switch @sl-change=${this._handleSwitcherChange}></sl-switch>
      </header>
    `;
  }
}
