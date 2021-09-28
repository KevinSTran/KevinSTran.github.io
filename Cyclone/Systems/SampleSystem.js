export var sampleSystem = 
{
	requirements : [ "sampleComponent","transform" ],
	Update : function(entity)
	{
		entity.rotation.y += entity.sampleComponent.speed;
		console.log(entity.rotation.y);
	}
}