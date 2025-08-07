import DeleteIcon from "@mui/icons-material/Delete";
import {
  alpha,
  Card,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/system";
import { getAmountWithSign } from "helper-functions/CardHelpers";
import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  setCart,
  setDecrementToCartItem,
  setIncrementToCartItem,
  setRemoveItemFromCart,
} from "redux/slices/cart";
import { CustomButtonPrimary } from "styled-components/CustomButtons.style";
import {
  CustomBoxFullWidth,
  CustomSpan,
  ShopNowButton,
  CustomStackFullWidth,
} from "styled-components/CustomStyles.style";
import { textWithEllipsis } from "styled-components/TextWithEllipsis";
import CustomImageContainer from "../CustomImageContainer";
import {
  ACTION,
  initialState,
  reducer,
} from "../product-details/product-details-section/states";
import CustomBadge from "./CustomBadge";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { onErrorResponse } from "api-manage/api-error-response/ErrorResponses";
import { useAddToWishlist } from "api-manage/hooks/react-query/wish-list/useAddWishList";
import { useWishListDelete } from "api-manage/hooks/react-query/wish-list/useWishListDelete";
import { getCartListModuleWise } from "helper-functions/getCartListModuleWise";
import { getCurrentModuleType } from "helper-functions/getCurrentModuleType";
import { getLanguage } from "helper-functions/getLanguage";
import { getModuleId } from "helper-functions/getModuleId";
import { getGuestId } from "helper-functions/getToken";
import { ModuleTypes } from "helper-functions/moduleTypes";
import {
  not_logged_in_message,
  out_of_limits,
  out_of_stock,
} from "utils/toasterMessages";
import useAddCartItem from "../../api-manage/hooks/react-query/add-cart/useAddCartItem";
import useCartItemUpdate from "../../api-manage/hooks/react-query/add-cart/useCartItemUpdate";
import useDeleteCartItem from "../../api-manage/hooks/react-query/add-cart/useDeleteCartItem";
import { addWishList, removeWishListItem } from "../../redux/slices/wishList";
import AmountWithDiscountedAmount from "../AmountWithDiscountedAmount";
import CustomDialogConfirm from "../custom-dialog/confirm/CustomDialogConfirm";
import CustomMultipleRatings from "../CustomMultipleRatings";
import GetLocationAlert from "../GetLocationAlert";
import { HeartWrapper } from "../home/stores-with-filter/cards-grid/StoresInfoCard";
import CustomLinearProgressbar from "../linear-progressbar";
import CustomModal from "../modal";
import CartClearModal from "../product-details/product-details-section/CartClearModal";
import {
  getItemDataForAddToCart,
  getPriceAfterQuantityChange,
} from "../product-details/product-details-section/helperFunction";
import Body2 from "../typographies/Body2";
import H3 from "../typographies/H3";
import AddWithIncrementDecrement from "./AddWithIncrementDecrement";
import { CustomOverLay } from "./Card.style";
import ProductsUnavailable from "./ProductsUnavailable";
import QuickView, { PrimaryToolTip } from "./QuickView";
import SpecialCard, { FoodHalalHaram, FoodVegNonVegFlag } from "./SpecialCard";
import NextImage from "components/NextImage";
import CartProductPriceDisplay from "./CartProductPriceDisplay";

export const CardWrapper = styled(Card)(
  ({
    theme,
    cardheight,
    cardWidth,
    horizontalcard,
    wishlistcard,
    nomargin,
    cardType,
    cardFor,
  }) => ({
    cursor: "pointer",
    backgroundColor: theme.palette.background.custom6,
    padding: horizontalcard !== "true" ? "10px" : "0px",
    borderRadius: "8px",
    boxShadow: "none",
    overflow: "hidden",

    // Fixed height/width with fallbacks
    // height: cardheight || "350px",
    width: cardWidth || (cardFor === "list-view" ? "100%" : "220px"),

    // Margin Logic
    margin:
      wishlistcard === "true" || nomargin === "true"
        ? "0rem"
        : cardType === "vertical-type"
        ? "0rem"
        : ".7rem",

    // Border for FOOD module
    border:
      getCurrentModuleType() === ModuleTypes.FOOD
        ? `1px solid ${alpha(theme.palette.moduleTheme.food, 0.1)}`
        : "none",

    // Responsive overrides
    [theme.breakpoints.down("sm")]: {
      // height: cardheight || "320px",
      width:
        horizontalcard === "true" ? cardWidth || "100%" : cardWidth || "170px",
    },

    [theme.breakpoints.up("sm")]: {
      // height: cardheight || "350px",
    },
    [theme.breakpoints.up("md")]: {
      // height: cardheight || "350px",
    },
  })
);

// const CustomCardMedia = styled(CardMedia)(({ theme, loveItem }) => ({
//   position: "relative",
//   padding: loveItem === "true" ? "2px" : "0rem",
//   // margin: "2px",
//   //minHeight: "200px",
//   width: "100%",
//   aspectRatio: "1 / 1", // force square shape
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   overflow: "hidden",
//   borderRadius: "20px",
//   // backgroundColor: "red",

