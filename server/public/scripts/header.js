/* This file should contain any DOM manipulation
needed to populate the header, nav, and footer elements
*/

// createHeader, createNav, and createFooter functions
function createHeader() {
  return `
        <h1 class="title">Shanghai</h1>
    `;
}

function createNav() {
  return `
      <a href="/">Home</a>
      <a href="/attractions">Attraction</a>
      <a href="/restaurants">Restaurant</a>
      <a href='/newRestaurant'>New Restaurant</a>
    `;
}

function createFooter() {
  return `
      <p>Contact Info: zlong1@sfsu.edu</p>
    `;
}

document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector("nav");
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  nav.innerHTML = createNav();
  header.innerHTML = createHeader();
  header.classList.add("headPicture");
  footer.innerHTML = createFooter();
});
