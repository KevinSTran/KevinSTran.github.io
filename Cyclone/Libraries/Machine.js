export const machine = {
	Start : function() { console.log("MAH"); },
	Update : function(entities, systems, algorithm) 
	{
		if (entities === undefined || systems === undefined || algorithm === undefined) return;
		algorithm.LoopThrough
		(	
			systems,
			function(system){ algorithm.LoopThrough(AcquireReadyEntities(system, entities, algorithm), system.Update); }
		);
	},
	End : function() { console.log("I SAID THERE IS AN ALIEN BUT YOU DON'T EVER LISTEN TO ME"); }
}

function AcquireReadyEntities(system, entities, algorithm)
{
	return algorithm.GrabFrom
	(
		entities, 
		function(entity) 
		{
			var result = true;
			algorithm.LoopThrough(system.requirements, function(requirement) 
			{
				console.log(requirement + " : " + Object.keys(entity.components));
				result &= algorithm.SearchFor(Object.keys(entity.components), function(name){ return name === requirement; }).doesExist;
			});
		} 
	);
}