import AppError from "../../utils/AppError";
import { User } from "../user";

interface SignUpData {
  username: string;
  password: string;
}

interface SignInData {
  username: string;
  password: string;
}

class AuthService {
  async signUp({ password, username }: SignUpData): Promise<User | null> {
    try {
      const newUser = await User.create({
        password,
        username,
      });

      return newUser;
    } catch (error) {
      console.trace("SignUp error: ", error);
      throw new AppError(error.errors[0].message, 400);
    }
  }

  async signIn(data: SignInData): Promise<User | null> {
    const user = await User.findOne({
      where: {
        username: data.username,
      },
      attributes: {
        include: ["password"],
      },
    });

    if (!user || !(await user?.correctPassword(data.password, user.password))) {
      throw new AppError("Username atau Password salah!", 400);
    }

    return user;
  }

  async checkUser({ id }: { id: number }): Promise<User | null> {
    try {
      const user = await User.findByPk(id);

      return user;
    } catch (error) {
      throw new AppError("Anda tidak memiliki akses!", 401);
    }
  }
}

export default new AuthService();
