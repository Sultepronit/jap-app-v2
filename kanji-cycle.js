"use strict";

var kanjiStatus;
var currentKanjiId = 0;
var currentKanji;
var wordList;

var kanjiMark = '';
var hinted = false;

var kanjiLearnPlus = 0,  kanjiLearnMinus = 0, kanjiLearned = 0;
var kanjiRepeatPlus = 0, kanjiRepeatMinus = 0, kanjiRepeated = 0;
var kanjiRepeatPlusAuto = 0, kanjiRepeatedAuto = 0;
var kanjiReturned = 0;
var kanjiSuperPlus = 0, kanjiSuperMinus = 0;

function nextKanji() {
	$('.kanji-panel').show();
	$('.word-panel').hide();
	
	switch(kanjiStatus) {
		case 'KANJI_LEARN':
			currentKanjiId = deleteRandomFromArray(learnListKanji);
			//console.log(learnListKanji);
			break;
		case 'KANJI_REPEAT':
			currentKanjiId = deleteRandomFromArray(repeatListKanji);
			break;
		default:
			console.log("!!!" + kanjiStatus);
	}
	
	//currentKanjiId = randomFromRange(0, kanjiDb.length - 1);
	//console.log(currentKanjiId);
	currentKanji = kanjiDb[currentKanjiId];
	console.log(currentKanji);
	
	kanjiMark = 'UNEVALUATED';
	hinted = false;
	
	direction = (currentKanji.f > currentKanji.b) ? 'BACKWARD' : 'FORWARD';
	if(currentKanji.ff > 1.3) {
		currentKanji.f = 1;
		currentKanji.ff = 1.3;
		kanjiRepeatPlusAuto++;
		direction = 'BACKWARD';
	}
	
	showQuestionKanji();	
}

function showKanji() {
	$('.kanji').append(currentKanji.k);
	$('.kanji').append('<span class="serif">' + currentKanji.k + '</span>');
	var v = randomFromRange(1,3);
	switch(v) {
		case 1:
			$('.kanji').append('<span class="kurenaido">' + currentKanji.k + '</span>');
			break;
		case 2:
			$('.kanji').append('<span class="maru">' + currentKanji.k + '</span>');
			break;
		case 3:
			$('.kanji').append('<span class="decol">' + currentKanji.k + '</span>');
			break;
	}
	
	$('.kanji').append(getGif(currentKanji.k));
	$('.kanji').append(jooyoo[currentKanji.j][1]);
}

function showName() {
	var name = '[' + currentKanji.c + '] ' + currentKanji.n;
	name += '<i> ' + jooyoo[currentKanji.j][4];
	$('.kanji-name').append(name);
}

function showQuestionKanji() {
	progress = 'KANJI_QUESTION';
	
	$('.card-info').empty();
	$('.kanji').empty();
	$('.kanji-name').empty();
	$('.readings').empty();
	$('.decomposition').empty();
	$('.key').empty();
	$('.about-key').empty();
	$(".kanji-panel").css("border", "6px solid white");
	
	var info = '[' + currentKanjiId + '] ' + currentKanji.s + ":\t";
	info += currentKanji.f + " " + currentKanji.b + " | " + currentKanji.ff + " " + currentKanji.bb;
	$('.card-info').append(info);
	
	if(direction === 'FORWARD') {
		showKanji();
	} else { // BACKWARD
		showName();
		$('.readings').append(currentKanji.r);
		
		wordList = findKanjiInWords(currentKanji.k);
		if(wordList.length) showWordList(wordList, true);
	}
}

function pressedH() {
	if(progress === 'KANJI_QUESTION' && direction === 'BACKWARD' && !hinted) {
		//console.log('hint!');
		hinted = true;
		$('.decomposition').append(currentKanji.d);
	}
}

function showAnswerKanji() {
	progress = 'KANJI_EVALUATION';
	
	if(direction === 'FORWARD') {
		showName();
		$('.readings').append(currentKanji.r);
		wordList = findKanjiInWords(currentKanji.k);
		if(wordList.length) showWordList(wordList);
	} else { // BACKWARD
		showKanji();
		$('.word-head').show();
	}
	
	if(!hinted) $('.decomposition').append(currentKanji.d);
	
	$('.key').append(key[currentKanji.ky][0]);
	var about = currentKanji.ky + ': ';
	about += key[currentKanji.ky][2] + ' - ' + key[currentKanji.ky][3] + ' - ' + key[currentKanji.ky][4];
	$('.about-key').append(about);
	
	/*clearList();
	if(wordList.length) showWordList(wordList, true);*/
	//$('.word-head').show();
}

