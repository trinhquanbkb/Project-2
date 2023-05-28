const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const registerUser = async (req, res) => {
  const { name_user, phone_number, password, email } = req.body;
  try {
    //tạo ra một chuỗi 10 số ngẫu nhiên bằng thuật toán salt
    const salt = bcrypt.genSaltSync(10);
    //generate password
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = await Users.create({
      name_user,
      phone_number,
      email,
      password: hashPassword,
      role: "user",
      isActive: 1,
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const loginUser = async (req, res) => {
  const { phone_number, password } = req.body;
  try {
    const results = await Users.findOne({
      where: {
        phone_number,
        isActive: 1,
        role: "user",
      },
    });
    if (results) {
      //giải băm mật khẩu và trả về true hoặc false
      const isAuthen = bcrypt.compareSync(
        password,
        results.dataValues.password
      );
      if (isAuthen === true) {
        //đăng nhập sẽ nhận được token
        const token = jwt.sign(
          { userId: results.id, role: results.role },
          "trinhhoangquan",
          { expiresIn: 60 * 60 }
        );
        res.status(200).send({ message: "Login user success", token });
      } else {
        throw new Error(`Password is not exist`);
      }
    } else {
      throw new Error(`Mssv is not exist`);
    }
  } catch (error) {
    res.status(400).send(`${error}`);
  }
};

const loginAdmin = async (req, res) => {
  const { phone_number, password } = req.body;
  try {
    const results = await Users.findOne({
      where: {
        phone_number,
        isActive: 1,
        role: "admin",
      },
    });
    if (results) {
      //giải băm mật khẩu và trả về true hoặc false
      const isAuthen = bcrypt.compareSync(
        password,
        results.dataValues.password
      );
      if (isAuthen === true) {
        //đăng nhập sẽ nhận được token
        const token = jwt.sign(
          { userId: results.id, role: results.role },
          "trinhhoangquan",
          { expiresIn: 60 * 60 }
        );
        res.status(200).send({ message: "Login admin success", token });
      } else {
        throw new Error(`Password is not exist`);
      }
    } else {
      throw new Error(`Mssv is not exist`);
    }
  } catch (error) {
    res.status(400).send(`${error}`);
  }
};

module.exports = {
  registerUser,
  loginAdmin,
  loginUser,
};
