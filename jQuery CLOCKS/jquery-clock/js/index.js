/*

ALEX FRIEND 
Update/Changes
-Hour hand needs to update position depending on the minute hand. 

*/

$(document).ready(function (){
  
  function moveHands(){
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
  
    //calculate the angle for the second hand to move through
    var angleSec=dt.getSeconds()*6;
    $("#secondHand").css({'transform' : 'rotate('+ angleSec +'deg)'});


    //calculate the angle for the min hand to move through
    var angleMin=dt.getMinutes()*6;
    $("#minHand").css({'transform' : 'rotate('+ angleMin +'deg)'});
  
   //Calculate the angle for the hour hand to move through by converting the 24h time into a 12h format
    if(dt.getHours()>12){
     var correctedHour=dt.getHours()-12;
    }
  
    else{
      var correctedHour=dt.getHours();
    }
  
  var angleHour=(correctedHour*30);
   $("#hourHand").css({'transform' : 'rotate('+ angleHour +'deg)'});
  }
  
  //Loop function to move the hands updating hands every 1000ms
   $(function() {
    setInterval(function(){
    moveHands()
    }, 1000);
    });
  
  
})