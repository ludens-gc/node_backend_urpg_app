import jwt from "jsonwebtoken";
import User from "../models/users.js";

class UsersController {
  static async getAllUsers(req, res) {
    try {
      const usersList = await User.find({});
      res.status(200).json(usersList);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuários", error: error });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuário", error: error });
    }
  }

  static async getUserByUsername(req, res) {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuário", error: error });
    }
  }

  static async createUser(req, res) {
    try {
      const { username, name, email, password, profilePhoto } = req.body;
      const user = new User({ username, name, email, password, profilePhoto });
      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: "Erro ao criar usuário", error: error });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar usuário", error: error });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.status(200).json({ message: "Usuário excluído com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao excluir usuário", error: error });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
      const validPassword = await user.comparePassword(password);
      if (!validPassword) {
        return res.status(401).json({ message: "Senha incorreta." });
      }
      const token = jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "72h" }
      );
      res.status(200).json({ token, username: user.username });
    } catch (error) {
      res.status(500).json({ message: "Erro ao fazer login", error: error });
    }
  }
}

export default UsersController;
