// https://dog.ceo/api/breeds/image/random

/// initilaizing api
// .then - promises
// asynchronous programing
const accessToken = "c1dfe3d9c79961847c9fd6c84be584a2";
let searchDatabase = [];
let searchDatabaseIndex = 0;
const getHero = (id) => {
  fetch(`https://superheroapi.com/api.php/${accessToken}/${id}`)
    .then((response) => response.json())
    .then((json) => setData(json, false));
};

const setData = (json, fromSearch) => {
  let image = "";
  let hero_name = "";
  let power_stats = "";

  if (fromSearch) {
    searchDatabase = json.results;
    image = json.results[0].image.url;
    hero_name = json.results[0].name;
    power_stats = json.results[0].powerstats;
  } else {
    image = json.image["url"];
    hero_name = json.name;
    power_stats = json.powerstats;

    searchDatabase = [];
    searchDatabaseIndex = 1;
  }
  setDOM(image, hero_name, power_stats);
};

const setDOM = (image, hero_name, power_stats) => {
  document.getElementById(
    "imgDiv"
  ).innerHTML = `<img src='${image}' id='imgg'>`;
  document.getElementById("hero_name").innerText = `Hero Name : ${hero_name}`;

  let powerStringArray = [];
  let emoji = {
    intelligence: "🧠",
    strength: "💪",
    speed: "⚡",
    durability: "🏋️‍♂️",
    power: "🔥",
    combat: "⚔",
  };
  for (stats in power_stats) {
    let s = `<p>${emoji[stats]} ${stats.toUpperCase()} : ${
      power_stats[stats]
    }</p>`;
    powerStringArray.push(s);
  }

  document.getElementById("powers").innerHTML = `${powerStringArray
    .join("")
    .replace(",", "")}`;
};

let Rfbtn = document.getElementById("rfimg");
Rfbtn.onclick = () => {
  getHero(Math.floor(Math.random() * 732) + 1);
  document.getElementById("next").style.display = "none";
};

/// search hero
const searcHero = (name) => {
  fetch(`https://superheroapi.com/api.php/${accessToken}/search/${name}`)
    .then((response) => response.json())
    .then((json) => setData(json, true));
};

document.getElementById("Search").onclick = () => {
  let inpuValue = document.getElementById("input").value;
  if (inpuValue !== "") {
    searcHero(inpuValue);
    document.getElementById("input").value = "";
  }
  document.getElementById("next").style.display = "block";
};

document.getElementById("next").onclick = () => {
  const getUpdate = () => {
    let hero_name = searchDatabase[searchDatabaseIndex].name;
    let image = searchDatabase[searchDatabaseIndex].image.url;
    power_stats = searchDatabase[searchDatabaseIndex].powerstats;
    setDOM(image, hero_name, power_stats);
  };
  // console.log(searchDatabase.length);
  if (searchDatabase.length > searchDatabaseIndex) {
    getUpdate();
    searchDatabaseIndex++;
    if (searchDatabaseIndex == searchDatabase.length) {
      searchDatabaseIndex = 0;
    }
  } else {
    searchDatabaseIndex = 1;
    getUpdate();
  }
  console.log("current index ", searchDatabaseIndex);
};

getHero(Math.floor(Math.random() * 732) + 1);
