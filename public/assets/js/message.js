// Function to Delete the message 
  $(".trash").on('click',function(event) {
    event.preventDefault();
    id = $(this).data("id"),
    $("#"+id).hide();
  
    if($(this).data("trash") === false){
      $(this).data("trash", true);
    }
  
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
  });

//Function to Star the message 
$(document).on('click','.star',function(event) {
  event.preventDefault();
  id = $(this).data("id");

  if($(this).data("star") === true){
    $(this).data("star", false);
  }else{
    $(this).data("star", true);
  }

  var star = {
    id: id,
    isStarred: $(this).data("star")
  };

  console.log(star);
  // Send the PUT request.
  $.ajax("/api/star",{
    type: "PUT",
    data: star
  }).then(
    function(dbstar) {
      console.log("updated", dbstar);
      starChecked();
    }
  );
})

// Check if isStarred is true
function starChecked(){
  $(".star").each(function(){
    if($(this).data("star") === true){
      $(this).css('background-color','#FFFF00');
      $(this).text('starred');
    }else{
      $(this).css('background-color','#fff');
      $(this).text('Star Message!');
    }
  })
}
starChecked();

// Function to allows a user to sort messages by score
$("#score").on("click", function(event){
  event.preventDefault();

  // Send the PUT request.
  $.ajax("/api/byscore",{
    type: "GET",
  }).then(
    function(dbscore) {
      console.log("updated", dbscore);
      printscoreUnTrashmessage(dbscore);
    }
  );
})

function printscoreUnTrashmessage(dbscore){
  $('.divUntrash').hide();
  $('.unTrashNewScore').empty();
  for (let i = 0; i < dbscore.length; i++) {
      if (dbscore[i].isTrashed == false){
        starChecked();
        $('.unTrashNewScore').append(
          `<div class="card">
              <div class="card-body">
                <div class="row">
                    <div class="col-md-8">
                        <div class="image-avatar">
                            <img id="avatar" src="${dbscore[i].avatar}" alt="">
                            <p id="handle" class="card-title">${dbscore[i].handle}</p>
                        </div>
                        <span class="twitter">${dbscore[i].source} |</span><span id="timestamp">${dbscore[i].timestamp}</span>
                        <p id="score">Score: ${dbscore[i].score}</p>
                        <p id="content" class="card-text">${dbscore[i].content}.</p>
                    </div>
                    <div class="col-sm-12 col-md-4">
                        <div class="started">
                            <button data-id="${dbscore[i].id}" data-star="${dbscore[i].isStarred}" class="star btn btn-message">Star Message!</button>
                            <button class="trash btn btn-trash" data-id="${dbscore[i].id}" data-trash="${dbscore[i].isStarred}"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
              </div>
            </div>`);
      }
    }
};

// Tooggle Message
$(".divTrash").hide();

$("#buttonParent").on('click', '#btn1', function () {
  $('.unTrashNewScore').empty();
  $("#score").hide();
  $(".divTrash").slideToggle( "slow" );
  $(".divUntrash").hide();
  $("#btn1").val("Untrashed messages");
  $("#btn1").attr("id", "btn2");
});

$("#buttonParent").on('click', '#btn2', function () {
  $(".divTrash").hide();
  $("#score").show();
  $(".divUntrash").slideToggle( "slow" );
  $("#btn2").val("Show Trashed Messages");
  $("#btn2").attr("id", "btn1");    
});



// 
$("#highlightButton").on("click", function(event){
  event.preventDefault();
  // turn user input lower case
  var input = $("#highlight").val()

  // $(".card-text").each(function(){
  //     // turn content to lower case
  //     var content = $(this).text();

  //     var searchMask = input;
  //       //g modifier: global. All matches (don't return on first match)
  //       //i modifier: insensitive. Case insensitive match (ignores case of [a-zA-Z])
  //       var regEx = new RegExp(searchMask, "ig");
  //       var replaceMask = `<span style="background-color:grey">${searchMask} </span>`;

  //   $(this).html(content.replace(regEx, replaceMask));
  // });

    // Send the GET request.
    $.ajax("/content",{
      type: "GET"
    }).then(
      function(data) {
        for (let i = 0; i < data.length; i++) {
          var content = data[i].content;
          var searchMask = input;
          console.log(data);
          console.log(searchMask);
          
          var regEx = new RegExp(searchMask, "ig");
          var replaceMask = `<span style="background-color:grey">${searchMask} </span>`;
          content = content.replace(regEx, replaceMask);    
          // PrintHilightContent(input, content);
        

        }

      }
    );
})

// function PrintHilightContent(input, content){
//     // turn content to lower case
//     var content = $(this).text();

//     var searchMask = input;
//       //g modifier: global. All matches (don't return on first match)
//       //i modifier: insensitive. Case insensitive match (ignores case of [a-zA-Z])
//       var regEx = new RegExp(searchMask, "ig");
//       var replaceMask = `<span style="background-color:grey">${searchMask} </span>`;

//   $(this).html(content.replace(regEx, replaceMask));
// }




