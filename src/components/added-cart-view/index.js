// // // // import React, { useEffect } from "react";

// // // // import { useSelector } from "react-redux";
// // // // import EmptyCart from "./EmptyCart";
// // // // import CartActions from "./CartActions";
// // // // import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
// // // // import CartContents from "./CartContents";
// // // // import { getCartListModuleWise } from "../../helper-functions/getCartListModuleWise";
// // // // import { useRouter } from "next/router";
// // // // import CustomSideDrawer from "../side-drawer/CustomSideDrawer";
// // // // import DrawerHeader from "./DrawerHeader";
// // // // import CartIcon from "./assets/CartIcon";
// // // // import FreeDeliveryProgressBar from "./FreeDeliveryProgressBar";
// // // // import CartTotalPrice from "./CartTotalPrice";
// // // // import { useTheme } from "@emotion/react";
// // // // import DotSpin from "../DotSpin";
// // // // import { Stack } from "@mui/system";

// // // // const CardView = (props) => {
// // // //   const theme = useTheme();
// // // //   const { sideDrawerOpen, setSideDrawerOpen, cartList, refetch, isLoading } =
// // // //     props;
// // // //   const { configData } = useSelector((state) => state.configData);
// // // //   const imageBaseUrl = configData?.base_urls?.item_image_url;
// // // //   const router = useRouter();
// // // //   const closeHandler = () => {
// // // //     setSideDrawerOpen(false);
// // // //   };

// // // //   const getModuleWiseCartContent = () => {
// // // //     return (
// // // //       <CartContents
// // // //         cartList={getCartListModuleWise(cartList)}
// // // //         imageBaseUrl={imageBaseUrl}
// // // //         refetch={refetch}
// // // //       />
// // // //     );
// // // //   };

// // // //   return (
// // // //     <CustomSideDrawer
// // // //       anchor="right"
// // // //       open={sideDrawerOpen}
// // // //       onClose={closeHandler}
// // // //       variant="temporary"
// // // //       maxWidth="420px"
// // // //       width="100%"
// // // //     >
// // // //       <CustomStackFullWidth
// // // //         alignItems="center"
// // // //         justifyContent="space-between"
// // // //         sx={{ height: "100vh" }}
// // // //       >
// // // //         <DrawerHeader
// // // //           CartIcon={
// // // //             <CartIcon
// // // //               width="18px"
// // // //               height="18px"
// // // //               color={theme.palette.primary.dark}
// // // //             />
// // // //           }
// // // //           title="Shopping Cart"
// // // //           closeHandler={closeHandler}
// // // //         />
// // // //         {isLoading ? (
// // // //           <Stack height="214px" width="100%" justifyContent="center">
// // // //             <DotSpin />
// // // //           </Stack>
// // // //         ) : getCartListModuleWise(cartList)?.length === 0 ? (
// // // //           <EmptyCart
// // // //             cartList={getCartListModuleWise(cartList)}
// // // //             setSideDrawerOpen={setSideDrawerOpen}
// // // //           />
// // // //         ) : (
// // // //           getModuleWiseCartContent()
// // // //         )}

// // // //         {getCartListModuleWise(cartList).length > 0 &&
// // // //           configData?.free_delivery_over && (
// // // //             <>
// // // //               <FreeDeliveryProgressBar
// // // //                 configData={configData}
// // // //                 cartList={cartList}
// // // //               />
// // // //             </>
// // // //           )}
// // // //         {getCartListModuleWise(cartList).length > 0 && (
// // // //           <>
// // // //             <CartTotalPrice cartList={getCartListModuleWise(cartList)} />
// // // //             <CartActions
// // // //               setSideDrawerOpen={setSideDrawerOpen}
// // // //               cartList={getCartListModuleWise(cartList)}
// // // //             />
// // // //           </>
// // // //         )}
// // // //       </CustomStackFullWidth>
// // // //     </CustomSideDrawer>
// // // //   );
// // // // };

// // // // export default CardView;

// // // import React, { useEffect } from "react";

// // // import { useSelector } from "react-redux";
// // // import EmptyCart from "./EmptyCart";
// // // import CartActions from "./CartActions";
// // // import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
// // // import CartContents from "./CartContents";
// // // import { getCartListModuleWise } from "../../helper-functions/getCartListModuleWise";
// // // import { useRouter } from "next/router";
// // // import CustomSideDrawer from "../side-drawer/CustomSideDrawer";
// // // import DrawerHeader from "./DrawerHeader";
// // // import CartIcon from "./assets/CartIcon";
// // // import FreeDeliveryProgressBar from "./FreeDeliveryProgressBar";
// // // import CartTotalPrice from "./CartTotalPrice";
// // // import { useTheme } from "@emotion/react";
// // // import DotSpin from "../DotSpin";
// // // import { Box, padding, Stack } from "@mui/system";
// // // import SpecialFoodOffers from "components/home/special-food-offers";

// // // import { alpha, Button, Skeleton } from "@mui/material";
// // // import Link from "next/link";
// // // import { useState } from "react";
// // // import { useTranslation } from "react-i18next";
// // // import Slider from "react-slick";
// // // import useGetDiscountedItems from "../../api-manage/hooks/react-query/product-details/useGetDiscountedItems.js";
// // // import { getLanguage } from "helper-functions/getLanguage";
// // // import { getModuleId } from "helper-functions/getModuleId";
// // // import { CustomBoxFullWidth } from "styled-components/CustomStyles.style";

