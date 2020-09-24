import AppError from "../../utils/AppError";
import { User } from "./userModel";

interface SignUpData {
  username: string;
  password: string;
}

interface SignInData {
  username: string;
  password: string;
}

interface IUserService {
  signUp: (data: SignUpData) => Promise<User | null>;
  signIn: (data: SignInData) => Promise<User | null>;
}

class UserServices implements IUserService {
  async signUp(data: SignUpData): Promise<User | null> {
    const newUser = await User.create(data);

    return newUser;
  }

  async signIn(data: SignInData): Promise<User | null> {
    const user = await User.findOne({ where: data });

    return user;
  }

  async checkUser({ id }: { id: number }) {
    try {
      const user = await User.findOne({ where: { id } });

      return user;
    } catch (error) {
      throw new AppError("Anda tidak memiliki akses!", 401);
    }
  }
}

export default new UserServices();
