
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

  // GET PRODUCTS
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // POST / PUT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // PUT
        const updatedProduct = await updateProduct(editId, formData);

        setProducts(
          products.map((product) =>
            product._id === editId ? updatedProduct : product
          )
        );

        setEditId(null);

        alert("Product updated successfully");
      } else {
        // POST
        const newProduct = await createProduct(formData);

        setProducts([...products, newProduct]);

        alert("Product added successfully");
      }

      // CLEAR FORM
      setFormData({
        name: "",
        price: "",
        category: "",
        stock: "",
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // EDIT
  const handleEdit = (product) => {
    setEditId(product._id);

    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
    });
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);

      setProducts(
        products.filter((product) => product._id !== id)
      );

      alert("Product deleted successfully");
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  // CANCEL
  const handleCancel = () => {
    setEditId(null);

    setFormData({
      name: "",
      price: "",
      category: "",
      stock: "",
    });
  };

  return (
    <div className="app">

      {/* Animated Background */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      <div className="container">

        {/* HEADER */}
        <header className="header">
          <div>
            <span className="badge">MERN CRUD</span>
            <h1>Product Manager</h1>
            <p>Manage your products easily</p>
          </div>

          <div className="product-count">
            <span>{products.length}</span>
            <small>Products</small>
          </div>
        </header>

        {/* FORM CARD */}
        <div className="form-card">

          <div className="form-title">
            <div className="icon">
              {editId ? "✏️" : "➕"}
            </div>

            <div>
              <h2>
                {editId ? "Edit Product" : "Add New Product"}
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

              <div className="input-group">
                <label>Product Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Price</label>

                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Category</label>

                <input
                  type="text"
                  name="category"
                  placeholder="Enter category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Stock</label>

                <input
                  type="number"
                  name="stock"
                  placeholder="Enter stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-buttons">

              <button className="submit-btn" type="submit">
                {editId ? "Update Product" : "Add Product"}
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

        {/* PRODUCTS */}
        <section className="products-section">

          <div className="section-heading">
            <div>
              <span className="badge">INVENTORY</span>
              <h2>All Products</h2>
            </div>

            <span className="total">
              {products.length} Items
            </span>
          </div>

          {products.length === 0 ? (

            <div className="empty">
              <div className="empty-icon">📦</div>
              <h3>No Products Yet</h3>
              <p>Add your first product using the form above.</p>
            </div>

          ) : (

            <div className="product-grid">

              {products.map((product, index) => (

                <div
                  className="product-card"
                  key={product._id}
                >

                  <div className="card-top">

                    <div className="product-number">
                      #{String(index + 1).padStart(2, "0")}
                    </div>

                    <span className="category">
                      {product.category}
                    </span>

                  </div>

                  <h3>{product.name}</h3>

                  <div className="price">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </div>

                  <div className="stock-box">

                    <span>Stock</span>

                    <strong
                      className={
                        Number(product.stock) > 0
                          ? "stock-available"
                          : "stock-empty"
                      }
                    >
                      {product.stock}
                    </strong>

                  </div>

                  <div className="card-actions">

                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(product)}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(product._id)}
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        <footer>
          <p>Built with React ⚡ Express ⚡ MongoDB</p>
        </footer>

      </div>
    </div>
  );
}

export default App;

