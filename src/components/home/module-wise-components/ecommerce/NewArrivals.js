import styled from "@emotion/styled";
import {
  Grid,
  Skeleton,
  useMediaQuery,
  useTheme,
  IconButton,
  Box,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import useNewArrivals from "../../../../api-manage/hooks/react-query/product-details/useNewArrivals";
import { CustomStackFullWidth } from "styled-components/CustomStyles.style";
import MenuSimmer from "../../../Shimmer/MenuSimmer";
import ProductCard from "../../../cards/ProductCard";
import H2 from "../../../typographies/H2";
import { HomeComponentsWrapper } from "../../HomePageComponents";
import TabMenu from "../../best-reviewed-items/TabMenu";

const NewArrivals = ({ bannerData, title }) => {
  const [menu, setMenu] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const bannerCount = bannerData?.new_arrival_section_banner ? 8 : 10;
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const { data, refetch, isLoading } = useNewArrivals();

  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.only("sm"));
  const scrollRef = useRef();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data?.categories && data?.products) {
      setMenu(["All", ...data.categories.map((c) => c.name)]);
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

  return (
    <HomeComponentsWrapper
      justifyContent="center"
      alignItems="center"
      mt="30px"
    >
      <CustomStackFullWidth
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {isLoading ? (
          <Skeleton variant="text" width="110px" />
        ) : (
          <H2 text={title ? title : "New Arrivals"} component="h2" />
        )}
        <TopRightControls>
          <ArrowButton onClick={() => scroll("left")} aria-label="scroll left">
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
            <MenuSimmer count={12} />
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
              {filteredData.length > 0 &&
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
                      isFrom="new-arival"
                    />
                  </Grid>
                ))}
            </Grid>
          </ScrollableContainer>
        </SlideWrapper>
      </Box>
    </HomeComponentsWrapper>
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
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(2), // 👈 adds ~16px left space on mobile only
  },
}));

export default NewArrivals;
