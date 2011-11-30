
$(document).ready(function(){

    // On hover, this styles the signin button a bit more than what the css does
    $("#signin_button").hover(
          function () {
            $(this).css({ 'background-color':'#dde3fa', 'cursor':'pointer', 'font-weight':'1000'});
            $(this).next().css({  'font-weight':'1000'});
          }, 
          function () {
            $(this).css('background-color','');
          }
        );
   
});
