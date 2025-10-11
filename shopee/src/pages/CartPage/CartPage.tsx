import styled from "styled-components";
import Container from "../../components/Container";
import Quanity from "../../components/Quantity/Quanity";
import { useMutation, useQuery } from "@tanstack/react-query";
import readPurchase from "../../apis/readPurchase.api";
import CONST_STATUS from "../../untils/ConstStatus";
import currencyFormat from "../../untils/currencyFormat";
import { useContext, useEffect } from "react";
import updateAtc from "../../apis/updateAtc";
import { toast } from "react-toastify";
import deleteAtc from "../../apis/deleteAtc";
import buyAtc, { type BuyAtcParams } from "../../apis/buyAtc";
import { Link, useLocation } from "react-router-dom";
import { urlFormat } from "../../untils/urlFormat";
import { getProductList } from "../../apis/productList.api";
import ProductCart from "../../components/ProductCard/ProductCart";
import type { productType } from "../../types/product.type";
import {
  RelatedGrid,
  RelatedSection,
  RelatedTitle,
} from "../ProductDetail/ProductDetail";
import { AppContext } from "../../context/AppContext";

const CartPage = () => {
  const { extendedPurchaseInCart, setExtendedPurchaseInCart } =
    useContext(AppContext);
  const { data: purchaseInCart } = useQuery({
    queryKey: ["purchase", { status: CONST_STATUS.addToCart }],
    queryFn: () => readPurchase(CONST_STATUS.addToCart),
  });
  const location = useLocation();
  const choosenPurId = location.state?.purchase_id || 0;
  // ✅ Fix: đảm bảo data luôn là mảng (vì API có thể trả về { data: [...] })
  useEffect(() => {
    const data = Array.isArray(purchaseInCart)
      ? purchaseInCart
      : purchaseInCart?.data;

    if (data && Array.isArray(data)) {
      setExtendedPurchaseInCart(
        data.map((item: any) => ({
          ...item,

          isDisabled: false,
          isChecked: choosenPurId === item.product._id ? true : false,
        })) as PurchaseItem[]
      );
      history.replaceState(choosenPurId, "");
    }
  }, [purchaseInCart, choosenPurId]);

  const updateQuantityMutaion = useMutation({
    mutationFn: ({
      buy_count,
      product_id,
    }: {
      buy_count: number;
      product_id: string;
    }) => updateAtc({ buy_count, product_id }),
    onSuccess: (data) => {
      // Handle success (e.g., show a success message)
      toast.success("Add to cart updated successfully");
    },
    onError: (error) => {
      // Handle error (e.g., show an error message)
      toast.error("Error updating cart");
    },
  });
  const handleChange = (value: number, index: number) => {
    if (extendedPurchaseInCart[index].isDisabled) return;
    let val = Number(value);
    if (isNaN(val) || val < 1) val = 1;
    if (val > extendedPurchaseInCart[index].product.quantity)
      val = extendedPurchaseInCart[index].product.quantity;
    const newPurchaseInCart = [...extendedPurchaseInCart];
    newPurchaseInCart[index].buy_count = val;
    newPurchaseInCart[index].isDisabled = true;

    setExtendedPurchaseInCart(newPurchaseInCart);
    updateQuantityMutaion.mutate(
      {
        buy_count: val,
        product_id: newPurchaseInCart[index].product._id,
      },
      {
        onSettled: () => {
          const updated = [...extendedPurchaseInCart];
          updated[index].isDisabled = false;
          setExtendedPurchaseInCart(updated);
        },
      }
    );
  };
  const handleCheck = (index: number) => {
    const newPurchaseInCart = [...extendedPurchaseInCart];
    newPurchaseInCart[index].isChecked = !newPurchaseInCart[index].isChecked;
    setExtendedPurchaseInCart(newPurchaseInCart);
  };

  const isAllCheck = extendedPurchaseInCart.every(
    (item) => item.isChecked === true
  );

  const handleAllCheck = () => {
    const newPurchaseInCart = extendedPurchaseInCart.map((item) => ({
      ...item,
      isChecked: !isAllCheck,
    }));
    setExtendedPurchaseInCart(newPurchaseInCart);
  };

  const totalPrice = () =>
    extendedPurchaseInCart.reduce((total, item) => {
      if (item.isChecked) {
        return total + item.product.price * item.buy_count;
      }
      return total;
    }, 0);

  const totalCheck = () =>
    extendedPurchaseInCart.reduce(
      (total, item) => (item.isChecked ? total + 1 : total),
      0
    );
  const deleteItemInCartMutation = useMutation({
    mutationFn: (purchase_id: string[]) => deleteAtc(purchase_id),
    onSuccess: () => {
      const newPurchaseInCart = extendedPurchaseInCart.filter(
        (item) => !item.isChecked
      );
      setExtendedPurchaseInCart(newPurchaseInCart);
      toast.success("Delete item in cart successfully");
    },
  });
  const handleDeleteItemInCart = (itemIndex: number) => {
    const purchase_id = extendedPurchaseInCart[itemIndex]._id;
    deleteItemInCartMutation.mutate([purchase_id], {
      onSuccess: () => {
        const newPurchaseInCart = extendedPurchaseInCart.filter(
          (item, index) => index !== itemIndex
        );
        setExtendedPurchaseInCart(newPurchaseInCart);
      },
    });
  };
  const handleDeletedMultipleItemInCart = () => {
    const purchase_id = extendedPurchaseInCart
      .filter((item) => item.isChecked)
      .map((item) => item._id);
    deleteItemInCartMutation.mutate(purchase_id);
  };
  const isItemChecked = Boolean(
    extendedPurchaseInCart.some(
      (extendedPurchaseInCart) => extendedPurchaseInCart.isChecked
    )
  );
  const savedPrice = () => {
    let total = 0;
    extendedPurchaseInCart.forEach((item) => {
      if (item.isChecked) {
        total +=
          (item.product.price_before_discount - item.product.price) *
          item.buy_count;
      }
    });
    return total;
  };
  const buyAtcMutation = useMutation({
    mutationFn: (items: BuyAtcParams[]) => {
      return buyAtc(items);
    },
    onSuccess: () => {
      const newPurchaseInCart = extendedPurchaseInCart.filter(
        (item) => !item.isChecked
      );
      setExtendedPurchaseInCart(newPurchaseInCart);
      toast.success("Buy items in cart successfully");
    },
  });
  const handleBuyItemsInCart = () => {
    if (isItemChecked) {
      const itemsToBuy = extendedPurchaseInCart
        .filter((item) => item.isChecked)
        .map((item) => ({
          product_id: item.product._id as string,
          buy_count: item.buy_count,
        }));
      buyAtcMutation.mutate(itemsToBuy);
    }
  };
  const { data } = useQuery({
    queryKey: ["productList"],
    queryFn: () =>
      getProductList({
        page: 1,
        limit: 24,
        sort_by: "sold",
      }),
  });

  if (!purchaseInCart) return null;

  return (
    <Wrap>
      <StyledContainer>
        {/* Header */}
        <CartHeader>
          <ProductHeader>
            <input
              type="checkbox"
              onChange={handleAllCheck}
              checked={isAllCheck}
            />
            <span>Product</span>
          </ProductHeader>
          <UnitPriceHeader>Unit Price</UnitPriceHeader>
          <QuantityHeader>Quantity</QuantityHeader>
          <TotalPriceHeader>Total Price</TotalPriceHeader>
          <ActionsHeader>Actions</ActionsHeader>
        </CartHeader>

        {/* Cart Items */}
        <div>
          {extendedPurchaseInCart.map((item, index) => (
            <CartItem key={item._id}>
              <ProductCell>
                <input
                  type="checkbox"
                  onChange={() => handleCheck(index)}
                  checked={item.isChecked}
                />
                <Link to={`/${urlFormat(item.product.name, item.product._id)}`}>
                  <ProductInfo>
                    <img src={item.product.image} alt={item.product.name} />
                    <p>{item.product.name}</p>
                  </ProductInfo>
                </Link>
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
                  onChange={(value: number) => handleChange(value, index)}
                />
              </QuantityCell>

              <TotalPriceCell>
                {currencyFormat(item.product.price * item.buy_count)}₫
              </TotalPriceCell>

              <ActionsCell onClick={() => handleDeleteItemInCart(index)}>
                Delete
              </ActionsCell>
            </CartItem>
          ))}
        </div>
      </StyledContainer>

      {/* Sticky Footer */}
      <CartFooterWrapper>
        <StyledContainer>
          <CartFooter>
            <FooterLeft>
              <input
                type="checkbox"
                onChange={handleAllCheck}
                checked={isAllCheck}
              />
              {purchaseInCart && (
                <p className="select-all" onClick={handleAllCheck}>
                  Select All ({extendedPurchaseInCart.length})
                </p>
              )}
              <button
                className="delete"
                onClick={handleDeletedMultipleItemInCart}
              >
                Delete
              </button>
            </FooterLeft>
            <FooterRight>
              <div className="total">
                Total ({totalCheck()}) item{" "}
                <TotalPriceContainer>
                  <span>{currencyFormat(totalPrice())}₫</span>
                  {isItemChecked && (
                    <span className="save">
                      Save {currencyFormat(savedPrice())} ₫
                    </span>
                  )}
                </TotalPriceContainer>
              </div>
              <button
                className="checkout"
                onClick={handleBuyItemsInCart}
                disabled={buyAtcMutation.isPending}
              >
                Checkout
              </button>
            </FooterRight>
          </CartFooter>
        </StyledContainer>
      </CartFooterWrapper>
      <StyledContainer>
        {data && (
          <RelatedSection>
            <RelatedTitle>You May Also Like</RelatedTitle>
            <RelatedGrid>
              {data.products.map((product: productType["data"]) => (
                <ProductCart
                  key={product._id}
                  productId={product._id}
                  productImg={product.images[0]}
                  productName={product.name}
                  productPrice={product.price}
                  productPriceBeforeDiscount={product.price_before_discount}
                  productRating={product.rating}
                  productSold={product.sold}
                />
              ))}
            </RelatedGrid>
          </RelatedSection>
        )}
      </StyledContainer>
    </Wrap>
  );
};

