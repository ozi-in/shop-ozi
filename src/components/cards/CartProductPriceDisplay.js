
import React from "react";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import {
  getAmountWithSign,
  getDiscountedAmount,
} from "../../helper-functions/CardHelpers";

const CartProductPriceDisplay = ({ item }) => {
  const getMRP = () => item?.price || 0;
  const getSellingPrice = () =>
    getDiscountedAmount(
      item?.price,
      item?.discount,
      item?.discount_type,
      item?.store_discount,
      item?.quantity || 1
    );
  const mrp = getMRP();
  const sellingPrice = getSellingPrice();
  let percent = null;
  if (item?.discount_type === "percent" && item?.discount) {
    percent = Math.round(item.discount);
  } else if (mrp > sellingPrice) {
    percent = Math.round(((mrp - sellingPrice) / mrp) * 100);
  }
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography
        fontSize={{ xs: "13px", md: "16px" }}
        color="#000"
        fontWeight="700"
      >
        {getAmountWithSign(sellingPrice)}
      </Typography>
      <Typography
        fontSize={{ xs: "11px", md: "12px" }}
        color="text.secondary"
        fontWeight="400"
        sx={{ textDecoration: "line-through" }}
      >
        {getAmountWithSign(mrp)}
      </Typography>
      {percent && percent > 0 && (
        <Typography
          fontSize={{ xs: "11px", md: "12px" }}
          style={{ color: "#FF6159", fontWeight: 700 }}
          ml={0.5}
        >
          {percent}% OFF
        </Typography>
      )}
    </Stack>
  );
};

export default CartProductPriceDisplay;
