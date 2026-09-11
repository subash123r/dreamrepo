
import product from "../models/product.js";

// ================= CREATE PRODUCT =================
export const createproduct = async (req, res) => {
  try {
    const productaa = await product.create(req.body);

    res.status(201).json({
      message: "Product created successfully",
      product: productaa,
    });
  } catch (error) {
    res.status(500).json({
      message: "Product creation failed",
      error: error.message,
    });
  }
};

// ================= GET ALL PRODUCTS =================
export const getproduct = async (req, res) => {
  try {
    const productaa = await product.find();

    res.status(200).json({
      message: "Products fetched successfully",
      products: productaa,
    });
  } catch (error) {
    res.status(500).json({
      message: "Product fetch failed",
      error: error.message,
    });
  }
};

// ================= UPDATE PRODUCT =================
export const fineoneed = async (req, res) => {
  try {
    const productaa = await product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!productaa) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: productaa,
    });
  } catch (error) {
    res.status(500).json({
      message: "Product update failed",
      error: error.message,
    });
  }
};

// ================= DELETE PRODUCT =================
export const deleteone = async (req, res) => {
  try {
    const productaa = await product.findByIdAndDelete(
      req.params.id
    );

    if (!productaa) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: productaa,
    });
  } catch (error) {
    res.status(500).json({
      message: "Product delete failed",
      error: error.message,
    });
  }
};

// ================= GET SINGLE PRODUCT =================
export const getProductById = async (req, res) => {
  try {
    const productaa = await product.findById(req.params.id);

    if (!productaa) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product found",
      product: productaa,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

