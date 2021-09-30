export const algorithm =
{
	/// <summary>
	/// 	LoopThrough:
	/// 	- Uses a function to perform an action upon every
	///       object in the provided pool array
	///		- Ideally, this algorithm should be orderless
	/// </summary>
	/// <param name="pool">
	/// </param>
	/// <param name="action">
	/// </param>
	/// <param name="isReversed">
	/// </param>
	LoopThrough : function(pool, action, isReversed)
	{
		try { this.loopAlgorithm(pool, action, isReversed); }
		catch (err) { LinearLoop(pool, action, isReversed); }
	},
	AttachLoopAlgorithm : function(newAlgorithm) { this.loopAlgorithm = newAlgorithm; },
	/// <summary>
	///		- Algorithm will perform an uninformed search 
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
	AttachSearchAlgorithm : function(newAlgorithm) { this.searchAlgorithm = newAlgorithm; },
	GrabFrom : function(pool, meetsRequirements)
	{
		try { return this.grabAlgorithm(pool, meetsRequirements); }
		catch (err) { return LinearGrab(pool, meetsRequirements); }
	},
	AttachGrabAlgorithm : function(newAlgorithm) { this.grabAlgorithm = newAlgorithm; }
}

function LinearLoop(pool, action, isReversed)
{
	if (pool === undefined || action === undefined) return;
	var canReverse = isReversed !== undefined && isReversed;
	for (var i = (canReverse ? pool.length - 1 : 0); (canReverse ? i >= 0 : i < pool.length); i += (canReverse ? -1 : 1)) 
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