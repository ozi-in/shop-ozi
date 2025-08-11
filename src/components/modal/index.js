import { useTheme } from "@emotion/react";
import { Clear } from "@mui/icons-material";
import { Box, Dialog, Stack } from "@mui/material";
import PropTypes from "prop-types";
const CustomModal = (props) => {
  const {
    openModal,
    handleClose,
    disableAutoFocus,
    closeButton,
    children,
    maxWidth,
    fullScreen = false,
  } = props;
  const handleCloseModal = (event, reason) => {
    if (reason && reason === "backdropClick") {
      if (disableAutoFocus) {
        return true;
      } else {
        handleClose?.();
      }
    } else {
      handleClose?.();
    }
  };
  const theme = useTheme();
  return (
    <Dialog
      open={openModal}
      onClose={handleCloseModal}
      //   sx={{
      //     ".MuiDialog-paper": {
      //       margin: "16px",
      //       maxWidth: maxWidth,
      //     },
      //   }}
      // >
      fullScreen={fullScreen}
      sx={{
        ".MuiDialog-paper": {
          margin: fullScreen ? { xs: "0px", md: "16px" } : "16px", // ← Conditional styling
          maxWidth: fullScreen ? { xs: "100%", md: "730px" } : maxWidth,
          height: fullScreen ? { xs: "100%", md: "auto" } : "auto",
          borderRadius: fullScreen ? { xs: "0px", md: "8px" } : "8px",
          width: fullScreen ? { xs: "100%", md: "auto" } : "auto",
        },
      }}
    >
      {closeButton && (
        <Stack direction="row" justifyContent="flex-end">
          <Box
            onClick={handleCloseModal}
            sx={{
              cursor: "pointer",
              color: theme.palette.text.primary,
              mt: 1.3,
              mr: 1.3,
            }}
          >
            <Clear sx={{ height: "16px" }} />
          </Box>
        </Stack>
      )}
      {children}
    </Dialog>
  );
};

CustomModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default CustomModal;
