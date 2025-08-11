import React from "react";
import { CircularProgress, Stack } from "@mui/material";
export default function Loading({ color, isFromPLPList }) {
  return (
    <Stack
      alignItems={isFromPLPList ? "flex-end" : "center"}
      style={{
        left: "50%",
      }}
    >
      <CircularProgress size="1rem" style={{ color: color }} />
    </Stack>
  );
}
