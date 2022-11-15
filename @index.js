const pokeCard = document.querySelector("#pokeCard")
const pokeName = document.querySelector("#pokeName");
const pokeID = document.querySelector("#pokeID");
const pokePic = document.querySelector("#pokePic");
const formSubmit = document.querySelector("#searchWrapper");
const searchInput = document.querySelector("#inputSearch");

function goToSearchPage() {
  window.location.href = "search.html";
}

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
  const APIResponse = await axios
    .get(url)
    .then((response) => {
      const data = response.data;

      saveFavoritePoke(JSON.stringify({name: data.name, id: data.id, img: data.sprites.front_default}))

        pokeName.innerHTML = data.name;
        pokeID.innerHTML = data.id;
        pokePic.src = data.sprites.front_default;
        const pokeTypes = data.types.map(el => el.type.name)

        pokeCard.classList.add('show')

    })
    .catch(error => console.log(error.message))

    return pokemon
}

formSubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    getPoke(searchInput.value)
    searchInput.value = ''
})

console.log(JSON.stringify(searchInput.value))

function saveFavoritePoke(pokemon) {
    window.localStorage.setItem('pokemons', pokemon)
    console.log(JSON.stringify(searchInput.value))
}
