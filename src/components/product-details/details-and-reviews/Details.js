// import React from "react";
// import { Typography } from "@mui/material";
// import { useTheme } from "@mui/material/styles";

// const Details = ({ description }) => {
//   const theme = useTheme();
//   const formattedText = description?.split(/\r\n/)
//     .map(line => {
//       if (line.match(/^\d+\./)) {
//         return `<br/>${line}`; 
//       } else if (line.trim() === '') {
//         return '<br/><br/>';
//       }
//       return line;
//     })
//     .join('');

//   return (
//     <div>
//       <div
//         dangerouslySetInnerHTML={{
//           __html: formattedText
//         }}
//         style={{
//           color: theme.palette.neutral[400],
      
//           fontSize: "12px",
         
//         }}
//       />
//     </div>
//   );
// };

// Details.propTypes = {};

// export default Details;

import React from "react";
import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Parser to handle each "Label: value" pair, whether or not starting with \n
const parseDescription = (description) => {
  if (!description) return [];
  const lines = description.replace(/\r?\n/g, "\\n").split("\\n");
  const parsed = [];

  lines.forEach((line) => {
    const match = line.match(/^([^:]+):\s*(.*)$/); 
    if (match) {
      parsed.push({
        label: match[1].trim(),
        value: match[2].trim(),
      });
    } else if (line.trim()) {
      parsed.push({
        label: "Other Information",
        value: line.trim(),
      });
    }
  });

  return parsed;
};

const Details = ({ description }) => {
  const theme = useTheme();
  const parsedSections = parseDescription(description);

  return (
    <Box sx={{ color: theme.palette.text.secondary, fontSize: "14px" }}>
      {parsedSections.map((section, index) => (
        <Box key={index} sx={{ mb: 1 }}>
          <Typography component="span" sx={{ fontWeight: 600 }}>
            {section.label}:{" "}
          </Typography>
          <Typography component="span">{section.value}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Details;