Synth instanceof AudioSynth; // true

var testInstance = new AudioSynth;
testInstance instanceof AudioSynth; // true

testInstance === Synth; // true

var piano = Synth.createInstrument('piano');

var renderer, scene, camera;
var raycaster = new THREE.Raycaster(), INTERSECTED;
var mouse = new THREE.Vector2();
var box;

document.body.appendChild( WEBVR.createButton( renderer ) );

function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth, H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, W/H, .1, 1000);
  camera.position.set(0, 55, 85);
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 1000, 0);
  scene.add(spotLight);
  //spotLight.castShadow = true;

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
  if (message == "WEBVR NOT SUPPORTED"){
    renderer.vr.enabled = false;
  } else {
    renderer.vr.enabled = true;
  }
  //renderer.shadowMapEnabled = true;

  //create a group container
  keysGroup = new THREE.Object3D();

  var whiteKeys = [];
  var blackKeys = [];

  var i = 1;

  for (var x = -70; x <= 65; x += 10) {
    var boxGeometry = new THREE.BoxGeometry(9, 5, 25);
    var boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    box = new THREE.Mesh(boxGeometry, boxMaterial);

    box.id = i;
    i++;

    box.position.x = x;

    scene.add(box);
    whiteKeys.push(box);
    keysGroup.add(box);
  }

  var count = 1;
  for (var x = -65; x <= 70; x += 10) {
    if (count % 7 == 0){
      count = 1;
    } else if (count == 3){
      count +=1;
    } else {
      var boxGeometry = new THREE.BoxGeometry(9, 7, 15);
      var boxMaterial = new THREE.MeshLambertMaterial({color: 0x000000});
      box = new THREE.Mesh(boxGeometry, boxMaterial);

      box.position.x = x;
      box.position.z = -2;

      scene.add(box);
      blackKeys.push(box);
      keysGroup.add(box);
      count += 1;
    }

  }
  scene.add(keysGroup);
  document.body.appendChild(renderer.domElement);
  document.addEventListener('mousemove', onMouseMove, false);
  document.addEventListener('mousedown', onMouseDown, false);
}

function onMouseMove (event){
  mouseX = event.clientX - window.innerWidth / 2;
  mouseY = event.clientY - window.innerHeight / 2;
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

var keyID;

function onMouseDown (){

  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(keysGroup.children);
  if (intersects.length > 0) {
    //get id of the clicked object
    console.log(intersects[0].object.id);
    keyID = intersects[0].object.id;
    playNote();
  }
}

function playNote() {
  switch (keyID){
    case 12:
    piano.play('C', 4, 2);
    break;
    case 13:
    piano.play('D', 4, 2);
    break;
    case 14:
    piano.play('E', 4, 2);
    break;
    case 15:
    piano.play('F', 4, 2);
    break;
    case 16:
    piano.play('G', 4, 2);
    break;
    case 17:
    piano.play('A', 4, 2);
    break;
    case 18:
    piano.play('B', 4, 2);
    break;
    case 19:
    piano.play('C', 5, 2);
    break;
    case 20:
    piano.play('D', 5, 2);
    break;
    case 21:
    piano.play('E', 5, 2);
    break;
    case 22:
    piano.play('F', 5, 2);
    break;
    case 23:
    piano.play('G', 5, 2);
    break;
    case 24:
    piano.play('A', 5, 2);
    break;
    case 25:
    piano.play('B', 5, 2);
    break;
    case 26:
    piano.play('C#', 4, 2);
    break;
    case 27:
    piano.play('D#', 4, 2);
    break;
    case 28:
    piano.play('F#', 4, 2);
    break;
    case 29:
    piano.play('G#', 4, 2);
    break;
    case 30:
    piano.play('A#', 4, 2);
    break;
    case 31:
    piano.play('C#', 5, 2);
    break;
    case 32:
    piano.play('D#', 4, 2);
    break;
    case 33:
    piano.play('F#', 4, 2);
    break;
    case 34:
    piano.play('G#', 4, 2);
    break;
    case 35:
    piano.play('A#', 4, 2);
    break;
  }
}

init();
//console.log("what is renderer?", renderer);
renderer.setAnimationLoop( function drawFrame() {
  //requestAnimationFrame(drawFrame);
  //update raycaster with mouse movement
    raycaster.setFromCamera(mouse, camera);
    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(keysGroup.children);
  //count and look after all objects in the keys group
    if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {
            if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            //setting up new material on hover
            INTERSECTED.material.emissive.setHex(Math.random() * 0xff00000 - 0xff00000);
        }
    } else {
        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        INTERSECTED = null;
    }
  renderer.render(scene, camera);
});

drawFrame();
