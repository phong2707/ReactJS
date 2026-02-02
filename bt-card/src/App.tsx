import { CartProvider } from './CartContext';
import { ProductList } from './ProductList';
import { CartPage } from './cardPage';
import { CartWidget } from './cartWidget';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>React TS Shopping Cart</h1>
        
        <hr />
        <ProductList />
        <hr />
        <CartWidget />
        <CartPage />
      </div>
    </CartProvider>
  );
}

export default App;