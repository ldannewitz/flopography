$(document).ready(function(){
  heightSliderValue = document.getElementById("maxBoxHeight").value;
  countSliderValue = document.getElementById("boxCount").value;
  flyActive = false;
  init();
  animate();

  // Height slider updates
  $('#maxBoxHeight').on('change', function(){
    heightSliderValue = document.getElementById("maxBoxHeight").value;
    document.getElementById("height").innerHTML = heightSliderValue;
    init();
    animate();
  })

  // Number slider updates
  $('#boxCount').on('change', function(){
    countSliderValue = document.getElementById("boxCount").value;
    document.getElementById("count").innerHTML = countSliderValue;
    init();
    animate();
  })

  // Fly button
  $('#fly').on('click', function(){
    flyActive = true;
    init();
    animate();
  })

  $(document).on('keyup', function(e){
    if (e.keyCode === 27) {
      flyActive = false;
      init();
      animate();
    };

  })
})
