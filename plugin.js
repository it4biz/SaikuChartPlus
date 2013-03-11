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
        this.nav = $("<div class='bs-docs-example chart-switcher'>"+
					"<div style='margin: 0;' class='btn-toolbar'>"+
						"<div class='btn-group'>"+
							"<button data-toggle='dropdown' class='btn dropdown-toggle'>Bar <span class='caret'></span></button>"+
							"<ul class='dropdown-menu'>"+
								"<li><a href='#bar'>bar</a></li>"+
								"<li><a href='#stackedBar'>stacked bar</a></li>"+
								"<li><a href='#column'>column bar</a></li>"+								
							"</ul>"+
						"</div><!-- /btn-group -->"+
						"<div class='btn-group'>"+
							"<button data-toggle='dropdown' class='btn dropdown-toggle'>Line <span class='caret'></span></button>"+
							"<ul class='dropdown-menu'>"+
								"<li><a href='#line'>line</a></li>"+								
							"</ul>"+
						"</div><!-- /btn-group -->"+
						"<div class='btn-group'>"+
							"<button data-toggle='dropdown' class='btn dropdown-toggle'>Pie <span class='caret'></span></button>"+
							"<ul class='dropdown-menu'>"+
								"<li><a href='#pie'>pie</a></li>"+								
							"</ul>"+
						"</div><!-- /btn-group -->"+
						"<div class='btn-group'>"+
							"<button data-toggle='dropdown' class='btn dropdown-toggle'>Geo Map <span class='caret'></span></button>"+
							"<ul class='dropdown-menu'>"+
								"<li><a href='#map'>world map</a></li>"+
								/*"<li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' tabindex='-1'>country map</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#AF'>	Afghanistan	</a></li>"+ 
												"<li><a href='#AX'>	Åland Islands	</a></li>"+
												"<li><a href='#AL'>	Albania	</a></li>"+
												"<li><a href='#DZ'>	Algeria	</a></li>"+
												"<li><a href='#AS'>	American Samoa	</a></li>"+
												"<li><a href='#AD'>	Andorra	</a></li>"+
												"<li><a href='#AO'>	Angola	</a></li>"+
												"<li><a href='#AI'>	Anguilla	</a></li>"+
												"<li><a href='#AQ'>	Antarctica	</a></li>"+
												"<li><a href='#AG'>	Antigua and Barbuda	</a></li>"+
												"<li><a href='#AR'>	Argentina	</a></li>"+
												"<li><a href='#AM'>	Armenia	</a></li>"+
												"<li><a href='#AW'>	Aruba	</a></li>"+
												"<li><a href='#AU'>	Australia	</a></li>"+
												"<li><a href='#AT'>	Austria	</a></li>"+
												"<li><a href='#AZ'>	Azerbaijan	</a></li>"+
												"<li><a href='#BS'>	Bahamas	</a></li>"+
												"<li><a href='#BH'>	Bahrain	</a></li>"+
												"<li><a href='#BD'>	Bangladesh	</a></li>"+
												"<li><a href='#BB'>	Barbados	</a></li>"+
												"<li><a href='#BY'>	Belarus	</a></li>"+
												"<li><a href='#BE'>	Belgium	</a></li>"+
												"<li><a href='#BZ'>	Belize	</a></li>"+
												"<li><a href='#BJ'>	Benin	</a></li>"+
												"<li><a href='#BM'>	Bermuda	</a></li>"+
												"<li><a href='#BT'>	Bhutan	</a></li>"+
												"<li><a href='#BO'>	Bolivia, Plurinational State of	</a></li>"+
												"<li><a href='#BQ'>	Bonaire, Sint Eustatius and Saba	</a></li>"+
												"<li><a href='#BA'>	Bosnia and Herzegovina	</a></li>"+
												"<li><a href='#BW'>	Botswana	</a></li>"+
												"<li><a href='#BV'>	Bouvet Island	</a></li>"+
												"<li><a href='#BR'>	Brazil	</a></li>"+
												"<li><a href='#IO'>	British Indian Ocean Territory	</a></li>"+
												"<li><a href='#BN'>	Brunei Darussalam	</a></li>"+
												"<li><a href='#BG'>	Bulgaria	</a></li>"+
												"<li><a href='#BF'>	Burkina Faso	</a></li>"+
												"<li><a href='#BI'>	Burundi	</a></li>"+
												"<li><a href='#KH'>	Cambodia	</a></li>"+
												"<li><a href='#CM'>	Cameroon	</a></li>"+
												"<li><a href='#CA'>	Canada	</a></li>"+
												"<li><a href='#CV'>	Cape Verde	</a></li>"+
												"<li><a href='#KY'>	Cayman Islands	</a></li>"+
												"<li><a href='#CF'>	Central African Republic	</a></li>"+
												"<li><a href='#TD'>	Chad	</a></li>"+
												"<li><a href='#CL'>	Chile	</a></li>"+
												"<li><a href='#CN'>	China	</a></li>"+
												"<li><a href='#CX'>	Christmas Island	</a></li>"+
												"<li><a href='#CC'>	Cocos (Keeling) Islands	</a></li>"+
												"<li><a href='#CO'>	Colombia	</a></li>"+
												"<li><a href='#KM'>	Comoros	</a></li>"+
												"<li><a href='#CG'>	Congo	</a></li>"+
												"<li><a href='#CD'>	Congo, the Democratic Republic of the	</a></li>"+
												"<li><a href='#CK'>	Cook Islands	</a></li>"+
												"<li><a href='#CR'>	Costa Rica	</a></li>"+
												"<li><a href='#CI'>	Côte d'Ivoire	</a></li>"+
												"<li><a href='#HR'>	Croatia	</a></li>"+
												"<li><a href='#CU'>	Cuba	</a></li>"+
												"<li><a href='#CW'>	Curaçao	</a></li>"+
												"<li><a href='#CY'>	Cyprus	</a></li>"+
												"<li><a href='#CZ'>	Czech Republic	</a></li>"+
												"<li><a href='#DK'>	Denmark	</a></li>"+
												"<li><a href='#DJ'>	Djibouti	</a></li>"+
												"<li><a href='#DM'>	Dominica	</a></li>"+
												"<li><a href='#DO'>	Dominican Republic	</a></li>"+
												"<li><a href='#EC'>	Ecuador	</a></li>"+
												"<li><a href='#EG'>	Egypt	</a></li>"+
												"<li><a href='#SV'>	El Salvador	</a></li>"+
												"<li><a href='#GQ'>	Equatorial Guinea	</a></li>"+
												"<li><a href='#ER'>	Eritrea	</a></li>"+
												"<li><a href='#EE'>	Estonia	</a></li>"+
												"<li><a href='#ET'>	Ethiopia	</a></li>"+
												"<li><a href='#FK'>	Falkland Islands (Malvinas)	</a></li>"+
												"<li><a href='#FO'>	Faroe Islands	</a></li>"+
												"<li><a href='#FJ'>	Fiji	</a></li>"+
												"<li><a href='#FI'>	Finland	</a></li>"+
												"<li><a href='#FR'>	France	</a></li>"+
												"<li><a href='#GF'>	French Guiana	</a></li>"+
												"<li><a href='#PF'>	French Polynesia	</a></li>"+
												"<li><a href='#TF'>	French Southern Territories	</a></li>"+
												"<li><a href='#GA'>	Gabon	</a></li>"+
												"<li><a href='#GM'>	Gambia	</a></li>"+
												"<li><a href='#GE'>	Georgia	</a></li>"+
												"<li><a href='#DE'>	Germany	</a></li>"+
												"<li><a href='#GH'>	Ghana	</a></li>"+
												"<li><a href='#GI'>	Gibraltar	</a></li>"+
												"<li><a href='#GR'>	Greece	</a></li>"+
												"<li><a href='#GL'>	Greenland	</a></li>"+
												"<li><a href='#GD'>	Grenada	</a></li>"+
												"<li><a href='#GP'>	Guadeloupe	</a></li>"+
												"<li><a href='#GU'>	Guam	</a></li>"+
												"<li><a href='#GT'>	Guatemala	</a></li>"+
												"<li><a href='#GG'>	Guernsey	</a></li>"+
												"<li><a href='#GN'>	Guinea	</a></li>"+
												"<li><a href='#GW'>	Guinea-Bissau	</a></li>"+
												"<li><a href='#GY'>	Guyana	</a></li>"+
												"<li><a href='#HT'>	Haiti	</a></li>"+
												"<li><a href='#HM'>	Heard Island and McDonald Islands	</a></li>"+
												"<li><a href='#VA'>	Holy See (Vatican City State)	</a></li>"+
												"<li><a href='#HN'>	Honduras	</a></li>"+
												"<li><a href='#HK'>	Hong Kong	</a></li>"+
												"<li><a href='#HU'>	Hungary	</a></li>"+
												"<li><a href='#IS'>	Iceland	</a></li>"+
												"<li><a href='#IN'>	India	</a></li>"+
												"<li><a href='#ID'>	Indonesia	</a></li>"+
												"<li><a href='#IR'>	Iran, Islamic Republic of	</a></li>"+
												"<li><a href='#IQ'>	Iraq	</a></li>"+
												"<li><a href='#IE'>	Ireland	</a></li>"+
												"<li><a href='#IM'>	Isle of Man	</a></li>"+
												"<li><a href='#IL'>	Israel	</a></li>"+
												"<li><a href='#IT'>	Italy	</a></li>"+
												"<li><a href='#JM'>	Jamaica	</a></li>"+
												"<li><a href='#JP'>	Japan	</a></li>"+
												"<li><a href='#JE'>	Jersey	</a></li>"+
												"<li><a href='#JO'>	Jordan	</a></li>"+
												"<li><a href='#KZ'>	Kazakhstan	</a></li>"+
												"<li><a href='#KE'>	Kenya	</a></li>"+
												"<li><a href='#KI'>	Kiribati	</a></li>"+
												"<li><a href='#KP'>	Korea, Democratic People's Republic of	</a></li>"+
												"<li><a href='#KR'>	Korea, Republic of	</a></li>"+
												"<li><a href='#KW'>	Kuwait	</a></li>"+
												"<li><a href='#KG'>	Kyrgyzstan	</a></li>"+
												"<li><a href='#LA'>	Lao People's Democratic Republic	</a></li>"+
												"<li><a href='#LV'>	Latvia	</a></li>"+
												"<li><a href='#LB'>	Lebanon	</a></li>"+
												"<li><a href='#LS'>	Lesotho	</a></li>"+
												"<li><a href='#LR'>	Liberia	</a></li>"+
												"<li><a href='#LY'>	Libya	</a></li>"+
												"<li><a href='#LI'>	Liechtenstein	</a></li>"+
												"<li><a href='#LT'>	Lithuania	</a></li>"+
												"<li><a href='#LU'>	Luxembourg	</a></li>"+
												"<li><a href='#MO'>	Macao	</a></li>"+
												"<li><a href='#MK'>	Macedonia, The Former Yugoslav Republic of	</a></li>"+
												"<li><a href='#MG'>	Madagascar	</a></li>"+
												"<li><a href='#MW'>	Malawi	</a></li>"+
												"<li><a href='#MY'>	Malaysia	</a></li>"+
												"<li><a href='#MV'>	Maldives	</a></li>"+
												"<li><a href='#ML'>	Mali	</a></li>"+
												"<li><a href='#MT'>	Malta	</a></li>"+
												"<li><a href='#MH'>	Marshall Islands	</a></li>"+
												"<li><a href='#MQ'>	Martinique	</a></li>"+
												"<li><a href='#MR'>	Mauritania	</a></li>"+
												"<li><a href='#MU'>	Mauritius	</a></li>"+
												"<li><a href='#YT'>	Mayotte	</a></li>"+
												"<li><a href='#MX'>	Mexico	</a></li>"+
												"<li><a href='#FM'>	Micronesia, Federated States of	</a></li>"+
												"<li><a href='#MD'>	Moldova, Republic of	</a></li>"+
												"<li><a href='#MC'>	Monaco	</a></li>"+
												"<li><a href='#MN'>	Mongolia	</a></li>"+
												"<li><a href='#ME'>	Montenegro	</a></li>"+
												"<li><a href='#MS'>	Montserrat	</a></li>"+
												"<li><a href='#MA'>	Morocco	</a></li>"+
												"<li><a href='#MZ'>	Mozambique	</a></li>"+
												"<li><a href='#MM'>	Myanmar	</a></li>"+
												"<li><a href='#NA'>	Namibia	</a></li>"+
												"<li><a href='#NR'>	Nauru	</a></li>"+
												"<li><a href='#NP'>	Nepal	</a></li>"+
												"<li><a href='#NL'>	Netherlands	</a></li>"+
												"<li><a href='#NC'>	New Caledonia	</a></li>"+
												"<li><a href='#NZ'>	New Zealand	</a></li>"+
												"<li><a href='#NI'>	Nicaragua	</a></li>"+
												"<li><a href='#NE'>	Niger	</a></li>"+
												"<li><a href='#NG'>	Nigeria	</a></li>"+
												"<li><a href='#NU'>	Niue	</a></li>"+
												"<li><a href='#NF'>	Norfolk Island	</a></li>"+
												"<li><a href='#MP'>	Northern Mariana Islands	</a></li>"+
												"<li><a href='#NO'>	Norway	</a></li>"+
												"<li><a href='#OM'>	Oman	</a></li>"+
												"<li><a href='#PK'>	Pakistan	</a></li>"+
												"<li><a href='#PW'>	Palau	</a></li>"+
												"<li><a href='#PS'>	Palestine, State of	</a></li>"+
												"<li><a href='#PA'>	Panama	</a></li>"+
												"<li><a href='#PG'>	Papua New Guinea	</a></li>"+
												"<li><a href='#PY'>	Paraguay	</a></li>"+
												"<li><a href='#PE'>	Peru	</a></li>"+
												"<li><a href='#PH'>	Philippines	</a></li>"+
												"<li><a href='#PN'>	Pitcairn	</a></li>"+
												"<li><a href='#PL'>	Poland	</a></li>"+
												"<li><a href='#PT'>	Portugal	</a></li>"+
												"<li><a href='#PR'>	Puerto Rico	</a></li>"+
												"<li><a href='#QA'>	Qatar	</a></li>"+
												"<li><a href='#RE'>	Réunion	</a></li>"+
												"<li><a href='#RO'>	Romania	</a></li>"+
												"<li><a href='#RU'>	Russian Federation	</a></li>"+
												"<li><a href='#RW'>	Rwanda	</a></li>"+
												"<li><a href='#BL'>	Saint Barthélemy	</a></li>"+
												"<li><a href='#SH'>	Saint Helena, Ascension and Tristan da Cunha	</a></li>"+
												"<li><a href='#KN'>	Saint Kitts and Nevis	</a></li>"+
												"<li><a href='#LC'>	Saint Lucia	</a></li>"+
												"<li><a href='#MF'>	Saint Martin (French part)	</a></li>"+
												"<li><a href='#PM'>	Saint Pierre and Miquelon	</a></li>"+
												"<li><a href='#VC'>	Saint Vincent and the Grenadines	</a></li>"+
												"<li><a href='#WS'>	Samoa	</a></li>"+
												"<li><a href='#SM'>	San Marino	</a></li>"+
												"<li><a href='#ST'>	Sao Tome and Principe	</a></li>"+
												"<li><a href='#SA'>	Saudi Arabia	</a></li>"+
												"<li><a href='#SN'>	Senegal	</a></li>"+
												"<li><a href='#RS'>	Serbia	</a></li>"+
												"<li><a href='#SC'>	Seychelles	</a></li>"+
												"<li><a href='#SL'>	Sierra Leone	</a></li>"+
												"<li><a href='#SG'>	Singapore	</a></li>"+
												"<li><a href='#SX'>	Sint Maarten (Dutch part)	</a></li>"+
												"<li><a href='#SK'>	Slovakia	</a></li>"+
												"<li><a href='#SI'>	Slovenia	</a></li>"+
												"<li><a href='#SB'>	Solomon Islands	</a></li>"+
												"<li><a href='#SO'>	Somalia	</a></li>"+
												"<li><a href='#ZA'>	South Africa	</a></li>"+
												"<li><a href='#GS'>	South Georgia and the South Sandwich Islands	</a></li>"+
												"<li><a href='#SS'>	South Sudan	</a></li>"+
												"<li><a href='#ES'>	Spain	</a></li>"+
												"<li><a href='#LK'>	Sri Lanka	</a></li>"+
												"<li><a href='#SD'>	Sudan	</a></li>"+
												"<li><a href='#SR'>	Suriname	</a></li>"+
												"<li><a href='#SJ'>	Svalbard and Jan Mayen	</a></li>"+
												"<li><a href='#SZ'>	Swaziland	</a></li>"+
												"<li><a href='#SE'>	Sweden	</a></li>"+
												"<li><a href='#CH'>	Switzerland	</a></li>"+
												"<li><a href='#SY'>	Syrian Arab Republic	</a></li>"+
												"<li><a href='#TW'>	Taiwan, Province of China	</a></li>"+
												"<li><a href='#TJ'>	Tajikistan	</a></li>"+
												"<li><a href='#TZ'>	Tanzania, United Republic of	</a></li>"+
												"<li><a href='#TH'>	Thailand	</a></li>"+
												"<li><a href='#TL'>	Timor-Leste	</a></li>"+
												"<li><a href='#TG'>	Togo	</a></li>"+
												"<li><a href='#TK'>	Tokelau	</a></li>"+
												"<li><a href='#TO'>	Tonga	</a></li>"+
												"<li><a href='#TT'>	Trinidad and Tobago	</a></li>"+
												"<li><a href='#TN'>	Tunisia	</a></li>"+
												"<li><a href='#TR'>	Turkey	</a></li>"+
												"<li><a href='#TM'>	Turkmenistan	</a></li>"+
												"<li><a href='#TC'>	Turks and Caicos Islands	</a></li>"+
												"<li><a href='#TV'>	Tuvalu	</a></li>"+
												"<li><a href='#UG'>	Uganda	</a></li>"+
												"<li><a href='#UA'>	Ukraine	</a></li>"+
												"<li><a href='#AE'>	United Arab Emirates	</a></li>"+
												"<li><a href='#GB'>	United Kingdom	</a></li>"+
												"<li><a href='#US'>	United States	</a></li>"+
												"<li><a href='#UM'>	United States Minor Outlying Islands	</a></li>"+
												"<li><a href='#UY'>	Uruguay	</a></li>"+
												"<li><a href='#UZ'>	Uzbekistan	</a></li>"+
												"<li><a href='#VU'>	Vanuatu	</a></li>"+
												"<li><a href='#VE'>	Venezuela, Bolivarian Republic of	</a></li>"+
												"<li><a href='#VN'>	Viet Nam	</a></li>"+
												"<li><a href='#VG'>	Virgin Islands, British	</a></li>"+
												"<li><a href='#VI'>	Virgin Islands, U.S.	</a></li>"+
												"<li><a href='#WF'>	Wallis and Futuna	</a></li>"+
												"<li><a href='#EH'>	Western Sahara	</a></li>"+
												"<li><a href='#YE'>	Yemen	</a></li>"+
												"<li><a href='#ZM'>	Zambia	</a></li>"+
												"<li><a href='#ZW'>	Zimbabwe	</a></li>"+
											"</ul>"+
										"</li>"+
								"</li>"+*/								
							"</ul>"+
						"</div><!-- /btn-group -->"+
					"</div><!-- /btn-toolbar -->"+
				"</div>");
        this.nav.find('a').click(this.setOptions);
    	
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
                    'background-position':'20% 40%'
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
    
    bar: function() {
        this.options.stacked = false;
        this.options.type = "bar";
        this.render();
    },
    
    stackedBar: function() {
        this.options.stacked = true;
        this.options.type = "stackedBar";
        this.render();
    },

    column: function() {
        this.options.stacked = true;
        this.options.type = "column";
        this.render();
    },

    stackedColumn: function() {
        this.options.stacked = true;
        this.options.type = "stackedColumn";
        this.render();
    },

    line: function() {
        this.options.stacked = false;
        this.options.type = "line";
        this.render();
    },
    
    pie: function() {
        this.options.stacked = false;
        this.options.type = "pie";
        this.render();
    },

    map: function() {
        this.options.stacked = false;
        this.options.type = "map";
        this.render();
    },

    US: function() {
        this.options.stacked = false;
        this.options.type = "US";
        this.render();
    },    

   	render: function() {
        if (! $(this.workspace.toolbar.el).find('.chart').hasClass('on')) {
            return;
        }
        
        //configurações default
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
            type: 'bar'
        }, this.options);
       
        //start serialization of data
        if(options.type!='pie' && options.type!='map' && options.type!='US'){
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
	        		var aux=value[0]+'';
	        		var find=" ["+(key+1)+"]";	
	        		value[0]=value[0].replace(find,'');
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
        }else if(options.type=='pie'){
        	var metadata=new Array();
	        //numero de colunas
	        var colNumber=this.data.metadata.length;
	        var seriesData=new Array();	        
			var series=new Array();
	        if (this.data.resultset.length > 0 ) {
	        	$.each(this.data.resultset, function(key, value) {
	        		series[key]=[value[0], value[1]];
				});
	        }	
	        
	        seriesData=[{
	                type: 'pie',
	                name: this.data.metadata[0].colName,
	                data: series                
            	}];	        
        }     
        //end serialization of data

        //start draw graphics
		if(options.type=='bar'){
			chart = new Highcharts.Chart({
	            chart: {
	                renderTo: this.id,
	                type: 'bar',
	                zoomType: 'x,y',
	                marginRight: 130,
	                marginBottom: 40,
	                height: $(this.workspace.el).find('.workspace_results').height() - 40,
	                width: $(this.workspace.el).find('.workspace_results').width() - 40	
	            },
	            title: {
	                text: '',
	                x: -20 //center
	            },
	            credits: {
		            text: 'IT4biz Chart plugin',
		            href: 'http://www.it4biz.com.br'
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
		else if(options.type=='stackedBar')
			{
			chart = new Highcharts.Chart({
	            chart: {
	                renderTo: this.id,
	                type: 'bar',
	                zoomType: 'x,y',
	                marginRight: 130,
	                marginBottom: 40,
	                height: $(this.workspace.el).find('.workspace_results').height() - 40,
	                width: $(this.workspace.el).find('.workspace_results').width() - 40	
	            },
	            title: {
	                text: '',
	                x: -20 //center
	            },
	            credits: {
		            text: 'IT4biz Chart plugin',
		            href: 'http://www.it4biz.com.br'
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
	            plotOptions: {
	                series: {
	                    stacking: 'normal'
	                }
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
		else if(options.type=='column')
			{
			chart = new Highcharts.Chart({
	            chart: {
	                renderTo: this.id,
	                type: 'column',
	                zoomType: 'x,y',
	                marginRight: 130,
	                marginBottom: 40,
	                height: $(this.workspace.el).find('.workspace_results').height() - 40,
	                width: $(this.workspace.el).find('.workspace_results').width() - 40	
	            },
	            credits: {
		            text: 'IT4biz Chart plugin',
		            href: 'http://www.it4biz.com.br'
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
		else if(options.type=='stackedColumn')
			{
			chart = new Highcharts.Chart({
	            chart: {
	                renderTo: this.id,
	                type: 'column',
	                zoomType: 'x,y',
	                marginRight: 130,
	                marginBottom: 40,
	                height: $(this.workspace.el).find('.workspace_results').height() - 40,
	                width: $(this.workspace.el).find('.workspace_results').width() - 40	
	            },
	            credits: {
		            text: 'IT4biz Chart plugin',
		            href: 'http://www.it4biz.com.br'
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
	            plotOptions: {
	                series: {
	                    stacking: 'normal'
	                }
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
		else if(options.type=='line')
			{
			chart = new Highcharts.Chart({
	            chart: {
	                renderTo: this.id,
	                type: 'line',
	                zoomType: 'x,y',
	                marginRight: 130,
	                marginBottom: 40,
	                height: $(this.workspace.el).find('.workspace_results').height() - 40,
	                width: $(this.workspace.el).find('.workspace_results').width() - 40	
	            },
	            credits: {
		            text: 'IT4biz Chart plugin',
		            href: 'http://www.it4biz.com.br'
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
		else if(options.type=='pie')
		{
			chart = new Highcharts.Chart({
	            chart: {
	                renderTo: this.id,
	                plotBackgroundColor: null,
	                plotBorderWidth: null,
	                plotShadow: false,
	                height: $(this.workspace.el).find('.workspace_results').height() - 40,
	                width: $(this.workspace.el).find('.workspace_results').width() - 40	
	            },
	            credits: {
		            text: 'IT4biz Chart plugin',
		            href: 'http://www.it4biz.com.br'
		        },
	            title: {
	                text: ''
	            },
	            tooltip: {
	        	    pointFormat: '{series.name}: <b>{point.percentage}%</b>',
	            	percentageDecimals: 1
	            },
	            plotOptions: {
	                pie: {
	                    allowPointSelect: true,
	                    cursor: 'pointer',
	                    dataLabels: {
	                        enabled: true,
	                        color: '#000000',
	                        connectorColor: '#000000',
	                        formatter: function() {
	                            return '<b>'+ this.point.name +'</b>: '+ this.percentage.toFixed(1) +' %';
	                        }
	                    }
	                }
	            },
	            series: seriesData
        	});
		}
		else if(options.type=='map')
		{
			var series=[];			
	        //nome das colunas
	        var column=[];
	        for(var i=0; i < this.data.metadata.length; i++)
	        	column[i]=this.data.metadata[i].colName;
        	series[0]=column;

        	if (this.data.resultset.length > 0 ) {        			
	        	$.each(this.data.resultset, function(key, value) {	        		
	        		var aux=value[0]+'';
	        		var find=" ["+(key+1)+"]";	
	        		value[0]=value[0].replace(find,'');	
	        		series[key+1]=value; // +1 devido ao nome das colunas	        		
				});
	        }	
        	
        	var data = google.visualization.arrayToDataTable(series);
        		
	        var options = {};

	        var chart = new google.visualization.GeoChart(document.getElementById(this.id));
	        chart.draw(data, options);

		}	
		else if(options.type=='US')
		{
			
			var series=[];			
	        //nome das colunas
	        var column=[];
	        for(var i=0; i < this.data.metadata.length; i++)
	        	column[i]=this.data.metadata[i].colName;
        	series[0]=column;

        	if (this.data.resultset.length > 0 ) {        			
	        	$.each(this.data.resultset, function(key, value) {	        		
	        		var aux=value[0]+'';
	        		var find=" ["+(key+1)+"]";	
	        		value[0]=value[0].replace(find,'');	
	        		series[key+1]=value; // +1 devido ao nome das colunas	        		
				});
	        }	
        	
        	var data = google.visualization.arrayToDataTable(series);
        		
	        var options = {
		    	region: 'US',
		        displayMode: 'markers',
		        colorAxis: {colors: ['green', 'blue']}
		    };

	        var chart = new google.visualization.GeoChart(document.getElementById(this.id));
	        chart.draw(data, options);

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

function loadCSS(file){
	
	var headID = document.getElementsByTagName("head")[0];         
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = file;
	cssNode.media = 'screen';
	headID.appendChild(cssNode);
}

function loadJS(file){
	
	var headID = document.getElementsByTagName("head")[0];         
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = file;
	headID.appendChild(newScript);
}


/**
 * Loads CCC and initializes chart plugin
 */
(function() {
  	loadCSS('js/saiku/plugins/Chart/bootstrap/css/bootstrap.css');
	loadCSS('js/saiku/plugins/Chart/bootstrap/css/bootstrap-responsive.css');

	loadJS('js/saiku/plugins/Chart/bootstrap/js/bootstrap.min.js');
	loadJS('js/saiku/plugins/Chart/highcharts/highcharts.js');
	loadJS('js/saiku/plugins/Chart/highcharts/exporting.js');
		
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
