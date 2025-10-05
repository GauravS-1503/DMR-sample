import Layout from '../../components/Layout.js'
import { getState, addAppointment, setApptStatus } from '../../state/store.js'
import { h } from '../../utils/dom.js'

export default function Appointments(){
  const s = getState();
  const container = h("div",{});

  function render(){
    const table = h("div",{className:"card"},[
      h("div",{className:"row", style:"justify-content: space-between"},[
        h("h3",{},"Appointments"),
        h("button",{className:"btn", onclick:()=>openCreate()}, "+ New Appointment")
      ]),
      h("table",{className:"table"},[
        h("thead",{},h("tr",{},["ID","Patient","Date","Time","Purpose","Status","Action"].map(x=>h("th",{},x)))),
        h("tbody",{}, s.appointments.map(a=>h("tr",{},[
          h("td",{}, a.id),
          h("td",{}, (s.patients.find(p=>p.id===a.patientId)||{}).name || a.patientId),
          h("td",{}, a.date),
          h("td",{}, a.time),
          h("td",{}, a.purpose),
          h("td",{}, a.status),
          h("td",{}, h("button",{className:"btn", onclick:()=>{
            setApptStatus(a.id, a.status==="SCHEDULED"?"COMPLETED":"SCHEDULED");
            render();
          }}, a.status==="SCHEDULED"?"Mark Done":"Re-schedule"))
        ])))
      ])
    ]);
    container.replaceChildren(table);
  }

  function openCreate(){
    const id = "A-" + Math.random().toString(36).slice(2,6).toUpperCase();
    const form = h("div",{className:"card"},[
      h("h3",{},"New Appointment"),
      h("div",{className:"grid cols-3"},[
        fld("ID", id, true),
        h("div",{},[h("label",{},"Patient"),
          ((opts)=>{ const sel=h("select",{id:"f-pid", className:"input"}); opts.forEach(o=>sel.appendChild(h("option",{value:o.id},`${o.name} (${o.id})`))); return sel; })(s.patients)
        ]),
        fld("Date", new Date().toISOString().slice(0,10)),
        fld("Time","10:00"),
        fld("Purpose","Check-up"),
      ]),
      h("div",{className:"row", style:"justify-content:flex-end"},[
        h("button",{className:"btn ghost", onclick:()=>render()},"Cancel"),
        h("button",{className:"btn", onclick:()=>{
          addAppointment({ id, patientId: document.getElementById("f-pid").value, date: v("Date"), time:v("Time"), purpose:v("Purpose"), status:"SCHEDULED" });
          render();
        }},"Save")
      ])
    ]);
    container.replaceChildren(form);
  }

  const fld=(label,val="",ro=false)=>h("div",{},[h("label",{},label), h("input",{id:`f-${label}`, className:"input", value:val, readonly:ro})]);
  const v=(label)=>document.getElementById(`f-${label}`).value.trim();

  render();
  return Layout(container, "#/appointments");
}
