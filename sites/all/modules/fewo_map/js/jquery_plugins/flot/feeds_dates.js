
var create_graph,arr;
//Flot options
// $(document).bind('leaflet.map', function(e, map, lMap) 
$=jQuery;
alert('safdsafd')
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
                var day=date[0];

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






$('.feed-icon a').attr('href');
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

//create_graph();

function attach_graphs()
{
/*
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
*/
		$('#time_graphs').on('click',function(e,target)
			{
alert('click time')
 
				var $target=$(e.target);

				if ($target.is('button'))
				{
				
					var csv_fechas_url;
                  
                  $('.feed-icon a').each(function ()
                       {
                           if ($(this).attr('href').match('feeds_fauna_csv_fechas'))
                           {
                              csv_fechas_url=$(this).eq(0).attr('href');//.split('?q=')[1];

                            csv_fechas_url=csv_fechas_url.split('?q=')[1];
                            alert(csv_fechas_url)
                          }
                       })


                 		//group by month!!
						if ($target.attr('id')=='exec_graph_simple')
						 {
						 	 var url = 'http://bopa.geo.gob.bo/get_csv_fechas.php?data_url='+csv_fechas_url+'&to_plot=field_fauna_fecha,field_fauna_nombre_comun';
                  			csv_fechas_url=url.replace(/&/g, '*');

						 	$('button').removeClass('selected');
						 	$target.addClass('selected');
						 	
							var d_inicial=$('#edit-date-filter-min-year').val();
						
							var d_final=$('#edit-date-filter-max-year').val();
							if (d_inicial=='')
							{
								create_graph(2011,2016,'simple',csv_fechas_url);
							}	
							else
							{

								
								create_graph(d_inicial,d_final,'simple',csv_fechas_url);
							}

					
						 }

						if ($target.attr('id')=='exec_graph_complex')
						    {

							var time_to_plot=$('#time_graph_params option:selected').attr('class');
							//console.info($('#time_graph_params option:selected').attr('class'));

						    var url = 'http://bopa.geo.gob.bo/get_csv_fechas.php?data_url='+csv_fechas_url+'&to_plot=field_fauna_fecha_1,'+time_to_plot;
                			csv_fechas_url=url.replace(/&/g, '*');

						 	$(this).find('button').removeClass('selected');
						 	$target.addClass('selected');
						 	
							var d_inicial=$('#edit-date-filter-min-year').val();
							

							var d_final=$('#edit-date-filter-max-year').val();
							if (d_inicial=='')
							{
								console.log('setting 2011 and 2016 dates')
								create_graph(2011,2016,'complex',csv_fechas_url);
							}	
							else
							{
								create_graph(d_inicial,d_final,'complex',csv_fechas_url);
							}
						}
					}


			})
}

create_graph=function(d_inicio,d_final,type,csv_fechas_url)
{

  				 


               //   create_graph(2011,2016,type,csv_fechas_url);

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
		   // $("#time_graph_placeholder").width('65%')
		  
		    $("#time_graph_placeholder").bind('plothover', function(event, pos, item) {
		   // 	console.warn(item);
		    	
		   //		console.info(item)

		    
		         if (item) {
	                if (previousPoint != item.datapoint) {
	                    previousPoint = item.datapoint;
	                    
	                    $("#tooltip").remove();
	                    var x = item.datapoint[0].toFixed(1),
	                        y = item.datapoint[1].toFixed(1);
	                    
	                /*
						var date= new Date(item.datapoint[0]);

						var myDate=(date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
						*/

				if (type=='complex')
		   		{
		   			var date= new Date(item.series.data[item.dataIndex][0]);

					var myDate=date.getDate() + '/' +(date.getMonth() + 1) +'/'+ date.getFullYear();
		   			var _n_comun=item.series.n_comun;
		   			    showTooltip(item.pageX, item.pageY,myDate+ ":&nbsp;&nbsp;<b>" + y + "</b> registros de <b>"+_n_comun+'</b>', item.series.color);
		   		}
		    	else
		    	{
		    		var myDate=item.series.data[item.dataIndex][0];
		    		    showTooltip(item.pageX, item.pageY,myDate+ ":&nbsp;&nbsp;<b>" + y + "</b> registros en este mes<b>", item.series.color);
		    	}
						//s'ha de canviar, en referència a la mesura de variable que correspongui
	                
	                }
	            }
	            else {
	                $("#tooltip").remove();
	                previousPoint = null;            
	            }
	           
		    });

 //$('.views-table').tableExport({type:'csv',escape:'false',_time:true,save:true}); 

 
              

                 //  alert('http://bopa.geo.gob.bo/get_csv_fechas.php?data_url='+csv_fechas_url+'&to_plot=field_fauna_fecha,field_fauna_nombre_comun&type='+type);
				 //alert(csv_fechas_url)
				   $.ajax({
                         url : csv_fechas_url+'&type='+type,
                      //    url : 'http://bopa.geo.gob.bo/aemet_pere/test_dates.csv',
                          dataType : 'json',
                         
                          success : function (data) 
                          {
							
	                     // console.warn(data)
	                    
	                      if (type=='complex')
	                      {


	                      	arr=[];
	                          $.each(data,function (i,d)
	                          {
	                          	
	                          	var _o={data:d.data,label:i+' ('+d.sum+')',sum:d.sum,n_comun:i};
	                          	arr.push(_o);
	                          //	dates[0]['data'].push(d);
	                          })
	                          arr.sort(function(a, b) {
												    return parseFloat(b.sum) - parseFloat(a.sum);
												});
	                        //  var placeholder=$("#placeholder");
	                        //  console.info(arr);
	                          options={
									xaxis: {
										mode: "time",
										min: data.min_time,
										max: data.max_time
									},
									 legend: {
                              show:true,
                              container: $('.legend')
                              },  
									hoverable: true,
							        mouseActiveRadius: 50,
									 selection: { mode: "x" },
									grid: { clickable: false,hoverable:true},
					                points: { show: true },
					                lines: { show: true }

								}

							console.warn(data.min_time);
							$.plot("#time_graph_placeholder", arr, options);

	                        }
	                        else
	                        {
	                        	//SIMPLE, BY MONTHS
	                        	 arr=[{
								       bars: {
                                  show: true,
                                  barWidth: 0.4,
                                  align: "center"
                              },
						           data:[]						   
								  }];
			                      
			                      var arr_months=[];
			                      var arr_months2=[];
			                      var _months_obj={};

		                          $.each(data,function (i,d)
		                          {
		                          //	arr[0]['data'].push(d);

		                          	//var _month_year=g_month_year(d[2]);
		                          	var _month_year=d[3];

		                          	if (_month_year!=='undefined_undefined')
											    {
		                          					if ($.inArray(_month_year,arr_months)==-1)
											                {
											                	
											                    arr_months.push(_month_year);
											                    _months_obj[_month_year]=[_month_year,parseInt(d[1])];
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
			                       
						        series: {
						            bars: {
						                show: true,
						                barWidth: 0.6,
						                align: "center"
						            }
						        },
						       
							        xaxis: {
		                              mode: "categories",                            
		                              rotateTicks: 125

                       
                                  },
						 
											grid: { clickable: true,hoverable:true,   
         
                tickColor:                        '#2f4f4f',
                labelMargin: 10,
                axisMargin:  10 
            }
        }
										//	points: { show: true },
										//	lines: { show: true }
									

								  $.plot("#time_graph_placeholder", arr, options);
	                        }

						                        }
                      })
}

		





