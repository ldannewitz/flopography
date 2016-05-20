
var scene, camera, renderer;
var geometry, material, building;
var boxes = [];
var clock = new THREE.Clock();
// var controls;

function init() {

  scene = new THREE.Scene();
  //scene.fog = new THREE.FogExp2( 0xf2f2f2, 0.00035 ); //f2f2f2 ff9999 (red glow)
  scene.fog = new THREE.FogExp2( 0x332424, 0.00035 ); //f2f2f2 ff9999 (red glow)

  // first #: 0-180 stretches the Z view (181-360 = upside down)
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, 1000, 3400);
  camera.lookAt(scene.position);

  $('div.container').remove();
  var container = document.createElement( 'div' );
  $(container).addClass('container');
  document.body.appendChild( container );

  if (flyActive) {
    controls = new THREE.FlyControls( camera, container );
    controls.movementSpeed = 600;
    // controls.domElement = container;
    // controls.rollSpeed = Math.PI / 24;
    controls.rollSpeed = .4;
  }

  var groundGeo = new THREE.PlaneGeometry(10000,10000,0); // shape of ground
  // visual aspects of ground (light blue = 99ccff)
  // ground used to be 9DCC8F
  var material = new THREE.MeshBasicMaterial( {color: 0x2A2A2A, side: THREE.DoubleSide} );
  // puts them together to render
  var plane = new THREE.Mesh( groundGeo, material );
  plane.rotation.x = 1.58; // in radians
  scene.add(plane);

  // create a point light
  var pointLight = new THREE.PointLight(0xC5D6DB);
   //var pointLight = new THREE.DirectionalLight(0xC5D6DB, 0.9)

  // set point light position
  pointLight.position.set(-900, 1500, 400);


  // add point light to the scene
  scene.add(pointLight);

  var light = new THREE.AmbientLight(0x202020); // soft white light
  scene.add(light);

  // create texture for sides of buildings
  var texture = new THREE.Texture( generateTexture() );
  // texture.anisotropy = renderer.getMaxAnisotropy();
  texture.needsUpdate    = true;

  // set material for sides of buildings
  material = new THREE.MeshLambertMaterial({
    map: texture,
    color: 0xccccff,
    wireframe: false
  });

  var nBoxes = countSliderValue * 8;
  for (var i = 0; i < nBoxes; i++) {
    geometry = new THREE.CubeGeometry(200, (200 + heightSliderValue * Math.random() * 15), 200);
    // geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );

    building = new THREE.Mesh(geometry, material);
    scene.add(building);

    var negatives = [-1, 1]
    var first = Math.random() * 4800 * negatives.sample();
    var third = Math.random() * 4800 * negatives.sample();
    //boxes[i].scale.z = input;

    // geometry.faceVertexUvs[0][2][0].set( 0, 0 );
    // geometry.faceVertexUvs[0][2][1].set( 0, 0 );
    // geometry.faceVertexUvs[0][2][2].set( 0, 0 );
    // geometry.faceVertexUvs[0][2][3].set( 0, 0 );


    building.position.set(first, 0, third);
    boxes.push(building);
  }

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // setSize(window.innerWidth/2, window.innerHeight/2, false) will render app at half resolution

  //renderer = new THREE.WebGLRenderer( { alpha: true } ) // makes bg transparent but in a really weird way
  // renderer.setClearColor(0xf2f2f2, 1); //testing this shit for a transparent background
  //renderer.setClearColor(0xBFE1FF, 1); // blue sky
  renderer.setClearColor(0x46446E, 1); // blue sky

  // this will probably bite me in the ass later
  // try to update existing?
  // document.div.removeChild(oldCanvas);
  $('div.container').append(renderer.domElement);

  window.addEventListener( 'resize', onWindowResize, false );
}
