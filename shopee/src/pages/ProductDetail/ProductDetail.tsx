import styled from "styled-components";
import Container from "../../components/Container";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getProduct from "../../apis/product.api";
import currencyFormat from "../../untils/currencyFormat";
import soldFormat from "../../untils/soldFormat";
import DOMPurify from "dompurify";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";

const MAX_VISIBLE_THUMBNAILS = 5;

const ProductDetail = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id as string),
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  if (!data) return null;

  const images = data.images || [];
  const cleanedDescription = DOMPurify.sanitize(data.description);

  const handleNext = () => {
    if (startIndex + MAX_VISIBLE_THUMBNAILS < images.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handleBack = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleClickImage = (index: number) => {
    setCurrentImageIndex(startIndex + index);
  };

  const visibleImages = images.slice(
    startIndex,
    startIndex + MAX_VISIBLE_THUMBNAILS
  );

  return (
    <Container>
      <Wrapper>
        <LeftSection>
          <MainImage src={images[currentImageIndex]} alt={data.name} />

          <ThumbnailList>
            {startIndex > 0 && (
              <ArrowLeft onClick={handleBack}>
                <MdKeyboardArrowLeft />
              </ArrowLeft>
            )}

            <ThumbnailsContainer>
              {visibleImages.map((image: string, index: number) => (
                <ThumbnailWrapper
                  key={index}
                  onMouseEnter={() => handleClickImage(index)}
                >
                  <Thumbnail
                    src={image}
                    alt=""
                    isActive={currentImageIndex === startIndex + index}
                  />
                </ThumbnailWrapper>
              ))}
            </ThumbnailsContainer>

            {startIndex + MAX_VISIBLE_THUMBNAILS < images.length && (
              <ArrowRight onClick={handleNext}>
                <MdKeyboardArrowRight />
              </ArrowRight>
            )}
          </ThumbnailList>
        </LeftSection>

        <RightSection>
          <Title>{data.name}</Title>

          <StatsRow>
            <Stat>
              <h3>{data.rating}</h3>
              <span>⭐</span>
            </Stat>
            <Stat>
              <h3>{soldFormat(data.sold)}</h3> <span>Sold</span>
            </Stat>
          </StatsRow>

          <PriceRow>
            <Price>{currencyFormat(data.price)}₫</Price>
            <BeforeDiscount>
              {currencyFormat(data.price_before_discount)}₫
            </BeforeDiscount>
            <Discount>
              {Math.round(
                ((data.price_before_discount - data.price) /
                  data.price_before_discount) *
                  100
              )}
              %
            </Discount>
          </PriceRow>

          <InfoGrid>
            <Shipping>
              <div className="a">Shipping</div>
              <div>
                <div className="b">Pre-Order (ships in 5 days)</div>
                <div className="c">Free Ship 0₫</div>
                <div>Get a 15.000₫ voucher if order late</div>
              </div>
            </Shipping>
            <Guarantee>
              <div className="a">Shopping Guarantee</div>
              <div className="d">Fashion Merchandise Insurance</div>
            </Guarantee>
          </InfoGrid>

          <Quantity>
            Quantity
            <FaMinus />
            <input type="number" placeholder="1" />
            <FaPlus /> <span>{data.quantity} pieces available</span>
          </Quantity>

          <ButtonGroup>
            <AddToCartButton>Add to cart</AddToCartButton>
            <BuyNowButton>Buy now</BuyNowButton>
          </ButtonGroup>
        </RightSection>
      </Wrapper>

      <div
        dangerouslySetInnerHTML={{
          __html: cleanedDescription,
        }}
      />
    </Container>
  );
};

export default ProductDetail;

// ================== STYLED COMPONENTS ==================

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 8fr;
  gap: 6rem;
  margin-top: 2rem;
  margin-bottom: 5rem;
`;

const LeftSection = styled.div`
  position: relative;
`;

const MainImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const ThumbnailList = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const ThumbnailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  width: 100%;
`;

const ThumbnailWrapper = styled.div`
  cursor: pointer;
`;

const Thumbnail = styled.img<{ isActive?: boolean }>`
  width: 100%;
  object-fit: cover;
  border: 2px solid
    ${({ isActive, theme }) =>
      isActive ? theme.colors.primary : "transparent"};
  border-radius: 4px;
  transition: border 0.2s ease;

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

const ArrowLeft = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  z-index: 10;
  background-color: #c0c0c0a7;
  border-radius: 4px;
`;

const ArrowRight = styled(ArrowLeft)`
  left: auto;
  right: 0;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 4rem;
  margin-bottom: 1rem;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;

  h3 {
    text-decoration: underline;
    font-size: 2rem;
  }

  span {
    margin-left: 0.5rem;
    color: #666;
    font-size: 1.5rem;
  }
`;

const InfoGrid = styled.div`
  display: flex;
  gap: 4rem;
  flex-direction: column;
  color: #707070;
  font-size: 1.5rem;

  .a {
    width: 10%;
  }

  .b {
    color: ${({ theme }) => theme.colors.primary};
  }

  .c {
    color: #00b1b1;
  }
`;

const Shipping = styled.div`
  display: flex;
  gap: 3rem;
`;

const Guarantee = styled.div`
  display: flex;
  gap: 3rem;

  .d {
    color: black;
  }
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #f3f3f3;
  padding: 1rem;
`;

const Price = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const BeforeDiscount = styled.div`
  font-size: 1.4rem;
  text-decoration: line-through;
  color: #999;
`;

const Discount = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  background-color: #ffcece;
  padding: 0.2rem 0.5rem;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 1rem 0;
  font-size: 1.5rem;
  color: #666;

  input {
    width: 80px;
    height: 40px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  svg {
    cursor: pointer;
    color: #999;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 3rem;
`;

const AddToCartButton = styled.button`
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  background: transparent;
  padding: 1.5rem 4rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.8rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const BuyNowButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  padding: 1.5rem 4rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.8rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;
