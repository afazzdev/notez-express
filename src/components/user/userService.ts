// import AppError from "../../utils/AppError";
import { User } from "./userModel";

class UserServices {
  async getUsers(filter: any): Promise<User[]> {
    const users = await User.findAll({ where: filter });

    return users;
  }
}

export default new UserServices();
