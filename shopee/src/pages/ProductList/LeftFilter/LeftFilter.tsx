import { CiFilter } from "react-icons/ci";
import { IoStar } from "react-icons/io5";
import styled from "styled-components";

const LeftFilter = () => {
  return (
    <Wrapper>
      <Header>
        <CiFilter />
        <h3>Search Filter</h3>
      </Header>

      <div>
        <p>By category</p>
        <CheckboxList>
          <li>
            <label>
              <input type="checkbox" />
              Football Shoes
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              Sneaker Shoes
            </label>
          </li>
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
            <IoStar />
            <IoStar />
            <IoStar />
            <IoStar />
            <IoStar />
          </Stars>
        </label>
        <label>
          <Stars>
            <IoStar />
            <IoStar />
            <IoStar />
            <IoStar />
          </Stars>{" "}
          & up
        </label>
        <label>
          <Stars>
            <IoStar />
            <IoStar />
            <IoStar />
          </Stars>{" "}
          & up
        </label>
        <label>
          <Stars>
            <IoStar />
            <IoStar />
          </Stars>{" "}
          & up
        </label>
        <label>
          <Stars>
            <IoStar />
          </Stars>{" "}
          & up
        </label>
      </Rating>

      <Divider />

      <Button>Clear all</Button>
    </Wrapper>
  );
};

export default LeftFilter;
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
// Price input
const PriceRange = styled.div`
  display: flex;
  gap: 4px; /* giảm khoảng cách giữa MIN - MAX */
  align-items: center;
  margin-top: 8px;
  margin-bottom: 1.5rem;

  input {
    width: 100%;
    padding: 4px 6px; /* padding nhỏ hơn */
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 13px; /* font nhỏ hơn */
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

// Stars
const Stars = styled.span`
  color: gold;
  display: inline-flex;
  gap: 2px;
`;

const Rating = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
