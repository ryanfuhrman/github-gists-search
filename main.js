const URL = "https://api.github.com/users/";

const search = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const resultsList = document.querySelector(".results-list");
const userSearched = document.querySelector(".user-searched");

const getGists = () => {
  resultsList.innerHTML = "";
  search.style = "border-color: white, box-shadow: none";
  // TODO: Return error if search.value =/= true
  if (!search.value) {
    search.style = "border-color: red";
    resultsList.innerHTML = `<p style="color: red">Ya gotta search someone, ya dingus!</p>`;
  } else {
    const searchedUser = search.value;
    search.value = "";
    userSearched.innerHTML = `${searchedUser}'s Gists:`;
    fetch(`${URL}${searchedUser}/gists`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data[1]);
        if (data.length === 0) {
          // return "This user has no gists."
          console.log("This user has no gists");
          return (resultsList.innerHTML = `<p>This user has no gists.</p>`);
        } else {
          data.map((gist) => {
            return (resultsList.innerHTML += `
              <li class="result-li">
                <a href="${gist.html_url}" class="result-link">
                  <p class="result-description"><span class="result-category-name">Description:</span>  ${gist.description}</p>
                  <p class="result-comment"><span class="result-category-name">Comments:</span> ${gist.comments}</p>
                </a>
              </li>
            `);
          });
        }
      });
  }
};

searchButton.addEventListener("click", getGists);
search.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    getGists();
  }
});
