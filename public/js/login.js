const { loginForm } = document.forms;
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {email: emailInput.value, password: passwordInput.value};

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data), // чтобы отправить данные на бэк, нужно их привести к строке JSON
  });
  const result = await response.json();

  if (result.error) {
    console.error(result.message);
    return;
  }

  window.location.replace('/');
});