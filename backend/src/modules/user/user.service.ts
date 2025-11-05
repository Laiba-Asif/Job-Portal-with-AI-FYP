import UserModel from "../../database/models/user.model";

export class UserService {
    public async findUserById(userId:string){
        const user = UserModel.findById(userId, {
            password:false
        })

        return user || null
    }


      public async updateRole(userId: string, role: "jobseeker" | "recruiter") {
    if (!["jobseeker", "recruiter"].includes(role)) {
      throw new Error("Invalid role");
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select("-password");

    return user;
  }
}