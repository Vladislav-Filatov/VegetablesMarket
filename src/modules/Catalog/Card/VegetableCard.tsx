import { Card, Image, Text, Button, Group, ActionIcon  } from '@mantine/core';
import styles from './style.module.scss'
import CartIcon from "../../../assets/cart.svg?react"
import MinusIcon from '../../../assets/minus-button.svg?react';
import PlusIcon from '../../../assets/plus-button.svg?react';
import {useState} from "react";

type VegetableCardProps = {
  name: string;
  price: number;
  image: string;
}

export const VegetableCard = ({name, price, image}: VegetableCardProps) => {
  const [count, setCount] = useState<number>(1);

  const handlePlusCount = () => {
    setCount(prev => prev +1);
  }

  const handleMinusCount = () => {
    setCount(prev => Math.max(1, prev -1));
  }

  return (
    <Card className={styles.card} shadow="sm" padding="lg" radius="md">
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
          >
            <MinusIcon />
          </ActionIcon>
          <Text>{count}</Text>
          <ActionIcon
            variant="subtle"
            radius="md"
            onClick={handlePlusCount}
          >
            <PlusIcon />
          </ActionIcon>
        </Group>
      </Group>

      <Group wrap="nowrap" justify="space-between">
        <Text fw={500} style={{ flexShrink: 0 }}>$ {price}</Text>
        <Button fullWidth className={styles['add-button']} color="#E7FAEB" radius="md" rightSection={<CartIcon/>}>
          Add to cart
        </Button>
      </Group>
    </Card>
  );
};
