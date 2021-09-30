import { sampleEntity } from "./Architecture/Entities/Actors/Characters/SampleEntity.js";
import { anotherSampleEntity } from "./Architecture/Entities/Actors/Characters/AnotherSampleEntity.js";

import { meshEntrance } from "./Architecture/Systems/Mesh/MeshEntrance.js";
import { sampleSystem } from "./Architecture/Systems/SampleText/SampleSystem.js";

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