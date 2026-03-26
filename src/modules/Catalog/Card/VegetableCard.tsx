import { Card, Image, Text, Button, Group } from '@mantine/core';
import styles from './style.module.scss'
import CartIcon from "../../../assets/cart.svg?react"

type VegetableCardProps = {
  name: string;
  price: number;
  image: string;
}

export const VegetableCard = ({name, price, image}: VegetableCardProps) => {
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
      </Group>

      <Group wrap="nowrap" justify="space-between">
        <Text fw={500} style={{ flexShrink: 0 }}>$ {price}</Text>
        <Button fullWidth className={styles['add-button']} color="#E7FAEB"radius="md" rightSection={<CartIcon/>}>
          Add to cart
        </Button>
      </Group>
    </Card>
  );
};
