import { useForm } from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa6";
import styled from "styled-components";
import { useEffect } from "react";

const QuantitySelector = ({ data }) => {
  const { quantity } = data;

  // Giới hạn giá trị nhập
  const { register, setValue, watch } = useForm({
    defaultValues: {
      quantity: 1,
    },
  });

  const currentQuantity = Number(watch("quantity"));
  const handlePlus = () => {
    if (currentQuantity < quantity) {
      setValue("quantity", currentQuantity + 1);
    }
  };
  const handleMinus = () => {
    if (currentQuantity > 1) {
      setValue("quantity", currentQuantity - 1);
    }
  };
  const handleChange = (e) => {
    let value = Number(e.target.value);
    if (value < 1) value = 1;
    if (value > quantity) value = quantity;
    setValue("quantity", value);
  };
  return (
    <Wrapper>
      <label>Quantity</label>

      <div className="quantity-control">
        <FaMinus onClick={handleMinus} />

        <input
          value={currentQuantity}
          type="number"
          {...register("quantity", { onChange: handleChange })}
        />

        <FaPlus onClick={handlePlus} />
      </div>
      {quantity > 0 ? (
        <span className="available">{quantity} IN STOCK</span>
      ) : (
        <span className="available">OUT OF STOCK</span>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6rem;
  font-size: 1.4rem;
  color: #666;

  .quantity-control {
    display: flex;
    align-items: center;
    gap: 1rem;

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
        color: ${({ theme }) => theme.colors.primary || "#ee4d2d"};
      }
    }
  }

  .available {
    color: #888;
    transform: translateX(-5rem);
  }

  .error {
    color: red;
    font-size: 1.3rem;
    margin-top: 0.2rem;
  }
`;

export default QuantitySelector;
