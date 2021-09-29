export var meshEntrance =
{
	// TODO: Only load on its own scene entrance
	requirements : [ "transform","mesh" ],
	Begin : function(entity, library)
	{
		entity.meta = { loaded : 0 };
		library.toybox.Add(entity);
	}
}