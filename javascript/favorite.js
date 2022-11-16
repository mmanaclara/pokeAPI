const pokeCard = document.querySelector(".pokeCard");
const emptyStorageScreen = document.querySelector(".astronaut-wrapper");
let storageCount = document.querySelector(".storageCount");

function goToSearchPage() {
  window.location.href = "search.html";
}

async function getStoragePoke() {
  const pokeInfos = window.localStorage.getItem("pokeInfos");

  const parsePoke = JSON.parse(pokeInfos);

  if (parsePoke) {
    createPokeCard(parsePoke);
    emptyStorageScreen.classList.add("hide");
    let savedCount = parsePoke.length;

    storageCount.insertAdjacentHTML(
      "beforeend",
      " " + "<span>" + savedCount + "</span>"
    );
  } else {
    emptyStorageScreen.classList.remove("hide");
  }
}
getStoragePoke();

function createPokeCard(parsePoke) {
  const pokeElement = document.createElement("div");
  pokeElement.classList.add("pokemon");

  const name = parsePoke.map((el) => el.name);
  const id = parsePoke.map((el) => el.id);
  const pic = parsePoke.map((el) => el.pic);
  const type = parsePoke.map((el) => el.type);

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
              <a href="/">${type}</a>
          </div>

          <button>
              Ver detalhes
          </button>
      `;

  pokeElement.innerHTML = pokeInnerHTML;

  pokeCard.appendChild(pokeElement);

  pokeElement.insertAdjacentHTML(
    "beforebegin",
    "<h3>" + "Olá, você tem " + parsePoke.length + " pokémon salvo!" + "</h3>"
  );
}
