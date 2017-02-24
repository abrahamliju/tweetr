$( document ).ready(function() {
  let allowedChars = 140;
  $("textarea").on("keyup", function(){
    let charsEntered = $(this).val().length;
    let result = allowedChars - charsEntered;
    if(charsEntered > 140){
        $(".counter").css("color", "red").text(result);
    } else {
        $(".counter").text(result);
    }
  });
});
