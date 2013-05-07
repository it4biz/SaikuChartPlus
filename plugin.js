/*  
 *   Copyright 2013 IT4biz IT Solutions Ltda
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
 * changed by it4biz.com.br
 */

/**
 * Renders a chart for each workspace
 */
var ChartPlus = Backbone.View.extend({
    initialize: function(args) {
        this.workspace = args.workspace;
        
        // Create a unique ID for use as the CSS selector
        this.id = _.uniqueId("chartPlus_");
        $(this.el).attr({ id: this.id });
        
        // Bind table rendering to query result event
        _.bindAll(this, "render", "receive_data", "process_data", "show", 
            "setOptions");
        this.workspace.bind('query:result', this.receive_data);
        
        // Add chart button
        this.add_button();
        this.workspace.toolbar.chartPlus = this.show;
        
        // Listen to adjust event and rerender chart
        this.workspace.bind('workspace:adjust', this.render);
        
        // Create navigation
        this.nav = $("<div class='bs-docs-example chart-switcher'>"+
					"<div style='margin: 0;' class='btn-toolbar'>"+
						"<div class='btn-group'>"+
							"<button data-toggle='dropdown' class='btn dropdown-toggle'>Bar <span class='caret'></span></button>"+
							"<ul class='dropdown-menu'>"+
								"<li><a href='#barPlus'>bar</a></li>"+
								"<li><a href='#stackedBarPlus'>stacked bar</a></li>"+
								"<li><a href='#columnPlus'>column bar</a></li>"+								
							"</ul>"+
						"</div><!-- /btn-group -->"+
						"<div class='btn-group'>"+
							"<button data-toggle='dropdown' class='btn dropdown-toggle'>Line <span class='caret'></span></button>"+
							"<ul class='dropdown-menu'>"+
								"<li><a href='#linePlus'>line</a></li>"+								
							"</ul>"+
						"</div><!-- /btn-group -->"+
						"<div class='btn-group'>"+
							"<button data-toggle='dropdown' class='btn dropdown-toggle'>Pie <span class='caret'></span></button>"+
							"<ul class='dropdown-menu'>"+
								"<li><a href='#piePlus'>pie</a></li>"+								
							"</ul>"+
						"</div><!-- /btn-group -->"+
						"<div class='btn-group'>"+
							"<button data-toggle='dropdown' class='btn dropdown-toggle'>Geo Map <span class='caret'></span></button>"+
							"<ul class='dropdown-menu'>"+
								"<li><a href='#mapPlus'>world map</a></li>"+
								"<li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' tabindex='-1'>Asia</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#BD'>	Bangladesh	</a></li>"+	
												"<li><a href='#BT'>	Bhutan	</a></li>"+	
												"<li><a href='#IO'>	British Indian Ocean Territory	</a></li>"+
												"<li><a href='#BN'>	Brunei Darussalam	</a></li>"+
												"<li><a href='#KH'>	Cambodia	</a></li>"+
												"<li><a href='#CN'>	China	</a></li>"+
												"<li><a href='#HK'>	Hong Kong	</a></li>"+
												"<li><a href='#IN'>	India	</a></li>"+
												"<li><a href='#ID'>	Indonesia	</a></li>"+
												"<li><a href='#JP'>	Japan	</a></li>"+
												"<li><a href='#KZ'>	Kazakhstan	</a></li>"+
												"<li><a href='#KP'>	North Korea	</a></li>"+
												"<li><a href='#KR'>	South Korea </a></li>"+
												"<li><a href='#KG'>	Kyrgyzstan	</a></li>"+
												"<li><a href='#LA'>	Lao	</a></li>"+
												"<li><a href='#MO'>	Macao	</a></li>"+	
												"<li><a href='#MY'>	Malaysia	</a></li>"+
												"<li><a href='#MV'>	Maldives	</a></li>"+
												"<li><a href='#MN'>	Mongolia	</a></li>"+
												"<li><a href='#MM'>	Myanmar	</a></li>"+
												"<li><a href='#NP'>	Nepal	</a></li>"+
												"<li><a href='#MP'>	Northern Mariana Islands	</a></li>"+
												"<li><a href='#PH'>	Philippines	</a></li>"+
												"<li><a href='#SG'>	Singapore	</a></li>"+
												"<li><a href='#LK'>	Sri Lanka	</a></li>"+
												"<li><a href='#TW'>	Taiwan </a></li>"+
												"<li><a href='#TJ'>	Tajikistan	</a></li>"+
												"<li><a href='#TH'>	Thailand	</a></li>"+
												"<li><a href='#TM'>	Turkmenistan	</a></li>"+
												"<li><a href='#UZ'>	Uzbekistan	</a></li>"+
												"<li><a href='#VN'>	Vietnam	</a></li>"+
											"</ul>"+
										"</li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' tabindex='-1'>Middle East, North Africa, and Greater Arabia</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#AF'>	Afghanistan	</a></li>"+ 
												"<li><a href='#DZ'>	Algeria	</a></li>"+
												"<li><a href='#AZ'>	Azerbaijan	</a></li>"+
												"<li><a href='#BH'>	Bahrain	</a></li>"+
												"<li><a href='#EG'>	Egypt	</a></li>"+
												"<li><a href='#GI'>	Gibraltar	</a></li>"+
												"<li><a href='#IR'>	Iran </a></li>"+
												"<li><a href='#IQ'>	Iraq	</a></li>"+
												"<li><a href='#IL'>	Israel	</a></li>"+
												"<li><a href='#JO'>	Jordan	</a></li>"+
												"<li><a href='#KW'>	Kuwait	</a></li>"+
												"<li><a href='#LB'>	Lebanon	</a></li>"+
												"<li><a href='#LY'>	Libya	</a></li>"+
												"<li><a href='#MA'>	Morocco	</a></li>"+
												"<li><a href='#OM'>	Oman	</a></li>"+
												"<li><a href='#PK'>	Pakistan	</a></li>"+
												"<li><a href='#PS'>	Palestine </a></li>"+ 
												"<li><a href='#QA'>	Qatar	</a></li>"+
												"<li><a href='#SA'>	Saudi Arabia	</a></li>"+
												"<li><a href='#SO'>	Somalia	</a></li>"+
												"<li><a href='#SY'>	Syrian </a></li>"+
												"<li><a href='#TN'>	Tunisia	</a></li>"+
												"<li><a href='#TR'>	Turkey	</a></li>"+
												"<li><a href='#AE'>	United Arab Emirates	</a></li>"+
												"<li><a href='#EH'>	Western Sahara	</a></li>"+
												"<li><a href='#YE'>	Yemen	</a></li>"+
											"</ul>"+
										"</li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' tabindex='-1'>Europe</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#AL'>	Albania	</a></li>"+	
												"<li><a href='#AD'>	Andorra	</a></li>"+
												"<li><a href='#AX'>	Åland Islands	</a></li>"+	
												"<li><a href='#AM'>	Armenia	</a></li>"+
												"<li><a href='#AT'>	Austria	</a></li>"+
												"<li><a href='#BY'>	Belarus	</a></li>"+
												"<li><a href='#BE'>	Belgium	</a></li>"+
												"<li><a href='#BA'>	Bosnia and Herzegovina	</a></li>"+
												"<li><a href='#BG'>	Bulgaria	</a></li>"+
												"<li><a href='#HR'>	Croatia	</a></li>"+
												"<li><a href='#CY'>	Cyprus	</a></li>"+
												"<li><a href='#CZ'>	Czech Republic	</a></li>"+
												"<li><a href='#DK'>	Denmark	</a></li>"+
												"<li><a href='#EE'>	Estonia	</a></li>"+
												"<li><a href='#FO'>	Faroe Islands	</a></li>"+ 
												"<li><a href='#FI'>	Finland	</a></li>"+
												"<li><a href='#FR'>	France	</a></li>"+
												"<li><a href='#GE'>	Georgia	</a></li>"+
												"<li><a href='#DE'>	Germany	</a></li>"+
												"<li><a href='#GR'>	Greece	</a></li>"+
												"<li><a href='#GG'>	Guernsey	</a></li>"+ 
												"<li><a href='#HU'>	Hungary	</a></li>"+												
												"<li><a href='#IS'>	Iceland	</a></li>"+
												"<li><a href='#IE'>	Ireland	</a></li>"+
												"<li><a href='#IM'>	Isle of Man	</a></li>"+
												"<li><a href='#IT'>	Italy	</a></li>"+
												"<li><a href='#JE'>	Jersey	</a></li>"+
												"<li><a href='#LV'>	Latvia	</a></li>"+
												"<li><a href='#LI'>	Liechtenstein	</a></li>"+
												"<li><a href='#LT'>	Lithuania	</a></li>"+
												"<li><a href='#LU'>	Luxembourg	</a></li>"+
												"<li><a href='#MK'>	Macedonia	</a></li>"+
												"<li><a href='#MT'>	Malta	</a></li>"+
												"<li><a href='#MD'>	Moldova	</a></li>"+
												"<li><a href='#MC'>	Monaco	</a></li>"+
												"<li><a href='#ME'>	Montenegro	</a></li>"+
												"<li><a href='#NL'>	Netherlands	</a></li>"+
												"<li><a href='#NO'>	Norway	</a></li>"+
												"<li><a href='#PL'>	Poland	</a></li>"+
												"<li><a href='#PT'>	Portugal	</a></li>"+
												"<li><a href='#RO'>	Romania	</a></li>"+
												"<li><a href='#RU'>	Russia </a></li>"+
												"<li><a href='#SM'>	San Marino	</a></li>"+
												"<li><a href='#RS'>	Serbia	</a></li>"+
												"<li><a href='#SK'>	Slovakia	</a></li>"+
												"<li><a href='#SI'>	Slovenia	</a></li>"+
												"<li><a href='#ES'>	Spain	</a></li>"+
												"<li><a href='#SJ'>	Svalbard and Jan Mayen	</a></li>"+ 
												"<li><a href='#SE'>	Sweden	</a></li>"+
												"<li><a href='#CH'>	Switzerland	</a></li>"+
												"<li><a href='#UA'>	Ukraine	</a></li>"+
												"<li><a href='#GB'>	United Kingdom	</a></li>"+
												"<li><a href='#VA'>	Vatican	</a></li>"+
											"</ul>"+
										"</li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' tabindex='-1'>North America</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#CA'>	Canada	</a></li>"+
												"<li><a href='#GL'>	Greenland	</a></li>"+
												"<li><a href='#MX'>	Mexico	</a></li>"+
												"<li><a href='#PM'>	Saint Pierre and Miquelon	</a></li>"+
												"<li><a href='#US'>	United States	</a></li>"+
											"</ul>"+
										"</li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' tabindex='-1'>Central America and the Caribbean</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#AG'>	Antigua and Barbuda	</a></li>"+	
												"<li><a href='#AW'>	Aruba	</a></li>"+	
												"<li><a href='#BS'>	Bahamas	</a></li>"+
												"<li><a href='#BB'>	Barbados	</a></li>"+
												"<li><a href='#BZ'>	Belize	</a></li>"+
												"<li><a href='#BM'>	Bermuda	</a></li>"+
												"<li><a href='#BQ'>	Bonaire, Sint Eustatius and Saba	</a></li>"+
												"<li><a href='#KY'>	Cayman Islands	</a></li>"+
												"<li><a href='#CR'>	Costa Rica	</a></li>"+
												"<li><a href='#CU'>	Cuba	</a></li>"+
												"<li><a href='#CW'>	Curaçao	</a></li>"+
												"<li><a href='#DM'>	Dominica	</a></li>"+
												"<li><a href='#DO'>	Dominican Republic	</a></li>"+
												"<li><a href='#SV'>	El Salvador	</a></li>"+
												"<li><a href='#GD'>	Grenada	</a></li>"+
												"<li><a href='#GP'>	Guadeloupe	</a></li>"+ 
												"<li><a href='#GT'>	Guatemala	</a></li>"+
												"<li><a href='#HT'>	Haiti	</a></li>"+
												"<li><a href='#HN'>	Honduras	</a></li>"+
												"<li><a href='#JM'>	Jamaica	</a></li>"+
												"<li><a href='#MQ'>	Martinique	</a></li>"+ 
												"<li><a href='#MS'>	Montserrat	</a></li>"+ 
												"<li><a href='#NI'>	Nicaragua	</a></li>"+
												"<li><a href='#PA'>	Panama	</a></li>"+
												"<li><a href='#PR'>	Puerto Rico	</a></li>"+ 
												"<li><a href='#BL'>	Saint Barthélemy	</a></li>"+ 
												"<li><a href='#KN'>	Saint Kitts and Nevis	</a></li>"+
												"<li><a href='#LC'>	Saint Lucia	</a></li>"+
												"<li><a href='#MF'>	Saint Martin (French part)	</a></li>"+
												"<li><a href='#VC'>	Saint Vincent and the Grenadines	</a></li>"+
												"<li><a href='#SX'>	Sint Maarten (Dutch part)	</a></li>"+ 
												"<li><a href='#TT'>	Trinidad and Tobago	</a></li>"+
												"<li><a href='#TC'>	Turks and Caicos Islands	</a></li>"+
												"<li><a href='#VG'>	Virgin Islands, British	</a></li>"+ 
												"<li><a href='#VI'>	Virgin Islands, U.S.	</a></li>"+ 
											"</ul>"+
										"</li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' tabindex='-1'>South America</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#AR'>	Argentina	</a></li>"+
												"<li><a href='#BO'>	Bolivia	</a></li>"+
												"<li><a href='#BR'>	Brazil	</a></li>"+
												"<li><a href='#CL'>	Chile	</a></li>"+
												"<li><a href='#CO'>	Colombia	</a></li>"+
												"<li><a href='#EC'>	Ecuador	</a></li>"+
												"<li><a href='#FK'>	Falkland Islands (Malvinas)	</a></li>"+
												"<li><a href='#GF'>	French Guiana	</a></li>"+ 
												"<li><a href='#GY'>	Guyana	</a></li>"+
												"<li><a href='#PY'>	Paraguay	</a></li>"+
												"<li><a href='#PE'>	Peru	</a></li>"+
												"<li><a href='#SR'>	Suriname	</a></li>"+
												"<li><a href='#UY'>	Uruguay	</a></li>"+
												"<li><a href='#VE'>	Venezuela </a></li>"+
											"</ul>"+
										"</li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' tabindex='-1'>Sub-Saharan Africa</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#AO'>	Angola	</a></li>"+
												"<li><a href='#BJ'>	Benin	</a></li>"+
												"<li><a href='#BW'>	Botswana	</a></li>"+
												"<li><a href='#BF'>	Burkina Faso	</a></li>"+
												"<li><a href='#BI'>	Burundi	</a></li>"+
												"<li><a href='#CM'>	Cameroon	</a></li>"+
												"<li><a href='#CV'>	Cape Verde	</a></li>"+
												"<li><a href='#CF'>	Central African Republic	</a></li>"+
												"<li><a href='#TD'>	Chad	</a></li>"+
												"<li><a href='#KM'>	Comoros	</a></li>"+
												"<li><a href='#CG'>	Congo	</a></li>"+
												"<li><a href='#CD'>	Congo, the Democratic Republic of the	</a></li>"+
												"<li><a href='#CI'>	Côte d'Ivoire	</a></li>"+
												"<li><a href='#DJ'>	Djibouti	</a></li>"+
												"<li><a href='#GQ'>	Equatorial Guinea	</a></li>"+
												"<li><a href='#ER'>	Eritrea	</a></li>"+
												"<li><a href='#ET'>	Ethiopia	</a></li>"+
												"<li><a href='#GA'>	Gabon	</a></li>"+
												"<li><a href='#GM'>	Gambia	</a></li>"+
												"<li><a href='#GH'>	Ghana	</a></li>"+
												"<li><a href='#GN'>	Guinea	</a></li>"+
												"<li><a href='#GW'>	Guinea-Bissau	</a></li>"+
												"<li><a href='#KE'>	Kenya	</a></li>"+
												"<li><a href='#LS'>	Lesotho	</a></li>"+
												"<li><a href='#LR'>	Liberia	</a></li>"+
												"<li><a href='#MG'>	Madagascar	</a></li>"+
												"<li><a href='#MW'>	Malawi	</a></li>"+
												"<li><a href='#ML'>	Mali	</a></li>"+
												"<li><a href='#MR'>	Mauritania	</a></li>"+
												"<li><a href='#MU'>	Mauritius	</a></li>"+
												"<li><a href='#YT'>	Mayotte	</a></li>"+
												"<li><a href='#MZ'>	Mozambique	</a></li>"+
												"<li><a href='#NA'>	Namibia	</a></li>"+
												"<li><a href='#NE'>	Niger	</a></li>"+
												"<li><a href='#NG'>	Nigeria	</a></li>"+
												"<li><a href='#RE'>	Réunion	</a></li>"+
												"<li><a href='#RW'>	Rwanda	</a></li>"+
												"<li><a href='#SH'>	Saint Helena, Ascension and Tristan da Cunha	</a></li>"+
												"<li><a href='#ST'>	Sao Tome and Principe	</a></li>"+
												"<li><a href='#SN'>	Senegal	</a></li>"+
												"<li><a href='#SC'>	Seychelles	</a></li>"+
												"<li><a href='#SL'>	Sierra Leone	</a></li>"+
												"<li><a href='#ZA'>	South Africa	</a></li>"+
												"<li><a href='#SS'>	South Sudan	</a></li>"+
												"<li><a href='#SD'>	Sudan	</a></li>"+
												"<li><a href='#SZ'>	Swaziland	</a></li>"+
												"<li><a href='#TZ'>	Tanzania </a></li>"+
												"<li><a href='#TG'>	Togo	</a></li>"+
												"<li><a href='#UG'>	Uganda	</a></li>"+
												"<li><a href='#ZM'>	Zambia	</a></li>"+
												"<li><a href='#ZW'>	Zimbabwe	</a></li>"+
											"</ul>"+
										"</li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' tabindex='-1'>Australia and Oceania</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#AI'>	Anguilla	</a></li>"+
												"<li><a href='#AS'>	American Samoa	</a></li>"+
												"<li><a href='#AU'>	Australia	</a></li>"+
												"<li><a href='#CX'>	Christmas Island	</a></li>"+ 
												"<li><a href='#CC'>	Cocos (Keeling) Islands	</a></li>"+		
												"<li><a href='#CK'>	Cook Islands	</a></li>"+ 										
												"<li><a href='#FJ'>	Fiji	</a></li>"+
												"<li><a href='#PF'>	French Polynesia	</a></li>"+ 
												"<li><a href='#GU'>	Guam	</a></li>"+ 
												"<li><a href='#KI'>	Kiribati	</a></li>"+
												"<li><a href='#MH'>	Marshall Islands	</a></li>"+
												"<li><a href='#FM'>	Micronesia	</a></li>"+
												"<li><a href='#NR'>	Nauru	</a></li>"+
												"<li><a href='#NC'>	New Caledonia	</a></li>"+ 
												"<li><a href='#NZ'>	New Zealand	</a></li>"+
												"<li><a href='#NU'>	Niue	</a></li>"+
												"<li><a href='#NF'>	Norfolk Island	</a></li>"+ 
												"<li><a href='#PW'>	Palau	</a></li>"+
												"<li><a href='#PG'>	Papua New Guinea	</a></li>"+
												"<li><a href='#PN'>	Pitcairn	</a></li>"+
												"<li><a href='#WS'>	Samoa	</a></li>"+
												"<li><a href='#SB'>	Solomon Islands	</a></li>"+
												"<li><a href='#TL'>	Timor-Leste	</a></li>"+
												"<li><a href='#TK'>	Tokelau	</a></li>"+ 
												"<li><a href='#TO'>	Tonga	</a></li>"+
												"<li><a href='#TV'>	Tuvalu	</a></li>"+
												"<li><a href='#UM'>	United States Minor Outlying Islands	</a></li>"+
												"<li><a href='#VU'>	Vanuatu	</a></li>"+
												"<li><a href='#WF'>	Wallis and Futuna	</a></li>"+ 
											"</ul>"+
										"</li>"+	
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
            $('<a href="#chartPlus" class="chartPlus button disabled_toolbar i18n" title="Saiku Chart Plus"></a>')
            .css({  'background-image': "url('js/saiku/plugins/SaikuChartPlus/chart.png')",
                    'background-repeat':'no-repeat',
                    'background-position':'20% 50%'
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
    
    barPlus: function() {
        this.options.stacked = false;
        this.options.type = "bar";
        this.options.serializeType = "highCharts";
        this.render();
    },
    
    stackedBarPlus: function() {
        this.options.stacked = true;
        this.options.type = "stackedBar";
        this.options.serializeType = "highCharts";
        this.render();
    },

    columnPlus: function() {
        this.options.stacked = true;
        this.options.type = "column";
        this.options.serializeType = "highCharts";
        this.render();
    },

    stackedColumnPlus: function() {
        this.options.stacked = true;
        this.options.type = "stackedColumn";
        this.options.serializeType = "highCharts";
        this.render();
    },

    linePlus: function() {
        this.options.stacked = false;
        this.options.type = "line";
        this.options.serializeType = "highCharts";
        this.render();
    },
    
    piePlus: function() {
        this.options.stacked = false;
        this.options.type = "pie";
        this.options.serializeType = "highCharts";
        this.render();
    },

    mapPlus: function() {
        this.options.type = "map";
        this.options.serializeType = "geoCharts";
        this.render();
    },
    BD: function() {
        this.options.type = "BD"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    BT: function() {
        this.options.type = "BT"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    IO: function() {
        this.options.type = "IO"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    BN: function() {
        this.options.type = "BN"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    KH: function() {
        this.options.type = "KH"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    CN: function() {
        this.options.type = "CN"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    HK: function() {
        this.options.type = "HK"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    IN: function() {
        this.options.type = "IN"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    JP: function() {
        this.options.type = "JP"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    KZ: function() {
        this.options.type = "KZ"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    KP: function() {
        this.options.type = "KP"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    KR: function() {
        this.options.type = "KR"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    KG: function() {
        this.options.type = "KG"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    LA: function() {
        this.options.type = "LA"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    MO: function() {
        this.options.type = "MO"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    MY: function() {
        this.options.type = "MY"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    MV: function() {
        this.options.type = "MV"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    MN: function() {
        this.options.type = "MN"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    MN: function() {
        this.options.type = "MN"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    NP: function() {
        this.options.type = "NP"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    MP: function() {
        this.options.type = "MP"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    PH: function() {
        this.options.type = "PH"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    SG: function() {
        this.options.type = "SG"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    LK: function() {
        this.options.type = "LK"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    TW: function() {
        this.options.type = "TW"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    TJ: function() {
        this.options.type = "TJ"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },    
    TH: function() {
        this.options.type = "TH"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    TM: function() {
        this.options.type = "TM"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    UZ: function() {
        this.options.type = "UZ"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    VN: function() {
        this.options.type = "VN"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    AF: function() {
        this.options.type = "AF"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    DZ: function() {
        this.options.type = "DZ"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    BH: function() {
        this.options.type = "BH"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    EG: function() {
        this.options.type = "EG"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    GI: function() {
        this.options.type = "GI"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    IR: function() {
        this.options.type = "IR"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    IQ: function() {
        this.options.type = "IQ"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    IL: function() {
        this.options.type = "IL"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    JO: function() {
        this.options.type = "JO"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    KW: function() {
        this.options.type = "KW"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    LB: function() {
        this.options.type = "LB"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    LY: function() {
        this.options.type = "LY"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    MA: function() {
        this.options.type = "MA"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    OM: function() {
        this.options.type = "OM"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    PK: function() {
        this.options.type = "PK"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    PS: function() {
        this.options.type = "PS"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    QA: function() {
        this.options.type = "QA"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    SA: function() {
        this.options.type = "SA"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    SO: function() {
        this.options.type = "SO"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    SY: function() {
        this.options.type = "SY"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    TN: function() {
        this.options.type = "TN"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    TR: function() {
        this.options.type = "TR"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    AE: function() {
        this.options.type = "AE"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    EH: function() {
        this.options.type = "EH"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    YE: function() {
        this.options.type = "YE"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    AL: function() {
        this.options.type = "AL"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    AD: function() {
        this.options.type = "AD"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    AX: function() {
        this.options.type = "AX"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    AM: function() {
        this.options.type = "AM"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    AT: function() {
        this.options.type = "AT"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    BY: function() {
        this.options.type = "BY"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    BE: function() {
        this.options.type = "BE"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    BA: function() {
        this.options.type = "BA"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    BG: function() {
        this.options.type = "BG"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    HR: function() {
        this.options.type = "HR"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    CY: function() {
        this.options.type = "CY"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    CZ: function() {
        this.options.type = "CZ"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    DK: function() {
        this.options.type = "DK"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    EE: function() {
        this.options.type = "EE"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    FO: function() {
        this.options.type = "FO"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    FI: function() {
        this.options.type = "FI"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },    
    FR: function() {
        this.options.type = "FR"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    GE: function() {
        this.options.type = "GE"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    DE: function() {
        this.options.type = "DE"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    GR: function() {
        this.options.type = "GR"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    GG: function() {
        this.options.type = "GG"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    HU: function() {
        this.options.type = "HU"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },  
    IS: function() {
        this.options.type = "IS"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },  
    IE: function() {
        this.options.type = "IE"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },  
    IM: function() {
        this.options.type = "IM"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },  
    IT: function() {
        this.options.type = "IT"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },  
    JE: function() {
        this.options.type = "JE"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },  
    LV: function() {
        this.options.type = "LV"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },  
    LI: function() {
        this.options.type = "LI"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },  
    LT: function() {
        this.options.type = "LT"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },  
    LU: function() {
        this.options.type = "LU"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },  
    MK: function() {
        this.options.type = "MK"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },  
    MT: function() {
        this.options.type = "MT"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },  
    MD: function() {
        this.options.type = "MD"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },  
    MC: function() {
        this.options.type = "MC"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },  
    ME: function() {
        this.options.type = "ME"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },  
    NL:function() {
        this.options.type = "NL"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },  
    NO: function() {
        this.options.type = "NO"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },  
    PL: function() {
        this.options.type = "PL"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },  
    PT: function() {
        this.options.type = "PT"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },  
    RO: function() {
        this.options.type = "RO"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    RU: function() {
        this.options.type = "RU"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    SM: function() {
        this.options.type = "SM"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    RS: function() {
        this.options.type = "RS"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    SK: function() {
        this.options.type = "SK"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    SI: function() {
        this.options.type = "SI"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    ES: function() {
        this.options.type = "ES"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    SJ: function() {
        this.options.type = "SJ"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    SE: function() {
        this.options.type = "SE"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    CH: function() {
        this.options.type = "CH"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    UA: function() {
        this.options.type = "UA"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    GB: function() {
        this.options.type = "GB"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    }, 
    VA: function() {
        this.options.type = "VA"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    GL: function() {
        this.options.type = "GL"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    MX: function() {
        this.options.type = "MX"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    PM: function() {
        this.options.type = "PM"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    US: function() {
        this.options.type = "US"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    AG: function() {
        this.options.type = "AG"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    AW: function() {
        this.options.type = "AW"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    BS: function() {
        this.options.type = "BS"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    BB: function() {
        this.options.type = "BB"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    BZ: function() {
        this.options.type = "BZ"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    BM: function() {
        this.options.type = "BM"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    BQ: function() {
        this.options.type = "BQ"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    KY: function() {
        this.options.type = "KY"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    CR: function() {
        this.options.type = "CR"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    CU: function() {
        this.options.type = "CU"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    CW: function() {
        this.options.type = "CW"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    DM: function() {
        this.options.type = "DM"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    DO: function() {
        this.options.type = "DO"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    SV: function() {
        this.options.type = "SV"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    GD: function() {
        this.options.type = "GD"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    GP: function() {
        this.options.type = "GP"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    GT: function() {
        this.options.type = "GT"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    HT: function() {
        this.options.type = "HT"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    HN: function() {
        this.options.type = "HN"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    JM: function() {
        this.options.type = "JM"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    MQ: function() {
        this.options.type = "MQ"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    MS: function() {
        this.options.type = "MS"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    NI: function() {
        this.options.type = "NI"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    PA: function() {
        this.options.type = "PA"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    PR: function() {
        this.options.type = "PR"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    BL: function() {
        this.options.type = "BL"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    KN: function() {
        this.options.type = "KN"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    LC: function() {
        this.options.type = "LC"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    MF: function() {
        this.options.type = "MF"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    VC: function() {
        this.options.type = "VC"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    SX: function() {
        this.options.type = "SX"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    TT: function() {
        this.options.type = "TT"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    TC: function() {
        this.options.type = "TC"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    VG: function() {
        this.options.type = "VG"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    VI: function() {
        this.options.type = "VI"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    AR: function() {
        this.options.type = "AR"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    BO: function() {
        this.options.type = "BO"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    BR: function() {
        this.options.type = "BR"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    CL: function() {
        this.options.type = "CL"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    CO: function() {
        this.options.type = "CO"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    EC: function() {
        this.options.type = "EC"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    FK: function() {
        this.options.type = "FK"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    GF: function() {
        this.options.type = "GF"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    Guyana: function() {
        this.options.type = "Guyana"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    PY: function() {
        this.options.type = "PY"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    PE: function() {
        this.options.type = "PE"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    SR: function() {
        this.options.type = "SR"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    UY: function() {
        this.options.type = "UY"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    VE: function() {
        this.options.type = "VE"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    AO: function() {
        this.options.type = "AO"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    BJ: function() {
        this.options.type = "BJ"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    BW: function() {
        this.options.type = "BW"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    BF: function() {
        this.options.type = "BF"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    BI: function() {
        this.options.type = "BI"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    CM: function() {
        this.options.type = "CM"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    CV: function() {
        this.options.type = "CV"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    CF: function() {
        this.options.type = "CF"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    TD: function() {
        this.options.type = "TD"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    KM: function() {
        this.options.type = "KM"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    CG: function() {
        this.options.type = "CG"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    CD: function() {
        this.options.type = "CD"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    CI: function() {
        this.options.type = "CI"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    DJ: function() {
        this.options.type = "DJ"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    GQ: function() {
        this.options.type = "GQ"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    ER: function() {
        this.options.type = "ER"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    ET: function() {
        this.options.type = "ET"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    GA: function() {
        this.options.type = "GA"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    GM: function() {
        this.options.type = "GM"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    GH: function() {
        this.options.type = "GH"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    GN: function() {
        this.options.type = "GN"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    GW: function() {
        this.options.type = "GW"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    KE: function() {
        this.options.type = "KE"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    LS: function() {
        this.options.type = "LS"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    LR: function() {
        this.options.type = "LR"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    MG: function() {
        this.options.type = "MG"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    MW: function() {
        this.options.type = "MW"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    ML: function() {
        this.options.type = "ML"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    MR: function() {
        this.options.type = "MR"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    MU: function() {
        this.options.type = "MU"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    YT: function() {
        this.options.type = "YT"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    MZ: function() {
        this.options.type = "MZ"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    NA: function() {
        this.options.type = "NA"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    NE: function() {
        this.options.type = "NE"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    NG: function() {
        this.options.type = "NG"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    RE: function() {
        this.options.type = "RE"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    RW: function() {
        this.options.type = "RW"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    SH: function() {
        this.options.type = "SH"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    ST: function() {
        this.options.type = "ST"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    SN: function() {
        this.options.type = "SN"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    SC: function() {
        this.options.type = "SC"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    SL: function() {
        this.options.type = "SL"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    ZA: function() {
        this.options.type = "ZA"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    SS: function() {
        this.options.type = "SS"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    SD: function() {
        this.options.type = "SD"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    SZ: function() {
        this.options.type = "SZ"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    TZ: function() {
        this.options.type = "TZ"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    TG: function() {
        this.options.type = "TG"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    UG: function() {
        this.options.type = "UG"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    ZM: function() {
        this.options.type = "ZM"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    ZW: function() {
        this.options.type = "ZW"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    AI: function() {
        this.options.type = "AI"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    AS: function() {
        this.options.type = "AS"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    AU: function() {
        this.options.type = "AU"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    CX: function() {
        this.options.type = "CX"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    CC: function() {
        this.options.type = "CC"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    CK: function() {
        this.options.type = "CK"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    FJ: function() {
        this.options.type = "FJ"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    PF: function() {
        this.options.type = "PF"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    GU: function() {
        this.options.type = "GU"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    KI: function() {
        this.options.type = "KI"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    MH: function() {
        this.options.type = "MH"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    FM: function() {
        this.options.type = "FM"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    NR: function() {
        this.options.type = "NR"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    NC: function() {
        this.options.type = "NC"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    NZ: function() {
        this.options.type = "NZ"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    NU: function() {
        this.options.type = "NU"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    NF: function() {
        this.options.type = "NF"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    PW: function() {
        this.options.type = "PW"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    PG: function() {
        this.options.type = "PG"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    PN: function() {
        this.options.type = "PN"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    WS: function() {
        this.options.type = "WS"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    SB: function() {
        this.options.type = "SB"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    TL: function() {
        this.options.type = "TL"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    TK: function() {
        this.options.type = "TK"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    TO: function() {
        this.options.type = "TO"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    TV: function() {
        this.options.type = "TV"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    UM: function() {
        this.options.type = "UM"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    VU: function() {
        this.options.type = "VU"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    WF: function() {
        this.options.type = "WF"; 
        this.options.serializeType = "geoCharts"; 
        this.render();
    },

   	render: function() {
        if (! $(this.workspace.toolbar.el).find('.chartPlus').hasClass('on')) {
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
        if(this.options.serializeType=='highCharts' && options.type!='pie'){
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
        }else{//serializeType=='geoCharts'
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
		            text: 'Saiku Chart Plus Plugin by IT4biz',
              		href: 'http://it4biz.github.com/SaikuChartPlus'
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
		            text: 'Saiku Chart Plus Plugin by IT4biz',
              		href: 'http://it4biz.github.com/SaikuChartPlus'
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
		           text: 'Saiku Chart Plus Plugin by IT4biz',
              		href: 'http://it4biz.github.com/SaikuChartPlus'
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
		            text: 'Saiku Chart Plus Plugin by IT4biz',
              		href: 'http://it4biz.github.com/SaikuChartPlus'
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
		            text: 'Saiku Chart Plus Plugin by IT4biz',
              		href: 'http://it4biz.github.com/SaikuChartPlus'
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
		        	text: 'Saiku Chart Plus Plugin by IT4biz',
              		href: 'http://it4biz.github.com/SaikuChartPlus'
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
			
        	
        	var data = google.visualization.arrayToDataTable(series);
        		
	        var options = {};

	        var chart = new google.visualization.GeoChart(document.getElementById(this.id));
	        chart.draw(data, options);

		}	
		else if(options.serializeType == 'geoCharts')
		{
			
        	var data = google.visualization.arrayToDataTable(series);
        		
	        var options = {
		    	region: options.type,
		        displayMode: 'markers',
		        colorAxis: {colors: ['green', 'blue']}
		    };

	        var chart = new google.visualization.GeoChart(document.getElementById(this.id));
	        chart.draw(data, options);

		}	       
		/*********End charts draw**************/
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
 * Start Plugin
 */ 
 Saiku.events.bind('session:new', function(session) {

	 	loadCSS('js/saiku/plugins/SaikuChartPlus/bootstrap/css/bootstrap.css');
		loadCSS('js/saiku/plugins/SaikuChartPlus/bootstrap/css/bootstrap-responsive.css');

		loadJS('js/saiku/plugins/SaikuChartPlus/bootstrap/js/bootstrap.min.js');
		loadJS('js/saiku/plugins/SaikuChartPlus/highcharts/highcharts.js');
		loadJS('js/saiku/plugins/SaikuChartPlus/highcharts/exporting.js');
        loadJS('js/saiku/plugins/SaikuChartPlus/google/ga.js');

        function new_workspace(args) {
        	// Add stats element
            if (typeof args.workspace.chartPlus == "undefined") {             	   	
            	args.workspace.chartPlus = new ChartPlus({ workspace: args.workspace });
            }
        }

        function clear_workspace(args) {
            if (typeof args.workspace.chartPlus != "undefined") {
            	$(args.workspace.chartPlus.nav).hide();
                $(args.workspace.chartPlus.el).parents().find('.workspace_results table').show();
                $(args.workspace.chartPlus.el).hide();
            }
        }

        
        // Attach stats to existing tabs
        for(var i = 0; i < Saiku.tabs._tabs.length; i++) {
            var tab = Saiku.tabs._tabs[i];
            new_workspace({
                workspace: tab.content
            });
        };

        // Attach stats to future tabs
        Saiku.session.bind("workspace:new", new_workspace);
        Saiku.session.bind("workspace:clear", clear_workspace);
    });
