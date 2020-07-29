export type NoteDto = {
  id: string;
  name: string;
  content: string;
  isRoot: boolean;
  isFinal: boolean;
  parents: string[];
  children: string[];
}

export type TaskDto = NoteDto & {
  progress: number;
}