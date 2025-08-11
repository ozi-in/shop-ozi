import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ProductCardTopBar = ({ discountText, isWishlisted, onAdd, onRemove }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 1,
        background: "#fff",
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        // borderBottom: '1px solid #eee',
      }}
    >
      {/* Discount badge on left, only if discountText exists */}
      {discountText ? (
        <Box
          sx={{
            background: "#FF6159",
            color: "#fff",
            borderRadius: "16px",
            px: 2,
            py: 0.5,
            fontWeight: 600,
            fontSize: "14px",
            minWidth: "60px",
            textAlign: "center",
          }}
        >
          {discountText}
        </Box>
      ) : (
        <Box sx={{ minWidth: "60px" }} />
      )}
      {/* Heart icon on right */}
      <IconButton
        onClick={isWishlisted ? onRemove : onAdd}
        sx={{ color: isWishlisted ? "#FF6159" : "#aaa" }}
      >
        {isWishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Box>
  );
};

export default ProductCardTopBar;