// // // import ProductCard from "components/cards/ProductCard";
// // // import { RTL } from "components/rtl";
// // // import SpecialOfferCardSimmer from "components/Shimmer/SpecialOfferCardSimmer";
// // // import H2 from "components/typographies/H2";
// // // import {
// // //   NextFood,
// // //   PrevFood,
// // // } from "components/home/best-reviewed-items/SliderSettings";
// // // import { HomeComponentsWrapper } from "components/home/HomePageComponents";

// // // const CardView = (props) => {
// // //   const theme = useTheme();
// // //   const { sideDrawerOpen, setSideDrawerOpen, cartList, refetch, isLoading} =
// // //     props;
// // //   const { configData } = useSelector((state) => state.configData);
// // //   const imageBaseUrl = configData?.base_urls?.item_image_url;
// // //   const router = useRouter();
// // //   const closeHandler = () => {
// // //     setSideDrawerOpen(false);
// // //   };

// // //   const getModuleWiseCartContent = () => {
// // //     return (
// // //       <CartContents
// // //         cartList={getCartListModuleWise(cartList)}
// // //         imageBaseUrl={imageBaseUrl}
// // //         refetch={refetch}
// // //       />
// // //     );
// // //   };

// // //   const { t } = useTranslation();
// // //   const params = {
// // //     offset: 1,
// // //     limit: 15,
// // //   };

// // //   //deal of the day
// // //   const param = useGetDiscountedItems(params);
// // //   const [isHover, setIsHover] = useState(false);
// // //   const lanDirection = getLanguage() ? getLanguage() : "ltr";

// // //   useEffect(() => {
// // //     param.refetch();
// // //   }, []);

// // //   const settings = {
// // //     dots: false,
// // //     infinite: param.data?.products?.length > 5,
// // //     slidesToShow: param.isLoading ? 1 : 3,
// // //     cssEase: "ease-in-out",
// // //     autoplay: true,
// // //     speed: 800,
// // //     autoplaySpeed: 4000,
// // //     variableHeight: true,
// // //     prevArrow: isHover && <PrevFood displayNoneOnMobile />,
// // //     nextArrow: isHover && <NextFood displayNoneOnMobile />,
// // //     responsive: [
// // //       // {
// // //       //   breakpoint: 1200,
// // //       //   settings: {
// // //       //     slidesToShow: 4,
// // //       //     slidesToScroll: 1,
// // //       //     infinite: param.data?.products?.length > 4,
// // //       //   },
// // //       // },
// // //       // {
// // //       //   breakpoint: 992,
// // //       //   settings: {
// // //       //     slidesToShow: 3.5,
// // //       //     infinite: param.data?.products?.length > 3,
// // //       //   },
// // //       // },
// // //       // {
// // //       //   breakpoint: 821,
// // //       //   settings: {
// // //       //     slidesToShow: 3.2,
// // //       //     infinite: param.data?.products?.length > 3,
// // //       //   },
// // //       // },
// // //       // {
// // //       //   breakpoint: 768,
// // //       //   settings: {
// // //       //     slidesToShow: 3,
// // //       //     infinite: param.data?.products?.length > 3,
// // //       //   },
// // //       // },
// // //       {
// // //         breakpoint: 576,
// // //         settings: {
// // //           slidesToShow: 2,
// // //           infinite: param.data?.products?.length > 2,
// // //         },
// // //       },
// // //       {
// // //         breakpoint: 480,
// // //         settings: {
// // //           slidesToShow: 1.8,
// // //           infinite: param.data?.products?.length > 1,
// // //         },
// // //       },
// // //       {
// // //         breakpoint: 360,
// // //         settings: {
// // //           slidesToShow: 1.5,
// // //           infinite: param.data?.products?.length > 1,
// // //         },
// // //       },
// // //     ],
// // //   };
// // //   const navigateToHome = () => {
// // //     router
// // //       .push({
// // //         pathname: "/home",
// // //         query: {
// // //           search: "special-offer",
// // //           module_id: getModuleId(),
// // //           data_type: "discounted",
// // //         },
// // //       })
// // //       .then(() => {
// // //         window.scrollTo({ top: 0, behavior: "smooth" });
// // //       });
// // //   };

// // //   return (
// // //     <CustomSideDrawer
// // //       anchor="right"
// // //       open={sideDrawerOpen}
// // //       onClose={closeHandler}
// // //       variant="temporary"
// // //       maxWidth="420px"
// // //       width="100%"
// // //     >
// // //       <CustomStackFullWidth
// // //         alignItems="center"
// // //         justifyContent="space-between"
// // //         sx={{ height: "100vh" }}
// // //       >
// // //         <DrawerHeader
// // //           CartIcon={
// // //             <CartIcon
// // //               width="18px"
// // //               height="18px"
// // //               color={theme.palette.primary.dark}
// // //             />
// // //           }
// // //           title="Shopping Cart"
// // //           closeHandler={closeHandler}
// // //         />
// // //         {isLoading ? (
// // //           <Stack height="214px" width="100%" justifyContent="center">
// // //             <DotSpin />
// // //           </Stack>
// // //         ) : getCartListModuleWise(cartList)?.length === 0 ? (
// // //           <EmptyCart
// // //             cartList={getCartListModuleWise(cartList)}
// // //             setSideDrawerOpen={setSideDrawerOpen}
// // //           />
// // //         ) : (
// // //           getModuleWiseCartContent()
// // //         )}

