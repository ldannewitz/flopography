var scene, camera, renderer;
var geometry, material, mesh;
var boxes = [];
var radius = 2000;

function init() {

    var nBoxes = countSliderValue * 4;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0xf2f2f2, 0.00035 );

    // first # 0-180 stretches the Z view (181-360 = upside down)
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    // camera.position.z = 1000;
    camera.position.set(0, 1000, 3400);
    camera.lookAt(scene.position);

    // shape of ground
    var groundGeo = new THREE.PlaneGeometry(5000,5000,0);
    // visual aspects of ground
    // ligth blue = 99ccff
    var material = new THREE.MeshBasicMaterial( {color: 0x9DCC8F, side: THREE.DoubleSide} );
    // puts them together to render
    var plane = new THREE.Mesh( groundGeo, material );
    // in radians
    plane.rotation.x = 1.58;
    scene.add( plane );

    // create a point light
    var pointLight = new THREE.PointLight(0xFFFFFF);

    // set its position
    pointLight.position.x = -900;
    pointLight.position.y = 1500;
    pointLight.position.z = 400;

    // add to the scene
    scene.add(pointLight);
    var light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);

    var texture       = new THREE.Texture( generateTexture() );
    console.log(texture);
    // texture.anisotropy = renderer.getMaxAnisotropy();
    texture.needsUpdate    = true;


    material = new THREE.MeshLambertMaterial({
        map: texture,
        color: 0xccccff,
        wireframe: false
    });

    for (var i = 0; i < nBoxes; i++) {
        geometry = new THREE.CubeGeometry(200, (200 + heightSliderValue * Math.random() * 15), 200);
        // geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        var negatives = [-1, 1]
        var first = Math.random() * 2300 * negatives.sample();
        var third = Math.random() * 2300 * negatives.sample();
        //boxes[i].scale.z = input;

        // x,y,z?
        mesh.position.set(first, 0, third);
        boxes.push(mesh);
    }

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // setSize(window.innerWidth/2, window.innerHeight/2, false) will render app at half resolution

    //renderer = new THREE.WebGLRenderer( { alpha: true } ) // makes bg transparent but in a really weird way
    // renderer.setClearColor(0xf2f2f2, 1); //testing this shit for a transparent background
    renderer.setClearColor(0xBFE1FF, 1); // blue sky

    var ren = document.body.lastChild;

    // this will probably bite me in the ass later
    // try to update existing?
    document.body.removeChild(ren);
    document.body.appendChild(renderer.domElement);

    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {

    requestAnimationFrame(animate);

    // for(var i = 0; i < boxes.length; i++) {
    //   console.log(boxes[i].scale.z );
    //   //this one does a thing!
    //   boxes[i].scale.y = heightSliderValue / 10;
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

Array.prototype.sample = function() {
  return this[~~(Math.random() * this.length)];
}

function generateTexture() {
  // build a small canvas 32x64 and paint it in white
  var canvas  = document.createElement( 'canvas' );
  canvas.width = 32;
  canvas.height    = 64;
  var context = canvas.getContext( '2d' );
  // plain it in white
  context.fillStyle    = '#ffffff';
  context.fillRect( 0, 0, 32, 64 );
  // draw the window rows - with a small noise to simulate light variations in each room
  for( var y = 2; y < 64; y += 2 ){
    for( var x = 0; x < 32; x += 2 ){
      var value   = Math.floor( Math.random() * 64 );
      context.fillStyle = 'rgb(' + [value, value, value].join( ',' )  + ')';
      context.fillRect( x, y, 2, 1 );
    }
  }

  // build a bigger canvas and copy the small one in it
  // This is a trick to upscale the texture without filtering
  var canvas2 = document.createElement( 'canvas' );
  canvas2.width    = 512;
  canvas2.height   = 1024;
  var context = canvas2.getContext( '2d' );
  // disable smoothing
  context.imageSmoothingEnabled        = false;
  // context.webkitImageSmoothingEnabled  = false;
  context.mozImageSmoothingEnabled = false;
  // then draw the image
  context.drawImage( canvas, 0, 0, canvas2.width, canvas2.height );
  // return the just built canvas2
  return canvas2;
}
