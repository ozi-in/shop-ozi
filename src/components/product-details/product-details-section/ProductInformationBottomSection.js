import React, { useEffect } from "react";
import { Stack, styled } from "@mui/system";
import { PrimaryButton } from "../../Map/map.style";
import {
  alpha,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useSelector, useDispatch } from "react-redux";

import { useRouter } from "next/router";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  setBuyNowItemList,
  setCampaignItemList,
  setIncrementToCartItem,
  setDecrementToCartItem,
  setRemoveItemFromCart,
} from "../../../redux/slices/cart";
import toast from "react-hot-toast";
import { useWishListDelete } from "../../../api-manage/hooks/react-query/wish-list/useWishListDelete";
import { removeWishListItem } from "../../../redux/slices/wishList";
import NotAvailableCard from "./NotAvailableCard";
import { getCurrentModuleType } from "../../../helper-functions/getCurrentModuleType";
import Loading from "../../custom-loading/Loading";
import { isVariationAvailable } from "components/product-details/product-details-section/helperFunction";
import useCartItemUpdate from "../../../api-manage/hooks/react-query/add-cart/useCartItemUpdate";
import useDeleteCartItem from "../../../api-manage/hooks/react-query/add-cart/useDeleteCartItem";
import { onErrorResponse } from "../../../api-manage/api-error-response/ErrorResponses";
import { getItemDataForAddToCart } from "./helperFunction";
import { getTotalVariationsPrice } from "../../../utils/CustomFunctions";
import { getGuestId } from "../../../helper-functions/getToken";
import {
  out_of_stock,
  out_of_limits,
  cart_item_remove,
} from "../../../utils/toasterMessages";

export const BottomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    boxShadow: "0px -4px 4px 0px rgba(0, 0, 0, 0.05)",
    borderRadius: "0px 0px 10px 10px",
    padding: "14px",
  },
}));