// // //         {/* deal of the Day */}
// // //         {param.data?.products?.length > 0 && (
// // //           <HomeComponentsWrapper
// // //             onMouseEnter={() => setIsHover(true)}
// // //             onMouseLeave={() => setIsHover(false)}
// // //             sx={{
// // //               cursor: "pointer",
// // //               ".slick-slide": {
// // //                 padding: "0 5px",
// // //               },
// // //             }}
// // //           >
// // //             <CustomStackFullWidth
// // //               alignItems="center"
// // //               justifyContent="center"
// // //               mb="10px"
// // //               sx={{ px: { xs: 2 } }}
// // //               spacing={1}
// // //               onMouseEnter={() => setIsHover(true)}
// // //               onMouseLeave={() => setIsHover(false)}
// // //             >
// // //               <CustomStackFullWidth
// // //                 alignItems="center"
// // //                 justifyContent="space-between"
// // //                 direction="row"
// // //               >
// // //                 {param.isFetching ? (
// // //                   <Skeleton variant="text" width="110px" />
// // //                 ) : (
// // //                   <H2
// // //                     text={t("You May Also Like")}
// // //                     component="h2"
// // //                   />
// // //                 )}
// // //                 {param.isFetching ? (
// // //                   <Skeleton width="100px" variant="80px" />
// // //                 ) : (
// // //                   // <Link
// // //                   //   href={{
// // //                   //     pathname: "/home",
// // //                   //     query: {
// // //                   //       search: "special-offer",
// // //                   //       module_id: getModuleId(),
// // //                   //       data_type: "discounted",
// // //                   //     },
// // //                   //   }}
// // //                   //   scroll={true}
// // //                   // >
// // //                   <Button
// // //                     onClick={navigateToHome}
// // //                     variant="text"
// // //                     sx={{
// // //                       transition: "all ease 0.5s",
// // //                       textTransform: "capitalize",
// // //                       "&:hover": {
// // //                         letterSpacing: "0.03em",
// // //                       },
// // //                     }}
// // //                   >
// // //                     {t("View all")}
// // //                   </Button>
// // //                   // </Link>
// // //                 )}
// // //               </CustomStackFullWidth>
// // //               <RTL direction={lanDirection}>
// // //                 <CustomBoxFullWidth
// // //                   sx={{
// // //                     paddingTop: { xs: "0px", sm: "0px" },
// // //                     padding: { xs: "10px", md: "20px" },
// // //                     backgroundColor: (theme) =>
// // //                       alpha(theme.palette.neutral[400], 0.1),
// // //                   }}
// // //                 >
// // //                   <>
// // //                     {param.isFetching ? (
// // //                       <Slider {...settings}>
// // //                         {[...Array(5)].map((item, index) => {
// // //                           return <SpecialOfferCardSimmer key={index}/>
// // //                         })}
// // //                       </Slider>
// // //                     ) : (
// // //                       <Slider {...settings}>
// // //                         {param.data?.products?.map((item, index) => {
// // //                           return (
// // //                             <ProductCard
// // //                               key={index}
// // //                               item={item}
// // //                               specialCard="true"
// // //                             />
// // //                           );
// // //                         })}
// // //                       </Slider>
// // //                     )}
// // //                   </>
// // //                 </CustomBoxFullWidth>
// // //               </RTL>
// // //             </CustomStackFullWidth>
// // //           </HomeComponentsWrapper>
// // //         )}

// // //         {getCartListModuleWise(cartList).length > 0 &&
// // //           configData?.free_delivery_over && (
// // //             <>
// // //               <FreeDeliveryProgressBar
// // //                 configData={configData}
// // //                 cartList={cartList}
// // //               />
// // //             </>
// // //           )}
// // //         {getCartListModuleWise(cartList).length > 0 && (
// // //           <Stack
// // //             sx={{
// // //               position: "sticky",
// // //               bottom: "0",
// // //               backgroundColor: "#fff",
// // //               width: "100%",
// // //             }}
// // //           >
// // //             <CartTotalPrice cartList={getCartListModuleWise(cartList)} />
// // //             <CartActions
// // //               setSideDrawerOpen={setSideDrawerOpen}
// // //               cartList={getCartListModuleWise(cartList)}
// // //             />
// // //           </Stack>
// // //         )}
// // //       </CustomStackFullWidth>
// // //     </CustomSideDrawer>
// // //   );
// // // };

// // // export default CardView;

// // import React, { useEffect } from "react";

// // import { useSelector } from "react-redux";
// // import EmptyCart from "./EmptyCart";
// // import CartActions from "./CartActions";
// // import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
// // import CartContents from "./CartContents";
// // import { getCartListModuleWise } from "../../helper-functions/getCartListModuleWise";
// // import { useRouter } from "next/router";
// // import CustomSideDrawer from "../side-drawer/CustomSideDrawer";
// // import DrawerHeader from "./DrawerHeader";
// // import CartIcon from "./assets/CartIcon";
// // import FreeDeliveryProgressBar from "./FreeDeliveryProgressBar";
// // import CartTotalPrice from "./CartTotalPrice";
// // import { useTheme } from "@emotion/react";
// // import DotSpin from "../DotSpin";
// // import { Box, padding, Stack } from "@mui/system";
// // import SpecialFoodOffers from "components/home/special-food-offers";