export default CartPage;

/* ================== Styled ================== */
const Wrap = styled.div`
  padding: 4rem 0;
  background-color: #f5f5f5;
  input {
    accent-color: ${({ theme }) => theme.colors.primary};
  }
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
  align-items: center;
`;

const ProductHeader = styled.div`
  grid-column: span 6;
  display: flex;
  align-items: center;
  gap: 2rem;
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
  margin: 1rem 0;
`;

const ProductCell = styled.div`
  grid-column: span 6;
  display: flex;
  align-items: center;
  gap: 2rem;
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

const CartFooterWrapper = styled(Container)`
  position: sticky;
  bottom: 0;
  background-color: #fff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
  z-index: 10;
  padding: 1rem 0;
`;

const CartFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  .select-all {
    cursor: pointer;
  }

  input[type="checkbox"] {
    accent-color: ${({ theme }) => theme.colors.primary};
    width: 18px;
    height: 18px;
  }
  .delete {
    font-size: 1.6rem;
    outline: none;
    border: none;
    background-color: transparent;
  }
`;

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  span {
    font-weight: bold;
    margin-left: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 2rem;
  }

  .checkout {
    padding: 1.6rem 4rem;
    font-size: 1.6rem;
    font-weight: 500;
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
    border: none;
    border-radius: 0.4rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
  }
  .total {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`;

const TotalPriceContainer = styled.span`
  display: flex;
  flex-direction: column;
  .save {
    font-size: 1.4rem;
    color: #868686;
    font-weight: normal;
  }
`;
