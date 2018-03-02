var camera, scene, renderer, controls, geometry, material, mesh;

var moveRight = false;
var moveLeft = false;
var moveUp = false;
var moveDown = false;

var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();

init();
animate();

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 500;
    scene.add(camera);

    controls = new THREE.PointerLockControls( camera );
    scene.add(controls.getObject());


    var onKeyDown = function(event){
        switch(event.keyCode){
            case 87: // w
                moveForward = true;
                break;
            case 65: // a
                moveLeft = true; 
                break;
            case 83: // s
                moveBackward = true;
                break;
            case 68: // d
                moveRight = true;
                break;
            case 32: // space
                if ( canJump === true ) velocity.y += 350;
                canJump = false;
                break;
        }
    }

    var onKeyUp = function ( event ) {
        switch( event.keyCode ) {
            case 87: // w
                moveForward = false;
                break;
            case 65: // a
                moveLeft = false;
                break;
            case 83: // s
                moveBackward = false;
                break;
            case 68: // d
                moveRight = false;
                break;
        }
    }
    document.addEventListener('keyup', onKeyUp, false);
    document.addEventListener('keydown', onKeyDown, false);

    var floorGeometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
	floorGeometry.rotateX( - Math.PI / 2 );
    var floorMaterial = new THREE.MeshBasicMaterial();
    var floor = new THREE.Mesh( floorGeometry, floorMaterial );
	scene.add( floor );


    geometry = new THREE.CubeGeometry(200, 200, 200);
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

}

function animate() {

    requestAnimationFrame(animate);

    var time = performance.now();
	var delta = ( time - prevTime ) / 1000;

    velocity.x -= velocity.x * 10.0 * delta;
	velocity.z -= velocity.z * 10.0 * delta;
    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
    
    direction.z = Number( moveForward ) - Number( moveBackward ); //True = 1, False = 0
    direction.x = Number( moveLeft ) - Number( moveRight );
    direction.normalize(); // this ensures consistent movements in all directions

    if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
    if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

    controls.getObject().translateX( velocity.x * delta );
    controls.getObject().translateY( velocity.y * delta );
    controls.getObject().translateZ( velocity.z * delta );
    

    renderer.render(scene, camera);
}
