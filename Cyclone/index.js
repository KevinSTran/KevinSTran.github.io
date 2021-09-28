import { sampleEntity } from "./Entities/Actors/Characters/SampleEntity.js";
import { anotherSampleEntity } from "./Entities/Actors/Characters/AnotherSampleEntity.js";

import { sampleSystem } from "./Systems/SampleSystem.js";

const entities = 
[
	sampleEntity,
	anotherSampleEntity,
];
const systems =
[
	sampleSystem
];

export const module = 
{
	entities,
	systems
};