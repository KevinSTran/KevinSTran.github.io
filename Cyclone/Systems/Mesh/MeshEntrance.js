export var meshEntrance =
{
	// TODO: Only load on its own scene entrance
	requirements : [ "transform","mesh" ],
	Begin : function(entity, library)
	{
		entity.meta = { loaded : 0 };
		console.log(library);
		console.log(library.toybox);
		library.toybox.Add(entity);
	}
}