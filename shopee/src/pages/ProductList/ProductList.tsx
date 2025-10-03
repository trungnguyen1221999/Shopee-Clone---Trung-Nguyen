import styled from "styled-components";
import Container from "../../components/Container";
import ProductCart from "../../components/ProductCard/ProductCart";
import LeftFilter from "./LeftFilter/LeftFilter";
import TopFiler from "./TopFilter/TopFiler";
import { getProductList } from "../../apis/productList.api";
import { useQuery } from "@tanstack/react-query";
import type { productType } from "../../types/product.type";
import { GridLoader } from "react-spinners";
import { useSearchParams } from "react-router-dom";

const ProductList = () => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 30;
  const order = (searchParams.get("order") as "desc" | "asc") || "desc";
  const sort_by =
    (searchParams.get("sort_by") as "createdAt" | "view" | "sold" | "price") ||
    "createdAt";
  const category = searchParams.get("category") || undefined;
  const rating_filter = Number(searchParams.get("rating_filter")) || undefined;
  const price_min = Number(searchParams.get("price_min")) || undefined;
  const price_max = Number(searchParams.get("price_max")) || undefined;
  const name = searchParams.get("name") || undefined;
  const { data, isLoading } = useQuery({
    queryKey: [
      "productList",
      page,
      limit,
      order,
      sort_by,
      category,
      rating_filter,
      price_min,
      price_max,
      name,
    ],
    queryFn: () =>
      getProductList({
        page,
        limit,
        order,
        sort_by,
        category,
        rating_filter,
        price_min,
        price_max,
        name,
      }),
    staleTime: 0,
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
            {data?.products.map((product: productType["data"]) => (
              <ProductCart
                key={product._id}
                productImg={product.images[0]}
                productName={product.name}
                productPrice={product.price}
                productPriceBeforeDiscount={product.price_before_discount}
                productRating={product.rating}
                productSold={product.sold}
              />
            ))}
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
