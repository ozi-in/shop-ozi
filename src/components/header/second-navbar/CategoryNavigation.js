// import React, { useState, useEffect, useRef } from "react";
// import { Typography, Box, Stack, Paper } from "@mui/material";
// import { useRouter } from "next/router";
// import { useSelector, useDispatch } from "react-redux";
// import { useGetCategories } from "api-manage/hooks/react-query/all-category/all-categorys";
// import { setCategories } from "redux/slices/storedData";
// import { getModuleId } from "helper-functions/getModuleId";
// import {
//   setSelectedCategoryId,
//   setSelectedSubCategoryId,
// } from "redux/slices/categoryIds";

// // Custom Chevron Arrow Component
// const ChevronArrow = ({ size = 12, color = "#1a1a2e" }) => (
//   <svg
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M7 10L12 15L17 10"
//       stroke={color}
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const CategoryNavigation = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const { categories } = useSelector((state) => state.storedData);
//   const [hoveredCategory, setHoveredCategory] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const closeTimer = useRef(null);
//   const selectedCategoryId = useSelector(
//     (state) => state.categoryIds.selectedCategoryId
//   ); // saksham changes
//   const selectedSubCategoryId = useSelector(
//     (state) => state.categoryIds.selectedSubCategoryId
//   );
//   const { data: categoriesData, isLoading, refetch } = useGetCategories();

//   // Ensure categories are fetched and stored in Redux on mount
//   useEffect(() => {
//     if (!categories?.length) {
//       if (categoriesData?.data?.length) {
//         dispatch(setCategories(categoriesData.data));
//       } else {
//         refetch(); // fetch from server if no local data
//       }
//     }
//   }, [categories, categoriesData, dispatch, refetch]);

//   // Handle hover for top-level category
//   const handleCategoryHover = (event, category) => {
//     clearTimeout(closeTimer.current);
//     if (category?.childes?.length > 0) {
//       setHoveredCategory(category);
//       setAnchorEl(event.currentTarget);
//     } else {
//       setHoveredCategory(null);
//       setAnchorEl(null);
//     }
//   };

//   // Mouse leave logic for hover dropdown
//   const handleMouseLeave = () => {
//     closeTimer.current = setTimeout(() => {
//       setHoveredCategory(null);
//       setAnchorEl(null);
//     }, 150);
//   };

//   const handleMouseEnter = () => {
//     clearTimeout(closeTimer.current);
//   };

//   // Navigate to category
//   const handleCategoryClick = (category) => {
//     dispatch(setSelectedCategoryId(category.id));
//     localStorage.setItem(
//       "selected_highlighted_categories",
//       JSON.stringify(category.id)
//     );
//     router.push({
//       pathname: "/home",
//       query: {
//         search: "category",
//         id: category?.id,
//         module_id: getModuleId(),
//         name: category?.name,
//         data_type: "category",
//         from: "nav",
//       },
//     });
//     setHoveredCategory(null);
//   };

//   // Navigate to subcategory
//   const handleSubCategoryClick = (subCategory) => {
//     dispatch(setSelectedSubCategoryId(subCategory.id));
//     localStorage.setItem(
//       "selected_sub_highlighted_categories",
//       JSON.stringify(subCategory.id)
//     );
//     router.push({
//       pathname: "/home",
//       query: {
//         search: "category",
//         id: subCategory?.id,
//         module_id: getModuleId(),
//         name: subCategory?.name,
//         data_type: "category",
//       },
//     });
//     setHoveredCategory(null);
//   };

