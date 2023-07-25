const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { sequelize } = require("../models/index");

const registerUser = async (req, res) => {
  const { name_user, phone_number, password, email } = req.body;
  try {
    //tạo ra một chuỗi 10 số ngẫu nhiên bằng thuật toán salt
    const salt = bcrypt.genSaltSync(10);
    //generate password
    const hashPassword = bcrypt.hashSync(password, salt);
    const allUser = await Users.findAll();
    let i = 0;
    allUser.forEach((item) => {
      if (item.dataValues.email === email) {
        i++;
      }
    });
    if (i > 0) {
      res.status(500).send(error);
    } else {
      const newUser = await Users.create({
        name_user,
        phone_number,
        email,
        password: hashPassword,
        role: "user",
        isActive: 1,
      });
      res.status(201).send(newUser);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const results = await Users.findOne({
      where: {
        email,
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
          { expiresIn: 60 * 6000 }
        );
        res
          .status(200)
          .send({ message: "Login user success", token, type: "user" });
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
  const { email, password } = req.body;
  try {
    const results = await Users.findOne({
      where: {
        email,
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
          { expiresIn: 60 * 6000 }
        );
        res
          .status(200)
          .send({ message: "Login admin success", token, type: "admin" });
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

const getUserInfo = async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await Users.findOne({
      where: {
        id: userId,
      },
    });
    const result = {
      name_user: user.dataValues.name_user,
      phone_number: user.dataValues.phone_number,
      email: user.dataValues.email,
      role: user.dataValues.role,
    };
    if (result) {
      res.status(200).send(result);
    } else {
      throw new Error("Cannot get user information");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCharUser = async (req, res) => {
  const { fullYear } = req.query;
  try {
    const [users, metadataUser] = await sequelize.query(
      `SELECT name_user, updatedAt FROM ecommerce_clothes.users WHERE role = 'user';`
    );
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    let x;
    if (parseInt(fullYear) === 0) {
      x = 6;
    } else {
      x = 12;
    }
    let arrayMonth = [];
    while (x > 0) {
      if (currentMonth - x + 1 <= 0) {
        arrayMonth.push(currentMonth - x + 12 + 1);
      } else {
        arrayMonth.push(currentMonth - x + 1);
      }
      x--;
    }
    let result = [];
    arrayMonth.forEach((item, index) => {
      result.push({
        month: item,
        totalUser: 0,
      });
      users.forEach((i) => {
        const date = new Date(i.updatedAt);
        if (date.getMonth() + 1 === item) {
          result[index].totalUser += 1;
        }
      });
    });
    if (result) {
      res.status(200).send(result);
    } else {
      throw new Error("Cannot get chart user");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  registerUser,
  loginAdmin,
  loginUser,
  getUserInfo,
  getCharUser,
};
