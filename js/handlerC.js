



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


    $('.counter-plus').click(function () {
          var num = parseInt($input.val());
          if(num <= 58) {
              $input.val(num + 1);
            changeVal(num + 1);
            console.log('input is ');
          }
        
    })

    $( ".counter-minus" ).click(function() {
          var num = parseInt($input.val());
          if(num > 0) {
            $input.val(num - 1);
            changeVal(num - 1);
            console.log('input is ');
          }


    });

    function changeVal(num) {
      $input.data('num', num);
      console.log('change val '+num);
    }








})( jQuery );


