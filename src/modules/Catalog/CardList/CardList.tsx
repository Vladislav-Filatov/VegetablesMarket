import styles from './style.module.scss'
import { VegetableCard } from "../VegetableCard/VegetableCard.tsx";
import { useEffect } from "react";
import { Loader } from '@mantine/core';
import {useAppDispatch, useAppSelector} from "../../../store/redux.ts";
import {fetchProducts} from "../../../store/catalogSlice.tsx";

const CardList = () => {
  const {products, isLoading, error} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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