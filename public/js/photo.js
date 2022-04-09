const { photoForm } = document.forms;

photoForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = new FormData(photoForm);
  
  const r = await fetch('/photo', {
    method: 'POST',
    body: data,
  });
  const result = await r.json();

  if (result.error) {
    console.error(result.message);
    return;
  }

  window.location.replace('/');
});