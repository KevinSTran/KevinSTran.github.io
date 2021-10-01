/// <summary>
/// 	source:
/// 	- An object tasked wuith locating targets by
///       writing its path into a string.
/// </summary>
export const source =
{
	header : "",
	serverLocation : "",
	rootLocation : "Cyclone",
	contentFolder : "Content",
	modelsLocation : "Models",
	AttachHeader : function(newHeader) { this.header = newHeader; },
	AttachServerLocation : function(newServerLocation) { this.serverLocation = newServerLocation; },

	/// <summary>
	/// </summary>
	/// <param name="folders">
	/// </param>
	/// <param name="path">
	/// 	-
	/// 	- e.g. "https:/"
	/// </param>
	/// <returns>
	/// </returns>
	Acquire : function (folders, path)
	{
		if (folders.length <= 0)
		{
			console.log("No file source has been specified. Aborting ...");
			return path;
		}
		if (folders.length == 1) return path + "/" + folders[0];
		return this.Acquire(folders.slice(1), path + "/" + folders[0]);
	},
	
	AcquireModelsLocation : function () { return this.Acquire( [this.serverLocation, this.rootLocation, this.contentFolder, this.modelsLocation], this.header );  }
};