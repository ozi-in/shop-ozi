import React, { useEffect, useReducer, useState } from "react";

import { useTranslation } from "react-i18next";
import "simplebar-react/dist/simplebar.min.css";
import { DeliveryCaption } from "../CheckOut.style";
import useGetAddressList from "../../../api-manage/hooks/react-query/address/useGetAddressList";
import AddressSelectionList from "./AddressSelectionList";
import { IconButton, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import AddNewAddress from "../../address/add-new-address";
import AdditionalAddresses from "../item-checkout/AdditionalAddresses";
import CustomModal from "../../modal";
import SaveAddressModal from "../item-checkout/SaveAddressModal";
import { initialState, reducer } from "../../address/states";
import usePostAddress from "../../../api-manage/hooks/react-query/address/usePostAddress";
import toast from "react-hot-toast";
import { onErrorResponse } from "../../../api-manage/api-error-response/ErrorResponses";
import { useDispatch, useSelector } from "react-redux";
import AddNewAddressButton from "../../address/add-new-address/AddNewAddressButton";
import { setOpenAddressModal } from "../../../redux/slices/addAddress";
import CheckOutSelectedAddress from "../item-checkout/CheckOutSelectedAddress";
import CheckoutSelectedAddressGuest from "../item-checkout/CheckoutSelectedAddressGuest";

const getZoneWiseAddresses = (addresses, restaurantId) => {
  const newArray = [];
  addresses?.forEach(
    (item) => item.zone_ids.includes(restaurantId) && newArray.push(item)
  );
  return newArray;
};
const DeliveryAddress = ({
  setAddress,
  address,
  renderOnNavbar,
  configData,
  storeZoneId,
  orderType,
  showValidationErrors = false, // New prop to control validation display
  onFieldChange, // New prop to handle field changes
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [allAddress, setAllAddress] = useState();
  const [data, setData] = useState(null);
  const reduxDispatch = useDispatch();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { profileInfo } = useSelector((state) => state.profileInfo);
  const [openSaveAddress, setOpenSaveAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const token = localStorage.getItem("token");

  const saveAddressModalClose = () => {
    setOpenSaveAddress(false);
  };
  const { openAddressModal } = useSelector((state) => state.addressModel);
  const mainAddress = {
    ...address,
  };

  // Initialize address from localStorage when used in navbar context
  useEffect(() => {
    if (renderOnNavbar === "true" && typeof window !== "undefined") {
      const storedLocation = localStorage.getItem("location");
      const storedLatLng = localStorage.getItem("currentLatLng");
      
      console.log("DeliveryAddress: Initializing from localStorage", {
        storedLocation,
        storedLatLng,
        renderOnNavbar,
        address
      });
      
      if (storedLocation && storedLatLng && !address) {
        try {
          const latLng = JSON.parse(storedLatLng);
          const addressFromStorage = {
            address: storedLocation,
            lat: latLng.lat,
            lng: latLng.lng,
            latitude: latLng.lat,
            longitude: latLng.lng,
            id: `stored_${Date.now()}`,
            address_type: "Selected Address"
          };
          console.log("DeliveryAddress: Setting address from storage", addressFromStorage);
          setAddress(addressFromStorage);
        } catch (error) {
          console.error("Error parsing stored address:", error);
        }
      }
    }
  }, [renderOnNavbar, setAddress]); // Removed address from dependencies to avoid infinite loops

  // Debug logging for address changes
  useEffect(() => {
    console.log("DeliveryAddress: Address changed", {
      address,
      renderOnNavbar,
      data: data?.addresses?.length
    });
  }, [address, renderOnNavbar, data]);

  // Ensure address is properly synchronized with localStorage
  useEffect(() => {
    if (renderOnNavbar === "true" && address && typeof window !== "undefined") {
      const storedLocation = localStorage.getItem("location");
      const storedLatLng = localStorage.getItem("currentLatLng");
      
      console.log("DeliveryAddress: Syncing address with localStorage", {
        address: address.address,
        storedLocation,
        storedLatLng
      });
      
      // If the address doesn't match localStorage, update localStorage
      if (address.address !== storedLocation) {
        console.log("DeliveryAddress: Updating localStorage with current address");
        localStorage.setItem("location", address.address);
        if (address.lat && address.lng) {
          localStorage.setItem("currentLatLng", JSON.stringify({
            lat: address.lat,
            lng: address.lng
          }));
        }
      }
    }
  }, [address, renderOnNavbar]);

  const handleSuccess = (addressData) => {
    if (storeZoneId) {
      const newObj = {
        ...addressData,
        addresses: getZoneWiseAddresses(addressData?.addresses, storeZoneId),
      };

      setData(newObj);
    } else {
      setData(addressData);
    }
  };
  const { refetch, isRefetching, isLoading } = useGetAddressList(handleSuccess);

  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    // handleSize(data.total_size)
    if (data) {
      const currentAddress = address || null;
      const addressList = currentAddress ? [currentAddress, ...data.addresses] : data.addresses;
      setAllAddress(addressList);
      
      console.log("DeliveryAddress: Updated allAddress", {
        currentAddress: currentAddress?.address,
        savedAddresses: data.addresses?.length,
        totalAddresses: addressList?.length
      });
    }
  }, [data, address]);

  const handleLatLng = (values) => {
    if (renderOnNavbar === "true") {
      setAddress({ ...values, lat: values.latitude, lng: values.longitude });
      // Removed window.location.reload() to prevent page refresh and default address reversion
    } else {
      setAddress({ ...values, lat: values.latitude, lng: values.longitude });
    }
  };

  const { mutate } = usePostAddress();

  const saveAddress = () => {
    let formData = {
      address: address?.address,
      address_type: address?.address_type,
      contact_person_name: `${profileInfo?.f_name} ${profileInfo.l_name}`,
      contact_person_number: profileInfo?.phone,
      latitude: address?.lat,
      longitude: address?.lng,
      additional_information: "",
      house: state?.houseNumber,
      floor: state?.floor,
      road: state?.streetNumber,
    };
    mutate(formData, {
      onSuccess: (response) => {
        toast.success(response?.message);
        refetch?.();
      },
      onError: onErrorResponse,
    });
  };
  const handleAddressModal = () => {
    setEditAddress(null);
    reduxDispatch(setOpenAddressModal(true));
  };
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        pt={{ xs: "18px", md: "0px" }}
        pb={{ xs: "8px", md: "0px" }}
      >
        {renderOnNavbar !== "true" && orderType !== "take_away" && (
          <DeliveryCaption>{t("Delivery Addresses")}</DeliveryCaption>
        )}
        {token && renderOnNavbar !== "true" && orderType !== "take_away" && (
          <AddNewAddressButton
            align="right"
            handleAddressModal={handleAddressModal}
          />
        )}

        {openAddressModal && (
          <AddNewAddress
            refetch={refetch}
            t={t}
            configData={configData}
            openAddressModal={openAddressModal}
            editAddress={editAddress}
            setEditAddress={setEditAddress}
          />
        )}
      </Stack>
      {/*{isLoading && <Skeleton width="100%" height={150} />}*/}
      {/*{isRefetching && <Skeleton width="100%" height={150} />}*/}
      {renderOnNavbar === "true" ? (
        <>
          <AddressSelectionList
            data={data}
            allAddress={allAddress}
            handleLatLng={handleLatLng}
            t={t}
            address={address}
            refetch={refetch}
            configData={configData}
            renderOnNavbar={renderOnNavbar}
          />
        </>
      ) : (
        <>
          {token && orderType !== "take_away" ? (
            <Stack>
              <CheckOutSelectedAddress
                address={address}
                refetch={refetch}
                configData={configData}
                editAddress={editAddress}
                setEditAddress={setEditAddress}
              />
              <IconButton
                sx={{ width: "150px" }}
                onClick={() => setOpenSaveAddress(true)}
              >
                <Typography
                  fontSize="14px"
                  fontWeight="400"
                  color={theme.palette.primary.main}
                >
                  {t("View Saved Address")}
                </Typography>
              </IconButton>
            </Stack>
          ) : (
            <>
              {!token && (
                <Stack>
                  <CheckoutSelectedAddressGuest
                    address={address}
                    configData={configData}
                    editAddress={editAddress}
                    setEditAddress={setEditAddress}
                    orderType={orderType}
                  />
                </Stack>
              )}
            </>
          )}
        </>
      )}
      {/* {renderOnNavbar !== "true" && orderType !== "take_away" && (
        <AdditionalAddresses
          t={t}
          additionalInformationDispatch={dispatch}
          additionalInformationStates={state}
          saveAddress={saveAddress}
          address={address}
          setAddress={setAddress}
          orderType={orderType}
          showValidationErrors={showValidationErrors}
          onFieldChange={onFieldChange}
        />
      )} */}

      <CustomModal
        openModal={openSaveAddress}
        handleClose={saveAddressModalClose}
      >
        <SaveAddressModal
          handleAddressModal={handleAddressModal}
          handleClose={saveAddressModalClose}
          dispatch={dispatch}
          data={data}
          allAddress={allAddress}
          handleLatLng={handleLatLng}
          t={t}
          address={address}
          isRefetching={isRefetching}
          refetch={refetch}
          configData={configData}
          setAddress={setAddress}
          openAddressModal={openAddressModal}
        />
      </CustomModal>
    </>
  );
};
export default DeliveryAddress;
