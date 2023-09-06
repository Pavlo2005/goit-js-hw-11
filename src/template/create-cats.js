function createCats(data) {
    return data.map(({ id, name }) => `<option value="${id}">${name}</option>
    `).join('');
}

export { createCats };