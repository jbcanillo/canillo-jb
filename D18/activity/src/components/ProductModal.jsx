import React from "react";

const ProductModal = ({ product, showModal, closeModal }) => {
  if (!product) return null;

  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      style={{ display: showModal ? "block" : "none" }}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="productModalLabel"
      aria-hidden={!showModal}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="productModalLabel">
              {product.title}
            </h5>
          </div>
          <div className="modal-body">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid mb-3"
            />
            <p>{product.description}</p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
