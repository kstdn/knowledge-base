export type UpdateNoteDto = {
  name?: string;
  content?: string;
  isRoot?: boolean;
  isFinal?: boolean;
}

export type UpdateTaskDto = UpdateNoteDto & {
  progress?: number;
}