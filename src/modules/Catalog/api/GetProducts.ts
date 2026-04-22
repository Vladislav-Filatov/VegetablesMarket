import axios from "axios";

export const getProducts = async () => {
  try {
    const response =  await axios.get<CardInfo[]>('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json');
    return response.data;
  } catch {
   throw new Error('Не удалось загрузить список продуктов')
  }
}
