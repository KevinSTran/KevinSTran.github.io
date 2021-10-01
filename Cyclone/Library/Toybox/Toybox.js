/// <summary>
/// 	toybox:
/// 	- An object that keeps track of all the meshes that
///       exist in the game, as well as managing how new
///       meshes can be added
/// </summary>
export const toybox =
{
	toys : [],
	Add : function(entity) 
	{
		try 
		{
			var result = { isReady:false };
			this.addMesh(entity, result); 
			this.toys.push( function() { if (result.isReady) result.updateTransform(result.mesh, entity.components.transform); } );
		}
		catch (err) { console.log(err); }
	},
	AttachAdd : function(newAddMesh) { this.addMesh = newAddMesh; }
};