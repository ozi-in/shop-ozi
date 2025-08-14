import React, { useEffect, useState, useRef } from "react";
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
  const [animatedLabel, setAnimatedLabel] = useState(label);
  const [fade, setFade] = useState(true);
  const labelRef = useRef(label);
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

  useEffect(() => {
    if (label !== labelRef.current) {
      setFade(false);
      setTimeout(() => {
        setAnimatedLabel(label);
        setFade(true);
        labelRef.current = label;
      }, 300); // 300ms fade out, then fade in
    }
  }, [label]);

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

  useEffect(() => {
    if (label !== labelRef.current) {
      let i = 0;
      let isDeleting = false;
      let currentText = "";

      const typeInterval = setInterval(() => {
        if (!isDeleting) {
          // Typing forward
          if (i < label.length) {
            currentText = label.substring(0, i + 1);
            setAnimatedLabel(currentText);
            i++;
          } else {
            // Pause before deleting
            isDeleting = true;
            return; // ek tick skip hoga yaha
          }
        } else {
          // Deleting backward
          if (i > 0) {
            currentText = label.substring(0, i - 1);
            setAnimatedLabel(currentText);
            i--;
          } else {
            // Fully deleted
            clearInterval(typeInterval);
            labelRef.current = label;
          }
        }
      }, isDeleting ? 100 : 150); // deleting faster

      return () => clearInterval(typeInterval);
    }
  }, [label]);


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
          {/* <Box sx={{ position: "relative", width: "100%" }}>
            <StyledInputBase
              placeholder=""
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e)}
              language_direction={language_direction}
              // onFocus={() => handleOnFocus?.(value)}
            />
            {value === "" && (
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  color: "#aaa",
                  opacity: fade ? 1 : 0,
                  transition: "opacity 0.5s",
                  pointerEvents: "none",
                  paddingLeft: 25,
                  lineHeight: "40px",
                  fontSize: "1rem",
                }}
              >
                {t(animatedLabel)}
              </span>
            )}
          </Box> */}


          <Box sx={{ position: "relative", width: "100%" }}>
            <StyledInputBase
              placeholder=""
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e)}
              language_direction={language_direction}
              sx={{
                paddingLeft: { xs: "25px" },
              }}
            />

            {value === "" && (
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  color: "#aaa",
                  pointerEvents: "none",
                  paddingLeft: 42,
                  lineHeight: "40px",
                  fontSize: "1rem",
                  display: "flex", // ek line me lane ke liye
                  alignItems: "center",
                }}
              >
                <span style={{ marginRight: "4px" }}>Search for</span>
                <span
                  style={{
                    opacity: fade ? 1 : 0,
                    transition: "opacity 0.5s",
                  }}
                >
                  {t(animatedLabel)}
                </span>
              </span>
            )}
          </Box>
        </>
      );
    } else {
      return (
        <>
          {/* <Box sx={{ position: "relative", width: "100%" }}>
            <StyledInputBase
              placeholder=""
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e)}
              language_direction={language_direction}
              sx={{
                paddingLeft: { xs: "25px" },
              }}
              // onFocus={() => handleOnFocus?.(value)}
            />
            {value === "" && (
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  color: "#aaa",
                  opacity: fade ? 1 : 0,
                  transition: "opacity 0.5s",
                  pointerEvents: "none",
                  paddingLeft: 42,
                  lineHeight: "40px",
                  fontSize: "1rem",
                }}
              >
                {t(animatedLabel)}
              </span>
            )}
          </Box> */}

          <Box sx={{ position: "relative", width: "100%" }}>
            <StyledInputBase
              placeholder=""
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e)}
              language_direction={language_direction}
              sx={{
                paddingLeft: { xs: "25px" },
              }}
            />

            {value === "" && (
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  color: "#aaa",
                  pointerEvents: "none",
                  paddingLeft: 42,
                  lineHeight: "40px",
                  fontSize: "1rem",
                  display: "flex", // ek line me lane ke liye
                  alignItems: "center",
                }}
              >
                <span style={{ marginRight: "4px" }}>Search for</span>
                <span
                  style={{
                    opacity: fade ? 1 : 0,
                    transition: "opacity 0.5s",
                  }}
                >
                  {t(animatedLabel)}
                </span>
              </span>
            )}
          </Box>
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
