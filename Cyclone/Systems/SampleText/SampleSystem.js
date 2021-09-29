export var sampleSystem = 
{
	requirements : [ "sampleComponent","transform" ],
	Update : function(entity, library)
	{
		entity.components.transform.rotation.y += entity.components.sampleComponent.speed;
	}
}