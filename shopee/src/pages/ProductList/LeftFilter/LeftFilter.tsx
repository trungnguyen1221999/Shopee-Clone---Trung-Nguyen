import { CiFilter } from "react-icons/ci";
import { IoStar } from "react-icons/io5";
import { createSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
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
  const Navigation = useNavigate();
  const handleCategory = (categoryId: string) => {
    Navigation({
      pathname: "/",
      search: createSearchParams({
        ...params,
        category: categoryId,
        page: "1",
      }).toString(),
    });
  };

  return (
    <Wrapper>
      <Header>
        <CiFilter />
        <h3>Search Filter</h3>
      </Header>

      <div>
        <p>By category</p>
        <CheckboxList>
          {categories &&
            categories.map((category) => (
              <li key={category._id}>
                <label>
                  <input
                    name="category"
                    type="radio"
                    onChange={() => handleCategory(category._id)}
                  />
                  {category.name}
                </label>
              </li>
            ))}
        </CheckboxList>
      </div>

      <Divider />

      <div>
        <p>Price Range</p>
        <PriceRange>
          <input type="number" placeholder="₫ MIN" maxLength={13} />
          <span>-</span>
          <input type="number" placeholder="₫ MAX" maxLength={13} />
        </PriceRange>
        <Button style={{ marginTop: "8px" }}>Apply</Button>
      </div>

      <Divider />

      <Rating>
        <p>Rating</p>
        <label>
          <Stars>
            <StarRating rating={5} />
          </Stars>
        </label>
        <label>
          <Stars>
            <StarRating rating={4} /> <span>& Up</span>
          </Stars>
        </label>
        <label>
          <Stars>
            <StarRating rating={3} /> <span>& Up</span>
          </Stars>
        </label>
        <label>
          <Stars>
            <StarRating rating={2} /> <span>& Up</span>
          </Stars>
        </label>
        <label>
          <Stars>
            <StarRating rating={1} /> <span>& Up</span>
          </Stars>
        </label>
      </Rating>

      <Divider />

      <Button>Clear all</Button>
    </Wrapper>
  );
};

export default LeftFilter;

// ⭐ Component hiển thị rating
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <IoStar
            key={index}
            color={index < rating ? "gold" : "#ccc"} // vàng hoặc xám
          />
        ))}
    </>
  );
};

// Wrapper
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

// Header
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  font-size: 18px;
`;

// Divider
const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 12px 0;
`;

// Checkbox list
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

// Price input
const PriceRange = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 1.5rem;

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

// Apply + Clear button
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

// Stars wrapper
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
