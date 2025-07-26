import { Skeleton, styled } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import useGetBanners from "../../../../api-manage/hooks/react-query/useGetBanners";
import { getCurrentModuleType } from "../../../../helper-functions/getCurrentModuleType";
import { getModuleId } from "../../../../helper-functions/getModuleId";
import { ModuleTypes } from "../../../../helper-functions/moduleTypes";
import { setBanners } from "../../../../redux/slices/storedData";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../../CustomImageContainer";
import { getImageUrl } from "utils/CustomFunctions";
import { Typography } from "@mui/material";

const BannersWrapper = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  borderRadius: "10px",
  width: "1280px",
  maxWidth: "100%",
  height: "450px",
  position: "relative",
  overflow: "hidden",
  margin: "0 auto", // center the banner
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  '&:hover img': {
    transform: 'scale(1.1)',
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    height: "300px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "180px",
  },
}));

const SliderIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
  gap: theme.spacing(1),
}));
const Pill = styled(Box)(({ theme }) => ({
  background: '#FF6259', // Ozi Peach
  color: '#fff',
  borderRadius: '16px',
  padding: '2px 10px',
  fontSize: 14,
  fontWeight: 700,
  minWidth: 36,
  textAlign: 'center',
  display: 'inline-block',
}));
const Dot = styled(Box)(({ theme, active }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  background: active ? '#FF6259' : '#BE1C34', // Ozi Peach for active, Ozi Red for inactive
  margin: '0 2px',
  display: 'inline-block',
  transition: 'background 0.2s',
}));

const CampaignBannersSecondary = () => {
  const router = useRouter();
  const { selectedModule } = useSelector((state) => state.utilsData);
  const { banners } = useSelector((state) => state.storedData);
  const { data, refetch: refetchBannerData, isFetched } = useGetBanners();
  const [bannersData, setBannersData] = useState([]);
  const [foodBanner, setFoodBanner] = useState();
  const [openModal, setOpenModal] = useState(false);
  const { configData } = useSelector((state) => state.configData);
  const [currentSlide, setCurrentSlide] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    if (banners.campaigns.length === 0) {
      refetchBannerData();
    }
  }, [banners]);
  useEffect(() => {
    if (data?.campaigns) {
      dispatch(setBanners(data));
    }
  }, [data]);
  useEffect(() => {
    if (banners.banners.length > 0) {
      handleBannersData();
    }
  }, [banners]);

  const handleBannersData = () => {
    let mergedBannerData = [];
    if (banners?.banners?.length > 0) {
      banners?.banners?.forEach((item) => mergedBannerData.push(item));
    }
    setBannersData(mergedBannerData);
  };
  const handleBannerClick = (banner) => {
    if (banner?.type === "default") {
      router.push(banner?.link);
    }
    if (banner?.type === "store_wise") {
      router.push(
        {
          pathname: "/store/[id]",
          query: {
            id: `${
              banner?.store?.slug ? banner?.store?.slug : banner?.store?.id
            }`,
            module_id: `${getModuleId()}`,
            store_zone_id: `${banner?.store?.zone_id}`,
          },
        },
        undefined,
        { shallow: true }
      );
    } else {
      if (banner?.type === "item_wise") {
        if (selectedModule?.module_type === "food") {
          setFoodBanner(banner?.item);
          setOpenModal(true);
        } else {
          router.push(
            {
              pathname: "/product/[id]",
              query: {
                id: `${
                  banner?.item?.slug ? banner?.item?.slug : banner?.item?.id
                }`,
                module_id: `${getModuleId()}`,
              },
            },
            undefined,
            { shallow: true }
          );
        }
      }
    }
  };
  const handleModalClose = () => {
    setOpenModal(false);
    //setBannerData(null);
  };

  const getModuleWiseBanners = () => {
    // switch (getCurrentModuleType()) {
    //   case ModuleTypes.GROCERY:
    //     if (bannersData.length > 1) {
    //       return 2;
    //     } else {
    //       return 1;
    //     }
    //   case ModuleTypes.PHARMACY:
    //     if (bannersData.length === 1) {
    //       return 1;
    //     } else if (bannersData.length === 2) {
    //       return 2;
    //     } else {
    //       return 3;
    //     }
    //   case ModuleTypes.ECOMMERCE:
    //     if (bannersData.length > 1) {
    //       return bannersData.length;
    //     } else {
    //       return 1;
    //     }
    // }
    return 1
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: getModuleWiseBanners(),
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    cssEase: "linear",
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {!isFetched ? (
          <CustomStackFullWidth
              sx={{
                mt: "30px",
                "& .slick-list": {
                  marginRight: { xs: "-10px", sm: "-20px" },
                },
                "& .slick-slide": {
                  paddingRight: { xs: "10px", sm: "20px" },
                },
              }}
          >
                <Slider {...settings}>
                  {[...Array(2)].map((_, index) => (
                      <BannersWrapper key={index}>
                        <Skeleton
                            variant="rectangular"
                            height="100%"
                            width="100%"
                        />
                      </BannersWrapper>
                  ))}
                </Slider>
          </CustomStackFullWidth>
      ) : (
          bannersData?.length > 0 && (
              <>
                  <CustomStackFullWidth
                      sx={{
                        mt: "30px",
                        "& .slick-list": {
                          marginRight: { xs: "-10px", sm: "-20px" },
                        },
                        "& .slick-slide": {
                          paddingRight: { xs: "10px", sm: "20px" },
                        },
                      }}
                  >
                      <Slider {...settings}>
                        {bannersData.map((item, index) => (
                            <BannersWrapper
                                key={index}
                                onClick={() => handleBannerClick(item)}
                            >
                              <CustomImageContainer
                                  src={item?.image_full_url}
                                  alt={item?.title}
                                  height="450px"
                                  width="1280px"
                                  objectfit="cover"
                                  borderRadius="10px"
                              />
                            </BannersWrapper>
                        ))}
                      </Slider>
                  </CustomStackFullWidth>
              </>
          )
      )}


    </>
  );
};

CampaignBannersSecondary.propTypes = {};

export default CampaignBannersSecondary; 