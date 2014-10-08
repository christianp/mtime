getFact =  function(time) {
	facts = {
   		"00:00": "Four identical digits",
   	 	"00:01": "Something interesting",
  	 	"16:59": "",
  	 	"13:21": "Two consecutive Fibonacci numbers",
  	 	"13:23": "Two consecutive lel numbers"
	};
	return (facts[time]);
}
updateFact =  function() {
	var currentdate = new Date();

	var answer =  pad(currentdate.getHours(),2,0) + ":" + pad(currentdate.getMinutes(),2,0)
	var elem = document.getElementById('answer');
      elem.innerHTML = answer;
      elem.setAttribute("title", answer);
    var elem = document.getElementById('explain');
      elem.innerHTML = getFact(answer);
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


