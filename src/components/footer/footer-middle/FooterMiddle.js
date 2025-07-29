import { Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import { Box, alpha } from "@mui/system";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { getCurrentModuleType } from "helper-functions/getCurrentModuleType";
import { ModuleTypes } from "helper-functions/moduleTypes";
import { CustomStackFullWidth } from "styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import AppLinks from "./AppLinks";
import RouteLinks from "./RouteLinks";
import SocialLinks from "./SocialLinks";
import FooterBottomItems from "../FooterBottomItems";
import { useRouter } from "next/router";
import LocationViewOnMap from "../../Map/location-view/LocationViewOnMap";

const FooterMiddle = (props) => {
  const { configData, landingPageData } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleOpenCloseMap = () => setOpen(!open);
  const handleClickToRoute = (href) => {
    router.push(href, undefined, { shallow: true });
  };

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const businessLogo = configData?.logo_full_url;
  let token;

  return (
    <CustomStackFullWidth
      sx={{
        py: { xs: "0px", sm: "0rem" },
        borderTop: "1px solid #e1e3e6ff",
        borderBottom: "1px solid #e1e3e6ff",
      }}
    >
      <Grid
        container
        columnSpacing={2}
        rowSpacing={{ xs: 2, sm: 0 }}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Logo */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              img: { transition: "all ease 0.5s" },
              "&:hover": {
                img: { transform: "scale(1.04)" },
              },
            }}
          >
            <CustomImageContainer
              src={businessLogo}
              alt={`${configData?.business_name}`}
              width="134.27px"
              height="120px"
              objectfit="contain"
            />
          </Box>
        </Grid>

        {/* Route Links Centered Horizontally */}
        <Grid item xs={12} md={3.5}>
          <Stack
            direction="row"
            spacing={4}
            justifyContent="center"
            alignItems="center"
            width="300px"
          >
            <RouteLinks token={token} configData={configData} />
          </Stack>
        </Grid>

        {/* Social Links on the right */}
        <Grid item xs={12} md={2} display="flex" justifyContent="flex-end">
          <SocialLinks
            configData={configData}
            landingPageData={landingPageData}
          />
        </Grid>
      </Grid>

      {/* App Links (optional based on flags) */}
      {(Number.parseInt(
        landingPageData?.download_user_app_links?.playstore_url_status
      ) === 1 ||
        Number.parseInt(
          landingPageData?.download_user_app_links?.apple_store_url_status
        ) === 1) && (
        <Box mt={3}>
          <AppLinks
            configData={configData}
            changeSingle
            landingPageData={landingPageData}
          />
        </Box>
      )}

      {/* Optional Map View */}
      {open && (
        <LocationViewOnMap
          open={open}
          handleClose={handleOpenCloseMap}
          latitude={configData?.default_location?.lat}
          longitude={configData?.default_location?.lng}
          address={configData?.address}
          isFooter
        />
      )}
    </CustomStackFullWidth>
  );
};

FooterMiddle.propTypes = {};

export default FooterMiddle;
