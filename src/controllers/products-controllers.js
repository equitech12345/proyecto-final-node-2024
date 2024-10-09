import productSchema from "../models/mongoDB/Products.js";

export const ProductsController = {
  // Get all products
  async getAllProducts(req, res) {
    try {
      const products = await productSchema.find();
      if (products.length === 0) {
        return res
          .status(404)
          .json({ succes: false, message: "No products found" });
      }
      res.status(200).json({ succes: true, message: products });
    } catch (error) {
      res.status(500).json({ succes: false, message: error.message });
    }
  },

  // Search for a product for name
  async getProductByName(req, res) {
    const { name } = req.query;
    if (!name) {
      return res
        .status(400)
        .json({ succes: false, message: "Please provide a product name" });
    }
    try {
      const products = await productSchema.find({
        name: { $regex: name, $options: "i" },
      });
      if (products.length === 0) {
        return res
          .status(404)
          .json({ succes: false, message: "No products with that name" });
      }
      res.status(200).json({ succes: true, message: products });
    } catch (error) {
      res.status(500).json({ succes: false, message: error.message });
    }
  },

  // Get a product by id
  async getProductById(req, res) {
    try {
      const product = await productSchema.findById(req.params.id);
      if (!product) {
        return res
          .status(404)
          .json({ succes: false, message: "Product not found" });
      }
      res.status(200).json({ succes: true, message: product });
    } catch (error) {
      res.status(404).json({ succes: false, message: "Product not found" });
    }
  },

  // Create a product
  async createProduct(req, res) {
    try {
      const product = new productSchema(req.body);
      const newProduct = await product.save();
      res
        .status(201)
        .json({ succes: true, message: "Product Create", newProduct });
    } catch (error) {
      res.status(400).json({ succes: false, message: error.message });
    }
  },

  // Update a product by id

  async updateProduct(req, res) {
    try {
      const product = await productSchema.findById(req.params.id);
      if (req.body.name) {
        product.name = req.body.name;
      }
      if (req.body.price) {
        product.price = req.body.price;
      }
      if (req.body.description) {
        product.description = req.body.description;
      }
      if (req.body.image) {
        product.image = req.body.image;
      }
      if (req.body.category) {
        product.category = req.body.category;
      }
      const updatedProduct = await product.save();
      res
        .status(200)
        .json({
          succes: true,
          message: "Product updated successfully",
          updatedProduct,
        });
    } catch (error) {
      res.status(404).json({ succes: false, message: "Product not found" });
    }
  },

  // Delete a product by id
  async deleteProduct(req, res) {
    try {
      const product = await productSchema.findByIdAndDelete(req.params.id);
      if (!product) {
        return res
          .status(404)
          .json({ succes: false, message: "Product not found" });
      }
      res
        .status(200)
        .json({ succes: true, message: "Product deleted successfully" });
    } catch (error) {
      res.status(404).json({ succes: false, message: "Product not found" });
    }
  },
};
