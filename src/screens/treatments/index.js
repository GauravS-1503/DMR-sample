import Layout from '../../components/Layout.js'
import { getState } from '../../state/store.js'
import { h } from '../../utils/dom.js'

export default function Treatments(){
  const s = getState();
  const rows = s.treatments.map(t=>h("tr",{},[
    h("td",{}, t.id),
    h("td",{}, (s.patients.find(p=>p.id===t.patientId)||{}).name || t.patientId),
    h("td",{}, t.date),
    h("td",{}, t.procedure),
    h("td",{}, t.tooth),
    h("td",{}, t.dentist),
    h("td",{}, "₹"+t.cost),
  ]));
  const table = h("div",{className:"card"},[
    h("h3",{},"Treatments"),
    h("table",{className:"table"},[
      h("thead",{}, h("tr",{},["ID","Patient","Date","Procedure","Tooth","Dentist","Cost"].map(x=>h("th",{},x)))),
      h("tbody",{}, rows)
    ])
  ]);
  return Layout(table, "#/treatments");
}
