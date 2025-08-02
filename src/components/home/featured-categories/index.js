import React, { useEffect, useRef } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
  CustomBoxFullWidth,
  SliderCustom,
  CustomStackFullWidth,
} from "styled-components/CustomStyles.style";
import { styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { useGetFeaturedCategories } from "api-manage/hooks/react-query/all-category/all-categorys";
import { getCurrentModuleType } from "helper-functions/getCurrentModuleType";
import { ModuleTypes } from "helper-functions/moduleTypes";
import { setFeaturedCategories } from "redux/slices/storedData";
import { CustomButtonPrimary } from "styled-components/CustomButtons.style";
import FoodCategoryCard from "../../cards/FoodCategoryCard";
import PharmacyCategoryCard from "../../cards/PharmacyCategoryCard";
import ShopCategoryCard from "../../cards/ShopCategoryCard";
import { HomeComponentsWrapper } from "../HomePageComponents";
import FeaturedItemCard from "./card";
import { moduleWiseNext, moduleWisePrev } from "./sliderSettings";
import { Box } from "@mui/system";
import { useTheme } from "@emotion/react";
import { getTitleButton } from "styled-components/CustomStyles.style";
import useMediaQuery from "@mui/material/useMediaQuery";
export const ButtonLeft = styled(CustomButtonPrimary)(
  ({ theme, language_direction }) => ({
    minWidth: "20px",
    width: "10px",
    height: "30px",
    borderRadius: "50%",
    transform: language_direction === "rtl" && "rotate(180deg)",
  })
);
export const ButtonRight = styled(CustomButtonPrimary)(({ theme }) => ({
  minWidth: "20px",
  width: "10px",
  height: "30px",
  borderRadius: "50%",
  color: "black",
  background: theme.palette.neutral[200],
  "&:hover": {
    background: theme.palette.neutral[400],
  },
}));

const FeaturedCategories = ({ configData }) => {
  const { featuredCategories } = useSelector((state) => state.storedData);
  const theme = useTheme();
  const slider = useRef(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { data, refetch, isFetched, isFetching, isLoading, isRefetching } =
    useGetFeaturedCategories();
  const dispatch = useDispatch();
  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setFeaturedCategories(data?.data));
    }
  }, [data]);

  const smallDeviceSliderSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 2,
    slidesPerRow: 3, // 2 per row looks more balanced on mobile
    responsive: [
      {
        breakpoint: 400,
        settings: {
          slidesPerRow: 3,
          rows: 2,
        },
      },
    ],
  };

  const shopCategorySliderSettings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: moduleWiseNext(),
    prevArrow: moduleWisePrev(),

    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: false,
        },
      },
      {
        breakpoint: 1210,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: false,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 3.8,
          slidesToScroll: 3,
          infinite: false,
        },
      },
      {
        breakpoint: 840,
        settings: {
          slidesToShow: 3.2,
          slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 785,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 730,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 630,
        settings: {
          slidesToShow: 2.3,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 570,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 460,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 374,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8.5,

    nextArrow: moduleWiseNext(),
    prevArrow: moduleWisePrev(),
    currentSlide: 0,
    rtl: true,

    responsive: [
      {
        breakpoint: 1650,
        settings: {
          slidesToShow: 8,
          //slidesToScroll: 3,
          infinite: false,
        },
      },
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 7,
          //slidesToScroll: 3,
          infinite: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6.5,
          //slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 840,
        settings: {
          slidesToShow: 6.5,
          //slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 790,
        settings: {
          slidesToShow: 6,
          //slidesToScroll: 3,
          infinite: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 5,
          //slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4.2,
          //slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 475,
        settings: {
          slidesToShow: 3.9,
          //slidesToScroll: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 3.7,
          //slidesToScroll: 1,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 3.3,
          //slidesToScroll: 1,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 2.7,
          //slidesToScroll: 1,
        },
      },
    ],
  };

  const foodCategorySliderSettings = {
    dots: false,
    infinite: featuredCategories.length >= 7,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    // autoplay: true,
    nextArrow: moduleWiseNext(),
    prevArrow: moduleWisePrev(),
    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 3,
          infinite: featuredCategories.length >= 8,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: featuredCategories.length >= 6,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: featuredCategories.length >= 5,
        },
      },
      {
        breakpoint: 790,
        settings: {
          slidesToShow: 4.5,
          slidesToScroll: 3,
          infinite: featuredCategories.length >= 5,
        },
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 3,
          initialSlide: 2,
          infinite: featuredCategories.length >= 7,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: featuredCategories.length >= 5,
        },
      },
    ],
  };

  const SmallDeviceSlider = () => {
    return (
      <Box mt={1}>
        <Slider {...smallDeviceSliderSettings}>
          {featuredCategories.map((item, index) => (
            <Box key={item?.id || index} px={0.25}>
              <FeaturedItemCard
                image={item?.image_full_url}
                title={item?.name}
                id={item?.id}
                slug={item?.slug}
              />
            </Box>
          ))}
        </Slider>
      </Box>
    );
  };

  const moduleWiseCard = () => {
    switch (getCurrentModuleType()) {
      case ModuleTypes.ECOMMERCE:
        return (
          <CustomStackFullWidth alignItems="center" justyfyContent="center">
            {/* <CustomStackFullWidth
               alignItems="center"
               justifyContent="space-between"
               direction="row"
             >

        <H2 text="Shop by Category" component="h2" />
              <div className="flex gap-2">
          <Button variant="outline" size="icon"  sx={{
      minWidth: '32px',
      width: '32px',
      height: '32px',
      padding: 0,
      borderRadius: '50%',
      '&:hover': {
        backgroundColor: '#f0f0f0', // light hover background
      },
    }}  onClick={()=> slider.current.slickPrev() }>
            <ChevronLeft className="w-4 h-4" />
          </Button>

   <Button variant="outline" size="icon"  sx={{
      minWidth: '32px',
      width: '32px',
      height: '32px',
      padding: 0,
      borderRadius: '50%',
      '&:hover': {
        backgroundColor: '#f0f0f0', // light hover background
      },
    }}  onClick={()=> slider.current.slickNext()}>

    <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
  </CustomStackFullWidth> */}

            {getTitleButton({
              title: "Shop by Category",
              onCLickNext: () => slider.current.slickNext(),
              onClickPrev: () => slider.current.slickPrev(),
            })}

            <CustomStackFullWidth sx={{ minHeight: "100px" }}>
              <Slider {...shopCategorySliderSettings} ref={slider}>
                {featuredCategories?.map((item, index) => {
                  return (
                    <ShopCategoryCard
                      key={index}
                      imageUrl={item?.image_full_url}
                      item={item}
                    />
                  );
                })}
              </Slider>
            </CustomStackFullWidth>
          </CustomStackFullWidth>
        );
    }
  };
  const moduleWiseCardShimmer = () => {
    switch (getCurrentModuleType()) {
      case ModuleTypes.ECOMMERCE:
        return (
          <Box
            sx={{
              width: "100%",
              overflowX: "hidden",
              maxWidth: "100vw", // important to prevent horizontal scroll
              "& .slick-slide": {
                padding: "4px", // reduce space between items
              },
              "& .slick-track": {
                display: "flex !important",
                justifyContent: "flex-start !important", // fix big gaps
                gap: "0px !important", // prevent spacing issues
              },
            }}
          >
            <Slider {...shopCategorySliderSettings} ref={slider}>
              {featuredCategories?.map((item, index) => (
                <ShopCategoryCard
                  key={index}
                  imageUrl={item?.image_full_url}
                  item={item}
                />
              ))}
            </Slider>
          </Box>
        );
    }
  };

  return (
    <CustomBoxFullWidth>
      {isFetching ? (
        <HomeComponentsWrapper>
          <SliderCustom nopadding="true" sx={{ paddingTop: "15px" }}>
            {moduleWiseCardShimmer()}
          </SliderCustom>
        </HomeComponentsWrapper>
      ) : (
        featuredCategories &&
        featuredCategories.length > 0 && (
          <HomeComponentsWrapper>
            {featuredCategories && featuredCategories.length > 0 && (
              <SliderCustom
                sx={{
                  "& .slick-slider": {
                    "& .slick-slide": {
                      padding: { xs: "0px", md: "6px" },
                      paddingBottom: {
                        xs: "5px",
                        sm: "10px",
                        md: "20px !important",
                      },
                    },
                  },
                }}
                isShopByCat={true}
              >
                {isSmallScreen && (
                  <h2 style={{ marginTop: 0, marginBottom: "8px" }}>
                    Shop by category
                  </h2>
                )}

                {isSmallScreen ? SmallDeviceSlider() : moduleWiseCard()}
              </SliderCustom>
            )}
          </HomeComponentsWrapper>
        )
      )}
    </CustomBoxFullWidth>
  );
};

export default FeaturedCategories;
