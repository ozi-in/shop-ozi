// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// import { alpha, Typography, useTheme } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { Box, Stack } from "@mui/system";
// import React, { useState } from "react";
// import { getCurrentModuleType } from "helper-functions/getCurrentModuleType";
// import { ModuleTypes } from "helper-functions/moduleTypes";
// import Loading from "../custom-loading/Loading";
// import { PrimaryToolTip } from "./QuickView";
// import { ShopNowButton } from "styled-components/CustomStyles.style";

// const CustomButton = styled(Box)(({ theme, fill }) => ({
//   width: "36px",
//   height: "36px",
//   borderRadius: "4px",
//   textAlign: "center",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   backgroundColor:
//     fill === "true"
//       ? getCurrentModuleType() === ModuleTypes.FOOD
//         ? theme.palette.moduleTheme.food
//         : theme.palette.primary.main
//       : alpha(
//           getCurrentModuleType() === ModuleTypes.FOOD
//             ? theme.palette.moduleTheme.food
//             : theme.palette.primary.main,
//           0.1
//         ),
//   color:
//     fill === "true"
//       ? theme.palette.whiteContainer.main
//       : getCurrentModuleType() === ModuleTypes.FOOD
//       ? theme.palette.moduleTheme.food
//       : theme.palette.primary.main,
//   "&:hover": {
//     filter: "brightness(0.6)",
//   },
//   [theme.breakpoints.down("sm")]: {
//     width: "25px",
//     height: "25px",
//   },
// }));

// const AddWithIncrementDecrement = (props) => {
//   const {
//     onHover,
//     handleCardHoverFromCartIconClick,
//     verticalCard,
//     setIsButtonClicked,
//     setShowAddtocart,
//     setIsHover,
//     addToCartHandler,
//     isProductExist,
//     handleIncrement,
//     handleDecrement,
//     count,
//     isLoading,
//     updateLoading,
//   } = props;
//   const theme = useTheme();
//   const [isAdded, setIsAdded] = useState(false);
//   const [showIncDec, setShowIncDec] = useState(false);

//   const handleCart = (e) => {
//     e.stopPropagation();
//     handleCardHoverFromCartIconClick?.(e);
//     addToCartHandler?.(e);
//   };

//   const incrementHandler = (e) => {
//     e.stopPropagation();
//     handleIncrement?.();
//   };

//   const decrementHandler = (e) => {
//     e.stopPropagation();
//     handleDecrement?.();
//     if (count === 1) {
//       if (verticalCard) {
//         setIsButtonClicked?.(false);
//         setShowAddtocart?.(true);
//         setIsAdded(false);
//       } else {
//         setIsAdded(false);
//       }
//     } else {
//     }
//   };

//   const handleMouseLeave = () => {
//     if (verticalCard) {
//       setTimeout(() => {
//         setShowIncDec(false);
//       }, 500);
//     }
//   };

//   const handleMouseEnter = () => {
//     if (verticalCard) {
//       setIsHover(false);
//       setShowIncDec(true);
//     }
//   };

//   const handleBackgroundColor = () => {
//     if (verticalCard) {
//       return theme.palette.neutral[300];
//     } else {
//       return alpha(theme.palette.neutral[400], 0.1);
//     }
//   };

//   const cardWiseManage = () => {
//     if (verticalCard) {
//       if (isProductExist) {
//         if (showIncDec) {
//           return (
//             <Stack
//               onMouseLeave={handleMouseLeave}
//               onMouseEnter={handleMouseEnter}
//               direction="row"
//               alignItems="center"
//               justifyContent="center"
//               sx={{
//                 backgroundColor: handleBackgroundColor(),
//                 borderRadius: "4px",
//                 transition: "all ease 0.5s",
//               }}
//             >
//               <CustomButton
//                 onClick={(e) => decrementHandler(e)}
//                 sx={{
//                   transition: "all ease 0.5s",
//                 }}
//               >
//                 <RemoveIcon sx={{ fontSize: { xs: "15px", md: "20px" } }} />
//               </CustomButton>

