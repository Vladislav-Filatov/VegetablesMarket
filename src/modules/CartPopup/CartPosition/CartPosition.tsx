import {ActionIcon, Group, Text} from "@mantine/core";
import MinusIcon from '../../../assets/minus-button.svg?react';
import PlusIcon from '../../../assets/plus-button.svg?react';
import styles from './style.module.scss'

interface CartPositionProps {
  image: string
  name: string
  price: number
  count: number
}
export const CartPosition = ({image, name, price, count}: CartPositionProps) => {
  return (
    <div className={styles['cart-position']}>
      <img src={image} alt={name} width='64'/>
      <div>
        <p>{name}</p>
        <p>$ {price}</p>
      </div>
      <Group gap={8}>
        <ActionIcon
          variant="subtle"
          radius="md"
        >
          <MinusIcon />
        </ActionIcon>
        <Text>{count}</Text>
        <ActionIcon
          variant="subtle"
          radius="md"
        >
          <PlusIcon />
        </ActionIcon>
      </Group>
    </div>
  );
};
