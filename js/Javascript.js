var res = new Array;
var bookingArray = new Array;
			
			
			function setCookie() {
			  var d = new Date();
			  d.setTime(d.getTime() + 10000);
			  var expires = "expires=" + d.toGMTString();
			  document.cookie = "username" + "=" + "shaun" + ";" + expires + ";path=/";
			  //document.getElementById('Language-Modal').style.display = 'none';
			}
			
			function getCookie() {
			  var name = "username" + "=";
			  var decodedCookie = decodeURIComponent(document.cookie);
			  var ca = decodedCookie.split(';');
			  for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
				  c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
				  return c.substring(name.length, c.length);
				}
			  }
			  return "";
			}

			function checkCookie() {
			  var user = getCookie();
			  if (user != "") {
				alert('cookie');				
				document.getElementById('Language-Modal').style.display = 'none';
				
			  }else{
				setCookie();
				alert('no cookie');
			  }
			}

function ScrollTop(){				
	window.scrollTo(0,0);
}

function showModal(id){
	document.getElementById(id).style.display = "block";
}
		
function hideModal(id){
	document.getElementById(id).style.display = "none";
}						

function callServer(){
		var str = 'email=' + document.getElementById('email').value;
		var EmailAddress = str.toLowerCase();
		const HTTP = new XMLHttpRequest();
		const Url = 'https://script.google.com/macros/s/AKfycby1Saj-ZdReD9Lj4UGwob5dYk8k345uVLrYtnJLzZbMNUgUmak/exec' + '?' + EmailAddress;
		var myCheckBoxList = '<ul>';				
						
		document.getElementById('response').innerHTML = 'Please wait while we retrieve your information';
		
		HTTP.responseType = 'text';
		HTTP.open('GET', Url, true);
		
		HTTP.onreadystatechange = function() {
			document.getElementById('response').innerHTML += '...';
			if(HTTP.readyState === 4 && HTTP.status === 200) {																				
				var JS_obj = JSON.parse(HTTP.response);
				var myLength = JS_obj.length;
				if(myLength === 0){
					document.getElementById('response').innerHTML = 'Email address not found </br> Please use email address sent upon confirmation of Save the date.';
				}else{								
					for(i = 0; i < myLength; i++) {							
						res.push(JS_obj[i]);
						var textnode = document.createTextNode(' ' + JS_obj[i]);
						var node = document.createElement('li');
						var checkbox = document.createElement('input');
						checkbox.type = 'checkbox';
						checkbox.id = 'list'+[i];
						checkbox.name = 'names';
						checkbox.value = 'name';
						
						node.appendChild(checkbox);
						node.appendChild(textnode);
						document.getElementById('checkboxlist').appendChild(node);
					}
					
					document.getElementById('page1').style.display = 'none';
					document.getElementById('page2').style.display = 'block';
					document.getElementById('page3').style.display = 'none';
					//res.forEach(addValues);					
					myCheckBoxList += '</ul>';
				}
			}
		}
									
		HTTP.send(Url);
}

