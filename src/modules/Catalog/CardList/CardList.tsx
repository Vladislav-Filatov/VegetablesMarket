import styles from './style.module.scss'
import { VegetableCard } from "../Card/VegetableCard.tsx";
import {getProducts} from "../api/GetProducts.ts";
import {useEffect, useState} from "react";
import type {CardInfo} from "../types.ts";

const CardList = () => {
  const [products, setProducts] = useState<CardInfo[]>([]);

  useEffect(() => {
    const getCardsInfo = async () => {
      const response = await getProducts();
      setProducts(response.data);
    };

    void getCardsInfo();
  }, []);

  return (
    <section className={styles.catalog}>
      <h2>Catalog</h2>
      <ul className={styles.list}>
        {products.map(product => (
          <li key={product.id}>
            <VegetableCard name={product.name} image={product.image} price={product.price}/>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CardList;