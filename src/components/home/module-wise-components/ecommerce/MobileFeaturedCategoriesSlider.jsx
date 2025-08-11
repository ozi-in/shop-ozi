// import React from "react";
// import { Box } from "@mui/system";
// import { useSelector } from "react-redux";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@emotion/react"; // adjust if path differs
// import FeaturedItemCard from "components/home/featured-categories/card";

// const MobileFeaturedCategoriesSlider = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const { featuredCategories } = useSelector((state) => state.storedData);

//   if (!isMobile || !featuredCategories?.length) return null;

//   return (
//     <Box
//       mt={1}
//       sx={{
//         overflowX: "auto",
//         whiteSpace: "nowrap",
//         display: "flex",
//         gap: "18px",
//         px: 1,
//         scrollbarWidth: "none", // Firefox
//         "&::-webkit-scrollbar": { display: "none" }, // Chrome/Safari
//       }}
//     >
//       {featuredCategories.map((item, index) => (
//         <Box
//           key={item?.id || index}
//           sx={{
//             minWidth: "100px",
//             flex: "0 0 auto",
//           }}
//         >
//           <FeaturedItemCard
//             image={item?.image_full_url}
//             title={item?.name}
//             id={item?.id}
//             slug={item?.slug}
//           />
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default MobileFeaturedCategoriesSlider;

import React from "react";
import { Box, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import FeaturedItemCard from "components/home/featured-categories/card";

const MobileFeaturedCategoriesSlider = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { featuredCategories } = useSelector((state) => state.storedData);

  const isLoading = !featuredCategories || featuredCategories.length === 0;

  if (!isMobile) return null;

  return (
    <Box
      mt={1}
      sx={{
        overflowX: "auto",
        whiteSpace: "nowrap",
        display: "flex",
        gap: "18px",
        px: 1,
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {isLoading
        ? [...Array(5)].map((_, index) => (
            <Box key={index} sx={{ minWidth: "100px", flex: "0 0 auto" }}>
              <Skeleton
                variant="rectangular"
                width={110}
                height={120}
                sx={{ borderRadius: "8px" }}
              />
              <Skeleton width="80%" sx={{ mt: 1 }} />
            </Box>
          ))
        :[...featuredCategories].reverse().map((item, index) => (
            <Box
              key={item?.id || index}
              sx={{ minWidth: "100px", flex: "0 0 auto" }}
            >
              <FeaturedItemCard
                image={item?.image_full_url}
                title={item?.name}
                id={item?.id}
                slug={item?.slug}
                mobilTopSlider={"true"}
              />
            </Box>
          ))}
    </Box>
  );
};

export default MobileFeaturedCategoriesSlider;
