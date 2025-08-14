import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import useGetNewArrivalStores from "api-manage/hooks/react-query/store/useGetNewArrivalStores";
import { useGetVisitAgain } from "api-manage/hooks/react-query/useGetVisitAgain";
import Brands from "components/home/brands";
import PaidAds from "components/home/paid-ads";
import { getModuleId } from "helper-functions/getModuleId";
import { getToken } from "helper-functions/getToken";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IsSmallScreen } from "utils/CommonValues";
import useGetOtherBanners from "../../../../api-manage/hooks/react-query/useGetOtherBanners";
import CustomContainer from "../../../container";
import OrderDetailsModal from "../../../order-details-modal/OrderDetailsModal";
import BestReviewedItems from "../../best-reviewed-items";
import FeaturedCategories from "../../featured-categories";
import LoveItem from "../../love-item";
import PopularItemsNearby from "../../popular-items-nearby";
import RunningCampaigns from "../../running-campaigns";
import SpecialFoodOffers from "../../special-food-offers";
import Stores from "../../stores";
import VisitAgain from "../../visit-again";
import CampaignBanners from "./CampaignBanners";
import CampaignBannersSecondary from "./CampaignBannersSecondary";
import FeaturedCategoriesWithFilter from "./FeaturedCategoriesWithFilter";
import NewArrivals from "./NewArrivals";
import SinglePoster from "./SinglePoster";
import TopOffersNearMe from "components/home/top-offers-nearme";
import RecommendedStore from "components/home/recommended-store";
import WhyParentsChoose from "components/wparentBanner/WhyParentsChoose";
import {
  CustomStackFullWidth,
  CustomBoxFullWidth,
  SingleRowFacilityHighLight,
  itemsData,
} from "../../../../styled-components/CustomStyles.style";
import HeroBanner from "components/home/initial-banner";
import Footer2 from "components/downloadapp/downloadapp";
import MobileSearchBar from "./MobileSearchBar";
import MobileFeaturedCategoriesSlider from "./MobileFeaturedCategoriesSlider";
// import { SingleRowFacilityHighLight ,itemsData } from '../../../styled-components/CustomStyles.style';

