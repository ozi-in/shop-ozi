// // // import { useEffect, useLayoutEffect, useRef, useState } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import useGetPopularItemsNearby from "../../../api-manage/hooks/react-query/useGetPopularItemsNearby";

// // // import { Grid, Skeleton } from "@mui/material";
// // // import Slider from "react-slick";

// // // import { useTranslation } from "react-i18next";

// // // import { useGetFlashSales } from "api-manage/hooks/react-query/useGetFlashSales";
// // // import { getLanguage } from "helper-functions/getLanguage";
// // // import { setPopularItemsNearby } from "redux/slices/storedData";
// // // import "slick-carousel/slick/slick-theme.css";
// // // import "slick-carousel/slick/slick.css";
// // // import {
// // //   CustomBoxFullWidth,
// // //   CustomStackFullWidth,
// // //   SliderCustom,
// // // } from "styled-components/CustomStyles.style";
// // // import ProductCard from "../../cards/ProductCard";
// // // import CampaignSimmerTimmer from "../../Shimmer/CampaignSimmerTimmer";
// // // import ProductCardSimmerHorizontal from "../../Shimmer/ProductCardSimmerHorizontal";
// // // import H2 from "../../typographies/H2";
// // // import Subtitle1 from "../../typographies/Subtitle1";
// // // import { NextFood, PrevFood } from "../best-reviewed-items/SliderSettings";
// // // import { HomeComponentsWrapper } from "../HomePageComponents";
// // // import ItemsCampaign from "./items-campaign-slide";
// // // import { getTitleButton } from "styled-components/CustomStyles.style";

// // // const PopularItemsNearby = ({ title, subTitle }) => {
// // //   const [width, setWidth] = useState(0);
// // //   const { popularItemsNearby } = useSelector((state) => state.storedData);
// // //   const { t } = useTranslation();
// // //   const limit = 2;
// // //   const offset = 1;
// // //   const slider = useRef(null);
// // //   const { data, refetch, isLoading, isFetching } = useGetPopularItemsNearby({
// // //     offset: 1,
// // //     type: "all",
// // //   });
// // //   const {
// // //     data: flashSales,
// // //     refetch: flashSalesRefetch,
// // //     isLoading: flashSalesIsLoading,
// // //   } = useGetFlashSales({ limit, offset });
// // //   const dispatch = useDispatch();
// // //   useEffect(() => {
// // //     if (popularItemsNearby.products.length === 0) {
// // //       refetch();
// // //     }
// // //   }, [popularItemsNearby]);

// // //   useEffect(() => {
// // //     flashSalesRefetch();
// // //   }, []);

// // //   useLayoutEffect(() => {
// // //     const handleResize = () => {
// // //       setWidth(window.innerWidth);
// // //     };

// // //     handleResize(); // Set initial width
// // //     window.addEventListener("resize", handleResize);

// // //     return () => window.removeEventListener("resize", handleResize);
// // //   }, []);
// // //   useEffect(() => {
// // //     if (data) {
// // //       dispatch(setPopularItemsNearby(data));
// // //     }
// // //   }, [data]);
// // //   useEffect(() => {
// // //     refetch();
// // //   }, []);

// // //   const flashSaleslength = () => {
// // //     if (
// // //       (flashSales &&
// // //         typeof flashSales === "object" &&
// // //         Object.keys(flashSales).length === 0) ||
// // //       flashSales?.active_products?.length < 1
// // //     ) {
// // //       return false;
// // //     } else {
// // //       return true;
// // //     }
// // //   };
// // //   const settings = {
// // //     dots: false,
// // //     infinite: false,
// // //     speed: 500,
// // //     arrows: false,
// // //     slidesPerRow: 1,
// // //     rows: 1,
// // //     slidesToShow: 5,
// // //     slidesToScroll: 3,
// // //     cssEase: "linear",
// // //     rtl: getLanguage() === "rtl",
// // //     responsive: [
// // //       {
// // //         breakpoint: 320,
// // //         settings: {
// // //           slidesToShow: 2,

