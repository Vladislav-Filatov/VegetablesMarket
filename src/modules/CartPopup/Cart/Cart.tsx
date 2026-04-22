import cartEmpty from '../../../assets/cart_empty.png'
import {Stack, Text, Image, Group} from '@mantine/core';
import styles from './style.module.scss'
import {CartPosition} from "../CartPosition/CartPosition.tsx";
import { useAppSelector } from "../../../store/redux.ts";

const Cart = () => {
  const cartList = useAppSelector(item => item.cart.cartList);
  const totalPrice = cartList.reduce((sum, item) => sum + item.price * item.count, 0)

  return (
    cartList.length == 0 ?
    (
      <Stack align="center" gap={24} mx={82} my={24}>
      <Image
        src={cartEmpty}
        alt="Корзина пуста"
        w={117}
      />
      <Text className={styles['empty-cart-text']} ta="center">
        Ваша корзина пока пуста
      </Text>
    </Stack>
    ) :
    (
      <Stack align="center" m={24}>
        <ul className={styles['cart-positions-list']}>
        {
          cartList.map(position => (
            <li key={position.id}>
              <CartPosition id={position.id} image={position.image} name={position.name} price={position.price} count={position.count} />
            </li>
          ))
        }
        </ul>
        <Group w="100%" justify="space-between">
          <p className={styles['total-price']}>Total</p>
          <p className={styles['total-price']}>$ {totalPrice}</p>
        </Group>
      </Stack>
    )
  );
};

export default Cart;
