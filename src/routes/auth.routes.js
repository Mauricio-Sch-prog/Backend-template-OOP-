import express from "express";
import AuthService from "../services/UserService.js";


const router = express.Router();

router.post("/create", async (req, res) => {
  console.log("create user acessed");

  try {
    const newUser = await AuthService.registerUser(req.body); 

    return res.status(200).json(newUser);
  
  } catch (err) {
    console.error(err);
    
  }

  return res.status(201).json( "não sobra nada");
});

export default router;