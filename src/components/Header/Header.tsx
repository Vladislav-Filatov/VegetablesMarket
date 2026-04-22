import {Badge, Button, Popover} from '@mantine/core';
import CartIcon from "../../assets/cart.svg?react"
import styles from './style.module.scss';
import { CartPopup } from "../../modules/CartPopup";
import {useAppSelector} from "../../store/redux.ts";

const Header = () => {
  const cartList = useAppSelector(state => state.cart.cartList);

  return (
    <header className={styles.header}>
      <a href="#" className={styles['title-link']}>
        <h2 className={styles.title}>
          Vegetable <Badge style={{cursor: "pointer"}} pl={12} pr={12} fw={500} size="xl" color="#54B46A">SHOP</Badge>
        </h2>
      </a>
      <Popover radius={16} floatingStrategy="fixed">
        <Popover.Target>
          <Button
            className={styles['cart-button']}
            variant="filled"
            color="#54B46A"
            leftSection={
              cartList.length > 0 ?
                <span className={styles['cart-counter']}>
                  {cartList.length}
                </span>
                : null
            }
            rightSection={<CartIcon/>}
          >
            Cart
          </Button>
        </Popover.Target>
        <Popover.Dropdown p={0}>
          <CartPopup/>
        </Popover.Dropdown>
      </Popover>
    </header>
  );
};

export default Header;