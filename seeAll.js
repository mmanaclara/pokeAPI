const pokeCard = document.querySelector(".pokeCard");
const pokeCount = 150;
const categoryTtle = document.querySelector('.categoryTitle')
const allCategoryPokes = document.querySelectorAll('.all');

for(let i = 0; i < categoryTtle.length; i++){
    categoryTtle[i].addEventListener('click', filterPosts.bind(this, categoryTtle[i]));
}

function filterPosts(item){
    changeActivePosition(item);
    for(let i = 0; i < allCategoryPokes.length; i++){
        if(allCategoryPokes[i].classList.contains(item.attributes.id)){
            allCategoryPokes[i].style.display = "block";
        } else {
            allCategoryPokes[i].style.display = "none";
        }
    }
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

async function fetchPokes() {
    for (let i = 1; i <= pokeCount; i++) {
        await getPoke(i)
    }
}

async function getPoke(pokemon) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  await axios
    .get(url)
    .then((response) => {
      const data = response.data;

      const pokeTypes = data.types.map(el => el.type.name)

      createPokeCard(data, pokeTypes)
    })
    .catch((error) => console.log(error.message));
    
}

fetchPokes()

function createPokeCard(data, pokeTypes) {
    const pokeElement = document.createElement('div')
    pokeElement.classList.add('pokemon')

    const name = data.name[0].toUpperCase() + data.name.slice(1)
    const id = data.id
    const pic = data.sprites.front_default

    const type = pokeTypes
    const colorType = colors[type]

    const pokeInnerHTML = `
        <div class="pokeImg">
            <img src=${pic} />
            <button>
                <i class="fa-regular fa-heart fa-2xl"></i>
            </button>
        </div>

        <div>
            <strong class="pokeName">${name}</strong>
            <span>ID: <b>${id}</b></span>
            <a class="colorType all" href="/" style="background: ${colorType}">${type[0]}</a>
        </div>

        <button>
            Ver detalhes
        </button>
    `;

    pokeElement.innerHTML = pokeInnerHTML;

    pokeCard.appendChild(pokeElement)

    // document.querySelector('.colorType').style.backgroundColor = colorType
    
}


document.getElementsByClassName('pokeImg')

