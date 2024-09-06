import React from "react";
import "./app.css";

function Countries() {
  let countriesData = [];

  function loadCountries() {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        countriesData = data;
        renderCountries(countriesData.slice(0, 12)); // Dastlabki 10 ta mamlakatni ko'rsatish
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  function renderCountries(filteredCountries) {
    const countriesContainer = document.getElementById("countries");
    countriesContainer.innerHTML = ""; // Avvalgi elementlarni tozalash

    filteredCountries.forEach((country) => {
      const countryImg = document.createElement("img");
      countryImg.src = country.flags.png;
      countryImg.style.width = "150px";
      countryImg.style.height = "70px";

      const countryDiv = document.createElement("div");
      countryDiv.className = "country";

      const countryName = document.createElement("p");
      countryName.textContent = country.name.common;
      countryName.className = "country-name";

      const countryCapital = document.createElement("p");
      countryCapital.textContent = `Poytaxt: ${
        country.capital ? country.capital[0] : "N/A"
      }`;
      countryCapital.className = "country-capital";

      countryDiv.appendChild(countryName);
      countryDiv.appendChild(countryImg);
      countryDiv.appendChild(countryCapital);
      countriesContainer.appendChild(countryDiv);
    });
  }

  function handleSearch(event) {
    const searchQuery = event.target.value.toLowerCase();
    if (searchQuery.length === 0) {
      renderCountries(countriesData.slice(0, 12));
    } else {
      const filteredCountries = countriesData.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery)
      );
      renderCountries(filteredCountries);
    }
  }

  // Sahifa yuklanganda ma'lumotlarni yuklash
  React.useEffect(() => {
    loadCountries();
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a country..."
        onInput={handleSearch}
        className="search-bar"
      />
      <div id="countries" className="countries-container"></div>
    </div>
  );
}

export default Countries;