// // import { alpha, Button, Skeleton } from "@mui/material";
// // import Link from "next/link";
// // import { useState } from "react";
// // import { useTranslation } from "react-i18next";
// // import Slider from "react-slick";
// // import useGetDiscountedItems from "../../api-manage/hooks/react-query/product-details/useGetDiscountedItems.js";
// // import { getLanguage } from "helper-functions/getLanguage";
// // import { getModuleId } from "helper-functions/getModuleId";
// // import { CustomBoxFullWidth } from "styled-components/CustomStyles.style";

// // import ProductCard from "components/cards/ProductCard";
// // import { RTL } from "components/rtl";
// // import SpecialOfferCardSimmer from "components/Shimmer/SpecialOfferCardSimmer";
// // import H2 from "components/typographies/H2";
// // import {
// //   NextFood,
// //   PrevFood,
// // } from "components/home/best-reviewed-items/SliderSettings";
// // import { HomeComponentsWrapper } from "components/home/HomePageComponents";

// // const CardView = (props) => {
// //   const theme = useTheme();
// //   const { sideDrawerOpen, setSideDrawerOpen, cartList, refetch, isLoading} =
// //     props;
// //   const { configData } = useSelector((state) => state.configData);
// //   const imageBaseUrl = configData?.base_urls?.item_image_url;
// //   const router = useRouter();
// //   const closeHandler = () => {
// //     setSideDrawerOpen(false);
// //   };

// //   const getModuleWiseCartContent = () => {
// //     return (
// //       <CartContents
// //         cartList={getCartListModuleWise(cartList)}
// //         imageBaseUrl={imageBaseUrl}
// //         refetch={refetch}
// //       />
// //     );
// //   };

// //   const { t } = useTranslation();
// //   const params = {
// //     offset: 1,
// //     limit: 15,
// //   };

// //   //deal of the day
// //   const param = useGetDiscountedItems(params);
// //   const [isHover, setIsHover] = useState(false);
// //   const lanDirection = getLanguage() ? getLanguage() : "ltr";

// //   useEffect(() => {
// //     param.refetch();
// //   }, []);

// //   const settings = {
// //     dots: false,
// //     infinite: param.data?.products?.length > 5,
// //     slidesToShow: param.isLoading ? 1 : 3,
// //     cssEase: "ease-in-out",
// //     autoplay: true,
// //     speed: 800,
// //     autoplaySpeed: 4000,
// //     variableHeight: true,
// //     prevArrow: isHover && <PrevFood displayNoneOnMobile />,
// //     nextArrow: isHover && <NextFood displayNoneOnMobile />,
// //     responsive: [
// //       // {
// //       //   breakpoint: 1200,
// //       //   settings: {
// //       //     slidesToShow: 4,
// //       //     slidesToScroll: 1,
// //       //     infinite: param.data?.products?.length > 4,
// //       //   },
// //       // },
// //       // {
// //       //   breakpoint: 992,
// //       //   settings: {
// //       //     slidesToShow: 3.5,
// //       //     infinite: param.data?.products?.length > 3,
// //       //   },
// //       // },
// //       // {
// //       //   breakpoint: 821,
// //       //   settings: {
// //       //     slidesToShow: 3.2,
// //       //     infinite: param.data?.products?.length > 3,
// //       //   },
// //       // },
// //       // {
// //       //   breakpoint: 768,
// //       //   settings: {
// //       //     slidesToShow: 3,
// //       //     infinite: param.data?.products?.length > 3,
// //       //   },
// //       // },
// //       {
// //         breakpoint: 576,
// //         settings: {
// //           slidesToShow: 2,
// //           infinite: param.data?.products?.length > 2,
// //         },
// //       },
// //       {
// //         breakpoint: 480,
// //         settings: {
// //           slidesToShow: 1.8,
// //           infinite: param.data?.products?.length > 1,
// //         },
// //       },
// //       {
// //         breakpoint: 360,
// //         settings: {
// //           slidesToShow: 1.5,
// //           infinite: param.data?.products?.length > 1,
// //         },
// //       },
// //     ],
// //   };
// //   const navigateToHome = () => {
// //     router
// //       .push({
// //         pathname: "/home",
// //         query: {
// //           search: "special-offer",
// //           module_id: getModuleId(),
// //           data_type: "discounted",
// //         },
// //       })
// //       .then(() => {
// //         window.scrollTo({ top: 0, behavior: "smooth" });
// //       });
// //   };

// //   return (
// //     <CustomSideDrawer
// //       anchor="right"
// //       open={sideDrawerOpen}
// //       onClose={closeHandler}
// //       variant="temporary"
// //       maxWidth="420px"
// //       width="100%"
// //     >
// //       <CustomStackFullWidth
// //         alignItems="center"
// //         justifyContent="space-between"
// //         sx={{ height: "100vh" }}
// //       >
// //         <DrawerHeader
// //           CartIcon={
// //             <CartIcon
// //               width="18px"
// //               height="18px"
// //               color={theme.palette.primary.dark}
// //             />
// //           }
// //           title="Shopping Cart"
// //           closeHandler={closeHandler}
// //         />
// //         {isLoading ? (
// //           <Stack height="214px" width="100%" justifyContent="center">
// //             <DotSpin />
// //           </Stack>
// //         ) : getCartListModuleWise(cartList)?.length === 0 ? (
// //           <EmptyCart
// //             cartList={getCartListModuleWise(cartList)}
// //             setSideDrawerOpen={setSideDrawerOpen}
// //           />
// //         ) : (
// //           getModuleWiseCartContent()
// //         )}

