import {Badge, Button} from '@mantine/core';
import Cart from "../../assets/cart.svg?react"
import styles from './style.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>
        Vegetable <Badge pl={12} pr={12} fw={500} size="xl" color="#54B46A">SHOP</Badge>
      </h2>
      <Button className={styles['cart-button']} variant="filled" color="#54B46A" rightSection={<Cart/>}>
        Cart
      </Button>
    </header>
  );
};

export default Header;