//   return (
//     <Box
//       sx={{ position: "relative", zIndex: 10 }}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {/* Top Category Bar */}
//       <Box
//         sx={{
//           width: "100vw", // Full viewport width
//           bgcolor: "#fff",
//           borderTop: "1px solid #e0e0e0", // Thin border line above categories
//           pt: 1,
//           marginLeft: "calc(-50vw + 50%)", // Extend to full width
//           marginRight: "calc(-50vw + 50%)", // Extend to full width
//         }}
//       >
//         <Stack
//           direction="row"
//           spacing={4}
//           alignItems="center"
//           justifyContent="center"
//         >
//           {isLoading ? (
//             Array.from({ length: 6 }).map((_, index) => (
//               <Typography
//                 key={index}
//                 variant="body2"
//                 height={"20px"}
//                 sx={{
//                   fontWeight: 500,
//                   color: "#ccc",
//                   px: 1.5,
//                   py: 0.5,
//                   borderRadius: 2,
//                   background: "#f5f5f5",
//                   minWidth: 100,
//                 }}
//               ></Typography>
//             ))
//           ) : categories?.length > 0 ? (
//             categories.slice(0, 6).map((category) => (
//               <Typography
//                 key={category.id}
//                 variant="body2"
//                 sx={{
//                   fontWeight: 500,
//                   color:
//                     selectedCategoryId === category?.id ? "#ffffff" : "#222",
//                   cursor: "pointer",
//                   px: 1.5,
//                   py: 0.5,
//                   borderRadius: 2,
//                   backgroundColor:
//                     selectedCategoryId === category?.id ? "#FF7A59" : "#ffffff",
//                   transition: "background 0.2s, color 0.2s",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "4px",
//                   "&:hover": {
//                     background: "#FFF3E0",
//                     color: "#FF7A59",
//                   },
//                 }}
//                 onMouseEnter={(e) => handleCategoryHover(e, category)}
//                 onClick={() => handleCategoryClick(category)}
//               >
//                 <Box component="span">{category.name}</Box>
//                 {category?.childes?.length > 0 && (
//                   <ChevronArrow
//                     size={20}
//                     color={
//                       selectedCategoryId === category?.id
//                         ? "#ffffff"
//                         : "#1a1a2e"
//                     }
//                   />
//                 )}
//               </Typography>
//             ))
//           ) : (
//             <Typography
//               variant="body2"
//               sx={{ color: "#999", fontStyle: "italic" }}
//             >
//               No categories available
//             </Typography>
//           )}
//         </Stack>
//       </Box>

//       {/* Subcategory Dropdown */}
//       {hoveredCategory && anchorEl && (
//         <Paper
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//           sx={{
//             position: "absolute",
//             top: anchorEl.offsetTop + anchorEl.offsetHeight,
//             left: anchorEl.offsetLeft,
//             zIndex: 1300,
//             p: 2,
//             mt: 0.5,
//             minWidth: 200,
//             boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
//             borderRadius: 2,
//             backgroundColor: "#fff",
//           }}
//         >
//           <Stack spacing={1}>
//             {hoveredCategory.childes.slice(0, 8).map((subCategory) => (
//               <Typography
//                 key={subCategory.id}
//                 variant="body2"
//                 sx={{
//                   cursor: "pointer",
//                   px: 1,
//                   py: 0.5,
//                   color:
//                     selectedSubCategoryId === subCategory?.id
//                       ? "#ffffff"
//                       : "#222",
//                   backgroundColor:
//                     selectedSubCategoryId === subCategory?.id
//                       ? "#FF7A59"
//                       : "#ffffff",
//                   borderRadius: 1,
//                   transition: "all 0.2s",
//                   "&:hover": {
//                     background: "#FFF3E0",
//                     color: "#FF7A59",
//                   },
//                 }}
//                 onClick={() => handleSubCategoryClick(subCategory)}
//               >
//                 {subCategory.name}
//               </Typography>
//             ))}
//           </Stack>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default CategoryNavigation;
import React, { useState, useEffect, useRef } from "react";
import { Typography, Box, Stack, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useGetCategories } from "api-manage/hooks/react-query/all-category/all-categorys";
import { setCategories } from "redux/slices/storedData";
import { getModuleId } from "helper-functions/getModuleId";
import {
  setSelectedCategoryId,
  setSelectedSubCategoryId,
} from "redux/slices/categoryIds";

// Custom Chevron Arrow Component
const ChevronArrow = ({ size = 12, color = "#1a1a2e", isOpen }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transition: "transform 0.2s ease",
      transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
    }}
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

const superCategoriesConfig = [
  { name: "Baby & Kids Fashion", categories: ["Clothes", "Festive"] },
  {
    name: "Baby Care & Hygiene",
    categories: [
      "Skin & Hair Care",
      "Diapers & Wipes",
      "Baby Grooming",
      "Health & Safety",
    ],
  },
  {
    name: "Feeding & Nursing",
    categories: [
      "Formula",
      "Breastfeeding Needs",
      "Bottle & Accessories",
      "Starting Solids",
    ],
  },
  {
    name: "Nursery & Cleaning Essentials",
    categories: ["Newborn Essentials", "Cleaning Essentials"],
  },
  { name: "Toys & Learning", categories: ["Toys"] },
];