// //         {/* deal of the Day */}
// //         {param.data?.products?.length > 0 && (
// //           <HomeComponentsWrapper
// //             onMouseEnter={() => setIsHover(true)}
// //             onMouseLeave={() => setIsHover(false)}
// //             sx={{
// //               cursor: "pointer",
// //               ".slick-slide": {
// //                 padding: "0 5px",
// //               },
// //             }}
// //           >
// //             <CustomStackFullWidth
// //               alignItems="center"
// //               justifyContent="center"
// //               mb="10px"
// //               sx={{ px: { xs: 2 } }}
// //               spacing={1}
// //               onMouseEnter={() => setIsHover(true)}
// //               onMouseLeave={() => setIsHover(false)}
// //             >
// //               <CustomStackFullWidth
// //                 alignItems="center"
// //                 justifyContent="space-between"
// //                 direction="row"
// //               >
// //                 {param.isFetching ? (
// //                   <Skeleton variant="text" width="110px" />
// //                 ) : (
// //                   <H2
// //                     text={t("You May Also Like")}
// //                     component="h2"
// //                   />
// //                 )}
// //                 {param.isFetching ? (
// //                   <Skeleton width="100px" variant="80px" />
// //                 ) : (
// //                   // <Link
// //                   //   href={{
// //                   //     pathname: "/home",
// //                   //     query: {
// //                   //       search: "special-offer",
// //                   //       module_id: getModuleId(),
// //                   //       data_type: "discounted",
// //                   //     },
// //                   //   }}
// //                   //   scroll={true}
// //                   // >
// //                   <Button
// //                     onClick={navigateToHome}
// //                     variant="text"
// //                     sx={{
// //                       transition: "all ease 0.5s",
// //                       textTransform: "capitalize",
// //                       "&:hover": {
// //                         letterSpacing: "0.03em",
// //                       },
// //                     }}
// //                   >
// //                     {t("View all")}
// //                   </Button>
// //                   // </Link>
// //                 )}
// //               </CustomStackFullWidth>
// //               <RTL direction={lanDirection}>
// //                 <CustomBoxFullWidth
// //                   sx={{
// //                     paddingTop: { xs: "0px", sm: "0px" },
// //                     padding: { xs: "10px", md: "20px" },
// //                     backgroundColor: (theme) =>
// //                       alpha(theme.palette.neutral[400], 0.1),
// //                   }}
// //                 >
// //                   <>
// //                     {param.isFetching ? (
// //                       <Slider {...settings}>
// //                         {[...Array(5)].map((item, index) => {
// //                           return <SpecialOfferCardSimmer key={index}/>
// //                         })}
// //                       </Slider>
// //                     ) : (
// //                       <Slider {...settings}>
// //                         {param.data?.products?.map((item, index) => {
// //                           return (
// //                             <ProductCard
// //                               key={index}
// //                               item={item}
// //                               specialCard="true"
// //                             />
// //                           );
// //                         })}
// //                       </Slider>
// //                     )}
// //                   </>
// //                 </CustomBoxFullWidth>
// //               </RTL>
// //             </CustomStackFullWidth>
// //           </HomeComponentsWrapper>
// //         )}

// //         {getCartListModuleWise(cartList).length > 0 &&
// //           configData?.free_delivery_over && (
// //             <>
// //               <FreeDeliveryProgressBar
// //                 configData={configData}
// //                 cartList={cartList}
// //               />
// //             </>
// //           )}
// //         {getCartListModuleWise(cartList).length > 0 && (
// //           <Stack
// //             sx={{
// //               position: "sticky",
// //               bottom: "0",
// //               backgroundColor: "#fff",
// //               width: "100%",
// //             }}
// //           >
// //             <CartTotalPrice cartList={getCartListModuleWise(cartList)} />
// //             <CartActions
// //               setSideDrawerOpen={setSideDrawerOpen}
// //               cartList={getCartListModuleWise(cartList)}
// //             />
// //           </Stack>
// //         )}
// //       </CustomStackFullWidth>
// //     </CustomSideDrawer>
// //   );
// // };

// // export default CardView;

// import React, { useEffect } from "react";

// import { useSelector } from "react-redux";
// import EmptyCart from "./EmptyCart";
// import CartActions from "./CartActions";
// import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
// import CartContents from "./CartContents";
// import { getCartListModuleWise } from "../../helper-functions/getCartListModuleWise";
// import { useRouter } from "next/router";
// import CustomSideDrawer from "../side-drawer/CustomSideDrawer";
// import DrawerHeader from "./DrawerHeader";
// import CartIcon from "./assets/CartIcon";
// import FreeDeliveryProgressBar from "./FreeDeliveryProgressBar";
// import CartTotalPrice from "./CartTotalPrice";
// import { useTheme } from "@emotion/react";
// import DotSpin from "../DotSpin";
// import { Box, padding, Stack } from "@mui/system";
// import SpecialFoodOffers from "components/home/special-food-offers";

// import { alpha, Button, Skeleton } from "@mui/material";
// import Link from "next/link";
// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import Slider from "react-slick";
// import useGetDiscountedItems from "../../api-manage/hooks/react-query/product-details/useGetDiscountedItems.js";
// import { getLanguage } from "helper-functions/getLanguage";
// import { getModuleId } from "helper-functions/getModuleId";
// import { CustomBoxFullWidth } from "styled-components/CustomStyles.style";

