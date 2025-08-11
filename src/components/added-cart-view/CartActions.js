// import React, { useState } from "react";
// import { PrimaryButton } from "../Map/map.style";
// import { Stack } from "@mui/system";
// import { useTheme } from "@mui/material";
// import { useTranslation } from "react-i18next";
// import { useRouter } from "next/router";
// import { useDispatch, useSelector } from "react-redux";
// import { setClearCart } from "redux/slices/cart";
// import GuestCheckoutModal from "../cards/GuestCheckoutModal";
// import dynamic from "next/dynamic";
// const AuthModal = dynamic(() => import("components/auth/AuthModal"));
// const CartActions = (props) => {
//   const { setSideDrawerOpen, cartList, text } = props;
//   const { configData } = useSelector((state) => state.configData);
//   const token = localStorage.getItem("token");
//   const [open, setOpen] = useState(false);
//   const [openAuth, setOpenAuth] = useState(false);
//   const [modalFor, setModalFor] = useState("sign-in");
//   const theme = useTheme();
//   const { t } = useTranslation();
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const handleRoute = () => {
//     router.push("/checkout?page=cart", undefined, { shallow: true });
//   };
//   const handleCheckout = () => {
//     if (
//       cartList?.length > 0 &&
//       !token &&
//       configData?.guest_checkout_status === 1
//     ) {
//       setOpen(true);
//     } else if (cartList?.length > 0 && token) {
//       router.push("/checkout?page=cart", undefined, { shallow: true });
//       setSideDrawerOpen(false);
//     } else {
//       if (cartList?.length === 0) {
//         setSideDrawerOpen(false);
//         router.push("/home", undefined, { shallow: true });
//       } else {
//         setOpenAuth(true);
//         // setSideDrawerOpen(false);
//         //router.push('/auth/sign-in');
//       }
//     }
//   };
//   // const handleCheckout = () => {
//   //   if (cartList?.length > 0) {
//   //     router.push("/checkout?page=cart", undefined, { shallow: true });
//   //     setSideDrawerOpen(false);
//   //   } else {
//   //     if (router.pathname === "/home") {
//   //       setSideDrawerOpen(false);
//   //     } else {
//   //       router.push("/home", undefined, { shallow: true });
//   //     }
//   //   }
//   // };
//   const handleClearAll = () => {
//     dispatch(setClearCart());
//     // dispatch(setCouponInfo(null));
//     // setOpenModal(false);
//   };
//   return (
//     <Stack
//       direction="row"
//       width="100%"
//       spacing={1}
//       paddingX="1.25rem"
//       pb="1rem"
//     >
//       <PrimaryButton
//         onClick={handleCheckout}
//         variant="contained"
//         size="large"
//         fullWidth
//         borderRadius="7px"
//       >
//         {text ? (
//           text
//         ) : (
//           <>
//             {cartList?.length > 0
//               ? t("Proceed To Checkout")
//               : t("Continue Shopping")}
//           </>
//         )}
//       </PrimaryButton>
//       {open && (
//         <GuestCheckoutModal
//           open={open}
//           setOpen={setOpen}
//           setSideDrawerOpen={setSideDrawerOpen}
//           handleRoute={handleRoute}
//           setModalFor={setModalFor}
//           setOpenAuth={setOpenAuth}
//         />
//       )}
//       <AuthModal
//         modalFor={modalFor}
//         setModalFor={setModalFor}
//         open={openAuth}
//         handleClose={() => setOpenAuth(false)}
//       />
//     </Stack>
//   );
// };

// CartActions.propTypes = {};

// export default CartActions;

import React, { useState } from "react";
import { PrimaryButton } from "../Map/map.style";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setClearCart } from "redux/slices/cart";
import GuestCheckoutModal from "../cards/GuestCheckoutModal";
import CustomDialogConfirm from "../custom-dialog/confirm/CustomDialogConfirm";
import dynamic from "next/dynamic";
import useDeleteAllCartItem from "../../api-manage/hooks/react-query/add-cart/useDeleteAllCartItem";
import useDeleteAllCarts from "../../api-manage/hooks/react-query/useDeleteAllCarts";
const AuthModal = dynamic(() => import("components/auth/AuthModal"));
const CartActions = (props) => {
  const { setSideDrawerOpen, cartList, text } = props;
  const { configData } = useSelector((state) => state.configData);
  const { selectedModule } = useSelector((state) => state.utilsData);
  const token = localStorage.getItem("token");
  const guestId =
    typeof window !== "undefined" ? localStorage.getItem("guest_id") : null;
  const [open, setOpen] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const [modalFor, setModalFor] = useState("sign-in");
  const [openRemoveAllConfirm, setOpenRemoveAllConfirm] = useState(false);
  const theme = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const { mutate: deleteAllCart, isLoading: deleteAllLoading } =
    useDeleteAllCartItem();
  const { mutate: deleteAllRentalCart, isLoading: deleteAllRentalLoading } =
    useDeleteAllCarts();

  const handleClearAll = () => {
    const onSuccess = () => {
      dispatch(setClearCart());
      setSideDrawerOpen(false);
    };

    // Use rental API for rental module, otherwise use default cart clear API
    if (selectedModule?.module_type === "rental") {
      deleteAllRentalCart(undefined, {
        onSuccess,
        onError: () => {
          // fall back to only closing dialog; UI state will be refreshed by fetchers
        },
      });
    } else {
      deleteAllCart(guestId, {
        onSuccess,
        onError: () => {
          // fall back to only closing dialog; UI state will be refreshed by fetchers
        },
      });
    }
  };

  const handleRoute = () => {
    router.push("/checkout?page=cart", undefined, { shallow: true });
  };
  const handleCheckout = () => {
    if (
      cartList?.length > 0 &&
      !token &&
      configData?.guest_checkout_status === 1
    ) {
      setOpen(true);
    } else if (cartList?.length > 0 && token) {
      router.push("/checkout?page=cart", undefined, { shallow: true });
      setSideDrawerOpen(false);
    } else {
      if (cartList?.length === 0) {
        setSideDrawerOpen(false);
        router.push("/home", undefined, { shallow: true });
      } else {
        setOpenAuth(true);
        // setSideDrawerOpen(false);
        //router.push('/auth/sign-in');
      }
    }
  };
  // const handleCheckout = () => {
  //   if (cartList?.length > 0) {
  //     router.push("/checkout?page=cart", undefined, { shallow: true });
  //     setSideDrawerOpen(false);
  //   } else {
  //     if (router.pathname === "/home") {
  //       setSideDrawerOpen(false);
  //     } else {
  //       router.push("/home", undefined, { shallow: true });
  //     }
  //   }
  // };
  return (
    <Stack
      direction="column"
      width="100%"
      spacing={1}
      paddingX="1.25rem"
      pb="1rem"
    >
      {cartList?.length > 0 && (
        <Button
          onClick={() => setOpenRemoveAllConfirm(true)}
          variant="outlined"
          size="medium"
          fullWidth
          sx={{
            color: theme.palette.buttonColors.hover,
            borderColor: theme.palette.buttonColors.hover,
            "&:hover": {
              backgroundColor: theme.palette.buttonColors.hover,
              borderColor: theme.palette.buttonColors.hover,
              color: "white",
            },
          }}
        >
          {t("Remove All Items")}
        </Button>
      )}
      <PrimaryButton
        onClick={handleCheckout}
        variant="contained"
        size="large"
        fullWidth
        borderRadius="7px"
      >
        {text ? (
          text
        ) : (
          <>
            {cartList?.length > 0
              ? t("Proceed To Checkout")
              : t("Continue Shopping")}
          </>
        )}
      </PrimaryButton>
      {open && (
        <GuestCheckoutModal
          open={open}
          setOpen={setOpen}
          setSideDrawerOpen={setSideDrawerOpen}
          handleRoute={handleRoute}
          setModalFor={setModalFor}
          setOpenAuth={setOpenAuth}
        />
      )}
      <AuthModal
        modalFor={modalFor}
        setModalFor={setModalFor}
        open={openAuth}
        handleClose={() => setOpenAuth(false)}
      />

      {/* Remove All Confirmation Dialog */}
      <CustomDialogConfirm
        open={openRemoveAllConfirm}
        onClose={() => setOpenRemoveAllConfirm(false)}
        onSuccess={() => {
          handleClearAll();
          setOpenRemoveAllConfirm(false);
        }}
        isLoading={deleteAllLoading || deleteAllRentalLoading}
        dialogTexts={t(
          "Are you sure you want to remove all items from your cart?"
        )}
      />
    </Stack>
  );
};

CartActions.propTypes = {};

export default CartActions;
