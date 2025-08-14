import { Grid, Typography, Button, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import {
  HelpGrid,
  HelpImgBox,
  HelpTypographyBox,
  VisitBox,
} from "./Help.style";
import img from "./assets/image 43.png";
import img3 from "./assets/image 45.png";
import img2 from "./assets/image 46.png";
import img1 from "./assets/image 47.png";
import SupportImgSvg from "./assets/SupportImgSvg";
import Link from "next/link";
import LocationViewOnMap from "../Map/location-view/LocationViewOnMap";

const HelpAndSupport = (props) => {
  const { configData, t } = props;
  const [open, setOpen] = useState(false);
  const handleOpenCloseMap = () => {
    setOpen(!open);
  };
  const theme = useTheme();
  return (
    <Box>
      <Grid container mt="1rem" spacing={2}>
        <Grid item md={12} xs={12}>
          <Box
            component="form"
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = {
                name: e.target.name.value,
                email: e.target.email.value,
                message: e.target.message.value,
              };

              const res = await fetch("/api/send-help-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
              });

              if (res.ok) {
                alert("Your message has been sent!");
                e.target.reset();
              } else {
                alert("Failed to send. Please try again later.");
              }
            }}
            sx={{
              background: "#fff",
              p: 3,
              borderRadius: 2,
              boxShadow: 4,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "24px", sm: "28px", md: "32px" },
                color: "black",
                fontWeight: "600",
                mb: 2,
              }}
            >
              {t("Need Any Help?")}
            </Typography>
            <Typography
              sx={{
                color: (theme) => theme.palette.customColor.textGray,
                mb: 3,
              }}
            >
              {t("Send us your message and our support team will contact you.")}
            </Typography>

            <input
              name="name"
              placeholder={t("Your Name")}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            />

            <input
              name="email"
              type="email"
              placeholder={t("Your Email")}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            />

            <textarea
              name="message"
              placeholder={t("Your Message")}
              required
              rows={5}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                sx={{
                  padding: "12px 20px",
                  backgroundColor: "#000",
                  color: "#fff",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              >
                {t("Send Message")}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>


      <HelpGrid container spacing={2}>
        <Grid item md={4} xs={12}>
          <Box sx={{ cursor: "pointer" }} onClick={handleOpenCloseMap}>
            <VisitBox>
              <HelpImgBox>
                <img src={img1.src} alt={t("help")} />
              </HelpImgBox>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontSize: { xs: "18px", sm: "22px", md: "24px" },
                    fontWeight: "700",
                  }}
                >
                  {t("VISIT US")}
                </Typography>
                <Typography>{configData?.address}</Typography>
              </Box>
            </VisitBox>
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Link href={`mailto:${configData?.email}`}>
            <VisitBox>
              <HelpImgBox>
                <img src={img2.src} alt={t("help")} />
              </HelpImgBox>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontSize: { xs: "18px", sm: "22px", md: "24px" },
                    fontWeight: "700",
                  }}
                >
                  {t("EMAIL US")}
                </Typography>
                <Typography>{configData?.email}</Typography>
              </Box>
            </VisitBox>
          </Link>
        </Grid>
        <Grid item md={4} xs={12}>
          <Link href={`tel:${configData?.phone}`}>
            <VisitBox>
              <HelpImgBox>
                <img src={img3.src} alt={t("help")} />
              </HelpImgBox>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontSize: { xs: "18px", sm: "22px", md: "24px" },
                    fontWeight: "700",
                  }}
                >
                  {t("CALL US")}
                </Typography>
                <Typography>{configData?.phone}</Typography>
              </Box>
            </VisitBox>
          </Link>
        </Grid>
      </HelpGrid>
      {open && (
        <LocationViewOnMap
          open={open}
          handleClose={handleOpenCloseMap}
          latitude={configData?.default_location?.lat}
          longitude={configData?.default_location?.lng}
          address={configData?.address}
          isFooter={true}
        />
      )}
    </Box>
  );
};

export default HelpAndSupport;
