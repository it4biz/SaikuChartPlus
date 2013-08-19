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
        this.nav = $("<div id='message'></div>"+
        			"<div class='bs-docs-example chart-switcher'>"+        			
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
							"<button data-toggle='dropdown' class='btn dropdown-toggle'>Geo Chart <span class='caret'></span></button>"+
							"<ul class='dropdown-menu'>"+
								"<li><a href='#geoChart' id='world'>world map</a></li>"+
								"<li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' id='' tabindex='-1'>Asia</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#geoChart' id='BD'>	Bangladesh	</a></li>"+	
												"<li><a href='#geoChart' id='BT'>	Bhutan	</a></li>"+	
												"<li><a href='#geoChart' id='IO'>	British Indian Ocean Territory	</a></li>"+
												"<li><a href='#geoChart' id='BN'>	Brunei Darussalam	</a></li>"+
												"<li><a href='#geoChart' id='KH'>	Cambodia	</a></li>"+
												"<li><a href='#geoChart' id='CN'>	China	</a></li>"+
												"<li><a href='#geoChart' id='HK'>	Hong Kong	</a></li>"+
												"<li><a href='#geoChart' id='IN'>	India	</a></li>"+
												"<li><a href='#geoChart' id='ID'>	Indonesia	</a></li>"+
												"<li><a href='#geoChart' id='JP'>	Japan	</a></li>"+
												"<li><a href='#geoChart' id='KZ'>	Kazakhstan	</a></li>"+
												"<li><a href='#geoChart' id='KP'>	North Korea	</a></li>"+
												"<li><a href='#geoChart' id='KR'>	South Korea </a></li>"+
												"<li><a href='#geoChart' id='KG'>	Kyrgyzstan	</a></li>"+
												"<li><a href='#geoChart' id='LA'>	Lao	</a></li>"+
												"<li><a href='#geoChart' id='MO'>	Macao	</a></li>"+	
												"<li><a href='#geoChart' id='MY'>	Malaysia	</a></li>"+
												"<li><a href='#geoChart' id='MV'>	Maldives	</a></li>"+
												"<li><a href='#geoChart' id='MN'>	Mongolia	</a></li>"+
												"<li><a href='#geoChart' id='MM'>	Myanmar	</a></li>"+
												"<li><a href='#geoChart' id='NP'>	Nepal	</a></li>"+
												"<li><a href='#geoChart' id='MP'>	Northern Mariana Islands	</a></li>"+
												"<li><a href='#geoChart' id='PH'>	Philippines	</a></li>"+
												"<li><a href='#geoChart' id='SG'>	Singapore	</a></li>"+
												"<li><a href='#geoChart' id='LK'>	Sri Lanka	</a></li>"+
												"<li><a href='#geoChart' id='TW'>	Taiwan </a></li>"+
												"<li><a href='#geoChart' id='TJ'>	Tajikistan	</a></li>"+
												"<li><a href='#geoChart' id='TH'>	Thailand	</a></li>"+
												"<li><a href='#geoChart' id='TM'>	Turkmenistan	</a></li>"+
												"<li><a href='#geoChart' id='UZ'>	Uzbekistan	</a></li>"+
												"<li><a href='#geoChart' id='VN'>	Vietnam	</a></li>"+
											"</ul>"+
										"</li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' id='' tabindex='-1'>Middle East, North Africa, and Greater Arabia</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#geoChart' id='AF'>	Afghanistan	</a></li>"+ 
												"<li><a href='#geoChart' id='DZ'>	Algeria	</a></li>"+
												"<li><a href='#geoChart' id='AZ'>	Azerbaijan	</a></li>"+
												"<li><a href='#geoChart' id='BH'>	Bahrain	</a></li>"+
												"<li><a href='#geoChart' id='EG'>	Egypt	</a></li>"+
												"<li><a href='#geoChart' id='GI'>	Gibraltar	</a></li>"+
												"<li><a href='#geoChart' id='IR'>	Iran </a></li>"+
												"<li><a href='#geoChart' id='IQ'>	Iraq	</a></li>"+
												"<li><a href='#geoChart' id='IL'>	Israel	</a></li>"+
												"<li><a href='#geoChart' id='JO'>	Jordan	</a></li>"+
												"<li><a href='#geoChart' id='KW'>	Kuwait	</a></li>"+
												"<li><a href='#geoChart' id='LB'>	Lebanon	</a></li>"+
												"<li><a href='#geoChart' id='LY'>	Libya	</a></li>"+
												"<li><a href='#geoChart' id='MA'>	Morocco	</a></li>"+
												"<li><a href='#geoChart' id='OM'>	Oman	</a></li>"+
												"<li><a href='#geoChart' id='PK'>	Pakistan	</a></li>"+
												"<li><a href='#geoChart' id='PS'>	Palestine </a></li>"+ 
												"<li><a href='#geoChart' id='QA'>	Qatar	</a></li>"+
												"<li><a href='#geoChart' id='SA'>	Saudi Arabia	</a></li>"+
												"<li><a href='#geoChart' id='SO'>	Somalia	</a></li>"+
												"<li><a href='#geoChart' id='SY'>	Syrian </a></li>"+
												"<li><a href='#geoChart' id='TN'>	Tunisia	</a></li>"+
												"<li><a href='#geoChart' id='TR'>	Turkey	</a></li>"+
												"<li><a href='#geoChart' id='AE'>	United Arab Emirates	</a></li>"+
												"<li><a href='#geoChart' id='EH'>	Western Sahara	</a></li>"+
												"<li><a href='#geoChart' id='YE'>	Yemen	</a></li>"+
											"</ul>"+
										"</li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' id='' tabindex='-1'>Europe</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#geoChart' id='AL'>	Albania	</a></li>"+	
												"<li><a href='#geoChart' id='AD'>	Andorra	</a></li>"+
												"<li><a href='#geoChart' id='AX'>	Åland Islands	</a></li>"+	
												"<li><a href='#geoChart' id='AM'>	Armenia	</a></li>"+
												"<li><a href='#geoChart' id='AT'>	Austria	</a></li>"+
												"<li><a href='#geoChart' id='BY'>	Belarus	</a></li>"+
												"<li><a href='#geoChart' id='BE'>	Belgium	</a></li>"+
												"<li><a href='#geoChart' id='BA'>	Bosnia and Herzegovina	</a></li>"+
												"<li><a href='#geoChart' id='BG'>	Bulgaria	</a></li>"+
												"<li><a href='#geoChart' id='HR'>	Croatia	</a></li>"+
												"<li><a href='#geoChart' id='CY'>	Cyprus	</a></li>"+
												"<li><a href='#geoChart' id='CZ'>	Czech Republic	</a></li>"+
												"<li><a href='#geoChart' id='DK'>	Denmark	</a></li>"+
												"<li><a href='#geoChart' id='EE'>	Estonia	</a></li>"+
												"<li><a href='#geoChart' id='FO'>	Faroe Islands	</a></li>"+ 
												"<li><a href='#geoChart' id='FI'>	Finland	</a></li>"+
												"<li><a href='#geoChart' id='FR'>	France	</a></li>"+
												"<li><a href='#geoChart' id='GE'>	Georgia	</a></li>"+
												"<li><a href='#geoChart' id='DE'>	Germany	</a></li>"+
												"<li><a href='#geoChart' id='GR'>	Greece	</a></li>"+
												"<li><a href='#geoChart' id='GG'>	Guernsey	</a></li>"+ 
												"<li><a href='#geoChart' id='HU'>	Hungary	</a></li>"+												
												"<li><a href='#geoChart' id='IS'>	Iceland	</a></li>"+
												"<li><a href='#geoChart' id='IE'>	Ireland	</a></li>"+
												"<li><a href='#geoChart' id='IM'>	Isle of Man	</a></li>"+
												"<li><a href='#geoChart' id='IT'>	Italy	</a></li>"+
												"<li><a href='#geoChart' id='JE'>	Jersey	</a></li>"+
												"<li><a href='#geoChart' id='LV'>	Latvia	</a></li>"+
												"<li><a href='#geoChart' id='LI'>	Liechtenstein	</a></li>"+
												"<li><a href='#geoChart' id='LT'>	Lithuania	</a></li>"+
												"<li><a href='#geoChart' id='LU'>	Luxembourg	</a></li>"+
												"<li><a href='#geoChart' id='MK'>	Macedonia	</a></li>"+
												"<li><a href='#geoChart' id='MT'>	Malta	</a></li>"+
												"<li><a href='#geoChart' id='MD'>	Moldova	</a></li>"+
												"<li><a href='#geoChart' id='MC'>	Monaco	</a></li>"+
												"<li><a href='#geoChart' id='ME'>	Montenegro	</a></li>"+
												"<li><a href='#geoChart' id='NL'>	Netherlands	</a></li>"+
												"<li><a href='#geoChart' id='NO'>	Norway	</a></li>"+
												"<li><a href='#geoChart' id='PL'>	Poland	</a></li>"+
												"<li><a href='#geoChart' id='PT'>	Portugal	</a></li>"+
												"<li><a href='#geoChart' id='RO'>	Romania	</a></li>"+
												"<li><a href='#geoChart' id='RU'>	Russia </a></li>"+
												"<li><a href='#geoChart' id='SM'>	San Marino	</a></li>"+
												"<li><a href='#geoChart' id='RS'>	Serbia	</a></li>"+
												"<li><a href='#geoChart' id='SK'>	Slovakia	</a></li>"+
												"<li><a href='#geoChart' id='SI'>	Slovenia	</a></li>"+
												"<li><a href='#geoChart' id='ES'>	Spain	</a></li>"+
												"<li><a href='#geoChart' id='SJ'>	Svalbard and Jan Mayen	</a></li>"+ 
												"<li><a href='#geoChart' id='SE'>	Sweden	</a></li>"+
												"<li><a href='#geoChart' id='CH'>	Switzerland	</a></li>"+
												"<li><a href='#geoChart' id='UA'>	Ukraine	</a></li>"+
												"<li><a href='#geoChart' id='GB'>	United Kingdom	</a></li>"+
												"<li><a href='#geoChart' id='VA'>	Vatican	</a></li>"+
											"</ul>"+
										"</li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' id='' tabindex='-1'>North America</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#geoChart' id='CA'>	Canada	</a></li>"+
												"<li><a href='#geoChart' id='GL'>	Greenland	</a></li>"+
												"<li><a href='#geoChart' id='MX'>	Mexico	</a></li>"+
												"<li><a href='#geoChart' id='PM'>	Saint Pierre and Miquelon	</a></li>"+
												"<li><a href='#geoChart' id='US'>	United States	</a></li>"+
											"</ul>"+
										"</li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' id='' tabindex='-1'>Central America and the Caribbean</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#geoChart' id='AG'>	Antigua and Barbuda	</a></li>"+	
												"<li><a href='#geoChart' id='AW'>	Aruba	</a></li>"+	
												"<li><a href='#geoChart' id='BS'>	Bahamas	</a></li>"+
												"<li><a href='#geoChart' id='BB'>	Barbados	</a></li>"+
												"<li><a href='#geoChart' id='BZ'>	Belize	</a></li>"+
												"<li><a href='#geoChart' id='BM'>	Bermuda	</a></li>"+
												"<li><a href='#geoChart' id='BQ'>	Bonaire, Sint Eustatius and Saba	</a></li>"+
												"<li><a href='#geoChart' id='KY'>	Cayman Islands	</a></li>"+
												"<li><a href='#geoChart' id='CR'>	Costa Rica	</a></li>"+
												"<li><a href='#geoChart' id='CU'>	Cuba	</a></li>"+
												"<li><a href='#geoChart' id='CW'>	Curaçao	</a></li>"+
												"<li><a href='#geoChart' id='DM'>	Dominica	</a></li>"+
												"<li><a href='#geoChart' id='DO'>	Dominican Republic	</a></li>"+
												"<li><a href='#geoChart' id='SV'>	El Salvador	</a></li>"+
												"<li><a href='#geoChart' id='GD'>	Grenada	</a></li>"+
												"<li><a href='#geoChart' id='GP'>	Guadeloupe	</a></li>"+ 
												"<li><a href='#geoChart' id='GT'>	Guatemala	</a></li>"+
												"<li><a href='#geoChart' id='HT'>	Haiti	</a></li>"+
												"<li><a href='#geoChart' id='HN'>	Honduras	</a></li>"+
												"<li><a href='#geoChart' id='JM'>	Jamaica	</a></li>"+
												"<li><a href='#geoChart' id='MQ'>	Martinique	</a></li>"+ 
												"<li><a href='#geoChart' id='MS'>	Montserrat	</a></li>"+ 
												"<li><a href='#geoChart' id='NI'>	Nicaragua	</a></li>"+
												"<li><a href='#geoChart' id='PA'>	Panama	</a></li>"+
												"<li><a href='#geoChart' id='PR'>	Puerto Rico	</a></li>"+ 
												"<li><a href='#geoChart' id='BL'>	Saint Barthélemy	</a></li>"+ 
												"<li><a href='#geoChart' id='KN'>	Saint Kitts and Nevis	</a></li>"+
												"<li><a href='#geoChart' id='LC'>	Saint Lucia	</a></li>"+
												"<li><a href='#geoChart' id='MF'>	Saint Martin (French part)	</a></li>"+
												"<li><a href='#geoChart' id='VC'>	Saint Vincent and the Grenadines	</a></li>"+
												"<li><a href='#geoChart' id='SX'>	Sint Maarten (Dutch part)	</a></li>"+ 
												"<li><a href='#geoChart' id='TT'>	Trinidad and Tobago	</a></li>"+
												"<li><a href='#geoChart' id='TC'>	Turks and Caicos Islands	</a></li>"+
												"<li><a href='#geoChart' id='VG'>	Virgin Islands, British	</a></li>"+ 
												"<li><a href='#geoChart' id='VI'>	Virgin Islands, U.S.	</a></li>"+ 
											"</ul>"+
										"</li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' id='' tabindex='-1'>South America</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#geoChart' id='AR'>	Argentina	</a></li>"+
												"<li><a href='#geoChart' id='BO'>	Bolivia	</a></li>"+
												"<li><a href='#geoChart' id='BR'>	Brazil	</a></li>"+
												"<li><a href='#geoChart' id='CL'>	Chile	</a></li>"+
												"<li><a href='#geoChart' id='CO'>	Colombia	</a></li>"+
												"<li><a href='#geoChart' id='EC'>	Ecuador	</a></li>"+
												"<li><a href='#geoChart' id='FK'>	Falkland Islands (Malvinas)	</a></li>"+
												"<li><a href='#geoChart' id='GF'>	French Guiana	</a></li>"+ 
												"<li><a href='#geoChart' id='GY'>	Guyana	</a></li>"+
												"<li><a href='#geoChart' id='PY'>	Paraguay	</a></li>"+
												"<li><a href='#geoChart' id='PE'>	Peru	</a></li>"+
												"<li><a href='#geoChart' id='SR'>	Suriname	</a></li>"+
												"<li><a href='#geoChart' id='UY'>	Uruguay	</a></li>"+
												"<li><a href='#geoChart' id='VE'>	Venezuela </a></li>"+
											"</ul>"+
										"</li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' id='' tabindex='-1'>Sub-Saharan Africa</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#geoChart' id='AO'>	Angola	</a></li>"+
												"<li><a href='#geoChart' id='BJ'>	Benin	</a></li>"+
												"<li><a href='#geoChart' id='BW'>	Botswana	</a></li>"+
												"<li><a href='#geoChart' id='BF'>	Burkina Faso	</a></li>"+
												"<li><a href='#geoChart' id='BI'>	Burundi	</a></li>"+
												"<li><a href='#geoChart' id='CM'>	Cameroon	</a></li>"+
												"<li><a href='#geoChart' id='CV'>	Cape Verde	</a></li>"+
												"<li><a href='#geoChart' id='CF'>	Central African Republic	</a></li>"+
												"<li><a href='#geoChart' id='TD'>	Chad	</a></li>"+
												"<li><a href='#geoChart' id='KM'>	Comoros	</a></li>"+
												"<li><a href='#geoChart' id='CG'>	Congo	</a></li>"+
												"<li><a href='#geoChart' id='CD'>	Congo, the Democratic Republic of the	</a></li>"+
												"<li><a href='#geoChart' id='CI'>	Côte d'Ivoire	</a></li>"+
												"<li><a href='#geoChart' id='DJ'>	Djibouti	</a></li>"+
												"<li><a href='#geoChart' id='GQ'>	Equatorial Guinea	</a></li>"+
												"<li><a href='#geoChart' id='ER'>	Eritrea	</a></li>"+
												"<li><a href='#geoChart' id='ET'>	Ethiopia	</a></li>"+
												"<li><a href='#geoChart' id='GA'>	Gabon	</a></li>"+
												"<li><a href='#geoChart' id='GM'>	Gambia	</a></li>"+
												"<li><a href='#geoChart' id='GH'>	Ghana	</a></li>"+
												"<li><a href='#geoChart' id='GN'>	Guinea	</a></li>"+
												"<li><a href='#geoChart' id='GW'>	Guinea-Bissau	</a></li>"+
												"<li><a href='#geoChart' id='KE'>	Kenya	</a></li>"+
												"<li><a href='#geoChart' id='LS'>	Lesotho	</a></li>"+
												"<li><a href='#geoChart' id='LR'>	Liberia	</a></li>"+
												"<li><a href='#geoChart' id='MG'>	Madagascar	</a></li>"+
												"<li><a href='#geoChart' id='MW'>	Malawi	</a></li>"+
												"<li><a href='#geoChart' id='ML'>	Mali	</a></li>"+
												"<li><a href='#geoChart' id='MR'>	Mauritania	</a></li>"+
												"<li><a href='#geoChart' id='MU'>	Mauritius	</a></li>"+
												"<li><a href='#geoChart' id='YT'>	Mayotte	</a></li>"+
												"<li><a href='#geoChart' id='MZ'>	Mozambique	</a></li>"+
												"<li><a href='#geoChart' id='NA'>	Namibia	</a></li>"+
												"<li><a href='#geoChart' id='NE'>	Niger	</a></li>"+
												"<li><a href='#geoChart' id='NG'>	Nigeria	</a></li>"+
												"<li><a href='#geoChart' id='RE'>	Réunion	</a></li>"+
												"<li><a href='#geoChart' id='RW'>	Rwanda	</a></li>"+
												"<li><a href='#geoChart' id='SH'>	Saint Helena, Ascension and Tristan da Cunha	</a></li>"+
												"<li><a href='#geoChart' id='ST'>	Sao Tome and Principe	</a></li>"+
												"<li><a href='#geoChart' id='SN'>	Senegal	</a></li>"+
												"<li><a href='#geoChart' id='SC'>	Seychelles	</a></li>"+
												"<li><a href='#geoChart' id='SL'>	Sierra Leone	</a></li>"+
												"<li><a href='#geoChart' id='ZA'>	South Africa	</a></li>"+
												"<li><a href='#geoChart' id='SS'>	South Sudan	</a></li>"+
												"<li><a href='#geoChart' id='SD'>	Sudan	</a></li>"+
												"<li><a href='#geoChart' id='SZ'>	Swaziland	</a></li>"+
												"<li><a href='#geoChart' id='TZ'>	Tanzania </a></li>"+
												"<li><a href='#geoChart' id='TG'>	Togo	</a></li>"+
												"<li><a href='#geoChart' id='UG'>	Uganda	</a></li>"+
												"<li><a href='#geoChart' id='ZM'>	Zambia	</a></li>"+
												"<li><a href='#geoChart' id='ZW'>	Zimbabwe	</a></li>"+
											"</ul>"+
										"</li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' id='' tabindex='-1'>Australia and Oceania</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#geoChart' id='AI'>	Anguilla	</a></li>"+
												"<li><a href='#geoChart' id='AS'>	American Samoa	</a></li>"+
												"<li><a href='#geoChart' id='AU'>	Australia	</a></li>"+
												"<li><a href='#geoChart' id='CX'>	Christmas Island	</a></li>"+ 
												"<li><a href='#geoChart' id='CC'>	Cocos (Keeling) Islands	</a></li>"+		
												"<li><a href='#geoChart' id='CK'>	Cook Islands	</a></li>"+ 										
												"<li><a href='#geoChart' id='FJ'>	Fiji	</a></li>"+
												"<li><a href='#geoChart' id='PF'>	French Polynesia	</a></li>"+ 
												"<li><a href='#geoChart' id='GU'>	Guam	</a></li>"+ 
												"<li><a href='#geoChart' id='KI'>	Kiribati	</a></li>"+
												"<li><a href='#geoChart' id='MH'>	Marshall Islands	</a></li>"+
												"<li><a href='#geoChart' id='FM'>	Micronesia	</a></li>"+
												"<li><a href='#geoChart' id='NR'>	Nauru	</a></li>"+
												"<li><a href='#geoChart' id='NC'>	New Caledonia	</a></li>"+ 
												"<li><a href='#geoChart' id='NZ'>	New Zealand	</a></li>"+
												"<li><a href='#geoChart' id='NU'>	Niue	</a></li>"+
												"<li><a href='#geoChart' id='NF'>	Norfolk Island	</a></li>"+ 
												"<li><a href='#geoChart' id='PW'>	Palau	</a></li>"+
												"<li><a href='#geoChart' id='PG'>	Papua New Guinea	</a></li>"+
												"<li><a href='#geoChart' id='PN'>	Pitcairn	</a></li>"+
												"<li><a href='#geoChart' id='WS'>	Samoa	</a></li>"+
												"<li><a href='#geoChart' id='SB'>	Solomon Islands	</a></li>"+
												"<li><a href='#geoChart' id='TL'>	Timor-Leste	</a></li>"+
												"<li><a href='#geoChart' id='TK'>	Tokelau	</a></li>"+ 
												"<li><a href='#geoChart' id='TO'>	Tonga	</a></li>"+
												"<li><a href='#geoChart' id='TV'>	Tuvalu	</a></li>"+
												"<li><a href='#geoChart' id='UM'>	United States Minor Outlying Islands	</a></li>"+
												"<li><a href='#geoChart' id='VU'>	Vanuatu	</a></li>"+
												"<li><a href='#geoChart' id='WF'>	Wallis and Futuna	</a></li>"+ 
											"</ul>"+
										"</li>"+	
							"</ul>"+
						"</div><!-- /btn-group -->"+
						"<div class='btn-group'>"+
							"<button data-toggle='dropdown' class='btn dropdown-toggle'>Geo Map <span class='caret'></span></button>"+
							"<ul class='dropdown-menu'>"+
								"<li><a href='#geoMap' id='world'>world map</a></li>"+
								"<li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' id='' tabindex='-1'>Asia</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#geoMap' id='BD'>	Bangladesh	</a></li>"+	
												"<li><a href='#geoMap' id='BT'>	Bhutan	</a></li>"+	
												"<li><a href='#geoMap' id='IO'>	British Indian Ocean Territory	</a></li>"+
												"<li><a href='#geoMap' id='BN'>	Brunei Darussalam	</a></li>"+
												"<li><a href='#geoMap' id='KH'>	Cambodia	</a></li>"+
												"<li><a href='#geoMap' id='CN'>	China	</a></li>"+
												"<li><a href='#geoMap' id='HK'>	Hong Kong	</a></li>"+
												"<li><a href='#geoMap' id='IN'>	India	</a></li>"+
												"<li><a href='#geoMap' id='ID'>	Indonesia	</a></li>"+
												"<li><a href='#geoMap' id='JP'>	Japan	</a></li>"+
												"<li><a href='#geoMap' id='KZ'>	Kazakhstan	</a></li>"+
												"<li><a href='#geoMap' id='KP'>	North Korea	</a></li>"+
												"<li><a href='#geoMap' id='KR'>	South Korea </a></li>"+
												"<li><a href='#geoMap' id='KG'>	Kyrgyzstan	</a></li>"+
												"<li><a href='#geoMap' id='LA'>	Lao	</a></li>"+
												"<li><a href='#geoMap' id='MO'>	Macao	</a></li>"+	
												"<li><a href='#geoMap' id='MY'>	Malaysia	</a></li>"+
												"<li><a href='#geoMap' id='MV'>	Maldives	</a></li>"+
												"<li><a href='#geoMap' id='MN'>	Mongolia	</a></li>"+
												"<li><a href='#geoMap' id='MM'>	Myanmar	</a></li>"+
												"<li><a href='#geoMap' id='NP'>	Nepal	</a></li>"+
												"<li><a href='#geoMap' id='MP'>	Northern Mariana Islands	</a></li>"+
												"<li><a href='#geoMap' id='PH'>	Philippines	</a></li>"+
												"<li><a href='#geoMap' id='SG'>	Singapore	</a></li>"+
												"<li><a href='#geoMap' id='LK'>	Sri Lanka	</a></li>"+
												"<li><a href='#geoMap' id='TW'>	Taiwan </a></li>"+
												"<li><a href='#geoMap' id='TJ'>	Tajikistan	</a></li>"+
												"<li><a href='#geoMap' id='TH'>	Thailand	</a></li>"+
												"<li><a href='#geoMap' id='TM'>	Turkmenistan	</a></li>"+
												"<li><a href='#geoMap' id='UZ'>	Uzbekistan	</a></li>"+
												"<li><a href='#geoMap' id='VN'>	Vietnam	</a></li>"+
											"</ul>"+
										"</li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' id='' tabindex='-1'>Middle East, North Africa, and Greater Arabia</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#geoMap' id='AF'>	Afghanistan	</a></li>"+ 
												"<li><a href='#geoMap' id='DZ'>	Algeria	</a></li>"+
												"<li><a href='#geoMap' id='AZ'>	Azerbaijan	</a></li>"+
												"<li><a href='#geoMap' id='BH'>	Bahrain	</a></li>"+
												"<li><a href='#geoMap' id='EG'>	Egypt	</a></li>"+
												"<li><a href='#geoMap' id='GI'>	Gibraltar	</a></li>"+
												"<li><a href='#geoMap' id='IR'>	Iran </a></li>"+
												"<li><a href='#geoMap' id='IQ'>	Iraq	</a></li>"+
												"<li><a href='#geoMap' id='IL'>	Israel	</a></li>"+
												"<li><a href='#geoMap' id='JO'>	Jordan	</a></li>"+
												"<li><a href='#geoMap' id='KW'>	Kuwait	</a></li>"+
												"<li><a href='#geoMap' id='LB'>	Lebanon	</a></li>"+
												"<li><a href='#geoMap' id='LY'>	Libya	</a></li>"+
												"<li><a href='#geoMap' id='MA'>	Morocco	</a></li>"+
												"<li><a href='#geoMap' id='OM'>	Oman	</a></li>"+
												"<li><a href='#geoMap' id='PK'>	Pakistan	</a></li>"+
												"<li><a href='#geoMap' id='PS'>	Palestine </a></li>"+ 
												"<li><a href='#geoMap' id='QA'>	Qatar	</a></li>"+
												"<li><a href='#geoMap' id='SA'>	Saudi Arabia	</a></li>"+
												"<li><a href='#geoMap' id='SO'>	Somalia	</a></li>"+
												"<li><a href='#geoMap' id='SY'>	Syrian </a></li>"+
												"<li><a href='#geoMap' id='TN'>	Tunisia	</a></li>"+
												"<li><a href='#geoMap' id='TR'>	Turkey	</a></li>"+
												"<li><a href='#geoMap' id='AE'>	United Arab Emirates	</a></li>"+
												"<li><a href='#geoMap' id='EH'>	Western Sahara	</a></li>"+
												"<li><a href='#geoMap' id='YE'>	Yemen	</a></li>"+
											"</ul>"+
										"</li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' id='' tabindex='-1'>Europe</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#geoMap' id='AL'>	Albania	</a></li>"+	
												"<li><a href='#geoMap' id='AD'>	Andorra	</a></li>"+
												"<li><a href='#geoMap' id='AX'>	Åland Islands	</a></li>"+	
												"<li><a href='#geoMap' id='AM'>	Armenia	</a></li>"+
												"<li><a href='#geoMap' id='AT'>	Austria	</a></li>"+
												"<li><a href='#geoMap' id='BY'>	Belarus	</a></li>"+
												"<li><a href='#geoMap' id='BE'>	Belgium	</a></li>"+
												"<li><a href='#geoMap' id='BA'>	Bosnia and Herzegovina	</a></li>"+
												"<li><a href='#geoMap' id='BG'>	Bulgaria	</a></li>"+
												"<li><a href='#geoMap' id='HR'>	Croatia	</a></li>"+
												"<li><a href='#geoMap' id='CY'>	Cyprus	</a></li>"+
												"<li><a href='#geoMap' id='CZ'>	Czech Republic	</a></li>"+
												"<li><a href='#geoMap' id='DK'>	Denmark	</a></li>"+
												"<li><a href='#geoMap' id='EE'>	Estonia	</a></li>"+
												"<li><a href='#geoMap' id='FO'>	Faroe Islands	</a></li>"+ 
												"<li><a href='#geoMap' id='FI'>	Finland	</a></li>"+
												"<li><a href='#geoMap' id='FR'>	France	</a></li>"+
												"<li><a href='#geoMap' id='GE'>	Georgia	</a></li>"+
												"<li><a href='#geoMap' id='DE'>	Germany	</a></li>"+
												"<li><a href='#geoMap' id='GR'>	Greece	</a></li>"+
												"<li><a href='#geoMap' id='GG'>	Guernsey	</a></li>"+ 
												"<li><a href='#geoMap' id='HU'>	Hungary	</a></li>"+												
												"<li><a href='#geoMap' id='IS'>	Iceland	</a></li>"+
												"<li><a href='#geoMap' id='IE'>	Ireland	</a></li>"+
												"<li><a href='#geoMap' id='IM'>	Isle of Man	</a></li>"+
												"<li><a href='#geoMap' id='IT'>	Italy	</a></li>"+
												"<li><a href='#geoMap' id='JE'>	Jersey	</a></li>"+
												"<li><a href='#geoMap' id='LV'>	Latvia	</a></li>"+
												"<li><a href='#geoMap' id='LI'>	Liechtenstein	</a></li>"+
												"<li><a href='#geoMap' id='LT'>	Lithuania	</a></li>"+
												"<li><a href='#geoMap' id='LU'>	Luxembourg	</a></li>"+
												"<li><a href='#geoMap' id='MK'>	Macedonia	</a></li>"+
												"<li><a href='#geoMap' id='MT'>	Malta	</a></li>"+
												"<li><a href='#geoMap' id='MD'>	Moldova	</a></li>"+
												"<li><a href='#geoMap' id='MC'>	Monaco	</a></li>"+
												"<li><a href='#geoMap' id='ME'>	Montenegro	</a></li>"+
												"<li><a href='#geoMap' id='NL'>	Netherlands	</a></li>"+
												"<li><a href='#geoMap' id='NO'>	Norway	</a></li>"+
												"<li><a href='#geoMap' id='PL'>	Poland	</a></li>"+
												"<li><a href='#geoMap' id='PT'>	Portugal	</a></li>"+
												"<li><a href='#geoMap' id='RO'>	Romania	</a></li>"+
												"<li><a href='#geoMap' id='RU'>	Russia </a></li>"+
												"<li><a href='#geoMap' id='SM'>	San Marino	</a></li>"+
												"<li><a href='#geoMap' id='RS'>	Serbia	</a></li>"+
												"<li><a href='#geoMap' id='SK'>	Slovakia	</a></li>"+
												"<li><a href='#geoMap' id='SI'>	Slovenia	</a></li>"+
												"<li><a href='#geoMap' id='ES'>	Spain	</a></li>"+
												"<li><a href='#geoMap' id='SJ'>	Svalbard and Jan Mayen	</a></li>"+ 
												"<li><a href='#geoMap' id='SE'>	Sweden	</a></li>"+
												"<li><a href='#geoMap' id='CH'>	Switzerland	</a></li>"+
												"<li><a href='#geoMap' id='UA'>	Ukraine	</a></li>"+
												"<li><a href='#geoMap' id='GB'>	United Kingdom	</a></li>"+
												"<li><a href='#geoMap' id='VA'>	Vatican	</a></li>"+
											"</ul>"+
										"</li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' id='' tabindex='-1'>North America</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#geoMap' id='CA'>	Canada	</a></li>"+
												"<li><a href='#geoMap' id='GL'>	Greenland	</a></li>"+
												"<li><a href='#geoMap' id='MX'>	Mexico	</a></li>"+
												"<li><a href='#geoMap' id='PM'>	Saint Pierre and Miquelon	</a></li>"+
												"<li><a href='#geoMap' id='US'>	United States	</a></li>"+
											"</ul>"+
										"</li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' id='' tabindex='-1'>Central America and the Caribbean</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#geoMap' id='AG'>	Antigua and Barbuda	</a></li>"+	
												"<li><a href='#geoMap' id='AW'>	Aruba	</a></li>"+	
												"<li><a href='#geoMap' id='BS'>	Bahamas	</a></li>"+
												"<li><a href='#geoMap' id='BB'>	Barbados	</a></li>"+
												"<li><a href='#geoMap' id='BZ'>	Belize	</a></li>"+
												"<li><a href='#geoMap' id='BM'>	Bermuda	</a></li>"+
												"<li><a href='#geoMap' id='BQ'>	Bonaire, Sint Eustatius and Saba	</a></li>"+
												"<li><a href='#geoMap' id='KY'>	Cayman Islands	</a></li>"+
												"<li><a href='#geoMap' id='CR'>	Costa Rica	</a></li>"+
												"<li><a href='#geoMap' id='CU'>	Cuba	</a></li>"+
												"<li><a href='#geoMap' id='CW'>	Curaçao	</a></li>"+
												"<li><a href='#geoMap' id='DM'>	Dominica	</a></li>"+
												"<li><a href='#geoMap' id='DO'>	Dominican Republic	</a></li>"+
												"<li><a href='#geoMap' id='SV'>	El Salvador	</a></li>"+
												"<li><a href='#geoMap' id='GD'>	Grenada	</a></li>"+
												"<li><a href='#geoMap' id='GP'>	Guadeloupe	</a></li>"+ 
												"<li><a href='#geoMap' id='GT'>	Guatemala	</a></li>"+
												"<li><a href='#geoMap' id='HT'>	Haiti	</a></li>"+
												"<li><a href='#geoMap' id='HN'>	Honduras	</a></li>"+
												"<li><a href='#geoMap' id='JM'>	Jamaica	</a></li>"+
												"<li><a href='#geoMap' id='MQ'>	Martinique	</a></li>"+ 
												"<li><a href='#geoMap' id='MS'>	Montserrat	</a></li>"+ 
												"<li><a href='#geoMap' id='NI'>	Nicaragua	</a></li>"+
												"<li><a href='#geoMap' id='PA'>	Panama	</a></li>"+
												"<li><a href='#geoMap' id='PR'>	Puerto Rico	</a></li>"+ 
												"<li><a href='#geoMap' id='BL'>	Saint Barthélemy	</a></li>"+ 
												"<li><a href='#geoMap' id='KN'>	Saint Kitts and Nevis	</a></li>"+
												"<li><a href='#geoMap' id='LC'>	Saint Lucia	</a></li>"+
												"<li><a href='#geoMap' id='MF'>	Saint Martin (French part)	</a></li>"+
												"<li><a href='#geoMap' id='VC'>	Saint Vincent and the Grenadines	</a></li>"+
												"<li><a href='#geoMap' id='SX'>	Sint Maarten (Dutch part)	</a></li>"+ 
												"<li><a href='#geoMap' id='TT'>	Trinidad and Tobago	</a></li>"+
												"<li><a href='#geoMap' id='TC'>	Turks and Caicos Islands	</a></li>"+
												"<li><a href='#geoMap' id='VG'>	Virgin Islands, British	</a></li>"+ 
												"<li><a href='#geoMap' id='VI'>	Virgin Islands, U.S.	</a></li>"+ 
											"</ul>"+
										"</li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' id='' tabindex='-1'>South America</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#geoMap' id='AR'>	Argentina	</a></li>"+
												"<li><a href='#geoMap' id='BO'>	Bolivia	</a></li>"+
												"<li><a href='#geoMap' id='BR'>	Brazil	</a></li>"+
												"<li><a href='#geoMap' id='CL'>	Chile	</a></li>"+
												"<li><a href='#geoMap' id='CO'>	Colombia	</a></li>"+
												"<li><a href='#geoMap' id='EC'>	Ecuador	</a></li>"+
												"<li><a href='#geoMap' id='FK'>	Falkland Islands (Malvinas)	</a></li>"+
												"<li><a href='#geoMap' id='GF'>	French Guiana	</a></li>"+ 
												"<li><a href='#geoMap' id='GY'>	Guyana	</a></li>"+
												"<li><a href='#geoMap' id='PY'>	Paraguay	</a></li>"+
												"<li><a href='#geoMap' id='PE'>	Peru	</a></li>"+
												"<li><a href='#geoMap' id='SR'>	Suriname	</a></li>"+
												"<li><a href='#geoMap' id='UY'>	Uruguay	</a></li>"+
												"<li><a href='#geoMap' id='VE'>	Venezuela </a></li>"+
											"</ul>"+
										"</li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' id='' tabindex='-1'>Sub-Saharan Africa</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#geoMap' id='AO'>	Angola	</a></li>"+
												"<li><a href='#geoMap' id='BJ'>	Benin	</a></li>"+
												"<li><a href='#geoMap' id='BW'>	Botswana	</a></li>"+
												"<li><a href='#geoMap' id='BF'>	Burkina Faso	</a></li>"+
												"<li><a href='#geoMap' id='BI'>	Burundi	</a></li>"+
												"<li><a href='#geoMap' id='CM'>	Cameroon	</a></li>"+
												"<li><a href='#geoMap' id='CV'>	Cape Verde	</a></li>"+
												"<li><a href='#geoMap' id='CF'>	Central African Republic	</a></li>"+
												"<li><a href='#geoMap' id='TD'>	Chad	</a></li>"+
												"<li><a href='#geoMap' id='KM'>	Comoros	</a></li>"+
												"<li><a href='#geoMap' id='CG'>	Congo	</a></li>"+
												"<li><a href='#geoMap' id='CD'>	Congo, the Democratic Republic of the	</a></li>"+
												"<li><a href='#geoMap' id='CI'>	Côte d'Ivoire	</a></li>"+
												"<li><a href='#geoMap' id='DJ'>	Djibouti	</a></li>"+
												"<li><a href='#geoMap' id='GQ'>	Equatorial Guinea	</a></li>"+
												"<li><a href='#geoMap' id='ER'>	Eritrea	</a></li>"+
												"<li><a href='#geoMap' id='ET'>	Ethiopia	</a></li>"+
												"<li><a href='#geoMap' id='GA'>	Gabon	</a></li>"+
												"<li><a href='#geoMap' id='GM'>	Gambia	</a></li>"+
												"<li><a href='#geoMap' id='GH'>	Ghana	</a></li>"+
												"<li><a href='#geoMap' id='GN'>	Guinea	</a></li>"+
												"<li><a href='#geoMap' id='GW'>	Guinea-Bissau	</a></li>"+
												"<li><a href='#geoMap' id='KE'>	Kenya	</a></li>"+
												"<li><a href='#geoMap' id='LS'>	Lesotho	</a></li>"+
												"<li><a href='#geoMap' id='LR'>	Liberia	</a></li>"+
												"<li><a href='#geoMap' id='MG'>	Madagascar	</a></li>"+
												"<li><a href='#geoMap' id='MW'>	Malawi	</a></li>"+
												"<li><a href='#geoMap' id='ML'>	Mali	</a></li>"+
												"<li><a href='#geoMap' id='MR'>	Mauritania	</a></li>"+
												"<li><a href='#geoMap' id='MU'>	Mauritius	</a></li>"+
												"<li><a href='#geoMap' id='YT'>	Mayotte	</a></li>"+
												"<li><a href='#geoMap' id='MZ'>	Mozambique	</a></li>"+
												"<li><a href='#geoMap' id='NA'>	Namibia	</a></li>"+
												"<li><a href='#geoMap' id='NE'>	Niger	</a></li>"+
												"<li><a href='#geoMap' id='NG'>	Nigeria	</a></li>"+
												"<li><a href='#geoMap' id='RE'>	Réunion	</a></li>"+
												"<li><a href='#geoMap' id='RW'>	Rwanda	</a></li>"+
												"<li><a href='#geoMap' id='SH'>	Saint Helena, Ascension and Tristan da Cunha	</a></li>"+
												"<li><a href='#geoMap' id='ST'>	Sao Tome and Principe	</a></li>"+
												"<li><a href='#geoMap' id='SN'>	Senegal	</a></li>"+
												"<li><a href='#geoMap' id='SC'>	Seychelles	</a></li>"+
												"<li><a href='#geoMap' id='SL'>	Sierra Leone	</a></li>"+
												"<li><a href='#geoMap' id='ZA'>	South Africa	</a></li>"+
												"<li><a href='#geoMap' id='SS'>	South Sudan	</a></li>"+
												"<li><a href='#geoMap' id='SD'>	Sudan	</a></li>"+
												"<li><a href='#geoMap' id='SZ'>	Swaziland	</a></li>"+
												"<li><a href='#geoMap' id='TZ'>	Tanzania </a></li>"+
												"<li><a href='#geoMap' id='TG'>	Togo	</a></li>"+
												"<li><a href='#geoMap' id='UG'>	Uganda	</a></li>"+
												"<li><a href='#geoMap' id='ZM'>	Zambia	</a></li>"+
												"<li><a href='#geoMap' id='ZW'>	Zimbabwe	</a></li>"+
											"</ul>"+
										"</li>"+
										"<li class='dropdown-submenu'>"+
											"<a href='#' id='' tabindex='-1'>Australia and Oceania</a>"+
											"<ul class='dropdown-menu'>"+
												"<li><a href='#geoMap' id='AI'>	Anguilla	</a></li>"+
												"<li><a href='#geoMap' id='AS'>	American Samoa	</a></li>"+
												"<li><a href='#geoMap' id='AU'>	Australia	</a></li>"+
												"<li><a href='#geoMap' id='CX'>	Christmas Island	</a></li>"+ 
												"<li><a href='#geoMap' id='CC'>	Cocos (Keeling) Islands	</a></li>"+		
												"<li><a href='#geoMap' id='CK'>	Cook Islands	</a></li>"+ 										
												"<li><a href='#geoMap' id='FJ'>	Fiji	</a></li>"+
												"<li><a href='#geoMap' id='PF'>	French Polynesia	</a></li>"+ 
												"<li><a href='#geoMap' id='GU'>	Guam	</a></li>"+ 
												"<li><a href='#geoMap' id='KI'>	Kiribati	</a></li>"+
												"<li><a href='#geoMap' id='MH'>	Marshall Islands	</a></li>"+
												"<li><a href='#geoMap' id='FM'>	Micronesia	</a></li>"+
												"<li><a href='#geoMap' id='NR'>	Nauru	</a></li>"+
												"<li><a href='#geoMap' id='NC'>	New Caledonia	</a></li>"+ 
												"<li><a href='#geoMap' id='NZ'>	New Zealand	</a></li>"+
												"<li><a href='#geoMap' id='NU'>	Niue	</a></li>"+
												"<li><a href='#geoMap' id='NF'>	Norfolk Island	</a></li>"+ 
												"<li><a href='#geoMap' id='PW'>	Palau	</a></li>"+
												"<li><a href='#geoMap' id='PG'>	Papua New Guinea	</a></li>"+
												"<li><a href='#geoMap' id='PN'>	Pitcairn	</a></li>"+
												"<li><a href='#geoMap' id='WS'>	Samoa	</a></li>"+
												"<li><a href='#geoMap' id='SB'>	Solomon Islands	</a></li>"+
												"<li><a href='#geoMap' id='TL'>	Timor-Leste	</a></li>"+
												"<li><a href='#geoMap' id='TK'>	Tokelau	</a></li>"+ 
												"<li><a href='#geoMap' id='TO'>	Tonga	</a></li>"+
												"<li><a href='#geoMap' id='TV'>	Tuvalu	</a></li>"+
												"<li><a href='#geoMap' id='UM'>	United States Minor Outlying Islands	</a></li>"+
												"<li><a href='#geoMap' id='VU'>	Vanuatu	</a></li>"+
												"<li><a href='#geoMap' id='WF'>	Wallis and Futuna	</a></li>"+ 
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
        	if(type=='geoChart' || type=='geoMap'){
        		var region=$(event.target).attr('id');
        		this[type](region);
        	}else
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
    geoChart: function(region) {
        this.options.type = 'geoChart';
        this.options.region=region;
        this.options.serializeType = "geoCharts"; 
        this.render();
    },
    geoMap: function(region) {
        this.options.type = 'geoMap';
        this.options.region=region;
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
            serializeType: "highCharts",
            type: 'bar'
        }, this.options);
       
         //start serialization of data
        if(options.serializeType=='highCharts' && options.type!='pie'){
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
        }else if(options.type=='pie'){
        	if(this.data.metadata.length<3){
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
	        }else{
	        	messageUser('<div class="alert  alert-error">You should be have only one measure selected!</div>');
        		return false;
	        }      
        }else{//serializeType=='geoCharts'
        	if(this.data.metadata.length<3){
        		var series=[];			
		        //nome das colunas
		        var column=[];
		        for(var i=0; i < this.data.metadata.length; i++)
		        	column[i]=this.data.metadata[i].colName;
	        	series[0]=column;

	        	if (this.data.resultset.length > 0 ) {        			
		        	$.each(this.data.resultset, function(key, value) {
		        		series[key+1]=value; // +1 devido ao nome das colunas	        		
					});
		        }	
		        //console.log(series);
        	}else{
        		messageUser('<div class="alert  alert-error">You should be have only one measure selected!</div>');
        		return false;
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
		else if(options.type=='geoChart')
		{
			
        	
        	var data = google.visualization.arrayToDataTable(series);
        		
	        var options = {
		    	width: $(this.workspace.el).find('.workspace_results').width() - 40, 
		    	height: $(this.workspace.el).find('.workspace_results').height() - 40,
		    	datalessRegionColor: 'F5F5F5',
		    	region: options.region,
		    	displayMode: 'markers'
	    	};

	        var geoChart = new google.visualization.GeoChart(document.getElementById(this.id));
	        geoChart.draw(data, options);

		}	
		else if(options.type=='geoMap')
		{
			
        	var data = google.visualization.arrayToDataTable(series);
        	
        	var options = {
		    	width: $(this.workspace.el).find('.workspace_results').width() - 40, 
		    	height: $(this.workspace.el).find('.workspace_results').height() - 40,
		    	colors: [0xE0FFD4, 0xA5EF63, 0x50AA00, 0x267114],
		    	region: options.region,
		    	dataMode: 'regions'
	    	};
	
	        var geoMap = new google.visualization.GeoMap(document.getElementById(this.id));
	        geoMap.draw(data, options);



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
                        if (args.data.cellset[row][col].properties.raw && args.data.cellset[row][col].properties.raw !== "null" && col>0)
                        {
                            value = parseFloat(args.data.cellset[row][col].properties.raw);
                        } else if (typeof(args.data.cellset[row][col].value) !== "number" &&
                            parseFloat(args.data.cellset[row][col].value.replace(/[^a-zA-Z 0-9.]+/g,'')) && col>0) 
                        {
                            value = parseFloat(args.data.cellset[row][col].value.replace(/[^a-zA-Z 0-9.]+/g,''));
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

function messageUser(msg){
	$("#message").html(msg).show('slow');
	setTimeout(function(){ jQuery("#message").hide('slow'); }, 2000);
}

/**
 * Start Plugin
 */ 
 Saiku.events.bind('session:new', function(session) {

	 	loadCSS('js/saiku/plugins/SaikuChartPlus/bootstrap/css/bootstrap.css');
		loadCSS('js/saiku/plugins/SaikuChartPlus/bootstrap/css/bootstrap-responsive.css');

		loadJS('js/saiku/plugins/SaikuChartPlus/bootstrap/js/bootstrap.min.js');
		loadJS('js/saiku/plugins/SaikuChartPlus/highcharts/highcharts.js');
		//loadJS('js/saiku/plugins/SaikuChartPlus/highcharts/exporting.js');
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
