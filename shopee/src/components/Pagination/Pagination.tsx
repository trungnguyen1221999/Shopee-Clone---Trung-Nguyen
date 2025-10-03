import styled from "styled-components";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Link, createSearchParams, useLocation } from "react-router-dom";

interface PropType {
  page: number;
  page_size: number;
}

const Pagination = ({ page, page_size }: PropType) => {
  const location = useLocation();

  // Lấy query hiện tại
  const currentParams = Object.fromEntries(
    new URLSearchParams(location.search)
  );

  const generatePageLink = (pageNumber: number) =>
    `${location.pathname}?${createSearchParams({
      ...currentParams,
      page: pageNumber.toString(),
    })}`;

  return (
    <Wrapper>
      <StyledLinkButton to={generatePageLink(page - 1)} disabled={page === 1}>
        <MdKeyboardArrowLeft />
      </StyledLinkButton>

      {Array.from({ length: page_size }, (_, index) => {
        const pageNumber = index + 1;
        return (
          <StyledLinkButton
            key={pageNumber}
            to={generatePageLink(pageNumber)}
            active={pageNumber === page}
          >
            {pageNumber}
          </StyledLinkButton>
        );
      })}

      <StyledLinkButton
        to={generatePageLink(page + 1)}
        disabled={page === page_size}
      >
        <MdKeyboardArrowRight />
      </StyledLinkButton>
    </Wrapper>
  );
};

export default Pagination;

// ---------- Styled ----------
const Wrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
`;

interface PageButtonProps {
  active?: boolean;
  disabled?: boolean;
}

const StyledLinkButton = styled(Link)<PageButtonProps>`
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid ${({ active }) => (active ? "#ff6f61" : "none")};
  background-color: ${({ active }) => (active ? "#ff6f61" : "white")};
  color: ${({ active }) => (active ? "white" : "#333")};
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:hover {
    color: ${({ active, disabled, theme }) =>
      !active && !disabled ? theme.colors.primary || "orange" : undefined};
    border-color: ${({ active, disabled, theme }) =>
      !active && !disabled ? theme.colors.primary || "orange" : undefined};
  }
`;
