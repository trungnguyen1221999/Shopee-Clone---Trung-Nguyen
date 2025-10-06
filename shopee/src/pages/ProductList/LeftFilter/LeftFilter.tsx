import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CiFilter } from "react-icons/ci";
import { IoStar } from "react-icons/io5";
import { createSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import type { PriceSchemaType } from "../../../untils/rules";
import { PriceSchema } from "../../../untils/rules";
interface categoryType {
  _id: string;
  name: string;
}
interface paramsType {
  page: string;
  limit: string;
  order?: string | undefined;
  sort_by?: string | undefined;
  category?: string | undefined;
  exclude?: string | undefined;
  rating_filter?: string | undefined;
  price_max?: string | undefined;
  price_min?: string | undefined;
  name?: string | undefined;
}

const LeftFilter = ({
  categories,
  params,
}: {
  categories: categoryType[];
  params: paramsType;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PriceSchemaType>({
    resolver: yupResolver(PriceSchema),
    defaultValues: {
      price_min: params.price_min || "",
      price_max: params.price_max || "",
    },
  });

  const navigate = useNavigate();

  const handleCategory = (categoryId: string) => {
    navigate({
      pathname: "/",
      search: createSearchParams({
        ...params,
        category: categoryId,
        page: "1",
      }).toString(),
    });
  };

  // Khi người dùng nhấn Apply
  const onSubmit = (data: PriceSchemaType) => {
    const newParams = {
      ...params,
      price_min: data.price_min || "",
      price_max: data.price_max || "",
      page: "1",
    };
    navigate({
      pathname: "/",
      search: createSearchParams(
        newParams as Record<string, string>
      ).toString(),
    });
  };
  const handleRatingFilter = (rating: number) => {
    navigate({
      pathname: "/",
      search: createSearchParams({
        ...params,
        page: "1",
        rating_filter: rating.toString(),
      }).toString(),
    });
  };

  const handleClearAll = () => {
    reset();
    navigate({
      pathname: "/",
      search: "",
    });
  };

  return (
    <Wrapper>
      <Header>
        <CiFilter />
        <h3>Search Filter</h3>
      </Header>

      {/* Category Filter */}
      <div>
        <p>By category</p>
        <CheckboxList>
          {categories?.map((category) => (
            <li key={category._id}>
              <label>
                <input
                  name="category"
                  type="radio"
                  checked={params.category === category._id}
                  onChange={() => handleCategory(category._id)}
                />
                {category.name}
              </label>
            </li>
          ))}
        </CheckboxList>
      </div>

      <Divider />

      {/* Price Range */}
      <div>
        <p>Price Range</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PriceRange>
            <input
              type="number"
              placeholder="₫ MIN"
              maxLength={13}
              {...register("price_min")}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="₫ MAX"
              maxLength={13}
              {...register("price_max")}
            />
          </PriceRange>

          {/* Hiển thị lỗi */}
          <ErrorBox>
            {(errors.price_min || errors.price_max) && (
              <p>{errors.price_min?.message}</p>
            )}
          </ErrorBox>

          <Button type="submit" style={{ marginTop: "8px" }}>
            Apply
          </Button>
        </form>
      </div>

      <Divider />

      {/* Rating */}
      <Rating>
        <p>Rating</p>
        {[5, 4, 3, 2, 1].map((r) => {
          const isSelected = params.rating_filter === r.toString();
          return (
            <RatingOption
              key={r}
              $selected={isSelected}
              onClick={() => handleRatingFilter(r)}
            >
              <Stars>
                <StarRating rating={r} /> {r < 5 && <span>& Up</span>}
              </Stars>
            </RatingOption>
          );
        })}
      </Rating>

      <Divider />

      <Button onClick={handleClearAll}>Clear all</Button>
    </Wrapper>
  );
};

export default LeftFilter;

// ⭐ Rating stars
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <IoStar key={i} color={i < rating ? "gold" : "#ccc"} />
        ))}
    </>
  );
};

// Styled components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  font-size: 18px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 12px 0;
`;

const CheckboxList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin: 6px 0;
  }

  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

const PriceRange = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 0.5rem;

  input {
    width: 100%;
    padding: 4px 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 13px;
  }

  span {
    font-size: 14px;
    font-weight: bold;
  }
`;

const ErrorBox = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 4px;

  p {
    margin: 0;
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary || "orange"};
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s;
  text-transform: uppercase;
  width: 100%;
  &:hover {
    opacity: 0.9;
  }
`;

const Stars = styled.span`
  display: inline-flex;
  gap: 4px;
  align-items: center;
`;

const Rating = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const RatingOption = styled.label<{ $selected: boolean }>`
  cursor: pointer;
  display: inline-flex;
  width: fit-content;
  align-items: center;
  transform: ${({ $selected }) => ($selected ? "scale(1.1)" : "scale(1)")};
  transform-origin: left center;
  transition: transform 0.2s ease;
  border: 1px solid ${({ $selected }) => ($selected ? "orange" : "transparent")};
  border-radius: 4px;
  padding: 2px 6px;
`;
