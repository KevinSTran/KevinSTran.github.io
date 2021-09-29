
// TODO: Turn to array and cycle through array

export const machine = 
{
	Open : function(entities, systems, library)    { RunSystems("Open", entities, systems, library); },
	Begin : function(entities, systems, library)   { console.log(library); RunSystems("Begin", entities, systems, library); },
	Update : function(entities, systems, library)  { RunSystems("Update", entities, systems, library); },
	Collide : function(entities, systems, library) { RunSystems("Collide", entities, systems, library); },
	Finish : function(entities, systems, library)  { RunSystems("Finish", entities, systems, library); },
	Close : function(entities, systems, library)   { RunSystems("Close", entities, systems, library);  }
}

function RunSystems(key, entities, systems, library)
{
	if (entities === undefined || systems === undefined || library === undefined) return;
	library.algorithm.LoopThrough
	(	
		systems,
		function(system) { RunSystem(key, system, entities, library); }
	);
}
function RunSystem(key, system, entities, library)
{
	if (key in system)
	{
		var readyEntities = AcquireReadyEntities(system, entities, library);
		library.algorithm.LoopThrough(readyEntities, system[key]);
	}
}

function AcquireReadyEntities(system, entities, library)
{
	return library.algorithm.GrabFrom
	(
		entities, 
		function(entity) { return IsEntityCompatible(entity, system, library); }
	);
}
function IsEntityCompatible(entity, system, library)
{
	var result = true;
	library.algorithm.LoopThrough(system.requirements, function(requirement) 
	{
		result &= library.algorithm.SearchFor(Object.keys(entity.components), function(name){ return name === requirement; }).doesExist;
	});
	return result;
}