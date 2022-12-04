import { nextTick } from "process";
import prisma from "../db";

//get all
export const getProducts = async (req, res) => {
  console.log("inside product");
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      Products: true,
    },
  });
  res.json({ data: user.Products });
};

//get one
export const getOneProduct = async (req, res) => {
  const id = req.params.id;

  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsToId: req.user.id,
    },
  });
  res.json({ data: product });
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
        price: req.body.price,
        description: req.body.description,
        imageURL: req.body.imageURL,
        category: req.body.category,
        type: req.body.type,
      },
    });
    res.json({ data: product });
  } catch (e) {
    next(e);
  }
};

export const updateProduct = async (req, res) => {
  const updated = await prisma.product.update({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
    data: {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    },
  });
  res.json({ data: updated });
};

export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
  });
  res.json({ data: deleted });
};
