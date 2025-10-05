import type { Dictionary } from "lodash";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { createSearchParams, Link } from "react-router-dom";
import styled from "styled-components";
import PATH_CONST from "../../../Constant/Path.Const";

interface TopFilerProps {
  params: Dictionary<string>;
  page_size: number;
}

const TopFiler = ({ params, page_size }: TopFilerProps) => {
  const { page } = params;
  return (
    <Wrapper>
      <SortSection>
        <span>Sort by</span>
        <SortButtons>
          <SortButton active>Relevance</SortButton>
          <SortButton>Latest</SortButton>
          <SortButton>Top Sales</SortButton>
        </SortButtons>
        <SortSelect>
          <select>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </SortSelect>
      </SortSection>

      <Pagination>
        <PageInfo>
          <div style={{ fontWeight: "bold", color: "#ff6f61", scale: 1.3 }}>
            {page}
          </div>
          <span>/</span>
          <div>{page_size}</div>
        </PageInfo>
        <PageButtons>
          <StyledLink
            to={{
              pathname: PATH_CONST.HOME,
              search: createSearchParams({
                ...params,
                page: String(Math.max(Number(page) - 1, 1)),
              }).toString(),
            }}
            disabled={Number(page) === 1}
          >
            <MdKeyboardArrowLeft />
          </StyledLink>
          <StyledLink
            to={{
              pathname: PATH_CONST.HOME,
              search: createSearchParams({
                ...params,
                page: String(Math.min(Number(page) + 1, page_size)),
              }).toString(),
            }}
            disabled={Number(page) === page_size}
          >
            <MdKeyboardArrowRight />
          </StyledLink>
        </PageButtons>
      </Pagination>
    </Wrapper>
  );
};

export default TopFiler;

// ================= Styled Components =================

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  background-color: #ebebeb;
  padding: 12px 16px;
`;

const SortSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SortButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const SortButton = styled.button<{ active?: boolean }>`
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : "white"};
  color: ${({ active }) => (active ? "white" : "black")};
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    opacity: 0.9;
  }
`;

const SortSelect = styled.div`
  select {
    padding: 6px 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
`;

const PageButtons = styled.div`
  display: flex;
  gap: 4px;

  button {
    border: 1px solid #e6e6e6;
    background: white;
    padding: 6px;
    border-radius: 2px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const StyledLink = styled(Link)<{ disabled: boolean }>`
  border: 1px solid #e6e6e6;
  background: white;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  padding: 0.5rem;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  svg {
    font-size: 1.5rem;
  }
`;
