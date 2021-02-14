const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
const inputError = document.getElementById("input-error");


searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  sliderContainer.innerHTML = '';
  clearInterval(timer);
  const search = document.getElementById('search').value;
  const Key = '15674931-a9d714b6e9d654524df198e00&q';
  getImages(Key, search);
  sliders.length = 0;
})

const getImages = async (apiKey, query) => {
  try {
    const response = await fetch(`https://pixabay.com/api/?key=${apiKey}=${query}&image_type=photo&pretty=true`);
    const data = await response.json();
    showImages(data.hits)
  }
  catch (error) {
    searchError();
  }
}
//error message for search
const searchError = () => {
  const inputError = document.getElementById("input-error");
  inputError.innerText = "Invalid Input";
  inputError.style.display = "block";
}
// selected image 
let sliders = [];

// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
  })

}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.toggle('added');

  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } else {
    sliders.pop(element);
  }
}
// speed selector
sliderBtn.addEventListener('click', function () {
  createSlider();
})

var timer;
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }

  // hide image aria
  imagesArea.style.display = 'none';

  //show slide area
  document.querySelector('.main').style.display = 'block';

  //set images in slider
  const duration = document.getElementById('duration').value || 1000;
  //number Validation
  if (duration < 0) {
    inputError.style.display = "block";
    inputError.innerText = "Invalid Input Number";
    document.querySelector(".main").style.display = "none";
  }
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
        src="${slide}" alt="">`;
    sliderContainer.appendChild(item);
  })

  // crate slider previous next area

  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
    <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
    <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
    `;
  sliderContainer.appendChild(prevNext);



  changeSlide(0)
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, duration);


}


// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}