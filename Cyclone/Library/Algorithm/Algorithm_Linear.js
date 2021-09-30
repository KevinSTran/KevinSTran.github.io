export const algorithm_linear = 
{
	function LoopThrough(pool, action, isReversed)
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

	function SearchFor(pool, meetsRequirements)
	{
		if (pool === undefined || meetsRequirements === undefined) return { doesExist:false };
		for (var i = 0; i < pool.length; i++)
			if (meetsRequirements(pool[i])) return { target:pool[i], doesExist:true };
		return { doesExist:false };
	}

	function GrabFrom(pool, meetsRequirements)
	{
		if (pool === undefined || meetsRequirements === undefined) return [];
		var result = [];
		for (var i = 0; i < pool.length; i++)
			if (meetsRequirements(pool[i])) result.push(pool[i]);
		return result;
	}
}