import CircularProgress from '@pluralsight/ps-design-system-circularprogress';
import { colorsCode, colorsPrimaryAction } from "@pluralsight/ps-design-system-core";
import React, { FunctionComponent, useState } from "react";
import { Graph, GraphNodeDef } from "react-graph";
import { useHistory } from 'react-router-dom';
import { NoteDto } from '../../api/modules/notes/dto/note.dto';
import GraphActionButtons from "./GraphActionButtons";
import { getNotesByIds } from "./service";
import "./styles.css";

export class GraphNodeExt extends GraphNodeDef<string> {
  constructor(
    name: string,
    id: string,
    childrenIds: string[],
    public final?: boolean,
    public data?: any
  ) {
    super(name, id, childrenIds);
  }
}

const nodeContent: FunctionComponent<GraphNodeExt> = (node) => (
  <div
    style={{
      padding: "10px",
    }}
  >
    {node.name} {node.data}
  </div>
);

const LoadingIndicator: FunctionComponent = () => (
  <div
    style={{
      height: "34px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CircularProgress size={CircularProgress.sizes.small} />  </div>
);

const TaskGraph = () => {
  const history = useHistory<NoteDto>();
  const notebook =  history.location.state;
  const rootGraphNode: GraphNodeExt = {
    name: notebook.name,
    id: notebook.id,
    childrenIds: notebook.children
  }
  const [selectedNode, setSelectedNode] = useState<GraphNodeExt>();

  const [nodes, setNodes] = useState(new Map<string, GraphNodeExt>([[rootGraphNode.id, rootGraphNode]]));

  const onNodeSelected = (node: GraphNodeExt) => {
    setSelectedNode(node);
  };

  return (
    <div className="graph-container">
      <div className="graph">
        <Graph
          rootNodeId={rootGraphNode.id}
          nodes={nodes}
          nodeContent={nodeContent}
          persistVisibleState={true}
          loadingIndicator={<LoadingIndicator />}
          loadNodesAsyncFunc={getNotesByIds}
          onNodeSelected={onNodeSelected}
          graphStyles={{
            nodeStrokeColor: colorsPrimaryAction.background,
            nodePadding: "0",
            nodeHeight: "36px",
            branchStrokeColor: colorsCode.gray,
          }}
        />
      </div>
      <div className="graph-buttons-container">
        {selectedNode && <GraphActionButtons node={selectedNode} />}
      </div>
    </div>
  );
};

export default TaskGraph;
