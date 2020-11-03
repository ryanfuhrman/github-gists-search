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
    userSearched.innerHTML = `${searchedUser}'s Gists:`;
    fetch(`${URL}${searchedUser}/gists`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        if (data.length === 0) {
          // return "This user has no gists."
          console.log("This user has no gists");
          return (resultsList.innerHTML = `<p>This user has no gists.</p>`);
        } else {
          data.map((gist) => {
            return (resultsList.innerHTML += `
              <li>
                <p>${gist.description}</p>
                <p>Comments: ${gist.comments}</p>
              </li>
            `);
          });
        }
      });
  }
};

searchButton.addEventListener("click", getGists);
