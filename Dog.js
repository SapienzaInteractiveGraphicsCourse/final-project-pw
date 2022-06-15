import * as THREE from './three.module.js';

//all compoenents needed to 'assembler' a dog
export function Dog(){
		this.dog = [];
		this.body_Id = 0;
		this.left_leg_top_Id = 1;
		this.right_leg_top_Id = 2;
		this.left_arm_top_Id = 3;
		this.right_arm_top_Id = 4;
		this.head_Id = 5;
    this.tail_Id = 6;
		//NODES ADDED
		this.nNodes = 7;

		var loader = new THREE.TextureLoader();
    var body_geometry = new THREE.BoxGeometry(4.0, 2.0, 4.0); //'width', 'height', and 'depth'
		var left_leg_top_geometry  = new THREE.BoxGeometry(1.0, 2.0, 1.0);
		var right_leg_top_geometry = new THREE.BoxGeometry(1.0, 2.0, 1.0);
		var left_arm_top_geometry  = new THREE.BoxGeometry(1.0, 2.0, 1.0);
		var right_arm_top_geometry = new THREE.BoxGeometry(1.0, 2.0, 1.0);
		var head_geometry = new THREE.BoxGeometry(1.2, 1.0, 1.2);
    var tail_geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);

		// BODY
		var texture0 = loader.load( 'resources/dog_skin.png' );
		var texture1 = loader.load( 'resources/dog_skin.png' );
		var texture2 = loader.load( 'resources/dog_skin.png' );
		var texture3 = loader.load( 'resources/dog_skin.png' );
		var texture4 = loader.load( 'resources/dog_skin.png' );
		var texture5 = loader.load( 'resources/dog_skin.png' );
    var body_material = [
		    new THREE.MeshPhongMaterial( { map: texture0 } ),
		    new THREE.MeshPhongMaterial( { map: texture1 } ),
		    new THREE.MeshPhongMaterial( { map: texture2 } ),
		    new THREE.MeshPhongMaterial( { map: texture3 } ),
		    new THREE.MeshPhongMaterial( { map: texture4 } ),
		    new THREE.MeshPhongMaterial( { map: texture5 } )
		];
		body_material.forEach(function (item, index, array) {
			item.shadowSide = THREE.DoubleSide;
			item.flatShading = true;
		});
		// LEFT LEG TOP
		texture0 = loader.load( 'resources/dog_skin.png' );
		texture1 = loader.load( 'resources/dog_skin.png' );
		texture2 = loader.load( 'resources/dog_skin.png' );
		texture3 = loader.load( 'resources/dog_skin.png' );
		texture4 = loader.load( 'resources/dog_skin.png' );
		texture5 = loader.load( 'resources/dog_skin.png' );
    var left_leg_top_material = [
		    new THREE.MeshPhongMaterial( { map: texture0 } ),
		    new THREE.MeshPhongMaterial( { map: texture1 } ),
		    new THREE.MeshPhongMaterial( { map: texture2 } ),
		    new THREE.MeshPhongMaterial( { map: texture3 } ),
		    new THREE.MeshPhongMaterial( { map: texture4 } ),
		    new THREE.MeshPhongMaterial( { map: texture5 } )
		];
		left_leg_top_material.forEach(function (item, index, array) {
			item.shadowSide = THREE.DoubleSide;
			item.flatShading = true;
		});
		// RIGHT LEG TOP
		texture0 = loader.load( 'resources/dog_skin.png' );
		texture1 = loader.load( 'resources/dog_skin.png' );
		texture2 = loader.load( 'resources/dog_skin.png' );
		texture3 = loader.load( 'resources/dog_skin.png' );
		texture4 = loader.load( 'resources/dog_skin.png' );
		texture5 = loader.load( 'resources/dog_skin.png' );
				var right_leg_top_material = [
				new THREE.MeshPhongMaterial( { map: texture0 } ),
				new THREE.MeshPhongMaterial( { map: texture1 } ),
				new THREE.MeshPhongMaterial( { map: texture2 } ),
				new THREE.MeshPhongMaterial( { map: texture3 } ),
				new THREE.MeshPhongMaterial( { map: texture4 } ),
				new THREE.MeshPhongMaterial( { map: texture5 } )
		];
		right_leg_top_material.forEach(function (item, index, array) {
			item.shadowSide = THREE.DoubleSide;
			item.flatShading = true;
		});
		// LEFT ARM TOP
		texture0 = loader.load( 'resources/dog_skin.png' );
		texture1 = loader.load( 'resources/dog_skin.png' );
		texture2 = loader.load( 'resources/dog_skin.png' );
		texture3 = loader.load( 'resources/dog_skin.png' );
		texture4 = loader.load( 'resources/dog_skin.png' );
		texture5 = loader.load( 'resources/dog_skin.png' );
    var left_arm_top_material = [
		    new THREE.MeshPhongMaterial( { map: texture0 } ),
		    new THREE.MeshPhongMaterial( { map: texture1 } ),
		    new THREE.MeshPhongMaterial( { map: texture2 } ),
		    new THREE.MeshPhongMaterial( { map: texture3 } ),
		    new THREE.MeshPhongMaterial( { map: texture4 } ),
		    new THREE.MeshPhongMaterial( { map: texture5 } )
		];
		left_arm_top_material.forEach(function (item, index, array) {
			item.shadowSide = THREE.DoubleSide;
			item.flatShading = true;
		});
		// RIGHT ARM TOP
		texture0 = loader.load( 'resources/dog_skin.png' );
		texture1 = loader.load( 'resources/dog_skin.png' );
		texture2 = loader.load( 'resources/dog_skin.png' );
		texture3 = loader.load( 'resources/dog_skin.png' );
		texture4 = loader.load( 'resources/dog_skin.png' );
		texture5 = loader.load( 'resources/dog_skin.png' );
    var right_arm_top_material = [
		    new THREE.MeshPhongMaterial( { map: texture0 } ),
		    new THREE.MeshPhongMaterial( { map: texture1 } ),
		    new THREE.MeshPhongMaterial( { map: texture2 } ),
		    new THREE.MeshPhongMaterial( { map: texture3 } ),
		    new THREE.MeshPhongMaterial( { map: texture4 } ),
		    new THREE.MeshPhongMaterial( { map: texture5 } )
		];
		right_arm_top_material.forEach(function (item, index, array) {
			item.shadowSide = THREE.DoubleSide;
			item.flatShading = true;
		});
		//HEAD
		texture0 = loader.load('resources/dog_face.png' );
		texture1 = loader.load('resources/dog_skin.png' );
		texture2 = loader.load('resources/dog_skin.png' );
		texture3 = loader.load('resources/dog_skin.png' );
		texture4 = loader.load('resources/dog_skin.png' );
		texture5 = loader.load('resources/dog_skin.png' );
    var head_material = [
		    new THREE.MeshPhongMaterial( { map: texture0 } ),
		    new THREE.MeshPhongMaterial( { map: texture1 } ),
		    new THREE.MeshPhongMaterial( { map: texture2 } ),
		    new THREE.MeshPhongMaterial( { map: texture3 } ),
		    new THREE.MeshPhongMaterial( { map: texture4 } ),
		    new THREE.MeshPhongMaterial( { map: texture5 } )
		];
		head_material.forEach(function (item, index, array) {
			item.shadowSide = THREE.DoubleSide;
			item.flatShading = true;
		});
    //TAIL
		texture0 = loader.load('resources/dog_skin.png' );
		texture1 = loader.load('resources/dog_skin.png' );
		texture2 = loader.load('resources/dog_skin.png' );
		texture3 = loader.load('resources/dog_skin.png' );
		texture4 = loader.load('resources/dog_skin.png' );
		texture5 = loader.load('resources/dog_skin.png' );
    var tail_material = [
		    new THREE.MeshPhongMaterial( { map: texture0 } ),
		    new THREE.MeshPhongMaterial( { map: texture1 } ),
		    new THREE.MeshPhongMaterial( { map: texture2 } ),
		    new THREE.MeshPhongMaterial( { map: texture3 } ),
		    new THREE.MeshPhongMaterial( { map: texture4 } ),
		    new THREE.MeshPhongMaterial( { map: texture5 } )
		];
		tail_material.forEach(function (item, index, array) {
			item.shadowSide = THREE.DoubleSide;
			item.flatShading = true;
		});

    var body = new THREE.Mesh(body_geometry, body_material);
		var left_leg_top  = new THREE.Mesh(left_leg_top_geometry, left_leg_top_material);
		var right_leg_top = new THREE.Mesh(right_leg_top_geometry, right_leg_top_material);
		var left_arm_top  = new THREE.Mesh(left_arm_top_geometry, left_arm_top_material);
		var right_arm_top = new THREE.Mesh(right_arm_top_geometry, right_arm_top_material);
		var head = new THREE.Mesh(head_geometry, head_material);
    var tail = new THREE.Mesh(tail_geometry, tail_material);

    this.dog[this.body_Id] = body;
		this.dog[this.left_leg_top_Id]  = left_leg_top;
		this.dog[this.right_leg_top_Id] = right_leg_top;
		this.dog[this.left_arm_top_Id]  = left_arm_top;
		this.dog[this.right_arm_top_Id] = right_arm_top;
		this.dog[this.head_Id] = head;
    this.dog[this.tail_Id] = tail;

		body.position.set(0, left_leg_top_geometry.parameters.height, 0);
		let arm_top_x = body_geometry.parameters.width/2-left_arm_top_geometry.parameters.width/2;
    let arm_top_z = body_geometry.parameters.depth/2-left_arm_top_geometry.parameters.depth/2;
    left_arm_top.position.set(arm_top_x , 0.2, arm_top_z);
		right_arm_top.position.set(arm_top_x, 0.2, -arm_top_z);
		left_leg_top.position.set(-arm_top_x , 0.2, arm_top_z);
		right_leg_top.position.set(-arm_top_x, 0.2, -arm_top_z);
		head.position.set(arm_top_x, body_geometry.parameters.height+left_leg_top_geometry.parameters.height/2, 0);
    tail.position.set(-arm_top_x-tail_geometry.parameters.depth, body_geometry.parameters.height, 0);
}
