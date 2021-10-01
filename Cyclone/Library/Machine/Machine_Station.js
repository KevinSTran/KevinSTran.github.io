export const machine_station =
{
	Operate : function(state, entities, systems, library) { if (state.CanRun()) state.Run(entities, systems, library); },
	// TODO: Customisable "RunSystems" variables for collision systems
	RunSystems : function(key, entities, systems, library, canRunOnce, additionalAction)
	{
		if (entities === undefined || systems === undefined || library === undefined) return;
		library.algorithm.LoopThrough
		(	
			systems,
			function(system) { machine_station_steps.RunSystem
			(
				key, system, entities, library, canRunOnce, additionalAction,
				machine_station_steps.AcquireReadyEntities(system, entities, library, canRunOnce, key, machine_station_steps.IsEntityCompatible)
			); }
		);
	}
};
const machine_station_steps =
{
	/// <summary>
	/// </summary>
	/// <param name="">
	/// </param>
	/// <param name="">
	/// </param>
	/// <param name="">
	/// </param>
	/// <param name="">
	/// </param>
	/// <param name="canRunOnce">
	/// 	- For events like "begin", this is required to ensure
	///       a system in this event does not run more than once
	/// </param>
	/// <param name="">
	/// </param>
	RunSystem : function(key, system, entities, library, canRunOnce, additionalAction, readyEntities)
	{
		if (key in system)
		{
			library.algorithm.LoopThrough(readyEntities, function(entity) 
			{
				system[key](entity, library); 
				if (additionalAction !== undefined) additionalAction(entity, library);
				if (canRunOnce !== undefined && canRunOnce) library.meta.Adjust(entity, "hasRun" + key, true);
			} );
		}
	},

	AcquireReadyEntities : function(system, entities, library, canRunOnce, key, isEntityCompatible)
	{
		return library.algorithm.GrabFrom
		(
			entities, 
			function(entity) 
			{
				return isEntityCompatible(entity, system, library) &&
				(
					canRunOnce === undefined || !canRunOnce ||
					library.meta.AcquireFrom(entity, "hasRun" + key) === undefined ||
					!library.meta.AcquireFrom(entity, "hasRun" + key)
				); 
			}
		);
	},
	IsEntityCompatible : function(entity, system, library)
	{
		var result = true;
		library.algorithm.LoopThrough(system.requirements, function(requirement) 
		{
			result &= library.algorithm.SearchFor(Object.keys(entity.components), function(name){ return name === requirement; }).doesExist;
		});
		return result;
	}
};