
var create_graph;
//Flot options
// $(document).bind('leaflet.map', function(e, map, lMap) 
$=jQuery;


(function ($) {
create_graph=function(d_inicio,d_final)
{

  function showTooltip(x, y, contents, color) {
		    	//<![CDATA[
		    	$('<div id="tooltip">' + contents + '<\/div>').css( {
		            position: 'absolute',
		            display: 'none',
		            top: y + 5,
		            left: x + 5,
		            border: '2px solid  black',
		            padding: '6px',
		            'background-color': color,
		            'font-weight': 'bold',
		            'font-size': '0.8em',
		            color: 'black',
		            '-moz-border-radius': '4px',
	                '-webkit-border-radius': '4px',
		            opacity: 0.80
		        }).appendTo("body").fadeIn(200); 
		    	//]]> 
		    }
 			var previousPoint = null;
		    
		    $("#placeholder").bind('plothover', function(event, pos, item) {
		    	
		    	var _n_comun=dates[0]['data'][item.dataIndex][2];
		    
		         if (item) {
	                if (previousPoint != item.datapoint) {
	                    previousPoint = item.datapoint;
	                    
	                    $("#tooltip").remove();
	                    var x = item.datapoint[0].toFixed(1),
	                        y = item.datapoint[1].toFixed(1);
	                    
	                
						var date= new Date(item.datapoint[0]);

						var myDate=(date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
						//item.series.data[item.dataIndex][3]
						//s'ha de canviar, en referència a la mesura de variable que correspongui
	                    showTooltip(item.pageX, item.pageY,myDate+ ":&nbsp;&nbsp;<b>" + y + "</b> registros de <b>"+_n_comun+'</b>', item.series.color);
	                }
	            }
	            else {
	                $("#tooltip").remove();
	                previousPoint = null;            
	            }
	           
		    });

 $('.views-table').tableExport({type:'csv',escape:'false',_time:true,save:true}); 

 $.ajax({
                         url : 'http://bopa.geo.gob.bo/get_dates_csv2.php'+'?data_url=fauna_csv_export',
                      //    url : 'http://bopa.geo.gob.bo/aemet_pere/test_dates.csv',
                          dataType : 'json',
                         
                          success : function (data) 
                          {
							dates=[{
							
							  data:[]
							}]
	                       
	                      console.warn(data)

	                          $.each(data,function (i,d)
	                          {
	                          	dates[0]['data'].push(d);
	                          })
	                          
	                          var placeholder=$("#placeholder");
//console.warn(dates)
	/*
	$.plot("#placeholder", dates, {
				xaxis: {
					mode: "time",
					min: (new Date(d_inicio, 0, 1)).getTime(),
					max: (new Date(d_final, 0, 1)).getTime()
				},
				hoverable: true,
		        mouseActiveRadius: 50,
				 selection: { mode: "x" },
grid: { clickable: false,hoverable:true},
                points: { show: true },
                lines: { show: true }

			});
	*/
						//	  var plot = $.plot(placeholder,, options);
                        }
                      })
}
//create_graph();




setTimeout(create_graph(2009,2016),1000);

setTimeout( function ()
	{
		$('body').on('click',function(e,target)
			{
				 if ($(e.target).attr('id')=='exec_graph')
				 {


					var d_inicial=$('#edit-date-filter-min-year').val();
					

					var d_final=$('#edit-date-filter-max-year').val();
					if (d_inicial=='')
					{
						create_graph(2009,2016);
					}	
					else
					{

						
								create_graph(d_inicial,d_final);
					}
				}
			})
	},2000);

})(jQuery)



