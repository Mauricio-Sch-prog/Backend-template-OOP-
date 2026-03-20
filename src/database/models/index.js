
import { connection } from "../../config/sequelize.js";
import { User } from "./User.js";

const models = {
  user: User.initModel(connection)
};

Object.values(models).forEach(model => {
  if(model.associate) model.associate(models);
});

export default models;
