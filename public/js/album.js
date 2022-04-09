const { albumForm } = document.forms;
const albumTitle = document.querySelector('#albumTitle');

albumForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const r = await fetch('/album', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({title: albumTitle.value}),
  });
  const result = await r.json();
  
  if (result.error) {
    console.error(result.message);
    return;
  }

  window.location.replace('/');
});