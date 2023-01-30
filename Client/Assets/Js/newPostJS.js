const form = document.querySelector("form");
const title = document.getElementById("titleForm");
const description = document.getElementById("descriptionForm");
const content = document.getElementById("contentForm");
const gif = document.getElementById("gifForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = event.target.titleForm.value;
  const description = event.target.descriptionForm.value;
  const content = event.target.contentForm.value;
  const selectedGif = document.querySelector('button[class="selected"] img');
  let gif = "";
  if (selectedGif) {
    gif = selectedGif.getAttribute("src");
  }

  submitPost(title, description, content, gif);

  console.log("Post sent")
});

charCount(title, "titleCount");
charCount(description, "descriptionCount");
charCount(content, "contentCount");

function charCount(formElement, formElementID) {
  formElement.addEventListener("input", event => {
    const count = formElement.value.length;
    const maxLength = formElement.getAttribute("maxlength");
    document.getElementById(
      formElementID
    ).textContent = `${count}/${maxLength}`;
    if (`${count}` === `${maxLength}`) {
      document.getElementById(formElementID).style.color = "#ff1a1a";
    } else {
      document.getElementById(formElementID).style.color = "black";
    }
  });
}

function submitPost(title, description, content, gif) {
  const newPostElements = {
    title: title,
    description: description,
    content: content,
    gif: gif,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(newPostElements),
  };

  fetch("https://latte-io-api.onrender.com/reviews/newreview", options);
  setInterval(redirectReviews(), 2000); 

}

function redirectReviews() {
  window.location.href = "posts.html";
}

let giphyButton = document.getElementById('giphSearch');
giphyButton.addEventListener('click', searchGif);

const API_KEY = "43TNXQTzYml4CNTzdlyxNveqsrh7z3CB";
async function searchGif(e) {
  e.preventDefault();
  try {
    let searchQuery = document.getElementById('giphyFinder').value;
    console.log(searchQuery)
    let giphyAPIURL = `https://api.giphy.com/v1/gifs/search?q=${searchQuery}&rating=g&api_key=${API_KEY}&limit=5`;
    let fetchedData = await fetch(giphyAPIURL);
    let dataJson = await fetchedData.json();
    console.log(dataJson);
    console.log(dataJson.data[0].images.fixed_height.url);
    appendGifs(dataJson);
    // return dataJson.data[0].images.fixed_height.url;
  } catch (error) {
    console.log(error)
    // return null;
  }

}

function appendGifs(json) {
  let sectionToAppend = document.getElementById('gifSection');
  sectionToAppend.style.display = "block";
  document.getElementById('gifSection').innerHTML = "";
  for (let i = 0; i < json.data.length; i++) {
    let imgPath = json.data[i].images.fixed_height.url;
    let img = document.createElement('img');
    let imgButton = document.createElement('button');
    imgButton.id = `imgBtn${i + 1}`;
    let id = imgButton.id;
    imgButton.classList.add("removeBorder");
    imgButton.addEventListener('click', (e) => {
      e.preventDefault();
      changeBorder(id, json);
    });
    img.setAttribute("src", imgPath);
    imgButton.append(img);
    sectionToAppend.append(imgButton);
  };

}

function changeBorder(id, json) {
  for (let i = 0; i < json.data.length; i++) {
    let resetButton = document.getElementById(`imgBtn${i + 1}`);
    resetButton.classList.remove("selected");
    resetButton.classList.add("removeBorder");
  }
  let selected = document.getElementById(id);
  selected.classList.remove("removeBorder");
  selected.classList.add("selected");
}
