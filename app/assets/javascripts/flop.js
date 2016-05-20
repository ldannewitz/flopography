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
  $(document).on('click', '#fly', function(){
    // $(this).toggleClass('hidden');
    $(this).remove();
    $("<p id='esc'> esc to stop flying</p>").insertAfter('#count')
    flyActive = true;
    init();
    animate();
  })

  // Esc key
  $(document).on('keyup', function(e){
    if (e.keyCode === 27) {
      flyActive = false;
      $('<button id="fly" type="submit">Fly!</button>').insertAfter('#count');
      $('#esc').remove();
    };
  })
})