// import ProductCard from "components/cards/ProductCard";
// import { RTL } from "components/rtl";
// import SpecialOfferCardSimmer from "components/Shimmer/SpecialOfferCardSimmer";
// import H2 from "components/typographies/H2";
// import {
//   NextFood,
//   PrevFood,
// } from "components/home/best-reviewed-items/SliderSettings";
// import { HomeComponentsWrapper } from "components/home/HomePageComponents";

// const CardView = (props) => {
//   const theme = useTheme();
//   const { sideDrawerOpen, setSideDrawerOpen, cartList, refetch, isLoading } =
//     props;
//   const { configData } = useSelector((state) => state.configData);
//   const imageBaseUrl = configData?.base_urls?.item_image_url;
//   const router = useRouter();
//   const closeHandler = () => {
//     setSideDrawerOpen(false);
//   };

//   const getModuleWiseCartContent = () => {
//     return (
//       <CartContents
//         cartList={getCartListModuleWise(cartList)}
//         imageBaseUrl={imageBaseUrl}
//         refetch={refetch}
//       />
//     );
//   };

//   const { t } = useTranslation();
//   const params = {
//     offset: 1,
//     limit: 15,
//   };

//   //deal of the day
//   const param = useGetDiscountedItems(params);
//   const [isHover, setIsHover] = useState(false);
//   const lanDirection = getLanguage() ? getLanguage() : "ltr";

//   useEffect(() => {
//     param.refetch();
//   }, []);

//   const settings = {
//     dots: false,
//     infinite: param.data?.products?.length > 5,
//     slidesToShow: param.isLoading ? 1 : 3,
//     cssEase: "ease-in-out",
//     autoplay: true,
//     speed: 800,
//     autoplaySpeed: 4000,
//     variableHeight: true,
//     prevArrow: isHover && <PrevFood displayNoneOnMobile />,
//     nextArrow: isHover && <NextFood displayNoneOnMobile />,
//     responsive: [
//       // {
//       //   breakpoint: 1200,
//       //   settings: {
//       //     slidesToShow: 4,
//       //     slidesToScroll: 1,
//       //     infinite: param.data?.products?.length > 4,
//       //   },
//       // },
//       // {
//       //   breakpoint: 992,
//       //   settings: {
//       //     slidesToShow: 3.5,
//       //     infinite: param.data?.products?.length > 3,
//       //   },
//       // },
//       // {
//       //   breakpoint: 821,
//       //   settings: {
//       //     slidesToShow: 3.2,
//       //     infinite: param.data?.products?.length > 3,
//       //   },
//       // },
//       // {
//       //   breakpoint: 768,
//       //   settings: {
//       //     slidesToShow: 3,
//       //     infinite: param.data?.products?.length > 3,
//       //   },
//       // },
//       {
//         breakpoint: 576,
//         settings: {
//           slidesToShow: 2,
//           infinite: param.data?.products?.length > 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1.8,
//           infinite: param.data?.products?.length > 1,
//         },
//       },
//       {
//         breakpoint: 360,
//         settings: {
//           slidesToShow: 1.5,
//           infinite: param.data?.products?.length > 1,
//         },
//       },
//     ],
//   };
//   const navigateToHome = () => {
//     router
//       .push({
//         pathname: "/home",
//         query: {
//           search: "special-offer",
//           module_id: getModuleId(),
//           data_type: "discounted",
//         },
//       })
//       .then(() => {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//       });
//   };

//   return (
//     <CustomSideDrawer
//       anchor="right"
//       open={sideDrawerOpen}
//       onClose={closeHandler}
//       variant="temporary"
//       maxWidth="420px"
//       width="100%"
//     >
//       <CustomStackFullWidth
//         alignItems="center"
//         justifyContent="space-between"
//         sx={{ height: "100vh" }}
//       >
//         <DrawerHeader
//           CartIcon={
//             <CartIcon
//               width="18px"
//               height="18px"
//               color={theme.palette.primary.dark}
//             />
//           }
//           title="Shopping Cart "
//           closeHandler={closeHandler}
//         />
//         {isLoading ? (
//           <Stack height="214px" width="100%" justifyContent="center">
//             <DotSpin />
//           </Stack>
//         ) : getCartListModuleWise(cartList)?.length === 0 ? (
//           <EmptyCart
//             cartList={getCartListModuleWise(cartList)}
//             setSideDrawerOpen={setSideDrawerOpen}
//           />
//         ) : (
//           getModuleWiseCartContent()
//         )}

