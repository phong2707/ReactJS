import { render, screen } from '@testing-library/react';
import { CartProvider } from '../CartContext';
import { CartPage } from '../cardPage';
import '@testing-library/jest-dom';

describe('CartPage render', () => {
  it('render bảng giỏ hàng và tổng tiền', () => {
    render(
      <CartProvider>
        <CartPage />
      </CartProvider>
    );

    expect(screen.getByText('Sản phẩm')).toBeInTheDocument();
    expect(screen.getByText('Giá')).toBeInTheDocument();
    expect(screen.getByText('Số lượng')).toBeInTheDocument();
    expect(screen.getByText(/tổng tiền/i)).toBeInTheDocument();
  });
});
