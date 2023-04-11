import { LitElement, html } from "lit";

import "./components/kitten-card";
import "./components/app-header";

export class AppComponent extends LitElement {
  createRenderRoot() { return this; }

  render() {
    return html`
      <app-header></app-header>
      <main>
        <kitten-card></kitten-card>
        <sl-button>Este es un botón</sl-button>
      </main>
    `;
  }
}

window.customElements.define("app-component", AppComponent);
