  function sendFormData() {
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const number = document.getElementById('number').value;
    const email = document.getElementById('email').value;
    const issue = document.getElementById('issue').value;

    fetch("http://localhost:3000/sendFormData", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: `fname=${fname}&lname=${lname}&number=${number}&email=${email}&issue=${issue}`,
    })
      .then(function (response) {
        return response.text();
      })
      .then(function (data) {
        alert(data);
      })
      .catch(function (err) {
        console.error(err);
      });
  }
