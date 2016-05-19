function animate() {

  requestAnimationFrame(animate);

  // for(var i = 0; i < boxes.length; i++) {
  //   console.log(boxes[i].scale.z );
  //   //this one does a thing!
  //   boxes[i].scale.y = 2;
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
  render();
  renderer.render(scene, camera);
}

function render() {
  var delta = clock.getDelta();
  controls.update( delta );
}
