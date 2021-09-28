export var sampleSystem = 
{
	requirements : [ "sampleComponent","transform" ],
	Update : function(entity)
	{
		entity.transform.rotation.y += entity.sampleComponent.speed;
	}
}