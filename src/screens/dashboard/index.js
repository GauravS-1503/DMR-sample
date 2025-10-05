import Layout from '../../components/Layout.js'
import { getState } from '../../state/store.js'
import { h } from '../../utils/dom.js'

export default function Dashboard(){
  const s = getState();
  const cards = h("div",{className:"grid cols-3"},[
    metric("Patients", s.patients.length),
    metric("Appointments Today", s.appointments.filter(a=>a.date===new Date().toISOString().slice(0,10)).length),
    metric("Treatments Recorded", s.treatments.length),
  ]);
  const recent = h("div",{className:"card"},[
    h("h3",{},"Today’s Appointments"),
    h("table",{className:"table"},[
      h("thead",{},[h("tr",{},[th("Time"), th("Patient"), th("Purpose"), th("Status")])]),
      h("tbody",{}, s.appointments.slice(0,5).map(a=>h("tr",{},[
        td(a.time),
        td((s.patients.find(p=>p.id===a.patientId)||{}).name || a.patientId),
        td(a.purpose),
        td(statusBadge(a.status))
      ])))
    ])
  ]);
  return Layout(h("div",{className:"grid"},[cards, recent]));
}

const metric = (label, value)=> h("div",{className:"card"},[ h("div",{className:"muted"},label), h("div",{style:"font-size:32px; font-weight:700"}, String(value)) ]);
const th = (t)=>h("th",{},t);
const td = (t)=>h("td",{},t);
const statusBadge = (s)=>{
  const cls = s==="SCHEDULED"?"badge b-warn": s==="COMPLETED"?"badge b-ok":"badge b-danger";
  return h("span",{className:cls},s);
}
