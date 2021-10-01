export const meta =
{
	/// <summary>
	/// 	Note:
	///		- Does not overwrite existing meta value, that functionality
	///       would be stored in "Adjust"
	/// </summary>
	/// <param name="entity">
	/// </param>
	/// <param name="key">
	/// </param>
	/// <param name="value">
	/// </param>
	Note : function(entity, key, value)
	{
		if (!("meta" in entity)) entity.meta = {};
		if (!("key" in entity.meta)) entity.meta[key] = value;
	},
	/// <summary>
	/// 	Adjust:
	///		- If meta does not exist, a new meta will be created
	/// </summary>
	/// <param name="entity">
	/// </param>
	/// <param name="key">
	/// </param>
	/// <param name="value">
	/// </param>
	Adjust : function(entity, key, value)
	{
		if (!("meta" in entity) || !(key in entity.meta)) this.Note(entity, key, value);
		else entity.meta[key] = value;
	},
	AcquireFrom(entity, key)
	{
		if (!("meta" in entity) || !(key in entity.meta)) return undefined;
		return entity.meta[key];
	}
};