// // //           rows: 1,
// // //           slidesToScroll: 3,
// // //         },
// // //       },
// // //       {
// // //         breakpoint: 375,
// // //         settings: {
// // //           slidesToShow: 2,

// // //           rows: 1,
// // //           slidesToScroll: 3,
// // //         },
// // //       },
// // //       {
// // //         breakpoint: 450,
// // //         settings: {
// // //           slidesToShow: 2,

// // //           rows: 1,
// // //           slidesToScroll: 3,
// // //         },
// // //       },
// // //       {
// // //         breakpoint: 750,
// // //         settings: {
// // //           slidesToShow: 4,

// // //           rows: 1,
// // //           slidesToScroll: 3,
// // //         },
// // //       },
// // //       {
// // //         breakpoint: 830,
// // //         settings: {
// // //           slidesToShow: 5,

// // //           rows: 1,
// // //           slidesToScroll: 3,
// // //         },
// // //       },
// // //       {
// // //         breakpoint: 900,
// // //         settings: {
// // //           slidesToShow: 5,

// // //           rows: 1,
// // //           slidesToScroll: 3,
// // //         },
// // //       },
// // //       {
// // //         breakpoint: 1150,
// // //         settings: {
// // //           slidesToShow: 5,
// // //           rows: 1,
// // //           slidesToScroll: 3,
// // //         },
// // //       },
// // //       {
// // //         breakpoint: 1300,
// // //         settings: {
// // //           slidesToShow: 5,
// // //           rows: 1,
// // //           slidesToScroll: 3,
// // //         },
// // //       },
// // //     ],
// // //     prevArrow: <PrevFood />,
// // //     nextArrow: <NextFood />,
// // //   };
// // //   return (
// // //     <HomeComponentsWrapper>
// // //       {popularItemsNearby && popularItemsNearby?.products?.length > 0 && (
// // //         <>
// // //           <CustomStackFullWidth
// // //             alignItems="center"
// // //             justyfyContent="center"
// // //             mt={{ xs: "10x", md: "16px" }}
// // //             spacing={0}
// // //           >
// // //             {isFetching ? (
// // //               <Skeleton varient="text" width="110px" />
// // //             ) : (
// // //               <>
// // //                 {getTitleButton({
// // //                   title: "Top Rated",
// // //                   onCLickNext: () => slider.current.slickNext(),
// // //                   onClickPrev: () => slider.current.slickPrev(),
// // //                 })}
// // //               </>
// // //             )}
// // //             {/* {isFetching ? (
// // //               <Skeleton varient="text" width="310px" />
// // //             ) : (
// // //               <Subtitle1 text={t(subTitle)} component="p" />
// // //             )} */}
// // //             <CustomBoxFullWidth>
// // //               <Grid container spacing={1} sx={{ marginTop: "0px" }}>
// // //                 {isFetching ? (
// // //                   <Grid item xs={12} sm={12} md={9}>
// // //                     <SliderCustom
// // //                       nopadding="true"
// // //                       sx={{
// // //                         "& .slick-slide": {
// // //                           marginY: "-15px",
// // //                         },
// // //                       }}
// // //                     >
// // //                       <Slider {...settings} ref={slider}>
// // //                         {[...Array(15)].map((item, index) => {
// // //                           return <ProductCardSimmerHorizontal key={index} />;
// // //                         })}
// // //                       </Slider>
// // //                     </SliderCustom>
// // //                   </Grid>
// // //                 ) : (
// // //                   <Grid item xs={12} sm={12} md={flashSaleslength() ? 9 : 12}>
// // //                     <SliderCustom
// // //                       nopadding="true"
// // //                       sx={{
// // //                         "& .slick-slide": {
// // //                           marginY: "0px",
// // //                         },
// // //                       }}
// // //                     >
// // //                       <Slider
// // //                         currentSlide={0}
// // //                         key={width}
// // //                         {...settings}
// // //                         ref={slider}
// // //                       >
// // //                         {popularItemsNearby?.products?.map((item, index) => {
// // //                           return (
// // //                             <ProductCard
// // //                               key={index}
// // //                               item={item}
// // //                               // cardheight="160px"
// // //                               // horizontalcard="false"
// // //                               noMargin
// // //                               cardFor="popular items"
// // //                               isFrom="top-rated"
// // //                             />
// // //                           );
// // //                         })}
// // //                       </Slider>
// // //                     </SliderCustom>
// // //                   </Grid>
// // //                 )}

