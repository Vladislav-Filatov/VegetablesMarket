import './App.scss'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Header from "./components/Header/Header.tsx";
import {Catalog} from "./modules/Catalog";
import {CartProvider} from "./context/CartProvider.tsx";

function App() {

  return (
    <MantineProvider>
      <CartProvider>
        <Header/>
        <Catalog/>
      </CartProvider>
    </MantineProvider>

  )
}

export default App
