import React, { useEffect, useRef, useState } from "react";
import {
  alpha,
  Avatar,
  IconButton,
  NoSsr,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "styled-components/CustomStyles.style";
import LogoSide from "../../logo/LogoSide";
import NavLinks from "./NavLinks";
import { t } from "i18next";
import RoomIcon from "@mui/icons-material/Room";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useRouter } from "next/router";
import NavBarIcon from "./NavBarIcon";
import { useDispatch, useSelector } from "react-redux";
import AccountPopover from "./account-popover";
import CardView from "../../added-cart-view";
import CustomContainer from "../../container";
import { getCartListModuleWise } from "helper-functions/getCartListModuleWise";
import ModuleWiseNav from "./ModuleWiseNav";
import WishListCardView from "../../wishlist";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useGetAllCartList from "../../../api-manage/hooks/react-query/add-cart/useGetAllCartList";
import { setCartList } from "redux/slices/cart";
import { clearOfflinePaymentInfo } from "redux/slices/offlinePaymentData";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { getModule } from "helper-functions/getLanguage";
import { handleProductValueWithOutDiscount } from "utils/CustomFunctions";
import useGetGuest from "../../../api-manage/hooks/react-query/guest/useGetGuest";
import ThemeSwitches from "../top-navbar/ThemeSwitches";
import CallToAdmin from "../../CallToAdmin";
import { SignInButton } from "components/header/NavBar.style";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import dynamic from "next/dynamic";
import useGetBookingList from "api-manage/hooks/react-query/useGetBookingList";
import { getCurrentModuleType } from "helper-functions/getCurrentModuleType";
import Box from "@mui/material/Box";
import cookie from "js-cookie";
import CustomModal from "components/modal";
import ForgotPassword from "components/auth/ForgotPassword/ForgotPassword";
import { setOpenForgotPasswordModal } from "redux/slices/utils";
import AddressReselect from "../top-navbar/address-reselect/AddressReselect";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import ManageSearch from "./ManageSearch";
import Divider from "@mui/material/Divider";
import CategoryNavigation from "./CategoryNavigation";
import Logo from "./assets/logo.svg";
import { getTatFromLocation } from "api-manage/hooks/react-query/expected-tat/useGetTatForHome";

const AuthModal = dynamic(() => import("components/auth/AuthModal"));

const Cart = ({ isLoading }) => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const { cartList } = useSelector((state) => state.cart);
  const handleIconClick = () => {
    setSideDrawerOpen(true);
  };

  return (
    <>
      <NavBarIcon
        icon={
          <ShoppingCartOutlinedIcon
            sx={{ color: "#ff6159", fontSize: "24px" }}
          />
        }
        label={t("Cart")}
        user="false"
        handleClick={handleIconClick}
        badgeCount={
          getCartListModuleWise(cartList)?.length > 0
            ? getCartListModuleWise(cartList).length
            : null // or use `0` if you want the badge to show as "0"
        }
      />
      {!!sideDrawerOpen && (
        <CardView
          isLoading={isLoading}
          sideDrawerOpen={sideDrawerOpen}
          setSideDrawerOpen={setSideDrawerOpen}
          cartList={cartList}
        />
      )}
    </>
  );
};

const WishListSideBar = ({ totalWishList }) => {
  const [wishListSideDrawerOpen, setWishListSideDrawerOpen] = useState(false);
  const handleIconClick = () => {
    setWishListSideDrawerOpen(true);
  };
  return (
    <>
      <NavBarIcon
        icon={
          <FavoriteBorderIcon sx={{ color: "#FF6159", fontSize: "24px" }} />
        }
        label={t("WishList")}
        user="false"
        handleClick={handleIconClick}
        badgeCount={totalWishList > 0 ? totalWishList : null}
      />

      {!!wishListSideDrawerOpen && (
        <WishListCardView
          sideDrawerOpen={wishListSideDrawerOpen}
          setSideDrawerOpen={setWishListSideDrawerOpen}
        />
      )}
    </>
  );
};

export const getSelectedVariations = (variations) => {
  let selectedItem = [];
  if (variations?.length > 0) {
    variations?.forEach((item, index) => {
      item?.values?.forEach((value, optionIndex) => {
        if (value?.isSelected) {
          const itemObj = {
            choiceIndex: index,
            isSelected: value?.isSelected,
            label: value?.label,
            optionIndex: optionIndex,
            optionPrice: value?.optionPrice,
            // type:item?.
          };
          selectedItem.push(itemObj);
        }
      });
    });
  }
  return selectedItem;
};

