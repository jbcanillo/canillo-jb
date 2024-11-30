import React, { useState, useEffect } from "react";
import ProductModal from "../components/ProductModal";

const Products = () => {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [modalProduct, setModalProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Filter products by title and selected category
  const filteredProducts = products.filter((product) => {
    const isTitleMatch = product.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const isCategoryMatch =
      selectedCategory === "" || product.category === selectedCategory;
    return isTitleMatch && isCategoryMatch;
  });

  // Handle modal open
  const openModal = (product) => {
    setModalProduct(product);
    setShowModal(true); 
  };

  // Handle modal close
  const closeModal = () => {
    setShowModal(false);
    setModalProduct(null);
  };

  function toProperCase(str) {
    return str
      .split(' ')
      .map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(' ');
  }

  return (
    <div className="mt-5">
      <div className="mb-3">
        <label>Category:</label>
        <select
          className="form-control"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {toProperCase(category)}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label>Search:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Type product title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="col-md-4 mb-3">
              <div className="card">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <button
                    onClick={() => openModal(product)}
                    className="btn btn-secondary"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      <ProductModal
        product={modalProduct}
        showModal={showModal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Products;
