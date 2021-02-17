
(function ($) {


//----------------------------------------------------------------------------------------------
// WMS QUERY
//----------------------------------------------------------------------------------------------

  L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({
    onAdd: function (map) {
      L.TileLayer.WMS.prototype.onAdd.call(this, map);
      map.on('click', this.getFeatureInfo, this);
      map.on('click', this.getFeatureInfo, this);
    },
    onRemove: function (map) {
      L.TileLayer.WMS.prototype.onRemove.call(this, map);
      map.off('click', this.getFeatureInfo, this);
    },

    getFeatureInfo: function (evt) {
      var url = this.getFeatureInfoUrl(evt.latlng),
          showResults = L.Util.bind(this.showGetFeatureInfo, this);
      $.ajax({
        url: url,
        success: function (data, status, xhr) {
          var err = typeof data === 'string' ? null : data;
          showResults(err, evt.latlng, data);
        },
        error: function (xhr, status, error) {
          showResults(error);
        }
      });
    },

    getFeatureInfoUrl: function (latlng) {
      var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
          size = this._map.getSize(),
          params = {
            request: 'GetFeatureInfo',
            service: 'WMS',
            srs: 'EPSG:4326',
            styles: this.wmsParams.styles,
            transparent: this.wmsParams.transparent,
            version: this.wmsParams.version,
            format: this.wmsParams.format,
            bbox: this._map.getBounds().toBBoxString(),
            height: size.y,
            width: size.x,
            layers: this.wmsParams.layers,
            query_layers: this.wmsParams.layers,
            info_format: 'text/html'
          };

      params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
      params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

      return this._url + L.Util.getParamString(params, this._url, true);
    },

    showGetFeatureInfo: function (err, latlng, content) {
      if (err) { console.log(err); return; }
      L.popup({ maxWidth: 800})
        .setLatLng(latlng)
        .setContent(content)
        .openOn(this._map);
    }
  });
  L.tileLayer.betterWms = function (url, options) {
    return new L.TileLayer.BetterWMS(url, options);
  };

//----------------------------------------------------------------------------------------------
// END OF WMS QUERY
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
// MAIN APP CODE
//----------------------------------------------------------------------------------------------
var objs={};
var info;
$( document ).ready(function() {

  var mapheight = $(window).height();
  var mapheightfinal = (mapheight -130);
  $('#legends').css('max-height', mapheightfinal);

$('#edit-title').attr("placeholder", "Search for datasets");
$('.form-item-title').prepend('<div id ="dropa_filters"><i class="material-icons">search</i></div>')

 // How many characters are shown by default IN THE LAYER DESCRIPTION
         var showChar = 50;
           var ellipsestext = "...";
           var moretext = '<i class="material-icons">keyboard_arrow_down</i>';
           var lesstext = '<i class="material-icons">keyboard_arrow_up</i>';
           $('.more').each(function() {
               var content = $(this).html();
               if(content.length > showChar) {
                   var c = content.substr(0, showChar);
                   var h = content.substr(showChar, content.length - showChar);
                   var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
                   $(this).html(html);
               }
           });
           $(".morelink").click(function(){
               if($(this).hasClass("less")) {
                 $(this).removeClass("less");
                  $(this).html(moretext);
               } else {
                   $(this).addClass("less");
                   $(this).html(lesstext);
               }
               $(this).parent().prev().toggle();
               $(this).prev().toggle();
               return false;
           });


//----------------------------------------------------------------------------------------------
// MAP SETUP AND BASE LAYERS
//----------------------------------------------------------------------------------------------
var map = L.map('explore_map',{
  zoomControl: false
}).setView([0, 10], 4);

var url = 'https://geospatial.jrc.ec.europa.eu/geoserver/africa_platform/wms';
var countries=L.tileLayer.wms(url, {
  layers: 'africa_platform:ap_country_stats',
  transparent: true,
  format: 'image/png',
  opacity:'1',
  styles:'white_polygon_t',
  zIndex: 33
}).addTo(map);

//---------------------------------------------------------------
//  country LAYER - GET FEATUREINFO FUNCTION
//---------------------------------------------------------------
  map.on('click', function(e) {
     if (map.hasLayer(countries)) {
     var latlng= e.latlng;
     var url = getFeatureInfoUrl(map,countries,e.latlng,{'info_format': 'text/javascript',  'propertyName': 'iso2,name,cropid',
     'query_layers': 'africa_platform:ap_country_stats','format_options':'callback:getJson'});
      $.ajax({jsonp: false,url: url,dataType: 'jsonp',jsonpCallback: 'getJson', success: handleJson_featureRequest});
         function handleJson_featureRequest(data)
         {if (typeof data.features[0]!=='undefined'){var prop=data.features[0].properties; hi_highcharts_country(prop,latlng);}
             else {}
         }
       }
     });

  function getFeatureInfoUrl(map, layer, latlng, params) {
    var point = map.latLngToContainerPoint(latlng, map.getZoom()),size = map.getSize(),bounds = map.getBounds(),sw = bounds.getSouthWest(), ne = bounds.getNorthEast();
    var defaultParams = {request: 'GetFeatureInfo', service: 'WMS', srs: 'EPSG:4326', styles: '', version: layer._wmsVersion, format: layer.options.format, bbox: bounds.toBBoxString(),height: size.y,width: size.x,layers: layer.options.layers,info_format: 'text/javascript'};
    params = L.Util.extend(defaultParams, params || {});
    params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
    params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;
    return layer._url + L.Util.getParamString(params, layer._url, true);
  }

   function hi_highcharts_country(info,latlng){
  //   if (countries.wmsParams.styles=="white_polygon_t"){
     var iso2=info['iso2'];
     var name=info['name'];
     var popupContent = '<center><a class="country_pop_title" href="/country/'+iso2+'">'+name+'</a></center>';

     var popup = L.popup().setLatLng([latlng.lat, latlng.lng]).setContent(popupContent).openOn(map);
  // }
   //   else if (countries.wmsParams.styles=="ap_cropid"){
   //   var iso2=info['iso2'];
   //   var name=info['name'];
   //   var cropid=info['cropid'];
   //   var popupContent = '<center><a class="country_pop_title" href="/country/'+iso2+'">'+name+'</a></center><hr> \
   //   <table>\
   //     <tr>\
   //       <td>Crop coverage</td>\
   //       <td>'+Math.round(cropid* 100)/100+' %</td>\
   //     </tr>\
   //   </table><hr>';
   //
   //   var popup = L.popup().setLatLng([latlng.lat, latlng.lng]).setContent(popupContent).openOn(map);
   // }

}


var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution: ''});
var mbAttr = '', mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';
var grayscale  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: ''});
var esri = L.tileLayer('https://api.mapbox.com/styles/v1/wri/cism5nsz4007t2wnrp5xslf7s/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid3JpIiwiYSI6Ik9TY2w5RTQifQ.0HV7dQTjK40mk7GpNNA64g',{attribution: '', opacity: 1});
var streets  = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {subdomains: 'abcd',attribution: '', opacity: 1, maxZoom: 19});
var Black  = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {subdomains: 'abcd',attribution: '', opacity: 1, maxZoom: 19}).addTo(map);
var voyager  = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {subdomains: 'abcd', opacity: 1,attribution: '', maxZoom: 19,zIndex : 39
});
var topPane = map._createPane('leaflet-top-pane', map.getPanes().mapPane);
var topLayer =  L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_only_labels/{z}/{x}/{y}.png', {subdomains: 'abcd',opacity: 1, maxZoom: 19}).addTo(map);
var mask = L.tileLayer('https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/tms/1.0.0/africa_platform:world_flat_no_africa_no_eez@EPSG:900913@png/{z}/{x}/{y}.png', {tms: true,zIndex: 40, opacity: 1}).addTo(map)
  topPane.appendChild(topLayer.getContainer());
  topLayer.setZIndex(2);
  topPane.appendChild(mask.getContainer());
  mask.setZIndex(3);
