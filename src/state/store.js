const LS_KEY = "dentist-emr-state-v1";
const defaultState = {
  patients:[
    { id:"P-0001", name:"Aisha Khan", age:29, sex:"F", phone:"9876543210", notes:"Orthodontic follow-up", allergies:"Penicillin" },
    { id:"P-0002", name:"Rahul Mehta", age:41, sex:"M", phone:"9820001111", notes:"Root canal completed", allergies:"-" }
  ],
  appointments:[
    { id:"A-1001", patientId:"P-0001", date:new Date().toISOString().slice(0,10), time:"11:00", purpose:"Braces Adjustment", status:"SCHEDULED" },
    { id:"A-1002", patientId:"P-0002", date:new Date().toISOString().slice(0,10), time:"15:30", purpose:"Crown Fitting", status:"SCHEDULED" }
  ],
  treatments:[
    { id:"T-2001", patientId:"P-0002", date:new Date().toISOString().slice(0,10), procedure:"Root Canal", tooth:"36", dentist:"Dr. Rao", notes:"Medication advised", cost:4500 }
  ],
  bills:[]
};
let state = JSON.parse(localStorage.getItem(LS_KEY) || "null") || defaultState;

const listeners = new Set();
export function getState(){ return state; }
export function subscribe(fn){ listeners.add(fn); return () => listeners.delete(fn); }
function commit() { localStorage.setItem(LS_KEY, JSON.stringify(state)); for (const fn of listeners) fn(state); }

// Patients
export function addPatient(p){ state.patients.push(p); commit(); }
export function updatePatient(id, patch){ Object.assign(state.patients.find(x=>x.id===id) || {}, patch); commit(); }
export function findPatient(id){ return state.patients.find(x=>x.id===id); }

// Appointments
export function addAppointment(a){ state.appointments.push(a); commit(); }
export function setApptStatus(id, status){ const a=state.appointments.find(x=>x.id===id); if(a){ a.status=status; commit(); } }

// Treatments
export function addTreatment(t){ state.treatments.push(t); commit(); }

// Bills
export function addBill(b){ state.bills.push(b); commit(); }
