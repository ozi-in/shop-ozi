// import React from "react";
// import { Box, Grid, Typography } from "@mui/material";
// import { FaClock, FaShieldAlt, FaGem, FaHandsHelping } from "react-icons/fa";

// const featureData = [
//   {
//     icon: <img src="/parent_img_1.png" alt="Safe icon" width={32} height={32} />,
//     title: "Lightning Fast Delivery",
//     description:
//       "Get your baby essentials delivered in 10–30 minutes, because little ones can't wait!",
//   },
//   {
//     icon: <img src="/parent_img_2.png" alt="Certified icon" width={32} height={32} />,
//     title: "100% Safe & Certified",
//     description:
//       "All products are safety tested, certified, and approved by pediatricians.",
//   },
//   {
//     icon: <img src="/parent_img_3.png" alt="Premium Quality icon" width={32} height={32} />,
//     title: "Premium Quality",
//     description:
//       "Only the best brands and highest quality products for your precious little one.",
//   },
//   {
//     icon: <img src="/parent_img_4.png" alt="Support icon" width={32} height={32} />,
//     title: "24/7 Parent Support",
//     description:
//       "Expert parent support team available round the clock for any queries or concerns.",
//   },
// ];

// const WhyParentsChoose = () => {
//   return (
//     <Box sx={{ p: 2, backgroundColor: "#F9FAFB", borderRadius: "16px" }}>
//       <Typography variant="h6" fontWeight="bold" mb={2}>
//         Why Parents Choose <span style={{ color: "#FF5757" }}>OZi</span>
//       </Typography>

//       <Grid container spacing={2}>
//         {featureData.map((item, index) => (
//           <Grid item xs={6} key={index}>
//             <Box
//               sx={{
//                 backgroundColor: "#F3F4F6", // light grey
//                 borderRadius: "12px",
//                 padding: "16px",
//                 minHeight: "140px",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "start",
//                 gap: 1,
//                 boxShadow: "0px 1px 4px rgba(0,0,0,0.05)",
//               }}
//             >
//               <Box sx={{ color: "#333" }}>{item.icon}</Box>
//               <Typography variant="subtitle2" fontWeight="bold">
//                 {item.title}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {item.description}
//               </Typography>
//             </Box>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default WhyParentsChoose;

import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { FaClock, FaShieldAlt, FaGem, FaHandsHelping } from "react-icons/fa";

const featureData = [
  {
    icon: (
      <img src="/parent_img_1.png" alt="Safe icon" width={32} height={32} />
    ),
    title: "Lightning Fast Delivery",
    description:
      "Get your baby essentials delivered in 10–30 minutes, because little ones can't wait!",
  },
  {
    icon: (
      <img
        src="/parent_img_2.png"
        alt="Certified icon"
        width={32}
        height={32}
      />
    ),
    title: "100% Safe & Certified",
    description:
      "All products are safety tested, certified, and approved by pediatricians.",
  },
  {
    icon: (
      <img
        src="/parent_img_3.png"
        alt="Premium Quality icon"
        width={32}
        height={32}
      />
    ),
    title: "Premium Quality",
    description:
      "Only the best brands and highest quality products for your precious little one.",
  },
  {
    icon: (
      <img src="/parent_img_4.png" alt="Support icon" width={32} height={32} />
    ),
    title: "24/7 Parent Support",
    description:
      "Expert parent support team available round the clock for any queries or concerns.",
  },
];

const WhyParentsChoose = () => {
  return (
    <Box sx={{ py: 2, backgroundColor: "#F9FAFB", borderRadius: "16px" }}>
      <Typography
        variant="h2"
        color="#364153"
        fontSize={{ xs: "28px", md: "54px" }}
        fontWeight="bold"
        textAlign={{ xs: "center", md: "left" }}
        mb={4}
      >
        Why Parents Choose <span style={{ color: "#FF5757" }}>OZi</span>
      </Typography>

      <Grid container spacing={2}>
        {featureData.map((item, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Box
              sx={{
                backgroundColor: "#F3F4F6", // light grey
                borderRadius: "16px",
                padding: "16px",
                minHeight: { xs: "300px", sm: "140px" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                gap: 2,
                boxShadow: "0px 1px 4px rgba(0,0,0,0.05)",
              }}
            >
              <Box
                sx={{
                  color: "#1E2939", // dark grey
                  backgroundColor: "#fff",
                  borderRadius: "90px",
                  padding: "8px",
                  width: "44px",
                  height: "44px",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                {item.icon}
              </Box>
              <Typography
                variant="subtitle2"
                fontSize="20px"
                fontWeight="bold"
                color="#1E2939"
              >
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                color="#1E2939"
                fontSize="16px"
                lineHeight="21px"
              >
                {item.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WhyParentsChoose;