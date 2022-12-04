import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
        mobile: 999999999,
      },
    });
    const token = createJWT(user);
    res.json({ token });
  } catch (e) {
    e.type = "input";
    next(e);
  }
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  console.log(user);
  const isValid = await comparePasswords(req.body.password, user.password);
  if (!isValid) {
    res.status(401);
    res.json({ messgae: "nope" });
    return;
  }
  const token = createJWT(user);
  const id = user.id;
  res.json({ token, id });
};

// {
//   "username":"vishal",
//   "password":"admin"
// }
