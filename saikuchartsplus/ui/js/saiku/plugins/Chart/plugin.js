/*  
 *   Copyright 2012 OSBI Ltd
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

/**
 * Renders a chart for each workspace
 */
var Chart = Backbone.View.extend({
    initialize: function(args) {
        this.workspace = args.workspace;
        
        // Create a unique ID for use as the CSS selector
        this.id = _.uniqueId("chart_");
        $(this.el).attr({ id: this.id });
        
        // Bind table rendering to query result event
        _.bindAll(this, "render", "receive_data", "process_data", "show", 
            "setOptions");
        this.workspace.bind('query:result', this.receive_data);
        
        // Add chart button
        this.add_button();
        this.workspace.toolbar.chart = this.show;
        
        // Listen to adjust event and rerender chart
        this.workspace.bind('workspace:adjust', this.render);
        
        // Create navigation
        this.nav = $("<div class='chart-switcher'>" +
        		"<a href='#bar' class='i18n'>bar</a>" +
                "<a href='#stackedBar' class='i18n'>stacked bar</a>" +
        		"<a href='#line' class='i18n'>line</a>" +
        		"<a href='#pie' class='i18n'>pie</a>" +
                "<a href='#heatgrid' class='i18n'>heatgrid</a>" +               
        		"</div>").css({
        		    'padding-bottom': '10px'
        		});
        this.nav.find('a').css({ 
                    color: '#666', 
                    'margin-right': '5px', 
                    'text-decoration': 'none', 
                    'border': '1px solid #ccc', 
                    padding: '5px' 
                })
                .click(this.setOptions);
    
        // Append chart to workspace
        $(this.workspace.el).find('.workspace_results')
            .prepend($(this.el).hide())
            .prepend(this.nav.hide());
    },
    
    add_button: function() {
        var $chart_button = 
            $('<a href="#chart" class="chart button disabled_toolbar i18n" title="Toggle Chart"></a>')
            .css({  'background-image': "url('js/saiku/plugins/Chart/chart.png')",
                    'background-repeat':'no-repeat',
                    'background-position':'50% 50%'
                });

        var $chart_li = $('<li class="seperator"></li>').append($chart_button);
        $(this.workspace.toolbar.el).find("ul").append($chart_li);
    },
    
    show: function(event, ui) {
        $(this.workspace.el).find('.workspace_results table').toggle();
        $(this.el).toggle();
        $(this.nav).toggle();
        $(event.target).toggleClass('on');
        
        if ($(event.target).hasClass('on')) {
            this.render();
        }
    },
    
    setOptions: function(event) {
        var type = $(event.target).attr('href').replace('#', '');
        try {
            this[type]();
        } catch (e) { }
        
        return false;
    },
    
    stackedBar: function() {
        this.options.stacked = true;
        this.options.type = "BarChart";
        this.render();
    },
    
    bar: function() {
        this.options.stacked = false;
        this.options.type = "BarChart";
        this.render();
    },
    
    line: function() {
        this.options.stacked = false;
        this.options.type = "LineChart";
        this.render();
    },
    
    pie: function() {
        this.options.stacked = false;
        this.options.type = "PieChart";
        this.render();
    },

    heatgrid: function() {
        this.options.stacked = false;
        this.options.type = "HeatGridChart";
        this.render();
    },    

    render: function() {
        if (! $(this.workspace.toolbar.el).find('.chart').hasClass('on')) {
            return;
        }
        
        var options = _.extend({        
            canvas: this.id,
            width: $(this.workspace.el).find('.workspace_results').width() - 40,
            height: $(this.workspace.el).find('.workspace_results').height() - 40,
            yAxisSize: 70,
            orientation: 'vertical',
            stacked: false,
            animate: false,
            showValues: false,
            legend: true,
            legendPosition:"top",
            legendAlign: "right",
            colors: ["#B40010", "#CCC8B4", "#DDB965", "#72839D", "#1D2D40"],
            type: 'BarChart'
        }, this.options);
        
        if (options.type == "HeatGridChart") {
            options = _.extend({
                    canvas: this.id,
                    width: $(this.workspace.el).find('.workspace_results').width() - 40,
                    height: $(this.workspace.el).find('.workspace_results').height() - 40,
                    animate: false,
                    clickable: false,
                    orientation: "horizontal",
                    showValues: false,
                    showXScale: true,
                    xAxisPosition: "bottom",
                    showYScale: true,
                    panelSizeRatio: 0.8,
                    yAxisPosition: "left",
                    yAxisSize: 150,
                    minColor: "#FEDFE1",
                    maxColor: "#F11929",
                    extensionPoints: {
                        xAxisLabel_textAngle: -(Math.PI / 2),
                        xAxisLabel_textAlign: "right",
                        xAxisLabel_bottom: 10
                    }
            }, this.options);
        }
        if (this.data.resultset.length > 5 ) {
            options.extensionPoints = {
                xAxisLabel_textAngle: -(Math.PI / 2),
                xAxisLabel_textAlign: "right",
                xAxisLabel_bottom: 10
            };
            
            options.xAxisSize = 100;
        }
        
        this.chart = new pvc[options.type](options);
        
        this.chart.setData(this.data, {
            crosstabMode: true,
            seriesInRows: false
        });
        
        try {
            this.chart.render();
            Saiku.i18n.automatic_i18n();
        } catch (e) {
            $(this.el).text("Could not render chart");
        }

        /***********************/

        var metadata=new Array();
        //numero de colunas
        var colNumberY=this.data.metadata.length-1;//-1 devido a coluna 0 armazena o valor de X	
        var x=new Array();
		var y=new Array();
        for(var i=0; i < colNumberY; i++){
        	y[i]=new Array();		
        }
        
        
        if (this.data.resultset.length > 0 ) {
        	$.each(this.data.resultset, function(key, value) {
        		x[key]=value[0];
        		for(var i=0; i < colNumberY; i++){
        			y[i][key]=value[i+1];// +1 devido ao valor de x armazenado na coluna 0	
        		}	
					
			});
        }	
        
        var seriesData=[];
        for(var i=0; i < colNumberY; i++){
        	seriesData[i]={
                name: this.data.metadata[i+1].colName,
                data: y[i]
            	};		
        }	
		if(options.type=='BarChart'){
			chart = new Highcharts.Chart({
	            chart: {
	                renderTo: this.id,
	                type: 'bar',
	                zoomType: 'x,y',
	                marginRight: 130,
	                marginBottom: 25,
	                height: $(this.workspace.el).find('.workspace_results').height() - 40,
	                width: $(this.workspace.el).find('.workspace_results').width() - 40	
	            },
	            title: {
	                text: '',
	                x: -20 //center
	            },
	            subtitle: {
	                text: '',
	                x: -20
	            },
	            xAxis: {
	                categories: x
	            },
	            yAxis: {
	                title: {
	                    text: ''
	                },
	                plotLines: [{
	                    value: 0,
	                    width: 1,
	                    color: '#808080'
	                }]
	            },
	            tooltip: {
	                formatter: function() {
	                        return '<b>'+ this.series.name +'</b><br/>'+
	                        this.x +': '+ this.y +'';
	                }
	            },
	            legend: {
	                layout: 'vertical',
	                align: 'right',
	                verticalAlign: 'top',
	                x: -10,
	                y: 100,
	                borderWidth: 0
	            },
	            series: seriesData
	        });	
		}
		else if(options.type=='LineChart')
			{
			chart = new Highcharts.Chart({
	            chart: {
	                renderTo: this.id,
	                type: 'line',
	                zoomType: 'x,y',
	                marginRight: 130,
	                marginBottom: 25,
	                height: $(this.workspace.el).find('.workspace_results').height() - 40,
	                width: $(this.workspace.el).find('.workspace_results').width() - 40	
	            },
	            title: {
	                text: '',
	                x: -20 //center
	            },
	            subtitle: {
	                text: '',
	                x: -20
	            },
	            xAxis: {
	                categories: x
	            },
	            yAxis: {
	                title: {
	                    text: ''
	                },
	                plotLines: [{
	                    value: 0,
	                    width: 1,
	                    color: '#808080'
	                }]
	            },
	            tooltip: {
	                formatter: function() {
	                        return '<b>'+ this.series.name +'</b><br/>'+
	                        this.x +': '+ this.y +'';
	                }
	            },
	            legend: {
	                layout: 'vertical',
	                align: 'right',
	                verticalAlign: 'top',
	                x: -10,
	                y: 100,
	                borderWidth: 0
	            },
	            series: seriesData
	        });	
		}
			       
	    /***********************/

    },
    
    receive_data: function(args) {
        return _.delay(this.process_data, 0, args);
    },
    
    process_data: function(args) {
        this.data = {};
        this.data.resultset = [];
        this.data.metadata = [];
        this.data.height = 0;
        this.data.width = 0;
        
        if (args.data.cellset && args.data.cellset.length > 0) {
            
            var lowest_level = 0;
        
            for (var row = 0; row < args.data.cellset.length; row++) {
                if (args.data.cellset[row][0].type == "ROW_HEADER_HEADER") {
                    this.data.metadata = [];
                    for (var field = 0; field < args.data.cellset[row].length; field++) {
                        if (args.data.cellset[row][field].type == "ROW_HEADER_HEADER") {
                            this.data.metadata.shift();
                            lowest_level = field;
                        }
                        
                        this.data.metadata.push({
                            colIndex: field,
                            colType: typeof(args.data.cellset[row + 1][field].value) !== "number" &&
                                isNaN(args.data.cellset[row + 1][field].value
                                .replace(/[^a-zA-Z 0-9.]+/g,'')) ? "String" : "Numeric",
                            colName: args.data.cellset[row][field].value
                        });
                    }
                } else if (args.data.cellset[row][0].value !== "null" && args.data.cellset[row][0].value !== "") {
                    var record = [];
                    this.data.width = args.data.cellset[row].length;
                    for (var col = lowest_level; col < args.data.cellset[row].length; col++) {
                        var value = args.data.cellset[row][col].value;
                        // check if the resultset contains the raw value, if not try to parse the given value
                        if (args.data.cellset[row][col].properties.raw && args.data.cellset[row][col].properties.raw !== "null")
                        {
                            value = parseFloat(args.data.cellset[row][col].properties.raw);
                        } else if (typeof(args.data.cellset[row][col].value) !== "number" &&
                            parseFloat(args.data.cellset[row][col].value.replace(/[^a-zA-Z 0-9.]+/g,''))) 
                        {
                            value = parseFloat(args.data.cellset[row][col].value.replace(/[^a-zA-Z 0-9.]+/g,''));
                        }
                        if (col == lowest_level) {
                            value += " [" + row + "]";
                        }
                        record.push(value);
                    }
                    this.data.resultset.push(record);
                }
            }
            this.data.height = this.data.resultset.length;
            this.render();
        } else {
            $(this.el).text("No results");
        }
    }
});