const getOtherModuleVariation = (itemVariations, selectedVariation) => {
  let selectedItem = [];
  itemVariations?.forEach((item) => {
    selectedVariation?.forEach((sVari) => {
      if (sVari?.type === item?.type) {
        selectedItem.push(item);
      }
    });
  });

  return selectedItem;
};

const SecondNavBar = ({ configData }) => {
  const theme = useTheme();
  const [tatData, setTatData] = useState(null);
  const [currentLocation, setCurrentLocation] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartList } = useSelector((state) => state.cart);
  const { selectedModule } = useSelector((state) => state.utilsData);
  const { offlineInfoStep } = useSelector((state) => state.offlinePayment);
  const { countryCode, language } = useSelector((state) => state.configData);
  const isSmall = useMediaQuery("(max-width:1180px)");
  const { profileInfo } = useSelector((state) => state.profileInfo);
  const [openPopover, setOpenPopover] = useState(false);
  const [moduleType, SetModuleType] = useState("");
  const { wishLists } = useSelector((state) => state.wishList);
  const [toggled, setToggled] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const anchorRef = useRef(null);
  const [modalFor, setModalFor] = useState("sign-in");
  const { openForgotPasswordModal } = useSelector((state) => state.utilsData);
  const getLatLngFromAddress = async (address) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      console.log("address_lat_lng", location.lat, location.lng);
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("Geocoding failed: " + data.status);
    }
  };

  const fetchTatWithGeocode = async () => {
    try {
      // Step 1: Get the destination address from localStorage
      const destinationAddress = localStorage.getItem("location");

      if (!destinationAddress) {
        console.warn("No destination address found in localStorage.");
        return;
      }

      // Step 2: Convert destination address to coordinates
      const { lat: destLat, lng: destLng } = await getLatLngFromAddress(
        destinationAddress
      );

      // Step 3: Use hardcoded or actual origin coordinates
      const originLat = "28.396377";
      const originLng = "77.070912";

      // Step 4: Call the TAT function
      const result = await getTatFromLocation({
        originLat,
        originLng,
        destLat,
        destLng,
      });

      console.log("Delivery TAT:Data", result);
      setTatData(result);
    } catch (error) {
      console.error("TAT fetch failed:Data", error);
    }
  };
  useEffect(() => {
    fetchTatWithGeocode();
  }, [currentLocation]);
  let token = undefined;
  let location = undefined;
  let zoneId = undefined;
  let guestId = undefined;
  const currentModuleType = getCurrentModuleType();
  const [openDrawer, setOpenDrawer] = useState(false);
 // const [currentLocation, setCurrentLocation] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const suggestionBoxRef = useRef(null);

  // Close suggestion box on outside click

  const [currentTab, setCurrentTab] = useState(0);
  const zoneid =
    typeof window !== "undefined" ? localStorage.getItem("zoneid") : undefined;

  let totalWishList = undefined;
  if (currentModuleType === "rental") {
    totalWishList = wishLists?.vehicles?.length + wishLists?.providers?.length;
  } else {
    totalWishList = wishLists?.item?.length + wishLists?.store?.length;
  }

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  if (typeof window !== "undefined") {
    guestId = localStorage.getItem("guest_id");
  }

  const {
    data: guestData,
    refetch: guestRefetch,
    isLoading: guestIsLoading,
  } = useGetGuest();

  useEffect(() => {
    const fetchGuestId = async () => {
      try {
        // Check if there is no guest ID in local storage
        if (!guestId) {
          // Trigger API call to get guest ID
          await guestRefetch();
        }
      } catch (error) {
        // Handle error (e.g., log it or show a notification)
        console.error("Error fetching guest ID:", error);
      }
    };

    // Call the function to fetch guest ID
    fetchGuestId();
  }, [guestId, guestRefetch]);

  useEffect(() => {
    // Update guestId when guestData is available
    if (guestData?.guest_id) {
      localStorage.setItem("guest_id", guestData.guest_id);
      guestId = guestData.guest_id;
    }
  }, [guestData]);

  const {
    data,
    refetch: cartListRefetch,
    isLoading,
  } = useGetAllCartList(guestId);

  const {
    data: bookingLists,
    isLoading: bookingListsIsLoading,
    refetch: bookingRefetch,
  } = useGetBookingList(guestId);

  useEffect(() => {
    if (moduleType) {
      if (moduleType === "rental") {
        bookingRefetch();
      } else {
        cartListRefetch();
      }
    }
  }, [moduleType]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        suggestionBoxRef.current &&
        !suggestionBoxRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    }
    if (showSuggestions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSuggestions]);
  const setItemIntoCart = () => {
    return data?.map((item) => ({
      ...item?.item,
      cartItemId: item?.id,
      totalPrice:
        handleProductValueWithOutDiscount({
          ...item?.item,
          selectedOption:
            getModule()?.module_type !== "food"
              ? getOtherModuleVariation(item?.item?.variations, item?.variation)
              : [],
        }) * item?.quantity,
      selectedAddons: item?.item?.addons,
      quantity: item?.quantity,
      food_variations: item?.item?.food_variations,
      itemBasePrice: item?.item?.price,
      selectedOption:
        getModule()?.module_type !== "food"
          ? getOtherModuleVariation(item?.item?.variations, item?.variation)
          : getSelectedVariations(item?.item?.food_variations),
    }));
  };

  useEffect(() => {
    if (moduleType === "rental") {
      dispatch(setCartList(bookingLists));
      if (bookingLists?.carts?.length > 0) {
        cookie.set("cart-list", bookingLists?.carts?.length);
      }
    } else {
      dispatch(setCartList(setItemIntoCart()));
    }
  }, [data, moduleType, bookingLists, location]);

  useEffect(() => {
    if (offlineInfoStep !== 0) {
      if (router.pathname !== "/checkout") {
        dispatch(clearOfflinePaymentInfo());
      }
    }
  }, []);

  useEffect(() => {
    SetModuleType(selectedModule?.module_type);
  }, [selectedModule]);

  if (typeof window !== "undefined") {
    location = localStorage.getItem("location");
    token = localStorage.getItem("token");
    zoneId = JSON.parse(localStorage.getItem("zoneid"));
  }

  // Listen to localStorage changes for location
  useEffect(() => {
    const handleStorageChange = () => {
      const newLocation = localStorage.getItem("location");
      if (newLocation && newLocation !== currentLocation) {
        setCurrentLocation(newLocation);
      }
    };

    // Set initial location
    if (typeof window !== "undefined") {
      const initialLocation = localStorage.getItem("location");
      if (initialLocation) {
        setCurrentLocation(initialLocation);
      }
    }

    // Listen for storage events
    window.addEventListener("storage", handleStorageChange);

    // Check for changes periodically
    const interval = setInterval(() => {
      const newLocation = localStorage.getItem("location");
      if (newLocation && newLocation !== currentLocation) {
        setCurrentLocation(newLocation);
      }
    }, 500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [currentLocation]);

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };
  const handleWishlistClick = (pathName) => {
    router.push({
      pathname: "/profile",
      query: {
        page: pathName,
      },
    });
  };

  // const handleTrackOrder = () => {
  //   router.push({
  //     pathname: "/track-order",
  //   });
  // };
  const handleClose = () => {
    setModalFor("sign-in");
    setOpenSignIn(false);
  };
  const getMobileScreenComponents = (Tat, isLoading) => (
    <ModuleWiseNav
      router={router}
      configData={configData}
      token={token}
      setToggled={setToggled}
      location={location}
      isLoading={isLoading}
      deliveryTat={Tat}
      setOpenSignIn={setOpenSignIn}
      setModalFor={setModalFor}
    />
  );
  const getDesktopScreenComponents = () => {
    const handleSearchSubmit = () => {
      if (searchValue.trim() !== "") {
        router.push({
          pathname: "/home",
          query: { search: searchValue, data_type: "searched" },
        });
        setSearchValue(""); // Clear input after search
        setShowSuggestions(false);
        if (inputRef.current) inputRef.current.blur();
      }
    };

    const handleInputChange = (e) => {
      setSearchValue(e.target.value);
      setShowSuggestions(e.target.value.trim() !== "");
    };

    return (
      <Box sx={{ width: "100%", bgcolor: "#fff", px: 1, py: 1 }}>
        {/* Grid layout for perfect alignment */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            alignItems: "center",
            width: "100%",
            gap: 1.5,
            py: 1,
          }}
        >
          {/* Left: Logo + Divider + Location */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ minWidth: 0 }}
          >
            <Box
              component="img"
              src={Logo.src}
              alt="logo"
              sx={{
                objectFit: "contain",
                width: "25%",
                py: 1,
                cursor: "pointer",
              }}
              onClick={() => router.push("/")}
            />

            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 1, borderColor: "#E0E0E0", alignSelf: "stretch" }}
            />
            {location && (
              // <Stack direction="row" alignItems="center" spacing={0.5}>
              //   {/* <Stack direction="row" alignItems="center" spacing={0.5}> */}
              //   <RoomIcon
              //     sx={{
              //       fontSize: { xs: "16px", sm: "20px" },
              //       color: "#1E2939",
              //     }}
              //     color="primary"
              //   />
              //   {/* <Typography
              //       variant="caption"
              //       sx={{ color: "#888", fontWeight: 500, lineHeight: 1 }}
              //     >
              //       Location:
              //     </Typography> */}
              //   {/* </Stack> */}
              //   <AddressReselect
              //     location={currentLocation || location}
              //     setOpenDrawer={setOpenDrawer}
              //   />
              // </Stack>
              <Stack direction="column" alignItems="flex-start" spacing={0.5}>
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
                  <Typography
                    color="#000000"
                    fontWeight={500}
                    fontSize={14}
                    pl={"5px"}
                  >
                    Delivery in {tatData?.duration}
                  </Typography>
                )}
                <Stack direction="row" alignItems="flex-start" spacing={0.5}>
                  {/* <Stack direction="row" alignItems="center" spacing={0.5}> */}
                  <RoomIcon
                    sx={{
                      fontSize: { xs: "16px", sm: "20px" },
                      color: "#1E2939",
                    }}
                    color="primary"
                  />
                  {/* </Stack> */}
                  <AddressReselect
                    location={currentLocation || location}
                    setOpenDrawer={setOpenDrawer}
                  />
                </Stack>
              </Stack>
            )}
          </Stack>
          {/* Center: Search bar, perfectly centered */}
          <Box
            sx={{
              justifySelf: "center",
              width: "100%",
              maxWidth: 600,
              minWidth: 400,
              position: "relative",
              height: 50,
              alignItems: "center",
            }}
          >
            <ManageSearch
              zoneid={zoneid}
              token={token}
              maxwidth="false"
              fullWidth
              searchQuery={
                router.query?.data_type === "searched"
                  ? router.query.search
                  : ""
              }
              name={router.query.name}
              query={router.query}
              currentTab={currentTab}
            />
          </Box>
          {/* Right: Icons + User/Profile/Login */}
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              justifySelf: "end",
              gap: "12px", // Consistent spacing between icons
              flexWrap: "nowrap", // Prevent wrapping to new lines
            }}
          >
            {/* Wishlist */}
            {token && zoneId && moduleType !== "parcel" && (
              <WishListSideBar totalWishList={totalWishList} />
            )}
            {/* Cart */}
            <Cart isLoading={false} />
            {/* User/Profile */}
            {token ? (
              <IconButton
                ref={anchorRef}
                onClick={() => handleOpenPopover()}
                sx={{
                  padding: "8px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    backgroundColor: "rgba(248, 245, 245, 0.1)",
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
            ) : (
              <SignInButton
                onClick={() => setOpenSignIn(true)}
                variant="contained"
                sx={{
                  minWidth: "auto",
                  px: 2,
                  py: 1,
                  borderRadius: "32px",
                  backgroundColor: "#FF7A59",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#FF8A65",
                  },
                }}
              >
                <CustomStackFullWidth
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <LockOutlinedIcon
                    fontSize="small"
                    style={{ color: "#fff" }}
                  />
                  <Typography
                    color="#fff"
                    sx={{ fontSize: "14px", fontWeight: 500 }}
                  >
                    {t("Sign In")}
                  </Typography>
                </CustomStackFullWidth>
              </SignInButton>
            )}
          </Stack>
        </Box>
        {/* Dynamic Category Navigation */}
        <CategoryNavigation />
      </Box>
    );
  };

  return (
    <CustomBoxFullWidth
      sx={{
        backgroundColor: theme.palette.neutral[100],
        boxShadow: (theme) =>
          `0px 5px 20px -3px ${alpha(theme.palette.primary.main, 0.1)}`,
        zIndex: 1251,
      }}
    >
      <NoSsr>
        <CustomContainer>
          <Toolbar disableGutters={true}>
            {isSmall
              ? getMobileScreenComponents(tatData?.duration, isLoading)
              : getDesktopScreenComponents()}
            <AccountPopover
              anchorEl={anchorRef.current}
              onClose={() => setOpenPopover(false)}
              open={openPopover}
              cartListRefetch={cartListRefetch}
            />
          </Toolbar>
        </CustomContainer>
        <AuthModal
          modalFor={modalFor}
          setModalFor={setModalFor}
          open={openSignIn}
          handleClose={handleClose}
        />
        {openForgotPasswordModal && (
          <CustomModal
            handleClose={() => dispatch(setOpenForgotPasswordModal(false))}
            openModal={openForgotPasswordModal}
          >
            <ForgotPassword configData={configData} />
          </CustomModal>
        )}
      </NoSsr>
    </CustomBoxFullWidth>
  );
};

export default SecondNavBar;
