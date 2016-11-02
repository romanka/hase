/**
 * Created by annatina_vinzens on 02/11/16.
 */

var path = require('path');
var chart_data = [];
var timeframe;
var time;
var test_data = [['bla', 30, ], ['blubb', 30], ['hmmh', 10], ['haha', 30]];

function Chart() {}

Chart.init = function(){
    Chart.dataRenderer();
    Chart.drawChart();
};

Chart.drawChart = function (){
    $.jqplot ('productivity_box', [test_data],
        {
            seriesDefaults: {
                // Make this a pie chart.
                renderer: $.jqplot.PieRenderer,
                rendererOptions: {
                    // Put data labels on the pie slices.
                    // By default, labels show the percentage of the slice.
                    showDataLabels: true,
                }
            },
            legend: { show:false, location: 'e' },
            grid: {background: '#FEFCE8', drawBorder: false, shadow: false}
        }
    );
}

Chart.dataRenderer = function () {

    timeframe = '14:00';
    time = 14;


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

