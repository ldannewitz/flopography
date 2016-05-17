var scene, camera, renderer;
var geometry, material, mesh;
var boxes = [];
var radius = 2000;

 // init();
 // animate();


function init() {

  var nBoxes = countSliderValue / 5;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    // camera.position.z = 1000;
    camera.position.set(400, 300, 700);
    camera.lookAt(scene.position.z);

    var groundGeo = new THREE.PlaneGeometry(5000,5000,0);
    var material = new THREE.MeshBasicMaterial( {color: 0x99ccff, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( groundGeo, material );
    plane.rotation.x = 1.58;
    scene.add( plane );






    // create a point light
    var pointLight = new THREE.PointLight(0xFFFFFF);

    // set its position
    pointLight.position.x = -400;
    pointLight.position.y = 400;
    pointLight.position.z = 700;

    // add to the scene
    scene.add(pointLight);
    var light = new THREE.AmbientLight(0x404040); // soft white light -- im testing this line and the next
    scene.add(light);

    // geometry = new THREE.BoxGeometry(200, rangeSliderValue * 9, 200);
    material = new THREE.MeshLambertMaterial({
        color: 0xccccff,
        wireframe: false
    });

    counter = 0;
    for (var i = 0; i < nBoxes; i++) {
        geometry = new THREE.BoxGeometry(200, rangeSliderValue * Math.random() * 7, 200);

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        var first = Math.random()*1200;
        var third =Math.random()*-900;
        //boxes[i].scale.z = input;



        mesh.position.set(first, 0, third);
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
