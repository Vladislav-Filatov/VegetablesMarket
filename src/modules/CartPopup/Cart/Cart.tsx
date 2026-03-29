import cartEmpty from '../../../assets/cart_empty.png'
import {  Stack, Text, Image } from '@mantine/core';
import styles from './style.module.scss'
import {useContext} from "react";
import {CartContext} from "../../../context/CartContext.ts";
import {CartPosition} from "../CartPosition/CartPosition.tsx";

export const Cart = () => {
  const context =useContext(CartContext);
  if (!context) {
    throw new Error('Контекст потерян');
  }
  const cartList = context.cartList;

  return (
    cartList.length == 0 ?
    (<Stack align="center" gap={24} mx={82} my={24}>
      <Image
        src={cartEmpty}
        alt="Корзина пуста"
        w={117}
      />
      <Text className={styles['empty-cart-text']} ta="center">Ваша корзина пока пуста</Text>
    </Stack>) :
    (<ul>
      {
        cartList.map(position => (
          <li key={position.id}>
            <CartPosition image={position.image} name={position.name} price={position.price} count={position.count} />
          </li>
        ))
      }
    </ul>)
  );
};
