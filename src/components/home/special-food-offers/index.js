//

import styled from "@emotion/styled";
import {
  Grid,
  Skeleton,
  useMediaQuery,
  useTheme,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useGetDiscountedItems from "../../../api-manage/hooks/react-query/product-details/useGetDiscountedItems";
import { getLanguage } from "helper-functions/getLanguage";
import { getModuleId } from "helper-functions/getModuleId";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "styled-components/CustomStyles.style";
import ProductCard from "../../cards/ProductCard";
import H2 from "../../typographies/H2";
import { HomeComponentsWrapper } from "../HomePageComponents";
import { useRouter } from "next/router";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import TabMenu from "../best-reviewed-items/TabMenu";
import SpecialOfferCardShimmer from "../../Shimmer/SpecialOfferCardSimmer";

const SpecialFoodOffers = ({ title }) => {
  const { t } = useTranslation();
  const params = {
    offset: 1,
    limit: 15,
  };
  const { data, refetch, isLoading } = useGetDiscountedItems(params);
  const [menu, setMenu] = useState(["All"]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.only("sm"));
  const scrollRef = useRef();
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data?.categories && data?.products) {
      setMenu(["All", ...data.categories.map((c) => c.name)]);
      setFilteredData(data.products);
    } else if (data?.products) {
      setFilteredData(data.products);
    }
  }, [data]);

  useEffect(() => {
    if (!data?.categories || !data?.products) return;
    if (selectedMenuIndex === 0) {
      setFilteredData(data.products);
    } else {
      const catId = data.categories[selectedMenuIndex - 1]?.id;
      const filtered = data.products.filter((p) => p.category_id === catId);
      setFilteredData(filtered);
    }
  }, [selectedMenuIndex, data]);

  const itemArrayManage = (arr) =>
    isMedium ? arr.slice(0, 6) : arr.slice(0, 8);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const to =
      direction === "left"
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;
    scrollRef.current.scrollTo({ left: to, behavior: "smooth" });
  };

  const navigateToHome = () => {
    router
      .push({
        pathname: "/home",
        query: {
          search: "special-offer",
          module_id: getModuleId(),
          data_type: "discounted",
        },
      })
      .then(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  };

  return (
    data?.products?.length > 0 && (
      <HomeComponentsWrapper
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        sx={{ cursor: "pointer" }}
      >
        <CustomStackFullWidth
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {isLoading ? (
            <Skeleton variant="text" width="110px" />
          ) : (
            <H2 text={title ? title : t("Deal of The Day ")} component="h2" />
          )}
          <TopRightControls>
            <ArrowButton
              onClick={() => scroll("left")}
              aria-label="scroll left"
            >
              <NavigateBeforeIcon fontSize="medium" />
            </ArrowButton>
            <ArrowButton
              onClick={() => scroll("right")}
              aria-label="scroll right"
            >
              <NavigateNextIcon fontSize="medium" />
            </ArrowButton>
          </TopRightControls>
        </CustomStackFullWidth>
        <CustomStackFullWidth
          justifyContent="center"
          alignItems="center"
          mt="8px"
        >
          <ScrollBox>
            {isLoading ? (
              <SpecialOfferCardShimmer count={12} />
            ) : (
              menu.length > 0 &&
              data?.categories?.length > 0 && (
                <TabMenu
                  selectedMenuIndex={selectedMenuIndex}
                  setSelectedMenuIndex={setSelectedMenuIndex}
                  menus={menu}
                />
              )
            )}
          </ScrollBox>
        </CustomStackFullWidth>
        <Box sx={{ position: "relative", width: "100%", mt: ".5rem" }}>
          <SlideWrapper>
            <ScrollableContainer ref={scrollRef}>
              <Grid container spacing={2} wrap="nowrap">
                {isLoading
                  ? Array.from({ length: 8 }).map((_, idx) => (
                      <Grid
                        item
                        key={idx}
                        sx={{
                          flex: "0 0 auto",
                          width: { xs: "48%", sm: "30%", md: "20%" },
                        }}
                      >
                        <SpecialOfferCardShimmer />
                      </Grid>
                    ))
                  : filteredData.length > 0 &&
                    itemArrayManage(filteredData).map((product) => (
                      <Grid
                        item
                        key={product.id}
                        sx={{
                          flex: "0 0 auto",
                          width: { xs: "48%", sm: "30%", md: "20%" },
                        }}
                      >
                        <ProductCard
                          item={product}
                          cardheight="350px"
                          cardFor="popular items"
                          noMargin
                          isFrom={`${title ? title : t("Deal of The Day ")}`}
                          dealTitle={`${title ? title : t("Deal of The Day ")}`}
                        />
                      </Grid>
                    ))}
              </Grid>
            </ScrollableContainer>
          </SlideWrapper>
        </Box>
      </HomeComponentsWrapper>
    )
  );
};

const TopRightControls = styled(Box)({
  display: "flex",
  gap: "8px",
});

// const ArrowButton = styled(IconButton)({
//   padding: 0,
//   background: "transparent",
//   boxShadow: "none",
//   "&:hover": {
//     background: "transparent",
//   },
// });
const ArrowButton = styled(IconButton)({
  minWidth: "32px",
  width: "32px",
  height: "32px",
  padding: 0,
  borderRadius: "50%",
  "&:hover": {
    backgroundColor: "#ff6259", // light hover background
  },
});

export const ScrollBox = styled(Box)({
  ".MuiTypography-root": { whiteSpace: "pre" },
  position: "relative",
  zIndex: 3,
});

const SlideWrapper = styled(Box)({
  position: "relative",
  width: "100%",
});

const ScrollableContainer = styled(Box)(({ theme }) => ({
  overflowX: "auto",
  scrollBehavior: "smooth",
  paddingBottom: theme.spacing(0),
  "&::-webkit-scrollbar": { display: "none" },
}));

export default SpecialFoodOffers;
