
fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => countrys(data));

//Country Display 
const countrys = countriesData => {
    const countryDisplay = document.querySelector(".country-display-area");
    countriesData.map(getData => {
        const { flags, name } = getData
        let newDiv = document.createElement("div")
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
    const { flags, name, capital, region, subregion, timezones, startOfWeek, area, population, maps } = country[0]
    countryDisplay.style.display = "none";
    countryDetails.style.display = "block"
    backIcon.style.display = "inline";
    searchValueDisplay.style.display = "none";
    searchBox.style.display = "none"

    let countryDetailsNewDiv = document.createElement("div");
    countryDetailsNewDiv.classList.add("country-detail")

    countryDetailsNewDiv.innerHTML = `
                   
                    <div class="flag-img">
                      <img src =${flags.png} alt="countryFlag"/>
                      <h1>${name.common}</h1>
                    </div>
                     <div class="countryInfo">
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
                    <div class="">
                    
                        <div className="maps ">
                        <iframe  src=${maps.googleMaps}  style="border:0;"  loading="lazy"></iframe>
                        
                        </div>
                    </div>
             
         `
    countryDetails.appendChild(countryDetailsNewDiv);

}

// search-area
const searchBox = document.querySelector(".search-box");
const searchBtn = document.getElementById("searchBtn");
const inputValue = document.getElementById("inputBox")
const searchInput = (getName) => {
    const url = `https://restcountries.com/v3.1/name/${getName}?fullText=true`
    fetch(url)
        .then(res => res.json())
        .then(data => searchValueShow(data))
}

// searchBtn
searchBtn.addEventListener("click", function () {
    const inputValues = inputValue.value;
    // console.log(inputValues)
    searchInput(inputValues)
})

//search Country Display
const searchValueDisplay = document.querySelector('.searchValue');

const searchValueShow = (country) => {
    const { flags, name, capital, region } = country[0]
    countryDisplay.style.display = "none";
    searchValueDisplay.style.display = "block";

    console.log("remove chacke")
    const card = document.createElement("div");
    card.classList.add("justify-content-center")
    card.innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src=${flags.png} class="card-img-top" alt="flags">
        <div class="card-body">
            <h5 class="card-title">${name.common}</h5>
            <button onclick =" getDetail('${name.common}')" class="btn btn-primary">Details</button>
        </div>
    </div>
        `
    searchValueDisplay.appendChild(card);

}

// backIcon area
backIcon.addEventListener("click", () => {
    history.go();
    countryDisplay.style.display = "flex";
    countryDetails.style.display = "none";
    searchValueDisplay.style.display = "none";

})







