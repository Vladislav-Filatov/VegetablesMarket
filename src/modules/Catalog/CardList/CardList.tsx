import styles from './style.module.scss'
import { VegetableCard } from "../VegetableCard/VegetableCard.tsx";
import {getProducts} from "../api/GetProducts.ts";
import { useEffect, useState} from "react";
import { Loader } from '@mantine/core';

const CardList = () => {
  const [products, setProducts] = useState<CardInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCardsInfo = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getProducts();
        setProducts(response);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('Error')
        }
      } finally {
        setIsLoading(false);
      }
    };

    void getCardsInfo();
  }, []);

  return (
    <section className={styles.catalog}>
      <h2 className={styles.title}>Catalog</h2>
      { isLoading ? (
        <div data-testid="loader" className={styles['loader-wrapper']}>
          <Loader color="green" size="xl" />
        </div>
      ) : error ? (
        <p>{error}</p>
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