import styled from "styled-components";
import Container from "../../components/Container";
import ProductCart from "../../components/ProductCard/ProductCart";
import LeftFilter from "./LeftFilter/LeftFilter";
import TopFiler from "./TopFilter/TopFiler";
import { getProductList } from "../../apis/productList.api";
import { useQuery } from "@tanstack/react-query";
import type { productType } from "../../types/product.type";
import { GridLoader } from "react-spinners";

const ProductList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["productList"],
    queryFn: () => getProductList({ page: 1, limit: 30 }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // data.products chính là array bạn cần
  return (
    <StyledContainer>
      <Wrapper>
        <LeftFilterWrapper>
          <LeftFilter />
        </LeftFilterWrapper>
        <RightSide>
          <TopFiler />
          {isLoading && (
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
          )}
          <ProductGrid>
            {data?.products.map(
              (product: productType["data"], index: number) => (
                <ProductCart
                  key={index}
                  productImg={product.images[0]}
                  productName={product.name}
                  productPrice={product.price}
                  productPriceBeforeDiscount={product.price_before_discount}
                  productRating={product.rating}
                  productSold={product.sold}
                />
              )
            )}
          </ProductGrid>
        </RightSide>
      </Wrapper>
    </StyledContainer>
  );
};

export default ProductList;

const StyledContainer = styled(Container)`
  margin-top: 3rem;
  margin-bottom: 5rem;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
`;

const LeftFilterWrapper = styled.div`
  grid-column: span 2; /* LeftFilter chiếm 2/12 */
`;

const RightSide = styled.div`
  grid-column: span 10; /* Right chiếm 10/12 */
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProductGrid = styled.div`
  display: grid;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* mobile: 2 cột */
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr); /* tablet: 4 cột */
  }

  @media (min-width: 1025px) {
    grid-template-columns: repeat(5, 1fr); /* desktop lớn: 5 cột */
  }
`;
