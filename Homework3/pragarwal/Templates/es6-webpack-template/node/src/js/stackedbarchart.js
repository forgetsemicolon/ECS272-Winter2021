import * as d3 from "d3";
import csvPath from '../assets/data/TopArtistsDecadeNew.csv';


export async function drawStackedBarChart(){


    var margin = {top: 40, right: 20, bottom: 30, left: 50},
    width = 460 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#stackedbarchart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
// console.log(svg);
// Parse the Data
const data = await d3.csv(csvPath);

  // List of subgroups = header of the csv files = soil condition here
  var subgroups = data.columns.slice(1)

  var dataset = d3.stack()(["artist1", "artist2", "artist3", "artist4", "artist5"].map(function(d) {
            // var elem;
            return data.map(function(elem){
        // console.log(typeof(elem.topartist));
              if( d === elem.topartist){
                console.log(elem[testOption])
                return {x: elem.year , y: elem[testOption]}
            }
        }); 
    }));
    //console.log(dataset);
    // console.log(data)
  // List of groups = species here = value of the first column called group -> I show them on the X axis
  // var groups = d3.map(data, function(d){return(d.topartist)}).keys()


    //BUTTON:-------
    // List of groups (here I have one group per column)
    var allGroup = ["danceability", "energy", "liveness", "acousticness", "valence"];


    // add the options to the button
   var buttonVal = d3.select("#selectBarChartButton")
                        .selectAll('myOptions')
                        .data(allGroup)
                        .enter()
                        .append('option')
                        .text(function (d) { return d; }) // text showed in the menu
                        .attr("value", function (d) { return d; }) // corresponding value returned by the button
  // console.log(buttonVal);
    //BUTTON END----

var testOption = allGroup[0]
console.log("Testinggggg:  " + testOption)

  // Add X axis
    var x = d3.scaleBand()
                .domain([1920, 2020])
                .range([0, width])
                .padding([0.2])
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add Y axis
    var y = d3.scaleLinear()
                .domain([0, 1])
                .range([ height, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y));

  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
                .domain(subgroups)
                .range(['#fcd471','#fbafa1','#fb84ce', '#ef54f1', '#c4fa70'])

  // //stack the data? --> stack per subgroup
  // var stackedData = d3.stack()
  //   .keys(subgroups)
  //   (data)

  // Show the bars
//   svg.append("g")
//     .selectAll("g")
//     // Enter in the stack data = loop key per key = group per group
//     .data(stackedData)
//     .enter().append("g")
//       .attr("fill", function(d) { return color(d.key); })
//       .selectAll("rect")
//       // enter a second time = loop subgroup per subgroup to add all rectangles
//       .data(function(d) { return d; })
//       .enter().append("rect")
//         .attr("x", function(d) { return x(d.data.topartist); })
//         .attr("y", function(d) { return y(d[1]); })
//         .attr("height", function(d) { return y(d[0]) - y(d[1]); })
//         .attr("width",x.bandwidth())






//     var margin = {top: 20, right: 160, bottom: 35, left: 30};

//     var width = 600 - margin.left - margin.right,
//         height = 300 - margin.top - margin.bottom;

//     var svg = d3.select("#stackedbarchart")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     const data = await d3.csv(csvPath);

//     // Transpose the data into layers
//     var dataset = d3.stack()(["artist1", "artist2", "artist3", "artist4"].map(function(artist) {
//         return data.map(function(d) {
//         return {x: (d.year), y: +d[artist]};
//         });
//     }));

//     // Set x, y and colors
//     var x = d3.scaleLinear()
//     .domain([1920, 2020])
//     .range([0, width]);
//     svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x).tickSizeOuter(0));

//     var y = d3.scaleLinear()
//     .domain([0, 1])
//     .range([height, 0]);
//     svg.append("g")
//     .call(d3.axisLeft(y));

//     var colors = ["b33040", "#d25c4d", "#f2b447", "#d9d574", "#000000"];

//     // Define and draw axes
//     // var yAxis = d3.svg.axis()
//     // .scale(y)
//     // .orient("left")
//     // .ticks(5)
//     // .tickSize(-width, 0, 0)
//     // .tickFormat( function(d) { return d } );
//     // svg.append("g")
//     // .call(d3.axisLeft(yAxis));

//     // var xAxis = d3.svg.axis()
//     // .scale(x)
//     // .orient("bottom")
//     // .tickFormat(d3.time.format("%Y"));
//     // svg.append("g")
//     // .attr("transform", "translate(0," + height + ")")
//     // .call(d3.axisBottom(xAxis).tickSizeOuter(0));

    // Create groups for each series, rects for each segment 
    var colors = ["b33040", "#d25c4d", "#f2b447", "#d9d574"];
    //console.log("g."+String(testOption))
    var groups = svg.selectAll("g."+String(testOption))
                    .data(dataset)
                    .enter()
                    .append("g")
                    .attr("class", String(testOption))
                    .style("fill", function(d, i) { return colors[i]; });


    var rect = groups.selectAll("rect")
                    .data(function(d) { return d; })
                    .enter()
                    .append("rect")
                    .attr("x", function(d) { return x(d.x); })
                    .attr("y", function(d) { return y(d.y0 + d.y); })
                    .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
                    .attr("width", x.domain());
    svg.append(rect);
                    //.on("mouseover", function() { tooltip.style("display", null); })
                    //.on("mouseout", function() { tooltip.style("display", "none"); })
//                     .on("mousemove", function(d) {
//                         var xPosition = d3.mouse(this)[0] - 15;
//                         var yPosition = d3.mouse(this)[1] - 25;
//                         tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
//                         tooltip.select("text").text(d.y);
  // })
  

// return svg.node();



}