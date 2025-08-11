import React from "react";
import { Box } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";

const BadgeWithWishlist = ({
  discount,
  discountType,
  isWishlisted,
  onWishlistClick,
  currencySymbol = "₹",
}) => {
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      {/* Discount badge */}
      {discount && Number(discount) > 0 && (
        <Box
          sx={{
            background: "#fff",
            color: "green",
            fontWeight: 600,
            fontSize: 13,
            borderRadius: "6px",
            px: 1,
            py: 0.5,
            boxShadow: 1,
            minWidth: 48,
            textAlign: "center",
          }}
        >
          {discountType === "percent"
            ? `${discount}% OFF`
            : `${currencySymbol}${discount} OFF`}
        </Box>
      )}
      {/* Heart icon */}
      <Box
        sx={{
          background: "#fff",
          borderRadius: "50%",
          width: 24,
          height: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: 1,
          border: "1px solid #111",
          ml: 1,
          cursor: "pointer",
        }}
        onClick={onWishlistClick}
      >
        <FavoriteIcon
          style={{
            color: isWishlisted ? "#000" : "transparent",
            fontSize: 16,
            borderRadius: "50%",
            stroke: "#fff",
            strokeWidth: 0,
            fontWeight: 300,
          }}
        />
      </Box>
    </Box>
  );
};

export default BadgeWithWishlist;