const ProductInformationBottomSection = ({
  addToCard,
  productDetailsData,
  selectedOptions,
  handleUpdateToCart,
  dispatchRedux,
  addToFavorite,
  wishListCount,
  setWishListCount,
  cartItemQuantity,
  handleModalClose,
  isLoading,
  t,
  addToCartMutate,
  updateIsLoading,
}) => {
  const theme = useTheme();
  const { cartList } = useSelector((state) => state.cart);
  const { wishLists } = useSelector((state) => state.wishList);
  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const { mutate: updateMutate, isLoading: cartUpdateLoading } =
    useCartItemUpdate();
  const { mutate: deleteMutate, isLoading: removeIsLoading } =
    useDeleteCartItem();
  const guestId = getGuestId();

  const variationErrorToast = () =>
    toast.error(
      t(
        "This variation is out of stock. Choose another variation to proceed further."
      )
    );

  const isInCart = (id) => {
    if (cartList?.length > 0) {
      const isInCart = cartList?.find(
        (item) =>
          item?.id === id &&
          JSON.stringify(item?.selectedOption) ===
            JSON.stringify(productDetailsData?.selectedOption)
      );
      if (isInCart) {
        return isInCart;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const getQuantity = () => {
    const cartItem = isInCart(productDetailsData?.id);
    return cartItem ? cartItem.quantity : 1;
  };

  const cartUpdateHandleSuccess = (res) => {
    if (res) {
      res?.forEach((item) => {
        const cartItem = isInCart(productDetailsData?.id);
        if (cartItem?.cartItemId === item?.id) {
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
          dispatch(setIncrementToCartItem(product));
        }
      });
    }
  };

  const cartUpdateHandleSuccessDecrement = (res) => {
    if (res) {
      res?.forEach((item) => {
        const cartItem = isInCart(productDetailsData?.id);
        if (cartItem?.cartItemId === item?.id) {
          // If quantity becomes 0, remove the item from cart
          if (item?.quantity === 0) {
            dispatch(setRemoveItemFromCart(cartItem));
            toast.success(t(cart_item_remove));
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
            dispatch(setDecrementToCartItem(product));
          }
        }
      });
    }
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    const cartItem = isInCart(productDetailsData?.id);

    if (cartItem) {
      const updateQuantity = cartItem?.quantity + 1;
      const price =
        cartItem?.price + getTotalVariationsPrice(cartItem?.food_variations);
      const productPrice = price * updateQuantity;
      const mainPrice =
        getCurrentModuleType() === "food"
          ? productPrice
          : (cartItem?.selectedOption?.length > 0
              ? cartItem?.selectedOption?.[0]?.price
              : cartItem?.price) * updateQuantity;

      const itemObject = getItemDataForAddToCart(
        cartItem,
        updateQuantity,
        mainPrice,
        guestId
      );

      if (getCurrentModuleType() !== "food") {
        if (cartItem?.stock <= cartItem?.quantity) {
          toast.error(t(out_of_stock));
        } else {
          if (cartItem?.maximum_cart_quantity) {
            if (cartItem?.maximum_cart_quantity <= cartItem?.quantity) {
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
        }
      } else {
        if (cartItem?.maximum_cart_quantity) {
          if (cartItem?.maximum_cart_quantity <= cartItem?.quantity) {
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
      }
    }
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    const cartItem = isInCart(productDetailsData?.id);

    if (cartItem) {
      const updateQuantity = cartItem?.quantity - 1;

      // If quantity becomes 0, remove the item from cart
      if (updateQuantity === 0) {
        const cartIdAndGuestId = {
          cart_id: cartItem?.cartItemId,
          guestId: guestId,
        };
        deleteMutate(cartIdAndGuestId, {
          onSuccess: () => {
            dispatch(setRemoveItemFromCart(cartItem));
            toast.success(t(cart_item_remove));
          },
          onError: onErrorResponse,
        });
        return;
      }

      const price =
        cartItem?.price + getTotalVariationsPrice(cartItem?.food_variations);
      const productPrice = price * updateQuantity;
      const mainPrice =
        getCurrentModuleType() === "food"
          ? productPrice
          : (cartItem?.selectedOption?.length > 0
              ? cartItem?.selectedOption?.[0]?.price
              : cartItem?.price) * updateQuantity;
      const itemObject = getItemDataForAddToCart(
        cartItem,
        updateQuantity,
        mainPrice,
        guestId
      );
      updateMutate(itemObject, {
        onSuccess: cartUpdateHandleSuccessDecrement,
        onError: onErrorResponse,
      });
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    const cartItem = isInCart(productDetailsData?.id);
    if (cartItem) {
      const cartIdAndGuestId = {
        cart_id: cartItem?.cartItemId,
        guestId: guestId,
      };
      deleteMutate(cartIdAndGuestId, {
        onSuccess: () => {
          dispatch(setRemoveItemFromCart(cartItem));
          toast.success(t(cart_item_remove));
        },
        onError: onErrorResponse,
      });
    }
  };

  const router = useRouter();

  const handleRedirect = () => {
    if (productDetailsData?.isCampaignItem) {
      dispatchRedux(setCampaignItemList(productDetailsData));
      router.push("/checkout?page=campaign", undefined, { shallow: true });
    } else {
      dispatchRedux(setBuyNowItemList(productDetailsData));

      // const isExist = isInCart(productDetailsData?.id);
      // if (isExist) {
      //   dispatchRedux(setUpdateItemToCart(productDetailsData));
      // } else {
      //   dispatchRedux(setCart(productDetailsData));
      // }
      router.push(
        {
          pathname: "/checkout",
          query: {
            page: "buy_now",
            // id: productDetailsData?.id,
          },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  const handleRedirectToCheckoutClick = () => {
    if (productDetailsData?.selectedOption?.length > 0) {
      if (productDetailsData?.selectedOption?.[0]?.stock === 0) {
        variationErrorToast();
      } else {
        handleRedirect();
        handleModalClose();
      }
    } else {
      handleRedirect();
    }
  };
  const isInWishList = (id) => {
    return !!wishLists?.item?.find((wishItem) => wishItem.id === id);
  };

  const onSuccessHandlerForDelete = (res) => {
    dispatchRedux(removeWishListItem(productDetailsData?.id));
    setWishListCount(wishListCount - 1);
    toast.success(res.message, {
      id: "wishlist",
    });
  };
  const { mutate } = useWishListDelete();
  const deleteWishlistItem = (id) => {
    mutate(id, {
      onSuccess: onSuccessHandlerForDelete,
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });
  };
  useEffect(() => {}, [wishListCount]);

  const handleVariationAvailability = (checkFor, cartItem) => {
    if (productDetailsData?.selectedOption?.length > 0) {
      if (productDetailsData?.selectedOption?.[0]?.stock === 0) {
        variationErrorToast();
      } else {
        checkFor === "add" ? addToCard() : handleUpdateToCart(cartItem);
      }
    } else {
      checkFor === "add" ? addToCard() : handleUpdateToCart(cartItem);
    }
  };

  const handleWishlist = () => (
    <>
      {isInWishList(productDetailsData?.id) && (
        <Button
          variant="outlined"
          onClick={() => deleteWishlistItem(productDetailsData?.id)}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <FavoriteIcon />
            <Typography>{wishListCount}</Typography>
          </Stack>
        </Button>
      )}
      {!isInWishList(productDetailsData?.id) && (
        <Button variant="outlined" onClick={addToFavorite}>
          <Stack direction="row" spacing={1} alignItems="center">
            <FavoriteBorderOutlinedIcon />
            <Typography>{wishListCount}</Typography>
          </Stack>
        </Button>
      )}
    </>
  );

  const actionsHandler = () => (
    <BottomStack direction="row" width="100%" gap={2.5}>
      {productDetailsData?.stock > 0 &&
      isVariationAvailable(productDetailsData) ? (
        <PrimaryButton
          onClick={() => handleRedirectToCheckoutClick()}
          sx={{
            backgroundColor: theme.palette.customColor.buyButton,
            color: "black",
            width: {
              xs: "50%",
              sm: productDetailsData?.isCampaignItem ? "100%" : 200,
            },
            "&:hover": {
              color: "black",
              backgroundColor: alpha(theme.palette.customColor.buyButton, 0.6),
            },
          }}
        >
          {productDetailsData?.isCampaignItem
            ? t("Order Now")
            : isInCart(productDetailsData?.id)
            ? t("Go to Cart")
            : t("Buy Now")}
        </PrimaryButton>
      ) : (
        <PrimaryButton
          onClick={() => handleRedirectToCheckoutClick()}
          sx={{
            backgroundColor: theme.palette.customColor.buyButton,
            color: "black",
            width: "50%",
          }}
          disabled={
            productDetailsData?.stock === 0 ||
            !isVariationAvailable(productDetailsData)
          }
        >
          <Typography color={alpha(theme.palette.error.main, 0.7)} variant="h7">
            {t("Out of Stock")}
          </Typography>
        </PrimaryButton>
      )}
      {!productDetailsData?.isCampaignItem && (
        <>
          {!isInCart(productDetailsData?.id) &&
            productDetailsData?.stock > 0 &&
            isVariationAvailable(productDetailsData) && (
              <PrimaryButton
                onClick={() => handleVariationAvailability("add")}
                sx={{
                  width: { xs: "50%", md: 200 },
                  fontSize: { xs: "12px", md: "14px" },
                }}
                disabled={productDetailsData?.stock === 0}
              >
                {isLoading ? <Loading /> : t("Add to Cart")}
              </PrimaryButton>
            )}
          {isInCart(productDetailsData?.id) && (
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                width: 200,
                borderRadius: "8px",
                height: "40px",
                overflow: "hidden",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              {/* Left Section - Decrement Button */}
              <Stack
                alignItems="center"
                justifyContent="center"
                onClick={getQuantity() === 1 ? handleRemove : handleDecrement}
                sx={{
                  flex: 1,
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.08),
                  cursor: "pointer",
                  height: "100%",
                  "&:hover": {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.12),
                  },
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight="600"
                  color="primary"
                  sx={{
                    fontSize: "16px",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  -
                </Typography>
              </Stack>

              {/* Middle Section - Quantity Display */}
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  flex: 1,
                  backgroundColor: (theme) =>
                    alpha(theme.palette.grey[300], 0.3),
                  height: "100%",
                  borderTop: `1px solid ${alpha(theme.palette.grey[400], 0.2)}`,
                  borderBottom: `1px solid ${alpha(
                    theme.palette.grey[400],
                    0.2
                  )}`,
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight="600"
                  textAlign="center"
                  sx={{
                    fontSize: "14px",
                    color: theme.palette.text.primary,
                    fontFamily: "inherit",
                    userSelect: "none",
                  }}
                >
                  {getQuantity() < 10 && "0"}
                  {getQuantity()}
                </Typography>
              </Stack>

              {/* Right Section - Increment Button */}
              <Stack
                alignItems="center"
                justifyContent="center"
                onClick={handleIncrement}
                sx={{
                  flex: 1,
                  backgroundColor: theme.palette.primary.main,
                  cursor: "pointer",
                  height: "100%",
                  "&:hover": {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.8),
                  },
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight="600"
                  color="white"
                  sx={{
                    fontSize: "16px",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  +
                </Typography>
              </Stack>
            </Stack>
          )}
        </>
      )}
    </BottomStack>
  );
  const handleUnavailability = () => (
    <Stack spacing={2}>
      {getCurrentModuleType() !== "ecommerce" && (
        <NotAvailableCard
          endTime={productDetailsData?.available_time_ends}
          startTime={productDetailsData?.available_time_starts}
          moduleType={productDetailsData?.module?.module_type}
        />
      )}
      {productDetailsData?.schedule_order && <>{actionsHandler()}</>}
    </Stack>
  );

  // here unavailability checking is not necessary for modules except food , food modules also don't have details page

  return (
    <>
      {actionsHandler()}
      {productDetailsData?.is_prescription_required == 1 && (
        <Typography
          color={theme.palette.error.main}
          fontSize="13px"
          textTransform="capitalize"
        >
          {t("prescription is required")}
        </Typography>
      )}
    </>
  );
};

export default ProductInformationBottomSection;
