"use strict";
function createElement(elem, elemClass = "") {
  let element = document.createElement(elem);
  element.setAttribute("class", elemClass);
  return element;
}
let bdiv = createElement("div", "container-lg");
let row1 = createElement("div", "row");
let col1 = createElement("div", "col-12");
let h1 = createElement("h1", "text-center");
h1.innerHTML = "Times Today";
let p = createElement("p", "day text-right");
let a = new Date();
let day;
switch (a.getDay()) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case 6:
    day = "Saturday";
    break;
}
p.innerHTML = `${day}, ${a.getDate()}.${a.getMonth() + 1}.${a.getFullYear()}`;
let hr = createElement("hr");
hr.setAttribute("style", "margin:0rem;");
col1.append(h1, p, hr);
row1.append(col1);
let row2 = createElement("div", "row");
let col2 = createElement("div", "col-12");
let nav = createElement("nav", "navbar-expand-lg navbar-light");
let btn = createElement("button", "navbar-toggler collapsed");
btn.setAttribute("type", "button");
btn.setAttribute("data-toggle", "collapse");
btn.setAttribute("data-target", "#navbarcolor03");
btn.setAttribute("data-controls", "navbarcolor03");
btn.setAttribute("aria-controls", "navbarcolor03");
btn.setAttribute("aria-expanded", "false");
btn.setAttribute("aria-label", "Toggle navigation");
let span = createElement("span", "navbar-toggler-icon");
btn.append(span);
let div1 = createElement("div", "navbar-collapse collapse");
div1.id = "navbarcolor03";
let ul = createElement("ul", "navbar-nav me-auto mb-2 mb-lg-0 mx-auto");
let navHead = [
  "home",
  "World",
  "Politics",
  "Magazine",
  "Technology",
  "Science",
  "Health",
  "Sports",
  "Arts",
  "Fashion",
  "Food",
  "Travel",
  "Business",
  "Opinion",
];
for (let i = 0; i < navHead.length; i++) {
  let li = createElement("li", "nav-item mr-1.5");
  let a = createElement("a", "nav-link");
  a.id = `nav${i}`;
  a.setAttribute("onclick", `foo('${navHead[i]}')`);
  a.onclick = function () {
    foo(`${navHead[i]}`);
  };
  a.innerHTML = navHead[i];
  li.append(a);
  ul.append(li);
}
div1.append(ul);
nav.append(btn, div1);
let hr1 = createElement("hr");
hr1.setAttribute("style", "margin:0rem;");
col2.append(nav, hr1);
row2.append(col2);
let row3 = createElement("div", "row");
let col3 = createElement("div", "col-12");
for (let i = 0; i < 15; i++) {
  let card = createElement("div", "mb-2");
  let cardallign = createElement("div", "row no-gutters");
  let cardclass = createElement("div", "col-lg-9");
  let cardbody = createElement("div", "card-body");
  let h4 = createElement("h4", "section-card");
  h4.id = `h4_${i}`;
  let h5 = createElement("h5", "title-card");
  h5.id = `h5_${i}`;
  let h6 = createElement("h6", "date-card");
  h6.id = `h6_${i}`;
  let p1 = createElement("p", "abstract-card");
  p1.id = `p_${i}`;
  let a1 = createElement("a", "continue-reading");
  a1.id = `a_${i}`;
  a1.style = "text-decoration:none";
  a1.setAttribute("href", `${i["url"]}`);
  a1.setAttribute("target", "_blank");
  let hr2 = createElement("hr");
  cardbody.append(h4, h5, h6, p1, a1);
  cardclass.append(cardbody);
  let imgdiv = createElement("div", "col-lg-3");
  let img1 = createElement("img", "img-thumbnail");
  img1.setAttribute("width", "100%");
  img1.setAttribute("heoght", "75%");
  img1.id = `img${i}`;
  imgdiv.append(img1);
  let br = createElement("br");
  cardallign.append(cardclass, imgdiv, br);
  card.append(cardallign, hr2);
  col3.append(card, br);
}
function foo(i) {
  fetch(
    `https://api.nytimes.com/svc/topstories/v2/${i}.json?api-key=fWgO5fjERO8s0UffjpjAXsmh0GSQvN2G`
  )
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      let a = data["results"];
      for (let i = 0; i < 15; i++) {
        document.getElementById(
          `h4_${i}`
        ).innerHTML = `${a[i]["section"]} | ${a[i]["subsection"]}`;
        document.getElementById(`h5_${i}`).innerHTML = `${a[i]["title"]}`;
        document.getElementById(
          `h6_${i}`
        ).innerHTML = `<em>-${a[i]["byline"]}</em>`;
        document.getElementById(`p_${i}`).innerHTML = `${a[i]["abstract"]}`;
        document.getElementById(`a_${i}`).innerHTML = "Continue Reading";
        document
          .getElementById(`a_${i}`)
          .setAttribute("href", `${a[i]["url"]}`);
        document
          .getElementById(`img${i}`)
          .setAttribute("src", `${a[i]["multimedia"][0]["url"]}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
foo("home");
row3.append(col3);
bdiv.append(row1, row2, row3);
document.body.append(bdiv);