const CategoryNavigation = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.storedData);
  const selectedCategoryId = useSelector(
    (state) => state.categoryIds.selectedCategoryId
  );
  const selectedSubCategoryId = useSelector(
    (state) => state.categoryIds.selectedSubCategoryId
  );
  const { data: categoriesData, isLoading, refetch } = useGetCategories();

  const [hoveredSuperCategory, setHoveredSuperCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [anchorSuperEl, setAnchorSuperEl] = useState(null);
  const [anchorCatEl, setAnchorCatEl] = useState(null);
  const closeTimer = useRef(null);

  // Fetch categories into Redux if not already loaded
  useEffect(() => {
    if (!categories?.length) {
      if (categoriesData?.data?.length) {
        dispatch(setCategories(categoriesData.data));
      } else {
        refetch();
      }
    }
  }, [categories, categoriesData, dispatch, refetch]);

  // Find matching category object from API
  const getCategoryFromName = (name) =>
    categories.find((cat) => cat.name.toLowerCase() === name.toLowerCase());

  // Click handlers
  const handleSuperCategoryClick = (superCat) => {
    if (!superCat?.categories?.length) return;

    // 1. Get all parent category objects
    let matchedCats = superCat.categories
      .map((catName) => getCategoryFromName(catName))
      .filter(Boolean);

    // 2. Toys & Learning special case
    if (superCat.name.toLowerCase() === "toys & learning") {
      const extraToys = categories.filter(
        (c) =>
          c.name.toLowerCase().includes("toys") &&
          !superCat.categories.includes(c.name)
      );
      matchedCats = [...matchedCats, ...extraToys];
    }

    if (!matchedCats.length) return;

    // 3. Flatten: include parents + all their subcategories
    const allCatsWithSubs = matchedCats.flatMap((cat) => [
      cat,
      ...(cat.childes || []),
    ]);

    // 4. Get unique IDs
    const ids = [...new Set(allCatsWithSubs.map((cat) => cat.id))];

    // 5. Dispatch & store
    dispatch(setSelectedCategoryId(ids));
    localStorage.setItem(
      "selected_highlighted_categories",
      JSON.stringify(ids)
    );

    // 6. Navigate with all IDs
    router.push({
      pathname: "/home",
      query: {
        search: "category",
        id: ids.join(","), // comma-separated list
        module_id: getModuleId(),
        name: allCatsWithSubs.map((c) => c.name).join(", "),
        data_type: "category",
        from: "nav",
      },
    });

    setHoveredSuperCategory(null);
    setHoveredCategory(null);
  };

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategoryId(category.id));
    localStorage.setItem(
      "selected_highlighted_categories",
      JSON.stringify(category.id)
    );
    router.push({
      pathname: "/home",
      query: {
        search: "category",
        id: category.id,
        module_id: getModuleId(),
        name: category.name,
        data_type: "category",
        from: "nav",
      },
    });
    setHoveredSuperCategory(null);
    setHoveredCategory(null);
  };

  const handleSubCategoryClick = (subCategory) => {
    dispatch(setSelectedSubCategoryId(subCategory.id));
    localStorage.setItem(
      "selected_sub_highlighted_categories",
      JSON.stringify(subCategory.id)
    );
    router.push({
      pathname: "/home",
      query: {
        search: "category",
        id: subCategory.id,
        module_id: getModuleId(),
        name: subCategory.name,
        data_type: "category",
      },
    });
    setHoveredSuperCategory(null);
    setHoveredCategory(null);
  };

  // Hover handling
  const handleSuperHover = (event, superCat) => {
    clearTimeout(closeTimer.current);
    setHoveredSuperCategory(superCat);
    setHoveredCategory(null);
    setAnchorSuperEl(event.currentTarget);
  };

  const handleCategoryHover = (event, category) => {
    clearTimeout(closeTimer.current);
    if (category?.childes?.length > 0) {
      setHoveredCategory(category);
      setAnchorCatEl(event.currentTarget);
    } else {
      setHoveredCategory(null);
    }
  };

  const handleMouseLeaveAll = () => {
    closeTimer.current = setTimeout(() => {
      setHoveredSuperCategory(null);
      setHoveredCategory(null);
    }, 150);
  };

  const handleMouseEnterAll = () => {
    clearTimeout(closeTimer.current);
  };

  return (
    <Box
      sx={{ position: "relative", zIndex: 10 }}
      onMouseEnter={handleMouseEnterAll}
      onMouseLeave={handleMouseLeaveAll}
    >
      {/* Top Bar - Supercategories */}
      <Box
        sx={{
          width: "100vw",
          bgcolor: "#fff",
          borderTop: "1px solid #e0e0e0",
          pt: 1,
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
        }}
      >
        <Stack
          direction="row"
          spacing={4}
          alignItems="center"
          justifyContent="center"
        >
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
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
                  minWidth: 120,
                }}
              />
            ))
            : superCategoriesConfig.map((superCat) => (
              <Typography
                key={superCat.name}
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color:
                    hoveredSuperCategory?.name === superCat.name
                      ? "#FF7A59"
                      : "#222",
                  cursor: "pointer",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  backgroundColor:
                    hoveredSuperCategory?.name === superCat.name
                      ? "#FFF3E0"
                      : "#ffffff",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  "&:hover": {
                    background: "#FFF3E0",
                    color: "#FF7A59",
                  },
                }}
                onMouseEnter={(e) => handleSuperHover(e, superCat)}
                onClick={() => handleSuperCategoryClick(superCat)}
              >
                <Box component="span">{superCat.name}</Box>
                <ChevronArrow size={20} color="#1a1a2e" isOpen={hoveredSuperCategory?.name !== superCat.name} />
              </Typography>
            ))}
        </Stack>
      </Box>

      {/* Modal 1: Categories inside Supercategory */}
      {hoveredSuperCategory && anchorSuperEl && (
        <Paper
          onMouseEnter={handleMouseEnterAll}
          onMouseLeave={handleMouseLeaveAll}
          sx={{
            position: "absolute",
            top: anchorSuperEl.offsetTop + anchorSuperEl.offsetHeight,
            left: anchorSuperEl.offsetLeft,
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
            {hoveredSuperCategory.categories
              .flatMap((catName) => {
                const catObj = getCategoryFromName(catName);
                if (
                  hoveredSuperCategory.name.toLowerCase() === "toys & learning"
                ) {
                  const extraToys = categories.filter(
                    (c) =>
                      c.name.toLowerCase().includes("toys") &&
                      !hoveredSuperCategory.categories.includes(c.name)
                  );
                  return [catObj, ...extraToys].filter(Boolean);
                }

                return catObj ? [catObj] : [];
              })
              .map((catObj) => (
                <Typography
                  key={catObj.id}
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    px: 1,
                    py: 0.5,
                    color:
                      selectedCategoryId === catObj.id ? "#ffffff" : "#222",
                    backgroundColor:
                      selectedCategoryId === catObj.id ? "#FF7A59" : "#ffffff",
                    borderRadius: 1,
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    "&:hover": {
                      background: "#FFF3E0",
                      color: "#FF7A59",
                    },
                  }}
                  onMouseEnter={(e) => handleCategoryHover(e, catObj)}
                  onClick={() => handleCategoryClick(catObj)}
                >
                  {catObj.name}
                  {catObj.childes?.length > 0 && (
                    <ChevronArrow size={16} color="#1a1a2e" isOpen={hoveredCategory !== catObj} />
                  )}
                </Typography>
              ))}
          </Stack>
        </Paper>
      )}

      {/* Modal 2: Subcategories inside Category */}
      {hoveredCategory && anchorCatEl && (
        <Paper
          onMouseEnter={handleMouseEnterAll}
          onMouseLeave={handleMouseLeaveAll}
          sx={{
            position: "absolute",
            top:
              anchorCatEl.getBoundingClientRect().top -
              anchorSuperEl.getBoundingClientRect().top,
            left: (() => {
              const anchorRect = anchorCatEl.getBoundingClientRect();
              const paperWidth = 200; // same as minWidth
              const spaceRight = window.innerWidth - anchorRect.right;

              // If not enough space on right, open on left
              if (spaceRight < paperWidth) {
                return anchorRect.left - paperWidth - 65;
              }
              return anchorRect.left + 100; // normal right position
            })(),
            zIndex: 1400,
            p: 2,
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
                  color:
                    selectedSubCategoryId === subCategory.id
                      ? "#ffffff"
                      : "#222",
                  backgroundColor:
                    selectedSubCategoryId === subCategory.id
                      ? "#FF7A59"
                      : "#ffffff",
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
