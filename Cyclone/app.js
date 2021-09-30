import { module } from "./index.js";
import { library } from "./Library/Library.js";

const Run = function() { library.machine.Run(module, library); }

export const app = { module, library, Run };