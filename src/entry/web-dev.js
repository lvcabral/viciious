// Host interfaces
import { attach as video    } from "../host/video-canvas";
import { attach as audio    } from "../host/audio-OscillatorNode";
import { attach as joystick } from "../host/joystick-KeyboardEvent";
import { attach as keyboard } from "../host/keyboard-KeyboardEvent";

// Target devices
import { attach as wires } from "../target/wires";
import { attach as ram   } from "../target/ram";
import { attach as vic   } from "../target/vic";
import { attach as sid   } from "../target/sid";
import { attach as cias  } from "../target/cias";
import { attach as cpu   } from "../target/cpu";
import { attach as tape  } from "../target/tape";

// ROMs
import basic     from "../target/rom/basic";
import kernal    from "../target/rom/skipRamTest";
import character from "../target/rom/character";

// Bringup
import { bringup } from "../target/bringup";

// Everything else
import { attach as monitor }     from "../monitor";
import { attach as webFrontEnd } from "../host/webFrontEnd";
import { attach as dragAndDrop } from "../host/dragAndDrop";


const c64 = bringup({
  host:   { audio, video, keyboard, joystick },
  target: { wires, ram, vic, sid, cpu, cias, tape, basic, kernal, character },
  attachments: [
    monitor,
    dragAndDrop,
    webFrontEnd,
  ],
});

c64.runloop.run();

import { ingest } from "../host/ingest";
import retaliatedx from "../games/retaliatedx-prg.js";
import assembloids from "../games/assembloids-prg.js";
import c64anabalt from "../games/c64anabalt-prg.js";


// Running the game according to URL parameter
const prgName = getParameterByName("prg");
if (prgName && prgName.trim().length > 0) {
  loadPrg(prgName);
}

function loadPrg(prg) {
  console.log("loading ", prg);
  switch (prg) {
    case "retaliatedx":
      ingest(c64, `${prg}.prg`, retaliatedx);
      break;
    case "assembloids":
      ingest(c64, `${prg}.prg`, assembloids);
      break;
    case "c64anabalt":
      ingest(c64, `${prg}.prg`, c64anabalt);
      break;
    default:
      break;
  }
}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
