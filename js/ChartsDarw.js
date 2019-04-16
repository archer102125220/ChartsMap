const ChartsDarw = (text, data, color, name) => {
    Highcharts.chart('bar', {
        chart: {
            type: 'column'
        },
        title: {
            text
        },
        /*
        subtitle: {
            text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
        },*/
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        legend: {
            enabled: false
        },
        /*
        tooltip: {
            pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
        },*/
        series: [{
            name,
            data,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}%', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }],
        exporting: { enabled: false }
    });


    data = data.map((value) => {
        return {
            ...value,
            'color': ((color.find((cl) => value.name === cl[0]) == undefined) ?
                '' :
                color.find((cl) => value.name === cl[0])[3])
        }
    });

    // Build the chart
    Highcharts.chart('pie', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    /*style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        //,fontSize:'11px' 
                    },*/
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            name,
            data
        }],
        exporting: { enabled: false }
    });
}