//               {updateLoading ? (
//                 <Stack width="50px">
//                   <Loading color={theme.palette.primary.main} />
//                 </Stack>
//               ) : (
//                 <Typography
//                   onClick={(e) => e.stopPropagation()}
//                   textAlign="center"
//                   sx={{
//                     width: { xs: "30px", md: "50px" },
//                     transition: "all ease 0.5s",
//                   }}
//                 >
//                   {count}
//                 </Typography>
//               )}

//               <CustomButton fill="true" onClick={(e) => incrementHandler(e)}>
//                 <AddIcon
//                   sx={{
//                     fontSize: { xs: "15px", md: "20px" },
//                     transition: "all ease 0.5s",
//                   }}
//                 />
//               </CustomButton>
//             </Stack>
//           );
//         } else {
//           return (
//             <Stack
//               onMouseEnter={handleMouseEnter}
//               onClick={(e) => handleCart(e)}
//               alignItems="center"
//               justifyContent="center"
//               sx={{
//                 backgroundColor: (theme) =>
//                   onHover ? "primary.main" : theme.palette.neutral[100],
//                 color: (theme) =>
//                   onHover ? "whiteContainer.main" : "primary.main",
//                 height: { xs: "25px", md: "35px" },
//                 width: { xs: "25px", md: "35px" },
//                 transition: "all ease 0.5s",
//                 borderRadius: "5px",
//                 border: (theme) =>
//                   onHover
//                     ? "none"
//                     : `1px solid ${alpha(theme.palette.neutral[400], 0.2)}`,
//                 "&:hover": {
//                   backgroundColor: verticalCard && "primary.main",
//                   color: verticalCard && "whiteContainer.main",
//                 },
//               }}
//             >
//               <PrimaryToolTip text="Add to cart">
//                 {}
//                 <ShoppingBagIcon fontSize="small" />
//               </PrimaryToolTip>
//             </Stack>
//           );
//         }
//       }
//     } else {
//       if (isProductExist) {
//         return (
//           <Stack
//             onMouseLeave={handleMouseLeave}
//             direction="row"
//             alignItems="center"
//             justifyContent="center"
//             sx={{
//               marginTop: "22.7px",
//               backgroundColor: handleBackgroundColor(),
//               borderRadius: "10px",
//             }}
//           >
//             <CustomButton onClick={(e) => decrementHandler(e)}>
//               <RemoveIcon
//                 sx={{
//                   fontSize: { xs: "15px", md: "20px" },
//                   transition: "all ease 0.5s",
//                 }}
//               />
//             </CustomButton>

//             {updateLoading ? (
//               <Stack width="50px">
//                 <Loading color={theme.palette.primary.main} />
//               </Stack>
//             ) : (
//               <Typography
//                 onClick={(e) => e.stopPropagation()}
//                 textAlign="center"
//                 sx={{
//                   width: { xs: "30px", md: "50px" },
//                   transition: "all ease 0.5s",
//                 }}
//               >
//                 {count}
//               </Typography>
//             )}

//             <CustomButton fill="true" onClick={(e) => incrementHandler(e)}>
//               <AddIcon
//                 sx={{
//                   fontSize: { xs: "15px", md: "20px" },
//                   transition: "all ease 0.5s",
//                 }}
//               />
//             </CustomButton>
//           </Stack>
//         );
//       } else {
//         return (
//           <>
//             {isLoading ? (
//               <Stack
//                 alignItems="center"
//                 justifyContent="center"
//                 sx={{
//                   backgroundColor: (theme) => theme.palette.neutral[100],
//                   color: (theme) => theme.palette.primary.main,
//                   height: { xs: "25px", md: "35px" },
//                   width: { xs: "25px", md: "35px" },
//                   borderRadius: "5px",
//                   transition: "all ease 0.5s",
//                   marginTop: "23px",
//                   border: (theme) =>
//                     `1px solid ${alpha(theme.palette.neutral[400], 0.2)}`,
//                 }}
//               >
//                 <Loading color={theme.palette.primary.main} />
//               </Stack>
//             ) : (
//               <PrimaryToolTip text="Add to cart">
//                 <Box
//                   sx={{
//                     width: "100%",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     mt: "20px",
//                   }}
//                   onMouseEnter={handleMouseEnter}
//                 >
//                   <ShopNowButton
//                     onClick={(e) => handleCart(e)}
//                     sx={{
//                       width: "100%",
//                       height: "38px",
//                       minHeight: "38px",
//                       padding: "1px 0",
//                       margin: 0,
//                       // mt: "20px",
//                       "&:hover": { backgroundColor: "#FF6159" },
//                     }}
//                   >
//                     <Typography color="white">Add to Cart</Typography>
//                   </ShopNowButton>
//                 </Box>
//               </PrimaryToolTip>
//             )}
//           </>
//         );
//       }
//     }
//   };

