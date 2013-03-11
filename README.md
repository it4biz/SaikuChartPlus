SaikuChartPlus
==============

SaikuChartPlus is an open source plug-in of Saiku 2.4 to help create other types of charts.

To install:

1) Download <a target="no_blank" href="http://code.google.com/p/saikuchartplus/downloads/list">saikuchartsplus-plugin-2.4-RC1.zip</a>

2) Copy the folder saikuchartsplus to /pentaho-solutions/system

3) Restart Pentaho BI Server

For developer or advanced instalation
------------------

1) Edit the file saiku/ui/index.html, insert the code below:
`````javascript
<!--Load the Google AJAX API-->
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script type="text/javascript"> 
	google.load('visualization', '1.0', {'packages':['geochart']});
</script>
`````
2) Make a download of project and replace all the files on saiku/ui/js/saiku/plugins/Chart

Just this!

Licenses
------------------

Before you put this project in your production environment, please visit http://www.highcharts.com/ to learn more about Highchart project and https://developers.google.com/maps/terms to learn more about Google GeoChart project.

Saiku Chart Plus are free software. The UI, contained in this repository,
is available under the terms of the Apache License Version 2. A copy is attached for your convenience.

..
