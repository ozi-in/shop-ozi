// import React from "react";
// import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
// import { Typography, alpha, useMediaQuery } from "@mui/material";
// import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
// import { ModuleTypes } from "../../helper-functions/moduleTypes";
// import { useTheme } from "@emotion/react";
// import { Box, Stack } from "@mui/system";
// import { t } from "i18next";
// import CustomContainer from "../container";
// import { useRouter } from "next/router";
// import FooterBottomItems from "./FooterBottomItems";

// const FooterBottom = (props) => {
//   const router = useRouter()
//   const handleClickToRoute = (href) => {
//     router.push(href, undefined, { shallow: true });
//   };
//   const { configData } = props;
//   const theme = useTheme();
//   const isXSmall = useMediaQuery(theme.breakpoints.down("sm"))
//   return (
//     <Box
//       sx={{
//         position: "relative",
//         width: "100%",
//         "&::before": {
//           content: '""',
//           position: "absolute",
//           inset: "0",
//           background: theme.palette.background.default,
//         },
//       }}
//     >
//       <CustomStackFullWidth
//         py="1rem"
//         justifyContent="center"
//         alignItems="center"
//         sx={{
//           position: "relative",
//           zIndex: "1",
//           backgroundColor:
//             getCurrentModuleType() === ModuleTypes?.FOOD
//               ? alpha(theme.palette.moduleTheme.food, 0.051)
//               : alpha(theme.palette.primary.main, 0.051),
//         }}
//       >
//         <CustomContainer>
//           <CustomStackFullWidth
//             direction={{ xs: "column", sm: "row", md: "row" }}
//             justifyContent={{ xs: "center", sm: "space-between", md: "space-between" }}
//             alignItems="center"
//           >
//             <Typography width="100%" textAlign={{ xs: "center", md: "start" }}>
//               {configData?.footer_text}
//             </Typography>
//             <>
//               {!isXSmall && <FooterBottomItems handleClickToRoute={handleClickToRoute} configData={configData} />}
//             </>
//           </CustomStackFullWidth>
//         </CustomContainer>
//       </CustomStackFullWidth>
//     </Box>
//   );
// };

// FooterBottom.propTypes = {};

// export default FooterBottom;
import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Typography, alpha, useMediaQuery } from "@mui/material";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import { ModuleTypes } from "../../helper-functions/moduleTypes";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/system";
import CustomContainer from "../container";
import { useRouter } from "next/router";
import FooterBottomItems from "./FooterBottomItems";

const FooterBottom = (props) => {
  const router = useRouter();
  const handleClickToRoute = (href) => {
    router.push(href, undefined, { shallow: true });
  };
  const { configData } = props;
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: "0",
          background: theme.palette.background.default,
        },
      }}
    >
      <CustomStackFullWidth
        py="1rem"
        justifyContent="center"
        alignItems="center"
        sx={{
          position: "relative",
          zIndex: "1",
          backgroundColor:
            getCurrentModuleType() === ModuleTypes?.FOOD
              ? "transparent"
              : alpha(theme.palette.primary.main, 0.051),
          [theme.breakpoints.down("sm")]: {
            backgroundColor: "transparent",
          },
        }}
      >
        <CustomContainer>
          <CustomStackFullWidth
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "start", sm: "center" }}
            spacing={{ xs: 1.5, sm: 0 }}
          >
            <Box flexShrink={0}>
              <FooterBottomItems
                handleClickToRoute={handleClickToRoute}
                configData={configData}
              />
            </Box>

            <Box>
              <Typography
                textAlign={{ xs: "center", sm: "start" }}
                fontSize="14px"
              >
                {/* {configData?.footer_text} */}
                Ozi is operated by Ozi Technologies Pvt Ltd (U46901HR2025PTC132282)
              </Typography>
            </Box>
          </CustomStackFullWidth>
        </CustomContainer>
      </CustomStackFullWidth>
    </Box>
  );
};

FooterBottom.propTypes = {};

export default FooterBottom;