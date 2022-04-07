
fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => countrys(data));

//Country Display 
const countrys = countriesData => {

    const countryDisplay = document.querySelector(".country-display-area");
    countriesData.map(getData => {
        console.log(getData)
        let newDiv = document.createElement("div")
        newDiv.classList.add("card")
        newDiv.innerHTML = `
       
        <img class=""flag src = ${getData.flags.png} alt="country-flag">
        
        <div className="content">
        <h2>${getData.name.common}</h2>
        <button class="detailsBtn" onclick =" getDetail('${getData.name.common}')">Details</button>
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
    console.log(country)
    countryDisplay.style.display = "none";
    countryDetails.style.display = "block"
    backIcon.style.display = "inline";
    searchValueDisplay.style.display = "none";

    let countryDetailsNewDiv = document.createElement("div");
    countryDetailsNewDiv.classList.add("country-detail")

    countryDetailsNewDiv.innerHTML = `
                   
                    <div class="flag-img">
                      <img src =${country[0].flags.png} alt="countryFlag"/>
                      <h1>${country[0].name.common}</h1>
                    </div>
                     <div class="countryInfo">
                     <table class="table table-striped">
                        <tbody>
                            <tr>
                                <th scope="row">Capital</th>
                                <td>${country[0].capital}</td>
                            </tr>
                            <tr>
                                <th scope="row">Region  </th>
                                <td>${country[0].region}</td>
                            </tr>
                            <tr>
                                <th scope="row">Subregion</th>
                                <td>${country[0].subregion}</td>
                            </tr>
                            <tr>
                                <th scope="row">Timezones </th>
                                <td>${country[0].timezones}</td>
                            </tr>
                            <tr>
                                <th scope="row">StartOfWeek </th>
                                <td>${country[0].startOfWeek}</td>
                            </tr>
                            <tr>
                                <th scope="row">Area </th>
                                <td>${country[0].area}</td>
                            </tr>
                            <tr>
                            <th scope="row">Population  </th>
                            <td>${country[0].population}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <div class="d-flex justify-content-between">
                    
                    
                    <div className="maps img-thumbnail">
                    <iframe  src=${country[0].maps.googleMaps} width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    
                    </div>

                        <div className="img">
                        
                        <img class="img-thumbnail mx-2" src=${country[0].coatOfArms.png}/>
                        </div>
                    
                    </div>
             
         `

    countryDetails.appendChild(countryDetailsNewDiv);

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


// const countryInfo = `
//             <img class="flag_img" src = ${country[i].flag} alt ="countryflag" >

//             <div class="titleText">
//                     <h3>${country.name}</h3>
//                     <h6> ${country.capital}</h6>
//                     <h4>${country.region}</h4>
//             </div>

//             <button class="detailsBtn" onclick =" detail('${country.name}')">Details</button>
//         `
//         card.innerHTML = countryInfo;
//         countryDisplay.appendChild(card);







