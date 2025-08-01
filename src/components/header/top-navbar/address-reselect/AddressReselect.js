// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import RoomIcon from "@mui/icons-material/Room";
// import { Grid, Typography, useTheme } from "@mui/material";
// import { useRouter } from "next/router";
// import React, { useEffect, useRef, useState } from "react";
// import toast from "react-hot-toast";
// import { useTranslation } from "react-i18next";
// import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
// import AddressReselectPopover from "./AddressReselectPopover";
// import { getModule } from "helper-functions/getLanguage";

// const AddressReselect = ({ location, setOpenDrawer }) => {
//   const theme = useTheme();
//   const router = useRouter();
//   const [openReselectModal, setOpenReselectModal] = useState(false);
//   const [openPopover, setOpenPopover] = useState(false);
//   const [address, setAddress] = useState(null);
//   const { t } = useTranslation();
//   let token = undefined;
//   if (typeof window !== "undefined") {
//     token = localStorage.getItem("token");
//   }

//   let currentLatLngForMar;
//   if (typeof localStorage.getItem("currentLatLng") !== undefined) {
//     currentLatLngForMar = JSON.parse(localStorage.getItem("currentLatLng"));
//   }

//   let currentLatLng;
//   useEffect(() => {
//     let currentLatLng;
//     if (typeof localStorage.getItem("currentLatLng") !== undefined) {
//       currentLatLng = JSON.parse(localStorage.getItem("currentLatLng"));
//       const location = localStorage.getItem("location");
//     }
//   }, []);

//   useEffect(() => {
//     if (address) {
//       localStorage.setItem("location", address?.address);
//       const values = { lat: address?.lat, lng: address?.lng };
//       localStorage.setItem("currentLatLng", JSON.stringify(values));
//       if (address.zone_ids && address.zone_ids.length > 0) {
//         const value = [address.zone_ids];

//         localStorage.setItem("zoneid", JSON.stringify(address.zone_ids));
//         toast.success(t(`New ${getModule()?.module_type==="rental" ? "Pickup" : "Delivery"} address selected.`));
//         handleClosePopover();
//       }
//     }
//   }, [address]);
//   const handleClickToLandingPage = () => {
//     setOpenPopover(true);
//     setOpenDrawer(false);
//   };

//   const anchorRef = useRef(null);
//   const handleClosePopover = () => {
//     setOpenPopover(false);
//   };
//   return (
//     <>
//       <Grid
//         container
//         alignItems="center"
//         justifyContent="flex-end"
//         sx={{
//           color: (theme) => theme.palette.neutral[1000],
//           maxWidth: { xs: "230px", sm: "280px" },
//         }}
//         ref={anchorRef}
//         onClick={handleClickToLandingPage}
//       >
//         <Grid item xs={11} align="left">
//           <CustomStackFullWidth direction="row" alignItems="center" spacing={1}>
//             {/* <RoomIcon
//               sx={{
//                 fontSize: { xs: "16px", sm: "20px" },
//               }}
//               color="primary"
//             /> */}
//             <Typography
//               fontSize={{ xs: "12px", sm: "16px" }}
//               align="center"
//               color={theme.palette.neutral[1000]}
//               sx={{
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 display: "-webkit-box",
//                 WebkitLineClamp: "1",
//                 WebkitBoxOrient: "vertical",
//                 textAlign: "left",
//                 transition: "all ease 0.5s",
//                 wordBreak: "break-all",
//                 "&:hover": {
//                   color: theme.palette.primary.main,
//                 },
//                 // width: "210px",
//               }}
//             >
//               {location}
//             </Typography>
//           </CustomStackFullWidth>
//         </Grid>
//         <Grid item xs={1}>
//           <CustomStackFullWidth>
//             <KeyboardArrowDownIcon
//               sx={{
//                 fontSize: { xs: "16px", sm: "20px" },
//               }}
//             />
//           </CustomStackFullWidth>
//         </Grid>
//       </Grid>
//       <AddressReselectPopover
//         anchorEl={anchorRef.current}
//         onClose={handleClosePopover}
//         open={openPopover}
//         t={t}
//         address={address}
//         setAddress={setAddress}
//         token={token}
//         currentLatLngForMar={currentLatLngForMar}
//       />
//     </>
//   );
// };