//   ".MuiBox-root": {
//     overflow: "hidden",
//     borderRadius: "20px",
//   },
// }));
const CustomCardMedia = styled(CardMedia)(
  ({ theme, horizontalcard, loveItem, cardFor }) => ({
    position: "relative",
    padding: loveItem === "true" ? "2px" : "0rem",
    // margin: "2px",
    // minHeight: "200px",\
    width:
      cardFor === "list-view"
        ? "200px"
        : horizontalcard === "true"
        ? "250px"
        : "100%",
    aspectRatio: "1 / 1", // force square shape
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: "20px",
    // backgroundColor: "red",

    ".MuiBox-root": {
      overflow: "hidden",
      borderRadius: "20px",
    },
  })
);
export const CustomCardButton = styled(CustomButtonPrimary)(
  ({ theme, disabled }) => ({
    background: disabled
      ? alpha(theme.palette.secondary.light, 0.3)
      : theme.palette.secondary.light,
  })
);

const ProductCard = (props) => {
  const {
    loveItem,
    item,
    dealTitle,
    cardheight,
    horizontalcard,
    changed_bg,
    wishlistcard,
    deleteWishlistItem,
    cardFor,
    noMargin,
    cardType,
    specialCard,
    cardWidth,
    sold,
    stock,
    isFrom,
    noRecommended,
    isCartContext,
  } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [openModal, setOpenModal] = React.useState(false);
  const [openLocationAlert, setOpenLocationAlert] = useState(false);
  const { configData } = useSelector((state) => state.configData);
  const imageBaseUrl = configData?.base_urls?.item_image_url;
  const router = useRouter();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const reduxDispatch = useDispatch();
  const { cartList: aliasCartList } = useSelector((state) => state.cart);
  const cartList = getCartListModuleWise(aliasCartList);
  const classes = textWithEllipsis();
  const { t } = useTranslation();
  const p_off = t("%");
  const { wishLists } = useSelector((state) => state.wishList);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { mutate: addFavoriteMutation } = useAddToWishlist();
  const { mutate } = useWishListDelete();
  const [isProductExist, setIsProductExist] = useState(false);
  const [count, setCount] = useState(0);
  const { mutate: addToMutate, isLoading } = useAddCartItem();
  const { mutate: updateMutate, isLoading: updateLoading } =
    useCartItemUpdate();
  const { mutate: cartItemRemoveMutate } = useDeleteCartItem();
  useEffect(() => {
    const isInCart = getItemFromCartlist();
    if (isInCart) {
      setIsProductExist(true);
      setCount(isInCart?.quantity);
    } else {
      setIsProductExist(false);
    }
  }, [aliasCartList]);

  const getItemFromCartlist = () => {
    const cartList = getCartListModuleWise(aliasCartList);
    return cartList?.find((things) => things.id === item?.id);
  };
  useEffect(() => {
    wishlistItemExistHandler();
  }, [wishLists]);
  const wishlistItemExistHandler = () => {
    if (wishLists?.item?.find((wishItem) => wishItem.id === item?.id)) {
      setIsWishlisted(true);
    } else {
      setIsWishlisted(false);
    }
  };

  useEffect(() => {}, [state.clearCartModal]);
  const handleClearCartModalOpen = () =>
    dispatch({ type: ACTION.setClearCartModal, payload: true });
  const handleCloseForClearCart = (value) => {
    if (value === "add-item") {
      const itemObject = {
        guest_id: getGuestId(),
        model: state.modalData[0]?.available_date_starts
          ? "ItemCampaign"
          : "Item",
        add_on_ids: [],
        add_on_qtys: [],
        item_id: state.modalData[0]?.id,
        price: state?.modalData[0]?.price,
        quantity: state?.modalData[0]?.quantity,
        variation: [],
      };
      addToMutate(itemObject, {
        onSuccess: handleSuccess,
        onError: onErrorResponse,
      });
    } else {
      dispatch({ type: ACTION.setClearCartModal, payload: false });
    }
  };
  const handleBadge = () => {
    if (Number.parseInt(item?.discount) > 0) {
      if (item?.discount_type === "percent") {
        return <CustomBadge top={10} text={`${item?.discount}${p_off}`} />;
      } else {
        return (
          <CustomBadge
            top={10}
            text={`${getAmountWithSign(
              item?.discount,
              item?.discount % 1 ? true : false
            )}`}
          />
        );
      }
    }
  };
  const handleClick = () => {
    if (item?.module_type === "ecommerce") {
      router.push({
        pathname: "/product/[id]",
        query: {
          id: `${item?.slug ? item?.slug : item?.id}`,
          module_id: `${getModuleId()}`,
        },
      });
    } else {
      dispatch({ type: ACTION.setOpenModal, payload: true });
    }
  };

  useEffect(() => {
    if (item) {
      dispatch({
        type: ACTION.setModalData,
        payload: {
          ...item,
          quantity: 1,
          price: item?.price,
          totalPrice: item?.price,
        },
      });
    }
  }, [item]);
  const isInCart = cartList?.find((things) => things.id === item?.id);
  const handleSuccess = (res) => {
    if (res) {
      let product = {};
      res?.forEach((item) => {
        product = {
          ...item?.item,
          cartItemId: item?.id,
          quantity: item?.quantity,
          totalPrice: item?.price,
          selectedOption: [],
        };
      });
      reduxDispatch(setCart(product));
      toast.success(t("Item added to cart"));
      dispatch({ type: ACTION.setClearCartModal, payload: false });
    }
  };

  const addToCartHandler = () => {
    if (cartList.length > 0) {
      const isStoreExist = cartList.find(
        (item) => item?.store_id === state?.modalData[0]?.store_id
      );

      if (isStoreExist) {
        if (!isInCart) {
          const itemObject = {
            guest_id: getGuestId(),
            model: state.modalData[0]?.available_date_starts
              ? "ItemCampaign"
              : "Item",
            add_on_ids: [],
            add_on_qtys: [],
            item_id: state.modalData[0]?.id,
            price: state?.modalData[0]?.price,
            quantity: state?.modalData[0]?.quantity,
            variation: [],
          };
          addToMutate(itemObject, {
            onSuccess: handleSuccess,
            onError: onErrorResponse,
          });
        }
      } else {
        if (cartList.length !== 0) {
          handleClearCartModalOpen();
        }
      }
    } else {
      if (!isInCart) {
        const itemObject = {
          guest_id: getGuestId(),
          model: state.modalData[0]?.available_date_starts
            ? "ItemCampaign"
            : "Item",
          add_on_ids: [],
          add_on_qtys: [],
          item_id: state.modalData[0]?.id,
          price: state?.modalData[0]?.price,
          quantity: state?.modalData[0]?.quantity,
          variation: [],
        };
        addToMutate(itemObject, {
          onSuccess: handleSuccess,
          onError: onErrorResponse,
        });
      }
    }
  };

  const addToCart = (e) => {
    if (item?.module_type === "ecommerce") {
      if (item?.variations.length > 0) {
        router.push({
          pathname: "/product/[id]",
          query: {
            id: `${item?.slug ? item?.slug : item?.id}`,
            module_id: `${getModuleId()}`,
          },
        });
      } else {
        e.stopPropagation();
        addToCartHandler();
      }
    } else {
      if (item?.module_type === "food") {
        if (item?.food_variations?.length > 0) {
          dispatch({ type: ACTION.setOpenModal, payload: true });
        } else {
          e.stopPropagation();
          addToCartHandler();
        }
      } else if (item?.variations?.length > 0) {
        dispatch({ type: ACTION.setOpenModal, payload: true });
      } else {
        e.stopPropagation();
        addToCartHandler();
      }
    }
  };

  const quickViewHandleClick = () => {};
  const cartUpdateHandleSuccess = (res) => {
    if (res) {
      res?.forEach((item) => {
        if (isInCart?.cartItemId === item?.id) {
          const product = {
            ...item?.item,
            cartItemId: item?.id,
            totalPrice: item?.price,
            quantity: item?.quantity,
            food_variations: item?.item?.food_variations,
            selectedAddons: item?.item?.addons,
            itemBasePrice: item?.item?.price,
            selectedOption: item?.variation,
          };

          reduxDispatch(setIncrementToCartItem(product)); // Dispatch the single product
        }
      });
    }
  };
  const cartUpdateHandleSuccessDecrement = (res) => {
    if (res) {
      res?.forEach((item) => {
        // If quantity becomes 0, remove the item from cart
        if (item?.quantity === 0) {
          reduxDispatch(setRemoveItemFromCart(isInCart));
          toast.success(t("Removed from cart."));
        } else {
          const product = {
            ...item?.item,
            cartItemId: item?.id,
            totalPrice: item?.price,
            quantity: item?.quantity,
            food_variations: item?.item?.food_variations,
            selectedAddons: item?.item?.addons,
            itemBasePrice: item?.item?.price,
            selectedOption: item?.variation,
          };
          reduxDispatch(setDecrementToCartItem(product));
        }
      });
    }
  };
  const handleIncrement = () => {
    const isExisted = getItemFromCartlist();
    const updateQuantity = isInCart?.quantity + 1;
    const itemObject = getItemDataForAddToCart(
      isInCart,
      updateQuantity,
      getPriceAfterQuantityChange(isInCart, updateQuantity),
      getGuestId()
    );
    if (isExisted) {
      if (getCurrentModuleType() === "food") {
        if (item?.maximum_cart_quantity) {
          if (item?.maximum_cart_quantity <= isExisted?.quantity) {
            toast.error(t(out_of_limits));
          } else {
            updateMutate(itemObject, {
              onSuccess: cartUpdateHandleSuccess,
              onError: onErrorResponse,
            });
          }
        } else {
          updateMutate(itemObject, {
            onSuccess: cartUpdateHandleSuccess,
            onError: onErrorResponse,
          });
        }
      } else {
        if (isExisted?.quantity + 1 <= item?.stock) {
          if (item?.maximum_cart_quantity) {
            if (item?.maximum_cart_quantity <= isExisted?.quantity) {
              toast.error(t(out_of_limits));
            } else {
              updateMutate(itemObject, {
                onSuccess: cartUpdateHandleSuccess,
                onError: onErrorResponse,
              });
            }
          } else {
            updateMutate(itemObject, {
              onSuccess: cartUpdateHandleSuccess,
              onError: onErrorResponse,
            });
            reduxDispatch(setIncrementToCartItem(isInCart));
          }
        } else {
          toast.error(t(out_of_stock));
        }
      }
    }
  };
  const handleClose = () => {
    dispatch({ type: ACTION.setOpenModal, payload: false });
  };

  const handleSuccessRemoveItem = () => {
    reduxDispatch(setRemoveItemFromCart(isInCart));
    toast.success(t("Removed from cart."));
  };
  const handleDecrement = () => {
    const updateQuantity = isInCart?.quantity - 1;

    const isExisted = getItemFromCartlist();
    if (isExisted?.quantity === 1 || updateQuantity === 0) {
      const cartIdAndGuestId = {
        cart_id: isInCart?.cartItemId,
        guestId: getGuestId(),
      };
      cartItemRemoveMutate(cartIdAndGuestId, {
        onSuccess: handleSuccessRemoveItem(),
        onError: onErrorResponse,
      });
    } else {
      const itemObject = getItemDataForAddToCart(
        isInCart,
        updateQuantity,
        getPriceAfterQuantityChange(isInCart, updateQuantity),
        getGuestId()
      );
      updateMutate(itemObject, {
        onSuccess: cartUpdateHandleSuccessDecrement,
        onError: onErrorResponse,
      });
    }
  };
  const lanDirection = getLanguage() ? getLanguage() : "ltr";
  const popularCardUi = () => {
    return (
      <CustomStackFullWidth
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
          position: "relative",
          padding: 0,
          boxShadow: "none",
          height: "100%",
          display: "flex",
          flexDirection: "column",

          paddingLeft: horizontalcard === "true" ? "10px" : "0px",
        }}
      >
        {/* Heart icon */}
        <Box sx={{ position: "absolute", top: 10, right: 10, zIndex: 10 }} />

        {/* Product Name with fixed height */}
        <Box
          sx={{
            minHeight: "42px", // Ensures room for 2 lines even if 1 exists
            width: "100%",
            padding: "0 5px",
          }}
        >
          <PrimaryToolTip text={item?.name} placement="bottom" arrow="false">
            <Typography
              variant={horizontalcard === "true" ? "subtitle2" : "h6"}
              component="h3"
              className="name"
              sx={{
                lineHeight: "20px",
                textAlign: lanDirection === "rtl" ? "end" : "start",
                color: (theme) => theme.palette.text.custom,
                fontSize: { xs: "13px", sm: "inherit" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                wordBreak: "break-word",
              }}
            >
              {item?.name}
            </Typography>
          </PrimaryToolTip>
        </Box>

        {/* Price Display */}
        <Box mt={1} mb={1}>
          <CartProductPriceDisplay item={item} />
        </Box>

        {/* Push this to bottom */}
        <Box sx={{ mt: "auto", width: "100%" }}>
          <CustomStackFullWidth
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            spacing={0}
            mb="3px"
            paddingRight="0px"
          >
            <Typography
              mt="4px"
              color="text.secondary"
              variant={isSmall ? "body2" : "body1"}
            ></Typography>
            {isFrom === "new-arival" ||
            isFrom === "plp-list-view" ||
            isFrom === "top-rated" ||
            isFrom === dealTitle ? (
              (item?.stock ?? 0) > 0 ? (
                <AddWithIncrementDecrement
                  onHover={state.isTransformed}
                  addToCartHandler={addToCart}
                  isProductExist={isProductExist}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                  count={count}
                  isLoading={isLoading}
                  updateLoading={updateLoading}
                />
              ) : (
                <ShopNowButton
                  onClick={() => {
                    toast.error(t("Out of stock"));
                  }}
                  sx={{
                    width: "100%",
                    height: "38px",
                    minHeight: "38px",
                    mt: { xs: 0, sm: "0", md: "5%" },

                    // mt: "20px",
                    cursor: "default",
                    backgroundColor: "#E5E7EB",
                    "&:hover": {
                      backgroundColor: "#E5E7EB",
                    },
                  }}
                >
                  <Typography color="white">Out Of Stock</Typography>
                </ShopNowButton>
              )
            ) : (
              <AddWithIncrementDecrement
                onHover={state.isTransformed}
                addToCartHandler={addToCart}
                isProductExist={isProductExist}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                count={count}
                isLoading={isLoading}
                updateLoading={updateLoading}
              />
            )}
          </CustomStackFullWidth>
        </Box>
      </CustomStackFullWidth>
    );
  };

  // const listViewCardUi = () => {
  //   return (
  //     <CustomStackFullWidth
  //       justifyContent="space-between"
  //       alignItems="flex-start"
  //       spacing={1}
  //       p="1rem"
  //     >
  //       {isWishlisted && (
  //         <Box
  //           sx={{
  //             color: "primary.main",
  //             position: "absolute",
  //             top: 20,
  //             right: 10,
  //           }}
  //         >
  //           <FavoriteIcon sx={{ fontSize: "15px" }} />
  //         </Box>
  //       )}

  //       <PrimaryToolTip text={item?.name} placement="bottom" arrow="false">
  //         <H3 text={item?.name} component="h3" />
  //       </PrimaryToolTip>
  //       <CustomBoxFullWidth>
  //         {item?.module_type === "pharmacy" ? (
  //           <Typography
  //             className={classes.singleLineEllipsis}
  //             variant="body2"
  //             color="text.secondary"
  //             sx={{ wordBreak: "break-word" }}
  //             component="h4"
  //           >
  //             {item?.generic_name[0]}
  //           </Typography>
  //         ) : (
  //           // <Body2 text={item?.store_name} component="h4" />

  //           <></>
  //         )}
  //       </CustomBoxFullWidth>
  //       {item?.unit_type ? (
  //         <Typography
  //           sx={{
  //             color: (theme) => theme.palette.customColor.textGray,
  //           }}
  //         >
  //           {item?.unit_type}
  //         </Typography>
  //       ) : (
  //         <Typography
  //           sx={{
  //             color: (theme) => theme.palette.customColor.textGray,
  //           }}
  //         >
  //           {t("No unit type")}
  //         </Typography>
  //       )}

  //       <CustomStackFullWidth
  //         direction="row"
  //         alignItems="flex-start"
  //         justifyContent="space-between"
  //         spacing={2}
  //         sx={{ pb: "15px" }}
  //       >
  //         <AmountWithDiscountedAmount item={item} />
  //         <AddWithIncrementDecrement
  //           onHover={state.isTransformed}
  //           addToCartHandler={addToCart}
  //           isProductExist={isProductExist}
  //           handleIncrement={handleIncrement}
  //           handleDecrement={handleDecrement}
  //           count={count}
  //           isLoading={isLoading}
  //           updateLoading={updateLoading}
  //         />
  //       </CustomStackFullWidth>
  //     </CustomStackFullWidth>
  //   );
  // };
  const listViewCardUi = () => {
    return (
      <CustomStackFullWidth
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={1}
        p="1rem"
      >
        {/* {isWishlisted && (
          <Box
            sx={{
              color: "primary.main",
              position: "absolute",
              top: 20,
              right: 10,
            }}
          >
            <FavoriteIcon sx={{ fontSize: "15px" }} />
          </Box>
        )} */}

        {/* <PrimaryToolTip text={item?.name} placement="bottom" arrow="false">
          <H3 text={item?.name} component="h3" />
        </PrimaryToolTip> */}
        <PrimaryToolTip text={item?.name} placement="bottom" arrow="false">
          <Typography
            variant={horizontalcard === "true" ? "subtitle2" : "h6"}
            component="h3"
            className="name"
            sx={{
              lineHeight: "20px",
              textAlign: lanDirection === "rtl" ? "end" : "start",
              color: (theme) => theme.palette.text.custom,
              fontSize: { xs: "13px", sm: "inherit" },
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              wordBreak: "break-word",
            }}
          >
            {item?.name}
          </Typography>
        </PrimaryToolTip>
        <CustomBoxFullWidth>
          {item?.module_type === "pharmacy" ? (
            <Typography
              className={classes.singleLineEllipsis}
              variant="body2"
              color="text.secondary"
              sx={{ wordBreak: "break-word" }}
              component="h4"
            >
              {item?.generic_name[0]}
            </Typography>
          ) : (
            // <Body2 text={item?.store_name} component="h4" />

            <></>
          )}
        </CustomBoxFullWidth>
        {/* {item?.unit_type ? (
          <Typography
            sx={{
              color: (theme) => theme.palette.customColor.textGray,
            }}
          >
            {item?.unit_type}
          </Typography>
        ) : (
          <Typography
            sx={{
              color: (theme) => theme.palette.customColor.textGray,
            }}
          >
            {t("No unit type")}
          </Typography>
        )} */}

        <CustomStackFullWidth
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={2}
          sx={{ pb: "15px" }}
        >
          <AmountWithDiscountedAmount item={item} />
        </CustomStackFullWidth>
        {/* <AddWithIncrementDecrement
          onHover={state.isTransformed}
          addToCartHandler={addToCart}
          isProductExist={isProductExist}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          count={count}
          isLoading={isLoading}
          updateLoading={updateLoading}
        /> */}
        {isFrom === "plp-list-view" ? (
          (item?.stock ?? 0) > 0 ? (
            <AddWithIncrementDecrement
              onHover={state.isTransformed}
              addToCartHandler={addToCart}
              isProductExist={isProductExist}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
              count={count}
              isLoading={isLoading}
              updateLoading={updateLoading}
            />
          ) : (
            <ShopNowButton
              onClick={() => {
                toast.error(t("Out of stock"));
              }}
              sx={{
                width: "100%",
                height: "38px",
                minHeight: "38px",
                mt: { xs: 0, sm: "0", md: "5%" },

                // mt: "20px",
                cursor: "default",
                backgroundColor: "#E5E7EB",
                "&:hover": {
                  backgroundColor: "#E5E7EB",
                },
              }}
            >
              <Typography color="white">Out Of Stock</Typography>
            </ShopNowButton>
          )
        ) : (
          <AddWithIncrementDecrement
            onHover={state.isTransformed}
            addToCartHandler={addToCart}
            isProductExist={isProductExist}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            count={count}
            isLoading={isLoading}
            updateLoading={updateLoading}
          />
        )}
      </CustomStackFullWidth>
    );
  };
  const foodHorizontalCardUi = () => {
    return (
      <CustomStackFullWidth
        justifyContent="center"
        alignItems="flex-start"
        sx={{ position: "relative", padding: "13px 16px 16px 13px" }}
      >
        {isWishlisted && (
          <Box
            sx={{
              color: "primary.main",
              position: "absolute",
              top: 20,
              right: 10,
            }}
          >
            <FavoriteIcon sx={{ fontSize: "15px" }} />
          </Box>
        )}
        {/* <CustomStackFullWidth> */}
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={0.8}
        >
          <PrimaryToolTip text={item?.name} placement="bottom" arrow="false">
            <Typography
              variant={horizontalcard === "true" ? "subtitle2" : "h6"}
              marginBottom="4px"
              sx={{
                color: (theme) => theme.palette.text.custom,
                fontSize: { xs: "13px", sm: "inherit" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                lineHeight: "1.2", // Adjust this value to control line height
                mt: "5px",
              }}
              className="name"
              component="h3"
            >
              {item?.name}
            </Typography>
          </PrimaryToolTip>
          {configData?.toggle_veg_non_veg ? (
            <FoodVegNonVegFlag veg={item?.veg === 0 ? "false" : "true"} />
          ) : null}
        </CustomStackFullWidth>
        <Typography
          color="text.secondary"
          variant={isSmall ? "body2" : "body1"}
          component="h4"
        >
          {item?.store_name}
        </Typography>
        {/* </CustomStackFullWidth> */}
        <CustomStackFullWidth
          direction="row"
          alignItems="flex-start"
          // justifyContent="space-between"
          spacing={13}
          mb="3px"
          mt="10px"
        >
          <AmountWithDiscountedAmount item={item} />
        </CustomStackFullWidth>
        <CustomStackFullWidth
          alignItems="flex-end"
          sx={{ paddingRight: "6px" }}
        >
          <Box>
            <AddWithIncrementDecrement
              onHover={state.isTransformed}
              addToCartHandler={addToCart}
              isProductExist={isProductExist}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
              count={count}
              isLoading={isLoading}
              updateLoading={updateLoading}
            />
          </Box>
        </CustomStackFullWidth>
      </CustomStackFullWidth>
    );
  };

  const verticalCardUi = () => {
    return (
      <CustomStackFullWidth
        justifyContent="center"
        alignItems="center"
        spacing={0.6}
        height="100%"
        p={item?.module_type === "pharmacy" ? "5px 16px 16px 16px" : ".3rem"}
      >
        {item?.module_type === "pharmacy" ? (
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
              width: "100%",
              paddingTop: "3px",
              maxWidth: "200px",
              wordWrap: "break-word",
            }}
            variant="body2"
            color="#93A2AE"
            textAlign="center"
            component="h4"
          >
            {item?.generic_name[0]}
          </Typography>
        ) : (
          <Body2 component="h4" /> // removed the store name
        )}

        <PrimaryToolTip text={item?.name} placement="bottom" arrow="false">
          <CustomStackFullWidth>
            <Typography
              className={classes.singleLineEllipsis}
              fontSize={{ xs: "12px", md: "14px" }}
              fontWeight="500"
              component="h3"
            >
              {item?.name}
            </Typography>
          </CustomStackFullWidth>
        </PrimaryToolTip>
        <CustomStackFullWidth spacing={0.5}>
          {cardType === "vertical-type" ? (
            // <Typography>{item?.unit_type}</Typography>
            <></>
          ) : (
            <CustomMultipleRatings rating={item?.avg_rating} withCount />
          )}

          <Box sx={{ py: 1 }}>
            <AmountWithDiscountedAmount item={item} />
          </Box>

          {isFrom === "plp" ? (
            (item?.stock ?? 0) > 0 ? (
              <AddWithIncrementDecrement
                onHover={state.isTransformed}
                addToCartHandler={addToCart}
                isProductExist={isProductExist}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                count={count}
                isLoading={isLoading}
                updateLoading={updateLoading}
              />
            ) : (
              <ShopNowButton
                onClick={() => {
                  toast.error(t("Out of stock"));
                }}
                sx={{
                  width: "100%",
                  height: "38px",
                  minHeight: "38px",
                  mt: "5%",

                  // mt: "20px",
                  cursor: "default",
                  backgroundColor: "#E5E7EB",
                  "&:hover": {
                    backgroundColor: "#E5E7EB",
                  },
                }}
              >
                <Typography color="white">Out Of Stock</Typography>
              </ShopNowButton>
            )
          ) : (
            <AddWithIncrementDecrement
              onHover={state.isTransformed}
              addToCartHandler={addToCart}
              isProductExist={isProductExist}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
              count={count}
              isLoading={isLoading}
              updateLoading={updateLoading}
            />
          )}
        </CustomStackFullWidth>
      </CustomStackFullWidth>
    );
  };
  const verticalCardFlashUi = () => {
    return (
      <CustomStackFullWidth
        justifyContent="center"
        alignItems="center"
        spacing={1.5}
        // p="1rem"
        p="0 4px"
      >
        <Body2 text={item?.store_name} />
        <PrimaryToolTip text={item?.name} placement="bottom" arrow="false">
          <H3 text={item?.name} component="h3" />
        </PrimaryToolTip>
        <CustomStackFullWidth
          justifyContent="center"
          alignItems="center"
          spacing={0.5}
        >
          {cardType === "vertical-type" ? (
            <Typography>{item?.unit_type}</Typography>
          ) : (
            <CustomMultipleRatings rating={4.5} withCount />
          )}

          {stock === 0 ? (
            <Typography
              variant="h5"
              display="flex"
              alignItems="center"
              flexWrap="wrap"
              //   gap="5px"
              sx={{
                fontSize: { xs: "13px", sm: "18px" },
                color: alpha(theme.palette.error.deepLight, 0.7),
              }}
            >
              {t("Out of Stock")}
            </Typography>
          ) : (
            <AmountWithDiscountedAmount item={item} />
          )}
          <CustomStackFullWidth mt="100px" spacing={1}>
            <CustomLinearProgressbar value={(sold / stock) * 100} height={3} />
            <CustomStackFullWidth
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                fontSize="11px"
                fontWeight="bold"
                lineHeight="16px"
                variant="body2"
              >
                <CustomSpan>{t("Sold")}</CustomSpan> : {sold} {t("items")}
              </Typography>
              <Typography
                fontSize="11px"
                fontWeight="bold"
                lineHeight="16px"
                variant="body2"
              >
                <CustomSpan>{t("Available")}</CustomSpan> : {stock} {t("items")}
              </Typography>
            </CustomStackFullWidth>
          </CustomStackFullWidth>
        </CustomStackFullWidth>
      </CustomStackFullWidth>
    );
  };
  const verticalCardFlashSliderUi = () => {
    return (
      <CustomStackFullWidth
        justifyContent="center"
        alignItems="center"
        spacing={1.5}
        p="1rem"
      >
        <Body2 text={item?.store_name} component="h4" />
        <PrimaryToolTip text={item?.name} placement="bottom" arrow="false">
          <H3 text={item?.name} component="h3" />
        </PrimaryToolTip>
        <CustomStackFullWidth
          justifyContent="center"
          alignItems="center"
          spacing={0.5}
        >
          {cardType === "vertical-type" ? (
            <Typography>{item?.unit_type}</Typography>
          ) : (
            <CustomMultipleRatings rating={4.5} withCount />
          )}
          <AmountWithDiscountedAmount item={item} />
        </CustomStackFullWidth>
      </CustomStackFullWidth>
    );
  };

  const addToWishlistHandler = (e) => {
    e.stopPropagation();
    let token = undefined;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }
    if (token) {
      addFavoriteMutation(item?.id, {
        onSuccess: (response) => {
          if (response) {
            reduxDispatch(addWishList(item));
            setIsWishlisted(true);
            toast.success(response?.message);
          }
        },
        onError: (error) => {
          toast.error(error.response.data.message);
        },
      });
    } else toast.error(t(not_logged_in_message));
  };
  const removeFromWishlistHandler = (e) => {
    e.stopPropagation();
    const onSuccessHandlerForDelete = (res) => {
      reduxDispatch(removeWishListItem(item?.id));
      setIsWishlisted(false);
      toast.success(res.message, {
        id: "wishlist",
      });
    };
    mutate(item?.id, {
      onSuccess: onSuccessHandlerForDelete,
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });
  };

  const handleHoverOnCartIcon = (value) => {
    dispatch({ type: ACTION.setIsTransformed, payload: value });
  };

  // Helper to get the correct image URL
  const getProductImageUrl = () => {
    if (item?.image_full_url && /^https?:\/\//.test(item.image_full_url)) {
      return item.image_full_url;
    }
    if (item?.image && /^https?:\/\//.test(item.image)) {
      return item.image;
    }
    if (item?.image && imageBaseUrl) {
      // Ensure no double slash
      return (
        imageBaseUrl.replace(/\/$/, "") + "/" + item.image.replace(/^\//, "")
      );
    }
    return "/static/no-image-found.png"; // fallback
  };

  return (
    <Stack sx={{ position: "relative" }}>
      {state.openModal && getCurrentModuleType() === "food" && item ? (
        <></>
      ) : (
        <></>
      )}
      {wishlistcard === "true" && (
        <HeartWrapper
          onClick={() => setOpenModal(true)}
          top="10px"
          right="10px"
          style={{ position: "absolute", zIndex: 10 }}
        >
          <FavoriteIcon
            style={{
              color: isWishlisted
                ? theme.palette.error.main
                : theme.palette.neutral[400],
              fontSize: 24,
            }}
          />
        </HeartWrapper>
      )}

      {specialCard === "true" ? (
        <SpecialCard
          item={item}
          imageBaseUrl={imageBaseUrl}
          quickViewHandleClick={quickViewHandleClick}
          addToCart={addToCart}
          handleBadge={handleBadge}
          addToCartHandler={addToCart}
          isProductExist={isProductExist}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          count={count}
          handleClick={handleClick}
          isLoading={isLoading}
          updateLoading={updateLoading}
          setOpenLocationAlert={setOpenLocationAlert}
          noRecommended={noRecommended}
          configData={configData}
          isCartContext={isCartContext}
        />
      ) : (
        <CardWrapper
          cardFor={cardFor}
          cardType={cardType}
          nomargin={noMargin ? "true" : "false"}
          cardheight={cardheight}
          horizontalcard={horizontalcard}
          wishlistcard={wishlistcard}
          cardWidth={cardWidth}
          onClick={() => handleClick()}
          onMouseEnter={() =>
            dispatch({
              type: ACTION.setIsTransformed,
              payload: true,
            })
          }
          onMouseDown={() =>
            dispatch({
              type: ACTION.setIsTransformed,
              payload: true,
            })
          }
          onMouseLeave={() =>
            dispatch({
              type: ACTION.setIsTransformed,
              payload: false,
            })
          }
        >
          <CustomStackFullWidth
            direction={{
              xs: horizontalcard === "true" ? "row" : "column",
              sm: horizontalcard === "true" ? "row" : "column",
            }}
            justifyContent="flex-start"
            height="100%"
            sx={{
              backgroundColor:
                horizontalcard === "true" &&
                changed_bg === "true" &&
                "primary.semiLight",
              position: "relative",
            }}
          >
            <CustomCardMedia
              horizontalcard={horizontalcard}
              loveItem={loveItem}
            >
              {handleBadge()}

              {isFrom === "new-arival" ||
              isFrom === "top-rated" ||
              isFrom === dealTitle ||
              isFrom === "plp" ||
              isFrom === "plp-list-view" ? (
                <Stack>
                  {/* Product Image */}
                  <NextImage
                    src={getProductImageUrl()}
                    alt={
                      item?.name ||
                      "Product Image" ||
                      isFrom === "top-rated" ||
                      isFrom === dealTitle ||
                      isFrom === "plp"
                    }
                    height={160}
                    width={160}
                    objectFit="contain"
                    borderRadius="3px"
                  />

                  {/* Out of Stock Overlay */}
                  {item?.stock === 0 && (
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      width="100%"
                      height="100%"
                      bgcolor="rgba(0,0,0,0.5)"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      borderRadius="3px"
                    >
                      <Typography
                        color="white"
                        fontWeight="bold"
                        fontSize="14px"
                      >
                        Out of Stock
                      </Typography>
                    </Box>
                  )}
                </Stack>
              ) : (
                <NextImage
                  src={getProductImageUrl()}
                  alt={item?.name || "Product Image"}
                  height={160}
                  width={160}
                  objectFit="contain"
                  borderRadius="3px"
                />
              )}
              {item?.module?.module_type === "pharmacy" && (
                <Stack
                  width="100%"
                  alignItems="center"
                  justifyContent="center"
                  padding={{
                    xs: "3px 3px 8px 3px",
                    md: "3px 3px 3px 3px",
                  }}
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#B3B3B399" : "#EDEDED99",
                    color: theme.palette.neutral[1000],
                    fontSize: "12px",
                    zIndex: "999",
                  }}
                  component="h4"
                >
                  {item?.store_name}
                </Stack>
              )}
              {item?.module?.module_type === "food" && (
                <ProductsUnavailable product={item} />
              )}
              {item?.halal_tag_status && item?.is_halal ? (
                <FoodHalalHaram width={30} />
              ) : (
                ""
              )}

              <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 10 }}>
                <Box
                  sx={{
                    background: "#fff",
                    borderRadius: "20px",
                    width: 30,
                    height: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: 1,
                    // border: '2px solid #111',
                  }}
                >
                  {isWishlisted ? (
                    <FavoriteIcon
                      style={{
                        color: "#FF6159",
                        fontSize: 18,
                        cursor: "pointer",
                        borderRadius: "50%",
                        stroke: "#fff",
                        strokeWidth: 1,
                      }}
                      onClick={removeFromWishlistHandler}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      style={{
                        color: "#000",
                        fontSize: 18,
                        cursor: "pointer",
                        borderRadius: "50%",
                        stroke: "#fff",
                        strokeWidth: 1,
                      }}
                      onClick={addToWishlistHandler}
                    />
                  )}
                </Box>
              </Box>
            </CustomCardMedia>
            {/* Optional wrapping with Box minimum height 150px */}
            <CustomStackFullWidth justifyContent="center">
              {cardFor === "popular items" && popularCardUi()}
              {cardFor === "vertical" && verticalCardUi()}
              {cardFor === "flashSale" && verticalCardFlashUi()}
              {cardFor === "flashSaleSlider" && verticalCardFlashSliderUi()}
              {cardFor === "food horizontal card" && foodHorizontalCardUi()}
              {cardFor === "list-view" && listViewCardUi()}
            </CustomStackFullWidth>
          </CustomStackFullWidth>
        </CardWrapper>
      )}

      <CustomModal openModal={state.clearCartModal} handleClose={handleClose}>
        <CartClearModal
          handleClose={handleCloseForClearCart}
          dispatchRedux={reduxDispatch}
          addToCard={addToCartHandler}
        />
      </CustomModal>
      <CustomDialogConfirm
        dialogTexts={t("Are you sure you want to  delete this item?")}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={() => deleteWishlistItem(item?.id)}
      />
      <CustomModal
        openModal={openLocationAlert}
        handleClose={() => setOpenLocationAlert(false)}
      >
        <GetLocationAlert setOpenAlert={setOpenLocationAlert} />
      </CustomModal>
    </Stack>
  );
};

ProductCard.propTypes = {};

export default ProductCard;
