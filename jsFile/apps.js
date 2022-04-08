
fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => countrys(data));

const loadingSpinner = displayStyle => {
    document.getElementById("spinner").style.display = displayStyle;
}
//Country Display 
const countrys = countriesData => {
    loadingSpinner("block")
    const countryDisplay = document.querySelector(".country-display-area");
    countriesData.map(getData => {
        const { flags, name } = getData
        let newDiv = document.createElement("div")
        // newDiv.classList.add("d-flex")
        newDiv.innerHTML = `
        <div class="card mb-2" style="width: 18rem;">
            <img src=${flags.png} class="card-img-top" alt="flags">
            <div class="card-body">
                <h5 class="card-title">${name.common}</h5>
                <button onclick =" getDetail('${name.common}')" class="btn btn-primary">Details</button>
            </div>
        </div>
        `
        countryDisplay.appendChild(newDiv)
    })
    loadingSpinner("none")

}
//Country Detail area

function getDetail(detailData) {
    const url = `https://restcountries.com/v3.1/name/${detailData}`;
    fetch(url)
        .then(res => res.json())
        .then(data =>
            renderingCountryInfo(data)
        )
}

const countryDetails = document.querySelector(".country-details-area");
const countryDisplay = document.querySelector(".country-display-area");
const backIcon = document.querySelector("#back");

//Country Detail Info Display
const renderingCountryInfo = country => {
    loadingSpinner("block")
    const { flags, name, capital, region, subregion, timezones, startOfWeek, area, population, maps } = country[0]
    countryDisplay.classList.remove("d-flex")
    countryDisplay.style.display = "none";
    countryDetails.style.display = "block"
    // backIcon.style.display = "inline";
    searchValueDisplay.style.display = "none";
    searchBox.style.display = "none"
    let countryDetailsNewDiv = document.createElement("div");
    countryDetailsNewDiv.classList.add("row")

    countryDetailsNewDiv.innerHTML = `
                   
                    <div class="col-md-4 col-sm-12">
                      <img src =${flags.png} alt="countryFlag"/>
                      <h1>${name.common}</h1>
                    </div>
                     <div class="col-md-8 col-sm-12">
                     <table class="table table-striped">
                        <tbody>
                            <tr>
                                <th scope="row">Capital</th>
                                <td>${capital}</td>
                            </tr>
                            <tr>
                                <th scope="row">Region  </th>
                                <td>${region}</td>
                            </tr>
                            <tr>
                                <th scope="row">Subregion</th>
                                <td>${subregion}</td>
                            </tr>
                            <tr>
                                <th scope="row">Timezones </th>
                                <td>${timezones}</td>
                            </tr>
                            <tr>
                                <th scope="row">StartOfWeek </th>
                                <td>${startOfWeek}</td>
                            </tr>
                            <tr>
                                <th scope="row">Area </th>
                                <td>${area}</td>
                            </tr>
                            <tr>
                            <th scope="row">Population  </th>
                            <td>${population}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-sm-12">
                        <iframe  src=${maps.googleMaps}   loading="lazy"></iframe>
                        </div>
        
                </div>
             
         `
    countryDetails.appendChild(countryDetailsNewDiv);
    loadingSpinner("none")

}

// search-area
const searchBox = document.querySelector(".search-box");
const searchBtn = document.getElementById("searchBtn");

const searchInput = (getName) => {
    const url = `https://restcountries.com/v3.1/name/${getName}?fullText=true`
    fetch(url)
        .then(res => res.json())
        .then(data => searchValueShow(data))
}

// searchBtn
searchBtn.addEventListener("click", function () {
    countryDisplay.classList.remove("d-flex")
    countryDisplay.style.display = "none"
    loadingSpinner("block")
    const inputValue = document.getElementById("inputBox").value
    searchInput(inputValue)
    document.getElementById("inputBox").value = " "

})

//search Country Display
const searchValueDisplay = document.querySelector('.searchValue');

const searchValueShow = (country) => {
    const { flags, name, capital, region } = country[0]
    searchValueDisplay.style.display = "block";

    const card = document.createElement("div");
    card.classList.add("row")
    card.innerHTML = `
            <div class="col-md-4 col-sm-12"></div>
            <div class="col-md-4 col-sm-12">
            <div class="card" style="width: 18rem;">
            <img src=${flags.png} class="card-img-top" alt="flags">
            <div class="card-body">
                <h5 class="card-title">${name.common}</h5>
                <button onclick =" getDetail('${name.common}')" class="btn btn-primary">Details</button>
            </div>
        </div>
            
            </div>
            <div class="col-md-4 col-sm-12"></div>
        `
    searchValueDisplay.appendChild(card);

    loadingSpinner("none")

}







