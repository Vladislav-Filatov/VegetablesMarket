import './App.scss'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Header from "./components/Header/Header.tsx";
import {Catalog} from "./modules/Catalog";

function App() {

  return (
    <MantineProvider>
      <Header/>
      <Catalog/>
    </MantineProvider>

  )
}

export default App
