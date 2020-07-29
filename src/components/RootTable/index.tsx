import { PencilIcon, PlusIcon } from "@pluralsight/ps-design-system-icon";
import { PageWidthLayout } from "@pluralsight/ps-design-system-layout";
import Table from "@pluralsight/ps-design-system-table";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getAllRootNotes, getAllRootTasks } from "../../api/modules/notes";
import { NoteDto, TaskDto } from "../../api/modules/notes/dto/note.dto";
import { entityInitialLimit, entityInitialPage } from "../../constant-values";
import Paginator from "../../shared/components/Paginator";
import Spinner from "../../shared/components/Spinner";
import {
  EntityCollectionStatus,
  useEntityCollectionState,
} from "../../shared/hooks/useEntityState";
import { useLoadEntityCollection } from "../../shared/hooks/useLoadEntityCollection";
import { clickable } from "../../shared/styles/clickable";

export enum RootEntityType {
  Notebook = "notebook", // root note
  Project = "project", // root task
}

type Props = {
  type: RootEntityType;
};

const RootTable = ({ type }: Props) => {
  const history = useHistory();
  const [state, setState] = useEntityCollectionState<NoteDto | TaskDto>();
  const { items: entity, paginationData, status, error } = state;

  const [page, setPage] = useState(entityInitialPage);
  const [limit, setLimit] = useState(entityInitialLimit);

  const loadFunc = type === RootEntityType.Notebook ? getAllRootNotes : getAllRootTasks;

  useLoadEntityCollection<NoteDto | TaskDto>(
    loadFunc,
    setState,
    page,
    limit
  );

  const open = (entity: NoteDto | TaskDto) => {
    history.push("/task-graph", entity);
  };

  const redirectToCreate = () => {
    history.push(`/create-${type}`);
  };

  if (status === EntityCollectionStatus.Idle) return null;
  if (status === EntityCollectionStatus.Rejected) return null;

  return (
    <PageWidthLayout style={{ height: "100%" }}>
      {status === EntityCollectionStatus.Loading ? (
        <Spinner />
      ) : (
        <Table>
          <Table.Row>
            <Table.ColumnHeader>{type}</Table.ColumnHeader>
            <Table.Cell
              onClick={redirectToCreate}
              align={Table.aligns.right}
              style={clickable}
            >
              <PlusIcon />
            </Table.Cell>
          </Table.Row>
          {entity.map((entity) => (
            <Table.Row key={entity.id}>
              <Table.Cell onClick={() => open(entity)} style={clickable}>
                {entity.name}
              </Table.Cell>
              <Table.Cell align={Table.aligns.right}>
                <Link to={{ pathname: `/update-${type}`, state: entity }}>
                  <PencilIcon />
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
          <Table.Row key={0}>
            <Table.ColumnHeader align={Table.aligns.right}>
              {paginationData && (
                <Paginator
                  currentPage={paginationData.currentPage}
                  itemsCount={paginationData.itemsCount}
                  totalCount={paginationData.totalCount}
                  itemsPerPage={paginationData.itemsPerPage}
                  onGoToPage={(page) => setPage(page)}
                />
              )}
            </Table.ColumnHeader>
          </Table.Row>
        </Table>
      )}
    </PageWidthLayout>
  );
};

export default RootTable;
