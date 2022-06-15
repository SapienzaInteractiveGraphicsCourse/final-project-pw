import * as THREE from './js/three.module.js';
import { PointerLockControls } from './js/controls/PointerLockControls.js';
import {Dog} from './Dog.js';
import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/loaders/MTLLoader.js';
import {MtlObjBridge} from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';
import {OBJLoader2} from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/loaders/OBJLoader2.js';

let raycaster = new THREE.Raycaster(); //mouse catch the dogs
let pointer = new THREE.Vector2(); //mouse to look around in playing mode

var camera, renderer, controls;
let scene = new THREE.Scene();

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

let groundGeometry;
let groundTexture;
let groundMaterial;
let ground;
let ground_Id;

var velocity = new THREE.Vector3();

let materials = [];
let geometries = [];

const loadingManager = new THREE.LoadingManager();
var loader = new THREE.TextureLoader(loadingManager);
var game_over = false;
let sec = 0;
let DOGS = 0;
var increment = 0;

let dog;
let dogClass;
let dog_meshes = [];
let dog_scene=[];
let dog_caught = 0;
let dog_tot = 0;
let level_mode = "HARD";

function getRandomInt(max) { //function return random values
  return Math.floor(Math.random() * max);
}

//Needed for the clickEvent Listener
let once = {
	once : true
};

init()
animate()

function init(){
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100 );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	var light = new THREE.HemisphereLight(0xffffff, 0xffffff ,1);
	light.position.set( 0.5, 1, 1 );
	scene.add( light );
	scene.background = new THREE.Color( 0xB2FFFF );
	scene.fog = new THREE.Fog( 0xFFFFFF, 0, 300 );

	//Setting background
	groundGeometry = new THREE.PlaneBufferGeometry(1500, 1500, 100, 100 );
	groundGeometry.rotateX( - Math.PI / 2 ).translate(100,0,100);
	groundGeometry = groundGeometry.toNonIndexed(); // ensuring each face has unique vertices
	groundTexture = loader.load( 'resources/lawn.png' );
	groundTexture.wrapS = THREE.RepeatWrapping;
	groundTexture.wrapT = THREE.RepeatWrapping;
	groundTexture.repeat.set( 15, 15 );

	groundMaterial = new THREE.MeshPhongMaterial( { map: groundTexture } )
	groundMaterial.shadowSide  = THREE.DoubleSide;
	groundMaterial.flatShading = true;
	ground = new THREE.Mesh( groundGeometry, groundMaterial );
	materials.push(groundMaterial);
	geometries.push(groundGeometry);
	ground_Id = ground.id;
	scene.add(ground);

	for (let step = 40; step < 530; step+=40) {//making just few trees to make the enviroment more realistic
    	var post1 = getRandomInt(step)*(Math.round(Math.random()) ? 1 : -1);//reurn a random value passing a max value, multiply by pos or neg numbers to get both the positions
    	var post2 = getRandomInt(step)*(Math.round(Math.random()) ? 1 : -1);
  		createTree(scene,post1,0,post2);
  		createTree(scene,post1,0,post2);
    }

	if (level_mode == "EASY") {
  	dog_tot = 10;
  }else if (level_mode == "MEDIUM") {
    dog_tot = 100;
  }else if (level_mode == "HARD") {
    dog_tot = 500;
  }
  DOGS = dog_tot;
  for (let step = 0; step < dog_tot; step++) {
	  var posdog1 = getRandomInt(500)*(Math.round(Math.random()) ? 1 : -1);//reurn a random value passing a max value, multiply by pos or neg numbers to get both the positions
    var posdog2 = getRandomInt(500)*(Math.round(Math.random()) ? 1 : -1);
    insceneDog(posdog1,2,posdog2,1,step); //x,y,z,scaling, dog_index
	}
	// STARTUP THE CONTROLS AND POSITION THE CAMERA
  controls = new PointerLockControls( camera, document.body );

	controls.addEventListener( 'lock', function () {
		blocker.style.display = 'none';
	} );

	controls.addEventListener( 'unlock', function () {
		blocker.style.display = 'block';
	} );

	window.addEventListener("click", clickListener , once);
}

var mouse = new THREE.Vector2();

