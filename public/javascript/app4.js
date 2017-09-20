$(document).ready(function(){
    
         $("#page1, #page3").hide();
 
       // Play button
 
     $("#button").on('click', function(){
         $("#page3").show();
         $("#main").hide();
         
     });
 });
 
  //var $form = $("<form>");
     //  $("#form")  