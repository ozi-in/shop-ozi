import { Box, Typography } from "@mui/material";
import React from "react";

const TopNavBar = ({ configData }) => (
  <Box
    sx={{
      width: "100vw", // full viewport width
      background: "#222",
      py: 0.5,
      borderRadius: 0,
      position: "relative", // or "fixed" if you want it sticky
      left: 0,
      top: 0,
    }}
  >
    <Typography
      variant="body2"
      align="center"
      sx={{ color: "#fff", fontWeight: 500, letterSpacing: 0.2 }}
    >
      {configData?.topBarText ||
        "Fast delivery in 10-30 minutes | Free shipping on orders above ₹499"}
    </Typography>
  </Box>
);

export default TopNavBar;
