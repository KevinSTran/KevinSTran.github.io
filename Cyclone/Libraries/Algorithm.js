// TODO: Algorithm machine
export const algorithm =
{
	/// <summary>
	///		- Ideally, this algorithm should be orderless
	/// </summary>
	/// <param name="pool">
	/// </param>
	/// <param name="action">
	/// </param>
	LoopThrough : function(pool, action)
	{
		try { this.loopAlgorithm(pool, action); }
		catch (err) { LinearLoop(pool, action); }
	},
	AssignLoopAlgorithm : function(newAlgorithm) { this.loopAlgorithm = newAlgorithm; },
	/// <summary>
	///		- Ideally, this algorithm should be orderless
	/// </summary>
	/// <param name="action">
	/// </param>
	/// <param name="pool">
	/// </param>
	/// <returns>
	/// 	{ 
	///			target : reference to first object that meets the search requirements,
	///					 will not exist if no object meets search requirements
	///			doesExist : true if found, false if nothing exists
	///		}
	/// </returns>
	SearchFor : function(pool, meetsRequirements)
	{
		try { return this.searchAlgorithm(pool, meetsRequirements); }
		catch (err) { return LinearSearch(pool, meetsRequirements); }
	},
	AssignSearchAlgorithm : function(newAlgorithm) { this.searchAlgorithm = newAlgorithm; },
	GrabFrom : function(pool, meetsRequirements)
	{
		try { return this.grabAlgorithm(pool, meetsRequirements); }
		catch (err) { return LinearGrab(pool, meetsRequirements); }
	},
	AssignGrabAlgorithm : function(newAlgorithm) { this.grabAlgorithm = newAlgorithm; }
}

function LinearLoop(pool, action)
{
	if (pool === undefined || action === undefined) return;
	for (var i = 0; i < pool.length; i++) 
		try { action(pool[i]); } 
		catch (err) 
		{
			console.log(err); 
			console.log("Terminating the loop ..."); 
			break;
		}
}

function LinearSearch(pool, meetsRequirements)
{
	if (pool === undefined || meetsRequirements === undefined) return { doesExist:false };
	for (var i = 0; i < pool.length; i++)
		if (meetsRequirements(pool[i])) return { target:pool[i], doesExist:true };
	return { doesExist:false };
}

function LinearGrab(pool, meetsRequirements)
{
	if (pool === undefined || meetsRequirements === undefined) return [];
	var result = [];
	for (var i = 0; i < pool.length; i++)
		if (meetsRequirements(pool[i])) result.push(pool[i]);
	return result;
}