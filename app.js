"use strict";

var progress = '';
var direction = '';

var sessionLength = sessionList.length;

function randomFromRange(from, to) {
	return Math.round((Math.random() * (to - from)) + from);
}

function deleteRandomFromArray(array) {
	var index = randomFromRange(0, array.length - 1);
	var re = array[index]
	array.splice(index, 1);
	return re;
}

function contactServer(mes) {
	var src = "http://localhost:5050/" + mes;
	$.getScript(src, function(){
		//console.log("Success!");
	}).fail(function () {
		alert("No connection!");
		//console.log("No connection!");
	});
}

function showStats() {
	$('.stats').empty();
	var re = '<b>';
	var cn = sessionLength - sessionList.length;
	var pc = Math.round(cn / sessionLength * 100);
	re += cn + '/' + sessionLength + ': ' + pc + '%</b>';
	
	re += ' | <span class="green">wl-' + numberToLearn + ': ';
	re += wordLearnPlus + '-' + wordLearnMinus;
	re += '<b> ' + wordLearned + '</b></span>';
	re += ' | <span class="green">wc-' + numberToConfirm + ': '; 
	re += wordConfirmPlus + '-' + wordConfirmMinus;
	re += '<b> ' + wordConfirmed + '-' + wordNotConfirmed + '</b></span>';
	re += ' | wr-' + numberToRepeat + '/' + numberWithProblem + ': ';
	re += wordRepeatPlus + '<sup>' + wordRepeatPlusAuto + '</sup>';
	re += '-' + wordRepeatMinus + '<b> ' + wordRepeated;
	re += '<sup>' + wordRepeatedAuto + '</sup>-' + wordReturned + '</b>';
	re+= ' | <span class="blue">[' + numberToRecognize + '] <b>';
	re += wordSuperPlus + '-' + wordSuperMinus + '</b></span>';
	
	re += ' || <span class="green">kl-' + numberToLearnKanji + ': ';
	re += kanjiLearnPlus + '-' + kanjiLearnMinus;
	re += '<b> ' + kanjiLearned + '</b></span>';
	re += ' | kr: ' + kanjiRepeatPlus + '<sup>' + kanjiRepeatPlusAuto + '</sup>';
	re += '-' + kanjiRepeatMinus + '<b> ' + kanjiRepeated;
	re += '<sup>' + kanjiRepeatedAuto + '</sup>-' + kanjiReturned + '</b>';
	re += ' | <span class="blue"><b>' + kanjiSuperPlus + '-' + kanjiSuperMinus + '</b></span>';
	
	$('.stats').append(re);
}

function pressedG() {
	switch(progress) {
		case 'FIRST_EVALUATION':
			if(direction !== 'FORWARD') break;
			$(".word").css("border-bottom", "6px solid green");
			wordFirstMark = "GOOD";
			break;
		case 'WORD_EVALUATION':
			$(".word-panel").css("border", "6px solid green");
			wordMark = "GOOD";
			break;
		case 'KANJI_EVALUATION':
			$(".kanji-panel").css("border", "6px solid green");
			kanjiMark = "GOOD";
			break;
		case 'RECOGNITION_EVALUATION':
			$(".word-panel").css("border", "6px solid green");
			wordMark = "GOOD";
			break;
		default: 
			console.log(progress);
	}
}

function pressedB() {
	switch(progress) {
		case 'FIRST_EVALUATION':
			if(direction !== 'FORWARD') break;
			$(".word").css("border-bottom", "6px solid red");
			wordFirstMark = "BAD";
			break;
		case 'WORD_EVALUATION':
			$(".word-panel").css("border", "6px solid red");
			wordMark = "BAD";
			break;
		case 'KANJI_EVALUATION':
			$(".kanji-panel").css("border", "6px solid red");
			kanjiMark = "BAD";
			break;
		case 'RECOGNITION_EVALUATION':
			$(".word-panel").css("border", "6px solid red");
			wordMark = "BAD";
			break;
		default: 
			console.log(progress);
	}
}

function pressedN() {
	switch(progress) {
		case "FIRST_EVALUATION":
			if(direction !== 'FORWARD') break;
			$(".word").css("border-bottom", "6px solid yellow");
			wordFirstMark = "NEUTRAL";
			break;
		case "WORD_EVALUATION":
			$(".word-panel").css("border", "6px solid yellow");
			wordMark = "NEUTRAL";
			break;
		default:
			console.log(progress);
	}
}

function pressedV() {
	switch(progress) {
		case "WORD_EVALUATION":
			if(direction !== "BACKWARD") return;
			$(".word-panel").css("border", "6px solid blue");
			wordMark = "BEST";
			break;
		case 'KANJI_EVALUATION':
			$(".kanji-panel").css("border", "6px solid blue");
			kanjiMark = "BEST";
			break;
		default:
			console.log(progress);
	}
}

function pressedEnter() {
	switch(progress) {
		case "WORD_QUESTION":
			showFirstAnswer();
			break;
		case "FIRST_EVALUATION":
			saveFirstResult();
			break;
		case "WORD_EVALUATION":
			saveProgressWord();
			break;
		case 'KANJI_QUESTION':
			showAnswerKanji();
			break;
		case 'KANJI_EVALUATION':
			saveProgressKanji();
			break;
		case 'READY_TO_GO':
			nextCard();
			break;
		case 'RECOGNITION':
			showAnswerToRecognize();
			break;
		case 'RECOGNITION_EVALUATION':
			saveRecognitionProgress();
			break;
		default: 
			console.log(progress);
	}
}

$(document).on("keypress", function (event) {

	//console.log(event.keyCode);
	$(".control").text(event.key);

	switch(event.keyCode) {
		case 97: 
			playAudio(0);
			break;
		case 13: 
			pressedEnter();
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
		case 118: 
			pressedV();
			break;
		case 104:
			pressedH();
			break;
		case 112:
			pressedP();
			break;
	}

});

function clearList() {
	$('.single').empty();
	$('.right-half').empty();
	$('.left-half').empty();
}

function nextCard() {
	showStats();

	clearList();
	
	if(sessionList.length < 1) {
		$('.word').empty().append('Happy End!');
		return;
	}
	var cardStatus = deleteRandomFromArray(sessionList);
	console.log(cardStatus);
	//console.log(sessionList);
	
	if(cardStatus[0] == 'K') {
		kanjiStatus = cardStatus;
		nextKanji();
		return;
	}
	if(cardStatus === 'RECOGNIZE') {
		nextRecognition();
		return;
	}
	wordStatus = cardStatus;
	nextWord();
	
	//nextKanji();
	//nextRecognition();
}

function start() {
	console.log(learnListKanji);
	console.log(repeatListKanji);
	console.log(recognizeList);
	console.log(learnList);
	console.log(confirmList);
	console.log(problemList);
	console.log(repeatList);
	console.log(sessionList);

	nextCard();
}

var main = function () {
	"use strict";
	//console.log("Hello js!");
	
	start();
	
};
	
$(document).ready(main);
