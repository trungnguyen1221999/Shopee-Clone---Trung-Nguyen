import styled from "styled-components";
import { Link, useLocation, createSearchParams } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import type { ProductListParams } from "../../apis/productList.api";

const RANGE = 2;

export default function Pagination({
  params,
  onToPage,
}: {
  params: ProductListParams & { page_size: number };
  onToPage: (page: number) => void;
}) {
  const location = useLocation();
  const currentParams = Object.fromEntries(
    new URLSearchParams(location.search)
  );

  const generatePageLink = (pageNumber: number) =>
    `${location.pathname}?${createSearchParams({
      ...currentParams,
      page: pageNumber.toString(),
    })}`;

  const renderPages = () => {
    const pages: (number | string)[] = [];
    const added = new Set<number>();

    const addPage = (p: number) => {
      if (p >= 1 && p <= params.page_size && !added.has(p)) {
        pages.push(p);
        added.add(p);
      }
    };

    // Đầu
    for (let i = 1; i <= RANGE; i++) addPage(i);

    // Cuối
    for (let i = params.page_size - RANGE + 1; i <= params.page_size; i++)
      addPage(i);

    // Xung quanh current page
    for (let i = params.page - RANGE; i <= params.page + RANGE; i++) addPage(i);

    // Sort lại để đúng thứ tự
    const sorted = Array.from(pages).sort((a, b) =>
      typeof a === "number" && typeof b === "number" ? a - b : 0
    );

    // Thêm dấu "..." khi có khoảng trống
    const result: (number | string)[] = [];
    for (let i = 0; i < sorted.length; i++) {
      const current = sorted[i] as number;
      const prev = sorted[i - 1] as number | undefined;
      if (prev !== undefined && current - prev > 1) {
        result.push("dot");
      }
      result.push(current);
    }

    return result.map((p, idx) => {
      if (p === "dot") return <Dot key={`dot-${idx}`}>...</Dot>;
      return (
        <PageLink key={p} to={generatePageLink(p)} active={p === params.page}>
          {p}
        </PageLink>
      );
    });
  };

  return (
    <Wrapper>
      <PageLinkArrow
        to={generatePageLink(Math.max(params.page - 1, 1))}
        disabled={params.page === 1}
      >
        <MdKeyboardArrowLeft />
      </PageLinkArrow>

      {renderPages()}

      <PageLinkArrow
        to={generatePageLink(Math.min(params.page + 1, params.page_size))}
        disabled={params.page === params.page_size}
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
  border: 1px solid ${({ active }) => (active ? "#ff6f61" : "#ddd")};
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

const PageLinkArrow = styled(PageLink)<PageProps>`
  padding: 4px 6px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
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
