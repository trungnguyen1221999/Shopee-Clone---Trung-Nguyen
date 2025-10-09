import styled from "styled-components";
import Container from "../../components/Container";
import Quanity from "../../components/Quantity/Quanity";
import { useQuery } from "@tanstack/react-query";
import readPurchase from "../../apis/readPurchase.api";
import CONST_STATUS from "../../untils/ConstStatus";
import currencyFormat from "../../untils/currencyFormat";

const CartPage = () => {
  const { data: purchaseInCart, isFetching: cartLoading } = useQuery({
    queryKey: ["purchase", { status: CONST_STATUS.addToCart }],
    queryFn: () => {
      return readPurchase(CONST_STATUS.addToCart);
    },
  });
  console.log(purchaseInCart);
  return (
    <Wrap>
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

        <div>
          {purchaseInCart.map((item) => (
            <CartItem key={item._id}>
              <ProductCell>
                <input type="checkbox" />
                <ProductInfo>
                  <img src={item.product.image} alt={item.product.name} />
                  <p>{item.product.name}</p>
                </ProductInfo>
              </ProductCell>
              <UnitPriceCell>
                <span className="oldPrice">
                  {currencyFormat(item.product.price_before_discount)}₫
                </span>
                <span className="newPrice">
                  {currencyFormat(item.product.price)}₫
                </span>
              </UnitPriceCell>
              <QuantityCell>
                <Quanity
                  stock={item.product.quantity}
                  value={item.buy_count}
                  onChange={() => {}}
                />
              </QuantityCell>
              <TotalPriceCell>
                {currencyFormat(item.product.price * item.buy_count)}₫
              </TotalPriceCell>
              <ActionsCell>Delete</ActionsCell>
            </CartItem>
          ))}
        </div>

        {/* Footer */}
      </StyledContainer>
      <StyledContainer>
        <CartFooter>
          <FooterLeft>
            <input type="checkbox" />
            <p>Select All ({purchaseInCart.length})</p>
            <p>Delete</p>
          </FooterLeft>
          <FooterRight>
            <div>
              Total (0) item <span>$0</span>
            </div>
            <button className="checkout">Checkout</button>
          </FooterRight>
        </CartFooter>
      </StyledContainer>
    </Wrap>
  );
};

export default CartPage;

// Styled Components
const Wrap = styled.div`
  padding: 4rem 0;
  background-color: #f5f5f5;
`;
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
  grid-column: span 2;
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
  margin: 1rem 0;
`;

const ProductCell = styled.div`
  grid-column: span 6;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.4rem;

  img {
    width: 80px;
    height: 80px;
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
  grid-column: span 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TotalPriceCell = styled.div`
  grid-column: span 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const ActionsCell = styled.div`
  grid-column: span 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.5rem;
`;

const CartFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  font-size: 1.6rem;
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  span {
    font-weight: bold;
    margin-left: 0.5rem;
  }
  .checkout {
    padding: 2rem 5rem;
    font-size: 1.6rem;
    font-weight: 500;
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
    border: none;
    border-radius: 0.4rem;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
  }
`;
