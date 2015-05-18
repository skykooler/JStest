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




// ******** UTILITY FUNCTIONS ********
// We try to use jQuery as little as possible because although it can
// be convenient to code, it is actually a very large library and it
// is very slow compared to raw/vanilla js.  These functions provide
// more terse equivalents to some verbose dom operations.

function gebi (s) {
    // Self-explanatory
    return document.getElementById(s);
}

function gebcn (s) {
    // Self-explanatory
    return document.getElementsByClassName(s);
}

function gebtn (s) {
    // SE
    return document.getElementByTagName(s);
}

function ngebcn(node, class_name){
    // This is if you have a dom node, and you want to get all the
    // children who are a member of class class_name
    return node.getElementsByClassName(class_name);
}

function ngebtn (n, s) {
    // Same as ngebcn but for TagName instead of ClassName
    return n.getElementByTagName(s);
}

function createHtml(m){
    // This is a very convenient method for inserting new html
    // structures into the DOM.  The syntax is actually shorter than
    // regular HTML.  Can't beat that.

    // The data structure you pass to this function is based on (aka shamelessly ripped off from) https://github.com/weavejester/hiccup/wiki/Syntax
    // If the clojure code confuses you, here are several JavaScript examples that show input => outpu:

    // ['h1', 'hello there'] => <h1>hello there</h1> ['h1', {class:
    // 'selected'}, 'I am selected'] => <h1 class="selected">I am
    // selected</h1> ['h1', {class:'selected', onclick:'foo()'},
    // 'Heyoooo', ['p', 'hello'], ['ul', ['li', 'hey there'], ['li',
    // {id:'second_li', class:'first_ul'}, 'content']]] => <h1
    // class="selected" onclick="foo()">Heyoooo<p>hello</p><ul><li>hey
    // there</li><li id="second_li"
    // class="first_ul">content</li></ul></h1>

    // Feel free to ask questions

    
    var toClass = {}.toString;
    var tagName = m[0];
    if (toClass.call(m[1]).match('Object')){
        var attrs = m[1],
            children = m.slice(2);

    }
    else{
        attrs = {},
        children = m.slice(1);
    }
    var el = document.createElement(tagName);
    for (var name in attrs) {
        var value = attrs[name];
        el.setAttribute(name, value);
    }
    children.forEach(function(child){
        if (!toClass.call(child).match('Array')){
            el.appendChild(document.createTextNode(child));
        }
        else{
            el.appendChild(createHtml(child));
        }
    });
    return el;
}

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


function init(){
    // Initial set up of DOM elements
    gebi('clearStartEnd').onclick = function(e){
        ['[name=start_date]', '[name=end_date]'].forEach(function (selector) {
            document.querySelector(selector).value = '';
        });
	};

	gebi('clearLatest').onclick = function(e){
        document.querySelector('[name=latest]').value = '';
	};
    
	var metrics = {
		'Rank':'rank',
		'Unique Visitors':'uv',
		'Page Views':'pv',
		'Average Stay':'avgstay',
		'Visits/Person':'vpp',
		'Pages/Visit':'ppv',
		'Attention':'att'
	};
	Object.keys(metrics).forEach(function(e){
        gebi('metric').appendChild(createHtml(['option', e]));
	});
    
    gebi('go').addEventListener('click', function (e) {
        
        
        // Here are some values that may prove necessary to complete this task:
        var met = metrics[gebi('metric').value],
		    domain = gebi('domain').value,
		    start_date = document.querySelector('[name=start_date]').value,
		    end_date = document.querySelector('[name=end_date]').value,
		    latest = document.querySelector('[name=latest]').value,
		    api_key = '27953e450d095eb57efe7d37187f0ae8';

        // That's it!  Now that we've covered everything, you can begin the test.
        // +++ TEST BEGINS +++ //
        
    });


}

window.onload = init;

