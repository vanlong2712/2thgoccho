$( document ).ready(function() {
       $("#selectDistrict").prop("disabled", true).css({backgroundColor:'#CCCCCC'});

        $("#selectSuburb").prop("disabled", true).css({backgroundColor:'#CCCCCC'});;
$('#selectCity').on('change', function() {
    if (this.value == '0') {
    	$("#selectDistrict").html('');
    	$("#selectSuburb").html('');
	      $("#selectDistrict").prop("disabled", true).css({backgroundColor:'#CCCCCC'});;
          $("#selectSuburb").prop("disabled", true).css({backgroundColor:'#CCCCCC'});;
	    }

	 else if(this.value=='1')
     {
     	var a=this.value;
     	var idCity=this.value;
     	 $("#selectDistrict").prop("disabled", false).css({backgroundColor:'white'});     
     	$("#selectSuburb").prop("disabled", true).css({backgroundColor:'#CCCCCC'});;
     			$.ajax({
     			url:'/listDistricts',
     			method:'POST',
			contentType:'application/json',
			data:JSON.stringify({data:idCity}),
			success:function(response)
			{

				$('#selectDistrict').html('');
				var toAppend='';
								   	  $('#selectDistrict').append('\<option value=0 selected>All District</option>');
				   $.each(response,function(i,o){
				   	  $('#selectDistrict').append('\
				   	  <option idCity='+o.idCity+'  value='+o.idDistrict+' >'+o.name+'</option>');
         			  // toAppend += '<option idCity='+o.idCity+'  value='+o.idDistrict+' >'+o.name+'</option>';

				   });
				


			}
			});

		$('#selectDistrict').on('change', function() {
			     	$("#selectSuburb").prop("disabled", false).css({backgroundColor:'white'});;

			var idDistrict=this.value;
     			$.ajax({
     			url:'/listSuburbs',
     			method:'POST',
			contentType:'application/json',
			data:JSON.stringify({data:idDistrict}),
			success:function(response)
			{
				$('#selectSuburb').html('');
				var toAppend='';
				   $.each(response,function(i,o){
         			  toAppend += '<option value='+o.idSuburb+'>'+o.name+'</option>';

				   });
				  $('#selectSuburb').append(toAppend);


			}	
			});
     			var idCity=$('#selectCity').val();
console.log(idCity);
var idDistrict=$('#selectDistrict').val();
console.log("id cua district"+idDistrict);
var idSuburb=$('#selectSuburb').val();
console.log('id cua suburb'+idSuburb);
	 
			});


     			

     }
     else
     {
     	       $("#selectDistrict").prop("disabled", true);
        $("#selectSuburb").prop("disabled", true);
     }

});

});