import { html } from "../../deps.ts";
import { Template } from "../../src/types/template.d.ts";
import InstallLayout from "./layouts/install.ts";

const template: Template = {
  layout: InstallLayout,
  body: function (params) {
    return html`
        <div class="container">
            
        </div>
    `;
  },
};

export default template;
