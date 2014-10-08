var facts = {
	"00:00": "Four identical digits",
	"00:01": "Something interesting",
	"16:59": "",
	"13:21": "Two consecutive Fibonacci numbers",
	"13:23": "Two consecutive lel numbers"
};

getFact =  function(time) {
	return facts[time];
}

function addFact(time,fact) {
	facts[time] = fact;
	localStorage['time-facts'] = JSON.stringify(facts);
}

var otime = '';
var time;

updateFact =  function() {
	var currentTime = new Date();

	time = formatTime(currentTime);
	if(time==otime) {
		return;
	} else {
		otime = time;
		refreshView();
	}
}

function refreshView() {
	var fact = getFact(time);

	var timeElement = document.getElementById('time');
	timeElement.innerHTML = time;
	timeElement.setAttribute("title", time);
	var factElement = document.getElementById('fact');

	factElement.className = fact ? 'yes' : 'no';
	document.querySelector('#fact-form').className = fact ? 'hidden': '';
	var factInput = document.querySelector('textarea[name=fact-input]');
	if(fact) {
		document.getElementById('yes-fact').innerHTML = fact.replace('\n','\n<br>');
		MathJax.Hub.Queue(['Typeset',MathJax.Hub,factElement]);
		factInput.value = fact;
	} else {
		factInput.value = '';
	}
}

function formatTime(t) {
	return pad(t.getHours(),2,'0') + ":" + pad(t.getMinutes(),2,'0')
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

window.onload = function() {
	document.querySelector('#fact-form').onsubmit = function() {
		var fact = this.querySelector('textarea[name=fact-input]').value;
		addFact(time,fact);
		refreshView();
		return false;
	}
	document.querySelector('#yes-fact').onclick = function() {
		document.querySelector('#fact').className = 'edit';
		document.querySelector('#fact-form textarea[name=fact-input]').focus();
	}

	if(localStorage && localStorage['time-facts']) {
		facts = JSON.parse(localStorage['time-facts']);
	}

	updateFact();
	setInterval(updateFact, 1000 * 10);
}
