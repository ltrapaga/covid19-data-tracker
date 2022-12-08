const covidURL = "https://api.covidactnow.org/v2/state/NC.json?apiKey=d6243821fb274ebd829752059c7a410a";
const covidApi = "d6243821fb274ebd829752059c7a410a";

function promptState() {
    // Prompt for which state to search
    let city = prompt("Which state would you like to search for?");
    // Call api searching for city varibales value(state)
    fetchCovidData(city);
}

promptState()


function fetchCovidData(cityAC) {
    fetch('https://api.covidactnow.org/v2/state/' + cityAC + '.json?apiKey=' + covidApi)
    // Getting response and converting to json
        .then((res) => res.json())
        // Taking that json data and doing somethin with it
        .then((res) => {
            console.log(res)
            // Grab total cases of this state
            let totPopulation = res.population;
            console.log("Population: " + totPopulation);
            // Grab total vaccinations administered
            let totVaccinesAdministered = res.actuals.vaccinesAdministered;
            console.log("Total Vaccinations Administered: " + totVaccinesAdministered);
            // Grab total cases of this state
            let totCases = res.actuals.cases;
            console.log("Total Cases: " + totCases);
            // Grab total deaths of this state
            let totDeaths = res.actuals.deaths;
            console.log("Total Deaths: " + totDeaths);
                // Empty array = []
                let arr = [];
                // Push population to array = [population]
                arr.push(totPopulation);
                // Push vaccinations to array = [population, vaccinations]
                arr.push(totVaccinesAdministered);
                // Push cases to array = [population, vaccinations, cases]
                arr.push(totCases);
                // Push deaths to array = [population, vaccinations, cases, deaths]
                arr.push(totDeaths);
                console.log(arr)

        })
}
