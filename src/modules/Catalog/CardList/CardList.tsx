import styles from './style.module.scss'
import { VegetableCard } from "../VegetableCard/VegetableCard.tsx";
import {getProducts} from "../api/GetProducts.ts";
import { useEffect, useState} from "react";
import type {CardInfo} from "../../../types/cardTypes.ts";
import { Loader } from '@mantine/core';

const CardList = () => {
  const [products, setProducts] = useState<CardInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const getCardsInfo = async () => {
      try {
        setIsLoading(true)
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    void getCardsInfo();
  }, []);

  return (
    <section className={styles.catalog}>
      <h2 className={styles.title}>Catalog</h2>
      {isLoading ? (
        <div className={styles['loader-wrapper']}>
          <Loader color="green" size="xl" />
        </div>
      ) : (
        <ul className={styles.list}>
          {products.map((product) => (
            <li key={product.id}>
              <VegetableCard
                id={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CardList;