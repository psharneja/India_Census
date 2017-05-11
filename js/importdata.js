/*function importData (){
    d3.json("../output_files/age_wise_data.json", function (data){
        var canvas = d3.select(".import-data").append("svg").attr("width", 1000).attr("height", 700);
        
        canvas.selectAll("rect")
        .data(data).enter().append("rect").attr("height", function(d){
            return d._all;
        })
        .attr("width", 50).attr("x", function (d, i){
            return i * 80;
        }).attr("fill", "red");
        
        canvas.selectAll("text").data(data).enter().append("text").attr("fill","#fff").attr("y", function(d, i){
            return i * 80 + 25;
        }).attr("x", 5).text(function(d){
            return d._all + " all: " + d._all;
        })
    })
}*/


    
var margin = { top: 20, right: 10, bottom: 100, left: 40},
    width = 700 - margin.right - margin.left, 
    height = 500 - margin.top - margin.bottom;


var svg = d3.select('body')
        .append('svg')
        .attr({
            "width" : width + margin.right + margin.left,
            "height" : height + margin.top + margin.bottom
        })
        .append("g")
        .attr("transform", "translate(" + margin.left + ',' + margin.right + ')');


var xScale = d3.scale.ordinal()
            .rangeRoundBands([0,width], 0.2, 0.2);


var yScale = d3.scale.linear()
            .range([height, 0]);



var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");


var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");



d3.json("../output_files/age_wise_Data.json", function(error, data){
    if(error) console.log("Error: data not loaded");
    console.log(data);
    
    xScale.domain(data.map(function(d) { return d._age; }) );
    yScale.domain([0, d3.max(data, function(d){ return d._all; }) ] );
    
    
    svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr ({
        'x': function(d){ return xScale(d._age);},
        'y': function(d){ return yScale(d._all);},
        "width": xScale.rangeBand(),
        "height": function(d){ return height - yScale(d._all);}
        
    });
    
    
    
    

    
    
    
})
