// import the data from data.js
const tableData = data;
// Reference the HTML table using d3
var tbody= d3.select("tbody");
function buildTable(data){
    // First clear out any existing data
    tbody.html(" ");

    // Next, loop through each object in the data
    //and append a row and cells for each value in the row
    data.forEach((dataRow) => {
        // append a row to thr table body
        let row = tbody.append("tr");

        //Loop through each field in the dataRow and add
        //each value as a table cell (tD)
        Object.values(dataRow).forEach(val) => {
            let cell = row.append("td");
            cell.text(val);
            }   
         );
    });
}
// Add a new funtion for filters and button
function handleClick() {
    let date = d3.select("#datetime").property("value");
    let filteredData = tableData; 
    
    if (data) {
        filteredData = filteredData.filter(row=> row.datetime === date);       
    };

    buildTable(filteredData);
}

// Add button click
d3.selectAll("#filter-btn").on("click", handleClick);

// Build table
buildTable(tableData);