function onMouseMove( event ) {
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function animate() {
	requestAnimationFrame( animate );
	groundGeometry.dispose();
	groundMaterial.dispose();
	groundTexture.dispose();
	if (game_over) {
		document.getElementById("time").innerHTML = "</h2><a href='index.html'>Restart</a></span>";
		document.getElementById('lbltime').innerHTML = "GAME OVER!";
		controls.getObject().position.y -=10;
  }else if (dog_caught >= dog_tot) {
    document.getElementById("time").innerHTML = "</h2><a href='index.html'>Restart</a></span>";
		document.getElementById('lbltime').innerHTML = "CONGRATULATIONS, you WON!!!";
  }else {
		document.getElementById('lbltime').innerHTML = sec;
		var time = performance.now(); //return milliseconds
		let sect;
		sect=millisToMinutesAndSeconds(time);
    //it is possible also to set the velocity to 0 checking values false of the movement, but we like this way to play
		if (moveForward) velocity.z += 1.0;
		if (moveBackward) velocity.z -= 1.0;
		if (moveRight) velocity.x += 1.0;
		if (moveLeft) velocity.x -= 1.0;
		controls.moveRight(velocity.x);
		controls.moveForward(velocity.z);

		controls.getObject().position.y += ( velocity.y );
		if ( controls.getObject().position.y < 10 ) {
				velocity.y = 0;
				controls.getObject().position.y = 10;
		}
		if (controls.getObject().position.z>650 || controls.getObject().position.z<-650 || controls.getObject().position.x>650 || controls.getObject().position.x<-650){
			game_over=true;
		}

		//sec = sect.concat(" Posx",Math.round((controls.getObject().position.x)*10/10).toFixed(1)," Posy",Math.round((controls.getObject().position.y)*10/10).toFixed(1)," Posz",Math.round((controls.getObject().position.z)*10/10).toFixed(1)," Dog caught: ",dog_caught, " of ",dog_tot);
		sec = sect.concat(" - Dog caught: ",dog_caught, " of ",dog_tot);

    for (var i=0; i<DOGS; i++){ //animation for dogs
      dogWalking(i);
    };

  }
  // update the picking ray with the camera and pointer position
	raycaster.setFromCamera( pointer, camera );
	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );
	for ( let i = 0; i < intersects.length; i ++ ) {
    	if(!(intersects[i].object.id == ground_Id)){
           console.log(intersects[i].object.id);
            scene.remove(intersects[i].object);
            dog_caught+=1;
        }
	}
	renderer.render( scene, camera );
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function clickListener(event) {
	controls.lock();

	var onKeyDown = function ( event ) {
		switch ( event.keyCode ) {
			case 38: // up
			case 87: // w
				moveForward = true;
				break;
			case 37: // left
			case 65: // a
				moveLeft = true;
				break;
			case 40: // down
			case 83: // s
				moveBackward = true;
				break;
			case 39: // right
			case 68: // d
				moveRight = true;
				break;
		}
	};

	var onKeyUp = function ( event ) {
		switch ( event.keyCode ) {
			case 38: // up
			case 87: // w
				moveForward = false;
				break;
			case 37: // left
			case 65: // a
				moveLeft = false;
				break;
			case 40: // down
			case 83: // s
				moveBackward = false;
				break;
			case 39: // right
			case 68: // d
				moveRight = false;
				break;
		}

	};

	window.addEventListener("click", clickListener , once);
	document.addEventListener('keydown', onKeyDown, false );
	document.addEventListener('keyup', onKeyUp, false );
  window.addEventListener('pointermove', onPointerMove );
}

function onPointerMove( event ) {
	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components, from https://threejs.org/docs/index.html#api/en/core/Raycaster
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function createTree(scene,x,y,z){
    const mtlLoader = new MTLLoader(loadingManager);
    mtlLoader.load('resources/tree.mtl', (mtlParseResult) => {
      const objLoader = new OBJLoader2(loadingManager);
      const materials_tree =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
      objLoader.addMaterials(materials_tree);
      objLoader.load('resources/tree.obj', (root) => {
  			geometries.push(root.children[0].geometry);
  			root.scale.set(10 ,10 ,10);
  			root.position.set(x,y,z);
  			scene.add(root);
		  });
    });
}

function insceneDog(x,y,z,scaling, dog_index){
	dogClass = new Dog();
  dog = dogClass.dog;
  for ( var i = 0; i < dogClass.nNodes; i++){
		dog_meshes.push(dog[i]);
    scene.add(dog[i]);
	}
	//Connect the "child" to assembler the object to make looks like a dog
	dog[dogClass.body_Id].attach(dog[dogClass.left_arm_top_Id]);
	dog[dogClass.body_Id].attach(dog[dogClass.right_arm_top_Id]);
	dog[dogClass.body_Id].attach(dog[dogClass.left_leg_top_Id]);
	dog[dogClass.body_Id].attach(dog[dogClass.right_leg_top_Id]);
	dog[dogClass.body_Id].attach(dog[dogClass.head_Id]);
  dog[dogClass.body_Id].attach(dog[dogClass.tail_Id]);
	//Position settings
  dog[dogClass.tail_Id].rotation.x = +Math.PI/4; //wagging dog's tail
  dog[dogClass.body_Id].position.x = x;
  dog[dogClass.body_Id].position.y = y;
  dog[dogClass.body_Id].position.z = z;
  dog[dogClass.body_Id].scale.set(scaling,scaling,scaling);//to differentiat the dogs (looks more "realistic" with different sizes)
  dog_scene[dog_index]=dog;
}

function dogWalking(dog_number){
  console.log(dog_scene[dog_number][dogClass.left_arm_top_Id].rotation.z);
  if (dog_scene[dog_number][dogClass.left_arm_top_Id].rotation.z > 0.5) { //0.5 = angle around 30°
    increment = -0.0025;
  } else if (dog_scene[dog_number][dogClass.left_arm_top_Id].rotation.z <= 0){
    increment = 0.0025;
  }
  //ARMS MOVEMENT
 dog_scene[dog_number][dogClass.left_arm_top_Id].rotateZ(increment);
 dog_scene[dog_number][dogClass.right_arm_top_Id].rotateZ(increment);
 // LEGS MOVEMENT
 dog_scene[dog_number][dogClass.left_leg_top_Id].rotateZ(-increment);
 dog_scene[dog_number][dogClass.right_leg_top_Id].rotateZ(-increment);
 //BODY
 if (dog_scene[dog_number][dogClass.body_Id].position.x < 500 && dog_scene[dog_number][dogClass.body_Id].position.x > -500) { //to ensure that the dog is inside the enviroment
   dog_scene[dog_number][dogClass.body_Id].position.x += Math.cos(dog_scene[dog_number][dogClass.left_arm_top_Id].rotation.z)/100;
 }
}
