import { $, h } from '../utils/dom.js'
export default function Layout(children, active="#/"){
  const layout = h("div",{className:"layout"},
    [
      // sidebar
      h("aside",{className:"sidebar"},[
        h("div",{className:"brand"},"🦷 DentEMR"),
        (()=>{
          const nav = h("nav",{className:"nav"});
          const links=[
            ["Dashboard","#/"],
            ["Patients","#/patients"],
            ["Appointments","#/appointments"],
            ["Treatments","#/treatments"],
            ["Billing","#/billing"],
            ["Settings","#/settings"],
          ];
          for(const [label, href] of links){
            const a = h("a",{href, className: location.hash===href || (href==="#/"&&location.hash==="") ? "active":""},[label]);
            nav.appendChild(a);
          }
          return nav;
        })(),
        h("div",{className:"muted", style:"position:absolute; bottom:12px"},["v0.1"])
      ]),
      // main
      h("main",{},[
        h("div",{className:"topbar"},[
          h("div",{},[h("strong",{},"Dentist EMR Template")," – demo only" ]),
          h("div",{className:"row"},[
            h("input",{className:"input", placeholder:"Quick search…", oninput:(e)=>{
              const ev = new CustomEvent('global-search',{ detail: e.target.value.trim() });
              window.dispatchEvent(ev);
            }})
          ])
        ]),
        h("section",{className:"content"},[children])
      ])
    ]
  );
  return layout;
}
