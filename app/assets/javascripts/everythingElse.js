Array.prototype.sample = function() {
  return this[~~(Math.random() * this.length)];
}

function rangeArray(min, max){
  output = []
  for(var i = min; i < max; i++){
    output.push(i)
  }
  return output
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function generateTexture() {
  // build a small canvas 32x64 and paint it in white
  var canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 64;
  var context = canvas.getContext('2d');
  // plain it in white
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, 32, 64);
  // draw the window rows - with a small noise to simulate light variations in each room
  for (var y = 2; y < 64; y += 2) {
    for (var x = 0; x < 32; x += 2) {
      // var value = Math.floor(Math.random() * 64);
      if ([-1, 1].sample() == 1){
        var value1 = Math.floor(Math.random() * 64);
        var value2 = Math.floor(Math.random() * 64);
        var value3 = Math.floor(Math.random() * 64);
      } else {
        var value1 = rangeArray(222, 255).sample();
        var value2 = rangeArray(210, 230).sample();
        var value3 = rangeArray(10, 25).sample();
      }
      console.log(value1, value2, value3)
      context.fillStyle = 'rgb(' + [value1, value2, value3].join(',') + ')';
      context.fillRect(x, y, 2, 1);
    }
  }

  // build a bigger canvas and copy the small one in it
  // This is a trick to upscale the texture without filtering
  var canvas2 = document.createElement('canvas');
  canvas2.width = 512;
  canvas2.height = 1024;
  var context = canvas2.getContext('2d');
  // disable smoothing
  context.imageSmoothingEnabled = false;
  // context.webkitImageSmoothingEnabled  = false;
  context.mozImageSmoothingEnabled = false;
  // then draw the image
  context.drawImage(canvas, 0, 0, canvas2.width, canvas2.height);
  // return the just built canvas2
  return canvas2;
}
