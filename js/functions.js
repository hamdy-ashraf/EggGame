function basketOffset(left) {
  $(".basket").offset({
    left: left,
  });
}

function startGame() {
  for (let i = 0; i <= 2; i++) {
    moveEgg(eggs[i], Math.random() * 10);
    isEggHunted(eggs[i]);
  }

  let theGame = requestAnimationFrame(startGame);

  if (lifeScore <= 0) {
    $(".startGame").slideDown(1000);
    $(".startGame h5").text("Game Over, Try Again");
    cancelAnimationFrame(theGame);
    heightScore();
  }
}

function backEgg(egg) {
  $(egg).offset({
    top: 120,
  });
}

function moveEgg(egg, speed) {
  let topOfEgg = $(egg).offset().top,
    distance = Math.random() * speed + 1,
    indexOfEgg = eggs.index(egg);
  $(egg).offset({
    top: topOfEgg + distance,
  });

  if (topOfEgg <= $(".basket").offset().top + $(".basket").height()) {
    $(egg).offset({
      top: topOfEgg + distance,
    });
  } else {
    if (lifeScore > 0) {
      backEgg(egg);

      brokenEggs.eq(indexOfEgg).fadeIn(500).delay(500).fadeOut(500);
      $(".lifeScore").text(--lifeScore);
    }
  }
}

function isEggHunted(egg) {
  if (collition(egg, $basket)) {
    $score.text(++score);
    backEgg(egg);
  }
}

function collition(item1, item2) {
  // let egg = 1
  // let basket = 2
  let $t1 = $(item1).offset().top,
    $l1 = $(item1).offset().left,
    $b1 = $(item1).outerHeight(true) + $t1,
    $r1 = $(item1).outerWidth(true) + $l1,
    $t2 = $(item2).offset().top,
    $l2 = $(item2).offset().left,
    $b2 = $(item2).outerHeight(true) + $t2,
    $r2 = $(item2).outerWidth(true) + $l2;

  if ($b1 < $t2 || $l1 > $r2 || $t1 > $b2 || $r1 < $l2) {
    return false;
  }
  return true;
}

function resetGame() {
  backEgg(eggs[0]);
  backEgg(eggs[1]);
  backEgg(eggs[2]);

  lifeScore = 5;
  $lifeScore.text(lifeScore);
  score = 0;
  $score.text(score);
}

function heightScore() {
  localStorage.setItem("score", JSON.stringify(score));

  storageHighestScore = JSON.parse(localStorage.getItem("score"));

  if (highestScore < storageHighestScore) {
    highestScore = storageHighestScore;
    $highestScore.text(storageHighestScore);
  }

  localStorage.setItem("heighestScore", JSON.stringify(highestScore));
}
