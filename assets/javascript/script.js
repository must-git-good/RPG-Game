//


var topics = ["Test","Cats","Dobermans"];








var userSearch = "test";
// var userSearch = $("#search-results").val();
var searchTerm = userSearch;

resultsAmount = 10;

var urlQuery = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=kFmrkggeHb0rVjSwBsYc3fImxxJKPqWA&limit=" + resultsAmount;


$.ajax({
    url: urlQuery,
    method: "GET",
}).then(function(apiData){
    var data = apiData.data;

    console.log(data);
    

    for( var i = 0; i < data.length; i++){
       
    var stillImg = data[i].images.fixed_height_small_still.url;
    var moveImg = data[i].images.fixed_height_small.url;
        if (data[i].rating !== "r") {
            var gifHolder = $("<div class='item'>");
            var rating = data[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var image = $("<img>");
            image.attr({
                "class": "gif",
                "id": i,
                "src": data[i].images.fixed_height_small_still.url,
                "move-src": data[i].images.fixed_height_small.url,
                "static-src": data[i].images.fixed_height_small_still.url,
                "data-state": "still",
            });
            gifHolder.append(p);
            gifHolder.append(image);
            $(".gif-content").prepend(gifHolder);




            var listHold = $("#accordionHolder");
            var mkCard = $("<div class='card'>");
            var mkCardStep1 = $("<div class='card-header'>");
            var mkCardStep2 = $("<h5 class='mb-0'>");
            var mkCardBtn1 = $('<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo"');
            var mkCardStep3 = $('<div id="collapseTwo" class="collapse show" aria-labelledby="heading"'+i+'data-parent="#accordionHolder">');
            var mkCardStep4 = $('<div class="card-body gif-content" id="gif-">'+i);

            mkCardStep4;
            mkCardStep3;
            mkCardBtn1.text(userSearch);
            mkCardStep2;
            mkCardStep1;

        
            mkCardStep2.append(mkCardBtn1);
            mkCardStep1.append(mkCardStep2);
            mkCard.append(mkCardStep1);


            mkCardStep3.append(mkCardStep4);
            mkCard.append(mkCardStep3);
            
            listHold.append(mkCard);

            //         <div class="card-body">')
                                    //  <div class="card">
                                    //       <div class="card-header" id="headingOne">
                                    //         <h5 class="mb-0">
                                    //           <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    //              Words
                                    //           </button>
                                    //         </h5>
                                    //       </div>
                                      
                                    //       <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    //         <div class="card-body">
                                    //                     <div class="middle-form" id="middle">

                                    //                             </div>
                                    //         </div>
                                    //       </div>
                                    // </div>






        }
        $(".gif").val(this).on("click", function() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            console.log(this);
            console.log($(".gif"));
            console.log($(".gif").val());
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
              $(this).attr("src", $(this).attr("move-src"));
              $(this).attr("data-state", "move");
            } else {
              $(this).attr("src", $(this).attr("static-src"));
              $(this).attr("data-state", "still");
            }
          });
    }
   

});


