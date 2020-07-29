export type CreateNoteDto = {
  name: string;
  content: string;
  isRoot: boolean;
  isFinal: boolean;
  parentId?: string;
}

export type CreateTaskDto = CreateNoteDto & {
  progress: number;
}