import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  /* Mặc định */
  max-width: 120rem; /* hoặc 120rem nếu bạn thích */
  width: 100%;
  background-color: #fff;
  padding: 2rem;

  /* Mobile */
  @media (max-width: 768px) {
    width: 90vw;
  }

  /* Desktop (từ 768px trở lên) */
  @media (min-width: 769px) {
    max-width: 80vw;
  }
`;

export default Container;
export const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background-color: #f5f5f5;
`;
