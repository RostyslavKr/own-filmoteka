export { checkGenreByID, checkGenreByIdForModal };
function checkGenreByID(ids) {
  const saveGenreId = localStorage.getItem('GENRES-MOVIES');
  const genreIdParse = JSON.parse(saveGenreId);

  let genreArr = [];

  const genre_ids = ids.genre_ids;

  for (const genreId of genreIdParse) {
    if (genre_ids.includes(genreId.id)) {
      genreArr.push(genreId.name);
    }
  }
  let genresStr = '';
  if (genreArr.length === 0) {
    genresStr = 'Unknown genre';
  } else if (genreArr.length <= 2) {
    genresStr = genreArr.join(', ');
  } else {
    genreArr.splice(2, genreArr.length);
    genresStr = genreArr.join(', ') + ', Other';
  }
  return genresStr;
}

function checkGenreByIdForModal(ids) {
  let genreArr = [];

  const genre_ids = ids.genres;

  for (const genre_id of genre_ids) {
    genreArr.push(genre_id.name);
  }
  let genresStr = '';
  if (genreArr.length === 0) {
    genresStr = 'Unknown genre';
  } else if (genreArr.length <= 2) {
    genresStr = genreArr.join(', ');
  } else {
    genreArr.splice(2, genreArr.length);
    genresStr = genreArr.join(', ') + ', Other';
  }
  return genresStr;
}
