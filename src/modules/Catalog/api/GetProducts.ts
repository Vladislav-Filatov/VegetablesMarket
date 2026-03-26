import axios from "axios";

export const getProducts = async () => {
  return await axios.get('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json');
}
