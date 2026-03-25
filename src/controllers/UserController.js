import AuthService from "../services/UserService.js";
import ApiResponse from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/async-handler.js";


export class AuthController {
  static register = asyncHandler( async (req, res) => {
    const newUser = await AuthService.registerUser(req.body); 

    return res.status(201).json(new ApiResponse(200, { data: newUser }, "Registered succesfully!"));
  });

}