// // //                 {/* {flashSalesIsLoading ? (
// // //                   <Grid item xs={12} sm={5} md={3}>
// // //                     <CampaignSimmerTimmer />
// // //                   </Grid>
// // //                 ) : (
// // //                   <Grid item xs={12} sm={5} md={3}>
// // //                     {flashSaleslength() && (
// // //                       <ItemsCampaign flashSales={flashSales} />
// // //                     )}
// // //                   </Grid>
// // //                 )} */}
// // //               </Grid>
// // //             </CustomBoxFullWidth>
// // //           </CustomStackFullWidth>
// // //         </>
// // //       )}
// // //     </HomeComponentsWrapper>
// // //   );
// // // };

// // // // export default PopularItemsNearby;

// // import { useEffect, useLayoutEffect, useRef, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import useGetPopularItemsNearby from "../../../api-manage/hooks/react-query/useGetPopularItemsNearby";

// // import { Grid, IconButton, Box } from "@mui/material";
// // import Slider from "react-slick";

// // import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
// // import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// // import { useTranslation } from "react-i18next";

// // import { getLanguage } from "helper-functions/getLanguage";
// // import { setPopularItemsNearby } from "redux/slices/storedData";
// // import "slick-carousel/slick/slick-theme.css";
// // import "slick-carousel/slick/slick.css";
// // import {
// //   CustomBoxFullWidth,
// //   CustomStackFullWidth,
// //   SliderCustom,
// // } from "styled-components/CustomStyles.style";
// // import ProductCard from "../../cards/ProductCard";
// // import ProductCardSimmerHorizontal from "../../Shimmer/ProductCardSimmerHorizontal";
// // import H2 from "../../typographies/H2";
// // import { HomeComponentsWrapper } from "../HomePageComponents";
// // import { styled } from "@mui/material/styles";

// // const ArrowButton = styled(IconButton, {
// //   shouldForwardProp: (prop) => prop !== "$hidehover" && prop !== "disabled",
// // })(({ $hidehover, disabled }) => ({
// //   minWidth: "32px",
// //   width: "32px",
// //   height: "32px",
// //   padding: 0,
// //   borderRadius: "50%",
// //   display: "flex",
// //   alignItems: "center",
// //   justifyContent: "center",
// //   backgroundColor: "transparent",
// //   transition: "background-color 0.3s",
// //   pointerEvents: disabled ? "none" : "auto",
// //   opacity: disabled ? 0.3 : 1,
// //   "&:hover": {
// //     backgroundColor: $hidehover || disabled ? "transparent" : "#ff6259",
// //   },
// // }));

// // const PopularItemsNearby = ({ title }) => {
// //   const [width, setWidth] = useState(0);
// //   const [isAtStart, setIsAtStart] = useState(true);
// //   const [isAtEnd, setIsAtEnd] = useState(false);
// //   const { popularItemsNearby } = useSelector((state) => state.storedData);
// //   const { t } = useTranslation();
// //   const slider = useRef(null);
// //   const dispatch = useDispatch();

// //   const { data, refetch, isLoading, isFetching } = useGetPopularItemsNearby({
// //     offset: 1,
// //     type: "all",
// //   });

// //   useEffect(() => {
// //     if (popularItemsNearby.products.length === 0) refetch();
// //     if (data) dispatch(setPopularItemsNearby(data));
// //   }, [data]);

// //   useEffect(() => {
// //     refetch();
// //   }, []);

