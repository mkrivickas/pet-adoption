const template = document.querySelector("#event-card-template");
const wrapper = document.createDocumentFragment();

async function start() {
  const weatherPromise = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=apparent_temperature"
  );
  const weatherData = await weatherPromise.json();
  const ourTemperature = weatherData.hourly.apparent_temperature[12];
  document.querySelector("#temperature-output").textContent = ourTemperature;
}

start();

async function petsArea() {
  const petsPromise = await fetch(
    "https://learnwebcode.github.io/bootcamp-pet-data/pets.json"
  );
  const petsData = await petsPromise.json();
  petsData.forEach((pet) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector("h3").textContent = pet.name;
    clone.querySelector(".event-description").textContent = pet.description;
    clone.querySelector(".event-date").textContent = createAgeText(
      pet.birthYear
    );
    clone.querySelector(".event-card-photo img").src = pet.photo;
    clone.querySelector(
      ".event-card-photo img"
    ).alt = `A ${pet.species} named ${pet.name}`;

    wrapper.appendChild(clone);
  });
  document.querySelector(".list-of-events").appendChild(wrapper);
}

petsArea();

function createAgeText(birthYear) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  if (age == 1) return "1 year old";
  if (age == 0) return "Less than a year old";

  return `${age} years old`;
}
