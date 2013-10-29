function updatestatus(){
	//Show number of loaded items
	var totalItems=$('#gallery figure').length;
	$('#status').text('Loaded '+totalItems+' Items');
}
function ajaxProcess() {

var searchTerm = $("#term").val(); // get the user-entered search term
var URL2='http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e73c3c2e11d5780e5370d864dccff2cf&'; 
var tags="&tags="+ searchTerm;
var tagmode="&tagmode=any";
var jsonFormat = "&format=json";					
var ajaxURL= URL2+"per_page="+perpage+"&page="+currentPage+tags+tagmode+jsonFormat;
					//var ajaxURL= URL+"?"+tags+tagmode+jsonFormat;
					
				 $.ajax({
				  url:ajaxURL,
				  dataType:"jsonp",
				  jsonp:"jsoncallback",
				  success: function(data) {
					   // $("#photos").empty();	
						if(data.stat!="fail") {
							 console.log(data);	
							//$("#photos").empty();
							// $("figure").empty();
							$.each(data.photos.photo, function(i,photo) {
  							 // $("<figure></figure>").hide().append('<img src="http://farm'+photo.farm+'.static.flickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_q.jpg"/>').appendTo("#photos").fadeIn(2000);	
							  
							  var photoHTML="";
							  photoHTML+= "<figure> <img src='";
							  photoHTML+="http://farm"+photo.farm+".static.flickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_q.jpg'"; 
							  photoHTML+=" title='"+photo.title+"'" ;
							  photoHTML+="></figure>";
							   //photoHTML+="<figurecaption>"+photo.title+"</figurecaption><br>";
							  $("#gallery").append(photoHTML).fadeIn(200);
							  
							  
							});
							
						}else {
							 $("#gallery").empty();
							 console.log("Error code "+data.stat);
							 photoHTML="Error !! Error !! "+data.stat;
							 $("#gallery").append(photoHTML).fadeIn(200);
							 	
						}
						
					}
			     });
			    
	
}

var perpage=20;
var currentPage=1;

$(document).ready(function() {
	$("#gallery").empty();						  
	$("#submit").click(function (event) {
				if($("#term").val() !="" ){
				//$("#gallery").empty();	
				/**********************/
				updatestatus();
				ajaxProcess();
				/**************************/	
				}else {
					//$("#gallery").text("Please enter a keyword to search").fadeOut(2500);
					alert("Please enter a keyword to search");
				}
	});
	$("#clear").click(function(){
			$("#gallery").empty();				   
	});
	$("#gallery").scroll(function(){
					// check if we're at the bottom of the scrollcontainer
					 if ($(this)[0].scrollHeight - $(this).scrollTop() == $(this).outerHeight()) 
				   //if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10)
					 {  
					   // If we're at the bottom, retrieve the next page
						currentPage++;
						$("#submit").click();
						updatestatus();
					 // console.log("page "+currentpage);
				   }
				
	});
	

 
});



