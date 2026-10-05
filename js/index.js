let eggs = $(".egg"),
  brokenEggs = $(".brokenEgg"),
  lifeScore = 5,
  $lifeScore = $(".lifeScore"),
  $basket = $(".basket"),
  $score = $(".score"),
  score = 0,
  $highestScore = $(".highestScore"),
  storageHighestScore,
  highestScore = 0;

$(window).mousemove(function (e) {
  let halfOfBasket = $(".basket").outerWidth(true) / 2,
    pageWidth = $("#Game").width();

  basketOffset(e.pageX - halfOfBasket);

  if (halfOfBasket > e.pageX) {
    basketOffset(0);
  } else if (pageWidth - halfOfBasket < e.pageX) {
    basketOffset(pageWidth - halfOfBasket * 2);
  }
});

$(".startGame").click(function () {
  resetGame();
  $(".startGame").slideUp(1000, startGame);
});

let getHighestScore = JSON.parse(localStorage.getItem("heighestScore"));
highestScore = getHighestScore;
$highestScore.text(highestScore);
