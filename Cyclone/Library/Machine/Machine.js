import { machine_station } from "./Machine_Station.js";
export const machine = 
{
	Run : function(module, library)
	{
		this.Assemble();
		library.algorithm.LoopThrough(this.states, function(state) { machine_station.Operate(state, module.entities, module.systems, library); });
	},
	Assemble : function()
	{
		if (this.isAssembled) return;
		this.states[6].Attach(this.states[6], this.states[1], this.states[2], this.states[3], this.states[4], this.states[5]);
		this.isAssembled = true;
	},
	isAssembled : false,
	states : 
	[
		// 0. Open
		{
			isReady : true,
			Run : function(entities, systems, library) { machine_station.RunSystems("Open", entities, systems, library); this.isReady = false; },
			CanRun : function() { return this.isReady; }
		},
		// 1. Begin
		{
			isReady : true,
			Run : function(entities, systems, library) { machine_station.RunSystems("Begin", entities, systems, library, true); },
			CanRun : function() { return this.isReady; },
			SwitchOff : function() { this.isReady = false; }
		},
		// 2. Collide
		{ 
			isReady : true,
			Run : function(entities, systems, library) { machine_station.RunSystems("Collide", entities, systems, library); },
			CanRun : function() { return this.isReady; },
			SwitchOff : function() { this.isReady = false; }
		},
		// 3. Update
		{
			isReady : true,
			Run : function(entities, systems, library) { machine_station.RunSystems("Update", entities, systems, library); },
			CanRun : function() { return this.isReady; },
			SwitchOff : function() { this.isReady = false; }
		},
		// 4. Summarise
		{
			isReady : true,
			Run : function(entities, systems, library) { machine_station.RunSystems("Summarise", entities, systems, library); },
			CanRun : function() { return this.isReady; },
			SwitchOff : function() { this.isReady = false; }
		},
		// 5. Draw
		{
			isReady : true,
			Run : function(entities, systems, library) { if ("draw" in this) this.draw(); },
			CanRun : function() { return this.isReady; },
			SwitchOff : function() { this.isReady = false; }
		},
		// 6. Finish
		{
			isReady : false,
			Run : function(entities, systems, library) 
			{
				// Finish runs once no matter what, so no need to set "canRunOnce" to true
				machine_station.RunSystems("Finish", entities, systems, library, false, this.ReadyEntity); 
				if (this.closeEvent.CanRun()) this.StopMachine();
				this.isReady = false;
			},
			CanRun : function() { return this.isReady; },
			ReadyUp : function() { this.isReady = true; },
			Attach(newCloseEvent, newBeginEvent, newCollideEvent, newUpdateEvent, newSummariseEvent, newDrawEvent)
			{
				this.closeEvent = newCloseEvent;
				this.beginEvent = newBeginEvent;
				this.collideEvent = newCollideEvent;
				this.updateEvent = newUpdateEvent;
				this.summariseEvent = newSummariseEvent;
				this.drawEvent = newDrawEvent;
			},
			StopMachine()
			{
				this.beginEvent.SwitchOff();
				this.collideEvent.SwitchOff();
				this.updateEvent.SwitchOff();
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
			Run : function(entities, systems, library) { machine_station.RunSystems("Close", entities, systems, library); this.isReady = false; },
			CanRun : function() { return this.isReady; },
			ReadyUp : function() { this.isReady = true; }
		}
	],
	io :
	[
	],
	LoadScene : function() { this.states[6].ReadyUp(); },
	Quit : function() { this.states[7].ReadyUp(); },
	AttachDraw(newDraw) { this.states[5].draw = newDraw; }
};