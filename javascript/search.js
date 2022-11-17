const pokeCard = document.querySelector(".pokeCard");
const pokeName = document.querySelector("#pokeName");
const pokeID = document.querySelector("#pokeID");
const pokePic = document.querySelector("#pokePic");
const bgImg = document.querySelector(".bg-image");
const typeOfPoke = document.querySelector(".typeOfPoke");

const formSubmit = document.querySelector("#searchWrapper");
const searchInput = document.querySelector("#inputSearch");
const astronaut = document.querySelector('.astronaut-wrapper')
var saveBtn = document.querySelector('.saveBtn')

const colors = {
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
  unknown: "#68A090",
  shadow: "#333158",
  steel: "#B8B8D0",
};

async function getPoke(pokemon) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  
  await axios
    .get(url)
    .then((response) => {
      const data = response.data;

      saveFavoritePoke(data)

      pokeName.innerHTML = data.name[0].toUpperCase() + data.name.slice(1);
      pokeID.innerHTML = data.id;
      pokePic.src = data.sprites.front_default;
      typeOfPoke.innerHTML = data.types.map((el) => el.type.name)[0];

      if (pokemon === data.name) { //Adicionar || pokemon === data.id não funcionou como eu esperava, pois não aparecia a tela de não encontrado
        pokeCard.classList.add("show");
        bgImg.classList.add("hide");
        astronaut.classList.remove("show")
      } else {
        pokeCard.classList.remove("show");
        astronaut.classList.add("show")
        bgImg.classList.add("hide");
      }
    })
    .catch((error) => console.log(error.message));

}

formSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  getPoke(searchInput.value);
  searchInput.value = "";
});

function saveFavoritePoke(data) {

  let name = data.name
  let id = data.id
  let pic = data.sprites.front_default
  let type = data.types.map((el) => el.type.name)[0]

  console.log(name)
  console.log(id)
  console.log(JSON.stringify(type))

  let pokeInfos = new Array()

  if(localStorage.hasOwnProperty("pokeInfos")) {
    pokeInfos = JSON.parse(localStorage.getItem("pokeInfos"))
  }

  pokeInfos.push({ name: name, id: id, pic: pic, type: type })

  localStorage.setItem("pokeInfos", JSON.stringify(pokeInfos))

}

saveBtn.addEventListener("click", saveFavoritePoke)









// function saveFavoritePoke() {
//   const currentPoke = window.localStorage.getItem("currentPoke");

//   const parsePoke = JSON.parse(currentPoke);

//   pokeStorageList.push(parsePoke);

//   window.localStorage.setItem("pokeList", JSON.stringify(pokeStorageList));
// }

// saveFavoritePoke()

