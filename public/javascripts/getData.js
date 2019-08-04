var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // Typical action to be performed when the document is ready:
    let resJson = JSON.parse(xhttp.responseText);
    resJson.forEach((review) => {
      const reviews = document.getElementById('reviews');
      let p = document.createElement('p');
      var textnode = document.createTextNode(review.body);
      p.appendChild(textnode);
      reviews.appendChild(p);
      let s = document.createElement('small');
      let date = new Date(review.date);
      textnode = document.createTextNode(date);
      s.appendChild(textnode);
      reviews.appendChild(s);
      let hr = document.createElement('hr');
      reviews.appendChild(hr);
    })
    
  }
};
xhttp.open("GET", (window.location.origin + "/reviews"), true);
xhttp.send();