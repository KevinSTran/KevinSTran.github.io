import { module } from "./index.js";
import { algorithm } from "./Libraries/Algorithm.js";
import { machine } from "./Libraries/Machine.js";
import { toybox } from "./Libraries/Toybox.js";
import { source } from "./Libraries/Source.js";
import { meta } from "./Libraries/Meta.js";

const library =
{
	algorithm,
	machine,
	toybox,
	source,
	meta
};

const Run = function() { machine.Run(module, library); }

export const app = { module, library, Run };