$(window).on("resize", function() {  $("#explore_map").height($(window).height()-105).width($(window).width()); map.invalidateSize();}).trigger("resize");

// L.control.zoom({ position:'bottomright'}).addTo(map);
// Layers available
var baseMaps =    {'White': streets,'Black': Black,'Landscape': voyager,'Satellite': Esri_WorldImagery};

// Add LAYER SWITCHER to the map
// layerControl = L.control.layers(baseMaps, null,  {position: 'topright'}).addTo(map);

// map.on('zoomend', function () {
//
//     if (map.getZoom() >= 6 && map.hasLayer(Black)) {
//         map.removeLayer(Black);
//         map.addLayer(Esri_WorldImagery);
//
//     }
//     if (map.getZoom() <= 6 && map.hasLayer(Esri_WorldImagery))
//     {
//         map.addLayer(Black);
//         map.removeLayer(Esri_WorldImagery);
//
//     }
// });

//----------------------------------------------------------------------------------------------
// GRAB DATA FROM REST
//----------------------------------------------------------------------------------------------

setTimeout(function(){
    var url = 'http://esp2.jrc.it/layer_rest/layer_rest_service.jsonp'
    $.ajax({
        url: url,
        dataType: 'jsonp',
        success: function(d) {
        var title = [];
        var layer_id = [];
        var legend = [];
        var server_type = [];
        var wms_name = [];
        var wms_style = [];
        var wms_url = [];
        var first_color_legend = [];
        var second_color_legend = [];
        info=d;


        $.each(d, function (i, data) {


          if (data.server_type === "Geoserver") {

            objs[data.layer_id]=L.tileLayer.wms(''+data.wms_url+'/wms', {
              layers: data.wms_name,
              transparent: true,
              format: 'image/png',
              styles:data.wms_style,
              opacity:'1',
              zIndex: 32
            });


          }else if (data.server_type === "GeoWebCache") {

            objs[data.layer_id]=L.tileLayer(''+data.wms_url+'/gwc/service/tms/1.0.0/'+data.wms_name+'@EPSG:900913@png/{z}/{x}/{y}.png', {
              tms: true,
              zIndex: 32,
              opacity: 0.8
            });

          }else if (data.server_type === "Google") {
            objs[data.layer_id]=L.tileLayer('https://storage.googleapis.com/'+data.wms_name+'/{z}/{x}/{y}.png', {

              format: "image/png",
                zIndex: 32,
                opacity:'1'
            });

          }  else if (data.server_type === "Jeodpp") {
            objs[data.layer_id]=L.tileLayer(''+data.wms_url+'/services/ows/ts/'+data.wms_name+'',{
            format: "image/png",
            zIndex: 32,
            opacity:'1'
          });

        }else {

          }

          attach(data)

        });

        },
        error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
        }
      });
   }, 200);

