import { Grid, useMediaQuery, useTheme } from "@mui/material";
//import { Box } from "@mui/system";
import { CustomStackFullWidth } from "styled-components/CustomStyles.style";
//import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { getAmountWithSign } from "helper-functions/CardHelpers";
import CustomImageContainer from "../../CustomImageContainer";
import OrganicTag from "../../organic-tag";
import ProductImageView from "./ProductImageView";
import ProductInformation from "./ProductInformation";
import { getImageUrl } from "utils/CustomFunctions";

const ProductDetailsSection = ({
  productDetailsData,
  configData,
  handleModalClose,
  productUpdate,
  modalmanage,
  addToWishlistHandler,
  removeFromWishlistHandler,
  isWishlisted,
}) => {
  const { t } = useTranslation();
  const productImage = productDetailsData?.image_full_url;
  const productThumbImage = productDetailsData?.images_full_url;
  const imageBaseUrl = productDetailsData?.isCampaignItem
    ? "campaign_image_url"
    : "item_image_url";
  const imageSrcUrl = productImage;
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const handleModal = () => {
    return (
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={12} sm={5} md={5} textAlign="center">
          <Box sx={{ position: "relative" }}>
            <OrganicTag
              status={productDetailsData?.organic}
              top={isSmall ? 40 : 50}
              left={0}
            />
          </Box>
          {productDetailsData?.module_type !== "food" && productUpdate ? (
            <CustomImageContainer
              width={isSmall ? "200px" : "100%"}
              height={isSmall ? "200px" : "250px"}
              src={imageSrcUrl}
              objectfit="contained"
              aspectRatio="1/1"
            />
          ) : (
            <ProductImageView
              productImage={imageSrcUrl}
              productThumbImage={productThumbImage}
              imageBaseUrl={imageBaseUrl}
              configData={configData}
              addToWishlistHandler={addToWishlistHandler}
              removeFromWishlistHandler={removeFromWishlistHandler}
              isWishlisted={isWishlisted}
              productDetailsData={productDetailsData}
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={7}
          md={7}
          marginTop={productThumbImage?.length > 0 ? "0px" : "40px"}
        >
          {productDetailsData?.module_type !== "food" && (
            <ProductInformation
              productDetailsData={productDetailsData}
              configData={configData}
              productUpdate={productUpdate}
              handleModalClose={handleModalClose}
              modalmanage={modalmanage}
              isSmall={isSmall}
            />
          )}
        </Grid>
      </Grid>
    );
  };

  return <CustomStackFullWidth>{handleModal()}</CustomStackFullWidth>;
};

export default ProductDetailsSection;
