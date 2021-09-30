import { module } from "./index.js";

import { algorithm } from "./Library/Algorithm.js";
import { machine } from "./Library/Machine.js";
import { toybox } from "./Library/Toybox.js";
import { source } from "./Library/Source.js";
import { meta } from "./Library/Meta.js";

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