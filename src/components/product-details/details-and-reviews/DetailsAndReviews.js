import { Button, Collapse, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { alpha, Stack, styled } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import Details from "./Details";
import useGetProductReviews from "../../../api-manage/hooks/react-query/product-details/useProductReviews";
import ProductReviews from "../ProductReviews";
import { getModule } from "helper-functions/getLanguage";
import { t } from "i18next";
import useGetVehicleReview from "../../../api-manage/hooks/react-query/useGetVehicleReview";
const Wrapper = styled(Paper)(({ theme }) => ({
	padding: "16px",
	borderRadius: "5px",
	background: theme.palette.background.paper,
	boxShadow:
		"0px 10px 20px -3px rgba(145, 158, 171, 0.05), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)",
}));

const tabsData = ["Product Details", "Reviews"];

const Tab = ({ item, selected, showBackground, handleClick }) => {
	return (
		<Stack
			alignItems="center"
			justifyContent="center"
			sx={{
				backgroundColor: (theme) =>
					showBackground
						? selected === "true" && theme.palette.primary.main
						: selected === "true" && "transparent",
				padding: "10px 15px",
				fontWeight: showBackground
					? selected === "true" && "400"
					: selected === "true" && "600",
				borderRadius: showBackground ? "5px" : "none",
				borderBottom: showBackground
					? "none"
					: (theme) =>
							`2px solid ${
								selected === "true"
									? theme.palette.primary.main
									: alpha(theme.palette.neutral[400], 0.2)
							}`,
				color: (theme) =>
					showBackground
						? selected === "true" && theme.palette.neutral[100]
						: selected === "true" && theme.palette.primary.main,
				cursor: "pointer",
			}}
			onClick={handleClick}
		>
			{t(item)}
		</Stack>
	);
};

const CustomHeader = ({ info }) => {
	const { t } = useTranslation();
	return (
		<CustomStackFullWidth
			alignItems="flex-start"
			justifyContent="center"
			sx={{
				padding: "11px 30px",
				backgroundColor: (theme) => theme.palette.neutral[300],
				borderRadius: "10px",
			}}
		>
			<Typography fontWeight="bold" component="h2">
				{t(info)}
			</Typography>
		</CustomStackFullWidth>
	);
};
const DetailsAndReviews = (props) => {
	const {
		description,
		reviews,
		configData,
		productId,
		storename,
		tabsData = ["Product Details"],
		showBackground = true,
	} = props;
	const { t } = useTranslation();
	const [tabs, setTabs] = useState(0);
	const [expanded, setExpanded] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const contentRef = useRef(null);
	const [offSet, setOffSet] = useState(1);
	const [page_limits, setPageLimits] = useState(10);

	const minHeightToShowButton = 200; // Replace with your specific height threshold
	const { data, refetch, isLoading } = useGetProductReviews({
		productId,
		offSet,
		page_limits,
	});

	useEffect(() => {
		refetch();
	}, [productId, offSet]);

	useEffect(() => {
		if (
			contentRef.current &&
			contentRef.current.clientHeight > minHeightToShowButton
		) {
			setExpanded(true);
		}
	}, [minHeightToShowButton]);
	const handleSeeMore = () => {
		setExpanded(true);
	};
	const handleSeeLess = () => {
		setExpanded(false);
	};

	const shortDescription =
        description && description.length > 208
            ? `${description.slice(0, 400)}...`
            : description;
			
	return (
		<Wrapper>
			<CustomStackFullWidth
				alignItems="center"
				justifyContent="center"
				spacing={2}
			>
				<CustomStackFullWidth
					alignItems="center"
					justifyContent="center"
					direction="row"
					spacing={showBackground ? 0.5 : 0}
				>
					{tabsData.map((item, index) => {
						return (
							<Tab
								item={item}
								key={index}
								handleClick={() => setTabs(index)}
								showBackground={showBackground}
								selected={tabs === index ? "true" : "false"}
							/>
						);
					})}
				</CustomStackFullWidth>
				<CustomHeader info={tabs === 0 ? "Details Description " : "Reviews"} />
				<CustomStackFullWidth p="0px 30px">
					{tabs === 0 ? (
                        <Details description={isMobile && !expanded ? shortDescription : description} />
                    ) : (
                        <>
                            <ProductReviews
                                reviews={isMobile ? data?.reviews?.slice(0, 1) : data?.reviews}
                                configData={configData}
                                total_size={data?.total_size}
                                offSet={offSet}
                                setOffSet={setOffSet}
                                page_limits={page_limits}
                                isExpanded={!isMobile}
                            />
                            {isMobile && (
                                <Collapse in={expanded}>
                                    <ProductReviews
                                        reviews={data?.reviews?.slice(1)}
                                        configData={configData}
                                        total_size={data?.total_size}
                                        offSet={offSet}
                                        setOffSet={setOffSet}
                                        page_limits={page_limits}
                                        isExpanded={false}
                                    />
                                </Collapse>
                            )}
                        </>
                    )}
					{/* {tabs === 0 && (
						<Details description={description?.slice(0, 208)} />
					)}
					<Collapse in={expanded}>
						{tabs === 0 ? (
							<Details description={description?.slice(208)} />
						) : (
							<ProductReviews
								reviews={
									data?.reviews?.slice(1)
								}
								configData={configData}
								total_size={data?.total_size}
								offSet={offSet}
								setOffSet={setOffSet}
								page_limits={page_limits}
								isExpanded="false"
								storename={storename}
							/>
						)}
					</Collapse> */}
					{/* {tabs === 0 ? (
						<>
							{!expanded && description?.length > 110 && (
								<Button
									sx={{ textDecoration: "underline" }}
									onClick={handleSeeMore}
								>
									{t("View More")}
								</Button>
							)}
							{expanded && description?.length > 110 && (
								<Button
									sx={{ textDecoration: "underline" }}
									onClick={handleSeeLess}
								>
									{t("View Less")}
								</Button>
							)}
						</>
					) : (
						<>
							{!expanded &&
								(data?.reviews?.length > 1) && (
									<Button
										sx={{ textDecoration: "underline" }}
										onClick={handleSeeMore}
									>
										{t("View More")}
									</Button>
								)}
							{expanded &&
								(data?.reviews?.length > 1) && (
									<Button
										sx={{ textDecoration: "underline" }}
										onClick={handleSeeLess}
									>
										{t("View Less")}
									</Button>
								)}
						</>
					)} */}
					{isMobile && (
                        <>
                            {tabs === 0 && description?.length > 300 && (
                                <Button
                                    sx={{ textDecoration: "underline" }}
                                    onClick={expanded ? handleSeeLess : handleSeeMore}
                                >
                                    {t(expanded ? "View Less" : "View More")}
                                </Button>
                            )}
                            {tabs !== 0 && data?.reviews?.length > 1 && (
                                <Button
                                    sx={{ textDecoration: "underline" }}
                                    onClick={expanded ? handleSeeLess : handleSeeMore}
                                >
                                    {t(expanded ? "View Less" : "View More")}
                                </Button>
                            )}
                        </>
                    )}
				</CustomStackFullWidth>
			</CustomStackFullWidth>
		</Wrapper>
	);
};

DetailsAndReviews.propTypes = {};

export default DetailsAndReviews;
