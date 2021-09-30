import { algorithm_linear } from "./Algorithm_Linear.js"
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
		catch (err) { algorithm_linear.LoopThrough(pool, action, isReversed); }
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
		catch (err) { return algorithm_linear.SearchFor(pool, meetsRequirements); }
	},
	AttachSearchAlgorithm : function(newAlgorithm) { this.searchAlgorithm = newAlgorithm; },
	GrabFrom : function(pool, meetsRequirements)
	{
		try { return this.grabAlgorithm(pool, meetsRequirements); }
		catch (err) { return algorithm_linear.GrabFrom(pool, meetsRequirements); }
	},
	AttachGrabAlgorithm : function(newAlgorithm) { this.grabAlgorithm = newAlgorithm; }
}