function pressedP() {
	if(progress === 'KANJI_EVALUATION') {
		$(".kanji-panel").css("border", "6px solid gray");
		kanjiMark = "PASS";
	}
}

function sendCommonKanjiChanges() {
	var message = 'sp?type=commonKanji';
	message += '&mrk=' + maxToRepeatKanji + '&nrk=' + nextRepeatedKanji;
	//console.log(message);
	contactServer(message);
}

function sendKanjiChanges() {
	var message = 'sp?type=kanji';
	message += '&id=' + currentKanjiId + '&s=' + currentKanji.s;
	message += "&f=" + currentKanji.f + "&b=" + currentKanji.b;
	message += "&ff=" + currentKanji.ff + "&bb=" + currentKanji.bb;
	//console.log(message);
	contactServer(message);
}

function implementEvaluation() {
	if(kanjiMark === 'PASS') {
		currentKanji.s = (nextRepeatedKanji++) + 0.1;
		currentKanji.f = 0;
		currentKanji.b = 0;
		kanjiRepeatedAuto++;
		
		maxToRepeatKanji++;
		sendCommonKanjiChanges();
		sessionList.push('KANJI_REPEAT');
		return;
	}
	
	function advancedProgress(value) {
		if(kanjiMark === 'BEST') {
			value++;
			kanjiSuperPlus++;
		} else { 
			value--;
			kanjiSuperMinus++;
			if(value > 1) value = 1;
		}
		if(value < 0) {
			value = 0;
			kanjiSuperMinus--;
		}
		if(value > 1 && currentKanji.s < 1) value = 1;
		return value;
	}
	
	var change = 0;
	if(kanjiMark === 'GOOD' || kanjiMark === 'BEST') {
		change++;
		if(kanjiStatus == 'KANJI_LEARN') kanjiLearnPlus++; else kanjiRepeatPlus++;
	} else { // BAD
		change--;
		if(kanjiStatus == 'KANJI_LEARN') kanjiLearnMinus++; else kanjiRepeatMinus++;
	}
	
	if(direction === 'FORWARD') {
		currentKanji.f += change;
		currentKanji.ff = advancedProgress(currentKanji.ff);
	} else { // BACKWARD
	currentKanji.b += change;
		currentKanji.bb = advancedProgress(currentKanji.bb);
	}
	
	//upgrade or degrade
	if(currentKanji.s < 1) { // learn
	
		if(currentKanji.f < -1 || currentKanji.b < -1) { // degrade
			if(currentKanji.f < -1) { //forward
				currentKanji.f = -1;
			} else { //backward
				currentKanji.f = 0;
				currentKanji.b = 0;
			}
			return;
		}
		
		if(currentKanji.f > 1 && currentKanji.b > 1) { // upgrade
			currentKanji.s = 1;
			currentKanji.f = 0;
			currentKanji.b = 0;
			kanjiLearned++;
			
			maxToRepeatKanji--;
			sendCommonKanjiChanges();
			return;
		}
		
	} else { //repeat
	
		if(currentKanji.f < -1 || currentKanji.b < -1) { // degrade
			currentKanji.s = 0;
			currentKanji.f = 0;
			currentKanji.b = 0;
			kanjiReturned++;
			
			maxToRepeatKanji++;
			sendCommonKanjiChanges();
			return;
		}
		
		if(currentKanji.f > 0 && currentKanji.b > 0) { // upgrade
			currentKanji.s = nextRepeatedKanji++;
			currentKanji.f = 0;
			currentKanji.b = 0;
			kanjiRepeated++;
			
			maxToRepeatKanji++;
			sendCommonKanjiChanges();
			return;
		}
	}
}

function saveProgressKanji() {
	if(kanjiMark === 'UNEVALUATED') return;
	console.log("b " + currentKanji.s + ":\t" + currentKanji.f + " " + currentKanji.b + " | " + currentKanji.ff + " " + currentKanji.bb);
	
	implementEvaluation();
	
	console.log("a " + currentKanji.s + ":\t" + currentKanji.f + " " + currentKanji.b + " | " + currentKanji.ff + " " + currentKanji.bb);
	
	sendKanjiChanges();
	//sendCommonKanjiChanges();
	
	nextCard();
}
