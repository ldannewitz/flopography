$(document).ready(function(){
  heightSliderValue = document.getElementById("maxBoxHeight").value;
  countSliderValue = document.getElementById("boxCount").value;
  init();
  animate();

  // Height slider updates
  $('body').on('change', '#maxBoxHeight', function(){
    heightSliderValue = document.getElementById("maxBoxHeight").value;
    document.getElementById("height").innerHTML = heightSliderValue;
    init();
    animate();
  })

  // Number slider updates
  $('body').on('change', '#boxCount', function(){
    countSliderValue = document.getElementById("boxCount").value;
    document.getElementById("count").innerHTML = countSliderValue;
    init();
    animate();
  })
})