//         {/* deal of the Day */}
//         {param.data?.products?.length > 0 && (
//           <HomeComponentsWrapper
//             onMouseEnter={() => setIsHover(true)}
//             onMouseLeave={() => setIsHover(false)}
//             sx={{
//               cursor: "pointer",
//               ".slick-slide": {
//                 padding: "0 5px",
//               },
//             }}
//           >
//             <CustomStackFullWidth
//               alignItems="center"
//               justifyContent="center"
//               mb="10px"
//               sx={{ px: { xs: 2 } }}
//               spacing={1}
//               onMouseEnter={() => setIsHover(true)}
//               onMouseLeave={() => setIsHover(false)}
//             >
//               <CustomStackFullWidth
//                 alignItems="center"
//                 justifyContent="space-between"
//                 direction="row"
//               >
//                 {param.isFetching ? (
//                   <Skeleton variant="text" width="110px" />
//                 ) : (
//                   <H2 text={t("You May Also Like")} component="h2" />
//                 )}
//                 {param.isFetching ? (
//                   <Skeleton width="100px" variant="80px" />
//                 ) : (
//                   // <Link
//                   //   href={{
//                   //     pathname: "/home",
//                   //     query: {
//                   //       search: "special-offer",
//                   //       module_id: getModuleId(),
//                   //       data_type: "discounted",
//                   //     },
//                   //   }}
//                   //   scroll={true}
//                   // >
//                   <Button
//                     onClick={navigateToHome}
//                     variant="text"
//                     sx={{
//                       transition: "all ease 0.5s",
//                       textTransform: "capitalize",
//                       "&:hover": {
//                         letterSpacing: "0.03em",
//                       },
//                     }}
//                   >
//                     {t("View all")}
//                   </Button>
//                   // </Link>
//                 )}
//               </CustomStackFullWidth>
//               <RTL direction={lanDirection}>
//                 <CustomBoxFullWidth
//                   sx={{
//                     paddingTop: { xs: "0px", sm: "0px" },
//                     padding: { xs: "10px", md: "20px" },
//                     backgroundColor: (theme) =>
//                       alpha(theme.palette.neutral[400], 0.1),
//                   }}
//                 >
//                   <>
//                     {param.isFetching ? (
//                       <Slider {...settings}>
//                         {[...Array(5)].map((item, index) => {
//                           return <SpecialOfferCardSimmer key={index} />;
//                         })}
//                       </Slider>
//                     ) : (
//                       <Slider {...settings}>
//                         {param.data?.products?.map((item, index) => {
//                           return (
//                             <ProductCard
//                               key={index}
//                               item={item}
//                               specialCard="true"
//                               isCartContext={true}
//                             />
//                           );
//                         })}
//                       </Slider>
//                     )}
//                   </>
//                 </CustomBoxFullWidth>
//               </RTL>
//             </CustomStackFullWidth>
//           </HomeComponentsWrapper>
//         )}

//         {getCartListModuleWise(cartList).length > 0 &&
//           configData?.free_delivery_over && (
//             <>
//               <FreeDeliveryProgressBar
//                 configData={configData}
//                 cartList={cartList}
//               />
//             </>
//           )}
//         {getCartListModuleWise(cartList).length > 0 && (
//           <Stack
//             sx={{
//               position: "sticky",
//               bottom: "0",
//               backgroundColor: "#fff",
//               width: "100%",
//             }}
//           >
//             <CartTotalPrice cartList={getCartListModuleWise(cartList)} />
//             <CartActions
//               setSideDrawerOpen={setSideDrawerOpen}
//               cartList={getCartListModuleWise(cartList)}
//             />
//           </Stack>
//         )}
//       </CustomStackFullWidth>
//     </CustomSideDrawer>
//   );
// };

// export default CardView;
import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import CartActions from "./CartActions";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import CartContents from "./CartContents";
import { getCartListModuleWise } from "../../helper-functions/getCartListModuleWise";
import { useRouter } from "next/router";
import CustomSideDrawer from "../side-drawer/CustomSideDrawer";
import DrawerHeader from "./DrawerHeader";
import CartIcon from "./assets/CartIcon";
import FreeDeliveryProgressBar from "./FreeDeliveryProgressBar";
import CartTotalPrice from "./CartTotalPrice";
import { useTheme } from "@emotion/react";
import DotSpin from "../DotSpin";
import { Box, padding, Stack } from "@mui/system";
import SpecialFoodOffers from "components/home/special-food-offers";

import { alpha, Button, Skeleton } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import useGetDiscountedItems from "../../api-manage/hooks/react-query/product-details/useGetDiscountedItems.js";
import { getLanguage } from "helper-functions/getLanguage";
import { getModuleId } from "helper-functions/getModuleId";
import { CustomBoxFullWidth } from "styled-components/CustomStyles.style";

import ProductCard from "components/cards/ProductCard";
import { RTL } from "components/rtl";
import SpecialOfferCardSimmer from "components/Shimmer/SpecialOfferCardSimmer";
import H2 from "components/typographies/H2";
import {
  NextFood,
  PrevFood,
} from "components/home/best-reviewed-items/SliderSettings";
import { HomeComponentsWrapper } from "components/home/HomePageComponents";

