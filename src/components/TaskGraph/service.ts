import { GraphNodeExt } from ".";
import { getNote } from "../../api/modules/notes";
import { NoteDto } from "../../api/modules/notes/dto/note.dto";

const convert = (noteDto: NoteDto): GraphNodeExt => {
  return new GraphNodeExt(noteDto.name, noteDto.id, noteDto.children, noteDto.isFinal);
}

export const getNotesByIds = async (ids: string[]): Promise<GraphNodeExt[]> => {
  const noteDtos = await Promise.all(ids.map((id) => getNote(id)));
  return noteDtos.map(noteDto => convert(noteDto));
};
