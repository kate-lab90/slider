let images = [{
  slide: 'roomAdmiral.jpg',
  url: 'img/roomAdmiral.jpg',
  title: 'room Admiral'
}, {
  slide: 'room-mobile.jpg',
  url: 'img/room-mobile.jpg',
  title: 'Sochi'
}, {
  slide: 'room-Patriotic.jpg',
  url: 'img/room-Patriotic.jpg',
  title: 'Patriotic'
}];



const initSlider = () => {
  const options = {
    titles: false,
    dots: true,
    autoplay: false,
  };

  // console.log('ok');
  if (!images || !images.length) return;

  let sliderImages = document.querySelector('.slider-images');
  let sliderArrows = document.querySelector('.slider-arrows');
  let sliderDots = document.querySelector(".slider-dots");
  let sliderLinks = document.querySelectorAll(".completed-projects-ul");
  let sliderInfo = document.querySelectorAll(".completed-projects-slider-info");

  if (options.dots) {     initDots();   }
  if (options.autoplay) {    initAutoplay();  }


  const initImages = () => {
    images.forEach((image, index) => {
      let imageDiv = `<div class = "image n${index} ${index === 0 ? 'active' : ''}" style="background-image:url(${images[index].url});" data-index='${index}'></div> `;
      sliderImages.innerHTML += imageDiv;
    });
  }

  const initArrows = () => {
    sliderArrows.querySelectorAll('.slider-arrow').forEach(arrow => {
      arrow.addEventListener('click', function () {
        let curNumber = + sliderImages.querySelector('.active').dataset.index;
        let nextNumber;
        if (arrow.classList.contains('left')) {
          nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
          // определяем правую стрелку: последнее это изображение или нет
          //если текущее = последнему, то в таком случае оно 0, а если не последнее, то текущее = +1
        }
        //когда знаем какое изображение включить следующим, то:
        console.log(nextNumber)
        console.log(curNumber)

        moveSlider(nextNumber);
      });
    });
  }

  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="slider-dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(".slider-dots-item").forEach(dot => {
      dot.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }








  moveSlider = (num) => {
    sliderImages.querySelector('.active').classList.remove('active');
    //ниже находим изображение, которое хотим включить
    sliderImages.querySelector('.n' + num).classList.add('active');

    if (options.dots) {
      sliderDots.querySelector('.active').classList.remove('active');
      sliderDots.querySelector('.n' + num).classList.add('active');
    }
    if (options.titles) changeTitle(num);

    changeInfo(num);
  }

  function initEventOnLinks(){
    sliderLinks.forEach((link, index) => {
      link.addEventListener("click", function() {
        moveSlider(index);
      })
    })
  }

  function changeTitle(num) {
    document.querySelector('.completed-projects-ul.active')?.classList.remove('active');
    sliderLinks[num].classList.add('active')
  }

  function changeInfo(num) {
    document.querySelector('.completed-projects-slider-info.active')?.classList.remove('active');
    sliderInfo[num].classList.add('active')
  }

  initImages();
  initArrows();

  changeTitle(0);
  initEventOnLinks();
  changeInfo(0);


}

let sliderOptions = {
  dots: true,
  titles: true,
  autoplay: false,
  autoplayInterval: 7000,

};

document.addEventListener('DOMContentLoaded', initSlider(sliderOptions))
