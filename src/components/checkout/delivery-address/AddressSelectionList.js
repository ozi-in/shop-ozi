import React from "react";

import {
	CustomListItem,
	CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import Radio from "@mui/material/Radio";

import CustomAlert from "../../alert/CustomAlert";

import { useTheme } from "@mui/material/styles";

import { Stack } from "@mui/system";

import { CustomTypographyEllipsis } from "../../../styled-components/CustomTypographies.style";

const AddressSelectionList = (props) => {
	const theme = useTheme();
	const {
		data,
		allAddress,
		handleLatLng,
		t,
		address,
		isRefetching,
		refetch,
		configData,
		setSelectedAddress,
		renderOnNavbar,
	} = props;

	// Function to check if two addresses match by content
	const isAddressMatch = (address1, address2) => {
		if (!address1 || !address2) return false;
		
		// First check by ID (for exact matches)
		if (address1.id === address2.id) return true;
		
		// Then check by address text (more flexible matching)
		const addressText1 = (address1.address || "").toLowerCase().trim();
		const addressText2 = (address2.address || "").toLowerCase().trim();
		
		// Check if addresses are similar (one contains the other or they're very similar)
		const addressTextMatch = addressText1.includes(addressText2) || 
								 addressText2.includes(addressText1) ||
								 addressText1 === addressText2;
		
		// For debugging
		if (addressText1.includes("41, block f, sushant lok iii") || addressText2.includes("41, block f, sushant lok iii")) {
			console.log("Address match check for Harmony:", {
				address1: address1.address,
				address2: address2.address,
				addressText1,
				addressText2,
				addressTextMatch,
				lat1: address1.lat || address1.latitude,
				lat2: address2.lat || address2.latitude,
				lng1: address1.lng || address1.longitude,
				lng2: address2.lng || address2.longitude
			});
		}
		
		// For now, just check text match to simplify the logic
		return addressTextMatch;
	};

	return (
		<>
			<Stack gap="15px">
				{data &&
					allAddress?.length > 0 &&
					data?.addresses?.map((item, index) => {
						const isSelected = isAddressMatch(item, address);
						
						return (
							<Stack key={item.id}>
								<CustomListItem
									border={
										isSelected
											? `1px solid ${theme.palette.primary.main}`
											: `1px solid ${theme.palette.neutral[200]}`
									}
									onClick={() => handleLatLng(item)}
									alignItems="flex-start"
									selected={isSelected}
									cursor="pointer"
									// className="selected"
								>
									<CustomStackFullWidth
										direction="row"
										alignItems="flex-start"
									>
										<Radio
											checked={isSelected}
											row
											aria-labelledby="demo-row-radio-buttons-group-label"
											name="row-radio-buttons-group"
											sx={{ marginTop: "-2px" }}
										/>
										<ListItemText
											primary={
												<Typography
													textTransform="capitalize"
													fontSize={{
														xs: "13px",
														sm: "14px",
														md: "16px",
													}}
													fontWeight={
														isSelected
															? "600"
															: "600"
													}
												>
													{t(item.address_type)}
												</Typography>
											}
											secondary={
												<CustomTypographyEllipsis
													sx={{
														fontSize: {
															xs: "10px",
															md: "12px",
															maxWidth:
																renderOnNavbar ===
																"true"
																	? "220px"
																	: "100%",
														},
													}}
												>
													{item.address}
												</CustomTypographyEllipsis>
											}
										/>
									</CustomStackFullWidth>
								</CustomListItem>
							</Stack>
						);
					})}
				{!isRefetching && allAddress?.length === 0 && (
					<CustomAlert
						type="info"
						text={t("No saved addresses found to select.")}
					/>
				)}
				{/*{!data && <CustomCheckOutShimmer />}*/}
			</Stack>
		</>
	);
};

AddressSelectionList.propTypes = {};

export default AddressSelectionList;
