import Layout from '../../components/Layout.js'
import { getState, findPatient, addTreatment } from '../../state/store.js'
import { h } from '../../utils/dom.js'

function getParam(name){ return new URLSearchParams(location.hash.split('?')[1]||"").get(name); }

export default function PatientView(){
  const id = getParam("id");
  const s = getState();
  const p = findPatient(id);
  if(!p){ return Layout(h("div",{},["Patient not found."])); }

  const appts = s.appointments.filter(a=>a.patientId===id);
  const trts = s.treatments.filter(t=>t.patientId===id);

  const addForm = h("div",{className:"card"},[
    h("h3",{},"Add Treatment"),
    h("div",{className:"grid cols-3"},[
      fld("Date", new Date().toISOString().slice(0,10)),
      fld("Procedure", "Filling"),
      fld("Tooth", "11"),
      fld("Dentist", "Dr. Rao"),
      fld("Cost", "1000"),
    ]),
    h("div",{className:"grid"},[
      h("label",{},"Notes"),
      h("textarea",{id:"f-Notes", rows:3, className:"input"})
    ]),
    h("div",{className:"row", style:"justify-content:flex-end"},[
      h("button",{className:"btn", onclick:()=>{
        const t = {
          id: "T-" + Math.random().toString(36).slice(2,6).toUpperCase(),
          patientId: id,
          date: document.getElementById("f-Date").value,
          procedure: document.getElementById("f-Procedure").value,
          tooth: document.getElementById("f-Tooth").value,
          dentist: document.getElementById("f-Dentist").value,
          cost: Number(document.getElementById("f-Cost").value||0),
          notes: document.getElementById("f-Notes").value
        };
        addTreatment(t);
        location.reload();
      }}, "Save Treatment")
    ])
  ]);

  return Layout(h("div",{className:"grid"},[
    h("div",{className:"card"},[
      h("h2",{}, p.name),
      h("div",{className:"muted"},`ID ${p.id} · ${p.sex} · ${p.age} yrs · ${p.phone}`),
      h("p",{}, ["Allergies: ", h("strong",{}, p.allergies || "None") ]),
      h("p",{}, ["Notes: ", p.notes || "-" ]),
    ]),
    h("div",{className:"card"},[
      h("h3",{},"Appointments"),
      h("table",{className:"table"},[
        h("thead",{}, h("tr",{},["Date","Time","Purpose","Status"].map(x=>h("th",{},x)))),
        h("tbody",{}, appts.map(a=>h("tr",{},[a.date,a.time,a.purpose,a.status].map(x=>h("td",{},x)))))
      ])
    ]),
    h("div",{className:"card"},[
      h("h3",{},"Treatments"),
      h("table",{className:"table"},[
        h("thead",{}, h("tr",{},["Date","Procedure","Tooth","Dentist","Cost"].map(x=>h("th",{},x)))),
        h("tbody",{}, trts.map(t=>h("tr",{},[t.date,t.procedure,t.tooth,t.dentist,`₹${t.cost}`].map(x=>h("td",{},x)))))
      ])
    ]),
    addForm
  ]), "#/patients");
}

const fld=(label,val="")=>h("div",{},[h("label",{},label), h("input",{id:`f-${label}`, className:"input", value:val})]);
