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
import Pagination from "../../components/Pagination/Pagination";
import type { ProductListParams } from "./../../apis/productList.api";
import { omitBy, isUndefined } from "lodash";
import getCategory from "../../apis/category.api";
import { useForm } from "react-hook-form";
export type QueryParams = ProductListParams;

const ProductList = () => {
  type paramsType = {
    [key in keyof QueryParams]: string;
  };
  const [searchParams] = useSearchParams();
  const params: paramsType = {
    page: searchParams.get("page") || "1",
    limit: searchParams.get("limit") || "20",
    order: (["asc", "desc"].includes(searchParams.get("order") || "")
      ? (searchParams.get("order") as "asc" | "desc")
      : "desc") as "asc" | "desc" | undefined,
    sort_by:
      (searchParams.get("sort_by") as
        | "createdAt"
        | "view"
        | "sold"
        | "price") || "createdAt",
    category: searchParams.get("category") || undefined,
    exclude: searchParams.get("exclude") || undefined,
    rating_filter: searchParams.get("rating_filter") || undefined,
    price_max: searchParams.get("price_max") || undefined,
    price_min: searchParams.get("price_min") || undefined,
    name: searchParams.get("name") || undefined,
  };

  const cleanedParams = omitBy(params, isUndefined);

  const { data, isLoading } = useQuery({
    queryKey: ["productList", cleanedParams],
    queryFn: () =>
      getProductList({
        ...cleanedParams,
        page: Number(cleanedParams.page),
        limit: Number(cleanedParams.limit),
      }),
  });
  const { data: categoriesData } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategory(),
  });
  // data.products chính là array bạn cần
  return (
    <StyledContainer>
      <Wrapper>
        <LeftFilterWrapper>
          <LeftFilter categories={categoriesData} params={cleanedParams} />
        </LeftFilterWrapper>
        <RightSide>
          {data?.pagination && (
            <TopFiler
              params={cleanedParams}
              page_size={data.pagination.page_size}
            />
          )}

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
          {data?.pagination && (
            <StyledPagination>
              <Pagination
                params={cleanedParams}
                page_size={data.pagination.page_size}
              />
            </StyledPagination>
          )}
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

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;
