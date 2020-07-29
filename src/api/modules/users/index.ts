import { httpClient } from "../../../util/http-client";
import { ApiRoute } from "./../../api-route";
import { UserDto } from "./dto/user.dto";

export const getOwnUser = () => {
  return httpClient.get<UserDto, UserDto>(ApiRoute.UsersMe);
};