function Submit(){
	const HTTP = new XMLHttpRequest();				
	var responsedata = '';
	var str = 'email=' + document.getElementById('email').value;
	var EmailAddress = str.toLowerCase();
	var text = '';
	var URL2 = '';
	var Allergies = '';
	var Song = '';
	
	
	if(document.getElementById('alergy').value != ''){
		Allergies = '&allergy=' + document.getElementById('alergy').value;
	}else{
		Allergies = '&allergy=none';
	}
	
	if(document.getElementById('song').value != ''){
		Song = '&song=' + document.getElementById('song').value;
	}else{
		song = '&song=none';
	}
	
	
	//document.getElementById('result').innerHTML = EmailAddress + Allergies + Song;
	var listlength = res.length;
	
	for(j = 0; j < listlength; j++){				
		var myBox = document.getElementById('list'+[j]);
		if (myBox.checked == true){
			responsedata = '&fname=' + res[j] + '&attend=yes';											
			text = text + responsedata;											
		}else{						
			responsedata = '&fname=' + res[j] + '&attend=no';
			text = text + responsedata;												
		}
	}
	
	URL2 = 'https://script.google.com/macros/s/AKfycby1Saj-ZdReD9Lj4UGwob5dYk8k345uVLrYtnJLzZbMNUgUmak/exec' + '?' + EmailAddress + text + Allergies + Song;
	document.getElementById('result').innerHTML = 'Please wait while we submit your details...';
	
	HTTP.responseType = 'text';
	HTTP.open('GET', URL2, true);
	
	HTTP.onreadystatechange = function() {
		document.getElementById('response').innerHTML += '...';
		if(HTTP.readyState === 4 && HTTP.status === 200) {						
			//var JS_obj = JSON.parse(HTTP.response);
			var returnText = HTTP.response;
			if(returnText === 'executed'){
				document.getElementById('page1').style.display = 'none';
				document.getElementById('page2').style.display = 'none';
				document.getElementById('page3').style.display = 'block';
			}else{
				document.getElementById('result').innerHTML = 'Error with your submission. Please refresh the page and try again';
			}
									
		}
	}											
	HTTP.send(URL2);
}			

function Confirm(){
	document.getElementById('Acc-Page1').style.display = 'none';
	document.getElementById('Acc-Page2').style.display = 'block';
	GetAcc();
}

function GetAcc(){								
	const HTTP = new XMLHttpRequest();
	const Url = 'https://script.google.com/macros/s/AKfycbxNweG_q2HfiY7UHUkn6DbNZJXeERGZvAUBlQTO6rHbYUNb15A/exec';
	var mySelectList = '<select name:"rooms" id="rooms">';				
					
	document.getElementById('Accresponse').innerHTML = 'Please wait while we retrieve the availible accommodation';
	
	HTTP.responseType = 'text';
	HTTP.open('GET', Url, true);
	
	HTTP.onreadystatechange = function() {
		document.getElementById('Accresponse').innerHTML += '...';
		if(HTTP.readyState === 4 && HTTP.status === 200) {
			document.getElementById('Accresponse').innerHTML = 'Please select the accomodation you would like to book?';
			var JS_obj = JSON.parse(HTTP.response);					
			var myLength = JS_obj.length;
			if(myLength > 0){						
				for(i = 0; i < myLength; i++) {							
					bookingArray.push(JS_obj[i]);							
					var node = document.createElement('option');
					var text = JS_obj[i];
					if(text === 'RIC-1' || text === 'RIC-4' || text === 'RIC-6'){
						node.textContent = 'Red Ivory Chalet (Sleeps 4 - Queen bed and 2 single beds (2 rooms) @ R 490 pppn)';
						node.value = JS_obj[i];
					} else if (text === 'RIC-2' || text === 'RIC-3' || text === 'RIC-5'){
						node.textContent = 'Red Ivory Chalet (Sleeps 4 - Queen bed and double sleeper (1 room) @ R 490 pppn)';
						node.value = JS_obj[i];
					} else if (text === 'BUN-1' || text === 'BUN-2' || text === 'BUN-3' || text === 'BUN-4' || text === 'BUN-5' || text === 'BUN-6'){
						node.textContent = 'Bungalows (Sleeps 4 - Queen bed and set of bunk beds @ R 390 pppn)';
						node.value = JS_obj[i];								
					} else if (text === 'BUN-7' || text === 'BUN-8' || text === 'BUN-9'){
						node.textContent = 'Bungalows (Sleeps 2 - Queen bed @ R 390 pppn)';
						node.value = JS_obj[i];								
					} else if (text === 'SAF-1' || text === 'SAF-2' || text === 'SAF-3' || text === 'SAF-4' || text === 'SAF-5' ){
						node.textContent = 'Safari tent (Sleeps 2 - R290 pppm)';
						node.value = JS_obj[i];								
					} else if (text === 'LR8-1' || text === 'LR8-2' || text === 'LR8-3' || text === 'LR8-4' || text === 'LR8-5' || text === 'LR8-6' || text === 'LR8-7' || text === 'LR8-8'){
						node.textContent = 'Loft room Single Bed (Sleeps 8 - 4 sets of bunk beds - R240 pppn)';
						node.value = JS_obj[i];								
					} else if (text === 'LR-1' ){
						node.textContent = 'Loft room (Sleeps 4 - 2 single beds and set of bunk beds - R240 pppn)';
						node.value = JS_obj[i];
					} else {
						node.textContent = JS_obj[i];
						node.value = JS_obj[i];
					}																												
					document.getElementById('selectbox').appendChild(node);	
					document.getElementById('Acclist').style.display = 'block';
				}
			}else{
				document.getElementById('Accresponse').innerHTML = 'Unfortunately all accommodation has been booked. </br> Please contact Angelique or Shaun for alternative arrangements';
				document.getElementById('SubmitButton').style.display = 'none';
			}
																									
		}
	}											
	HTTP.send(Url);
}

