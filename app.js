

import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs' 
const swiperCard = new Swiper(".swiper", {
  direction: "horizontal",
  // loop: true,

  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },

  speed: 800,
});



                                                                //  MAIN  JS

 const inputSearch = document.querySelector("input");
const btnSearch = document.querySelector("button");
const slideArea = document.querySelector(".swiper-wrapper");
const swiper = document.querySelector('.swiper').swiper;

btnSearch.addEventListener("click", (event) => {
  const bookName = inputSearch.value.trim();
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookName)}`;
  event.preventDefault();
  slideArea.innerHTML = ""; 
  if (bookName !== "") {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        const items = data.items || [];
        if (items.length === 0) {
          slideArea.innerHTML = "<p>No results found.</p>";
        } else {
          items.forEach(item => {
            const title = item.volumeInfo.title || "Unknown Title";
            const authors = item.volumeInfo.authors || ["Unknown Author"];
            const description = item.volumeInfo.description || "No description available";
            const thumbnail = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/150";
            const authorList = authors.map(author => `<h4 class="title_author">${author}</h4>`).join('');
            slideArea.innerHTML += `
                <div class="swiper-slide"> 
                  <div class="aboutBook">
                      <img class="bookImg" src="${thumbnail}" alt="${title}" />
                    <div class="headline">
                      <h2 class="title">${title}</h2>
                      <h3  class="title_author">  ${authorList}</h3>
                      <p class="paragraph">${description}</p>
                    </div>
                  </div>
                </div>
            `;
          });
          swiper.update(); 
        }
      })
      .catch(error => {
        console.error( error);
        slideArea.innerHTML = "<p>Failed to fetch data. Please try again later.</p>";
      });
  } else {
    console.log("Please enter a book name");
  }
});