const CardView = (props) => {
  const theme = useTheme();
  const { sideDrawerOpen, setSideDrawerOpen, cartList, refetch, isLoading } =
    props;
  const { configData } = useSelector((state) => state.configData);
  const imageBaseUrl = configData?.base_urls?.item_image_url;
  const router = useRouter();
  const closeHandler = () => {
    setSideDrawerOpen(false);
  };

  const getModuleWiseCartContent = () => {
    return (
      <CartContents
        cartList={getCartListModuleWise(cartList)}
        imageBaseUrl={imageBaseUrl}
        refetch={refetch}
      />
    );
  };

  const { t } = useTranslation();
  const params = {
    offset: 1,
    limit: 15,
  };

  //deal of the day
  const param = useGetDiscountedItems(params);
  const [isHover, setIsHover] = useState(false);
  const lanDirection = getLanguage() ? getLanguage() : "ltr";

  useEffect(() => {
    param.refetch();
  }, []);

  const settings = {
    dots: false,
    infinite: param.data?.products?.length > 2,
    slidesToShow: param.isLoading ? 1 : 2,
    cssEase: "ease-in-out",
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    variableHeight: true,
    prevArrow: isHover && <PrevFood displayNoneOnMobile />,
    nextArrow: isHover && <NextFood displayNoneOnMobile />,
    responsive: [
      // {
      //   breakpoint: 1200,
      //   settings: {
      //     slidesToShow: 4,
      //     slidesToScroll: 1,
      //     infinite: param.data?.products?.length > 4,
      //   },
      // },
      // {
      //   breakpoint: 992,
      //   settings: {
      //     slidesToShow: 3.5,
      //     infinite: param.data?.products?.length > 3,
      //   },
      // },
      // {
      //   breakpoint: 821,
      //   settings: {
      //     slidesToShow: 3.2,
      //     infinite: param.data?.products?.length > 3,
      //   },
      // },
      // {
      //   breakpoint: 768,
      //   settings: {
      //     slidesToShow: 3,
      //     infinite: param.data?.products?.length > 3,
      //   },
      // },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          infinite: param.data?.products?.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          infinite: param.data?.products?.length > 1,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1.5,
          infinite: param.data?.products?.length > 1,
        },
      },
    ],
  };
  const navigateToHome = () => {
    router
      .push({
        pathname: "/home",
        query: {
          search: "special-offer",
          module_id: getModuleId(),
          data_type: "discounted",
        },
      })
      .then(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  };

  return (
    <CustomSideDrawer
      anchor="right"
      open={sideDrawerOpen}
      onClose={closeHandler}
      variant="temporary"
      maxWidth="420px"
      width="100%"
    >
      <CustomStackFullWidth
        alignItems="center"
        justifyContent="space-between"
        sx={{ height: "100vh" }}
      >
        <DrawerHeader
          CartIcon={
            <CartIcon
              width="18px"
              height="18px"
              color={theme.palette.primary.main}
            />
          }
          title="Shopping Cart "
          closeHandler={closeHandler}
        />
        {isLoading ? (
          <Stack height="214px" width="100%" justifyContent="center">
            <DotSpin />
          </Stack>
        ) : getCartListModuleWise(cartList)?.length === 0 ? (
          <EmptyCart
            cartList={getCartListModuleWise(cartList)}
            setSideDrawerOpen={setSideDrawerOpen}
          />
        ) : (
          getModuleWiseCartContent()
        )}

        {/* deal of the Day */}
        {param.data?.products?.length > 0 && (
          <HomeComponentsWrapper
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            sx={{
              cursor: "pointer",
              ".slick-slide": {
                padding: "0 5px",
              },
            }}
          >
            <CustomStackFullWidth
              alignItems="center"
              justifyContent="center"
              mb="10px"
              sx={{ px: { xs: 2 } }}
              spacing={1}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <CustomStackFullWidth
                alignItems="center"
                justifyContent="space-between"
                direction="row"
              >
                {param.isFetching ? (
                  <Skeleton variant="text" width="110px" />
                ) : (
                  <H2
                    text={t("You May Also Like")}
                    component="h2"
                    fontSize={{ md: "1rem" }}
                  />
                )}
                {param.isFetching ? (
                  <Skeleton width="100px" variant="80px" />
                ) : (
                  // <Link
                  //   href={{
                  //     pathname: "/home",
                  //     query: {
                  //       search: "special-offer",
                  //       module_id: getModuleId(),
                  //       data_type: "discounted",
                  //     },
                  //   }}
                  //   scroll={true}
                  // >
                  <Button
                    onClick={navigateToHome}
                    variant="text"
                    sx={{
                      transition: "all ease 0.5s",
                      textTransform: "capitalize",
                      "&:hover": {
                        letterSpacing: "0.03em",
                      },
                    }}
                  >
                    {t("View all")}
                  </Button>
                  // </Link>
                )}
              </CustomStackFullWidth>
              <RTL direction={lanDirection}>
                <CustomBoxFullWidth
                  sx={{
                    paddingTop: { xs: "0px", sm: "0px" },
                    padding: { xs: "10px", md: "20px" },
                    backgroundColor: (theme) =>
                      alpha(theme.palette.neutral[400], 0.1),
                  }}
                >
                  <>
                    {
                      <Slider {...settings}>
                        {param.data?.products?.map((item, index) => {
                          return (
                            <ProductCard
                              key={index}
                              item={item}
                              specialCard="true"
                              isCartContext={true}
                            />
                          );
                        })}
                      </Slider>
                    }
                  </>
                </CustomBoxFullWidth>
              </RTL>
            </CustomStackFullWidth>
          </HomeComponentsWrapper>
        )}

        {getCartListModuleWise(cartList).length > 0 &&
          configData?.free_delivery_over && (
            <>
              <FreeDeliveryProgressBar
                configData={configData}
                cartList={cartList}
              />
            </>
          )}
        {getCartListModuleWise(cartList).length > 0 && (
          <Stack
            sx={{
              position: "sticky",
              bottom: "0",
              backgroundColor: "#fff",
              width: "100%",
            }}
          >
            <CartTotalPrice cartList={getCartListModuleWise(cartList)} />
            <CartActions
              setSideDrawerOpen={setSideDrawerOpen}
              cartList={getCartListModuleWise(cartList)}
            />
          </Stack>
        )}
      </CustomStackFullWidth>
    </CustomSideDrawer>
  );
};

export default CardView;
