import React, { useState, useEffect, useRef } from "react";
import { Typography, Box, Stack, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useGetCategories } from "api-manage/hooks/react-query/all-category/all-categorys";
import { setCategories } from "redux/slices/storedData";
import { getModuleId } from "helper-functions/getModuleId";

// Custom Chevron Arrow Component
const ChevronArrow = ({ size = 12, color = "#1a1a2e" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 10L12 15L17 10"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CategoryNavigation = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.storedData);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const closeTimer = useRef(null);

  const { data: categoriesData, isLoading, refetch } = useGetCategories();

  // Ensure categories are fetched and stored in Redux on mount
  useEffect(() => {
    if (!categories?.length) {
      if (categoriesData?.data?.length) {
        dispatch(setCategories(categoriesData.data));
      } else {
        refetch(); // fetch from server if no local data
      }
    }
  }, [categories, categoriesData, dispatch, refetch]);

  // Handle hover for top-level category
  const handleCategoryHover = (event, category) => {
    clearTimeout(closeTimer.current);
    if (category?.childes?.length > 0) {
      setHoveredCategory(category);
      setAnchorEl(event.currentTarget);
    } else {
      setHoveredCategory(null);
      setAnchorEl(null);
    }
  };

  // Mouse leave logic for hover dropdown
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setHoveredCategory(null);
      setAnchorEl(null);
    }, 150);
  };

  const handleMouseEnter = () => {
    clearTimeout(closeTimer.current);
  };

  // Navigate to category
  const handleCategoryClick = (category) => {
    router.push({
      pathname: "/home",
      query: {
        search: "category",
        id: category?.id,
        module_id: getModuleId(),
        name: category?.name,
        data_type: "category",
        from: "nav",
      },
    });
    setHoveredCategory(null);
  };

  // Navigate to subcategory
  const handleSubCategoryClick = (subCategory) => {
    router.push({
      pathname: "/home",
      query: {
        search: "category",
        id: subCategory?.id,
        module_id: getModuleId(),
        name: subCategory?.name,
        data_type: "category",
      },
    });
    setHoveredCategory(null);
  };

  return (
    <Box
      sx={{ position: "relative", zIndex: 10 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top Category Bar */}
      <Box
        sx={{
          width: "100vw", // Full viewport width
          bgcolor: "#fff",
          borderTop: "1px solid #e0e0e0", // Thin border line above categories
          py: 0, // Removed padding top and bottom
          px: 0,
          marginLeft: "calc(-50vw + 50%)", // Extend to full width
          marginRight: "calc(-50vw + 50%)", // Extend to full width
        }}
      >
        <Stack
          direction="row"
          spacing={4}
          alignItems="center"
          justifyContent="center"
        >
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: "#ccc",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  background: "#f5f5f5",
                  minWidth: 100,
                }}
              >
                Loading...
              </Typography>
            ))
          ) : categories?.length > 0 ? (
            categories.slice(0, 6).map((category) => (
              <Typography
                key={category.id}
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: "#222",
                  cursor: "pointer",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  transition: "background 0.2s, color 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  "&:hover": {
                    background: "#FFF3E0",
                    color: "#FF7A59",
                  },
                }}
                onMouseEnter={(e) => handleCategoryHover(e, category)}
                onClick={() => handleCategoryClick(category)}
              >
                <Box component="span">{category.name}</Box>
                {category?.childes?.length > 0 && (
                  <ChevronArrow size={20} color="#1a1a2e" />
                )}
              </Typography>
            ))
          ) : (
            <Typography
              variant="body2"
              sx={{ color: "#999", fontStyle: "italic" }}
            >
              No categories available
            </Typography>
          )}
        </Stack>
      </Box>

      {/* Subcategory Dropdown */}
      {hoveredCategory && anchorEl && (
        <Paper
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            position: "absolute",
            top: anchorEl.offsetTop + anchorEl.offsetHeight,
            left: anchorEl.offsetLeft,
            zIndex: 1300,
            p: 2,
            mt: 0.5,
            minWidth: 200,
            boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
            borderRadius: 2,
            backgroundColor: "#fff",
          }}
        >
          <Stack spacing={1}>
            {hoveredCategory.childes.slice(0, 8).map((subCategory) => (
              <Typography
                key={subCategory.id}
                variant="body2"
                sx={{
                  cursor: "pointer",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  transition: "all 0.2s",
                  "&:hover": {
                    background: "#FFF3E0",
                    color: "#FF7A59",
                  },
                }}
                onClick={() => handleSubCategoryClick(subCategory)}
              >
                {subCategory.name}
              </Typography>
            ))}
          </Stack>
        </Paper>
      )}
    </Box>
  );
};

export default CategoryNavigation;
