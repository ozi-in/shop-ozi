import React from "react";
import PropTypes from "prop-types";
import { Modal } from "@mui/material";
import ProductDetailsSection from "../product-details/product-details-section/ProductDetailsSection";
import { useSelector } from "react-redux";
import {Scrollbar} from "../srollbar";

const ProductDetailModal = (props) => {
  const { open, handleModalClose, product } = props;
  const { configData } = useSelector((state) => state.configData);
  return (
    <Modal open={open} onClose={handleModalClose} disableAutoFocus={true}>

    </Modal>
  );
};

ProductDetailModal.propTypes = {};

export default ProductDetailModal;
