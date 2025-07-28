import {
  Grid,
  Skeleton,
  styled,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { getModuleId } from "../../helper-functions/getModuleId";
import {
  CustomBoxFullWidth,
  CustomText,
  ShopNowButton,
} from "../../styled-components/CustomStyles.style";
import { textWithEllipsis } from "../../styled-components/TextWithEllipsis";
import CustomImageContainer from "../CustomImageContainer";
import { useTheme } from "@emotion/react";

// ✅ Safe btoa fallback
const encodeBase64 = (str) => {
  if (typeof window !== "undefined") {
    return window.btoa(str);
  } else {
    return Buffer.from(str, "binary").toString("base64");
  }
};

const Wrapper = styled(Box)(({ theme }) => ({
  // backgroundColor: theme.palette.background.paper,
  padding: "5px",
  // border: "1px solid #EAEEF2",
  // borderRadius: "10px",
  cursor: "pointer",

  width: "160px",
  height: "250px",
  transition: "all ease 0.5s",
  ".MuiTypography-h7": {
    transition: "all ease 0.5s",
  },
  "&:hover": {
    // boxShadow: "0px 10px 20px rgba(88, 110, 125, 0.1)",
    // ".MuiTypography-h7": {
    //   color: theme.palette.primary.main,
    //   letterSpacing: "0.02em",
    // },
    img: {
      transform: "scale(1.1)",
    },
  },
}));

const ImageWrapper = styled(CustomBoxFullWidth)(({ theme }) => ({
  position: "relative",
  borderRadius: "10px",
  height: "115px",
}));

const ShopCategoryCard = (props) => {
  const theme = useTheme();
  const { item, imageUrl, onlyshimmer } = props;
  const { t } = useTranslation();
  const classes = textWithEllipsis();
  const isMobile = useMediaQuery("(max-width:480px)");

  const renderMobileLayout = () => (
    <Wrapper
      sx={{
        width: "94px",
        height: "110px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "6px",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <Link
        href={{
          pathname: "/home",
          query: {
            search: "category",
            id: `${item?.slug ? item?.slug : item?.id}`,
            module_id: `${getModuleId()}`,
            name: encodeBase64(item?.name),
            data_type: "category",
          },
        }}
      >
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Box
              sx={{
                borderRadius: "20px",
                overflow: "hidden",
                width: "100%",
              }}
            >
              <CustomImageContainer
                height="64px"
                width="64px"
                src={imageUrl}
                borderRadius="0"
                objectFit="cover"
                loading="lazy"
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Tooltip
              title={item?.name}
              placement="bottom"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: (theme) => theme.palette.toolTipColor,
                    "& .MuiTooltip-arrow": {
                      color: (theme) => theme.palette.toolTipColor,
                    },
                  },
                },
              }}
            >
              <Typography
                variant="h7"
                fontWeight="400"
                component="h4"
                align="center"
                sx={{
                  fontSize: "13px",
                  lineHeight: "16px",
                  maxWidth: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  wordBreak: "keep-all",
                }}
              >
                {item?.name}
              </Typography>
            </Tooltip>
          </Grid>
        </Grid>
      </Link>
    </Wrapper>
  );

  return onlyshimmer ? (
    <Wrapper
      sx={{
        width: isMobile ? "94px" : "225px",
        height: isMobile ? "auto" : "auto",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={6}
          container
          sx={{ p: "8px" }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12}>
            <Typography
              variant="h7"
              fontWeight="400"
              className={classes.multiLineEllipsis}
            >
              <Skeleton variant="text" width="50px" />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="customColor.textGray">
              {t("Explore Items")}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant="rectangular" height="120px" width="100%" />
        </Grid>
      </Grid>
    </Wrapper>
  ) : isMobile ? (
    renderMobileLayout()
  ) : (
    <Wrapper sx={{ width: "180px" }}>
      <Link
        href={{
          pathname: "/home",
          query: {
            search: "category",
            id: `${item?.slug ? item?.slug : item?.id}`,
            module_id: `${getModuleId()}`,
            name: btoa(item?.name),
            data_type: "category",
          },
        }}
      >
        <CustomBoxFullWidth
          alignItems="center"
          justifyContent="space-between"
          alignContent="center"
        >
          <ImageWrapper>
            <CustomImageContainer
              height="100%"
              width="100%"
              src={imageUrl}
              borderRadius="5px"
              objectFit="cover"
              loading="loading"
            />
          </ImageWrapper>
          <Grid container>
            <Grid
              item
              xs={6}
              container
              sx={{ p: "8px" }}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12}>
                {/* <Tooltip
                  title={item?.name}
                  placement="bottom"
                  arrow
                  componentsProps={{
                    tooltip: {
                      sx: {
                        bgcolor: (theme) => theme.palette.toolTipColor,
                        "& .MuiTooltip-arrow": {
                          // color: (theme) => theme.palette.toolTipColor,
                        },
                      },
                    },
                  }}
                >
                  <Typography
                    variant="h7"
                    fontWeight="400"
                    className={classes.multiLineEllipsis}
                    component="h4"
                  >
                    {item?.name}
                  </Typography>
                </Tooltip> */}

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "60px",
                  }}
                >
                  <CustomText fontSize="12px">{item?.name}</CustomText>
                  <CustomText fontSize="10px">
                    {item?.products_count - 1}+ Products
                  </CustomText>
                </Box>
              </Grid>
              {/* <Grid item xs={12}>
                <Typography
                  variant="body2"
                  color="customColor.textGray"
                  component="span"
                >
                  {t("Explore Items")}
                </Typography>
              </Grid> */}
            </Grid>

            <ShopNowButton variant="contained" onClick={() => {}}>
              {" "}
              <Typography color={theme.palette.whiteContainer.main}>
                {t("Shop Now")}
              </Typography>
            </ShopNowButton>
          </Grid>
        </CustomBoxFullWidth>
      </Link>
    </Wrapper>
  );
};

export default ShopCategoryCard;
