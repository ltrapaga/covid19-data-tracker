// Global variables
const inputEl = document.querySelector('#state-input');
const buttonEl = document.querySelector('#search-button');
const casesChartEl = document.querySelector('#cases-chart-div');
const testsChartEl = document.querySelector('#tests-chart-div');
const casesData = [['State', 'Cases', 'Deaths']];
const vaccineData = [['State', 'Vaccinations']];
const testsData = [['State', 'Positive Tests', 'Negative Tests']];
const errorModal = document.querySelector('#error-modal');
errorModal.addEventListener('click', function() {
    errorModal.classList.remove('is-active');
});

// CovidActNow API
const covidURL = 'https://api.covidactnow.org/v2/state/NC.json?apiKey=d6243821fb274ebd829752059c7a410a';
const covidApi = 'd6243821fb274ebd829752059c7a410a';

// Load the Google Charts Visualization API and the bar package.
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
            console.log('Population: ' + totPopulation);
            // Grab total vaccinations administered
            let totVaccinesAdministered = res.actuals.vaccinesAdministered;
            let totVaccinesCompleted = res.actuals.vaccinationsCompleted;
            let totVaccines;
                if (totVaccinesAdministered == null) {
                    console.log('Total Vaccinations Completed: ' + totVaccinesCompleted);
                    totVaccines = totVaccinesCompleted
                }
                else {
                    console.log('Total Vaccinations Administered: ' + totVaccinesAdministered);
                    totVaccines = totVaccinesAdministered
                }
            vaccineData.push([cityAC, totVaccines])
            // Grab total cases of this state
            let totCases = res.actuals.cases;
            console.log('Total Cases: ' + totCases);
            // Grab total deaths of this state
            let totDeaths = res.actuals.deaths;
            console.log('Total Deaths: ' + totDeaths);
            casesData.push([cityAC, totCases, totDeaths])
            // Grab total positive tests of this state
            let positiveTests = res.actuals.positiveTests;
            console.log('Positive Tests: ' + positiveTests)
            // Grab total negative test of this state
            let negativeTests = res.actuals.negativeTests;
            console.log('Negative Tests: ' + negativeTests)
            testsData.push([cityAC, positiveTests, negativeTests])

            drawChart();
        })
};

buttonEl.addEventListener('click', function() { 
    let searched =inputEl.value;
    fetchCovidData(searched);
});

function drawChart() {
                
    // Create the data table for cases and deaths.
    var data = new google.visualization.arrayToDataTable(casesData);
 
    // Set chart options.
    var options = {'title':'COVID-19 Cases and Deaths in US States',
                    'height': 100 * casesData.length,
                    hAxis: {baseline: 0},
                    bars: "horizontal",
                    series: {
                        0: { axis: 'Cases' }, // Bind series 0 to an axis named 'Cases'.
                        1: { axis: 'Deaths' } // Bind series 1 to an axis named 'Deaths'.
                      },
                      axes: {
                        x: {
                          Cases: {label: 'Cases'}, // Bottom x-axis.
                          Deaths: {side: 'top', label: 'Deaths'} // Top x-axis.
                        }
                      }};
 
    // Instantiate and draw chart, passing in some options.
    var chart = new google.charts.Bar(document.getElementById('cases-chart'));
    chart.draw(data, options);
    casesChartEl.classList.remove('is-invisible')

    // Create another data table for positive and negative tests.
    var data = new google.visualization.arrayToDataTable(testsData);
 
    // Set chart options.
    var options = {'title':'COVID-19 Cases',
                    'height': 100 * testsData.length,
                    hAxis: {baseline: 0},
                    bars: "horizontal",
                    series: {
                        0: { axis: 'Positive Tests' }, // Bind series 0 to an axis named 'Positive Tests'.
                        1: { axis: 'Negative Tests' } // Bind series 1 to an axis named 'Negative Tests'.
                      },
                      axes: {
                        x: {
                          distance: {label: 'Positive Tests'}, // Bottom x-axis.
                          brightness: {side: 'top', label: 'Negative Tests'} // Top x-axis.
                        }
                      }};
 
    // Instantiate and draw our chart, passing in some options.
    var chart = new google.charts.Bar(document.getElementById('tests-chart'));
    chart.draw(data, options);
    testsChartEl.classList.remove('is-invisible')
};
