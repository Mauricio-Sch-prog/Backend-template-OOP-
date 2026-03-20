import express from "express";
import models from "../database/models/index.js";



const router = express.Router();

router.post("/user/createUser", async (req, res) => {
  console.log("create user acessed");
  
  const { username, email, password } = req.body;
  try {
    const newUser = await models.user.create({
      username, email, password
    });  

    return res.status(200).json(newUser);
  
  } catch (err) {
    console.error(err);
    
  }

  return res.status(201).json( "não sobra nada");
});

export default router;