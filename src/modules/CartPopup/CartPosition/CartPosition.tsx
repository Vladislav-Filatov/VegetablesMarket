import {ActionIcon, Group, Stack, Text} from "@mantine/core";
import MinusIcon from '../../../assets/minus-button.svg?react';
import PlusIcon from '../../../assets/plus-button.svg?react';
import styles from './style.module.scss'
import { useAppDispatch } from "../../../store/redux.ts";
import { decrementCartPosition, incrementCartPosition } from "../../../store/cartSlice.tsx";

interface CartPositionProps {
  id: number
  image: string
  name: string
  price: number
  count: number
}

export const CartPosition = ({id, image, name, price, count}: CartPositionProps) => {
  const dispatch = useAppDispatch();
  const [title, weight] = name.split(' - ');


  const handleIncrementCartPosition = () => {
    dispatch(incrementCartPosition({id}));
  }

  const decrementIncrementCartPosition = () => {
    dispatch(decrementCartPosition({id}));
  }

  return (
    <div className={styles['cart-position']}>
      <img src={image} alt={name} width='64'/>
      <Stack gap={0} justify="space-around">
        <Group gap={12}>
          <p className={styles['cart-position__title']}>{title}</p>
          <p className={styles['cart-position__weight']}>{weight}</p>
        </Group>
        <p className={styles['cart-position__price']}>$ {price}</p>
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
