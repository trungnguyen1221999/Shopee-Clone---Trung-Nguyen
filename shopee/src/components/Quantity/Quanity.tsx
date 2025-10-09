import { FaMinus, FaPlus } from "react-icons/fa6";
import styled from "styled-components";

interface QuanityProps {
  stock: number;
  value: number;
  onChange: (value: number) => void;
}

const Quanity = ({ stock, value, onChange }: QuanityProps) => {
  const handleMinus = () => {
    if (value > 1) onChange(value - 1);
  };

  const handlePlus = () => {
    if (value < stock) onChange(value + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = Number(e.target.value);
    if (isNaN(val) || val < 1) val = 1;
    if (val > stock) val = stock;
    onChange(val);
  };

  return (
    <Wrapper>
      <div className="control">
        <FaMinus onClick={handleMinus} />
        <input type="number" value={value} onChange={handleChange} />
        <FaPlus onClick={handlePlus} />
      </div>
      <span className="stock">{stock} in stock</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  font-size: 1.4rem;

  .control {
    display: flex;
    align-items: center;
    gap: 1rem;

    input {
      width: 70px;
      height: 40px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    svg {
      cursor: pointer;
      color: #999;
      transition: color 0.2s;
      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }

  .stock {
    color: #888;
  }
`;

export default Quanity;
