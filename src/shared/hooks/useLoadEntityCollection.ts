import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { EntityCollectionStatus, Paginated, State } from "./useEntityState";

export const useLoadEntityCollection = <T>(
  loadFunc: (
    page: number,
    limit: number,
    filter?: string
  ) => Promise<Paginated<T>>,
  setState: Dispatch<SetStateAction<State<T>>>,
  page: number,
  limit: number,
  filter?: string,
  errorMessage: string = "There has been an error"
): { refresh: () => void } => {
  const load = useCallback(async () => {
    setState({
      items: [],
      paginationData: undefined,
      status: EntityCollectionStatus.Loading,
      error: undefined,
    });

    try {
      const { items, ...paginationData } = await loadFunc(page, limit, filter);

      if (items) {
        setState({
          items,
          paginationData,
          status:
            items.length === 0
              ? EntityCollectionStatus.ResolvedEmpty
              : EntityCollectionStatus.Resolved,
          error: undefined,
        });
      }
    } catch {
      setState({
        items: [],
        paginationData: undefined,
        status: EntityCollectionStatus.Rejected,
        error: errorMessage,
      });
    }
  }, [page, limit, filter, setState, loadFunc, errorMessage]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    refresh: load,
  };
};
