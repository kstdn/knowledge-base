import Button from "@pluralsight/ps-design-system-button";
import {
  EyeIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon
} from "@pluralsight/ps-design-system-icon";
import React, { SyntheticEvent } from "react";
import { GraphNodeExt } from "..";
import "./styles.css";

export const preventUndesiredEventHandling = (
  e: SyntheticEvent,
  callback?: Function
) => {
  e.stopPropagation();
  if (e.nativeEvent instanceof KeyboardEvent) {
    if (e.nativeEvent.key !== "Enter") return;
    e.preventDefault();
  }
  callback && callback();
};

type Props<TId> = {
  node: GraphNodeExt;
};

export function GraphActionButtons<TId>({ node }: Props<TId>) {
  const handleAddChildButtonInteraction = (e: SyntheticEvent) => {
    preventUndesiredEventHandling(e, () => {
      // onAddChildInitiated && onAddChildInitiated(node)
    });
  };

  const handleOpenButtonInteraction = (e: SyntheticEvent) => {
    preventUndesiredEventHandling(e, () => {
      // onOpenInitiated && onOpenInitiated(node)
    });
  };

  const handleEditButtonInteraction = (e: SyntheticEvent) => {
    preventUndesiredEventHandling(e, () => {
      // onEditInitiated && onEditInitiated(node)
    });
  };

  const handleDeleteButtonInteraction = (e: SyntheticEvent) => {
    preventUndesiredEventHandling(e, () => {
      // onDeleteInitiated && onDeleteInitiated(node)
    });
  };

  return (
    <div className="action-buttons">
      <Button
        appearance={Button.appearances.flat}
        icon={<EyeIcon />}
        size={Button.sizes.large}
        title="Open"
        onClick={handleOpenButtonInteraction}
        onKeyDown={handleOpenButtonInteraction}
      />
      {!node.final && (
        <Button
          appearance={Button.appearances.flat}
          icon={<PlusIcon />}
          size={Button.sizes.large}
          title="Add Task"
          onClick={handleAddChildButtonInteraction}
          onKeyDown={handleAddChildButtonInteraction}
        />
      )}
      <Button
        appearance={Button.appearances.flat}
        icon={<PencilIcon />}
        size={Button.sizes.large}
        title="Edit Task"
        onClick={handleEditButtonInteraction}
        onKeyDown={handleEditButtonInteraction}
      />
      <Button
        appearance={Button.appearances.flat}
        icon={<TrashIcon />}
        size={Button.sizes.large}
        title="Delete Task"
        onClick={handleDeleteButtonInteraction}
        onKeyDown={handleDeleteButtonInteraction}
      />
    </div>
  );
}

export default GraphActionButtons;
