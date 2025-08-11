// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Grid,
//   Skeleton,
//   Stack,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import { useTheme } from "@emotion/react";
// import styled from "@emotion/styled";
// import H2 from "components/typographies/H2";
// import { t } from "i18next";
// import Link from "next/link";
// import CustomContainer from "components/container";
// import { CustomStackFullWidth } from "styled-components/CustomStyles.style";
// import { useRouter } from "next/router";
// import { useDispatch, useSelector } from "react-redux";
// import useGetBrandsList from "api-manage/hooks/react-query/brands/useGetBrandsList";
// import { setBrands } from "redux/slices/brands";
// import AtoZ from "sort/AtoZ";
// import BrandCard from "./BrandCard";
// import { getModuleId } from "helper-functions/getModuleId";

// const CustomSkeleton = styled(Skeleton)(({ theme }) => ({
//   background: theme.palette.background.sklenton,
//   maxWidth: "100%",
// }));

// const ScrollContainer = styled(Box)`
//   overflow: hidden;
//   position: relative;
//   width: 100%;
// `;

// const ScrollTrack = styled(Box)`
//   display: flex;
//   gap: 1rem;
//   animation: scroll-desktop 10s linear infinite;

//   @keyframes scroll-desktop {
//     0% { transform: translateX(0); }
//     100% { transform: translateX(-50%); }
//   }

//   @media (max-width: 991px) {
//     animation: scroll-mobile 15s linear infinite;
//   }

//   @keyframes scroll-mobile {
//     0% { transform: translateX(0); }
//     100% { transform: translateX(-100%); }
//   }
// `;

// const DuplicateTrack = styled(Box)`
//   display: flex;
//   gap: 1rem;
// `;

// const CustomBrandCard = styled(Box)(({ theme }) => ({
//   borderRadius: "10px",
//   padding: "10px",
//   background: theme.palette.background.default,
//   border: `1px solid ${theme.palette.divider}`,
//   transition: "all ease .1s",
//   ":hover": {
//     boxShadow: theme.shadows[14],
//   },
// }));

