import { Type } from "@sinclair/typebox";
import schemas from "../../lib/schemas";

const register = {
  body: Type.Object({
    email: Type.String(),
    password: Type.String(),
  }),
  response: Type.Object({
    token: Type.String(),
    user: schemas.user,
  }),
};

const login = {
  body: Type.Object({
    email: Type.String(),
    password: Type.String(),
  }),
  response: Type.Object({
    token: Type.String(),
    user: schemas.user,
  }),
};

export default {
  register,
  login,
};
