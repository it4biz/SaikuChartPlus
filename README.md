Saiku Chart Plus

Welcome to Saiku Chart Plus Project.

What is Saiku Chart Plus? 

It is an open source project that helps Pentaho BI users to create other types of charts and maps based on Saiku Project, Highcharts and Google Maps.

How to install

1) Download saikuchartsplus-plugin-2.4-RC1.zip at http://code.google.com/p/saikuchartplus/

2) Copy the folder saiku to /pentaho-solutions/system

3) Restart Pentaho BI Server

4) Click on "New Saiku Analytics" to create new analysis and have fun with maps and nice charts.

For developer or advanced instalation

1) Edit the file saiku/ui/index.html, insert the code below:

<!--Load the Google AJAX API-->
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script type="text/javascript"> 
    google.load('visualization', '1.0', {'packages':['geochart']});
</script>

2) Download the project and replace all the files on saiku/ui/js/saiku/plugins/Chart That's it!

Licenses
Before you put this project in your production environment, please visit http://www.highcharts.com/ to learn more about the Highchart project, and https://developers.google.com/maps/terms to learn more about the Google GeoChart project. Saiku Chart Plus is a free and open source software. The UI, contained in this repository, is available under the terms of the Apache License Version 2. A copy is attached for your convenience.

Support or Contact
Having trouble with this project? Feel free to send us an e-mail at info@it4biz.com.br.