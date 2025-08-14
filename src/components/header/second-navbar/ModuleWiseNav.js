// import { Avatar, Badge, Grid, Stack, useTheme } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { Box } from "@mui/system";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getImageUrl } from "utils/CustomFunctions";
// import useGetModule from "../../../api-manage/hooks/react-query/useGetModule";
// import { getLanguage } from "helper-functions/getLanguage";
// import { setModules } from "redux/slices/configData";
// import {
//   CustomBoxFullWidth,
//   CustomStackFullWidth,
// } from "styled-components/CustomStyles.style";
// import CustomImageContainer from "../../CustomImageContainer";
// import AddressReselect from "../top-navbar/address-reselect/AddressReselect";
// import DrawerMenu from "../top-navbar/drawer-menu/DrawerMenu";
// import MobileModuleSelection from "./mobile-module-select";
// import CustomLogo from "components/logo/CustomLogo";
// import ManageSearch from "./ManageSearch";
// import Divider from "@mui/material/Divider";
// import Typography from "@mui/material/Typography";
// import { CenterFocusStrong } from "@mui/icons-material";
// import { getModule } from "helper-functions/getLanguage";
// import { CustomBottomNavigationAction, SignInButton } from "../NavBar.style";
// import { t } from "i18next";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import { useRouter } from "next/router";
// import { getToken } from "helper-functions/getToken";
// import { getCartListModuleWise } from "helper-functions/getCartListModuleWise";
// import { toast } from "react-hot-toast";
// import CardView from "components/added-cart-view";
// import WishListCardView from "components/wishlist";

// const ModuleWiseNav = (props) => {
//   const {
//     router,
//     configData,
//     token,
//     setToggled,
//     location,
//     setOpenSignIn,
//     setModalFor,
//     isSmall,
//     zoneid,
//     searchQuery,
//     name,
//     query,
//     currentTab,
//   } = props;

//   const theme = useTheme();

