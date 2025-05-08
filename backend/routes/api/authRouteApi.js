require("dotenv").config();
const authRouterApi = require("express").Router();
const bcrypt = require("bcrypt");

const { User, Cash } = require("../../db/models");

// Login ROUTER

authRouterApi.post("/auth/login", async (req, res) => {
  console.log(req.body);
  // if (req.body.password.length > 7) {
    let user;
    try {
      user = await User.findOne({ where: { email: req.body.email } });

      if (!user) {
        res.json({ message: "Нет пользователя с таким логин и/или паролем." });
        return;
      }
    } catch ({ message }) {
      res.json({message });
      return;
    }

    try {
      const compPass = await bcrypt.compare(req.body.password, user.password);

      if (!compPass) {
        res.json({ message: "Неверный логин и/или пароль." });
        return;
      }
    } catch ({ message }) {
      res.json({message });
      return;
    }

    req.session.user = {
      id: user.id,
      login: user.login,
    };

    res.json({ message: "success", user });
  // } else {
  //   res.json({ message: "Слишком короткий логин и/или пароль." });
  // }
});

// Registration ROUTER

authRouterApi.post("/auth/reg", async (req, res) => {
  console.log(req.body);
  const { login, email, password, checkPassword } = req.body;

  let user;
  let checkEmail;
  try {
    checkEmail = await User.findOne({ where: { email } });
    if (checkEmail) {
      res.json({
        message: "Пользователем с таким логином и/или Email уже существует.",
      });
      return;
    }
  } catch ({ message }) {
    res.json({ message });
    return;
  }

  try {
    const emailRegexp =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    const validEmail = emailRegexp.test(email);
    if (!validEmail) {
      res.json({ message: "Неверный формат email" });
      return;
    }
  } catch ({ message }) {
    res.json({ message });
    return;
  }
  try {
    if (checkPassword !== password) {
      res.json({ message: "Пароли не совпадают." });
      return;
    }
    if (password.length < 7) {
      res.json({ message: "Пароль должен быть больше 7-ми символов" });
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    user = await User.create({ login, password: hash, email, jwt: process.env.JWT || ''});
    req.session.user = {
      id: user.id,
      login: user.login,
    };
    await Cash.create({ quantity: 20000000, user_id:user.id});
  } catch ({ message }) {
    res.json({ message });
    return;
  }

  req.session.user = {
    id: user.id,
    login: user.login,
  };
  res.json({ message: "success", user });
});

// LogOut ROUTER

authRouterApi.get("/auth/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.json({ error: "Не удалось выйти" });
      return;
    }
    res.clearCookie("user_sid");
    res.json({ message: "success" });
  });
});

authRouterApi.get("/auth/dispatchUser", (req, res) => {
  console.log(req.session.user);
  res.json(req.session.user);
});

module.exports = authRouterApi;
