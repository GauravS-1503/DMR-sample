import Layout from '../../components/Layout.js'
import { h } from '../../utils/dom.js'
export default function Settings(){
  const card = h("div",{className:"card"},[
    h("h3",{},"Settings"),
    h("p",{className:"muted"},"This is a static template. Add clinic profile, users/roles, export/import, etc.")
  ]);
  return Layout(card, "#/settings");
}
