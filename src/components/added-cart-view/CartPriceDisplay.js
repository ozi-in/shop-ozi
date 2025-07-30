
import React from "react";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { getAmountWithSign, getDiscountedAmount } from "../../helper-functions/CardHelpers";
import { handleTotalAmountWithAddons } from "../../utils/CustomFunctions";

const CartPriceDisplay = ({ cartItem }) => {
  const getMRP = () => cartItem?.price || 0;
  const getSellingPrice = () => handleTotalAmountWithAddons(
    getDiscountedAmount(
      cartItem?.totalPrice,
      cartItem?.discount,
      cartItem?.discount_type,
      cartItem?.store_discount,
      cartItem?.quantity
    ),
    cartItem?.selectedAddons
  );
  const mrp = getMRP();
  const sellingPrice = getSellingPrice();
  let percent = null;
  if (cartItem?.discount_type === "percent" && cartItem?.discount) {
    percent = Math.round(cartItem.discount);
  } else if (mrp > sellingPrice) {
    percent = Math.round(((mrp - sellingPrice) / mrp) * 100);
  }
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography fontSize={{ xs: "13px", md: "16px" }} color="#000" fontWeight="700">
        {getAmountWithSign(sellingPrice)}
      </Typography>
      {/* <Typography fontSize={{ xs: "11px", md: "12px" }} color="text.secondary" fontWeight="400" sx={{ textDecoration: "line-through" }}>
        {getAmountWithSign(mrp)}
      </Typography> */}
      {sellingPrice != mrp ? (
        <Typography
          fontSize={{ xs: "11px", md: "12px" }}
          color="text.secondary"
          fontWeight="400"
          sx={{ textDecoration: "line-through" }}
        >
          {getAmountWithSign(mrp)}
        </Typography>
      ) : (
        <></>
      )}
      {percent && percent > 0 && (
        <Typography fontSize={{ xs: "11px", md: "12px" }} style={{ color: '#FF6159', fontWeight: 700 }} ml={0.5}>
          {percent}% OFF
        </Typography>
      )}
    </Stack>
  );
};

export default CartPriceDisplay; 