// //   useLayoutEffect(() => {
// //     const handleResize = () => {
// //       setWidth(window.innerWidth);
// //     };
// //     handleResize();
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   const checkScrollEnd = (currentSlide, slideCount) => {
// //     const totalVisible = getVisibleSlides();
// //     setIsAtStart(currentSlide === 0);
// //     setIsAtEnd(currentSlide + totalVisible >= slideCount);
// //   };

// //   const getVisibleSlides = () => {
// //     if (width <= 450) return 2;
// //     if (width <= 750) return 3;
// //     if (width <= 900) return 4;
// //     return 5;
// //   };

// //   const PrevArrow = ({ onClick }) => (
// //     <ArrowButton
// //       onClick={onClick}
// //       aria-label="scroll left"
// //       disabled={isAtStart}
// //       $hidehover={isAtStart}
// //     >
// //       <NavigateBeforeIcon fontSize="medium" />
// //     </ArrowButton>
// //   );

// //   const NextArrow = ({ onClick }) => (
// //     <ArrowButton
// //       onClick={onClick}
// //       aria-label="scroll right"
// //       disabled={isAtEnd}
// //       $hidehover={isAtEnd}
// //     >
// //       <NavigateNextIcon fontSize="medium" />
// //     </ArrowButton>
// //   );

// //   const settings = {
// //     dots: false,
// //     infinite: false,
// //     speed: 500,
// //     arrows: false,
// //     slidesToShow: getVisibleSlides(),
// //     slidesToScroll: 3,
// //     rtl: getLanguage() === "rtl",
// //     afterChange: (currentSlide) =>
// //       checkScrollEnd(currentSlide, popularItemsNearby?.products?.length),
// //     responsive: [
// //       { breakpoint: 900, settings: { slidesToShow: 4 } },
// //       { breakpoint: 750, settings: { slidesToShow: 3 } },
// //       { breakpoint: 450, settings: { slidesToShow: 2 } },
// //     ],
// //   };

// //   return (
// //     <HomeComponentsWrapper>
// //       {popularItemsNearby?.products?.length > 0 && (
// //         <CustomStackFullWidth mt="16px" spacing={1}>
// //           <Box
// //             sx={{
// //               display: "flex",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //               width: "100%",
// //             }}
// //           >
// //             <H2 text={title ?? "Top Rated"} component="h2" />
// //             <Box sx={{ display: "flex", gap: "8px" }}>
// //               <PrevArrow onClick={() => slider.current?.slickPrev()} />
// //               <NextArrow onClick={() => slider.current?.slickNext()} />
// //             </Box>
// //           </Box>

// //           <CustomBoxFullWidth>
// //             <Grid container spacing={1}>
// //               <Grid item xs={12}>
// //                 <SliderCustom
// //                   nopadding="true"
// //                   sx={{ "& .slick-slide": { marginY: "0px" } }}
// //                 >
// //                   <Box sx={{ position: "relative" }}>
// //                     <Slider key={width} {...settings} ref={slider}>
// //                       {(isFetching
// //                         ? Array.from({ length: 10 })
// //                         : popularItemsNearby.products
// //                       ).map((item, index) =>
// //                         isFetching ? (
// //                           <ProductCardSimmerHorizontal key={index} />
// //                         ) : (
// //                           <ProductCard
// //                             key={index}
// //                             item={item}
// //                             noMargin
// //                             cardFor="popular items"
// //                             isFrom="top-rated"
// //                           />
// //                         )
// //                       )}
// //                     </Slider>
// //                   </Box>
// //                 </SliderCustom>
// //               </Grid>
// //             </Grid>
// //           </CustomBoxFullWidth>
// //         </CustomStackFullWidth>
// //       )}
// //     </HomeComponentsWrapper>
// //   );
// // };

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetPopularItemsNearby from "../../../api-manage/hooks/react-query/useGetPopularItemsNearby";
import {
  Grid,
  IconButton,
  Box,
  Skeleton,
  useMediaQuery,
  useTheme,
  styled,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTranslation } from "react-i18next";
import { getLanguage } from "helper-functions/getLanguage";
import { setPopularItemsNearby } from "redux/slices/storedData";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
  SliderCustom,
} from "styled-components/CustomStyles.style";
import ProductCard from "../../cards/ProductCard";
import ProductCardSimmerHorizontal from "../../Shimmer/ProductCardSimmerHorizontal";
import H2 from "../../typographies/H2";
import { HomeComponentsWrapper } from "../HomePageComponents";

