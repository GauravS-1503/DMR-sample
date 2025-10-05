import Layout from '../../components/Layout.js'
import { getState, addPatient } from '../../state/store.js'
import { h } from '../../utils/dom.js'

export default function Patients(){
  const s = getState();
  const container = h("div",{});

  const list = ()=>{
    const rows = s.patients.map(p=>h("tr",{},[
      h("td",{}, p.id),
      h("td",{}, h("a",{href:`#/patient?id=${encodeURIComponent(p.id)}`}, p.name)),
      h("td",{}, `${p.age}`),
      h("td",{}, p.sex),
      h("td",{}, p.phone),
      h("td",{}, p.allergies || "-"),
    ]));
    return h("div",{className:"card"},[
      h("div",{className:"row", style:"justify-content: space-between"},[
        h("h3",{},"Patients"),
        h("button",{className:"btn", onclick:()=>openCreate()}, "+ New Patient")
      ]),
      h("table",{className:"table"},[
        h("thead",{},[h("tr",{},["ID","Name","Age","Sex","Phone","Allergies"].map(t=>h("th",{},t)))]),
        h("tbody",{}, rows)
      ])
    ]);
  }

  function openCreate(){
    const id = "P-" + Math.random().toString(36).slice(2,6).toUpperCase();
    const form = h("div",{className:"card"},[
      h("h3",{},"Add Patient"),
      h("div",{className:"grid cols-2"},[
        field("ID", id, true),
        field("Name"),
        field("Age"),
        field("Sex (M/F)"),
        field("Phone"),
        field("Allergies"),
      ]),
      h("div",{className:"grid"},[
        h("label",{},"Notes"),
        h("textarea",{id:"p-notes", rows:3, className:"input"})
      ]),
      h("div",{className:"row", style:"justify-content:flex-end"},[
        h("button",{className:"btn ghost", onclick:()=>render()}, "Cancel"),
        h("button",{className:"btn", onclick:()=>{
          const payload = {
            id,
            name: document.getElementById("f-Name").value.trim(),
            age: Number(document.getElementById("f-Age").value||0),
            sex: document.getElementById("f-Sex (M/F)").value.trim().toUpperCase().startsWith("F")?"F":"M",
            phone: document.getElementById("f-Phone").value.trim(),
            allergies: document.getElementById("f-Allergies").value.trim(),
            notes: document.getElementById("p-notes").value.trim(),
          };
          addPatient(payload);
          render();
        }}, "Save")
      ])
    ]);
    container.replaceChildren(form);
  }

  function field(label, val="", readonly=false){
    return h("div",{},[
      h("label",{}, label),
      h("input",{id:`f-${label}`, className:"input", value:val, readonly})
    ]);
  }

  function render(){ container.replaceChildren(list()); }
  render();
  return Layout(container, "#/patients");
}
