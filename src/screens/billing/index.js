import Layout from '../../components/Layout.js'
import { getState, addBill } from '../../state/store.js'
import { h } from '../../utils/dom.js'

export default function Billing(){
  const s = getState();
  const container = h("div",{});

  function render(){
    const rows = s.bills.map(b=>h("tr",{},[
      h("td",{}, b.id),
      h("td",{}, (s.patients.find(p=>p.id===b.patientId)||{}).name || b.patientId),
      h("td",{}, b.date),
      h("td",{}, b.items.map(i=>`${i.name} (₹${i.amount})`).join(", ")),
      h("td",{}, "₹"+b.items.reduce((a,i)=>a+i.amount,0)),
      h("td",{}, b.status),
    ]));
    const table = h("div",{className:"card"},[
      h("div",{className:"row", style:"justify-content: space-between"},[
        h("h3",{},"Bills"),
        h("button",{className:"btn", onclick:()=>openCreate()},"+ New Bill")
      ]),
      h("table",{className:"table"},[
        h("thead",{},h("tr",{},["ID","Patient","Date","Items","Total","Status"].map(x=>h("th",{},x)))),
        h("tbody",{}, rows)
      ])
    ]);
    container.replaceChildren(table);
  }

  function openCreate(){
    const id = "B-" + Math.random().toString(36).slice(2,6).toUpperCase();
    const form = h("div",{className:"card"},[
      h("h3",{},"New Bill"),
      h("div",{className:"grid cols-3"},[
        fld("ID", id, true),
        h("div",{},[h("label",{},"Patient"),
          ((opts)=>{ const sel=h("select",{id:"b-pid", className:"input"}); opts.forEach(o=>sel.appendChild(h("option",{value:o.id},`${o.name} (${o.id})`))); return sel; })(s.patients)
        ]),
        fld("Date", new Date().toISOString().slice(0,10)),
        fld("Item 1", "Consultation"),
        fld("Amount 1", "500"),
        fld("Item 2", ""),
        fld("Amount 2", ""),
      ]),
      h("div",{className:"row", style:"justify-content:flex-end"},[
        h("button",{className:"btn ghost", onclick:()=>render()},"Cancel"),
        h("button",{className:"btn", onclick:()=>{
          const items=[];
          const it1 = v("Item 1"); const am1 = Number(v("Amount 1")||0); if(it1) items.push({name:it1, amount:am1});
          const it2 = v("Item 2"); const am2 = Number(v("Amount 2")||0); if(it2) items.push({name:it2, amount:am2});
          addBill({ id, patientId: document.getElementById("b-pid").value, date: v("Date"), items, status:"UNPAID" });
          render();
        }},"Save")
      ])
    ]);
    container.replaceChildren(form);
  }

  const fld=(label,val="",ro=false)=>h("div",{},[h("label",{},label), h("input",{id:`f-${label}`, className:"input", value:val, readonly:ro})]);
  const v=(label)=>document.getElementById(`f-${label}`).value.trim();

  render();
  return Layout(container, "#/billing");
}
