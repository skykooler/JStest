// This is the JavaScript test.  In this test, you will pull website
// performance data from the Compete.com API and use it to display a
// graph with the charting library, Highcharts.  This test attempts to
// measure a few things.  We want to assess your ability to read
// documentation that may include erroneous material, in spite of
// which you will produce a clean-coded, functional application.  On a
// related note, this test will also draw attention to how cleanly you
// can integrate and unfamiliar, third party API on limited time.
// This test will require that you demonstrate your understanding (or
// lack thereof muah ha ha) of HTTP, JavaScript, the DOM, and just how
// the different components of a dynamic web application fit together
// to produce what they do

// Here is the documentation on the compete api: https://developer.compete.com/documentation/
// Jump to the very bottom.  Read the section about JSONP carefully because that is how you will request data from Compete.

function makeChart (data, metricName, metricCode, domain) {
    // This function is used to create the Highcharts graph with the
    // data you retrieve from Compete.  `data` is just the data from
    // the server metricName is a key in the variable `metrics` in
    // init.  metricCode is the corresponding value to metricName
    // domain is the domain we are investigating.  Don't worry about
    // trying to understand this function.  Just give it the right
    // inputs and it will give you the right outputs
    function getUTC(datestring){
		return Date.UTC(datestring.substring(0,4), datestring.substring(4)-1);
	}
    var met = data.data.trends[metricCode];
	console.log(met);
	var firstdate = met[0].date;
	var year = parseInt(firstdate.substring(0,4));
	var month = parseInt(firstdate.substring(4));
    new Highcharts.Chart({
		chart:{
            renderTo:'container',
            type:'area',
			zoomType:'x',
            resetZoomButton: {
                position: {
                    x: 0,
                    y: -24
                }
            },
            borderRadius: 0,
            backgroundColor: 'rgba(255, 255, 255, 0)',
            spacingTop: 10,
            spacingBottom: 5,
            spacingRight: 5,
            spacingLeft: 5
		},
		title:{
			text:metricName + ' at ' + domain,
            style: {
                color: 'rgba(2, 50, 71, .9)',
                fontSize: '24px',
                fontFamily: '\'Montserrat\''
            }
		},
        legend: {
            verticalAlign:"top",
            y:30,
            backgroundColor: 'rgba(196, 195, 195, .03)',
            borderColor: 'rgba(249, 174, 57, .3)'
        },
        tooltip: {
            shared: true,
            crosshairs: true,
        },
        credits: {
            enabled: false
        },
		xAxis:{
			type:'datetime',
			minRange:14*24*3600000,
            lineWidth: 1,
            labels: {
                style: {
                    color: 'rgba(2, 50, 71, .85)',
                    fontSize: '11px',
                    fontFamily: 'Montserrat'
                }
            }
		},
		yAxis:{
			title:{
				text:metricName
			}
		},
        plotOptions: {
            area: {
                marker: {
                    enabled: false
                },
                lineWidth: 1,
                lineColor: 'rgba(2, 50, 71, .75)',
                shadow: false,
                states: {
                    hover: {
                        enabled: false
                    }
                },
                stacking:'normal'
            },
            spline: {
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            lineWidth: 5
                        }
                    }
                },
                lineWidth: 2,
                states: {
                    hover: {
                        enabled: false
                    }
                }
            }
        },
		series:[{
			type:'area',
			name:metricName,
			pointInterval:30*24*3600*1000,
			pointStart: Date.UTC(year, month-1),
			data:met.map(function(e){return [getUTC(e.date), parseFloat(e.value)];})
		}]
	});
}

