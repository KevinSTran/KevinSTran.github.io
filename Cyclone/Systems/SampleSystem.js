export var sampleSystem = 
{
	requirements : [ "sampleComponent","transform" ],
	Update : function(entity)
	{
		entity.components.transform.rotation.y += entity.components.sampleComponent.speed;
	}
}