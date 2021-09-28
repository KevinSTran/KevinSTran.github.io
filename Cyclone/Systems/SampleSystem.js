export var sampleSystem = 
{
	requirements : [ "sampleComponent","transform" ],
	Update : function(entity)
	{
		console.log(entity);
		entity.transform.rotation.y += entity.sampleComponent.speed;
	}
}