



;(function(){
  'use strict';
   $.fn.handleCounter = function() {

   	    var $input;
        var $btnMinus;
        var $btnPlugs;
        var $handleCounter = this;

   	    $btnMinus = $handleCounter.find('.counter-minus');
        
        $btnPlugs = $handleCounter.find(".counter-plus");



return $handleCounter
};


    var $input = $('#handleCounter').find('input');
    var timeintervalID; 


    $('.start').click(function () {
            myFunction();
    })

    $('.annul').click(function () {
            stopCounter();
    })


    $('.counter-plus').click(function () {
          var num = parseInt($input.val());
          if(num <= 58) {
              $input.val(num + 1);
            changeVal(num + 1);
            }
        
    })

    $( ".counter-minus" ).click(function() {
          var num = parseInt($input.val());
          if(num > 0) {
            $input.val(num - 1);
            changeVal(num - 1);
          }


    });

    function changeVal(num) {
      $input.data('num', num);
      console.log('change val '+num);
    }

  function myFunction() {
    var num = parseInt($input.val());
    var start = new Date().getTime();
    var countDownDate = addMinutes(start,num);
    timeintervalID = setInterval(function(){ 
    
    var now = new Date().getTime();
    var distance = countDownDate - now;
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("demo").innerHTML = minutes + "m " + seconds + "s ";
    }, 1000);
  }

  function addMinutes(date, minutes) {  
      return new Date(date + minutes*60000);
  }

   function stopCounter() {
      clearInterval(timeintervalID);
    }







})( jQuery );


