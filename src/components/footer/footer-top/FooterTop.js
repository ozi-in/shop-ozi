// import {
// 	alpha,
// 	Grid,
// 	Stack,
// 	Typography,
// 	useMediaQuery,
// 	useTheme,
// } from "@mui/material";
// import { Box } from "@mui/system";
// import CustomContainer from "../../container";
// import { StyledFooterTop } from "../Footer.style";
// import Subscribe from "./Subscribe";
// import SubscribeImage from "./SubscribeImage";

// const FooterTop = (props) => {
// 	const { landingPageData } = props;

// 	const theme = useTheme();
// 	const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

// 	return (
// 		<>
// 			<StyledFooterTop>
// 				<CustomContainer>
// 					<Grid
// 						container
// 						alignItems="flex-end"
// 						justifyContent="center"
// 						sx={{ height: "100%" }}
// 					>
// 						<Grid item xs={8} sm={6} md={3} position="relative">
// 							<Box
// 								sx={{
// 									mt: "-65px",
// 									textAlign: { xs: "center", md: "left" },
// 									ml: { md: "-30px" },
// 									position: { sm: "absolute", bottom: "5px" },
// 								}}
// 							>
// 								<SubscribeImage />
// 							</Box>
// 						</Grid>
// 						<Grid
// 							item
// 							xs={12}
// 							sm={6}
// 							md={9}
// 							container
// 							alignItems="center"
// 							justifyContent="center"
// 							sx={{
// 								py: 3,
// 								pl: { lg: 2 },
// 								pb: { lg: 4 },
// 							}}
// 						>
// 							<Grid
// 								item
// 								xs={12}
// 								sm={12}
// 								md={5}
// 								align={isSmall ? "center" : "left"}
// 							>
// 								<Stack
// 									height="100%"
// 									alignItems={isSmall ? "center" : "flex-start"}
// 									justifyContent="center"
// 									spacing={1}
// 									p="10px"
// 									pt={0}
// 								>
// 									<Typography
// 										fontWeight={700}
// 										fontSize={{ xs: "1rem", md: "2.25rem" }}
// 										component="h2"
// 									>
// 										{landingPageData?.fixed_newsletter_title}
// 									</Typography>
// 									<Typography
// 										variant="h7"
// 										fontSize={{ xs: "12px", md: "14px" }}
// 										fontWeight="400"
// 										sx={{
// 											color: (theme) =>
// 												alpha(theme.palette.neutral[500], 0.8),
// 										}}
// 										component="p"
// 									>
// 										{landingPageData?.fixed_newsletter_sub_title}
// 									</Typography>
// 								</Stack>
// 							</Grid>
// 							<Grid item xs={12} sm={12} md={7}>
// 								<Stack
// 									alignItems="end"
// 									justifyContent="flex-end"
// 									sx={{ ml: { md: 6 } }}
// 								>
// 									<Subscribe />
// 								</Stack>
// 							</Grid>
// 						</Grid>
// 					</Grid>
// 				</CustomContainer>
// 			</StyledFooterTop>
// 		</>
// 	);
// };

// FooterTop.propTypes = {};

// export default FooterTop;
import {
  alpha,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import CustomContainer from "../../container";
import { StyledFooterTop } from "../Footer.style";
import Subscribe from "./Subscribe";
import SomeInfo from "../footer-middle/SomeInfo";
import ractangle from "../../../../public/static/footer/Rectangle.svg";
import magnifying from "../../../../public/static/footer/magnifying.svg";
import phone from "../../../../public/static/footer/phone.svg";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import LocationViewOnMap from "../../Map/location-view/LocationViewOnMap";

const FooterTop = (props) => {
  const { landingPageData, configData } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleOpenCloseMap = () => {
    setOpen(!open);
  };

  return (
    <StyledFooterTop>
      <CustomContainer>
        <Grid
          container
          alignItems="flex-end"
          justifyContent="center"
          sx={{ height: "100%" }}
        >
          <Grid container spacing={2}>
            {/* RIGHT SIDE - JOIN US + SUBTITLE + SUBSCRIBE BAR */}
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Stack spacing={2} sx={{ color: "#364153" }}>
                <Typography
                  fontWeight={700}
                  fontSize={{ xs: "1.5rem", md: "2.25rem" }}
                  component="h2"
                >
                  {landingPageData?.fixed_newsletter_title || "Join Us"}
                </Typography>
                <Typography
                  fontSize={{ xs: "14px", md: "16px" }}
                  fontWeight={400}
                  sx={{
                    color: (theme) => alpha(theme.palette.neutral[500], 0.8),
                  }}
                  component="p"
                >
                  {
                    "Be the first to know about new arrivals, app-only deals & helpful tips — no spam, just what you need."
                  }
                </Typography>
                {/* <Subscribe /> */}
              </Stack>
            </Grid>

            {/* LEFT SIDE - 3 TILES */}
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Grid container spacing={2}>
                {/* First row - 2 items (half width on mobile) */}
                <Grid item xs={6} sm={4}>
                  <SomeInfo
                    image={ractangle}
                    alt="rantangle"
                    title="Send us A Messege"
                    info={configData?.email}
                    t={t}
                    href={`mailto:${configData?.email}`}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <SomeInfo
                    image={phone}
                    alt="Phone"
                    title="Contact us"
                    info={configData?.phone}
                    t={t}
                    href={`tel:${configData?.phone}`}
                  />
                </Grid>

                {/* Second row - 1 item full width on mobile */}
                <Grid item xs={12} sm={4}>
                  <Box onClick={handleOpenCloseMap}>
                    <SomeInfo
                      image={magnifying}
                      alt="magnifying"
                      title="Find us At"
                      info={configData?.address}
                      t={t}
                      href={false}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {open && (
            <LocationViewOnMap
              open={open}
              handleClose={handleOpenCloseMap}
              latitude={configData?.default_location?.lat}
              longitude={configData?.default_location?.lng}
              address={configData?.address}
              isFooter
            />
          )}
        </Grid>
      </CustomContainer>
    </StyledFooterTop>
  );
};

FooterTop.propTypes = {};

export default FooterTop;
