import './App.scss';
import Header from './modules/Header/components/Header';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import CardList from './modules/List/components/CardList';
import useFetch from './hooks/useFetch';
import type { Product, CartProduct } from './types/Product';
import { useState } from 'react';
import { MyContext } from './context/MyContext';

function App() {
  const { data, loading } = useFetch<Product[]>(
    'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json'
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [orders, setOrders] = useState<CartProduct[]>([]);

  return (
    <div className="container">
      <MantineProvider>
        <MyContext.Provider
          value={{ cartOpen, setCartOpen, orders, setOrders, data }}
        >
          <Header />
          <CardList data={data || []} loading={loading} />
        </MyContext.Provider>
      </MantineProvider>
    </div>
  );
}

export default App;
