
INSTALLATION
============
Before you enable the Leaflet Plugins module, you need to download and enable
the Leaflet module and the Libraries module.

Then download the Leaflet javascript library from
http://leafletjs.com/download.html.

Drop the unzipped folder in sites/all/libraries and rename it to leaflet, so
that the path to the essential javascript file becomes:
sites/all/libraries/leaflet/leaflet.js

Then download the Leaflet plugins javascript library from
https://github.com/shramov/leaflet-plugins

Drop the unzipped folder in sites/all/libraries and rename it to leaflet-plugins, so
that the path to the essential javascript file becomes:
sites/all/libraries/leaflet-plugins/layer/tile/Google.js

If all's ok, you won't see any errors in the Status Report admin/reports/status.
After this all you have to do is enable Leaflet Plugins to use the Service
specific API's with your Maps.


USAGE
=====

-- API:
To use a native maps layer use one of the following types for the layer:
- api-google
- api-bing
- api-yandey
Example:
'layers' => array(
  'Terrain' => array(
    'type' => 'api-google',
    'map_type' => 'TERRAIN',
    'options' => array(),
  ),
),

You've to specify a 'map_type' as well:
Google: SATELLITE, ROADMAP, HYBRID, TERRAIN
Bing: Aerial, AerialWithLabels, Birdseye, BirdseyeWithLabels, Road
Yandex: map, satellite, hybrid, publicMap, publicMapHybrid

For Bing you've to specifiy the key to use!

-- PERMALINK:
To use the permalink feature adde followin setting to the map definition:
'permalink' => array(
  'text' => 'Permalink',
),
