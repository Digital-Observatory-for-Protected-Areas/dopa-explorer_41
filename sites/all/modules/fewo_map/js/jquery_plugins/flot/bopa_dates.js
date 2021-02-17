
var create_graph;
//Flot options
// $(document).bind('leaflet.map', function(e, map, lMap) 
$=jQuery;

 function pad(n){return n<10 ? '0'+n.toString() : n.toString()}


        var g_dates= function (raw_date)
            {
                var date=raw_date.toString();
              //  console.log(raw_date)
                var year=date.substring(0,4)
                var month=date.substring(4,6)
                var day=date.substring(6,8)
               // console.info(year+'-'+month+'-'+day)
                return Date.parse(year+'-'+month+'-'+day)/1000
            }

        //being raw_date=20121111 on fires.js
        //aqui, 17/03/2015

      	var g_month_year= function (raw_date)
            {
                var date=raw_date.toString().split('/');

                var year=date[2];
                var month=date[1];
                var daty=date[0];

                return year+'_'+month;
            }
       	var g_year= function (raw_date)
            {
                var date=raw_date.toString();
              //  console.log(raw_date)
                var year=date.substring(0,4);
                var month=date.substring(4,6)
               
               // console.info(year+'-'+month+'-'+day)
                return year;
            }
        var monthNames = {
          '01':  'Enero',
          '02':  'Febrero',
          '03':    'Marzo',
          '04':  'Abril',
          '05':'Mayo',
          '06':'Junio',
          '07':'Julio',
          '08':'Agosto',
          '09':'Septiembre',
          '10':'Octubre',
          '11':'Noviembre',
          '12':'Diciembre'
        };


