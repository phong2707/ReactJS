import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider } from '../CartContext';
import { ProductList } from '../ProductList';
import { CartWidget } from '../cartWidget';
import '@testing-library/jest-dom';

describe('ProductList - Add to cart', () => {
  it('render đúng số lượng khi nhấn nút thêm giỏ hàng', async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <CartWidget />
        <ProductList />
      </CartProvider>
    );

    // Ban đầu giỏ hàng = 0
    expect(screen.getByText(/giỏ hàng/i)).toHaveTextContent('0');

    // Click "Thêm vào giỏ"
    const addButton = screen.getAllByText(/thêm vào giỏ/i)[0];
    await user.click(addButton);

    // Sau khi click → giỏ hàng = 1
    expect(screen.getByText(/giỏ hàng/i)).toHaveTextContent('1');
  });
});
