import Router from "express"
import { userController } from "./user.module";
const userRoutes = Router()

userRoutes.put('/update-role',userController.updateRole)




export default userRoutes;