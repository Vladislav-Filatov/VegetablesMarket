import {ActionIcon, Group, Stack, Text} from "@mantine/core";
import MinusIcon from '../../../assets/minus-button.svg?react';
import PlusIcon from '../../../assets/plus-button.svg?react';
import styles from './style.module.scss'
import {useContext} from "react";
import {CartContext} from "../../../context/CartContext.ts";

interface CartPositionProps {
  id: number
  image: string
  name: string
  price: number
  count: number
}

export const CartPosition = ({id, image, name, price, count}: CartPositionProps) => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('Контекст потерян')
  }


  const handleIncrementCartPosition = () => {
    context.incrementCartPosition(id);
  }

  const decrementIncrementCartPosition = () => {
    context.decrementCartPosition(id);
  }

  return (
    <div className={styles['cart-position']}>
      <img src={image} alt={name} width='64'/>
      <Stack gap={0} justify="space-around">
        <p className={styles['cart-position__info']}>{name}</p>
        <p className={styles['cart-position__info']}>$ {price}</p>
      </Stack>
      <Group gap={8} align="flex-end">
        <ActionIcon
          variant="subtle"
          radius="md"
          onClick={decrementIncrementCartPosition}
          aria-label="minus-count"
        >
          <MinusIcon />
        </ActionIcon>
        <Text data-testid="product-count">
          {count}
        </Text>
        <ActionIcon
          variant="subtle"
          radius="md"
          onClick={handleIncrementCartPosition}
          aria-label="plus-count"
        >
          <PlusIcon />
        </ActionIcon>
      </Group>
    </div>
  );
};