(function ($) {

//$('.feed-icon').attr('href');
/*
 $.ajax({
                          url : 'http://bopa.geo.gob.bo/get_csv.php'+'?data_url='+url,
                          dataType : 'text',
                         
                          success : function (response) 
                          {
                          this_a.attr('href','http://bopa.geo.gob.bo/csv/csv_export/shp_export.zip')
                          this_a[0].click();
                        }
                      })
*/
create_graph=function(d_inicio,d_final,type)
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
		   // 	console.warn(item);
		    	

		    	var _n_comun=arr[0]['data'][item.dataIndex][2];
		    
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
                         url : 'http://bopa.geo.gob.bo/get_dates_csv2.php?data_url=feeds_fauna_csv_fechas&type='+type,
                      //    url : 'http://bopa.geo.gob.bo/aemet_pere/test_dates.csv',
                          dataType : 'json',
                         
                          success : function (data) 
                          {
							
	                      console.warn(data)
	                      if (type=='complex')
	                      {

	                      	 arr=[];
	                          $.each(data,function (i,d)
	                          {
	                          	
	                          	var _o={data:d.data,label:i+' ('+d.sum+')',sum:d.sum};
	                          	arr.push(_o);
	                          //	dates[0]['data'].push(d);
	                          })
	                          arr.sort(function(a, b) {
												    return parseFloat(b.sum) - parseFloat(a.sum);
												});
	                          var placeholder=$("#placeholder");
	                          console.info(arr);
	                          options={
									xaxis: {
										mode: "time",
										min: (new Date(d_inicio, 0, 1)).getTime(),
										max: (new Date(d_final, 0, 1)).getTime()
									},
									 legend: {
                              show:true,
                              container: $('#filter_results')
                              },  
									hoverable: true,
							        mouseActiveRadius: 50,
									 selection: { mode: "x" },
									grid: { clickable: false,hoverable:true},
					                points: { show: true },
					                lines: { show: true }

								}

	                        }
	                        else
	                        {
	                        	 arr=[{
								   		hoverable: true, clickable: true, autoHighlight: true,
								       //  tooltip: true,
								      
								        bars: {
								                show: true,
								                barWidth: 0.4,
								                align: "left"
								            },
							          xaxis: {
							            labelAngle: 120
							        },

						           data:[]						   
								  }];
			                      
			                      var arr_months=[];
			                      var arr_months2=[];
			                      var _months_obj={};

		                          $.each(data,function (i,d)
		                          {
		                          //	arr[0]['data'].push(d);

		                          	var _month_year=g_month_year(d[3]);

		                          	if (_month_year!=='undefined_undefined')
											    {
		                          					if ($.inArray(_month_year,arr_months)==-1)
											                {
											                	
											                    arr_months.push(_month_year);
											                    _months_obj[_month_year]=[_month_year,parseInt(d[1])];

											                  //  _months_obj[_month_year].push({fecha:_month_year,count:1});


											                }
											                else
											                {
											                	
											                	//_months_obj[_month_year].count+=1; //????
											                	_months_obj[_month_year][1]+=parseInt(d[1]);
											                	
											             
											               }
											            }
		                          	//	arr[0]['data'].push(arr_months);
		                          
		                          });

		                          for (var p in _months_obj)
		                          {
		                          	arr_months2.push(_months_obj[p])
		                          }
		                          
		                          	arr[0]['data']=arr_months2;
		                      //  var _o={data:[d]}
			                      options={ 
			                      	 bars: {
						                show: true,
						                barWidth: 0.4,
						                align: "left"
						            },
						            
						        series: {
						            bars: {
						                show: true,
						                barWidth: 0.6,
						                align: "center"
						            }
						        },
						        xaxis: {
						            mode: "categories",
						            tickLength: 0

						        },
						  /*
											xaxis: {
												mode: "time",
												minTickSize: [1, "year"],
												min: (new Date(d_inicio, 0, 1)).getTime(),
												max: (new Date(d_final, 0, 1)).getTime()
											},
											*/
											hoverable: true,
									    //    mouseActiveRadius: 50,
										//	selection: { mode: "x" },
											grid: { clickable: false,hoverable:true}
										//	points: { show: true },
										//	lines: { show: true }
										};
	                        }

/*
	                          var plot = $.plot("#placeholder", [
			{ data: [[30,1],[20,2]], label: "sin(x)"},
			{ data: cos, label: "cos(x)"}
		],
*/
//console.warn(dates)

console.dir(arr);
	$.plot("#placeholder", arr, options);

	 plotAccordingToChoices=function() {


//console.info('according f()')//
			var data = [];
		
			$('#filter_results tr.selected').each(function () {
				var key = $(this).attr("name");//.split('(')[0]);
			
				//$.trim(t.split('(')[0])

					for (o in arr)
						{
						  console.info(arr[o].label)
					//	  console.info(name)
						  	console.log(key)
						  	 if (key==arr[o].label){
						                    	data.push(arr[o]);
						                    	console.log('pushed'+key)
						                    }
						                    /*
						  for (name in arr[o]) {
						  	
						                if (arr[o].hasOwnProperty(name)) {
						                    if (key==name){
						                    	data.push(arr[o]);
						                    	console.log('pushed'+key)
						                    }
						                }
						                */
							}
						

				//if (key && arr[0][key]) {
				//	data.push(arr[0][key]);
					
			});
		//	console.warn(data)
			if (data.length > 0) {
				alert('replot')
					$.plot("#placeholder", data, options);
			}
			console.info(arr);
		}



						//	  var plot = $.plot(placeholder,, options);
                        }
                      })
}
//create_graph();

setTimeout(create_graph(2011,2016,'simple'),3000);

	

setTimeout( function ()
	{

		
$('#filter_results').on('click','tr',function ()
		{
			alert('filter funcion')
			$this=$(this);

			if ($this.hasClass('selected'))
				$this.removeClass('selected').addClass('non_selected')
			else
				$this.addClass('selected').removeClass('non_selected')

			plotAccordingToChoices();
		})
		$('body').on('click',function(e,target)
			{
				 if ($(e.target).attr('id')=='exec_graph_simple')
				 {
				 	$('button').removeClass('selected');
				 	$(e.target).addClass('selected');
				 	$(e.target)
					var d_inicial=$('#edit-date-filter-min-year').val();
					

					var d_final=$('#edit-date-filter-max-year').val();
					if (d_inicial=='')
					{
						create_graph(2011,2016,'simple');
					}	
					else
					{

						
								create_graph(d_inicial,d_final,'simple');
					}
				}

					 if ($(e.target).attr('id')=='exec_graph_complex')
				 {

				 	$('button').removeClass('selected');
				 	$(e.target).addClass('selected');
				 	
					var d_inicial=$('#edit-date-filter-min-year').val();
					

					var d_final=$('#edit-date-filter-max-year').val();
					if (d_inicial=='')
					{
						create_graph(2011,2016,'complex');
					}	
					else
					{

						
								create_graph(d_inicial,d_final,'complex');
					}
				}


			})
	},2000);

})(jQuery)



