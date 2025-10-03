import React from "react";
import { IoStar } from "react-icons/io5";
import styled from "styled-components";

interface ProductCartProps {
  productImg: string;
  productName: string;
  productPrice: number;
  productPriceBeforeDiscount: number;
  productRating: number;
  productSold: number;
}
const ProductCart: React.FC<ProductCartProps> = ({
  productImg,
  productName,
  productPrice,
  productPriceBeforeDiscount,
  productRating,
  productSold,
}) => {
  return (
    <Card>
      <Image src={productImg} />
      <Title>{productName}</Title>
      <Price>
        <OldPrice>{productPriceBeforeDiscount}</OldPrice>
        <NewPrice>{productPrice}</NewPrice>
      </Price>
      <Rating>
        <Stars>
          <IoStar />
          <span>{productRating}</span>
        </Stars>
        <Sold>{productSold} sold</Sold>
      </Rating>
    </Card>
  );
};

export default ProductCart;

// ================= Styled Components =================

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: white;
  border-radius: 2px;
  padding: 8px;
  transition: 0.3s;

  cursor: pointer;
  &:hover {
    transform: translateY(-4px);
    border: 1px solid ${({ theme }) => theme.colors.primary || "orange"};
  }
`;

const Image = styled.img`
  height: 188px;
  width: 188px;
  border-radius: 2px;
  object-fit: cover;
  overflow: hidden;
  margin: 0 auto;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* chỉ hiển thị 2 dòng */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Price = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const OldPrice = styled.p`
  text-decoration: line-through;
  color: #999;
  font-size: 12px;
`;

const NewPrice = styled.p`
  color: ${({ theme }) => theme.colors.primary || "orange"};
  font-weight: 600;
  font-size: 14px;
`;

const Rating = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Stars = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: gold;

  span {
    color: #333;
    font-weight: 500;
    font-size: 12px;
  }
`;

const Sold = styled.p`
  font-size: 12px;
  color: #666;
`;
