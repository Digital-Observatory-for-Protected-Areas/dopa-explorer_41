  $=jQuery
  $(function() {
  var number = parseFloat($( "#percentage > div > div > div > div > div > div" ).text());
   $("#progressbar").progressbar({ value: number });

    });
