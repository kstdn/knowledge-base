import { httpClient } from "../../../util/http-client";
import { Paginated } from "../shared/dto/Paginated";
import { ApiRoute } from "./../../api-route";
import { NoteDto, TaskDto } from "./dto/note.dto";
import { CreateNoteDto, CreateTaskDto } from "./dto/create-note.dto";
import { UpdateNoteDto, UpdateTaskDto } from './dto/update-note.dto';

export const getAllRootNotes = (page: number, limit: number, filter?: string) => {
  const baseFilter = "isRoot,eq,true";
  const customFilter = filter ? `:and:name,like,${filter}` : '';
  
  return httpClient.get<Paginated<NoteDto>, Paginated<NoteDto>>(
    ApiRoute.Notes,
    {
      params: {
        page,
        limit,
        filter: `${baseFilter}${customFilter}`,
      },
    }
  );
};

export const getAllRootTasks = () => {
  return httpClient.get<Paginated<TaskDto>, Paginated<TaskDto>>(
    ApiRoute.Tasks,
    {
      params: {
        filter: "isRoot,eq,true",
      },
    }
  );
};

export const getAllNotes = () => {
  return httpClient.get<Paginated<NoteDto>, Paginated<NoteDto>>(ApiRoute.Notes);
};

export const getAllTasks = () => {
  return httpClient.get<Paginated<TaskDto>, Paginated<TaskDto>>(ApiRoute.Tasks);
};

export const getNote = (id: string) => {
  return httpClient.get<NoteDto, NoteDto>(`${ApiRoute.Notes}/${id}`);
};

export const getTask = (id: string) => {
  return httpClient.get<TaskDto, TaskDto>(`${ApiRoute.Tasks}/${id}`);
};

export const createNote = (createNoteDto: CreateNoteDto) => {
  return httpClient.post<NoteDto, NoteDto>(`${ApiRoute.Notes}`, createNoteDto);
};

export const createTask = (createTaskDto: CreateTaskDto) => {
  return httpClient.post<TaskDto, TaskDto>(`${ApiRoute.Tasks}`, createTaskDto);
};

export const updateNote = (updateNoteDto: UpdateNoteDto) => {
  return httpClient.patch<NoteDto, NoteDto>(`${ApiRoute.Notes}`, updateNoteDto);
};

export const updateTask = (updateTaskDto: UpdateTaskDto) => {
  return httpClient.patch<TaskDto, TaskDto>(`${ApiRoute.Tasks}`, updateTaskDto);
};

export const attachNote = (childId: string, parentId: string) => {
  return httpClient.post<NoteDto, NoteDto>(`${ApiRoute.Notes}/${childId}/${parentId}`);
};

export const attachTask = (childId: string, parentId: string) => {
  return httpClient.post<TaskDto, TaskDto>(`${ApiRoute.Tasks}/${childId}/${parentId}`);
};

export const detachNote = (childId: string, parentId: string) => {
  return httpClient.delete<NoteDto, NoteDto>(`${ApiRoute.Notes}/${childId}/${parentId}`);
};

export const detachTask = (childId: string, parentId: string) => {
  return httpClient.delete<TaskDto, TaskDto>(`${ApiRoute.Tasks}/${childId}/${parentId}`);
};

export const deleteNote = (id: string) => {
  return httpClient.delete<NoteDto, NoteDto>(`${ApiRoute.Notes}/${id}`);
};

export const deleteTask = (id: string) => {
  return httpClient.delete<TaskDto, TaskDto>(`${ApiRoute.Tasks}/${id}`);
};
