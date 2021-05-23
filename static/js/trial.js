// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}



// 1. Create a variable to keep track of all the filters as an object.
var filters = {};
// console.log(filters)

//Step 2 is the event listener that will kick off UpdateFilters...

// 3. Use this function to update the filters. 
function updateFilters() {
  // console.log("into update filters func")

    // 4a. Save the element that was changed as a variable, using d3.select(this).
    //info on "this": https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
    //essentially: if value of this is not set by the call, it defaults to global object, the current browser window.
    
    let changedElement = d3.select(this);
    // console.log(changedElement.property("value"));

    // 4b. Save the value that was changed as a variable.
    let elementValue = changedElement.property("value");
    // console.log(elementValue);

    // 4c. Save the id of the filter that was changed as a variable...module says ATTRIBUTE....not changedElement.property("id")
    let filterID = changedElement.attr("id");
    // console.log(filterID);
  
    // 5. If a filter value was entered, add filterId & value to the filters list. If not, clear that filter from the filters object.

    if (elementValue) {
      filters[filterID] = elementValue;
    }
    else {
      delete filters[filterID];
    }

    console.log("a change:");
    console.log(filters);
    //return filters;

    // 6. Call function to apply all filters and rebuild the table
    //filterTable();
    filterTable(filters);
    //"unreachable code" because call came after "return", which ends the function
  }

//function filterTable() {
function filterTable(filters) {

  console.log("in filterTable func");
  let filteredData = tableData;
    Object.entries(filters).forEach(function([key, value]) {
      console.log(`Key: ${key}`);
      console.log(`value: ${value}`); 


      //filteredDataTest = filteredData.filter(entry => entry.key);
      //filteredDataTest = filteredData.filter(entry => entry.key = filter.key);
      //filteredDataTest = filteredData.filter(entry => entry.value = filter.value);
      //filteredDataTest = filteredData.filter(entry => entry.value = value);

      //this doesn't work: Ask tutur about why brackets are used here instead of dot notation. So confused!
      //filteredDataTest = filteredData.filter(entry => entry.key === value);

      filteredDataTest = filteredData.filter(entry => entry[key] === value);
            
      //how do you console log within an anonymous function?
            //console.log(`entry/key with bracket: ${entry[key]}`); 
           // console.log(`entry/key with dot: ${entry.key}`); 

      //const result = words.filter(word => word.length > 6);


      buildTable(filteredDataTest);
   
    })
};


//for testing
d3.selectAll("input").on("change", updateFilters);
buildTable(tableData);