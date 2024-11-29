import productoModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

export const createProductController = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, cantidad, envio } =
      req.fields;
    const { imagen } = req.files;
    //alidation
    switch (true) {
      case !nombre:
        return res.status(500).send({ error: "Escriba un nombre" });
      case !descripcion:
        return res.status(500).send({ error: "Escriba una descripción" });
      case !precio:
        return res.status(500).send({ error: "Escriba un precio" });
      case !categoria:
        return res.status(500).send({ error: "Escriba la categoria" });
      case !cantidad:
        return res.status(500).send({ error: "Escriba la cantidad" });
      case imagen && imagen.size > 1000000:
        return res
          .status(500)
          .send({ error: "La fotografía debe pesar menos de un megabyte" });
    }

    const products = new productoModel({ ...req.fields, slug: slugify(nombre) });
    if (imagen) {
      products.imagen.data = fs.readFileSync(imagen.path);
      products.imagen.contentType = imagen.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Producto registrado exitosamente",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error al registrar el producto",
    });
  }
};

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productoModel
      .find({})
      .populate("categoria")
      .select("-imagen")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al buscar los productos",
      error: error.message,
    });
  }
};
// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productoModel
      .findOne({ slug: req.params.slug })
      .select("-imagen")
      .populate("categoria");
    res.status(200).send({
      success: true,
      message: "Singular producto encontrado",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al buscar un solo producto",
      error,
    });
  }
};

// get imagen
export const productPhotoController = async (req, res) => {
  try {
    const product = await productoModel.findById(req.params.pid).select("imagen");
    if (product.imagen.data) {
      res.set("Content-type", product.imagen.contentType);
      return res.status(200).send(product.imagen.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al buscar la foto",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await productoModel.findByIdAndDelete(req.params.pid).select("-imagen");
    res.status(200).send({
      success: true,
      message: "Producto borrado exitosamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al borrar el producto",
      error,
    });
  }
};

//upate producta
export const updateProductController = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, cantidad, envio } =
      req.fields;
    const { imagen } = req.files;
    //alidation
    switch (true) {
      case !nombre:
        return res.status(500).send({ error: "Escriba el nombre del producto" });
      case !descripcion:
        return res.status(500).send({ error: "Escriba la descripcion" });
      case !precio:
        return res.status(500).send({ error: "Escriba el precio" });
      case !categoria:
        return res.status(500).send({ error: "Escriba la categoria" });
      case !cantidad:
        return res.status(500).send({ error: "Escriba la cantidad" });
      case imagen && imagen.size > 1000000:
        return res
          .status(500)
          .send({ error: "Se requiere una foto que sea menor a un megabyte" });
    }

    const products = await productoModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(nombre) },
      { new: true }
    );
    if (imagen) {
      products.imagen.data = fs.readFileSync(imagen.path);
      products.imagen.contentType = imagen.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Producto actualizado exitosamente",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error al actualizar el producto",
    });
  }
};