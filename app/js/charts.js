/**
 * Created by annatina_vinzens on 02/11/16.
 */

var path = require('path');
var chart_data = [];
var timeframe;
var time;

function Chart() {}

Chart.init = function(){
    Chart.dataRenderer();
    Chart.drawChart();
};

Chart.drawChart = function (){
    jQuery.jqplot ('productivity_box', [chart_data],
        {
            seriesDefaults: {
                // Make this a pie chart.
                renderer: jQuery.jqplot.PieRenderer,
                rendererOptions: {
                    // Put data labels on the pie slices.
                    // By default, labels show the percentage of the slice.
                    showDataLabels: true
                }
            },
            legend: { show:true, location: 'e' }
        }
    );
}

Chart.dataRenderer = function () {
    timeframe = '14:00';
    time = 14;

    console.log("rescue time");

    console.log(rescueTime_data_complex.length);

    chart_data = [];

    $.each(rescueTime_data_complex, function (i) {
        console.log("test");
        console.log(i.time)

        if (i.time === timeframe) {
            chart_data.push(
                i.activity,
                i.value
            )
        }
    });

    console.log("chart data");
    console.log(chart_data);

/*    var unlogged = (3600-rescueTime_data_simple[time])/36
    chart_data.push(
        'Unlogged',
        unlogged
    )*/
}