// Grab country stats













//--------------------------------------------------------------------------------------------
// LOOP THROUGH LAYERS
//--------------------------------------------------------------------------------------------
function attach(props){

var layer_id = props.layer_id;
var title = props.title;
var legend =props.legend.value;
var stats_legend =props.stats_legend.value;
var wms_name = props.wms_name;
var server_type = props.server_type;
var wms_style = props.wms_style;
var wms_url = props.wms_url;
var first_color_legend = props.first_color_legend;
var second_color_legend = props.second_color_legend;

  $('#'+layer_id).unbind('click');
  $('#'+layer_id).click(function() {
  if (map.hasLayer(objs[layer_id])) {
      map.removeLayer(objs[layer_id]);
      $('#'+layer_id).html('<i class="material-icons">layers</i>');
      $('#'+layer_id).attr('style', 'background-color: #ffc107 !important');
      $('#'+layer_id+'_legend').remove()
      countries.setParams({CQL_FILTER:"iso2 LIKE '%%'"});
      countries.setParams({ styles:'white_polygon_t'});

  } else{
    map.addLayer(objs[layer_id]);

    $('#'+layer_id).html('<i class="material-icons">layers_clear</i>');
    $('#'+layer_id).attr('style', 'background-color: #b9c3ce !important');

    countries.setParams({ styles:'white_polygon_t'});
    $('.all_stats_legend').empty();
    countries.setParams({CQL_FILTER:"iso2 LIKE '%%'"});



    $('#legends').prepend('<div class= "legend_container" id ="'+layer_id+'_legend"><p>'+title+'</p>'+legend+'<div class = "slider_legend"><input type="text" value="100" id="slider_'+layer_id+'" data-slider-min="0" data-slider-max="100" data-slider-step="5" data-slider-value="100"></div><em class = "tools_legend_content"><i class="material-icons flip_to_front flip_to_front_'+layer_id+'">flip_to_front</i><i class="material-icons bar_chart bar_chart_'+layer_id+'">bar_chart</i><i class="material-icons cloud_download cloud_download_'+layer_id+'">cloud_download</i><i class="material-icons close close_'+layer_id+'">close</i><div class="refresh_legend_'+layer_id+'"></div></em><div id = "'+layer_id+'_stats_legend" class = "all_stats_legend"></div></div>')
                              var sliderVal;
                              $(function () {
                                  $('#slider_'+layer_id+'').bootstrapSlider().on('slide', function (ev) {
                                  sliderVal = ev.value;
                                  objs[layer_id].setOpacity(sliderVal/100);
                                  countries.setOpacity(sliderVal/100);
                                  });
                                  if (sliderVal) {
                                  $('#slider_'+layer_id+'').bootstrapSlider('setValue', sliderVal);
                                  }
                              });
                              function rangeSlider(sliderVal) {
                                  objs[layer_id].setOpacity(sliderVal)
                                  countries.setOpacity(sliderVal);
                              }
    }

      $('#legends').click(function(e){
        //console.log($(e.target).attr('class'))
            if ($(e.target).hasClass('close')){
                var container=$(e.target).parents().closest('.legend_container');
                  container.remove();
                  var container_id=container.attr('id').split('_legend')[0];
                  map.removeLayer(objs[container_id]);
                  $('#'+container_id).html('<i class="material-icons">layers</i>');
                  $('#'+container_id).attr('style', 'background-color: #ffc107 !important');
                  countries.setParams({CQL_FILTER:"iso2 LIKE '%%'"});
                  //countries.setParams({ styles:'white_polygon_t'});
      }
    })



    // flip to front
    setTimeout(function(){
      $('.flip_to_front_'+layer_id+'').click(function() {
        setTimeout(function(){
          $('#'+layer_id+'').click();
        }, 300);
        setTimeout(function(){
          $('#'+layer_id+'').click();
        }, 300);
        countries.setParams({ styles:'white_polygon_t'});
        $('.all_stats_legend').empty();
      });

      // remove layer from legend
      $('.close_'+layer_id+'').click(function() {
          $('#'+layer_id+'').click();
          countries.setParams({ styles:'white_polygon_t'});
      });




      // download ststistics
      $('.cloud_download_'+layer_id+'').click(function() {
        window.location = 'https://geospatial.jrc.ec.europa.eu/geoserver/wfs?request=getfeature&version=1.0.0&service=wfs&typename=africa_platform:ap_country_stats&propertyname=name,iso2,iso3,'+layer_id+'&SORTBY=iso2&outputFormat=csv'
      });

      // create country statistics
      setTimeout(function(){
        $('.bar_chart_'+layer_id).unbind('click');
          $('.bar_chart_'+layer_id).click(function() {
            if (countries.wmsParams.styles !=='ap_'+layer_id+''){
              countries.setParams({ styles:'ap_'+layer_id+''});
              countries.setParams({CQL_FILTER:"iso2 LIKE '%%'"});
              setTimeout(function(){
                $('#'+layer_id+'_stats_legend').html(stats_legend)

                setTimeout(function(){
                var country_stats_rest = 'https://geospatial.jrc.ec.europa.eu/geoserver/wfs?request=getfeature&version=1.0.0&service=wfs&typename=africa_platform:ap_country_stats&propertyname=name,iso2,iso3,cropid,lpid,agbid,popdensid,forestlossid,forestgainid,forestcoverid,waternetchangeid&SORTBY=iso2&outputFormat=application/json'; //get get_pa_water_stats
                $.ajax({
                    url: country_stats_rest,
                    dataType: 'json',
                    success: function(d) {
                          if (d.totalFeatures == 0) {
                          }else{
                            var iso2	= [];
                            var name	= [];
                            var bbox = [];
                            var indicator	= [];
                            var arr_data=[];

                            $(d.features).each(function(i, data) {
                              var obj={};
                              var properties=data.properties;
                              for (var prop in properties){
                                if(prop == layer_id){
                                  indicator.push(properties[prop]);
                                  obj.y=properties[prop];
                                }
                                  else if(prop == 'iso2'){
                                  iso2.push(properties[prop]);
                                  obj.iso2=properties[prop];
                                }
                                else if(prop == 'name'){
                                name.push(properties[prop]);
                                obj.name=properties[prop];
                              }
                              else if(prop == 'bbox'){
                              bbox.push(properties[prop]);
                              obj.bbox=properties[prop];
                            }
                                else {}
                              }
                                arr_data.push(obj);
                            });
                            arr_data.sort(function(a, b) {
                                return a.y- b.y;
                            })
                            var categories=[];

                            for (var p in arr_data)
                            {
                              categories.push(arr_data[p].name);
                            };
                            $('#'+layer_id+'_stats_legend').append('<div id ="chartDiv"></div> ');

                            if(arr_data[arr_data.length-1].y > 0){

                            $('#chartDiv').highcharts({
                                   chart: {
                                       type: 'column',
                                       events: {
                                            load: function() {
                                              var rainbow = new Rainbow();
                                              // Set start and end colors
                                              rainbow.setSpectrum(''+first_color_legend+'', ''+second_color_legend+'');

                                              // Set the min/max range
                                              var theData = this.series[0].data;
                                              var rangeLow = 0;
                                              var rangeHigh = theData.length
                                              rainbow.setNumberRange(rangeLow, rangeHigh);

                                              // Loop over data points and update the point.color value
                                              for (index = 0; index < theData.length; ++index) {

                                                this.series[0].data[index].update({
                                                  color: '#' + rainbow.colourAt(index)
                                                });
                                              }
                                            }
                                          },
                                       zoomType: 'xy',
                                       height:280,
                                       backgroundColor: 'rgba(0,0,0,0)'
                                   },
                                   title: {
                                       text: null
                                   },
                                   credits: {
                                       enabled: false,
                                   },
                                   xAxis: {
                                       categories: categories
                                   },
                                   yAxis: {
                                       title: {
                                           text: ''
                                       }
                                   },
                                   tooltip: {
                                      hideDelay: 500,
                                     useHTML: true,
                                        pointFormat: '<b>{point.y:.2f}</b><hr>',
                                      style: {
                                         pointerEvents: 'auto'
                                       },
                                      shared: true
                                   },
                                   plotOptions: {
                                     column: {
                                       pointPadding: 0.2,
                                       borderWidth: 0,
                                         turboThreshold: 20000,
                                         colorByPoint: true
                                     }
                                   },
                                   series:[{
                                    cursor: 'pointer',
                                    showInLegend: false,
                                    //color: '#f6ac07',
                                    data: arr_data,
                                    point: {
                                        events: {
                                            click: function() {
                                              var iso2filter = this.category

                                            var filterchart="name='"+iso2filter+"'";
                                             countries.setParams({CQL_FILTER:filterchart});
                                             console.log(this.bbox);
                                             var x1 = this.bbox[0];
                                             var x2 = this.bbox[1];
                                             var x3 = this.bbox[2];
                                             var x4 = this.bbox[3];

                                             map.fitBounds([
                                                [x2,x1],
                                                [x4,x3]
                                              ])

                                             // map.fitBounds([
                                             //    [-18.0378,11.6704],
                                             //    [-4.3894,24.0851]
                                             //  ])

                                             $('.refresh_legend_'+layer_id+'').empty().append('<i class="material-icons refresh refresh_'+layer_id+'">refresh</i>');
                                             // refresh stats after clicckin on bar
                                             setTimeout(function(){
                                             $('.refresh_'+layer_id+'').click(function() {
                                               setTimeout(function(){
                                                 $('.bar_chart_'+layer_id+'').click();
                                               }, 300);
                                               setTimeout(function(){
                                                 $('.bar_chart_'+layer_id+'').click();
                                                 $('.refresh_legend_'+layer_id+'').empty();
                                               }, 300);
                                             });
                                           }, 1000);
                                            }
                                        }
                                    }
                                   }]
                           });//chart
                         }else {
                           $('#chartDiv').hide();
                         }
                          }
                      },
                  });
                }, 100);

              }, 100);
              $('.all_stats_legend').empty();
              countries.setOpacity(100);
            }else{
              countries.setParams({ styles:'white_polygon_t'});
              $('#'+layer_id+'_stats_legend').empty();
            }
          });

    }, 100);


  }, 200)
  })


// Drag Legends
dragElement(document.getElementById("legends"));
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
} // END OF DRAG ELEMENT

} // END OF MAIN BLOCK (ATTACH FUNCTION)



