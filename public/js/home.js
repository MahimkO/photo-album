const albums = document.querySelector('.albums_container');

albums.addEventListener('click', async (e) => {
  e.stopPropagation();
  console.log('e.target =>', e.target);
  window.location.replace(`/album/${e.target.dataset.id}`);
});

// const albums = document.querySelectorAll('.albums_container');

// for (let index = 0; index < albums.length; index++) {
//   const album = albums[index];
  
//   album.addEventListener('click', async (e) => {
//     console.log('e.target =>', e.target)
//     // window.location.replace(`/album/${e.target.dataset.id}`);
//   });
// }