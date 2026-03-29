import {Badge, Button, Popover} from '@mantine/core';
import CartIcon from "../../assets/cart.svg?react"
import styles from './style.module.scss';
import {Cart} from "../../modules/CartPopup/Cart/Cart.tsx";

const Header = () => {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>
        Vegetable <Badge pl={12} pr={12} fw={500} size="xl" color="#54B46A">SHOP</Badge>
      </h2>
      <Popover radius={16}>
        <Popover.Target>
          <Button  className={styles['cart-button']} variant="filled" color="#54B46A" rightSection={<CartIcon/>}>
            Cart
          </Button>
        </Popover.Target>
        <Popover.Dropdown p={0}>
          <Cart/>
        </Popover.Dropdown>
      </Popover>
    </header>
  );
};

export default Header;