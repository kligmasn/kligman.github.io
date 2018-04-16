var scene, camera, renderer, spotLight;
initScene();

var keys = {87: false, 83: false, 65: false, 68: false};
var movement = 0.1;
var score = 0;

var scoreText = document.createElement('p');
scoreText.setAttribute("style", "color:lightblue;position:absolute;top:5px;font-size:32px");
document.body.appendChild(scoreText);

var playerSphere;
initPlayerSphere();

scene.add( new THREE.AxisHelper( 10 ) );

var torus;
updateTorus();

loop();
function loop(){
    camera.position.y += 0.1;
    playerSphere.position.y += 0.1;

    playerSphere.position.z -= movement/2;
    camera.position.z -= movement/2;
    
    updateTorus();
    movePlayer();
    scoreUpdate();


    requestAnimationFrame(loop);
    renderer.render(scene, camera);
}

function updateTorus(){
    if(!scene.getObjectByName('Torus')){
        torus = new THREE.Mesh( new THREE.TorusGeometry( 2, 0.5, 16, 100), new THREE.MeshBasicMaterial( {color: "rgb(0, 100, 100)"} ) );
        torus.rotation.x = Math.PI/2;
        torus.position.set(Math.floor(Math.random() * 5), Math.floor(playerSphere.position.y + 20), Math.floor(Math.random() * 5));
        torus.name = "Torus";
        torus.castShadow = true;
        torus.receiveShadow = true;
        scene.add(torus);
    }
    else {
        if(playerSphere.position.y - 2 > torus.position.y){ //If sphere is a little past previous Torus
            torus.position.set(Math.floor(Math.random() * 5), Math.floor(playerSphere.position.y + 20), Math.floor(Math.random() * 5));
        }
    }
}

function initPlayerSphere(){
    playerSphere = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({color:  "rgb(0, 200, 200)"}));
    playerSphere.name = "Player";
    playerSphere.castShadow = true;
    scene.add(playerSphere);
    var wireframe = new THREE.LineSegments( new THREE.WireframeGeometry(playerSphere.geometry), new THREE.LineBasicMaterial( { color:  "rgb(0, 150, 150)", linewidth: 2 } ));
    playerSphere.add(wireframe);
    playerSphere.position.set(0, 0, 0);
}

function initScene(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 2, 1000 );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild( renderer.domElement );

    camera.position.set(0, -5, 1);
    camera.rotation.x = Math.PI/2;

    spotLight = new THREE.SpotLight( 0xffffff, 20 );
    spotLight.position.set( 20, 20, 20);
    spotLight.castShadow = true;
    scene.add( spotLight );
}

function movePlayer(){
    if(keys[87]){
        playerSphere.position.z += movement;
        camera.position.z += movement;
    }
    /*else if(keys[83]){
        playerSphere.position.z -= movement;
        camera.position.z -= movement;
    }*/
    if(keys[65]){
        playerSphere.position.x -= movement;
        camera.position.x -= movement;
    }
    if(keys[68]){
        playerSphere.position.x += movement;
        camera.position.x += movement;
    }
}

function scoreUpdate(){
    if(Math.abs(torus.position.y - playerSphere.position.y) < 0.001){
        if(Math.abs(torus.position.z - playerSphere.position.z) <= 0.5 && Math.abs(torus.position.x - playerSphere.position.x) <= 0.5 ){
            score++; 
        }
    }
    scoreText.innerText = score;
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});