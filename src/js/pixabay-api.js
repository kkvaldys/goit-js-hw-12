import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '42589102-bb5462888a4e95731e5ef7933';
export async function imageSearch(query, pageNum) {
  const queryParams = new URLSearchParams({
    key: KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: false,
    per_page: 15,
    page: pageNum,
  });

  const response = await axios.get('', { params: queryParams });
  return response.data;
}
