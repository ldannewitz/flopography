function createDayScene(){
  scene.fog = new THREE.FogExp2( 0xf2f2f2, 0.00035 );
  material = new THREE.MeshBasicMaterial( {color: 0x9DCC8F, side: THREE.DoubleSide} ); // light green ground
  renderer.setClearColor(0xBFE1FF, 1); // blue sky
}

function createNightScene(){
  scene.fog = new THREE.FogExp2( 0x332424, 0.00035 ); //f2f2f2 ff9999 (red glow)
  material = new THREE.MeshBasicMaterial( {color: 0x2A2A2A, side: THREE.DoubleSide} ); // gray ground
  renderer.setClearColor(0x46446E, 1); // purple sky
}

//renderer = new THREE.WebGLRenderer( { alpha: true } ) // makes bg transparent but in a really weird way

// renderer.setClearColor(0xf2f2f2, 1); //testing this shit for a transparent background
