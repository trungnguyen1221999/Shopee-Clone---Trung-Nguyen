import styled from "styled-components";
import Container from "../../components/Container";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getProduct from "../../apis/product.api";
import currencyFormat from "../../untils/currencyFormat";
import soldFormat from "../../untils/soldFormat";
import DOMPurify from "dompurify";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useContext, useState } from "react";
import getCategory from "../../apis/category.api";
import ProductCart from "../../components/ProductCard/ProductCart";
import { ProductGrid } from "../ProductList/ProductList";
import type { productType } from "../../types/product.type";
import { getProductList } from "../../apis/productList.api";
import { GridLoader } from "react-spinners";
import { getIdFromURL } from "../../untils/urlFormat";
import Quanity from "../../components/Quantity/Quanity";
import AddToCart from "../../apis/atc.api";
import CONST_STATUS from "../../untils/ConstStatus";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";

const MAX_VISIBLE_THUMBNAILS = 5;

const ProductDetail = () => {
  const queryClient = useQueryClient();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const productId = getIdFromURL(id as string);

  // ✅ Always call hooks unconditionally
  const { data: productData, isLoading: isProductLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId as string),
    enabled: !!productId,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategory(),
  });

  // ✅ Compute category safely
  const category = categoriesData?.find(
    (item) => item._id === productData?.category._id
  );

  const { data: categoryProductsData } = useQuery({
    queryKey: ["productList", category?._id],
    queryFn: () =>
      getProductList({
        category: category?._id || "",
      }),
    enabled: !!category?._id, // ✅ Prevent running before category ready
  });

  const { data: topSelling } = useQuery({
    queryKey: ["topSelling"],
    queryFn: () =>
      getProductList({
        limit: 3,
        sort_by: "sold",
        order: "desc",
      }),
  });

  const addToCartMutaion = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => AddToCart(productId, quantity),
  });

  // Hàm xử lý khi user nhấn "Thêm vào giỏ hàng"
  const handleAddToCart = () => {
    // Nếu không có dữ liệu sản phẩm thì không làm gì
    if (!productData) return;

    // Gọi mutation của react-query để thêm sản phẩm vào giỏ hàng
    addToCartMutaion.mutate(
      { productId: productData._id, quantity }, // dữ liệu gửi lên server
      {
        // Callback khi server trả về thành công
        onSuccess: (newItem) => {
          /**
           * 1️⃣ Cập nhật cache ngay lập tức (không cần chờ refetch)
           * - ["purchase", CONST_STATUS.addToCart] là key của query cache
           * - oldData: dữ liệu hiện tại trong cache
           * - Nếu cache đang trống, tạo mảng mới chứa newItem
           * - Nếu cache đã có dữ liệu, thêm newItem vào cuối mảng
           */
          queryClient.setQueryData(
            ["purchase", CONST_STATUS.addToCart],
            (oldData: any) => {
              if (!oldData) return [newItem]; // cache trống
              return [...oldData, newItem]; // thêm sản phẩm mới vào cache
            }
          );

          /**
           * 2️⃣ Invalidate query (tuỳ chọn nhưng thường nên làm)
           * - Đánh dấu query này "cần refetch" từ server
           * - Giúp đồng bộ dữ liệu với server, đảm bảo cache luôn chính xác
           */
          queryClient.invalidateQueries([
            "purchase",
            CONST_STATUS.addToCart,
          ] as const);
          toast.success("Item added to cart successfully!", {
            autoClose: 2000, // tự tắt sau 2 giây
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        },

        // Callback khi mutation lỗi (tuỳ chọn)
        onError: (error) => {
          // Có thể hiển thị thông báo lỗi cho người dùng
          toast.error("Failed to add item to cart. Please try again.");
          console.log(error);
        },
      }
    );
  };

  if (isProductLoading || !productData) {
    return (
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <GridLoader color="#ff6f61" />
        </div>
      </Container>
    );
  }

  const images = productData.images || [];
  const cleanedDescription = DOMPurify.sanitize(productData.description);

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
          <MainImage src={images[currentImageIndex]} alt={productData.name} />

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
          <RightContainer>
            <Title>{productData.name}</Title>

            <StatsRow>
              <Stat>
                <h3>{productData.rating}</h3>
                <span>⭐</span>
              </Stat>
              <Stat>
                <h3>{soldFormat(productData.sold)}</h3> <span>Sold</span>
              </Stat>
            </StatsRow>

            <PriceRow>
              <Price>{currencyFormat(productData.price)}₫</Price>
              <BeforeDiscount>
                {currencyFormat(productData.price_before_discount)}₫
              </BeforeDiscount>
              <Discount>
                {Math.round(
                  ((productData.price_before_discount - productData.price) /
                    productData.price_before_discount) *
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
          </RightContainer>

          <RightContainer>
            <div className="Quantity">
              <p>Quantity</p>
              <Quanity
                stock={productData.quantity}
                value={quantity}
                onChange={setQuantity}
              />
            </div>

            <ButtonGroup>
              <AddToCartButton onClick={handleAddToCart}>
                Add to cart
              </AddToCartButton>
              <BuyNowButton>Buy now</BuyNowButton>
            </ButtonGroup>
          </RightContainer>
        </RightSection>
      </Wrapper>

      <ContentWrapper>
        <Description>
          <Desc
            dangerouslySetInnerHTML={{
              __html: cleanedDescription,
            }}
          />
        </Description>

        {topSelling && (
          <TopSelling>
            <h2>Top Selling Products</h2>
            {topSelling.products.map((product: productType["data"]) => (
              <ProductCartStyle
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
          </TopSelling>
        )}
      </ContentWrapper>

      {categoryProductsData && categoryProductsData.products.length > 0 && (
        <RelatedSection>
          <RelatedTitle>You May Also Like</RelatedTitle>
          <RelatedGrid>
            {categoryProductsData.products.map(
              (product: productType["data"]) => (
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
              )
            )}
          </RelatedGrid>
        </RelatedSection>
      )}
    </Container>
  );
};

export default ProductDetail;

// ================== STYLED COMPONENTS ==================
// (giữ nguyên toàn bộ styled-components như bạn có)

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
  width: 500px;
  height: 500px;
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
  width: 100px;
  height: 100px;
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
  justify-content: space-between;
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

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 4rem;
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
// ============= YOU MAY ALSO LIKE SECTION =============
const RelatedSection = styled.div`
  margin-top: 6rem;
`;

const RelatedTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  color: #222;

  &::after {
    content: "";
    position: absolute;
    bottom: -0.8rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`;

const RelatedGrid = styled(ProductGrid)`
  margin-top: 3rem;
  gap: 2rem;
  justify-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 20rem;
  margin-top: 3rem;
`;

const Description = styled.div`
  flex: 1;
`;

const TopSelling = styled.div`
  width: 15%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
  }
`;

const Desc = styled.div`
  font-size: 1.3rem;
  color: #333;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const ProductCartStyle = styled(ProductCart)``;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .Quantity {
    display: flex;
    align-items: center;
    gap: 3rem;
    font-size: 1.5rem;
    color: rgb(112, 112, 112);
  }
`;