function NextPage(){
	document.getElementById('Acc-Page2').style.display = 'none';
	document.getElementById('Acc-Page3').style.display = 'block';
	document.getElementById('Selection').innerHTML = 'You have selected the: </br>';
	
	var mySelection = document.getElementById('selectbox');
	var text = selectbox.options[selectbox.selectedIndex].value;				
	if(text === 'RIC-1' || text === 'RIC-4' || text === 'RIC-6'){
		document.getElementById('Selection').innerHTML += 'Red Ivory Chalet (Sleeps 4 - Queen bed and 2 single beds (2 rooms) @ R 490 pppn)';
		document.getElementById('BookingGuest2').style.display = 'block';
		document.getElementById('BookingGuest3').style.display = 'block';
		document.getElementById('BookingGuest4').style.display = 'block';
	} else if (text === 'RIC-2' || text === 'RIC-3' || text === 'RIC-5'){
		document.getElementById('Selection').innerHTML += 'Red Ivory Chalet (Sleeps 4 - Queen bed and double sleeper (1 room) @ R 490 pppn)';					
		document.getElementById('BookingGuest2').style.display = 'block';
		document.getElementById('BookingGuest3').style.display = 'block';
		document.getElementById('BookingGuest4').style.display = 'block';
	} else if (text === 'BUN-1' || text === 'BUN-2' || text === 'BUN-3' || text === 'BUN-4' || text === 'BUN-5' || text === 'BUN-6'){
		document.getElementById('Selection').innerHTML += 'Bungalows (Sleeps 4 - Queen bed and set of bunk beds @ R 390 pppn)';												
		document.getElementById('BookingGuest2').style.display = 'block';
		document.getElementById('BookingGuest3').style.display = 'block';
		document.getElementById('BookingGuest4').style.display = 'block';
	} else if (text === 'BUN-7' || text === 'BUN-8' || text === 'BUN-9'){
		document.getElementById('Selection').innerHTML += 'Bungalows (Sleeps 2 - Queen bed @ R 390 pppn)';						
		document.getElementById('BookingGuest2').style.display = 'block';
	} else if (text === 'SAF-1' || text === 'SAF-2' || text === 'SAF-3' || text === 'SAF-4' || text === 'SAF-5' ){
		document.getElementById('Selection').innerHTML += 'Safari tent (Sleeps 2 - R290 pppm)';
		document.getElementById('BookingGuest2').style.display = 'block';
	} else if (text === 'LR8-1' || text === 'LR8-2' || text === 'LR8-3' || text === 'LR8-4' || text === 'LR8-5' || text === 'LR8-6' || text === 'LR8-7' || text === 'LR8-8'){				
		document.getElementById('Selection').innerHTML += 'Loft room Single Bed (Sleeps 8 - 4 sets of bunk beds - R240 pppn)';						
	} else if (text === 'LR-1' ){					
		document.getElementById('Selection').innerHTML += 'Loft room (Sleeps 4 - 2 single beds and set of bunk beds - R240 pppn)';
		document.getElementById('BookingGuest2').style.display = 'block';
		document.getElementById('BookingGuest3').style.display = 'block';
		document.getElementById('BookingGuest4').style.display = 'block';
	} else {
		document.getElementById('Selection').innerHTML = 'none';
	}
	
}

