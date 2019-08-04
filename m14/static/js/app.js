
// from data.js
var UFO_sightings = data;

//get a reference to the table body
var tbody = d3.select("tbody");

// Create an array with the column names  - for table display
var columns = ["datetime","city","state","country","shape","durationMinutes","comments"]

function loadData() {
    data.forEach((UFO_sighting) => {
        var row = tbody.append("tr");
        Object.entries(UFO_sighting).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });

    })
}
// call the function to load the data 
loadData()

// Get a reference to the input element on the page with the id property 
var inputDate = d3.select("#datetime");
var inputCity = d3.select("#city");
var inputState = d3.select("#state");
var inputCountry = d3.select("#country");
var inputShape = d3.select("#shape");

// Get a reference to the filter button on the page with the id property set to `filter-btn`
var filterButton = d3.select("#filter-btn");

// Get a reference to the filter button on the page with the id property set to `filter-btn`
var resetButton = d3.select("#reset-btn");

// create a function for filtering the data with the given input
function filterData(){

    // Prevent the webpage from refreshing
    d3.event.preventDefault();

// Extract the given input for all the fields on the web page
var Datevalue = inputDate.property("value")
var Cityvalue = inputCity.property("value")
var Statevalue = inputState.property("value")
var Countryvalue = inputCountry.property("value")
var Shapevalue = inputShape.property("value")
 
     // Apply the conditions for filtering the data - has value or blank
     var filteredData = UFO_sightings.filter(function(input){
        return ((input.datetime === Datevalue || Datevalue == "" ) &&
                 (input.city === Cityvalue || Cityvalue == "") &&
                 (input.state === Statevalue || Statevalue == "")&&
                 (input.country === Countryvalue || Countryvalue == "")&&
                 (input.shape === Shapevalue || Shapevalue== "")
             )
     })
 
    //  // Print the filtered data to the console - tested and commented out
    // console.log(filteredData)
    
     // Empty the table to append with the filtered data 
     tbody.text("")
     // update the table with the filtered data     
     filteredData.forEach(UFO_sighting =>{
         var row = tbody.append("tr")
         columns.forEach(column => {
             if(column =="city" || column =="state" ||column == "country"){
                 row.append("td").text(UFO_sighting[column])
               }
               else row.append("td").text(UFO_sighting[column])    
         })
     })
 }
 // Add event handler for the click button to filter the table with the given input
 filterButton.on("click",filterData)
 
 // create a function for resetting the table 
 function resetData(){
     tbody.text("")
     loadData()
     }
     
 // Add event handler for the reset button to reset the table to original data 
 resetButton.on("click",resetData)   
    
 