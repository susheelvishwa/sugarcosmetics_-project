// for slider

let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let slide = document.querySelectorAll(".slide-1");
let counter = 0;
let intervalId;

slide.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

const slideimage = () => {
  slide.forEach((slide) => {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
};

function handlePrev() {
  counter--;
  if (counter < 0) {
    counter = slide.length - 1;
  }
  slideimage();
}

function handleNext() {
  counter++;
  if (counter >= slide.length) {
    counter = 0;
  }
  slideimage();
}

function startSlider() {
  intervalId = setInterval(() => {
    counter++;
    if (counter >= slide.length) {
      counter = 0;
    }
    slideimage();
  }, 1000); 
}

function stopSlider() {
  clearInterval(intervalId);
}

prev.addEventListener("click", () => {
  stopSlider();
  handlePrev();
});
next.addEventListener("click", () => {
  stopSlider();
  handleNext();
});


startSlider();


// --------------------------bestsellers-------------------------------

const slidesContainer = document.querySelector(".slides-1");
let currentIndex = 0;

fetch("db.json")
  .then((response) => response.json())
  .then((data) => {
    data.product_data.forEach((product) => {
      const slideElement = document.createElement("div");
      slideElement.classList.add("slide");
      slideElement.classList.add("image");
      slideElement.classList.add("title");
      slideElement.classList.add("price");
      slideElement.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="product-details">
          <h3>${product.title}</h3>
          <p>${product.price}</p>
        </div>`;
      slidesContainer.appendChild(slideElement);
    });
  });

function changeSlide(direction) {
  console.log("slidesContainer=", slidesContainer);
  const slides = document.querySelectorAll(".slide");
  console.log("slides=", slides);
  const totalSlides = slides.length;
  console.log("totalSlides=", totalSlides);
  console.log("direction=", direction);
  console.log("currentIndex=(old", currentIndex);
  currentIndex = (currentIndex + direction * 4 + totalSlides) % totalSlides;
  console.log("currentIndex=", currentIndex);
  const offset = -currentIndex * 24.8;
  slidesContainer.style.transform = `translateX(${offset}%)`;
}
