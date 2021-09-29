export const source =
{
	header : "",
	serverLocation : "",
	rootLocation : "Cyclone",
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
	
	AcquireModelsLocation : function () { return Acquire( [this.header, this.serverLocation, this.rootLocation, this.modelsLocation], "" );  }
}