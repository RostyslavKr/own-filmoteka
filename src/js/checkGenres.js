export { checkGenreByID, checkGenreByIdForModal };
function checkGenreByID(ids) {
  const saveGenreId = localStorage.getItem('GENRES-MOVIES');
  const genreIdParse = JSON.parse(saveGenreId);
  //   console.log(genreIdParse);
  let genreArr = [];

  const genre_ids = ids.genre_ids;

  for (const genreId of genreIdParse) {
    if (genre_ids.includes(genreId.id)) {
      genreArr.push(genreId.name);
      //   console.log(genreArr);
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
  const saveGenreId = localStorage.getItem('GENRES-MOVIES');
  const genreIdParse = JSON.parse(saveGenreId);
  //   console.log(genreIdParse);
  let genreArr = [];

  const genre_ids = ids.genres;

  for (const genreId of genreIdParse) {
    if (genre_ids.includes(genreId.id)) {
      genreArr.push(genreId.name);
      //   console.log(genreArr);
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
