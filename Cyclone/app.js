import { module } from "./index.js";
import { algorithm } from "./Libraries/Algorithm.js";
import { machine } from "./Libraries/Machine.js";
import { toybox } from "./Libraries/Toybox.js";
import { source } from "./Libraries/Source.js";

const library =
[
	algorithm,
	machine,
	toybox,
	source
];

export const app = { module, library };