import { Type } from "@sinclair/typebox";

const user = Type.Object({
  email: Type.String(),
});

export default {
  user,
};
