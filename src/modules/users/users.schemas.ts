import { Type } from "@sinclair/typebox";
import schemas from "../../lib/schemas";

const getTestUser = {
  response: Type.Object({
    user: schemas.user,
  }),
};

const getUsers = {
  queryString: Type.Object({
    limit: Type.Number(),
  }),
  response: Type.Object({
    users: Type.Array(schemas.user),
  }),
};

export default {
  getTestUser,
  getUsers,
};