//   const { modules } = useSelector((state) => state.configData);
//   const [openDrawer, setOpenDrawer] = useState(false);
//   const { data, refetch } = useGetModule();
//   const { profileInfo } = useSelector((state) => state.profileInfo);
//   const profileImageUrl = `${getImageUrl(
//     profileInfo?.storage,
//     "customer_image_url",
//     configData
//   )}/${profileInfo?.image}`;
//   const favIcon = configData?.logo_full_url;
//   const lanDirection = getLanguage();
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (modules?.length === 0) {
//       refetch();
//       //dispatch(setModules(data));
//     }
//   }, [modules]);
//   useEffect(() => {
//     if (data?.length > 0) {
//       dispatch(setModules(data));
//     }
//   }, [data]);
//   const handleProfileClick = () => {
//     if (token) {
//       router.push(
//         { pathname: "/profile", query: { page: "profile-settings" } },
//         undefined,
//         { shallow: true }
//       );
//     } else {
//       setModalFor("sign-in");
//       setOpenSignIn(true);
//     }
//   };

//   const handleFlexendSide = () => (
//     <CustomStackFullWidth
//       direction="row"
//       // justifyContent="flex-end"
//       gap='12px'
//       alignItems="center"
//     >
//       <Avatar
//         src={profileImageUrl}
//         sx={{ width: 18, height: 18, cursor: "pointer" }}
//         onClick={handleProfileClick}
//       />
//       <DrawerMenu
//         setToggled={setToggled}
//         setOpenDrawer={setOpenDrawer}
//         openDrawer={openDrawer}
//       />
//     </CustomStackFullWidth>
//   );
//   const handleIconClick = () => {
//     if (location) {
//       router.push("/home");
//     } else {
//       router.push("/");
//     }
//   };
//   const getIcon = () => (
//     <Box
//       onClick={handleIconClick}
//       sx={{
//         alignItems: "center",
//         justifyContent: "center",
//         height: "30px",
//         position: "relative",
//         cursor: "pointer",
//         "& img": {
//           maxHeight: "100%",
//         },
//       }}
//     >
//       <CustomLogo
//         atlText="logo"
//         logoImg={favIcon}
//         //height="1.5rem"
//         width={"100%"}
//         height={"100%"}
//         objectFit={"contain"}
//       />
//     </Box>
//   );

//   const { wishLists } = useSelector((state) => state.wishList);
//   const { cartList } = useSelector((state) => state.cart);
//   const { selectedModule } = useSelector((state) => state.utilsData);
//   const totalWishList = wishLists?.item?.length + wishLists?.store?.length;
//   const rentalTotalWishList =
//     wishLists?.providers?.length + wishLists?.vehicles?.length;
//   const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
//   const [wishListSideDrawerOpen, setWishListSideDrawerOpen] = useState(false);
//   const route = useRouter();
//   const currentRoute = route.pathname.replace("/", "");
//   const handleCartDrawerOpen = () => {
//     setSideDrawerOpen(true);
//   };
//   const handleWishListsDrawerOpen = () => {
//     if (getToken()) {
//       setWishListSideDrawerOpen(true);
//     } else {
//       toast.error(t("Please login"));
//     }
//   };

//   return (
//     <CustomStackFullWidth>
//       {!!modules &&
//         (isSmall ? (
//           // Mobile layout (existing)
//           <Grid container alignItems="center">
//             <Grid
//               item
//               xs={10}
//               align={
//                 lanDirection
//                   ? lanDirection === "ltr"
//                     ? "left"
//                     : "right"
//                   : "left"
//               }
//               container
//             >
//               <CustomBoxFullWidth>
//                 <Grid
//                   container
//                   justifyContent="center"
//                   alignItems="center"
//                   spacing={1}
//                 >
//                   <Grid
//                     item
//                     xs={router.pathname === "/home" ? 2 : 4}
//                     sm={4}
//                     align="left"
//                   >
//                     {router.pathname === "/home" && !router.query.search ? (
//                       modules.length >= 2 ? (
//                         <MobileModuleSelection />
//                       ) : (
//                         getIcon()
//                       )
//                     ) : (
//                       getIcon()
//                     )}
//                   </Grid>
//                   {location ? (
//                     <Grid
//                       item
//                       xs={router.pathname === "/home" ? 10 : 8}
//                       sm={8}
//                       align="left"
//                     >
//                       <AddressReselect
//                         setOpenDrawer={setOpenDrawer}
//                         location={location}
//                         openDrawer={openDrawer}
//                       />
//                     </Grid>
//                   ) : (
//                     <Grid
//                       item
//                       xs={router.pathname === "/home" ? 2 : 10}
//                       sm={11}
//                     ></Grid>
//                   )}
//                 </Grid>
//               </CustomBoxFullWidth>
//             </Grid>
//             <Grid item xs={2} align="right">
//               {handleFlexendSide()}
//             </Grid>
//           </Grid>
//         ) : (
//           // Desktop layout: left logo+location, center search, right profile
//           <CustomStackFullWidth
//             direction="row"
//             alignItems="center"
//             justifyContent="space-between"
//             sx={{ minHeight: 60 }}
//           >
//             {/* Left: Logo + Divider + Address/Location */}
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "flex-start",
//                 gap: 1,
//                 bgcolor: "white",

//                 py: 1,
//               }}
//             >
//               <Box sx={{ display: "flex", flexDirection: "column" }}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     gap: "15px",
//                     alignItems: "center",
//                     justifyContent: "flex-start",
//                   }}
//                 >
//                   {getIcon()}

//                   <Typography
//                     variant="caption"
//                     color="text.secondary"
//                     sx={{
//                       fontWeight: 500,
//                       letterSpacing: 1,
//                       textTransform: "uppercase",
//                     }}
//                   >
//                     Location
//                   </Typography>
//                 </Box>

//                 {location && (
//                   <AddressReselect
//                     setOpenDrawer={setOpenDrawer}
//                     location={location}
//                     openDrawer={openDrawer}
//                   />
//                 )}
//               </Box>

//               {/* <Divider orientation="vertical" flexItem sx={{ mx:1}} /> */}
//               {/* <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                 }}
//               ></Box> */}
//             </Box>

//             {/* Center: Search Bar */}
//             {/* <Box
//               sx={{ flex: 1, display: "flex", justifyContent: "center", px: 4 }}
//             >
//               <ManageSearch
//                 zoneid={zoneid}
//                 token={token}
//                 fullWidth={true}
//                 searchQuery={searchQuery}
//                 name={name}
//                 query={query}
//                 currentTab={currentTab}
//               />
//             </Box> */}

//             {/* Right: Profile and Drawer */}
//             {/* <Box
//               sx={{
//                 minWidth: 100,
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 alignItems: "center",
//               }}
//             >
//               {handleFlexendSide()}
//             </Box> */}

//             <Stack
//               direction={"row"}
//               // justifyContent="flex-end"
//               alignItems="center"
//               gap="18px"
//             >
//               <CustomBottomNavigationAction
//                 // label={t("WishList")}
//                 value="wishlist"
//                 onClick={() => handleWishListsDrawerOpen()}
//                 icon={
//                   <Badge
//                     badgeContent={
//                       getModule()?.module_type !== "rental"
//                         ? totalWishList
//                         : rentalTotalWishList || 0
//                     }
//                     // color="error"
//                   >
//                     {/* <FavoriteIcon
//                       sx={{ color: "transparent", border: "2px solid red" }}
//                     /> */}

//                     <FavoriteBorderIcon sx={{ color: "#FF6159" }} />
//                   </Badge>
//                 }
//               />

//               {!!sideDrawerOpen && (
//                 <CardView
//                   sideDrawerOpen={sideDrawerOpen}
//                   setSideDrawerOpen={setSideDrawerOpen}
//                   cartList={cartList}
//                 />
//               )}

//               {!!wishListSideDrawerOpen && (
//                 <WishListCardView
//                   sideDrawerOpen={wishListSideDrawerOpen}
//                   setSideDrawerOpen={setWishListSideDrawerOpen}
//                 />
//               )}

//                 {selectedModule?.module_type !== "parcel" &&
//               selectedModule?.module_type !== "rental" && (
//               <CustomBottomNavigationAction
//                 onClick={() => handleCartDrawerOpen()}
//                 // label={t("Cart")}
//                 value="cart"
//                 icon={
//                   <Badge
//                     badgeContent={getCartListModuleWise(cartList)?.length}
//                     color="error"
//                   >
//                     <ShoppingCartOutlinedIcon sx={{ color: "#ff6159" }} />
//                   </Badge>
//                 }
//               />)}

//               {token ? (
//                 handleFlexendSide()
//               ) : (
//                 <SignInButton
//                   onClick={() => setOpenSignIn(true)}
//                   variant="contained"
//                   sx={{ backgroundColor: "#ff6159" }}
//                 >
//                   <CustomStackFullWidth
//                     direction="row"
//                     alignItems="center"
//                     spacing={1}
//                   >
//                     <Typography color={theme.palette.whiteContainer.main}>
//                       {t("Login")}
//                     </Typography>
//                   </CustomStackFullWidth>
//                 </SignInButton>
//               )}
//             </Stack>
//           </CustomStackFullWidth>
//         ))}
//     </CustomStackFullWidth>
//   );
// };

// ModuleWiseNav.propTypes = {};

// export default React.memo(ModuleWiseNav);

import {
  Avatar,
  IconButton,
  Badge,
  Grid,
  Stack,
  useTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImageUrl } from "utils/CustomFunctions";
import useGetModule from "../../../api-manage/hooks/react-query/useGetModule";
import { getLanguage } from "helper-functions/getLanguage";
import { setModules } from "redux/slices/configData";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import AddressReselect from "../top-navbar/address-reselect/AddressReselect";
import DrawerMenu from "../top-navbar/drawer-menu/DrawerMenu";
import MobileModuleSelection from "./mobile-module-select";
import CustomLogo from "components/logo/CustomLogo";
import ManageSearch from "./ManageSearch";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { CenterFocusStrong } from "@mui/icons-material";
import { getModule } from "helper-functions/getLanguage";
import { CustomBottomNavigationAction, SignInButton } from "../NavBar.style";
import { t } from "i18next";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useRouter } from "next/router";
import { getToken } from "helper-functions/getToken";
import { getCartListModuleWise } from "helper-functions/getCartListModuleWise";
import { toast } from "react-hot-toast";
import CardView from "components/added-cart-view";
import WishListCardView from "components/wishlist";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ModuleWiseNav = (props) => {
  const {
    router,
    configData,
    token,
    setToggled,
    location,
    setOpenSignIn,
    setModalFor,
    deliveryTat,
    isLoading,
    isSmall,
    zoneid,
    searchQuery,
    name,
    query,
    currentTab,
  } = props;

  const theme = useTheme();

  const { modules } = useSelector((state) => state.configData);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { data, refetch } = useGetModule();
  const { profileInfo } = useSelector((state) => state.profileInfo);
  const profileImageUrl = `${getImageUrl(
    profileInfo?.storage,
    "customer_image_url",
    configData
  )}/${profileInfo?.image}`;
  const favIcon = configData?.logo_full_url;
  const lanDirection = getLanguage();
  const dispatch = useDispatch();
  useEffect(() => {
    if (modules?.length === 0) {
      refetch();
      //dispatch(setModules(data));
    }
  }, [modules]);
  useEffect(() => {
    if (data?.length > 0) {
      dispatch(setModules(data));
    }
  }, [data]);
  const handleProfileClick = () => {
    if (token) {
      router.push(
        { pathname: "/profile", query: { page: "profile-settings" } },
        undefined,
        { shallow: true }
      );
    } else {
      setModalFor("sign-in");
      setOpenSignIn(true);
    }
  };

  const handleFlexendSide = () => (
    <CustomStackFullWidth
      direction="row"
      // justifyContent="flex-end"
      // gap="12px"
      // alignItems="center"
      ////////spacing between 3 profiles and 3 dots
      gap="0px"
      alignItems="center"
    >
      {/* <Avatar
        src={profileImageUrl}
        sx={{ width: 18, height: 18, cursor: "pointer" }}
        onClick={handleProfileClick}
      /> */}
      <IconButton
        onClick={handleProfileClick}
        sx={{
          padding: "8px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            backgroundColor: "rgba(255, 122, 89, 0.1)",
          },
        }}
      >
        {profileInfo?.image ? (
          <Avatar
            alt={profileInfo?.last_name}
            sx={{
              width: 24,
              height: 24,
              border: "2px solid #FF7A59",
            }}
            src={profileInfo?.image_full_url}
          />
        ) : (
          <AccountCircleIcon
            sx={{
              fontSize: "24px",
              color: "#FF7A59",
            }}
          />
        )}
           
      </IconButton>
      <Box sx={{ ml: "-12px" }}></Box>
      <DrawerMenu
        setToggled={setToggled}
        setOpenDrawer={setOpenDrawer}
        openDrawer={openDrawer}
      />
    </CustomStackFullWidth>
  );
  const handleIconClick = () => {
    if (location) {
      router.push("/home");
    } else {
      router.push("/");
    }
  };
  const getIcon = () => (
    <Box
      onClick={handleIconClick}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: "30px",
        position: "relative",
        cursor: "pointer",
        "& img": {
          maxHeight: "100%",
        },
      }}
    >
      <CustomLogo
        atlText="logo"
        logoImg={favIcon}
        //height="1.5rem"
        width={"100%"}
        height={"100%"}
        objectFit={"contain"}
      />
    </Box>
  );

  const { wishLists } = useSelector((state) => state.wishList);
  const { cartList } = useSelector((state) => state.cart);
  const { selectedModule } = useSelector((state) => state.utilsData);
  const totalWishList = wishLists?.item?.length + wishLists?.store?.length;
  const rentalTotalWishList =
    wishLists?.providers?.length + wishLists?.vehicles?.length;
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [wishListSideDrawerOpen, setWishListSideDrawerOpen] = useState(false);
  const route = useRouter();
  const currentRoute = route.pathname.replace("/", "");
  const handleCartDrawerOpen = () => {
    setSideDrawerOpen(true);
  };
  const handleWishListsDrawerOpen = () => {
    if (getToken()) {
      setWishListSideDrawerOpen(true);
    } else {
      toast.error(t("Please login"));
    }
  };

  return (
    <CustomStackFullWidth>
      {!!modules &&
        (isSmall ? (
          // Mobile layout (existing)
          <Grid container alignItems="center">
            <Grid
              item
              xs={10}
              align={
                lanDirection
                  ? lanDirection === "ltr"
                    ? "left"
                    : "right"
                  : "left"
              }
              container
            >
              <CustomBoxFullWidth>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid
                    item
                    xs={router.pathname === "/home" ? 2 : 4}
                    sm={4}
                    align="left"
                  >
                    {router.pathname === "/home" && !router.query.search ? (
                      modules.length >= 2 ? (
                        <MobileModuleSelection />
                      ) : (
                        getIcon()
                      )
                    ) : (
                      getIcon()
                    )}
                  </Grid>
                  {location ? (
                    <Grid
                      item
                      xs={router.pathname === "/home" ? 10 : 8}
                      sm={8}
                      align="left"
                    >
                      <AddressReselect
                        setOpenDrawer={setOpenDrawer}
                        location={location}
                        openDrawer={openDrawer}
                      />
                    </Grid>
                  ) : (
                    <Grid
                      item
                      xs={router.pathname === "/home" ? 2 : 10}
                      sm={11}
                    ></Grid>
                  )}
                </Grid>
              </CustomBoxFullWidth>
            </Grid>
            <Grid item xs={2} align="right">
              {handleFlexendSide()}
            </Grid>
          </Grid>
        ) : (
          // Desktop layout: left logo+location, center search, right profile
          <CustomStackFullWidth
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ minHeight: 60 }}
          >
            {/* Left: Logo + Divider + Address/Location */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
                bgcolor: "white",

                py: 1,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "15px",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  {getIcon()}

                  {/* <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      fontWeight: 500,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                    }}
                  >
                    Location
                  </Typography> */}
                  {isLoading ? (
                    <Typography
                      variant="body2"
                      height={"20px"}
                      sx={{
                        fontWeight: 500,
                        color: "#ccc",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        background: "#f5f5f5",
                        minWidth: 100,
                      }}
                    ></Typography>
                  ) : (
                    <Typography color="#000000" fontWeight={500} fontSize={14}>
                      Delivery in {deliveryTat}
                    </Typography>
                  )}
                </Box>

                {location && (
                  <AddressReselect
                    setOpenDrawer={setOpenDrawer}
                    location={location}
                    openDrawer={openDrawer}
                  />
                )}
              </Box>

              {/* <Divider orientation="vertical" flexItem sx={{ mx:1}} /> */}
              {/* <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              ></Box> */}
            </Box>

            {/* Center: Search Bar */}
            {/* <Box
              sx={{ flex: 1, display: "flex", justifyContent: "center", px: 4 }}
            >
              <ManageSearch
                zoneid={zoneid}
                token={token}
                fullWidth={true}
                searchQuery={searchQuery}
                name={name}
                query={query}
                currentTab={currentTab}
              />
            </Box> */}

            {/* Right: Profile and Drawer */}
            {/* <Box
              sx={{
                minWidth: 100,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {handleFlexendSide()}
            </Box> */}

            <Stack
              direction={"row"}
              // justifyContent="flex-end"
              alignItems="center"
              gap="10px"
            >
              {token ? (
                <CustomBottomNavigationAction
                  // label={t("WishList")}
                  value="wishlist"
                  onClick={() => handleWishListsDrawerOpen()}
                  icon={
                    // <Badge
                    //   badgeContent={
                    //     getModule()?.module_type !== "rental"
                    //       ? totalWishList
                    //       : rentalTotalWishList || 0
                    //   }
                    //   // color="error"
                    // >
                    //   {/* <FavoriteIcon
                    //   sx={{ color: "transparent", border: "2px solid red" }}
                    // /> */}
                    //   sx=
                    //   {{
                    //     "& .MuiBadge-badge": {
                    //       backgroundColor: "#FF7A59",
                    //       color: "white",
                    //       minWidth: "16px",
                    //       height: "16px",
                    //       fontSize: "10px",
                    //       padding: "0 4px",
                    //     },
                    //     "&:hover .MuiBadge-badge": {
                    //       backgroundColor: "#FF7A59",
                    //       color: "white",
                    //     },
                    //   }}
                    //   {/* <FavoriteBorderIcon sx={{ color: "#FF6159" }} /> */}
                    //   <FavoriteBorderIcon
                    //     sx={{ color: "#FF6159", fontSize: "24px" }}
                    //   />
                    // </Badge>
                    <Badge
                      badgeContent={
                        getModule()?.module_type !== "rental"
                          ? totalWishList
                          : rentalTotalWishList || 0
                      }
                      sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: "#FF7A59",
                          color: "white",
                          minWidth: "16px",
                          height: "16px",
                          fontSize: "10px",
                          padding: "0 4px",
                        },
                        "&:hover .MuiBadge-badge": {
                          backgroundColor: "#FF7A59",
                          color: "white",
                        },
                      }}
                    >
                      <FavoriteBorderIcon
                        sx={{ color: "#FF6159", fontSize: "24px" }}
                      />
                    </Badge>
                  }
                />
              ) : (
                <></>
              )}

              {!!sideDrawerOpen && (
                <CardView
                  sideDrawerOpen={sideDrawerOpen}
                  setSideDrawerOpen={setSideDrawerOpen}
                  cartList={cartList}
                />
              )}

              {!!wishListSideDrawerOpen && (
                <WishListCardView
                  sideDrawerOpen={wishListSideDrawerOpen}
                  setSideDrawerOpen={setWishListSideDrawerOpen}
                />
              )}

              {selectedModule?.module_type !== "parcel" &&
                selectedModule?.module_type !== "rental" && (
                  <CustomBottomNavigationAction
                    onClick={() => handleCartDrawerOpen()}
                    // label={t("Cart")}
                    value="cart"
                    sx={{ marginLeft: "10px" }}
                    icon={
                      <Badge
                        badgeContent={getCartListModuleWise(cartList)?.length}
                        //  color="error"
                        sx={{
                          "& .MuiBadge-badge": {
                            backgroundColor: "#FF7A59",
                            color: "white",
                            minWidth: "16px",
                            height: "16px",
                            fontSize: "10px",
                            padding: "0 4px",
                          },
                          "&:hover .MuiBadge-badge": {
                            backgroundColor: "#FF7A59",
                            color: "white",
                          },
                        }}
                      >
                        <ShoppingCartOutlinedIcon sx={{ color: "#ff6159" }} />
                      </Badge>
                    }
                  />
                )}

              {token ? (
                handleFlexendSide()
              ) : (
                <SignInButton
                  onClick={() => setOpenSignIn(true)}
                  variant="contained"
                  sx={{ backgroundColor: "#ff6159" }}
                >
                  <CustomStackFullWidth
                    direction="row"
                    alignItems="center"
                    spacing={1}
                  >
                    <Typography color={theme.palette.whiteContainer.main}>
                      {t("Login")}
                    </Typography>
                  </CustomStackFullWidth>
                </SignInButton>
              )}
            </Stack>
          </CustomStackFullWidth>
        ))}
    </CustomStackFullWidth>
  );
};

ModuleWiseNav.propTypes = {};

export default React.memo(ModuleWiseNav);
