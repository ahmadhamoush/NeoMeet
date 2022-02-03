const xhttp = new XMLHttpRequest();
xhttp.open("get", "http://localhost:3000/update");
xhttp.responseType = 'json';
xhttp.send();
xhttp.onload = function(){
  const responseFromServer = this.response;
  console.log(responseFromServer);
  const responseFromServerParsed = JSON.parse(responseFromServer);
  console.log(responseFromServerParsed);
  const demo = document.getElementById("demo");
  demo.innerHTML = `<div class="feature-col"> <br>
    <h3>${responseFromServerParsed.name}</h3>
    <p>${responseFromServerParsed.desc}</p>
  </div>` ;
};

const xhttp2 = new XMLHttpRequest();
xhttp2.open("get", "http://localhost:3000/update2");
xhttp2.responseType = 'json';
xhttp2.send();
xhttp2.onload = function(){
  const responseFromServer = this.response;
  console.log(responseFromServer);
  const responseFromServerParsed = JSON.parse(responseFromServer);
  console.log(responseFromServerParsed);
  const demo = document.getElementById("demo2");
  demo.innerHTML = `<div class="feature-col"> <br>
    <h3>${responseFromServerParsed.name}</h3>
    <p>${responseFromServerParsed.desc}</p>
  </div>` ;
};

const xhttp3 = new XMLHttpRequest();
xhttp3.open("get", "http://localhost:3000/update3");
xhttp3.responseType = 'json';
xhttp3.send();
xhttp3.onload = function(){
  const responseFromServer = this.response;
  console.log(responseFromServer);
  const responseFromServerParsed = JSON.parse(responseFromServer);
  console.log(responseFromServerParsed);
  const demo = document.getElementById("demo3");
  demo.innerHTML = `<div class="feature-col"> <br>
    <h3>${responseFromServerParsed.name}</h3>
    <p>${responseFromServerParsed.desc}</p>
  </div>`;
};
