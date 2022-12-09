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
            let totVaccinesCompleted = res.actuals.vaccinationsCompleted;
                if (totVaccinesAdministered == null) {
                    console.log("Total Vaccinations Completed: " + totVaccinesCompleted);
                }
                else {
                    console.log("Total Vaccinations Administered: " + totVaccinesAdministered);
                }
            // Grab total cases of this state
            let totCases = res.actuals.cases;
            console.log("Total Cases: " + totCases);
            // Grab total deaths of this state
            let totDeaths = res.actuals.deaths;
            console.log("Total Deaths: " + totDeaths);
                // Empty array = []
                let arr = [];
                // Push population to array = [population]
                //let populationData = 
                arr.push(totPopulation);
                // Push vaccinations to array = [population, vaccinations]
                //let vaccineData = 
                if (totVaccinesAdministered ==! null) {
                    arr.push(totVaccinesAdministered);
                }
                else {
                    arr.push(totVaccinesCompleted);
                    }
                // Push cases to array = [population, vaccinations, cases]
                let casesData = 
                //arr.push(totCases);
                // Push deaths to array = [population, vaccinations, cases, deaths]
                //let deathsData = 
                arr.push(totDeaths);
                console.log(arr)

        })
}

/* YouTube video instructions - failed
const barChart = {
    chart: null,
    data: [
        ["Product", "Sales"],
        ["Laptops", 1708],
        ["Desktops", 1457],
        ["Cameras", 660],
        ["Phones", 1507],
        ["Accessories", 768]
    ],
    element: "#barchart",
    options: {
        title: "2019 Units Sold",
        width: 500,
        height: 300
    }
};

const init = () => {
    barChart.chart = new google.visualization.BarChart(
        document.querySelector(barChart.element)
    );
    barChart.chart.draw(
        google.visualization.arrayToDataTable(barChart.data),
        barChart.options
    );
};
    google.charts.load("current", {
        packages:["corechart"],
        callback: init
    });
*/

// Google Charts docs instructions:

// Load the Visualization API and the corechart package.
 google.charts.load('current', {
    'packages':
    ['corechart']
});

 // Set a callback to run when the Google Visualization API is loaded.
 google.charts.setOnLoadCallback(drawChart);

 // Callback that creates and populates a data table,
 // instantiates the pie chart, passes in the data and
 // draws it.
 function drawChart() {

   // Create the data table.
   var data = new google.visualization.DataTable();
   data.addColumn('string', 'Topping');
   data.addColumn('number', 'Slices');
   data.addRows([
     ['Mushrooms', 3],
     ['Onions', 1],
     ['Olives', 1],
     ['Zucchini', 1],
     ['Pepperoni', 2]
   ]);

   // Set chart options
   var options = {'title':'How Much Pizza I Ate Last Night',
                  'width':500,
                  'height':300};

   // Instantiate and draw our chart, passing in some options.
   var chart = new google.visualization.PieChart(document.getElementById('#bar-chart'));
   chart.draw(data, options);
 }