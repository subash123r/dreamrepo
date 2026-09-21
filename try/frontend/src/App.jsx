import { useEffect, useState } from "react";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./folder/productService";

import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // =========================
  // GET PRODUCTS
  // =========================
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      console.log("GET PRODUCTS RESPONSE:", data);

      // Handle different API response formats safely
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (Array.isArray(data?.products)) {
        setProducts(data.products);
      } else if (Array.isArray(data?.data)) {
        setProducts(data.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      category: "",
      stock: "",
    });

    setEditId(null);
  };

  // =========================
  // POST / PUT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        name: formData.name,
        price: Number(formData.price),
        category: formData.category,
        stock: Number(formData.stock),
      };

      if (editId) {
        // =========================
        // PUT
        // =========================
        const response = await updateProduct(editId, productData);

        console.log("UPDATE RESPONSE:", response);

        const updatedProduct =
          response?.product ||
          response?.data ||
          response;

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === editId
              ? updatedProduct
              : product
          )
        );

        alert("Product updated successfully");

        resetForm();
      } else {
        // =========================
        // POST
        // =========================
        const response = await createProduct(productData);

        console.log("CREATE RESPONSE:", response);

        const newProduct =
          response?.product ||
          response?.data ||
          response;

        if (newProduct && newProduct._id) {
          setProducts((prevProducts) => [
            ...prevProducts,
            newProduct,
          ]);
        } else {
          // If backend response format is different,
          // reload products from database
          await fetchProducts();
        }

        alert("Product added successfully");

        resetForm();
      }
    } catch (error) {
      console.log("Submit error:", error);

      alert(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (product) => {
    setEditId(product._id);

    setFormData({
      name: product.name || "",
      price: product.price ?? "",
      category: product.category || "",
      stock: product.stock ?? "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteProduct(id);

      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) => product._id !== id
        )
      );

      alert("Product deleted successfully");
    } catch (error) {
      console.log("Delete error:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to delete product"
      );
    }
  };

  // =========================
  // CANCEL
  // =========================
  const handleCancel = () => {
    resetForm();
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="app">

      {/* Animated Background */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      <div className="container">

        {/* ================= HEADER ================= */}
        <header className="header">

          <div>
            <span className="badge">
              MERN CRUD
            </span>

            <h1>Product Manager</h1>

            <p>
              Manage your products easily
            </p>
          </div>

          <div className="product-count">

            <span>
              {Array.isArray(products)
                ? products.length
                : 0}
            </span>

            <small>
              Products
            </small>

          </div>

        </header>

        {/* ================= FORM CARD ================= */}
        <div className="form-card">

          <div className="form-title">

            <div className="icon">
              {editId ? "✏️" : "➕"}
            </div>

            <div>

              <h2>
                {editId
                  ? "Edit Product"
                  : "Add New Product"}
              </h2>

              <p>
                {editId
                  ? "Update your product details"
                  : "Create a new product"}
              </p>

            </div>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="input-grid">

              {/* NAME */}
              <div className="input-group">

                <label>
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* PRICE */}
              <div className="input-group">

                <label>
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  required
                />

              </div>

              {/* CATEGORY */}
              <div className="input-group">

                <label>
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  placeholder="Enter category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* STOCK */}
              <div className="input-group">

                <label>
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  placeholder="Enter stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  required
                />

              </div>

            </div>

            {/* BUTTONS */}
            <div className="form-buttons">

              <button
                className="submit-btn"
                type="submit"
              >
                {editId
                  ? "Update Product"
                  : "Add Product"}
              </button>

              {editId && (
                <button
                  className="cancel-btn"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>

        {/* ================= PRODUCTS ================= */}
        <section className="products-section">

          <div className="section-heading">

            <div>

              <span className="badge">
                INVENTORY
              </span>

              <h2>
                All Products
              </h2>

            </div>

            <span className="total">
              {Array.isArray(products)
                ? products.length
                : 0}{" "}
              Items
            </span>

          </div>

          {/* LOADING */}
          {loading ? (

            <div className="empty">

              <div className="empty-icon">
                ⏳
              </div>

              <h3>
                Loading Products...
              </h3>

              <p>
                Please wait while products are loading.
              </p>

            </div>

          ) : products.length === 0 ? (

            /* EMPTY */
            <div className="empty">

              <div className="empty-icon">
                📦
              </div>

              <h3>
                No Products Yet
              </h3>

              <p>
                Add your first product using
                the form above.
              </p>

            </div>

          ) : (

            /* PRODUCT GRID */
            <div className="product-grid">

              {products.map((product, index) => (

                <div
                  className="product-card"
                  key={product._id || index}
                >

                  {/* CARD TOP */}
                  <div className="card-top">

                    <div className="product-number">
                      #
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </div>

                    <span className="category">
                      {product.category ||
                        "Uncategorized"}
                    </span>

                  </div>

                  {/* NAME */}
                  <h3>
                    {product.name ||
                      "Unnamed Product"}
                  </h3>

                  {/* PRICE */}
                  <div className="price">

                    ₹
                    {Number(
                      product.price || 0
                    ).toLocaleString("en-IN")}

                  </div>

                  {/* STOCK */}
                  <div className="stock-box">

                    <span>
                      Stock
                    </span>

                    <strong
                      className={
                        Number(product.stock) > 0
                          ? "stock-available"
                          : "stock-empty"
                      }
                    >
                      {product.stock ?? 0}
                    </strong>

                  </div>

                  {/* ACTIONS */}
                  <div className="card-actions">

                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(product)
                      }
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(product._id)
                      }
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* ================= FOOTER ================= */}
        <footer>

          <p>
            Built with React ⚡ Express ⚡ MongoDB
          </p>

        </footer>

      </div>

    </div>
  );
}

export default App;