import {
  CaretLeftIcon,
  CaretRightIcon,
} from "@pluralsight/ps-design-system-icon";
import React from "react";

type Props = {
  currentPage: number;
  itemsCount: number;
  totalCount: number;
  itemsPerPage: number;

  maxDisplayedPages?: number;

  onGoToPage: (page: number) => void;
};

const paginatorContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const Paginator = ({
  itemsCount,
  totalCount,
  itemsPerPage,
  currentPage,
  onGoToPage,
}: Props) => {
  const base = (currentPage - 1) * itemsPerPage;
  const from = itemsCount === 0 ? 0 : base + 1;
  const to = base + itemsCount;

  const isFirstPage = base === 0;
  const isLastPage = to === totalCount;

  return (
    <div style={paginatorContainerStyle}>
      {!isFirstPage && <CaretLeftIcon onClick={() => onGoToPage(currentPage - 1)} />}
      {`${from} - ${to} of ${totalCount}`}
      {!isLastPage && <CaretRightIcon onClick={() => onGoToPage(currentPage + 1)} />}
    </div>
  );
};

export default Paginator;