function SubmitAcc(){								
	var HTTP2 = new XMLHttpRequest();
	var Url = 'https://script.google.com/macros/s/AKfycbxNweG_q2HfiY7UHUkn6DbNZJXeERGZvAUBlQTO6rHbYUNb15A/exec';
	var EmailAddress = '&email=' + document.getElementById('Booking-Email').value;
	var Guest1 = document.getElementById('BookingGuest1Value').value;				
	var GuestContact = '&contact=' + document.getElementById('BookingContactValue').value;				
	var Guest2 = document.getElementById('BookingGuest2Value').value;
	var Guest3 = document.getElementById('BookingGuest3Value').value;				
	var Guest4 = document.getElementById('BookingGuest4Value').value;				
	var UnitNumber = '&unit=' + document.getElementById('selectbox').options[document.getElementById('selectbox').selectedIndex].value;
	var Duration = document.getElementById('DateSelect').options[document.getElementById('DateSelect').selectedIndex].value;				
	var Date = '';	
	var Nights = '';
	var Breakfast = '&breakfast=' + document.getElementById('BreakfastSelect').options[document.getElementById('BreakfastSelect').selectedIndex].value;
	
	if (Guest1 == ''){
		Guest1 = '';
	}else{
		Guest1 = '&guest1=' + document.getElementById('BookingGuest1Value').value;
	}
	
	if (Guest2 == ''){
		Guest2 = '';
	}else{
		Guest2 = '&guest2=' + document.getElementById('BookingGuest2Value').value;
	}
	
	if (Guest3 == ''){
		Guest3 = '';
	}else{
		Guest3 = '&guest3=' + document.getElementById('BookingGuest3Value').value;
	}
	
	if (Guest4 == ''){
		Guest4 = '';
	}else{
		Guest4 = '&guest4=' + document.getElementById('BookingGuest4Value').value;
	}
	
	if(Duration == 1){
		Date = '&date=26/04/2012';
		Nights = '&nights=2';
	}else{
		Date = '&date=27/04/2012';
		Nights = '&nights=1';
	}
	
	document.getElementById('SubmitLabel').innerHTML = 'Please wait while we submit your booking';
	Url += '?' + EmailAddress + Guest1 + GuestContact + Guest2 + Guest3 + Guest4 + UnitNumber + Date + Nights + Breakfast;
	//document.getElementById('SubmitLabel').innerHTML = Url;
	
	
	HTTP2.responseType = 'text';
	HTTP2.open('GET', Url, true);
	
	HTTP2.onreadystatechange = function() {
		document.getElementById('SubmitLabel').innerHTML += '...';
		if(HTTP2.readyState === 4 && HTTP2.status === 200) {						
			var text = HTTP2.response;
			
			if(text == 'confirmed'){
				document.getElementById('notify').innerHTML = 'Thank you for your booking. We look forward to seeing you there </br>Kuthaba Bush Lodge will be in touch with you with your invoice.</br></br>Please note that the booking will only be finalised once payment has been received by Kuthaba Bush Lodge';					
				
			}else {
				document.getElementById('notify').innerHTML = 'Oops... Something went wrong. Please refresh the page and try again.</br>We are sorry for the inconvenience.';					
			}		
		
																			
		}
		document.getElementById('Acc-Page3').style.display = 'none';
		document.getElementById('Acc-Page4').style.display = 'block';
	}											
	HTTP2.send(Url);				
}

