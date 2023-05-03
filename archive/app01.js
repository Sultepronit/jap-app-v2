function randomFromRange(from, to) {
	return Math.round((Math.random() * (to - from)) + from);
}

function contactServer(mes) {
	var src = "http://localhost:5050/" + mes;
	$.getScript(src, function(){
		//console.log("Success!");
	}).fail(function () {
		//alert("No connection!");
		console.log("No connection!");
	});
}

var rn = 0;
var writings;

$(document).on("keypress", function (event) {
		console.log(event.keyCode);
		/*console.log(event.code);
		console.log(event.key);*/
		$(".control").text(event.key);

		switch(event.keyCode) {
			case 97: 
				playSound(wordsDb[rn].tsc, writings.mainWritings[0]);
				break;
			case 13: 
				//pressedEnter();
				main();
				break;
			case 103:
				pressedG();
				break;
			case 98:
				pressedB();
				break;
			case 110:
				pressedN();
				break;
			case 127: 
				pronunciation3();
				break;
		}

	});

var main = function () {
	"use strict";
	console.log("Hello js!");
	
	//$("body").append(wordsDb[3]);
	//$("div").append(wordsDb[3]);
	//$("div").append("!!!");
	//var rn = randomFromRange(0, wordsDb.length -1);
	rn = randomFromRange(0, wordsDb.length -1);
	
	console.log(wordsDb[rn]);
	console.log(wordsDb[rn].w);
	
	//var writings = decomposeWritings(wordsDb[rn]);
	writings = decomposeWritings(wordsDb[rn]);
	
	//$('.word').text(writings.allWritings);
	$('.word').replaceWith('<p class="word">' + writings.allWritings + '</p>');
	$('.transcription').text(wordsDb[rn].tsc);
	$('.translation').replaceWith('<p class="translation">' + wordsDb[rn].tsl + '</p>');
	
	//playSound(wordsDb[rn].tsc[0], writings.mainWritings[0]);
	playSound(wordsDb[rn].tsc, writings.mainWritings[0]);
	
	insertGifs(writings.allKanji);
	
	var message = "SW?id=" + rn + "&s=" + wordsDb[rn].s + "&f=" + wordsDb[rn].f + "&b=" + wordsDb[rn].b;
	message += "&ff=" + wordsDb[rn].ff + "&bb=" + wordsDb[rn].bb;
	console.log(message);
	
	contactServer(message);
	
};
	
$(document).ready(main);
