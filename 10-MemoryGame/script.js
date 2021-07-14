let gifs = [
  "res/originals/lipstick.gif",
  "res/originals/watch.gif",
  "res/originals/top.gif",
  "res/originals/handbag.gif",
  "res/originals/necklace.gif",
  "res/originals/footwear.gif",
];
gifs = [...gifs, ...gifs];

function createCard(index) {
  if (index >= gifs.length) return null;
  var container = document.createElement("div");
  container.classList.add("container");
  var card = document.createElement("div");
  card.classList.add("card");
  var front = document.createElement("div");
  front.classList.add("front");
  var back = document.createElement("div");
  back.classList.add("back");
  var img = document.createElement("img");
  img.src = gifs[index];
  img.classList.add("movieIMG");
  back.appendChild(img);
  card.appendChild(front);
  card.appendChild(back);
  container.appendChild(card);
  return container;
}

var grid = document.querySelector(".grid");
for (let i = 0; i < 12; i++) {
  let index = Math.floor(Math.random() * (12 - i));
  grid.appendChild(createCard(index));
  gifs.splice(index, 1);
}
let moves = 15;
let pair = -1;
let matched = [];
let correct = 0;
let unmatched = [];
var cards = document.querySelectorAll(".card");
document.querySelector(".showcase-top div").innerText = "Moves Left :" + moves;
for (let i = 0; i < 12; i++) {
  cards[i].addEventListener("click", function () {
    if (matched.includes(i)) {
      return;
    }
    console.log(i + "clicked!");
    cards[i].classList.toggle("flipped");
    //console.log("matched", cards[i].classList.toggle("flipped"));
    if (!cards[i].classList.contains("flipped")) return;
    if (pair != -1 && i != pair) {
      moves--;
      document.querySelector(".showcase-top div").innerText =
        "Moves Left :" + moves;
      console.log(cards[i].lastChild.firstChild.src);
      if (
        cards[i].lastChild.firstChild.src ===
        cards[pair].lastChild.firstChild.src
      ) {
        console.log(i + " matched with " + pair);
        matched.push(i);
        matched.push(pair);
        console.log(matched);
        correct++;
      } else {
        unmatched.push(i);
        unmatched.push(pair);
        console.log(i + " didnt match with " + pair);
      }
      pair = -1;
    } else {
      pair = i;
    }
  });
}

setInterval(function () {
  if (unmatched.length > 0) {
    for (let j = 0; j < unmatched.length; j++) {
      cards[unmatched[j]].classList.toggle("flipped");
      cards[unmatched[j + 1]].classList.toggle("flipped");
      //console.log("unmatched", cards[unmatched[j]].classList.toggle("flipped"));
      unmatched.splice(0, 2);
    }
  }
}, 1000);
function reset() {
  correct = 0;
  moves = 15;
  location.reload();
}
setInterval(function () {
  if (moves == 0 && correct != 6) {
    alert("You lost!");
    reset();
  } else if (correct == 6) {
    alert("You won!");
    reset();
  }
}, 100);
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}