// Styled Components
const ArrowButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "$hidehover" && prop !== "disabled",
})(({ $hidehover, disabled }) => ({
  minWidth: "32px",
  width: "32px",
  height: "32px",
  padding: 0,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  transition: "background-color 0.3s",
  pointerEvents: disabled ? "none" : "auto",
  opacity: disabled ? 0.3 : 1,
  "&:hover": {
    backgroundColor: $hidehover || disabled ? "transparent" : "#ff6259",
  },
}));

const ScrollableContainer = styled(Box)(({ theme }) => ({
  overflowX: "auto",
  scrollBehavior: "smooth",
  "&::-webkit-scrollbar": { display: "none" },
  paddingBottom: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(2),
  },
}));

const SlideWrapper = styled(Box)({
  position: "relative",
  width: "100%",
});

const PopularItemsNearby = ({ title }) => {
  const [width, setWidth] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const { popularItemsNearby } = useSelector((state) => state.storedData);
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const theme = useTheme();

  const { data, refetch, isLoading, isFetching } = useGetPopularItemsNearby({
    offset: 1,
    type: "all",
  });

  useEffect(() => {
    if (popularItemsNearby.products.length === 0) refetch();
    if (data) dispatch(setPopularItemsNearby(data));
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  useLayoutEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    checkScrollEnd();
  }, [popularItemsNearby]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const to =
      direction === "left"
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;
    scrollRef.current.scrollTo({ left: to, behavior: "smooth" });

    setTimeout(() => {
      checkScrollEnd();
    }, 300);
  };

  const checkScrollEnd = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setIsAtStart(scrollLeft <= 0);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
  };

  const getCardWidth = () => {
    if (width <= 450) return "48%";
    if (width <= 750) return "32%";
    if (width <= 900) return "24%";
    return "20%";
  };

  return (
    <HomeComponentsWrapper>
      {popularItemsNearby?.products?.length > 0 && (
        <CustomStackFullWidth mt="16px" spacing={1}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <H2 text={title ?? "Top Rated"} component="h2" />
            <Box sx={{ display: "flex", gap: "8px" }}>
              <ArrowButton
                onClick={() => scroll("left")}
                aria-label="scroll left"
                disabled={isAtStart}
                $hidehover={isAtStart}
              >
                <NavigateBeforeIcon fontSize="medium" />
              </ArrowButton>
              <ArrowButton
                onClick={() => scroll("right")}
                aria-label="scroll right"
                disabled={isAtEnd}
                $hidehover={isAtEnd}
              >
                <NavigateNextIcon fontSize="medium" />
              </ArrowButton>
            </Box>
          </Box>

          <CustomBoxFullWidth>
            <SlideWrapper>
              <ScrollableContainer ref={scrollRef} onScroll={checkScrollEnd}>
                <Grid container spacing={2} wrap="nowrap">
                  {(isFetching
                    ? Array.from({ length: 10 })
                    : popularItemsNearby.products
                  ).map((item, index) => (
                    <Grid
                      item
                      key={index}
                      sx={{
                        flex: "0 0 auto",
                        width: { xs: getCardWidth() },
                      }}
                    >
                      {isFetching ? (
                        <ProductCardSimmerHorizontal />
                      ) : (
                        <ProductCard
                          item={item}
                          noMargin
                          cardFor="popular items"
                          isFrom="top-rated"
                        />
                      )}
                    </Grid>
                  ))}
                </Grid>
              </ScrollableContainer>
            </SlideWrapper>
          </CustomBoxFullWidth>
        </CustomStackFullWidth>
      )}
    </HomeComponentsWrapper>
  );
};

export default PopularItemsNearby;
