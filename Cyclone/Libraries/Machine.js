export const machine = 
{
	Run : function(module, library)
	{
		this.Assemble();
		library.algorithm.LoopThrough(this.bus, function(e) 
		{
			console.log(this);
			console.log(this.Operate);
			this.Operate(e, module.entities, module.systems, library);
		} );
	},
	Assemble : function()
	{
		if (this.isAssembled) return;
		this.bus[6].Attach(this.bus[6], this.bus[1], this.bus[2], this.bus[3], this.bus[4], this.bus[5]);
		this.isAssembled = true;
	},
	isAssembled : false,
	Operate : function(e, entities, systems, library) { console.log(e); if (e.CanRun()) e.Run(entities, systems, library); },
	bus : 
	[
		// 0. Open
		{
			isReady : true,
			Run : function(entities, systems, library) { RunSystems("Open", entities, systems, library); this.isReady = false; },
			CanRun : function() { return this.isReady; }
		},
		// 1. Begin
		{
			isReady : true,
			Run : function(entities, systems, library) { RunSystems("Begin", entities, systems, library, true); },
			CanRun : function() { return this.isReady; },
			SwitchOff : function() { this.isReady = false; }
		},
		// 2. Update
		{
			isReady : true,
			Run : function(entities, systems, library) { RunSystems("Update", entities, systems, library); },
			CanRun : function() { return this.isReady; },
			SwitchOff : function() { this.isReady = false; }
		},
		// 3. Collide
		{ 
			isReady : true,
			Run : function(entities, systems, library) { RunSystems("Collide", entities, systems, library); },
			CanRun : function() { return this.isReady; },
			SwitchOff : function() { this.isReady = false; }
		},
		// 4. Summarise
		{
			isReady : true,
			Run : function(entities, systems, library) { RunSystems("Summarise", entities, systems, library); },
			CanRun : function() { return this.isReady; },
			SwitchOff : function() { this.isReady = false; }
		},
		// 5. Draw
		{
			isReady : true,
			Run : function(entities, systems, library) { if ("draw" in this) draw(); },
			CanRun : function() { return this.isReady; },
			SwitchOff : function() { this.isReady = false; }
		},
		// 6. Finish
		{
			isReady : false,
			Run : function(entities, systems, library) 
			{
				// Finish runs once no matter what, so no need to set "canRunOnce" to true
				RunSystems("Finish", entities, systems, library, false, this.ReadyEntity); 
				if (this.closeEvent.CanRun()) StopBus;
				this.isReady = false;
			},
			CanRun : function() { return this.isReady; },
			ReadyUp : function() { this.isReady = true; },
			Attach(newCloseEvent, newBeginEvent, newUpdateEvent, newCollideEvent, newSummariseEvent, newDrawEvent)
			{
				this.closeEvent = newCloseEvent;
				this.beginEvent = newBeginEvent;
				this.updateEvent = newUpdateEvent;
				this.collideEvent = newCollideEvent;
				this.summariseEvent = newSummariseEvent;
				this.drawEvent = newDrawEvent;
			},
			StopBus()
			{
				this.beginEvent.SwitchOff();
				this.updateEvent.SwitchOff();
				this.collideEvent.SwitchOff();
				this.summariseEvent.SwitchOff();
				this.drawEvent.SwitchOff();
			},
			
			/// <summary>
			/// 	ReadyEntity:
			/// 	- After the finish event, reset the entities so that they can
			///       begin again when the next scene loads
			/// </summary>
			/// <param name="">
			/// </param>
			/// <param name="">
			/// </param>
			ReadyEntity : function(entity, library) { library.meta.Adjust(entity, "hasRunBegin", !this.closeEvent.CanRun()); }
		},
		// 7. Close
		{
			isReady : false,
			Run : function(entities, systems, library) { RunSystems("Close", entities, systems, library); this.isReady = false; },
			CanRun : function() { return this.isReady; },
			ReadyUp : function() { this.isReady = true; }
		}
	],
	io :
	[
	],
	LoadScene : function() { this.bus[6].ReadyUp(); },
	Quit : function() { this.bus[7].ReadyUp(); },
	AttachDraw(newDraw) { this.bus[5].draw = newDraw; }
}
// TODO: Customisable "RunSystems" variables for collision systems
function RunSystems(key, entities, systems, library, canRunOnce)
{
	if (entities === undefined || systems === undefined || library === undefined) return;
	library.algorithm.LoopThrough
	(	
		systems,
		function(system) { RunSystem(key, system, entities, library, canRunOnce); }
	);
}
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
function RunSystem(key, system, entities, library, canRunOnce, additionalAction)
{
	if (key in system)
	{
		var readyEntities = AcquireReadyEntities(system, entities, library, canRunOnce, key);
		library.algorithm.LoopThrough(readyEntities, function(entity) 
		{
			system[key](entity, library); 
			if (additionalAction !== undefined) additionalAction(entity, library);
			if (canRunOnce !== undefined && canRunOnce) library.meta.Adjust(entity, "hasRun" + key, true);
		} );
	}
}

function AcquireReadyEntities(system, entities, library, canRunOnce, key)
{
	return library.algorithm.GrabFrom
	(
		entities, 
		function(entity) 
		{
			return IsEntityCompatible(entity, system, library) &&
			(
				canRunOnce === undefined || !canRunOnce ||
				library.meta.AcquireFrom(entity, "hasRun" + key) === undefined ||
				!library.meta.AcquireFrom(entity, "hasRun" + key)
			); 
		}
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