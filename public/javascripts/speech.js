var submit = document.getElementById('submit');
var review = document.getElementById('reviews');
var transcription = document.getElementById('transcription');
var log = document.getElementById('log');
var start = document.getElementById('speechButton');
var clear = document.getElementById('clear-all');
var speaking = false;

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

if (window.SpeechRecognition === null) {
  document.getElementById('unsupported').classList.remove('hidden');
  start.classList.add('hidden');
} else {
  var recognizer = new window.SpeechRecognition();
  recognizer.continuous = true;
  recognizer.onresult = function (event) {
    transcription.textContent = '';
    for (var i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        transcription.textContent = event.results[i][0].transcript;
      } else {
        transcription.textContent += event.results[i][0].transcript;
      }
    }
  };
  recognizer.onerror = function (event) {
    log.innerHTML = 'Recognition error: ' + event.message + '<br/>' + log.innerHTML;
  };
  start.addEventListener('click', function () {
    if (!speaking) {
      speaking = true;
      start.classList.toggle('stop');
      recognizer.interimResults = document.querySelector('input[name="recognition-type"][value="interim"]').checked;
      try {
        recognizer.start();
        log.innerHTML = 'Start speaking now<br/>Click to stop';
      } catch (err) {
        log.innerHTML = 'Recognition error: <br/>' + err.message
      }
    } else {
      recognizer.stop();
      start.classList.toggle('stop');
      log.innerHTML = 'Recognition stopped <br/>Click to speak';
      speaking = false;
    }
  });
  clear.addEventListener('click', function () {
    transcription.textContent = '';
  });
  submit.addEventListener('click', function () {
    // Call API
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 201) {
        // Typical action to be performed when the document is ready:
        let resJson = JSON.parse(xhttp.responseText);

        let p = document.createElement('p');
        var textnode = document.createTextNode(resJson.body);
        p.appendChild(textnode);
        review.appendChild(p);
        let today = new Date(resJson.date);
        let s = document.createElement('small');
        textnode = document.createTextNode(today);
        s.appendChild(textnode);
        review.appendChild(s);
        let hr = document.createElement('hr');
        review.appendChild(hr);
        transcription.textContent = '';
      }
    };
    xhttp.open("POST", (window.location.origin + "/reviews"), true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ body: transcription.textContent }));
  });
}