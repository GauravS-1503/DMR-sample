import Dashboard from './screens/dashboard/index.js'
import Patients from './screens/patients/index.js'
import PatientView from './screens/patient/index.js'
import Appointments from './screens/appointments/index.js'
import Treatments from './screens/treatments/index.js'
import Billing from './screens/billing/index.js'
import Settings from './screens/settings/index.js'

const routes = {
  "": Dashboard,
  "#/patients": Patients,
  "#/patient": PatientView, // expects ?id=...
  "#/appointments": Appointments,
  "#/treatments": Treatments,
  "#/billing": Billing,
  "#/settings": Settings,
};

export function resolveRoute() {
  const hash = location.hash.split('?')[0];
  return routes[hash] || routes[""];
}
