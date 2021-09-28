export var sampleEntity =
{
	name : "Sample Text",
	components : 
	{
		life :
		{
			isAlive : true
		},
		transform :
		{
			position : { x:0, y:0, z:0 },
			rotation : { x:0, y:0, z:0 },
			scale : { x:1, y:1, z:1 }
		},
		mesh :
		{
			source : "undeadKnight.fbx"
		},
		collider :
		{
			radii : { x:0.5, y:1, z:0.5 }
		},
		axis :
		{
			direction : { x:0, y:0 },
			canJump : false,
			moveSpeed : 1,
			jumpSpeed : 5
		},
		
		
		
		sampleComponent : 
		{
			speed : 0.01
		}
	}
}