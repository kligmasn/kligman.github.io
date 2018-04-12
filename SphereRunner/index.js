var listener = new THREE.AudioListener(); //The AudioListener represents a virtual listener of the all positional and non-positional audio effects in the scene.
var sound = new THREE.Audio(listener); //Audio object

var audioLoader = new THREE.AudioLoader();//Load audio source

audioLoader.load('front-desk-bells-daniel_simon.mp3', function(buffer){
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.15);
    sound.play();
});

var analyser = new THREE.AudioAnalyser(sound, 16384);
var data = analyser.getAverageFrequency();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 2, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

scene.add( new THREE.AxisHelper( 10 ) );

var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

camera.add(listener);

var planeGeometry = new THREE.PlaneGeometry(40, 20, 20);
var planeMaterial = new THREE.MeshPhongMaterial( {
    color: "rgb(0, 200, 200)",
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1,
});
var plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.material.side = THREE.DoubleSide;
scene.add( plane );

var wfGeo = new THREE.WireframeGeometry(plane.geometry);
var wfMat = new THREE.LineBasicMaterial( { color:  "rgb(0, 150, 150)", linewidth: 2 } );
var wireframe = new THREE.LineSegments( wfGeo, wfMat);
plane.add(wireframe);

var playerSphereGeo = new THREE.SphereGeometry(0.5, 32, 32);
var playerSphereMat = new THREE.MeshBasicMaterial({color:  "rgb(0, 200, 200)"});
var playerSphere = new THREE.Mesh(playerSphereGeo, playerSphereMat);
scene.add(playerSphere);
var wfGeo = new THREE.WireframeGeometry(playerSphere.geometry);
var wfMat = new THREE.LineBasicMaterial( { color:  "rgb(0, 150, 150)", linewidth: 2 } );
var wireframe = new THREE.LineSegments( wfGeo, wfMat);
playerSphere.add(wireframe);
playerSphere.position.set(0, -9, 0.51);

camera.position.set(0, -11, 3);
camera.rotation.x = Math.PI/3;

var text2 = document.createElement('p');
text2.setAttribute("style", "color:lightblue;position:absolute;top:5px;font-size:32px");
document.body.appendChild(text2);

window.addEventListener('keydown', (e) => checkKey(e));
function checkKey(e){
    e = e.keyCode;
    if(e == 65){ //A or left 
        camera.position.x -= .1;
        plane.position.x -= .1;
        playerSphere.position.x -= .1;
    }
    else if(e == 68){ //D or right
        camera.position.x += .1;
        plane.position.x += .1;
        playerSphere.position.x += .1;
    }
}

window.addEventListener('resize', () => {
    renderer.setSize( window.innerWidth, window.innerHeight);
});

var cubeGroup = new THREE.Group();
initGenerateCubes();

loop();

function loop(){
    camera.position.y += .1;
    plane.position.y += .1;
    playerSphere.position.y += .1;
    
    moveCubeGroup();

    cubeGroup.scale.x = analyser.getAverageFrequency() / 5;
    text2.textContent = analyser.getAverageFrequency();

    requestAnimationFrame(loop);
    renderer.render(scene, camera);
}

function initGenerateCubes(){
    for(var x = 0; x < 5; x++){
        var cube = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshBasicMaterial( {color: "rgb(0, 100, 100)"} ) );
        cubeGroup.add(cube);
    }
    scene.add(cubeGroup);
}

function moveCubeGroup(){
    if(playerSphere.position.y > cubeGroup.position.y){
        cubeGroup.position.set(0, playerSphere.position.y + 20, 0);
    }
}
