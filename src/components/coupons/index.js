import React, { useEffect, useState } from "react";
import useGetCoupons from "../../api-manage/hooks/react-query/useGetCoupons";
import { Box, Stack } from "@mui/system";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import CustomEmptyResult from "../custom-empty-result";
import nodataimage from "../../../public/static/nodata.png";
import Coupon from "./Coupon";
import CustomShimmerCard from "./Shimmer";
import { t } from "i18next";
import { getCurrentModuleType } from "helper-functions/getCurrentModuleType";
import { useGetCouponLists } from "api-manage/hooks/react-query/useCouponsLists";

const Coupons = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const [copy, setCopy] = useState(null);

  const { data, refetch, isLoading, isFetching } = useGetCoupons();

  useEffect(() => {
    refetch();
  }, []);

  const couponData = data ?? [];
  const isCouponLoading = isLoading;
  const isCouponFetching = isFetching;

  // return (
  //   <Box
  //     mt={{ xs: "1rem", md: "2rem" }}
  //     minHeight="60vh"
  //     paddingLeft={{ xs: "10px", sm: "20px", md: "25px" }}
  //     paddingRight={{ xs: "10px", sm: "20px", md: "40px" }}
  //   >
  //     <Grid container spacing={2}>
  //       {isSmall && (
  //         <Grid item xs={12}>
  //           {isSmall && (
  //             <Stack direction="row" justifyContent="space-between">
  //               <Typography
  //                 textTransform="capitalize"
  //                 fontWeight="700"
  //                 fontSize="16px"
  //               >
  //                 {t("Coupons")}
  //               </Typography>
  //               {/*<InfoOutlinedIcon />*/}
  //             </Stack>
  //           )}
  //         </Grid>
  //       )}
  //       {couponData &&
  //         couponData?.length > 0 &&
  //         couponData?.map((coupon, index) => {
  //           return (
  //             <Grid item sm={6} xs={12} md={4} key={index}>
  //               <Coupon
  //                 coupon={coupon}
  //                 isLoading={isLoading}
  //                 setCopy={setCopy}
  //                 copy={copy}
  //               />
  //             </Grid>
  //           );
  //         })}
  //       {couponData && !isCouponFetching && couponData.length === 0 && (
  //         <CustomEmptyResult label="No Coupon Found" image={nodataimage} />
  //       )}
  //       {(isCouponLoading || isCouponFetching) && <CustomShimmerCard />}
  //     </Grid>
  //   </Box>
  // );
  return (
    <Box
      // mt={{ xs: "1rem", md: "2rem" }}
      minHeight="10%"
      paddingLeft={{ xs: "0px", sm: "20px", md: "20px" }}
      paddingRight={{ xs: "0px", sm: "20px", md: "20px" }}
    >
      {isSmall && (
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography
            textTransform="capitalize"
            fontWeight="700"
            fontSize="16px"
          >
            {t("Coupons")}
          </Typography>
        </Stack>
      )}

      {/* ✅ This Box enables horizontal scrolling */}
      <Box
        sx={{
          display: "flex",
          // width: "100%",
          overflowX: "auto",
          whiteSpace: "nowrap",
          gap: "16px",
          paddingBottom: "1rem",
        }}
        paddingLeft={{ xs: "10px", sm: "20px", md: "10px" }}
        paddingRight={{ xs: "10px", sm: "20px", md: "10px" }}
      >
        {couponData &&
          couponData.length > 0 &&
          couponData.map((coupon, index) => (
            <Box key={index}>
              <Coupon
                coupon={coupon}
                isLoading={isLoading}
                setCopy={setCopy}
                copy={copy}
              />
            </Box>
          ))}
      </Box>

      {/* {couponData && !isCouponFetching && couponData.length === 0 && (
          <CustomEmptyResult
            height="20%"
            width="20%"
            label="No Coupon Found"
            image={nodataimage}
          />
        )} */}

      {(isCouponLoading || isCouponFetching) && <CustomShimmerCard />}
    </Box>
  );
};

Coupons.propTypes = {};

export default Coupons;