const Shop = ({ configData }) => {
  const menus = ["All", "Beauty", "Bread & Juice", "Drinks", "Milks"];
  const { orderDetailsModalOpen } = useSelector((state) => state.utilsData);
  const [storeData, setStoreData] = React.useState([]);
  const [isVisited, setIsVisited] = useState(false);
  const token = getToken();
  const { data, refetch, isLoading } = useGetOtherBanners();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const {
    data: visitedStores,
    refetch: refetchVisitAgain,
    isFetching,
  } = useGetVisitAgain();
  const {
    data: newStore,
    refetch: newStoreRefetch,
    isFetching: newIsFetching,
  } = useGetNewArrivalStores({
    type: "all",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        await refetch();
        if (token) {
          await refetchVisitAgain();
        }
        newStoreRefetch();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  // useEffect(() => {
  //   if (visitedStores?.length > 0 || newStore?.stores?.length > 0) {
  //     if (visitedStores?.length > 0 && visitedStores) {
  //       setStoreData(visitedStores);
  //       setIsVisited(true);
  //     } else {
  //       if (newStore?.stores) {
  //         setStoreData(newStore?.stores);
  //       }
  //     }
  //   }
  // }, [visitedStores, newStore?.stores, getModuleId()]);

  return (
    <Grid container gap={1}>
      {isMobile && (
        <CustomStackFullWidth sx={{ mt: "10%", px: 1 }}>
          <MobileSearchBar />
        </CustomStackFullWidth>
      )}

      {/* <MobileFeaturedCategoriesSlider /> */}
      {/* {!isMobile && <HeroBanner />} */}
      <HeroBanner />
      {/* {isMobile && (
        <CustomStackFullWidth sx={{ padding: 2, pt: 5 }}>
          <CustomBoxFullWidth
            sx={{
              minHeight: {
                xs: "250px",
                // sm: "270px",
              },
              // backgroundColor: getBGColor(),
              background: "linear-gradient(95.19deg, #726DED 0%, #6CC5D0 100%)",
              borderRadius: "10px",
              position: "relative",
              overflow: "hidden",
              p: 2,
            }}
          >
            <Box
              sx={{
                p: 1,
                border: "1px solid #fff",
                width: "max-content",
                borderRadius: "25px",
              }}
            >
              <Typography sx={{ color: "#fff" }}>
                Trusted By 100+ parents
              </Typography>
            </Box>

            <Box sx={{ width: "230px", my: 1 }}>
              <Typography variant="h5" sx={{ color: "#fff" }}>
                Baby Essentials Delivered in 30 Minutes
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ color: "#fff" }}>
                From newborn essentials to growing kid's needs - delivered in
                10-30 minutes!
              </Typography>
            </Box>

            <Box
              sx={{
                borderRadius: "15px",
                backgroundColor: "#101828",
                py: 1,
                width: "140px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                my: 1,
              }}
            >
              <Typography sx={{ color: "#fff" }}>Shop now</Typography>
            </Box>

            <Box>
              <Box
                component="img"
                src={bannerImg.src}
                alt="Banner"
                sx={{
                  objectFit: "contain",
                  width: "80px",
                  position: "absolute",
                  top: 0,
                  right: "20px",
                }}
              />
            </Box>
          </CustomBoxFullWidth>
        </CustomStackFullWidth>
      )} */}
      <Grid item xs={12} sx={{ marginTop: { xs: "-10px", sm: "10px" } }}>
        <CustomContainer>
          <SingleRowFacilityHighLight
            items={itemsData}
          ></SingleRowFacilityHighLight>
        </CustomContainer>

        <CustomContainer>
          <FeaturedCategories configData={configData} />
        </CustomContainer>
      </Grid>
      <Grid item xs={12}>
        <CustomContainer></CustomContainer>
      </Grid>
      <Grid item xs={12}>
        {IsSmallScreen() ? (
          <VisitAgain
            configData={configData}
            visitedStores={storeData}
            isVisited={isVisited}
            isFetching={newIsFetching || isFetching}
          />
        ) : (
          <CustomContainer>
            <VisitAgain
              configData={configData}
              visitedStores={storeData}
              isVisited={isVisited}
              isFetching={isFetching || newIsFetching}
            />
          </CustomContainer>
        )}
      </Grid>
      {/* <Grid item xs={12}>
        <CustomContainer>
          <PaidAds />
        </CustomContainer>
      </Grid> */}
      <Grid item xs={12}>
        <CustomContainer>
          <Brands />
        </CustomContainer>
      </Grid>

      <Grid item xs={12}>
        <CustomContainer>
          <CampaignBanners />
        </CustomContainer>
      </Grid>

      <Grid item xs={12}>
        <CustomContainer>
          <NewArrivals bannerData={data} />
        </CustomContainer>
      </Grid>

      <Grid item xs={12}>
        <CustomContainer>
          <PopularItemsNearby
            title="Most Popular Products"
            subTitle="We provide best quality & valuable products around the world"
          />
        </CustomContainer>
      </Grid>
      <Grid item xs={12}>
        <CustomContainer>
          <TopOffersNearMe title="Top offers near me" />
        </CustomContainer>
      </Grid>

      {/* <Grid item xs={12}>
        <CustomContainer>
          <SpecialFoodOffers />
        </CustomContainer>
      </Grid> */}

      {/* <Grid item xs={12}>
        <CustomContainer>
          <FeaturedStores title="Popular Store" configData={configData} />
        </CustomContainer>
      </Grid> */}

      <Grid item xs={12}>
        <CustomContainer>
          <BestReviewedItems
            menus={menus}
            title="Recently Viewed Items"
            bannerIsLoading={isLoading}
            url={`${data?.promotional_banner_url}/${data?.best_reviewed_section_banner}`}
          />
        </CustomContainer>
      </Grid>
      {/* <Grid item xs={12}>
        <CustomContainer>
          <LoveItem />

          <CampaignBannersSecondary />

        </CustomContainer>
      </Grid> */}
      <Grid item xs={12}>
        <CustomContainer>
          <CampaignBanners />
        </CustomContainer>
      </Grid>

      <Grid item xs={12}>
        <CustomContainer>
          <RunningCampaigns />
        </CustomContainer>
      </Grid>

      <Grid item xs={12}>
        <CustomContainer>
          <SpecialFoodOffers />
        </CustomContainer>
      </Grid>

      <Grid item xs={12}>
        <CustomContainer>
          <RunningCampaigns />
        </CustomContainer>
      </Grid>

      <Grid item xs={12}>
        <CustomContainer>
          <RunningCampaigns />
        </CustomContainer>
      </Grid>

      {/* <Grid item xs={12}>
        <CustomContainer>
          <LoveItem />
        </CustomContainer>
      </Grid> */}

      {/* add a new componnet shop by concerns */}

      {/* <Grid item xs={12}>
        <CustomContainer>
          <ShopConcern />
        </CustomContainer>
      </Grid> */}

      {/* <Grid item xs={12}>
        <CustomContainer>
          <FeaturedCategoriesWithFilter title="Featured Categories" />
        </CustomContainer>
      </Grid> */}

      {/* 

  <Grid item xs={12}>
        <CustomContainer>
          <CampaignBanners />
        </CustomContainer>
      </Grid> */}

      {/* <Grid item xs={12}>
        <CustomContainer>
          <SpecialFoodOffers />
        </CustomContainer>
      </Grid> */}

      {/* <Grid item xs={12}>
        <CustomContainer>
          <Brands />
        </CustomContainer>
      </Grid> */}
      <Grid item xs={12}>
        <CustomContainer>
          <WhyParentsChoose />
        </CustomContainer>
      </Grid>
      <CustomContainer>
        <Footer2 />
      </CustomContainer>
      <OrderDetailsModal
        orderDetailsModalOpen={orderDetailsModalOpen && !token}
      />
    </Grid>
  );
};

Shop.propTypes = {};

export default Shop;
