import styled from "styled-components";

const Pagination = () => {
  return (
    <Wrapper>
      {Array(30)
        .fill(0)
        .map((_, index: number) => (
          <button key={index}>{index + 1}</button>
        ))}
    </Wrapper>
  );
};

export default Pagination;

const Wrapper = styled.div`
  display: flex;
  gap: 4px;
  button {
    padding: 5px;
    border: none;
    background-color: transparent;
    font-size: 16px;
    &:hover {
      color: ${({ theme }) => theme.colors.primary || "orange"};
    }
  }
`;
