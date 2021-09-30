export var meshEntrance =
{
	// TODO: Only load on its own scene entrance
	requirements : [ "transform","mesh" ],
	Begin : function(entity, library)
	{
		library.meta.Note(entity, "loaded", 0);
		library.toybox.Add(entity);
	}
}