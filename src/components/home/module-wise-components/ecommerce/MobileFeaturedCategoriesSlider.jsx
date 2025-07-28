import React from "react";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react"; // adjust if path differs
import FeaturedItemCard from "components/home/featured-categories/card";

const MobileFeaturedCategoriesSlider = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { featuredCategories } = useSelector((state) => state.storedData);

  if (!isMobile || !featuredCategories?.length) return null;

  return (
    <Box
      mt={1}
      sx={{
        overflowX: "auto",
        whiteSpace: "nowrap",
        display: "flex",
        gap: "18px",
        px: 1,
        scrollbarWidth: "none", // Firefox
        "&::-webkit-scrollbar": { display: "none" }, // Chrome/Safari
      }}
    >
      {featuredCategories.map((item, index) => (
        <Box
          key={item?.id || index}
          sx={{
            minWidth: "100px",
            flex: "0 0 auto",
          }}
        >
          <FeaturedItemCard
            image={item?.image_full_url}
            title={item?.name}
            id={item?.id}
            slug={item?.slug}
          />
        </Box>
      ))}
    </Box>
  );
};

export default MobileFeaturedCategoriesSlider;
