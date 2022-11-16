function goToSearchPage() {
    window.location.href = "search.html";
  }

const pokeCard = document.querySelector(".pokeCard");

async function getPoke() {
  const listStoragePoke = window.localStorage.getItem("pokeList");

  createPokeCard(JSON.parse(listStoragePoke));
}

getPoke();

function createPokeCard(listStoragePoke) {
  console.log(listStoragePoke);

  const pokeElement = document.createElement("div");
  pokeElement.classList.add("pokemon");

    const name = listStoragePoke.map((el) => el.name)[0].toUpperCase() + listStoragePoke.map((el) => el.name.slice(1));
    const id = listStoragePoke.map((el) => el.id);
    const pic = listStoragePoke.map((el) => el.sprites.front_default);

    console.log(JSON.stringify(name))
    console.log(id)
    console.log(JSON.stringify(pic))

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

          </div>

          <button>
              Ver detalhes
          </button>
      `;

  pokeElement.innerHTML = pokeInnerHTML;

  pokeCard.appendChild(pokeElement);
}
