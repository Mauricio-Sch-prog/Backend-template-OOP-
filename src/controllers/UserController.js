import AuthService from "../services/UserService.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/async-handler.js";


export class AuthController {

  static register = asyncHandler( async (req, res) => {
    const newUser = await AuthService.registerUser(req.body); 

    return res.status(201).json(new ApiResponse(200, { data: newUser }, "Registered succesfully!"));
  });


  static login = asyncHandler( async (req, res) => {
    const success = await AuthService.loginUser(req.body); 

    return res.status(201).json(new ApiResponse(200, { success }, `${success}`));
  });


  static verify = asyncHandler( async (req, res) => {
    const user = await AuthService.verifyEmail(req.params.verificationToken); 

    return res.status(201).json(new ApiResponse(200, { user }, "Email verified succesfully!"));
  });


  static forgotPassword = asyncHandler( async (req, res) => {
    const user = await AuthService.forgotPassword(req.body.email); 

    return res.status(201).json(new ApiResponse(200, {}, `A password reset email was sent to the email ${user.email}`));
  });

  
  static changePassword = asyncHandler( async (req, res) => {
    const verificationToken = req.params.verificationToken;
    const newPassword = req.body.password;
    const user = await AuthService.changePassword(verificationToken, newPassword); 

    return res.status(201).json(new ApiResponse(200, { user }, "Password changed successfully"));
  });


}