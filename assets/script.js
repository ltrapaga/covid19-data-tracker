// Global variables.
const inputEl = document.querySelector('#state-input');
const buttonEl = document.querySelector('#search-button');
const formEl = document.querySelector('#form');
const casesChartEl = document.querySelector('#cases-chart-div');
const deathsChartEl = document.querySelector('#deaths-chart-div');
const vaccineChartEl = document.querySelector('#vacc-chart-div');
const testsChartEl = document.querySelector('#tests-chart-div');
const casesData = [['State', 'Cases']];
const deathsData = [['State', 'Deaths']];
const vaccineData = [['State', 'Vaccinations']];
const testsData = [['State', 'Positive Tests', 'Negative Tests']];
const errorModal = document.querySelector('#error-modal');
errorModal.addEventListener('click', function() {
    errorModal.classList.remove('is-active');
});

// CovidActNow API.
const covidURL = 'https://api.covidactnow.org/v2/state/NC.json?apiKey=d6243821fb274ebd829752059c7a410a';
const covidApi = 'd6243821fb274ebd829752059c7a410a';


// Load the Google Charts Visualization API.
google.charts.load('current', {
                   'packages':
                   ['corechart','bar']
                });

function fetchCovidData(cityAC) {
    fetch('https://api.covidactnow.org/v2/state/' + cityAC + '.json?apiKey=' + covidApi)
    // Get response and convert to json.
        .then((res) => res.json())
        // Activate modal if an error occurs.
        .catch(err=> errorModal.classList.add('is-active'))
        // Take json data and do something with it.
        .then((res) => {
            // Grab total vaccinations administered. If null, grab total vaccinations completed.
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
                };
            vaccineData.push([cityAC, totVaccines]);
            // Grab total cases.
            let totCases = res.actuals.cases;
                console.log('Total Cases: ' + totCases);
            // Push data to casesData array.
            casesData.push([cityAC, totCases]);
            // Grab total deaths.
            let totDeaths = res.actuals.deaths;
                console.log('Total Deaths: ' + totDeaths);
            // Push data to deathsData array.
            deathsData.push([cityAC, totDeaths]);
            // Grab total positive tests.
            let positiveTests = res.actuals.positiveTests;
                console.log('Positive Tests: ' + positiveTests);
            // Grab total negative tests.
            let negativeTests = res.actuals.negativeTests;
                console.log('Negative Tests: ' + negativeTests);
            // Push data to testsData array.
            testsData.push([cityAC, positiveTests, negativeTests]);

            drawChart();
        })
};

// Add click event to seach button that runs fetch for the city acronym input by the user.
buttonEl.addEventListener('click', function() { 
    let searched = inputEl.value;
    fetchCovidData(searched);
});

formEl.addEventListener('submit', function (event) {
    event.preventDefault()
});

function drawChart() {

    // Create the Cases data table.
    var data = new google.visualization.arrayToDataTable(casesData);

    // Set chart options.
    var options = {'height': 100 * casesData.length,
                colors: ['#1E90FF'],
                hAxis: {
                    baseline: 0,
                    format: 'short'
                    },
                vAxis: {
                    title: 'State'
                    }
                }  

    // Instantiate and draw chart, passing in options.
    var chart = new google.visualization.BarChart(document.getElementById('cases-chart'));
        chart.draw(data, options)
        // Remove is-invisible from cases-chart-div class.
        casesChartEl.classList.remove('is-invisible');

    // Create the Deaths data table.
    var data = new google.visualization.arrayToDataTable(deathsData);

    // Set chart options
    var options = {'height': 100 * deathsData.length,
                    colors: ['#B22222'],
                    hAxis: {
                    baseline: 0,
                    format: 'short'
                },
                    vAxis: {
                    title: 'State'
                }
            }

    // Instantiate and draw chart, passing in options.
    var chart = new google.visualization.BarChart(document.getElementById('deaths-chart'));
        chart.draw(data, options)
        // Remove is-invisible from deaths-chart-div class.
        deathsChartEl.classList.remove('is-invisible');


    // Create the Vaccinations data table.
    var data = new google.visualization.arrayToDataTable(vaccineData);

    // Set chart options.
    var options = {'height': 100 * vaccineData.length,
                    colors: ['#98FB98'],
                    hAxis: {
                    baseline: 0,
                    format: 'short'
                    }
                }

    // Instantiate and draw chart, passing in options.
    var chart = new google.visualization.BarChart(document.getElementById('vacc-chart'));
    chart.draw(data, options)
     // Remove is-invisible from vacc-chart-div class.
    vaccineChartEl.classList.remove('is-invisible');

    // Create the Tests data table.
    var data = new google.visualization.arrayToDataTable(testsData);

    // Set chart options.
    var options = {'height': 100 * testsData.length,
                    hAxis: {baseline: 0},
                    bars: "horizontal",
                    colors: ['#1E90FF', '#98FB98'],
                    series: {
                        0: { axis: 'Negative' }, // Bind series 0 to an axis named 'Negative'.
                        1: { axis: 'Positive' } // Bind series 1 to an axis named 'Posititve'.
                        },
                    axes: {
                        x: {
                        Negative: {label: 'Negative'}, // Bottom x-axis.
                        Positive: {side: 'top', label: 'Positive'} // Top x-axis.
                        }
                    }
                };

    // Instantiate and draw chart, passing in options.
    var chart = new google.charts.Bar(document.getElementById('tests-chart'));
    chart.draw(data, options);
    // Remove is-invisible from tests-chart-div class.
    testsChartEl.classList.remove("is-invisible");
};
