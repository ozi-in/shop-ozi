// // import { Box, Button, Typography, Grid } from "@mui/material";
// // import Image from "next/image";
// // // import bannerImage from "@/public/banner.png";

// // export default function HeroBanner() {
// //   return (
// //     <Box
// //       sx={{
// //         width: "100%",

// //         background: "linear-gradient(90deg, #7F74FF 0%, #65C8FF 100%)",
// //         borderBottomLeftRadius: "24px",
// //         borderBottomRightRadius: "24px",

// //         // overflow: "hidden",
// //       }}
// //     >
// //       <Grid container alignItems="center"   >
// //         {/* Left Content */}
// //         <Grid item sx={{ flex: 1, padding: "20px", color: "white" }}>
// //           <Typography
// //             variant="caption"
// //             sx={{
// //               color: "white",
// //               background: "rgba(255,255,255,0.2)",
// //               borderRadius: "20px",
// //               padding: "4px 12px",
// //               display: "inline-block",
// //               fontSize: "12px",
// //               marginBottom: "12px",
// //             }}
// //           >
// //             Trusted By 100+ Parents
// //           </Typography>

// //           <Typography
// //             variant="h3"
// //             fontWeight="bold"
// //             sx={{ color: "white", marginBottom: "12px" }}
// //           >
// //             Baby Essentials <br /> Delivered In 30 Minutes
// //           </Typography>

// //           <Typography
// //             variant="body1"
// //             sx={{ color: "white", marginBottom: "24px" }}
// //           >
// //             From Newborn Essentials To Growing Kid’s Needs – Delivered In 10–30 Minutes!
// //           </Typography>

// //           <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
// //             <Button
// //               variant="contained"
// //               sx={{
// //                 backgroundColor: "black",
// //                 color: "white",
// //                 borderRadius: "30px",
// //                 paddingX: "20px",
// //               }}
// //             >
// //               Shop Now
// //             </Button>

// //           </Box>
// //         </Grid>

// //         {/* Right Image */}
// //         <Grid item  sx={{ display: "flex", justifyContent: "flex-end" }}>
// //           <Box sx={{ justifyContent:"flex-end", color: "white" }}>
// //             <Image
// //               src="/hero-banner.svg"
// //               alt="Baby Essentials Box"
// //               width={300}
// //               height={300}
// //               style={{ maxWidth: "100%", borderRadius: "16px", maxHeight: "400px" }}
// //             />
// //           </Box>
// //         </Grid>
// //       </Grid>
// //     </Box>
// //   );
// // }

// import { Box, Button, Typography, Grid, useMediaQuery } from "@mui/material";
// import Image from "next/image";
// import { useTheme } from "@mui/material/styles";

// export default function HeroBanner() {
//   const theme = useTheme();
//   const isSmall = useMediaQuery(theme.breakpoints.down("md"));

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         background: "linear-gradient(90deg, #7F74FF 0%, #65C8FF 100%)",
//         borderBottomLeftRadius: "24px",
//         borderBottomRightRadius: "24px",
//         py: { xs: 6, md: 0 },
//         px: { xs: 2, md: 8 },
//         color: "white",
//       }}
//     >
//       <Grid container spacing={4} alignItems="center" justifyContent="space-between">
//         {/* Left Content */}
//         <Grid item xs={12} md={6}>
//           <Typography
//             variant="caption"
//             sx={{
//               background: "rgba(255, 255, 255, 0.2)",
//               borderRadius: "20px",
//               px: 2,
//               py: 0.5,
//               fontSize: "12px",
//               display: "inline-block",
//               mb: 2,
//             }}
//           >
//             Trusted by 100+ Parents
//           </Typography>

//           <Typography variant="h3" fontWeight="bold" sx={{ mb: 2, lineHeight: 1.2 }}>
//             Baby Essentials <br />
//             Delivered in 30 Minutes
//           </Typography>

//           <Typography variant="body1" sx={{ mb: 4, maxWidth: "90%" }}>
//             From newborn essentials to growing kid’s needs — all delivered in just 10–30 minutes!
//           </Typography>

//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "#101828",
//               borderRadius: "30px",
//               px: 4,
//               py: 1.5,
//               fontWeight: "bold",
//               fontSize: "1rem",
//               textTransform: "none",
//               "&:hover": {
//                 backgroundColor: "#1E293B",
//               },
//             }}
//           >
//             Shop Now
//           </Button>
//         </Grid>

//         {/* Right Image */}
// <Grid
//   item
//   xs={12}
//   md={6}
//   sx={{
//     textAlign: isSmall ? "center" : "right",
//     alignSelf: "flex-start", // ensures image is top-aligned
//   }}
// >
//   <Box sx={{ display: "inline-block", mt: 0 }}>
//     <Image
//       src="/baby4-removebg-preview.png"
//       alt="Baby Essentials"
//       width={400}
//       height={400}
//       style={{ maxWidth: "100%", height: "auto", verticalAlign: "top" }}
//       priority
//     />
//   </Box>
// </Grid>

//       </Grid>
//     </Box>
//   );
// }

import { Box, Button, Typography, Grid, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";

export default function HeroBanner() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        width: "100%",
        // background: "linear-gradient(90deg, #7F74FF 0%, #65C8FF 100%)",
        background:
          "linear-gradient(94.75deg, #FF6D66 43.28%, #EF76AA 120.69%)",
        borderBottomLeftRadius: "24px",
        borderBottomRightRadius: "24px",
        py: { xs: 6, md: 0 },
        px: { xs: 2, md: 8 },
        color: "white",
      }}
    >
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Left Content */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="caption"
            sx={{
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "20px",
              px: 2,
              py: 0.5,
              fontSize: "12px",
              display: "inline-block",
              mb: 2,
            }}
          >
            Trusted by 100+ Parents
          </Typography>

          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ mb: 2, lineHeight: 1.2 }}
          >
            Baby Essentials <br />
            Delivered in 30 Minutes
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, maxWidth: "90%" }}>
            From newborn essentials to growing kid’s needs — all delivered in
            just 10–30 minutes!
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#101828",
              borderRadius: "30px",
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#1E293B",
              },
            }}
          >
            Shop Now
          </Button>
        </Grid>

        {/* Right Image */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            textAlign: isSmall ? "center" : "right",
            alignSelf: "flex-start", // ensures image is top-aligned
          }}
        >
          <Box sx={{ position: "relative", mt: 6, width: "fit-content" }}>
            {/* Main Image */}
            <Image
              src="/mother-babyPreview.png"
              alt="Baby Essentials"
              width={600}
              height={600}
              style={{ height: "auto", verticalAlign: "top" }}
              priority
            />

            {/* Overlay Images in bottom-right */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translateX(20%)",
              }}
            >
              <Image
                src="/banner-detergent.png"
                alt="Detergent"
                width={200}
                height={200}
                style={{ height: "auto", display: "block" }}
                priority
              />
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translateX(80%)", // pushes second image just below the first
              }}
            >
              <Image
                src="/banner-Pampers.png"
                alt="Pampers"
                width={200}
                height={200}
                style={{ height: "auto", display: "block" }}
                priority
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
