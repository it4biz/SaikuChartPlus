Saiku Chart Plus

Features RC4 version:
* Removed dependency of bootstrap
* Removed load.js by Google, this is load at index.html
* Removed Highcharts files because insconsistence with IE, now this is load at index.html
* Changed Button Plus, add togle for table render button
* Now highcharts library is load direct from your website



* For installation consider this:
```
        <script type="text/javascript" src="http://code.highcharts.com/highcharts.js"></script>
        <script type="text/javascript" src="http://code.highcharts.com/modules/exporting.js"></script>
        <script type="text/javascript" src="https://www.google.com/jsapi"></script>
        <script type="text/javascript"> 
             google.load('visualization', '1.0', {'packages':['geochart','geomap']});
        </script>
        <script type="text/javascript" src="js/saiku/plugins/SaikuChartPlus/plugin.js" defer></script>
```
