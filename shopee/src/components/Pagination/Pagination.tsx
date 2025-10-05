import styled from "styled-components";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import type { QueryParams } from "../../pages/ProductList/ProductList";
import { createSearchParams, Link } from "react-router-dom";
import PATH_CONST from "../../Constant/Path.Const";

const RANGE = 2;
export default function Pagination({
  params,
  page_size,
}: {
  params: QueryParams;
  page_size: number;
}) {
  const page = Number(params.page);

  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <span
            key={index}
            className="mx-2 rounded border bg-white px-3 py-2 shadow-sm"
          >
            ...
          </span>
        );
      }
      return null;
    };
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <Dot
            key={index}
            className="mx-2 rounded border bg-white px-3 py-2 shadow-sm"
          >
            ...
          </Dot>
        );
      }
      return null;
    };
    return Array(page_size)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;

        // Điều kiện để return về ...
        if (
          page <= RANGE * 2 + 1 &&
          pageNumber > page + RANGE &&
          pageNumber < page_size - RANGE + 1
        ) {
          return renderDotAfter(index);
        } else if (page > RANGE * 2 + 1 && page < page_size - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index);
          } else if (
            pageNumber > page + RANGE &&
            pageNumber < page_size - RANGE + 1
          ) {
            return renderDotAfter(index);
          }
        } else if (
          page >= page_size - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < page - RANGE
        ) {
          return renderDotBefore(index);
        }
        return (
          <PageLink
            to={{
              pathname: PATH_CONST.HOME,
              search: createSearchParams({
                ...params,
                page: pageNumber.toString(),
              }).toString(),
            }}
            active={pageNumber === page}
            key={index}
          >
            {pageNumber}
          </PageLink>
        );
      });
  };
  return (
    <Wrapper>
      <PageLinkArrow
        to={{
          pathname: PATH_CONST.HOME,
          search: createSearchParams({
            ...params,
            page: Math.max(page - 1, 1).toString(),
          }).toString(),
        }}
        disabled={page === 1}
      >
        <MdKeyboardArrowLeft />
      </PageLinkArrow>

      {renderPagination()}

      <PageLinkArrow
        to={{
          pathname: PATH_CONST.HOME,
          search: createSearchParams({
            ...params,
            page: Math.min(page + 1, page_size).toString(),
          }).toString(),
        }}
        disabled={page === page_size}
      >
        <MdKeyboardArrowRight />
      </PageLinkArrow>
    </Wrapper>
  );
}

// ---------- Styled Components ----------
const Wrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
`;

interface PageProps {
  active?: boolean;
  disabled?: boolean;
}

const PageLink = styled(Link)<PageProps>`
  padding: 6px 10px;
  border-radius: 4px;
  background-color: ${({ active }) => (active ? "#ff6f61" : "white")};
  color: ${({ active }) => (active ? "white" : "#333")};
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: ${({ active, theme }) =>
      !active ? theme.colors.primary || "orange" : undefined};
    border-color: ${({ active, theme }) =>
      !active ? theme.colors.primary || "orange" : undefined};
  }
`;
const PageLinkArrow = styled(Link)<PageProps>`
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
  color: #333;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    color: ${({ theme }) => theme?.colors?.primary || "orange"};
    border-color: ${({ theme }) => theme?.colors?.primary || "orange"};
  }
`;

const Dot = styled.span`
  padding: 6px 10px;
  margin: 0 2px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  cursor: default;
`;