/**
 * Loads CCC and initializes chart plugin
 */
(function() {
    // Initialize CCC
    $.ajax({
        url: "js/saiku/plugins/Chart/ccc.js",
        dataType: "script",
        cache: true,
        success: function() {

            var initPlugin = function(session) {
                function new_workspace(args) {
                    // Add chart element
                    if (typeof args.workspace.chart == "undefined") {
                        args.workspace.chart = new Chart({ workspace: args.workspace });
                    } 
                }

                function clear_workspace(args) {
                    if (typeof args.workspace.chart != "undefined") {
                        $(args.workspace.chart.nav).hide();
                        $(args.workspace.chart.el).hide();
                        $(args.workspace.chart.el).parents().find('.workspace_results table').show();
                    }
                }
                
                // Attach chart to existing tabs
                for(var i = 0; i < Saiku.tabs._tabs.length; i++) {
                    var tab = Saiku.tabs._tabs[i];
                    new_workspace({
                        workspace: tab.content
                    });
                };
                
                // Attach chart to future tabs
                session.bind("workspace:new", new_workspace);
                session.bind("workspace:clear", clear_workspace);
            };

            if (typeof Saiku.session == "undefined") {
                Saiku.events.bind('session:new', initPlugin);
            } else {
                initPlugin(Saiku.session);
            }
        }
    });
}());
