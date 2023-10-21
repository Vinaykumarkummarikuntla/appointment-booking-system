function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const showPasswordToggle = document.querySelector(".show");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    showPasswordToggle.innerHTML = "&#128064;";
  } else {
    passwordInput.type = "password";
    showPasswordToggle.innerHTML = "&#128065;";
  }
}

function checkOnServer(event) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  console.log(email, password);
  const obj = { email, password };
  console.log(obj);
  axios
    .post("http://localhost:4000/login", obj)
    .then((response) => {
      console.log(response);
      localStorage.setItem("token", response.data.token);
      window.location.href = "/pages/appointment.html";
    })
    .catch((err) => {
      console.log(err);
    });
}
