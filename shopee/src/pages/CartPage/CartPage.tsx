import styled from "styled-components";
import Container from "../../components/Container";
import Quanity from "../../components/Quantity/Quanity";

const CartPage = () => {
  return (
    <StyledContainer>
      {/* Header */}
      <CartHeader>
        <ProductHeader>
          <input type="checkbox" />
          <span>Product</span>
        </ProductHeader>
        <UnitPriceHeader>Unit Price</UnitPriceHeader>
        <QuantityHeader>Quantity</QuantityHeader>
        <TotalPriceHeader>Total Price</TotalPriceHeader>
        <ActionsHeader>Actions</ActionsHeader>
      </CartHeader>

      {/* Cart Item */}
      <CartItem>
        <ProductCell>
          <input type="checkbox" />
          <ProductInfo>
            <img src="/images/product.png" alt="product" />
            <p>Product Name</p>
          </ProductInfo>
        </ProductCell>
        <UnitPriceCell>
          <span className="oldPrice">$200</span>
          <span className="newPrice">$100</span>
        </UnitPriceCell>
        <QuantityCell>
          <Quanity stock={5} value={1} onChange={() => {}} />
        </QuantityCell>
        <TotalPriceCell>$200</TotalPriceCell>
        <ActionsCell>Delete</ActionsCell>
      </CartItem>

      {/* Footer */}
      <CartFooter>
        <FooterLeft>
          <input type="checkbox" />
          <p>Select All (3)</p>
          <button>Delete</button>
        </FooterLeft>
        <FooterRight>
          <div>
            Total (0) item <span>$0</span>
          </div>
          <button>Checkout</button>
        </FooterRight>
      </CartFooter>
    </StyledContainer>
  );
};

export default CartPage;

// Styled Components
const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CartHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  padding: 1rem 0;
  border-bottom: 2px solid #eee;
  font-size: 1.6rem;
  align-items: center; /* Căn giữa theo trục dọc */
`;

const ProductHeader = styled.div`
  grid-column: span 6;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UnitPriceHeader = styled.div`
  grid-column: span 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuantityHeader = styled.div`
  grid-column: span 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TotalPriceHeader = styled.div`
  grid-column: span 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ActionsHeader = styled.div`
  grid-column: span 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  gap: 0; /* Dùng gap bên trong cell nếu cần */
`;

const ProductCell = styled.div`
  grid-column: span 6;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.4rem;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;

const ProductInfo = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UnitPriceCell = styled.div`
  grid-column: span 2;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 1.4rem;

  .oldPrice {
    text-decoration: line-through;
    color: #999;
  }
`;

const QuantityCell = styled.div`
  grid-column: span 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TotalPriceCell = styled.div`
  grid-column: span 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ActionsCell = styled.div`
  grid-column: span 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: red;
`;

const CartFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    font-weight: bold;
    margin-left: 0.5rem;
  }
`;
