import { useForm } from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa6";
import styled from "styled-components";
import { useEffect } from "react";

const QuantitySelector = ({ data }) => {
  const { quantity } = data;

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { quantityInput: 1 },
  });

  const currentValue = watch("quantityInput");

  // Giới hạn giá trị nhập
  useEffect(() => {
    if (currentValue > quantity) {
      setValue("quantityInput", quantity);
    }
  }, [currentValue, quantity, setValue]);

  return (
    <Wrapper>
      <label>Quantity</label>

      <div className="quantity-control">
        <FaMinus
          onClick={() =>
            setValue("quantityInput", Math.max(1, currentValue - 1), {
              shouldValidate: true,
            })
          }
        />

        <input
          type="number"
          {...register("quantityInput", {
            required: "Enter a quantity",
            min: { value: 1, message: "Minimum quantity is 1" },
            max: {
              value: quantity,
              message: `Maximum quantity is ${quantity}`,
            },
            valueAsNumber: true,
          })}
          onChange={(e) => {
            let val = Number(e.target.value);
            if (val < 1) val = 1;
            if (val <= quantity) {
              setValue("quantityInput", val);
            } else {
              setValue("quantityInput", quantity);
            }
          }}
        />

        <FaPlus
          onClick={() =>
            setValue("quantityInput", Math.min(quantity, currentValue + 1), {
              shouldValidate: true,
            })
          }
        />
      </div>
      {quantity > 0 ? (
        <span className="available">{quantity} IN STOCK</span>
      ) : (
        <span className="available">OUT OF STOCK</span>
      )}

      {errors.quantityInput && (
        <p className="error">{errors.quantityInput.message}</p>
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
