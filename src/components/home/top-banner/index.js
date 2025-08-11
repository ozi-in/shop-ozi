import { alpha, useTheme } from "@mui/material";
import { Box, useMediaQuery } from "@mui/system";
import { getCurrentModuleType } from "helper-functions/getCurrentModuleType";
import { ModuleTypes } from "helper-functions/moduleTypes";
import { CustomBoxFullWidth } from "styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import banner from "../assets/banner.webp";
import rcommerceSearchBg from "../assets/ecommerce_top_bg.png";
import foodBanner from "../assets/food.png";
import pharmacy from "../assets/par.png";
import parcelImage from "../assets/parcelBg.png";
import { useEffect, useState } from "react";
import Image from "next/image";

const TopBanner = () => {
  const [moduleType, setModuleType] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:480px)");
  // Ensure moduleType is set on the client
  useEffect(() => {
    setModuleType(getCurrentModuleType());
  }, []);

  const getBGColor = () => {
    switch (getCurrentModuleType()) {

      case ModuleTypes.ECOMMERCE:
        return alpha(theme.palette.primary.main, 0.2);

      default:
        return "inherit";
    }
  };
  const getBGImage = () => {
    switch (getCurrentModuleType()) {

      case ModuleTypes.ECOMMERCE:
        return rcommerceSearchBg?.src;


      default:
        return "inherit";
    }
  };
  // if (!moduleType) return null;

  return (
    <CustomBoxFullWidth
      sx={{
        minHeight: {
          xs:
            moduleType === ModuleTypes.PARCEL
              ? "250px"
              : moduleType === ModuleTypes.ECOMMERCE
              ? "80px" // custom height for ECOMMERCE here
              : "160px",
          sm: "270px",
          md: "270px",
        },
        backgroundColor: isMobile && ModuleTypes.ECOMMERCE ? "" : getBGColor(), // removed for Ecommerce
        position: "relative",
        overflow: "hidden",
      }}
    >
      {(!moduleType && isMobile) === ModuleTypes.ECOMMERCE && ( // conditionally render for Ecommerce
        <Box
          sx={{
            position: "absolute",
            height: "100%",
            width: "100%",
            img: { objectFit: "cover", width: "100%", height: "100%" },
          }}
        >
          <Image
            width={1917}
            height={270}
            src={getBGImage()}
            alt="banner"
            priority={true}
          />
        </Box>
      )}
    </CustomBoxFullWidth>
  );
};

export default TopBanner;
