SaikuChartPlus
==============

SaikuChartPlus is an open source plug-in of Saiku 2.4 to help create other types of charts.

To install:

1) Download saikuchartsplus-plugin-2.4-RC1.zip

2) Copy the folder saikuchartsplus to /pentaho-solutions/system

3) Restart Pentaho BI Server

4) Click on New Saiku Charts Plus to create new analysis

For developer or advanced instalation
------------------

1- Edit the file saiku/ui/index.html, insert the code below:
`````javascript
<!--Load the Google AJAX API-->
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script type="text/javascript"> 
	google.load('visualization', '1.0', {'packages':['geochart']});
</script>
`````

License
------------------
Saiku Chart Plus are free software. The UI, contained in this repository,
is available under the terms of the Apache License Version 2. A copy is attached for your convenience.

..
