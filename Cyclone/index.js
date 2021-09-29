import { sampleEntity } from "./Entities/Actors/Characters/SampleEntity.js";
import { anotherSampleEntity } from "./Entities/Actors/Characters/AnotherSampleEntity.js";

import { meshEntrance } from "./Systems/Mesh/MeshEntrance.js";
import { sampleSystem } from "./Systems/SampleText/SampleSystem.js";

const entities = 
[
	sampleEntity,
	anotherSampleEntity,
];
const systems =
[
	meshEntrance,
	sampleSystem
];

export const module = 
{
	entities,
	systems
};