/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function getTime(ms){
    let days = Math.floor(ms / (24*60*60*1000));
    let daysms=ms % (24*60*60*1000);
    let hours = Math.floor((daysms)/(60*60*1000));
    let hoursms=ms % (60*60*1000);
    let minutes = Math.floor((hoursms)/(60*1000));
    let minutesms=ms % (60*1000);
    let sec = Math.floor((minutesms)/(1000));
    if(!(days === 0)){
       return `${days} days ago`;
    } else if(days > 365){
        return "More than a year ago";
    } else if (!(hours === 0)){
       return `${hours} hours ago`;
    } else if(minutes === 1){
       return `${minutes} minute ago`
    } else if(!(minutes === 0)){
       return `${minutes} minutes ago`
    } else if (!(sec === 0)){
       console.log(sec);
       return `${sec} seconds ago`
    } else {
       return "Just Now";
    }
}


function createTweetElement(tweetData){
  let userName = tweetData.user.name;
  let avatars = tweetData.user.avatars.small;
  let handle = tweetData.user.handle;
  let content = escape(tweetData.content.text);
  let createdDate = getTime(Date.now() - tweetData.created_at);

  let html = `<article class = "tweet">
                <div class = "header">
                  <div class="avatar"> <img width = 50px src=${avatars}> </div>
                  <div class = "username"> ${userName} </div>
                  <div class= "userhandle">${handle}</div>
                </div>
                <div class = "body">
                   ${content}
                </div>
                <div class = "footer">
                   ${createdDate}
                  <div class="controls">
                    <i class="fa fa-flag" aria-hidden="true"></i>
                    <i class="fa fa-retweet" aria-hidden="true"></i>
                    <i class="fa fa-heart" aria-hidden="true"></i>
                  </div>
                </div>
              </article>`;
  return html;
};

function renderTweets(data){
  $("#tweets-container").empty();
  data.map(function(tweet){
    $("#tweets-container").prepend(createTweetElement(tweet));
  });
};

$(document).ready(function(){
  function getTweets(){
    $.ajax({
      method: 'GET',
      url: '/tweets'
    }).done((res) => {
      renderTweets(res);
    });
  }
  getTweets();
  $("form").on('submit', function(event){
    event.preventDefault();
    let tweet = $(this).serialize();
    if($('textarea').val().trim().length === 0 || $('textarea').val().length > 140 ){
      alert("You have not enetered a tweet or the tweet is more than 140 characters")
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: tweet
      }).done(function(){
        $('textarea').val('');
        getTweets();
      })
    }
  })
  $(".composebutton").click(function(){
    $(".new-tweet").slideToggle();
    $("textarea").focus();
  })
})
