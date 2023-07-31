// var slides = document.querySelector(".slides");
// var slide = document.querySelectorAll(".slides li");
// var currentIdx = 0;
// var slideCount = slide.length;
// var slideWidth = 300;
// var slideMargin = 30;
// var prevBtn = document.querySelector(".prev-btn");
// var nextBtn = document.querySelector(".next-btn");

// slides.style.width =
//   (slideWidth + slideMargin) * slideCount - slideMargin + "px";

// function moveSlide(num) {
//   slides.style.left = -num * 330 + "px";
//   currentIdx = num;
// }
// nextBtn.addEventListener("click", function () {
//   if (currentIdx < slideCount - 3) {
//     moveSlide(currentIdx + 1);
//   } else {
//     moveSlide(0);
//   }
// });

// prevBtn.addEventListener("click", function () {
//   if (currentIdx > 0) {
//     moveSlide(currentIdx - 1);
//   } else {
//     moveSlide(slideCount - 3);
//   }
// });

//var slides = document.querySelector(".slides");
var slides_workout = document.querySelector(".slides_workout");
var slides_diet = document.querySelector(".slides_diet");
var slide_workout = document.querySelectorAll(".slides_workout li");
var slide_diet = document.querySelectorAll(".slides_diet li");
var currentIdx_workout = 0;
var currentIdx_diet = 0;
var slideCount_workout = slide_workout.length;
var slideCount_diet = slide_diet.length;
var slideWidth = 32; // 변경: 각 이미지의 너비 비율을 33.33%로 설정
//var prevBtn = document.querySelector(".prev-btn");
//var nextBtn = document.querySelector(".next-btn");

function moveSlide(key, num) {
  if (key == "workout") {
    slides_workout.style.left = -num * (slideWidth + 1.4) + "%"; // 변경: 왼쪽 위치를 이미지 비율에 맞게 설정
    currentIdx_workout = num;
  } else {
    slides_diet.style.left = -num * (slideWidth + 1.4) + "%"; // 변경: 왼쪽 위치를 이미지 비율에 맞게 설정
    currentIdx_diet = num;
  }
}

function prevSlide(key) {
  if (key == "workout") {
    if (currentIdx_workout > 0) {
      moveSlide(key, currentIdx_workout - 1);
    } else {
      moveSlide(key, slideCount_workout - 3); // 변경: 이미지가 3개씩 보이도록 수정
    }
  } else {
    if (currentIdx_diet > 0) {
      moveSlide(key, currentIdx_diet - 1);
    } else {
      moveSlide(key, slideCount_diet - 3); // 변경: 이미지가 3개씩 보이도록 수정
    }
  }
}
function nextSlide(key) {
  if (key == "workout") {
    if (currentIdx_workout < slideCount_workout - 3) {
      moveSlide(key, currentIdx_workout + 1);
    } else {
      moveSlide(key, 0); // 변경: 이미지가 3개씩 보이도록 수정
    }
  } else {
    if (currentIdx_diet < slideCount_diet - 3) {
      moveSlide(key, currentIdx_diet + 1);
    } else {
      moveSlide(key, 0); // 변경: 이미지가 3개씩 보이도록 수정
    }
  }
}
// nextBtn.addEventListener("click", function () {
//   if (currentIdx < slideCount - 3) {
//     // 변경: 이미지가 3개씩 보이도록 수정
//     moveSlide(currentIdx + 1);
//   } else {
//     moveSlide(0);
//   }
// });

// prevBtn.addEventListener("click", function () {
//   if (currentIdx > 0) {
//     moveSlide(currentIdx - 1);
//   } else {
//     moveSlide(slideCount - 3); // 변경: 이미지가 3개씩 보이도록 수정
//   }
// });
function openAdminPage(key) {
  // 원하는 새 창 크기를 지정합니다. (width, height)
  var customWidth = 600;
  var customHeight = 400;

  // 새 창의 위치를 가운데로 설정합니다.
  var leftPosition = (window.screen.width - customWidth) / 2;
  var topPosition = (window.screen.height - customHeight) / 2;

  // window.open() 메서드를 사용하여 새 창을 엽니다.
  window.open(
    `./${key}.html`,
    "_blank",
    "width=" +
      customWidth +
      ",height=" +
      customHeight +
      ",left=" +
      leftPosition +
      ",top=" +
      topPosition
  );
}
function handleImageClick(event) {
  var youtubeVideoId = event.currentTarget.parentNode.dataset.youtubeId;
  var youtubeLink = "https://www.youtube.com/watch?v=" + youtubeVideoId;

  // 새 창으로 유튜브 링크 열기
  window.open(youtubeLink, "_blank");
}

// 썸네일 이미지 URL을 가져오는 함수
function getThumbnailUrl(youtubeVideoId) {
  return "https://img.youtube.com/vi/" + youtubeVideoId + "/0.jpg";
}

// 각 이미지 요소에 클릭 이벤트 리스너를 추가하고 썸네일 이미지를 설정합니다.
var imageElements = document.querySelectorAll(".slides_workout li");
for (var i = 0; i < imageElements.length; i++) {
  var youtubeVideoId = imageElements[i].dataset.youtubeId;
  var thumbnailUrl = getThumbnailUrl(youtubeVideoId);
  var thumbnailImage = new Image();
  thumbnailImage.src = thumbnailUrl;
  thumbnailImage.addEventListener("click", handleImageClick);
  imageElements[i].appendChild(thumbnailImage);
}
