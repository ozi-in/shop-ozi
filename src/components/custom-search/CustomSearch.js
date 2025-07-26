import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MicNoneIcon from "@mui/icons-material/MicNone";
import { useTranslation } from "react-i18next";
import { IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import { CloseIconWrapper } from "styled-components/CustomStyles.style";
import { Search, StyledInputBase } from "./CustomSearch.style";
import { getCurrentModuleType } from "helper-functions/getCurrentModuleType";
import { ModuleTypes } from "helper-functions/moduleTypes";
import { isMoment } from "moment";
import { Box } from "@mui/system";

const CustomSearch = ({
  handleSearchResult,
  label,
  isLoading,
  selectedValue,
  setIsEmpty,
  setSearchValue,
  type2,
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  let language_direction = undefined;
  if (typeof window !== "undefined") {
    language_direction = localStorage.getItem("direction");
  }

  useEffect(() => {
    if (selectedValue) {
      setValue(selectedValue);
    } else {
      setValue("");
    }
  }, [selectedValue]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchResult(e.target.value);
      e.preventDefault();
    }
  };
  const remove = "true";
  const handleReset = () => {
    setValue("");
    handleSearchResult?.("", remove);
    setIsEmpty?.(true);
  };
  const handleChange = (value) => {
    if (value === "") {
      handleSearchResult?.("");
      setIsEmpty?.(true);
    } else {
      setIsEmpty?.(false);
    }
    setValue(value);
    setSearchValue?.(value);
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  const getTypeWiseChanges = () => {
    if (type2) {
      return (
        <>
          <SearchIcon
            sx={{
              color: (theme) =>
                getCurrentModuleType() === ModuleTypes.FOOD
                  ? theme.palette.moduleTheme.food
                  : "primary.main",
              marginInlineStart: "15px",
              marginInlineEnd: "-8px",
            }}
          />
          <StyledInputBase
            placeholder={t(label)}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
            language_direction={language_direction}
            // onFocus={() => handleOnFocus?.(value)}
          />
        </>
      );
    } else {
      return (
        <>
          <StyledInputBase
            placeholder={t(label)}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
            language_direction={language_direction}
            sx={{
              paddingLeft: { xs: "25px" },
            }}
            // onFocus={() => handleOnFocus?.(value)}
          />
          {value === "" ? (
            <SearchIcon
              sx={{
                marginInlineEnd: "12px",
                position: { xs: "absolute" },
                left: { xs: "10px" },
              }}
            />
          ) : (
            <>
              {isLoading ? (
                <CloseIconWrapper
                  right={-1}
                  language_direction={language_direction}
                >
                  <LoadingButton
                    loading
                    variant="text"
                    sx={{ width: "10px" }}
                  />
                </CloseIconWrapper>
              ) : (
                <CloseIconWrapper
                  onClick={() => handleReset()}
                  language_direction={language_direction}
                  right="20px"
                >
                  <IconButton sx={{ marginRight: "-4px !important" }}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </CloseIconWrapper>
              )}
            </>
          )}

          {isMobile && value === "" && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginInlineEnd: "10px",
                marginLeft: "10px", // space between divider and preceding content
              }}
            >
              <Box
                sx={{
                  width: "1px",
                  height: "20px",
                  backgroundColor: "#D9D9D9",
                  marginRight: "10px", // 10px between divider and mic icon
                }}
              />
              <MicNoneIcon
                sx={{
                  marginInlineEnd: "10px",
                }}
              />
            </Box>
          )}
        </>
      );
    }
  };

  return (
    <form onSubmit={handleKeyPress}>
      <Search direction="row" alignItems="center" type2={type2}>
        {getTypeWiseChanges()}
      </Search>
    </form>
  );
};

CustomSearch.propTypes = {};

export default CustomSearch;
