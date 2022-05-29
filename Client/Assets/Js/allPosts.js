const showPosts = async () => {
    const res = await fetch ('https://latte-app.herokuapp.com/reviews');
    const reviews = await res.json();
    //make reviews show in reverse order
    reviews.reverse()
    for (let i = 0; i < reviews.length; i++) {
        const reviewIdx = reviews[i];
        const {id, title, description, content, gif, reaction, comments} = reviewIdx;        
        //for each post, we want:
        //new container
        const newDiv = document.createElement("div");
        newDiv.classList.add("post-container","container", "d-flex", "shadow-sm");
        newDiv.setAttribute("id", `review${id}`);
        document.getElementById("allposts").appendChild(newDiv);
        //new gif
        //GIPHY API KEY INFO
        const gifDiv = document.createElement("div");
        gifDiv.setAttribute("id", `gifDivId${id}`);
        gifDiv.classList.add("col-6")
        newDiv.append(gifDiv);
        const giphy = document.createElement("img");
        const urlGiphy = reviews[i].gif;
        giphy.setAttribute("src", urlGiphy);
        giphy.classList.add("img-fluid");
        gifDiv.appendChild(giphy);
        //new textDiv
        const textDiv = document.createElement("div");
        textDiv.setAttribute("id", `textDiv${id}`);
        textDiv.classList.add("col-6")
        newDiv.append(textDiv);
        //new title
        const newTitle = document.createElement("h2");
        newTitle.textContent = title;
        textDiv.append(newTitle);
        //new description
        const newLocation = document.createElement("h3");
        newLocation.textContent = description;
        textDiv.append(newLocation);
        //new content
        const newContent = document.createElement("p");
        newContent.textContent = content;
        textDiv.append(newContent);
        
        //reaction bar
        const reactionDiv = document.createElement("div");
        reactionDiv.classList.add("reaction-div");
        textDiv.append(reactionDiv);
        
        const thumbs = document.createElement("button");
        thumbs.setAttribute("id",`thumbs${id}`);
        thumbs.textContent=`${reaction.thumbs}`;
        thumbs.classList.add("thumbs" , "fa-solid", "fa-thumbs-up");
        reactionDiv.appendChild(thumbs);
        reactionNumber(thumbs,reaction.thumbs,id,"thumbs");

        const heart = document.createElement("button");
        heart.setAttribute("id",`heart${id}`);
        heart.textContent=`${reaction.heart}`;
        heart.classList.add("heart" , "fa-solid", "fa-heart")
        reactionDiv.appendChild(heart);
        reactionNumber(heart,reaction.heart,id,"heart");

        const coffee = document.createElement("button");
        coffee.setAttribute("id",`coffee${id}`);
        coffee.textContent=`${reaction.coffee}`;
        coffee.classList.add("coffee" , "fa-solid", "fa-mug-hot")
        reactionDiv.appendChild(coffee);
        reactionNumber(coffee,reaction.coffee,id,"coffee");

           //add comment title
           const commentTitle = document.createElement("p");
           commentTitle.classList.add("commentTitle")
           if(comments.length == 0) {
              commentTitle.textContent = "Comments: (0) Make a comment!"
          } else {
              commentTitle.textContent = `Comments: (${comments.length})`
          }
           
        textDiv.append(commentTitle);
        
        //Comments area
        const commentSection = document.createElement("div");
        commentSection.setAttribute("class", "commentSection");
        textDiv.append(commentSection);

        //publish old comments
        const postedComments = document.createElement("div");
        postedComments.setAttribute("id", `oldComment${id}`);
        commentSection.append(postedComments);

        //find comments and make p element
        comments.forEach(eachComment => {
        const commentSingle = document.createElement("p");
        commentSingle.textContent = eachComment;
        postedComments.append(commentSingle);
        const hrDivide = document.createElement("hr");
        postedComments.append(hrDivide);
        });
        //new comments
        const formElement = document.createElement("form");
        textDiv.append(formElement);
        // add comment input
        const comment = document.createElement("input");
        comment.setAttribute("type", "text");
        comment.setAttribute("id", `commentInput${id}`)
        comment.setAttribute("name","comment-input");
        comment.setAttribute("required", '')
        comment.setAttribute("placeholder","comment here");

        const submitBtn = document.createElement("input");
        submitBtn.setAttribute("type","submit");
        submitBtn.setAttribute("id", `commentSubmitBtn${id}`)
        submitBtn.classList.add("class", "btn", "btn-light")
        submitBtn.setAttribute("value","submit");
        formElement.appendChild(comment);
        formElement.appendChild(submitBtn);

        //handling comments
        newComment(formElement, id, `commentInput${id}`)
    }
}


showPosts();

//new comment function
function newComment(form, reviewId, commentInputId) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
       const commentBody = { comment : e.target[commentInputId].value, id: reviewId };
       const options = {method: "POST", body: JSON.stringify(commentBody)};
       fetch("https://latte-app.herokuapp.com/reviews/newcomment", options);
       window.location.href =window.location.href;
    })
}

function reactionNumber(button, count, id, type) {
    button.addEventListener("click", () => {
      count += 1;
      fetch(`https://latte-app.herokuapp.com/emoji?id=${id}&type=${type}`);
      button.innerHTML = ` ${count}`;
      if (count >= 5) {
          const newPara = document.createElement("p");
          newPara.textContent = "Will be added to map!"
          newPara.style.fontSize = "15px";
          newPara.style.lineHeight = "21px";
          button.appendChild(newPara);
      }
    });
  }
