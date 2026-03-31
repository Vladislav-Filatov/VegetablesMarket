import axios from "axios";

export const getProducts = async () => {
  const response =  await axios.get('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json');
  return response.data;
}
