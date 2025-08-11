// import { makeStyles } from "@mui/styles";

// const LINES_TO_SHOW = 1;

// export const textWithEllipsis = makeStyles({
//   multiLineEllipsis: {
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//     display: "-webkit-box",
//     "-webkit-line-clamp": LINES_TO_SHOW,
//     "-webkit-box-orient": "vertical",
//   },
//   singleLineEllipsis: {
//     overflow: "hidden",
//     WebkitBoxOrient: "vertical",
//     textOverflow: "ellipsis",
//     display: "-webkit-box",
//     "-webkit-line-clamp": 1,
//     "-webkit-box-orient": "vertical",
//   },
// });
import { makeStyles } from "@mui/styles";

export const textWithEllipsis = makeStyles({
  multiLineEllipsis: {
    overflow: "visible",
    textOverflow: "unset",
    display: "block",
    whiteSpace: "normal", // allows wrapping
  },
  // singleLineEllipsis: {
  //   overflow: "visible",
  //   textOverflow: "unset",
  //   display: "block",
  //   whiteSpace: "normal",
  // },

  //changes made by priyanshu
  singleLineEllipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
});