// const Brands = ({ viewAll }) => {
//   const theme = useTheme();
//   const tabScreen = useMediaQuery("(max-width: 991px)");
//   const { brands: data } = useSelector((state) => state.brands);
//   const { configData } = useSelector((state) => state.configData);
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const handleSuccess = (response) => {
//     dispatch(setBrands(response));
//   };
//   const { refetch, isLoading, isFetching } = useGetBrandsList(handleSuccess);

//   // Grab moduleId once and re-fetch when it changes
//   const moduleId = getModuleId();
//   useEffect(() => {
//     refetch();
//   }, [moduleId, refetch]);

//   useEffect(() => {
//     if (!isLoading && !isFetching && data?.length === 0 && viewAll) {
//       router.push("/home");
//     }
//   }, [isLoading, isFetching, data, viewAll, router]);

//   const baseUrl = configData?.base_urls?.brand_image_url;

//   // Sorting
//   const [sortBy, setSortBy] = useState("Default");
//   const [filteredData, setFilteredData] = useState(data);

//   useEffect(() => {
//     if (!data) return;
//     let sorted = [...data];
//     if (sortBy === "AtoZ") {
//       sorted.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortBy === "ZtoA") {
//       sorted.sort((a, b) => b.name.localeCompare(a.name));
//     }
//     setFilteredData(sorted);
//   }, [data, sortBy]);

//   // Full Page View
//   if (viewAll) {
//     return (
//       <Box paddingBlock="32px">
//         <CustomContainer>
//           {filteredData?.length > 0 ? (
//             <Stack
//               direction="row"
//               flexWrap="wrap"
//               justifyContent="space-between"
//               marginBottom="30px"
//               paddingBottom="20px"
//               borderBottom={`1px solid ${theme.palette.divider}`}
//               gap={2}
//             >
//               <Box width={{ xs: "100%", sm: "0" }} flexGrow="1">
//                 <H2 text="Brands" textAlign="left" component="h2" />
//                 <Typography variant="body1">
//                   {t("Explore the Trusted and Trendsetting Brands")}
//                 </Typography>
//               </Box>
//               <AtoZ handleSortBy={setSortBy} sortBy={sortBy} />
//             </Stack>
//           ) : isLoading || isFetching ? (
//             <>
//               <CustomSkeleton variant="text" width="80px" />
//               <CustomSkeleton variant="text" width="60px" />
//             </>
//           ) : null}

//           {filteredData?.length > 0 && !isLoading && !isFetching && (
//             <Grid container spacing={2}>
//               {filteredData.map((item) => (
//                 <Grid item xs={6} md={3} key={item.id}>
//                   <CustomBrandCard>
//                     <BrandCard
//                       name={item.name}
//                       image={item.image_full_url}
//                       stock={item.items_count}
//                       id={item.id}
//                       baseUrl={baseUrl}
//                       items_count={item.items_count}
//                     />
//                   </CustomBrandCard>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </CustomContainer>
//       </Box>
//     );
//   }

//   // Section View (Infinite Scroll)
//   return (
//     <>
//       <CustomStackFullWidth
//         justifyContent="center"
//         flexDirection="row"
//       >
//         {data?.length > 0 ? (
//           <>
//             <H2
//               text={
//                 tabScreen
//                   ? "Top-Rated Brands By Parents"
//                   : "Top-Rated Brands By Parents"
//               }
//               component="h2"
//             />
//             {tabScreen && (
//               <Link href="/all-brands" passHref>

//               </Link>
//             )}
//           </>
//         ) : (
//           <>
//             <Skeleton variant="text" width="80px" />
//             <Skeleton variant="text" width="60px" />
//           </>
//         )}
//       </CustomStackFullWidth>

//       <Box sx={{ pt: 2 }}>
//         {data?.length > 0 && !isLoading && !isFetching && (
//           <ScrollContainer>
//             <ScrollTrack>
//               {[0, 1].map((loop) => (
//                 <DuplicateTrack key={loop}>
//                   {data.map((item) => (
//                     <Box
//                       key={`${loop}-${item.id}`}
//                       sx={{
//                         minWidth: tabScreen ? 200 : 280,
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         textAlign: "center",
//                       }}
//                     >
//                       <BrandCard
//                         name={item.name}
//                         image={item.image_full_url}
//                         stock={item.items_count}
//                         id={item.id}
//                         baseUrl={baseUrl}
//                         items_count={item.items_count}
//                       />
//                     </Box>
//                   ))}
//                 </DuplicateTrack>
//               ))}
//             </ScrollTrack>
//           </ScrollContainer>
//         )}
//       </Box>
//     </>
//   );
// };

// export default Brands;

import React, { useEffect, useRef, useState } from "react";

const CampaignBanners = () => {
  const bannersData = [
    {
      id: 1,
      title: "Cetafill",
      image:
        "https://i.ibb.co/cKTtHtB1/f7e8dc0c053a86dd9edf3638a7ae3247d0071545.png",
      link: "/product/1",
    },
    {
      id: 2,
      title: "chicco",
      image:
        "https://i.ibb.co/GvVrP1qS/e1941f4b5d1cabba2f21f9a0b420b9715833fba7.png",
      link: "/product/2",
    },
    {
      id: 3,
      title: "pampers",
      image:
        "https://i.ibb.co/fVR42TxS/c245372bf7cd5e81465478e38cdc2341ec5c230a.png",
      link: "/product/3",
    },
    {
      id: 4,
      title: "Himalaya",
      image:
        "https://i.ibb.co/35dHwgKY/4610172c1133faa562b30d7ba9fef905e7d996c7.png",
      link: "/product/4",
    },
    {
      id: 5,
      title: "mama earth",
      image:
        "https://i.ibb.co/9HNXPTG5/05ad1ffd70a860d88c32f436e704db98a671786d.png",
      link: "/product/5",
    },
    {
      id: 6,
      title: "jonhson's baby",
      image:
        "https://i.ibb.co/bRzxnTSx/5a01cdf605e15ea40a80ede06c88047e2c82a8cb.png",
      link: "/product/6",
    },
    // new add kiya hai
    {
      id: 7,
      title: "Aptamil",
      image: "https://i.ibb.co/xS8VjgwG/Aptamilll.png",
      link: "/product/6",
    },
    {
      id: 8,
      title: "Bambo nature",
      image: "https://i.ibb.co/3mTZsg79/banm.png",
      link: "/product/6",
    },
    {
      id: 9,
      title: "House and kinder",
      image: "https://i.ibb.co/gbhQbLpG/kinder-haus-logo-png-transparent.png",
      link: "/product/6",
    },
    {
      id: 10,
      title: "philips",
      image: "https://i.ibb.co/tM5HL4Gz/R.jpg",
      link: "/product/6",
    },
    {
      id: 11,
      title: "Dr Brown",
      image: "https://i.ibb.co/jkPkJytR/Dr-Browns-Company-Logo.png",
      link: "/product/6",
    },
    {
      id: 12,
      title: "Rabbit",
      image: "https://i.ibb.co/gbg9Ht8s/rabit1.png",
      link: "/product/6",
    },
    {
      id: 13,
      title: "Mother spra",
      image:
        "https://i.ibb.co/TfbWM5n/new-logo-e3f4d18e-a9c0-43d9-b91a-5a1c154b1b93.webp",
      link: "/product/6",
    },
    {
      id: 14,
      title: "Mammy poko",
      image:
        "https://i.ibb.co/RG0YNdVL/de9b84a4-b8c1-4a85-b57f-5081ca2cdb78.png",
      link: "/product/6",
    },

    {
      id: 15,
      title: "Musteler",
      image: "https://i.ibb.co/gZvfb7HQ/mustlee.png",
      link: "/product/6",
    },

    {
      id: 16,
      title: "Nestly",
      image: "https://i.ibb.co/W42H5jGM/Nestle-Logo-Transparent-Free-PNG.png",
      link: "/product/6",
    },

    {
      id: 17,
      title: "Similac",
      image: "https://i.ibb.co/67GSmn9K/similac-logo.png",
      link: "/product/6",
    },

    {
      id: 19,
      title: "Pegion ",
      image: "https://i.ibb.co/ZR6gx158/pigennnnnnnn.png",
      link: "/product/6",
    },

    {
      id: 20,
      title: "Sebamed",
      image: "https://i.ibb.co/qYRq4jWN/sebaaa.png",
      link: "/product/6",
    },
  ];

  const containerRef = useRef(null);
  const scrollContentRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Media query check
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollStep = 0.5;
    const scrollDelay = 16;

    const scroll = () => {
      if (!container || !scrollContentRef.current) return;

      container.scrollLeft += scrollStep;

      const totalScrollWidth = scrollContentRef.current.scrollWidth / 2;

      if (container.scrollLeft >= totalScrollWidth) {
        container.scrollLeft = 0;
      }
    };

    const interval = setInterval(scroll, scrollDelay);
    return () => clearInterval(interval);
  }, []);

  const bannerBoxStyle = {
    width: isDesktop ? "180px" : "160px",
    height: isDesktop ? "100px" : "80px",
    marginRight: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // cursor: "pointer",
    transition: "transform 0.3s ease",
    backgroundColor: "transparent",
  };

  const imageStyle = {
    maxWidth: isDesktop ? "140px" : "120px",
    maxHeight: isDesktop ? "70px" : "50px",
    objectFit: "contain",
    mixBlendMode: "multiply", // corrected
    backgroundColor: "transparent",
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "20px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "600",
          marginBottom: "12px",
          color: "#333",
        }}
      >
        Top-Rated Brands by Parents
      </div>

      {/* Scrollable Banner Container */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <div
          ref={scrollContentRef}
          style={{
            display: "inline-flex",
          }}
        >
          {[...bannersData, ...bannersData].map((item, index) => (
            <div
              key={index}
              style={bannerBoxStyle}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img src={item.image} alt={item.title} style={imageStyle} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignBanners;
