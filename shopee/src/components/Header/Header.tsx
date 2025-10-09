import styled from "styled-components";
import Container from "../Container";
import { IoEarthOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import NavHoverFunction from "../../function/NavHoverFunction";
import { LogoutApi } from "../../apis/logout.api";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { searchParam } from "../../untils/searchParams";
import { useForm } from "react-hook-form";
import { RegisterSchema, type RegisterSchemaType } from "../../untils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import readPurchase from "../../apis/readPurchase.api";
import CONST_STATUS from "../../untils/ConstStatus";
import currencyFormat from "../../untils/currencyFormat";

type FormData = Pick<RegisterSchemaType, "searchProduct">;

const searchProduct = RegisterSchema.pick(["searchProduct"]);
const Header = () => {
  const navigation = useNavigate();

  const params = searchParam();
  const { register, handleSubmit, resetField } = useForm({
    defaultValues: {
      searchProduct: "",
    },
    resolver: yupResolver(searchProduct),
  });
  const { setIsLogin, profile } = useContext(AppContext);
  const LogoutMutation = useMutation({
    mutationFn: LogoutApi,
    onSuccess: () => {
      setIsLogin(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleLogout = () => {
    LogoutMutation.mutate();
  };
  const onSearchSubmit = handleSubmit((data) => {
    console.log(data);
    handleNavigate(data);
  });
  const handleNavigate = (data: FormData) => {
    navigation({
      pathname: "/",
      search: createSearchParams({
        ...params,
        name: data.searchProduct,
        page: "1",
      }).toString(),
    });
  };

  const { data: purchaseInCart, isFetching: cartLoading } = useQuery({
    queryKey: ["purchase", { status: CONST_STATUS.addToCart }],
    queryFn: () => {
      return readPurchase(CONST_STATUS.addToCart);
    },
  });
  let totalPurchaseInCart = 0;
  if (purchaseInCart) totalPurchaseInCart = purchaseInCart.length;
  return (
    <Wrap>
      <StyledContainer>
        {/* Header Top */}
        <HeaderTop>
          <NavHoverFunction
            reference={
              <HeaderTopList>
                <IoEarthOutline />
                <p>English</p>
                <MdKeyboardArrowDown />
              </HeaderTopList>
            }
            children={
              <>
                <StyledNavInfo>English</StyledNavInfo>
                <StyledNavInfo>Tiếng Việt</StyledNavInfo>
              </>
            }
          />
          <NavHoverFunction
            reference={
              <HeaderTopList>
                <img
                  src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-funny-cat-taking-selfie-couple-of-kitty-with-a-smile-stick-png-image_3776833.jpg"
                  alt="avatar"
                />
                <p>{profile?.email}</p>
              </HeaderTopList>
            }
            children={
              <>
                <StyledNavInfo>My Account</StyledNavInfo>
                <StyledNavInfo>My Purchase</StyledNavInfo>
                <StyledNavInfo onClick={handleLogout}>Logout</StyledNavInfo>
              </>
            }
          />
        </HeaderTop>

        {/* Header Bottom */}
        <HeaderBottom>
          <Link to="/" onClick={() => resetField("searchProduct")}>
            <svg className="logo" viewBox="0 0 192 65" fill="white">
              {/* logo SVG here */}
            </svg>
          </Link>

          {/* Search */}
          <form onSubmit={onSearchSubmit}>
            <div className="search-container">
              <input
                type="text"
                placeholder="Free Delivery ..."
                {...register("searchProduct")}
              />
              <button className="search">
                <CiSearch />
              </button>
            </div>
          </form>

          {/* Cart */}
          <NavHoverFunction
            reference={
              <CartIconWrapper>
                <IoCartOutline className="cart" />
                {totalPurchaseInCart > 0 && (
                  <CartNumber>{totalPurchaseInCart}</CartNumber>
                )}
              </CartIconWrapper>
            }
            children={
              <CartDropdown>
                <div>Recent Add Products</div>
                <div className="product-list">
                  {cartLoading && <div>Loading...</div>}
                  {purchaseInCart?.length ? (
                    purchaseInCart.slice(0, 5).map((item) => (
                      <div className="product-item" key={item.product._id}>
                        <img src={item.product.image} />
                        <p>{item.product.name}</p>
                        <span className="price">
                          {currencyFormat(item.product.price)}₫
                        </span>
                      </div>
                    ))
                  ) : (
                    <EmtyCart>
                      <img
                        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/ef577a25315c384ed114.png"
                        alt=""
                      />
                      <p>Your cart is empty</p>
                    </EmtyCart>
                  )}
                </div>
                {purchaseInCart && (
                  <div className="cart-footer">
                    {totalPurchaseInCart} Products in cart
                    <button>View My Shopping Cart</button>
                  </div>
                )}
              </CartDropdown>
            }
          />
        </HeaderBottom>
      </StyledContainer>
    </Wrap>
  );
};

export default Header;

// Styled Components
const Wrap = styled.header`
  color: white;
  width: 100vw;
  background: linear-gradient(-180deg, #f53d2d, #f63) !important;
  padding: 1rem 0;
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: transparent !important;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
`;

const HeaderTopList = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  p {
    font-size: 1.5rem;
  }

  svg {
    font-size: 2rem;
  }

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const HeaderBottom = styled.div`
  display: grid;
  grid-template-columns: 2.3fr 12fr auto;
  align-items: center;
  gap: 2rem;
  margin-top: 1rem;

  .logo {
    width: 14rem;
    cursor: pointer;
  }

  .search-container {
    display: flex;
    align-items: center;
    border: 3px solid white;
    border-radius: 0.5rem;
    overflow: hidden;
    background: white;

    input {
      flex: 1;
      border: none;
      outline: none;
      padding: 0.8rem 1.2rem;
      font-size: 1.4rem;
      color: #333;
      background: transparent;
    }

    .search {
      background: #ee4d2d;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.8rem 1.2rem;
      cursor: pointer;
      transition: opacity 0.2s ease;
      border: none;

      &:hover {
        opacity: 0.9;
      }
      svg {
        color: white;
        font-size: 1.5rem;
      }
    }
  }

  .cart {
    font-size: 3.2rem;
    cursor: pointer;
    transition: transform 0.2s ease, color 0.2s ease;
    background: transparent;
  }
`;

const StyledNavInfo = styled.p`
  font-size: 1.4rem;
  padding: 0.5rem 0;
  cursor: pointer;

  &:hover {
    color: #ee4d2d;
  }
`;
const CartDropdown = styled.div`
  width: 37.5rem; // tăng 1.5 lần (25rem * 1.5)
  background: #fff; // nền trắng
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #666;

  div:first-child {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  div.product-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    div.product-item {
      display: flex;
      align-items: center;
      gap: 3rem;

      img {
        width: 4rem;
        height: 4rem;
        object-fit: cover;
        border-radius: 0.25rem;
        flex-shrink: 0;
      }

      p {
        margin: 0;
        font-size: 1.3rem;
        white-space: nowrap; // không xuống dòng
        overflow: hidden; // ẩn phần dư
        text-overflow: unset; // bỏ dấu ...
      }

      span.price {
        margin-left: auto;
        font-weight: 500;
      }
    }
  }

  div.cart-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;

    button {
      background-color: #ee4d2d;
      color: white;
      border: none;
      border-radius: 0.4rem;
      padding: 0.6rem 1rem;
      cursor: pointer;
      font-size: 1.3rem;
      white-space: nowrap;

      &:hover {
        opacity: 0.9;
      }
    }
  }
`;

const EmtyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  img {
    width: 20rem;
    height: auto;
  }
  p {
    font-size: 1.6rem;
    color: #999;
  }
`;

const CartNumber = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #ffff;
  color: #ee4d2d;
  font-size: 1.2rem;
  font-weight: bold;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;
const CartIconWrapper = styled.div`
  position: relative;
  display: inline-block;

  .cart {
    font-size: 3.2rem;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  &:hover .cart {
    transform: scale(1.1);
  }
`;
