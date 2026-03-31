import { Card, Image, Text, Button, Group, ActionIcon  } from '@mantine/core';
import styles from './style.module.scss'
import CartIcon from "../../../assets/cart.svg?react"
import MinusIcon from '../../../assets/minus-button.svg?react';
import PlusIcon from '../../../assets/plus-button.svg?react';
import {useState, useContext} from "react";
import {CartContext} from "../../../context/CartContext.ts";

type VegetableCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const VegetableCard = ({id, name, price, image}: VegetableCardProps) => {
  const [count, setCount] = useState<number>(1);
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('Контекст потерян');
  }
  const { addToCart } = context;

  const handleAddToCart = () => {
    addToCart({id, name, price, image, count});
  }

  const handlePlusCount = () => {
    setCount(prev => prev +1);
  }

  const handleMinusCount = () => {
    setCount(prev => Math.max(1, prev -1));
  }

  return (
    <Card className={styles.card} shadow="sm" padding="lg" radius={24}>
      <Group>
        <Image
          src={image}
          height={276}
          alt={name}
        />
      </Group>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{name}</Text>
        <Group gap={7}>
          <ActionIcon
            variant="subtle"
            radius="md"
            onClick={handleMinusCount}
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
            onClick={handlePlusCount}
            aria-label="plus-count"
          >
            <PlusIcon />
          </ActionIcon>
        </Group>
      </Group>

      <Group wrap="nowrap" justify="space-between">
        <Text fw={500} style={{ flexShrink: 0 }}>$ {price}</Text>
        <Button
          fullWidth
          className={styles['add-button']}
          color="#E7FAEB"
          radius="md"
          rightSection={<CartIcon/>}
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </Group>
    </Card>
  );
};