// AddressReselect.propTypes = {};

// export default AddressReselect;

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RoomIcon from "@mui/icons-material/Room";
import { Grid, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import AddressReselectPopover from "./AddressReselectPopover";
import { getModule } from "helper-functions/getLanguage";

const AddressReselect = ({ location, setOpenDrawer }) => {
  const theme = useTheme();
  const router = useRouter();
  const [openReselectModal, setOpenReselectModal] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [address, setAddress] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(location);
  const { t } = useTranslation();
  let token = undefined;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  let currentLatLngForMar;
  if (typeof localStorage.getItem("currentLatLng") !== undefined) {
    currentLatLngForMar = JSON.parse(localStorage.getItem("currentLatLng"));
  }

  // Listen to localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const newLocation = localStorage.getItem("location");
      if (newLocation && newLocation !== currentLocation) {
        setCurrentLocation(newLocation);
      }
    };

    // Listen for storage events (when localStorage changes from other tabs/windows)
    window.addEventListener('storage', handleStorageChange);
    
    // Also check for changes more frequently (for same-tab changes)
    const interval = setInterval(() => {
      const newLocation = localStorage.getItem("location");
      if (newLocation && newLocation !== currentLocation) {
        setCurrentLocation(newLocation);
      }
    }, 500); // Check every 500ms instead of 1000ms

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [currentLocation]);

  // Force update when location prop changes
  useEffect(() => {
    if (location && location !== currentLocation) {
      setCurrentLocation(location);
    }
  }, [location]);

  useEffect(() => {
    if (address) {
      localStorage.setItem("location", address?.address);
      const values = { lat: address?.lat, lng: address?.lng };
      localStorage.setItem("currentLatLng", JSON.stringify(values));
      if (address.zone_ids && address.zone_ids.length > 0) {
        const value = [address.zone_ids];

        localStorage.setItem("zoneid", JSON.stringify(address.zone_ids));
        toast.success(
          t(
            `New ${
              getModule()?.module_type === "rental" ? "Pickup" : "Delivery"
            } address selected.`
          )
        );
        // Update the current location state immediately
        setCurrentLocation(address?.address);
        handleClosePopover();
      }
    }
  }, [address]);
  const handleClickToLandingPage = () => {
    setOpenPopover(true);
    setOpenDrawer(false);
  };

  const anchorRef = useRef(null);
  const handleClosePopover = () => {
    setOpenPopover(false);
  };
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="flex-end"
        sx={{
          color: (theme) => theme.palette.neutral[1000],
          maxWidth: { xs: "230px", sm: "280px" },
        }}
        ref={anchorRef}
        onClick={handleClickToLandingPage}
      >
        <Grid item xs={11} align="left">
          <CustomStackFullWidth direction="row" alignItems="center" spacing={1}>
            {/* <RoomIcon
              sx={{
                fontSize: { xs: "16px", sm: "20px" },
              }}
              color="primary"
            /> */}
            <Typography
              fontSize={{ xs: "12px", sm: "13px" }}
              align="center"
              color={theme.palette.neutral[1000]}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
                textAlign: "left",
                transition: "all ease 0.5s",
                wordBreak: "break-all",
                "&:hover": {
                  color: theme.palette.primary.main,
                },
                // width: "210px",
              }}
            >
              {currentLocation && currentLocation.length > 20
                ? `${currentLocation.slice(0, 30)}.....`
                : currentLocation || location}
            </Typography>
          </CustomStackFullWidth>
        </Grid>
        <Grid item xs={1}>
          <CustomStackFullWidth>
            <KeyboardArrowDownIcon
              sx={{
                fontSize: { xs: "16px", sm: "20px" },
              }}
            />
          </CustomStackFullWidth>
        </Grid>
      </Grid>
      <AddressReselectPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
        t={t}
        address={address}
        setAddress={setAddress}
        token={token}
        currentLatLngForMar={currentLatLngForMar}
      />
    </>
  );
};

AddressReselect.propTypes = {};

export default AddressReselect;
