import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.css";
import "../styles/hero.css";
import "../styles/card.css";

console.log("Hello Coders! :)");

const mobileNav = document.querySelector(".hamburger");
const navbar = document.querySelector(".menubar");

const toggleNav = () => {
  navbar.classList.toggle("active");
  mobileNav.classList.toggle("hamburger-active");
};
mobileNav.addEventListener("click", () => toggleNav());

function main() {
  const base_Url = "https://restaurant-api.dicoding.dev";

  const getNotes = async () => {
    try {
      const response = await fetch(`${base_Url}/list`);
      const responseJson = await response.json();
      console.log(responseJson.restaurants);
      if (responseJson.error) {
        console.log("fetchAPIerr");
      } else {
        renderList(responseJson.restaurants);
      }
    } catch (error) {
      showResponseMessage(error);
    } finally {
      console.log("ProcessDone");
    }
    return;
  };
  const renderList = (Lists) => {
    const listNotesElement = document.querySelector("#card-list");
    listNotesElement.innerHTML = "";
    Lists.forEach((Resto) => {
      listNotesElement.innerHTML += `
        <div class="card">
          <a href="" class="card-btn">${Resto.city}</a>
          <img src="https://restaurant-api.dicoding.dev/images/large/${Resto.pictureId}" alt="Restoran ${Resto.name}">
          <div class="card-content">
              <p class="rate">Rating : <b>${Resto.rating}</b></p>
              <h3>${Resto.name}</h3>
              <p>${Resto.description}</p>
          </div> 
        </div>
      `;
    });
  };
  document.addEventListener("DOMContentLoaded", () => {
    getNotes();
  });
  const showResponseMessage = (message = "Check your internet connection") => {
    alert(message);
  };
}

main();
