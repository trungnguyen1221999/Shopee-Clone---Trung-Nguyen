import React from "react";
import { IoStar } from "react-icons/io5";
import styled from "styled-components";

const ProductCart = () => {
  return (
    <Card>
      <Image src="/images/shoes.jpg" alt="Shoe" />
      <Title>
        Giày Đá Bóng Vapor 16 Elite Winbro VN Đế Đinh MG Siêu Bám Sân, Sân Cỏ
        Nhân Tạo Sân Cỏ Tự Nhiên
      </Title>
      <Price>
        <OldPrice>390.000₫</OldPrice>
        <NewPrice>270.000₫</NewPrice>
      </Price>
      <Rating>
        <Stars>
          <IoStar />
          <span>4.5</span>
        </Stars>
        <Sold>123 sold</Sold>
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
  width: 100%;
  border-radius: 2px;
  object-fit: cover;
  overflow: hidden;
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
