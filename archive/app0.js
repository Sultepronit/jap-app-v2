var main = function () {
	"use strict";
	console.log("Hello js!");
	
	/*const fccUrl = new URL("http://localhost:5050/go");
	console.log(fccUrl);*/
	
	/*$.get("http://localhost:5050/+++-").done(function () {
		console.log("Connected!");
	}).fail(function () {
		alert("No connection!");
	});*/
	
	/*$.get("http://localhost:5050/goo", function(data, status){
		alert("Data: " + data + "\nStatus: " + status);
	});
	
	$.get("http://localhost:5050/good");*/
	
	/*var my_awesome_script = document.createElement('script');
	my_awesome_script.setAttribute('src','http://localhost:5050/good+');
	document.head.appendChild(my_awesome_script);*/
	
	/*
	//function addScript( src, callback ) {
	var s = document.createElement( 'script' );
	s.setAttribute( 'src', 'http://localhost:5050/good+7' );
	s.onload = function () {
		console.log("Here!");
	};
	//s.onload=callback;
	document.body.appendChild( s );
	//}
	*/
	
	/*$.getScript("http://localhost:5050/good+111", function(){
		//alert("Running test.js");
		console.log("Success!");
	});*/
	
	function contactServer(mes) {
		var src = "http://localhost:5050/good" + mes;
		$.getScript(src, function(){
			console.log("Success!");
		}).fail(function () {
			//alert("No connection!");
		});
	}
	
	contactServer(77);
	
};
	
$(document).ready(main);