//----------------------------------------------------------------------------------------------
// TRIGGER ACTIONS ON FILTERS
//----------------------------------------------------------------------------------------------

$( document ).bind('ajaxComplete', function() {
        $('#edit-title').attr("placeholder", "Search for datasets");
        $('.views-reset-button').show()

        $.each(info, function (i, data) {

          attach(data)



        if (map.hasLayer(objs.cropid)) {
          $("#cropid").html('<i class="material-icons">layers_clear</i>');
          $('#cropid').attr('style', 'background-color: #b9c3ce !important');
        }
        if (map.hasLayer(objs.lfid)) {
          $("#lfid").html('<i class="material-icons">layers_clear</i>');
          $('#lfid').attr('style', 'background-color: #b9c3ce !important');
        }
        if (map.hasLayer(objs.lpid)) {
          $("#lpid").html('<i class="material-icons">layers_clear</i>');
          $('#lpid').attr('style', 'background-color: #b9c3ce !important');
        }
        if (map.hasLayer(objs.agbid)) {
          $("#agbid").html('<i class="material-icons">layers_clear</i>');
          $('#agbid').attr('style', 'background-color: #b9c3ce !important');
        }
        if (map.hasLayer(objs.popdensid)) {
          $("#popdensid").html('<i class="material-icons">layers_clear</i>');
          $('#popdensid').attr('style', 'background-color: #b9c3ce !important');
        }
        if (map.hasLayer(objs.forestcoverid)) {
          $("#forestcoverid").html('<i class="material-icons">layers_clear</i>');
          $('#forestcoverid').attr('style', 'background-color: #b9c3ce !important');
        }
        if (map.hasLayer(objs.forestlossid)) {
          $("#forestlossid").html('<i class="material-icons">layers_clear</i>');
          $('#forestlossid').attr('style', 'background-color: #b9c3ce !important');
        }
        if (map.hasLayer(objs.forestgainid)) {
          $("#forestgainid").html('<i class="material-icons">layers_clear</i>');
          $('#forestgainid').attr('style', 'background-color: #b9c3ce !important');
        }
        if (map.hasLayer(objs.waternetchangeid)) {
          $("#waternetchangeid").html('<i class="material-icons">layers_clear</i>');
          $('#waternetchangeid').attr('style', 'background-color: #b9c3ce !important');
        }

        });

});
//----------------------------------------------------------------------------------------------
// END OF - TRIGGER ACTIONS ON FILTERS
//----------------------------------------------------------------------------------------------





}); // END OF DOCUMENT READY FUNCTION
})(jQuery); // END OF MAIN FUNCTION
