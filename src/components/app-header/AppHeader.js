import { LitElement, html } from "lit";

export class AppHeader extends LitElement {
  createRenderRoot() { return this; }

  static get properties() {
    return {
      _mode: {
        state: true,
        type: String,
        hasChanged(newValue, oldValue) {
	        localStorage.setItem("ditella-sl-theme", newValue);

          const htmlTag = document.querySelector("html");
          if (newValue === "dark") { htmlTag.classList.add("sl-theme-dark"); }
          else { htmlTag.classList.remove("sl-theme-dark"); }

          return newValue !== oldValue;
        }
      }
    };
  }

  constructor() {
    super();

  	const userPreferredTheme = localStorage.getItem("ditella-sl-theme");
    if (userPreferredTheme) {
	    this._mode = userPreferredTheme;
    } else {
      const darkModePreference = "(prefers-color-scheme: dark)";
      this._mode = window.matchMedia(darkModePreference).matches ? "dark" : "light";
    }
  }

  firstUpdated() {
    document.querySelector("sl-switch").checked = this._mode === "dark";
  }

  _handleSwitcherChange(ev) {
    this._mode = ev.target.checked ? "dark" : "light";
  }

  /**
   * No estoy seguro de si deberíamos incluir el `disconnectedCallback`,
   * dado que no sé si al declarar el evento @sl-change en el render,
   * automáticamente Lit lo remueve al desmontarse el componente 🤷
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    document.querySelector("sl-switch").removeEventListener("sl-change", this._handleSwitcherChange);
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
