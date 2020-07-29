import { useState } from 'react';

export type Paginated<T> = {
  items: T[];
} & PaginationData;

export type PaginationData = {
  itemsCount: number;
  totalCount: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
}

export enum EntityCollectionStatus {
  Idle = "Idle",
  Loading = "Loading",
  Resolved = "Resolved",
  ResolvedEmpty = "ResolvedEmpty",
  Rejected = "Rejected"
}

export type State<T> = {
  items: T[];
  paginationData: PaginationData | undefined;
  status: EntityCollectionStatus;
  error: string | undefined;
};

export const useEntityCollectionState = <T>() => {
  const [state, setState] = useState<State<T>>({
    items: [],
    paginationData: undefined,
    status: EntityCollectionStatus.Idle,
    error: undefined,
  });

  return [state, setState] as const;
};
