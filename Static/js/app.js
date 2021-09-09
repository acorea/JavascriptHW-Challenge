// Step 1: Plotly
// Use the D3 library to read in samples.json.
const samples = "https://raw.githubusercontent.com/acorea/JavascriptHW-Challenge/main/Static/data/samples.json"

var samples = ['a'];
var metadata = [];
// Fetch the JSON data and console log it
d3.json(samples_json).then(function(data) {
  samples = data.samples;
  metadata = data.metadata;
  console.log(data)
  init();
});

//Update dropdown
function init() {
    plotGraphsAndMetadata(samples[0], metadata[0]);
    dropdown = d3.select('#selDataset');
    samples.forEach((value, i) =>
        dropdown.append('option').attr('value',i).text(value.id)
    )
  }

d3.selectAll("#selDataset").on("change", getData);

//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//Use `sample_values` as the values for the bar chart.
//Use `otu_ids` as the labels for the bar chart.
//Use `otu_labels` as the hovertext for the chart.

function plotGraphsAndMetadata(sample, meta_sample) {

    var bar_data = [{
        x: sample.sample_values.slice(0,10),
        y: sample.otu_ids.slice(0,10).reverse().map(x => 'OTU '+x),
        text: sample.otu_labels.slice(0,10),
        type: 'bar',
        orientation: 'h'
    }];
    
    var bar_layout = {
        //   height: 600,
        //   width: 800
    };

    Plotly.newPlot('bar', bar_data, bar_layout);
  
//Create a bubble chart that displays each sample.
//Use `otu_ids` for the x values.
//Use `sample_values` for the y values.
//Use `sample_values` for the marker size.
//Use `otu_ids` for the marker colors.
//Use `otu_labels` for the text values.

    var bub_data = [{
          y: sample.sample_values,
          x: sample.otu_ids,
          text: sample.otu_labels,
          mode: 'markers',
          marker: {
              colorscale: 'Jet',
              color: sample.otu_ids,
              opacity: 0.9,
              size: sample.sample_values
          }
    }];

    var bub_layout = {
        //   height: 600,
        //   width: 800
    };

    Plotly.newPlot('bubble', bub_data, bub_layout);
  
    sample_metadata = d3.select('#sample-metadata');
    sample_metadata.selectAll('p').remove();
    for(key in meta_sample)
          sample_metadata.append('p').text(`${key}:${meta_sample[key]}`);
}

function getData() {
    var dropdownMenu = d3.select("#selDataset");
    var i = dropdownMenu.property("value");
    
    plotGraphsAndMetadata(samples[i], metadata[i])
};
init();