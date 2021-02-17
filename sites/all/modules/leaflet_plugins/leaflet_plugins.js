(function ($) {
  // prevent stack blowout
  if (!Drupal.leaflet._create_layer_orig) {
    Drupal.leaflet._create_layer_orig = Drupal.leaflet.create_layer;
  }

  Drupal.leaflet.create_layer = function(layer, key) {
    // Check if this is a map that should use the original API.
    if (layer.type && layer.type.search('api-') === 0) {
      switch(layer.type) {
        case 'api-google':
          var mapLayer = new L.Google(layer.map_type, layer.options);
          break;
        case 'api-bing':
          if (layer.options.map_type && !layer.options.type) {
            layer.options[type] == layer.options.map_type;
          }
          if (!layer.options.type && layer.map_type) {
            layer.options[type] = layer.map_type;
          }
          var mapLayer = new L.Bing(layer.key, layer.options);
          break;
        case 'api-yandex':
          var mapLayer = new L.Yandex(layer.map_type, layer.options);
          break;
      }
      mapLayer._leaflet_id = key;
      return mapLayer;
    }
    // Default to the original code;
    return Drupal.leaflet._create_layer_orig(layer, key);
  };

  // Allow to add other features of leaflet plugins.
  $(document).bind('leaflet.map', function(e, map, lMap) {
    if (map.settings.permalink) {
      var options = map.settings.permalink;
      lMap.addControl(new L.Control.Permalink(options));
    }
  });

})(jQuery);

