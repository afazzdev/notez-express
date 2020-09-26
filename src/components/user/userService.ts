// import AppError from "../../utils/AppError";
import { User } from "./userModel";

class UserServices {
  async getUsers(filter: any): Promise<User[]> {
    const users = await User.findAll({ where: filter });

    return users;
  }

  async getUser(pk: number): Promise<User | null> {
    const user = await User.findByPk(pk);

    return user;
  }

  async getProfile(id: number) {
    const user = await this.getUser(id);

    return user;
  }
}

export default new UserServices();
