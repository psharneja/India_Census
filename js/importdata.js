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
            "width" : width + margin.right + margin.left + 100,
            "height" : height + margin.top + margin.bottom
        })
        .append("g")
        .attr("transform", "translate(" + (margin.left+50) + ',' + margin.right + ')');


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



d3.json("output_files/age_wise_data.json", function(error, data){
    if(error) console.log("Error: data not loaded");
    console.log(data);
    
    data.sort(function(a,b){
        return b._all - a._all;
    })
    
    xScale.domain(data.map(function(d) { return d._age; }) );
    yScale.domain([0, d3.max(data, function(d){ return d._all; }) ] );
    
    
    svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr("height", 0)
    .attr("y", height)
    .transition().duration(3000)
    .delay(function(d,i){ return i* 200;})
    .attr ({
        'x': function(d){ return xScale(d._age);},
        'y': function(d){ return yScale(d._all);},
        "width": xScale.rangeBand(),
        "height": function(d){ return height - yScale(d._all);}
        
    })
    .style("fill", function(d,i) { return 'rgb(59,89,' + (( i * 30) + 90) +')'});
    
    //draw  the xAxis
    svg.append("g")
        .attr("class","x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-60)")
        .attr("dx", "-15")
        .attr("dy", "11")
        .style("text-anchor", "end")
        .style("font-size", "14px");
    
     svg.selectAll("text")
        .data(data)
        .enter()
        .append('text')
        
        .text(function(d) {return d._all;})
        .attr('x', function(d){ return xScale(d._age) + xScale.rangeBand()/2; })
        .attr('y', function(d){ return yScale(d._all) + 22; })
        .attr("transform", "rotate(-90)")
        .style("fill", "white")
        .style("text-anchor", "middle");
    
    
    svg.append("g")
        .attr("class","y axis")
        .call(yAxis)
        .selectAll("text")
        .style("font-size", "10px");
    
    
    // label the bars
   
    
    
    
})
