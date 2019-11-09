const baseUrl = 'https://pixabay.com/api/';

export default {
  key: '14212485-deb8165618a2af4ef4a847a14',

  searchByName(name, page) {
    const requestParams = `?image_type=photo&orientation=horizontal&q=${name}&page=${page}&per_page=12&key=${this.key}`;

    return fetch(baseUrl + requestParams).then(res =>
      res.json());
  },
};