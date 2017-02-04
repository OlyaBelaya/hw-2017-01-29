(function($){
"use strict"

var arrayOfDate = [];

$("#celsius").
		//css({
		//	background: "orange"
		//}).
		addClass("onClass");


let iconsObj = {
	"clear-day"  : "http://ярославль.name/images/pogoda.jpg",
	"clear-night": "http://ярославль.name/images/pogoda.jpg",
	"rain"       : "http://ярославль.name/images/pogoda.jpg",
	"snow"       : "http://ярославль.name/images/pogoda.jpg",
	"sleet"      : "http://ярославль.name/images/pogoda.jpg",
	"wind"       : "http://ярославль.name/images/pogoda.jpg",
	"fog"        : "http://ярославль.name/images/pogoda.jpg",
	"cloudy"     : "http://ярославль.name/images/pogoda.jpg",
	"partly-cloudy-day"  : "http://ярославль.name/images/pogoda.jpg",
	"partly-cloudy-night": "http://ярославль.name/images/pogoda.jpg"
};//hail,thunderstorm, tornado


let days = new Array("Воскресенье", "Понедельник", "Вторник", "Среда",
"Четверг", "Пятница", "Суббота");

navigator.geolocation.getCurrentPosition(onAllow, onError);

function onAllow(data) {

	let {latitude, longitude} = data.coords,
	baseUrl = "https://api.darksky.net/forecast",
	api = "4df63960782f68b042151e368ffffdd5";

//let script = document.createElement("script");
//script.src = `${baseUrl}/${api}/${latitude}, ${longitude}`;


$.ajax({
	//url: "https://api.darksky.net/forecast/4df63960782f68b042151e368ffffdd5/37.8267,-122.4233"
	url: `${baseUrl}/${api}/${latitude}, ${longitude}`,
	dataType: "jsonp",
	success(data){
	
		arrayOfDate = data.daily.data.slice(0,4);
			console.log(arrayOfDate);
		initButton(arrayOfDate);
	},
	
});

}


function onError() {
	$("#current-container").append(`
		<p> Unable to get location </p> 
		`)
}

function formatDate(timestamp, short){
	let date = new Date(timestamp*1000);
	//console.log(date);
	if (short) {	return `${String(date.getDate()).length > 1 ? 
			date.getDate() : "0" + date.getDate()}.${String((date.getMonth()+1)).length > 1 ? 
				(date.getMonth()+1) : "0" + (date.getMonth()+1)}`;
			}
			else{return date};
}

function findImage(img){
for (let key in iconsObj) {
	if (key == img) {
		return iconsObj[key];
	}
}
}

function convertMeasure(measure){
	let pTemp = $(".temperature");

	let temp = 0;

	 $(".temperature").each(function(){

         temp = Number($(this).attr("value"));
         if (measure == "celsius"){
         $(this).empty();	
		$(this).text(Math.round((temp - 32)/1.8)); 
	} else {
		 $(this).empty();	
		 $(this).text(Math.round(temp));
	//	$(this).text(Math.round((temp*1.8) + 32)); 
	}
    });
}


function initButton(arr){
	let i = 0;
	let far = 0;
		arr.forEach((el) => {
			i++;
			console.log(el);
			far = (el.temperatureMax + el.temperatureMax)/2;
	
$("#overview-container").
append(`
	
	<button id="button${i}">
	<strong>${formatDate(el.time, true)}</strong>
	<br>
	<img src="${findImage(el.icon)}">
	<p class="temperature" value="${far}">${Math.round(far)}</p>
	</button>
	`)
$("#button1").addClass("currently");
drawingView(arr[0]);
});
	convertMeasure("celsius");	
	$("#button1").addClass("currently");
}

function drawingView(item){
	let far = (item.temperatureMax + item.temperatureMax)/2;
	let time =formatDate(item.time, false); 
	$("#current-container").remove();
	$("body").append(`<div id="current-container">
		<strong> ${String(time.getDate()).length > 1 ? 
			time.getDate() : "0" + time.getDate()}.${String((time.getMonth()+1)).length > 1 ? 
				(time.getMonth()+1) : "0" + (time.getMonth()+1)}.${time.getFullYear()}</strong>
	<br>
	<strong>${days[time.getDay()]}</strong>
	<br>
	<p class="temperature" value="${far}">${Math.round(far)} </p>
	<img src="http://ярославль.name/images/pogoda.jpg">
	</div>`);
	if ($("#celsius").hasClass("onClass")) {
		convertMeasure("celsius");	
    	};
	

}


$("body").on('click', '#button1', function(){
	//console.log(arrayOfDate[0]);
   $("#button2").removeClass("currently"); 
   $("#button3").removeClass("currently"); 
   $("#button4").removeClass("currently");
   $("#button1").addClass("currently");
   drawingView(arrayOfDate[0]);
});

$("body").on('click', '#button2', function(){
   $("#button1").removeClass("currently"); 
   $("#button3").removeClass("currently"); 
   $("#button4").removeClass("currently");
   $("#button2").addClass("currently");
   drawingView(arrayOfDate[1]);
});

$("body").on('click', '#button3', function(){
     $("#button1").removeClass("currently"); 
   $("#button2").removeClass("currently"); 
   $("#button4").removeClass("currently");
   $("#button3").addClass("currently");
   drawingView(arrayOfDate[2]);
});

$("body").on('click', '#button4', function(){
    $("#button1").removeClass("currently"); 
   $("#button2").removeClass("currently"); 
   $("#button3").removeClass("currently");
   $("#button4").addClass("currently");
   drawingView(arrayOfDate[3]);
});


$("#celsius").click(function(ev){
	ev.preventDefault();
    if ($("#celsius").hasClass("onClass")) {return;}
       else{	$("#celsius").addClass("onClass");	
        };
    if ($("#fahrenheit").hasClass("onClass")) {
    	$("#fahrenheit").removeClass("onClass");
    }
    convertMeasure("celsius");	
});

$("#fahrenheit").click(function(ev){

	ev.preventDefault();
    if ($("#fahrenheit").hasClass("onClass")) {return;}
       else{	$("#fahrenheit").addClass("onClass");	
        };
    if ($("#celsius").hasClass("onClass")) {
    	$("#celsius").removeClass("onClass");
    }
	convertMeasure("fahrenheit");	
});


})(jQuery);
