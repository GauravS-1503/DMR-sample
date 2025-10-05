import { resolveRoute } from './router.js'
import { render } from './utils/dom.js'

function mount(){
  const Screen = resolveRoute();
  const node = Screen();
  const app = document.getElementById("app");
  render(app, node);
}
window.addEventListener("hashchange", mount);
window.addEventListener("load", mount);
