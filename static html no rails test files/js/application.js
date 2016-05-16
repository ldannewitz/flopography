var scene, camera, renderer;
var geometry, material, mesh;
var boxes = [];
var radius = 2000;

 // init();
 // animate();


function init() {

  var nBoxes = countSliderValue;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    // camera.position.z = 1000;
    camera.position.set(-500, 500, 1000);
    camera.lookAt(scene.position);

    geometry = new THREE.BoxGeometry(200, rangeSliderValue * 9, 200);
    material = new THREE.MeshLambertMaterial({
        color: 0xccccff,
        wireframe: false
    });


    // mesh = new THREE.Mesh(geometry, material);
    // mesh.position.set(300, 0, 0);
    //
    // scene.add(mesh);

    // create a point light
    var pointLight = new THREE.PointLight(0xFFFFFF);

    // set its position
    pointLight.position.x = -400;
    pointLight.position.y = 400;
    pointLight.position.z = 200;

    // add to the scene
    scene.add(pointLight);
    var light = new THREE.AmbientLight(0x404040); // soft white light -- im testing this line and the next
    scene.add(light);

    counter = 0;
    for (var i = 0; i < nBoxes; i++) {
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        mesh.position.set(counter,0,0);
        counter += 300;
        boxes.push(mesh);
    }



    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer = new THREE.WebGLRenderer( { alpha: true } ) // makes bg transparent but in a really weird way
    renderer.setClearColor(0xf2f2f2, 1); //testing this shit for a transparent background

    var ren = document.body.lastChild;


    // this will probably bite me in the ass later
    document.body.removeChild(ren);
    document.body.appendChild(renderer.domElement);

}

function animate() {

    requestAnimationFrame(animate);

    // for(var i = 0; i < boxes.length; i++) {
      //console.log(boxes[i].scale.z );
      //this one does a thing!
      //boxes[i].scale.z = input;
    // }

    //begin here
    // for(var i =0; i<boxes.length; i++){
    //   boxes[i].rotation.x += (Math.random() * 0.01 + 0.00005);
    //   boxes[i].rotation.y += (Math.random() * 0.01 + 0.00001);
    //
    //   if(boxes[i].position.y < -1000){
    //     boxes[i].position.y = 1000;
    //   } else {
    //       boxes[i].position.y -= (Math.random() * 3);
    //     }
    //
    // }

    renderer.render(scene, camera);

}
