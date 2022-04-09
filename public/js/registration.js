const { registrationForm } = document.forms;
const registrationName = document.querySelector("#registrationName");
const registrationEmail = document.querySelector("#registrationEmail");
const registrationPassword = document.querySelector("#registrationPassword");

registrationForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: registrationName.value,
    email: registrationEmail.value,
    password: registrationPassword.value,
  };

  const r = await fetch('/registration', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await r.json();

  if (result.error) {
    console.error(result.message);
    return;
  }
  
  window.location.replace('/');
});
