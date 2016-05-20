function animate() {

  requestAnimationFrame(animate);

  if (flyActive) {
    render();
    if (controls.object.position.x >= 5300) {
      controls.object.position.x = -5000
    } else if (controls.object.position.x <= -5300) {
      controls.object.position.x = 5000
    } else if (controls.object.position.z >= 5300) {
      controls.object.position.z = -5000
    } else if (controls.object.position.z <= -5300) {
      controls.object.position.z = 5000
    } else if (controls.object.position.y <= 0) {
      controls.object.position.y = 2000
    } else if (controls.object.position.y >= 6500) {
      controls.object.position.y = 1
    }
  }

  renderer.render(scene, camera);
}

function render() {
  var delta = clock.getDelta();
  controls.update( delta );
}
