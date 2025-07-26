import { AppBarStyle } from "./NavBar.style";
import {
  Card,
  NoSsr,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import SecondNavBar from "./second-navbar/SecondNavbar";
import TopNavBar from "./top-navbar/TopNavBar";
import { useEffect } from "react";
import cookie from "js-cookie";

const HeaderComponent = () => {
  const { configData } = useSelector((state) => state.configData);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const scrolling = useScrollTrigger();

  // ✅ always define outside render conditions
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : undefined;
  const location =
    typeof window !== "undefined" ? localStorage.getItem("location") : undefined;

  const showTopNavBar = Boolean(location || token);

  return (
    <AppBarStyle scrolling={showTopNavBar ? scrolling : false} isSmall={isSmall}>
      <Box>
        <NoSsr>
          {showTopNavBar && (
            <Card sx={{ borderRadius: 0, boxShadow: "none" }}>
              <TopNavBar configData={configData} />
            </Card>
          )}
          <SecondNavBar configData={configData} />
        </NoSsr>
      </Box>
    </AppBarStyle>
  );
};

export default HeaderComponent;
