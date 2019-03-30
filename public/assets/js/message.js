// Function to Delete the message 
$(".trash").on("click", function(event){
  event.preventDefault();
  id = $(this).data("id"),
  $("#"+id).hide();

  var trash = {
    id: id,
    isTrashed: $(this).data("trash")
  };

  console.log(trash);
  // Send the PUT request.
  $.ajax("/api/trash",{
    type: "PUT",
    data: trash
  }).then(
    function(dbtrash) {
      console.log("updated", dbtrash);
      location.reload();
    }
  );
})

// Function to allows a user to sort messages by score
$("#score").on("click", function(event){
  event.preventDefault();

  // Send the PUT request.
  $.ajax("/api/byscore",{
    type: "GET",
    dataType: 'json'
  }).then(
    function(dbcore) {
      console.log("updated", dbcore);
      location.reload();
    }
  );
})


// Tooggle Message
$(".divTrash").hide();

$("#buttonParent").on('click', '#btn1', function () {
  $(".divTrash").slideToggle( "slow" );
  $(".divUntrash").hide();
  $("#btn1").val("untrashed messages");
  $("#btn1").attr("id", "btn2");
});

$("#buttonParent").on('click', '#btn2', function () {
  $(".divTrash").hide();
  $(".divUntrash").slideToggle( "slow" );
  $("#btn2").val("Show Trashed Messages");
  $("#btn2").attr("id", "btn1");    
});


