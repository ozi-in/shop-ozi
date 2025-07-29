import React from "react";
import { Badge, IconButton, Stack, Tooltip, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const NavBarIcon = ({ icon, label, user, handleClick, badgeCount }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <IconButton
      sx={{
        padding: "8px",
        borderRadius: "50%",
        "&:hover": {
          backgroundColor: "rgba(255, 122, 89, 0.1)",
        }
      }}
      onClick={() => handleClick()}
    >
      <Tooltip
        title={t(label)}
        arrow
        placement="top"
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: (theme) => theme.palette.toolTipColor,
              "& .MuiTooltip-arrow": {
                color: (theme) => theme.palette.toolTipColor,
              },
            },
          },
        }}
      >
        <Badge 
          color="primary" 
          badgeContent={badgeCount} 
          showZero
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "#FF7A59",
              color: "white",
            }
          }}
        >
          {icon}
        </Badge>
      </Tooltip>
    </IconButton>
  );
};

export default NavBarIcon;
