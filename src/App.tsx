import './App.scss'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Header from "./components/Header/Header.tsx";
import {Catalog} from "./modules/Catalog";
import {Provider} from "react-redux";
import { store } from './store/store.ts'

function App() {

  return (
    <MantineProvider>
      <Provider store={store}>
        <Header/>
        <Catalog/>
      </Provider>
    </MantineProvider>

  )
}

export default App
