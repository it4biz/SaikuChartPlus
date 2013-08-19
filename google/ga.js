var account = 'UA-43272786-1';

if (window.location.hostname == 'it4bizbiservices.com') {
    account = 'UA-33053507-1';
} 
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', account]);
  _gaq.push(['_setAllowLinker', true]);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

