
import axios from 'axios';

export async function fetchProd() {
  const res = await axios.get('http://localhost:3000/api/products');
  return res.data;
}