//   return <>{cardWiseManage()}</>;
// };

// AddWithIncrementDecrement.propTypes = {};

// export default AddWithIncrementDecrement;

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { alpha, Typography, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import { getCurrentModuleType } from "helper-functions/getCurrentModuleType";
import { ModuleTypes } from "helper-functions/moduleTypes";
import Loading from "../custom-loading/Loading";
import { PrimaryToolTip } from "./QuickView";
import { ShopNowButton } from "styled-components/CustomStyles.style";

const CustomButton = styled(Box)(({ theme, fill }) => ({
  width: "56px",
  height: "36px",
  borderRadius: "4px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:
    fill === "true"
      ? getCurrentModuleType() === ModuleTypes.FOOD
        ? theme.palette.moduleTheme.food
        : theme.palette.primary.main
      : alpha(
          getCurrentModuleType() === ModuleTypes.FOOD
            ? theme.palette.moduleTheme.food
            : theme.palette.primary.main,
          0.1
        ),
  color:
    fill === "true"
      ? theme.palette.whiteContainer.main
      : getCurrentModuleType() === ModuleTypes.FOOD
      ? theme.palette.moduleTheme.food
      : theme.palette.primary.main,
  "&:hover": {
    filter: "brightness(0.6)",
  },
  // [theme.breakpoints.down("sm")]: {
  //   width: "25px",
  //   height: "25px",
  // },
  [theme.breakpoints.down("sm")]: {
    width: "45px",
    height: "100%", // make it take full height of the Stack
    minHeight: "35px", // optional fallback to match Stack height
  },
}));

const AddWithIncrementDecrement = (props) => {
  const {
    onHover,
    handleCardHoverFromCartIconClick,
    verticalCard,
    setIsButtonClicked,
    setShowAddtocart,
    setIsHover,
    addToCartHandler,
    isProductExist,
    handleIncrement,
    handleDecrement,
    count,
    isLoading,
    updateLoading,
  } = props;
  const theme = useTheme();
  const [isAdded, setIsAdded] = useState(false);
  const [showIncDec, setShowIncDec] = useState(false);

  const handleCart = (e) => {
    e.stopPropagation();
    handleCardHoverFromCartIconClick?.(e);
    addToCartHandler?.(e);
  };

  const incrementHandler = (e) => {
    e.stopPropagation();
    handleIncrement?.();
  };

  const decrementHandler = (e) => {
    e.stopPropagation();
    handleDecrement?.();
    if (count === 1) {
      if (verticalCard) {
        setIsButtonClicked?.(false);
        setShowAddtocart?.(true);
        setIsAdded(false);
      } else {
        setIsAdded(false);
      }
    } else {
    }
  };

  const handleMouseLeave = () => {
    if (verticalCard) {
      setTimeout(() => {
        setShowIncDec(false);
      }, 500);
    }
  };

  const handleMouseEnter = () => {
    if (verticalCard) {
      setIsHover(false);
      setShowIncDec(true);
    }
  };

  const handleBackgroundColor = () => {
    if (verticalCard) {
      return theme.palette.neutral[300];
    } else {
      return alpha(theme.palette.neutral[400], 0.1);
    }
  };

  const cardWiseManage = () => {
    if (verticalCard) {
      if (isProductExist) {
        if (showIncDec) {
          return (
            <Stack
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{
                backgroundColor: handleBackgroundColor(),
                borderRadius: "4px",
                transition: "all ease 0.5s",
              }}
            >
              <CustomButton
                onClick={(e) => decrementHandler(e)}
                sx={{
                  transition: "all ease 0.5s",
                }}
              >
                <RemoveIcon sx={{ fontSize: { xs: "15px", md: "20px" } }} />
              </CustomButton>

              {updateLoading ? (
                <Stack width="50px">
                  <Loading color={theme.palette.primary.main} />
                </Stack>
              ) : (
                <Typography
                  onClick={(e) => e.stopPropagation()}
                  textAlign="center"
                  sx={{
                    width: { xs: "30px", md: "50px" },
                    transition: "all ease 0.5s",
                  }}
                >
                  {count}
                </Typography>
              )}

              <CustomButton fill="true" onClick={(e) => incrementHandler(e)}>
                <AddIcon
                  sx={{
                    fontSize: { xs: "15px", md: "20px" },
                    transition: "all ease 0.5s",
                  }}
                />
              </CustomButton>
            </Stack>
          );
        } else {
          return (
            <Stack
              onMouseEnter={handleMouseEnter}
              onClick={(e) => handleCart(e)}
              alignItems="center"
              justifyContent="center"
              sx={{
                backgroundColor: (theme) =>
                  onHover ? "primary.main" : theme.palette.neutral[100],
                color: (theme) =>
                  onHover ? "whiteContainer.main" : "primary.main",
                height: { xs: "25px", md: "35px" },
                width: { xs: "25px", md: "35px" },
                transition: "all ease 0.5s",
                borderRadius: "5px",
                border: (theme) =>
                  onHover
                    ? "none"
                    : "1px solid ${alpha(theme.palette.neutral[400], 0.2)}",
                "&:hover": {
                  backgroundColor: verticalCard && "primary.main",
                  color: verticalCard && "whiteContainer.main",
                },
              }}
            >
              <PrimaryToolTip text="Add to cart">
                {}
                <ShoppingBagIcon fontSize="small" />
              </PrimaryToolTip>
            </Stack>
          );
        }
      }
    } else {
      if (isProductExist) {
        return (
          // <Stack
          //   onMouseLeave={handleMouseLeave}
          //   direction="row"
          //   alignItems="center"
          //   justifyContent="center"
          //   sx={{
          //     marginTop: "11px",
          //     backgroundColor: handleBackgroundColor(),
          //     borderRadius: "10px",
          //   }}
          // >
          // <Stack
          //   onMouseLeave={handleMouseLeave}
          //   direction="row"
          //   alignSelf="center"
          //   alignItems="center"
          //   justifyContent="space-between"
          //   sx={{
          //     marginTop: "11px",
          //     backgroundColor: handleBackgroundColor(),
          //     borderRadius: "10px",
          //     width: "100%",
          //   }}
          // >
          //   <CustomButton onClick={(e) => decrementHandler(e)}>
          //     <RemoveIcon
          //       sx={{
          //         fontSize: { xs: "15px", md: "20px" },
          //         transition: "all ease 0.5s",
          //       }}
          //     />
          //   </CustomButton>

          //   {updateLoading ? (
          //     <Stack width="50px">
          //       <Loading color={theme.palette.primary.main} />
          //     </Stack>
          //   ) : (
          //     <Typography
          //       onClick={(e) => e.stopPropagation()}
          //       textAlign="center"
          //       sx={{
          //         width: { xs: "30px", md: "50px" },
          //         transition: "all ease 0.5s",
          //       }}
          //     >
          //       {count}
          //     </Typography>
          //   )}

          //   <CustomButton fill="true" onClick={(e) => incrementHandler(e)}>
          //     <AddIcon
          //       sx={{
          //         fontSize: { xs: "15px", md: "20px" },
          //         transition: "all ease 0.5s",
          //       }}
          //     />
          //   </CustomButton>
          // </Stack>
          // <Stack
          //   onMouseLeave={handleMouseLeave}
          //   direction="row"
          //   alignSelf="center"
          //   alignItems="center"
          //   justifyContent="space-between"
          //   sx={{
          //     marginTop: "11px",
          //     backgroundColor: handleBackgroundColor(),
          //     borderRadius: "10px",
          //     width: "100%",
          //   }}
          // >
          //   <CustomButton onClick={(e) => decrementHandler(e)}>
          //     <RemoveIcon
          //       sx={{
          //         fontSize: { xs: "15px", md: "20px" },
          //         transition: "all ease 0.5s",
          //       }}
          //     />
          //   </CustomButton>

          //   {updateLoading ? (
          //     <Stack width="50px">
          //       <Loading color={theme.palette.primary.main} />
          //     </Stack>
          //   ) : (
          //     <Typography
          //       onClick={(e) => e.stopPropagation()}
          //       textAlign="center"
          //       sx={{
          //         width: { xs: "30px", md: "50px" },
          //         transition: "all ease 0.5s",
          //       }}
          //     >
          //       {count}
          //     </Typography>
          //   )}

          //   <CustomButton fill="true" onClick={(e) => incrementHandler(e)}>
          //     <AddIcon
          //       sx={{
          //         fontSize: { xs: "15px", md: "20px" },
          //         transition: "all ease 0.5s",
          //       }}
          //     />
          //   </CustomButton>
          // </Stack>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* <Stack
              onMouseLeave={handleMouseLeave}
              direction="row"
              alignSelf="center"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                marginTop: { xs: "0", md: "11px" },
                backgroundColor: handleBackgroundColor(),
                borderRadius: "10px",
                width: "80%",
                height: { xs: "40px", md: "auto" },
              }}
            > */}
            <Stack
              onMouseLeave={handleMouseLeave}
              direction="row"
              alignSelf="center"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                marginTop: { xs: "0", md: "11px" },
                backgroundColor: handleBackgroundColor(),
                borderRadius: "4px",
                width: { xs: "100%", md: "80%" },
                height: { xs: "40px", md: "auto" },
              }}
            >
              <CustomButton onClick={(e) => decrementHandler(e)}>
                <RemoveIcon
                  sx={{
                    fontSize: { xs: "15px", md: "20px" },
                    transition: "all ease 0.5s",
                  }}
                />
              </CustomButton>

              {updateLoading ? (
                <Stack width="50px">
                  <Loading color={theme.palette.primary.main} />
                </Stack>
              ) : (
                <Typography
                  onClick={(e) => e.stopPropagation()}
                  textAlign="center"
                  sx={{
                    width: { xs: "30px", md: "50px" },
                    transition: "all ease 0.5s",
                  }}
                >
                  {count}
                </Typography>
              )}

              <CustomButton fill="true" onClick={(e) => incrementHandler(e)}>
                <AddIcon
                  sx={{
                    fontSize: { xs: "15px", md: "20px" },
                    transition: "all ease 0.5s",
                  }}
                />
              </CustomButton>
            </Stack>
          </Box>
        );
      } else {
        return (
          <>
            {isLoading ? (
              // <Stack
              //   alignItems="center"
              //   justifyContent="center"
              //   sx={{
              //     backgroundColor: (theme) => theme.palette.neutral[100],

              //     color: (theme) => theme.palette.primary.main,
              //     height: { xs: "25px", md: "35px" },
              //     width: { xs: "25px", md: "35px" },
              //     borderRadius: "5px",
              //     transition: "all ease 0.5s",
              //     marginTop: "23px",
              //     border: (theme) =>
              //       "1px solid ${alpha(theme.palette.neutral[400], 0.2)}",
              //   }}
              // >
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundColor: (theme) => theme.palette.neutral[100],

                  color: (theme) => theme.palette.primary.main,
                  height: { xs: "25px", md: "35px" },
                  width: { xs: "100%", md: "100%" },
                  borderRadius: "5px",
                  transition: "all ease 0.5s",
                  marginTop: "12px",
                  border: (theme) =>
                    "1px solid ${alpha(theme.palette.neutral[400], 0.2)}",
                }}
              >
                <Loading color={theme.palette.primary.main} />
              </Stack>
            ) : (
              <PrimaryToolTip text="Add to cart">
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: { lg: "10px" },
                  }}
                  onMouseEnter={handleMouseEnter}
                >
                  <ShopNowButton
                    onClick={(e) => handleCart(e)}
                    sx={{
                      width: "100%",
                      height: "38px",
                      minHeight: "38px",
                      padding: "1px 0",
                      margin: 0,
                      // mt: "20px",
                      "&:hover": { backgroundColor: "#FF6159" },
                    }}
                  >
                    <Typography color="white">Add to Cart</Typography>
                  </ShopNowButton>
                </Box>
              </PrimaryToolTip>
            )}
          </>
        );
      }
    }
  };

  return <>{cardWiseManage()}</>;
};

AddWithIncrementDecrement.propTypes = {};

export default AddWithIncrementDecrement;
