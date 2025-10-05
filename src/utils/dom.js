export const $ = (sel, el=document) => el.querySelector(sel);
export const $$ = (sel, el=document) => Array.from(el.querySelectorAll(sel));

export function h(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);

  // assign props & events
  for (const [k, v] of Object.entries(attrs || {})) {
    if (k.startsWith("on") && typeof v === "function") {
      el.addEventListener(k.slice(2), v);
    } else if (k === "className") {
      el.className = v;
    } else if (k in el) {
      el[k] = v;
    } else {
      el.setAttribute(k, v);
    }
  }

  // normalize children to an array and accept numbers/strings/nodes
  const list = children == null ? [] : (Array.isArray(children) ? children : [children]);
  for (const child of list) {
    if (child == null) continue;
    if (typeof child === "string" || typeof child === "number") {
      el.appendChild(document.createTextNode(String(child)));
    } else {
      el.appendChild(child);
    }
  }

  return el;
}

export function render(container, node) {
  container.innerHTML = "";
  container.appendChild(node);
}
