function createCat({ url, breeds }) {
  const element = `
    <div class="container-cat">
        <div class="cat-img-wrap">
          <img class="cat-img" width="500" height="500" src="${url}" alt="${breeds[0].name}">
        </div >
        <div>
            <h3 class="classic-title">${breeds[0].name}</h3>
            <p class="cat-description classic-text">${breeds[0].description}</p>
            <div class="temperament">
                <span class="temperament-title">Temperament:</span>
                <span class="classic-text">${breeds[0].temperament}</span>
            </div>
        </div>
      </div > `;
  return element;
}

export { createCat };