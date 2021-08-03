
fetch('https://restcountries.eu/rest/v2/all')
    .then(res => res.json())
    .then(data => countrys(data));

//Country Display 
const countrys = countries => {

    const countryDisplay = document.querySelector(".country_display");

    for (let i = 0; i < countries.length; i++) {

        const card = document.createElement("div");
        card.classList.add("card")
        const country = countries[i];

        const countryInfo = `
            <img class="flag_img" src = ${country.flag} alt ="countryflag" >

            <div class="titleText">
                    <h3>${country.name}</h3>
                    <h6> ${country.capital}</p>
                    <h4>${country.region}</h4>
            </div>

            <button class="detailsBtn" onclick =" detail('${country.name}')">Details</button>
        `
        card.innerHTML = countryInfo;
        countryDisplay.appendChild(card);



    }


}
//Country Detail area

function detail(detailData) {
    const url = `https://restcountries.eu/rest/v2/name/${detailData}`;
    fetch(url)
        .then(res => res.json())
        .then(data => rendaringCountryInfo(data[0]))
}

const countryDetails = document.querySelector(".country-details");
const countryDisplay = document.querySelector(".country_display");
const backIcon = document.querySelector("#back");

//Country Detail Info Display
const rendaringCountryInfo = country => {
    countryDisplay.style.display = "none";
    backIcon.style.display = "inline";
    searchValueDisplay.style.display = "none";

    const detail = document.createElement("div");
    detail.classList.add("countryDetail")

    const countryDetail = `
                   
                     <div class="flag-img">
                      <img src =${country.flag} alt="countryFlag"/>
                      <h1>${country.name}</h1>
                    </div>
                     <div class="countryInfo">
                     </br>
                        <h1>NativeName: ${country.nativeName}</h1>
                        <br/>
                        <h3>Capital: ${country.capital}</h3>
                        <br/>
                        <h4>Region: ${country.region}</h4>
                        <br/>
                         <h5>Languages: ${country.languages[0]}</h5>
                         <br/>
                         <h5>Borders: ${country.borders}</h5>
                         <br/>
                        <h5>Population: ${country.population}</h5>
                        <br/>
                        <h5>Currencies: ${country.currencies[0]}</h5>
                        <br/>
                          <h5>Timezones: ${country.timezones}</h5>

                    </div>
             
         `
    detail.innerHTML = countryDetail;
    countryDetails.appendChild(detail);

}

// search-area
const searchInput = (data) => {
    const url = `https://restcountries.eu/rest/v2/name/${data}?fullText=true`
    fetch(url)
        .then(res => res.json())
        .then(data => searchValueShow(data[0]))
}

// searchBtn
const searchBtn = document.getElementById("searchBtn"); searchBtn.addEventListener("click", function () {
    const inputValue = document.getElementById("inputBox").value;
    searchInput(inputValue)
})

//search Country Display
const searchValueDisplay = document.querySelector('.searchValue');

const searchValueShow = (country) => {
    countryDisplay.style.display = "none";
    searchValueDisplay.style.display = "block";

    console.log("remove chacke")
    const card = document.createElement("div");
    card.classList.add("card")

    const countryInfo = `
            <img class="flag_img" src = ${country.flag} alt ="countryflag" >
            <div class="titleText">
                    <h3>${country.name}</h3>
                    <br/>
                    <h6> ${country.capital}</h6>
                    <br/>
                    <h4>${country.region}</h4>
            </div>
            <button class="detailsBtn" onclick =" detail('${country.name}')">Details</button>
        `
    card.innerHTML = countryInfo;
    searchValueDisplay.appendChild(card);

}

// backIcon area
backIcon.addEventListener("click", () => {
    history.go();
    countryDisplay.style.display = "flex";
    countryDetails.style.display = "none";
    searchValueDisplay.style.display = "none";

})









