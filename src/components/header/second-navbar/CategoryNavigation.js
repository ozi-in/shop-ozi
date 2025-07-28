import React, { useState, useEffect, useRef } from "react";
import { Typography, Box, Stack, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useGetCategories } from "api-manage/hooks/react-query/all-category/all-categorys";
import { setCategories } from "redux/slices/storedData";
import { getModuleId } from "helper-functions/getModuleId";

const CategoryNavigation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.storedData);

  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const closeTimer = useRef(null);

  const { data: categoriesData, isLoading } = useGetCategories({
    enabled: categories.length === 0,
  });

  useEffect(() => {
    if (categoriesData?.data && categories.length === 0) {
      dispatch(setCategories(categoriesData?.data));
    }
  }, [categoriesData, categories.length, dispatch]);

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

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setHoveredCategory(null);
      setAnchorEl(null);
    }, 150);
  };

  const handleMouseEnter = () => {
    clearTimeout(closeTimer.current);
  };

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

  const handleSubCategoryClick = (subCategory) => {
    router.push({
      pathname: "/home/",
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
          width: "100%",
          bgcolor: "#fff",
          borderTop: "1px solid #eee",
          borderBottom: "1px solid #eee",
          py: 1,
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
            categories?.slice(0, 6).map((category) => (
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
                  "&:hover": {
                    background: "#FFF3E0",
                    color: "#FF7A59",
                  },
                }}
                onMouseEnter={(e) => handleCategoryHover(e, category)}
                onClick={() => handleCategoryClick(category)}
              >
                {category.name}
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