// Global variables
const inputEl = document.querySelector("#state-input");
const buttonEl = document.querySelector("#search-button");

const covidURL = "https://api.covidactnow.org/v2/state/NC.json?apiKey=d6243821fb274ebd829752059c7a410a";
const covidApi = "d6243821fb274ebd829752059c7a410a";

// Load the Visualization API and the bar package.
google.charts.load('current', {
                    'packages':
                    ['bar']
                });

function fetchCovidData(cityAC) {
    fetch('https://api.covidactnow.org/v2/state/' + cityAC + '.json?apiKey=' + covidApi)
    // Get response and conver to json.
        .then((res) => res.json())
        // Activate modal if an error occurs.
        //.catch(err => errorModal.classList.add("is-active"))
        // Taking that json data and doing somethin with it
        .then((res) => {
            console.log(res)
            // Grab total cases of this state
            let totPopulation = res.population;
            console.log("Population: " + totPopulation);
            // Grab total vaccinations administered
            let totVaccinesAdministered = res.actuals.vaccinesAdministered;
            let totVaccinesCompleted = res.actuals.vaccinationsCompleted;
            let totVaccines;
                if (totVaccinesAdministered == null) {
                    console.log("Total Vaccinations Completed: " + totVaccinesCompleted);
                    totVaccines = totVaccinesCompleted
                }
                else {
                    console.log("Total Vaccinations Administered: " + totVaccinesAdministered);
                    totVaccines = totVaccinesAdministered
                }
            vaccineData.push([cityAC, totVaccines])
            // Grab total cases of this state
            let totCases = res.actuals.cases;
            console.log("Total Cases: " + totCases);
            // Grab total deaths of this state
            let totDeaths = res.actuals.deaths;
            console.log("Total Deaths: " + totDeaths);
            casesData.push([cityAC, totCases, totDeaths])
            // Grab total positive tests of this state
            let positiveTests = res.actuals.positiveTests;
            console.log("Positive Tests: " + positiveTests)
            // Grab total negative test of this state
            let negativeTests = res.actuals.negativeTests;
            console.log("Negative Tests: " + negativeTests)
            testsData.push([cityAC, positiveTests, negativeTests])

            //drawChart();
        })
};

buttonEl.addEventListener("click", function() { 
    let searched =inputEl.value;
    fetchCovidData(searched);
});