import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetItemCampaigns from "../../../api-manage/hooks/react-query/useGetItemCampaigns";
import { getCurrentModuleType } from "helper-functions/getCurrentModuleType";
import { getModuleId } from "helper-functions/getModuleId";
import { ModuleTypes } from "helper-functions/moduleTypes";
import { setCampaignItem } from "redux/slices/cart";
import { setRunningCampaigns } from "redux/slices/storedData";
import H2 from "../../typographies/H2";
import { HomeComponentsWrapper } from "../HomePageComponents";
import SliderShimmer from "../SliderShimmer";

const RunningCampaigns = () => {
  const { configData } = useSelector((state) => state.configData);
  const [openModal, setOpenModal] = useState(false);
  const [campaignsData, setCampaignsData] = useState({});
  const imageBaseUrl = configData?.base_urls?.campaign_image_url;
  const { data, refetch, isFetching, isLoading } = useGetItemCampaigns();
  const router = useRouter();
  const { runningCampaigns } = useSelector((state) => state.storedData);
  const dispatch = useDispatch();
  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    dispatch(setRunningCampaigns(data));
  }, [data]);
  const handleClick = (product) => {
    if (getCurrentModuleType() === "ecommerce") {
      dispatch(setCampaignItem(product));
      router.push(
        {
          pathname: "/product/[id]",
          query: {
            id: `${product?.slug ? product?.slug : product?.id}`,
            module_id: `${getModuleId()}`,
            product_type: "campaign",
          },
        },
        undefined,
        { shallow: true }
      ).then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

    } else {
      setCampaignsData(product);
      setOpenModal(true);
    }
  };
  const handleClose = () => {
    setOpenModal(false);
  };


  return (
    <>
      {isFetching ? (
        <SliderShimmer />
      ) : (
        <>
          {runningCampaigns?.length > 0 ? (
            <HomeComponentsWrapper alignItems="flex-start">
              {runningCampaigns?.length > 0 && (
                <H2 text="Just For You" textAlign="left" component="h2" />
              )}
              <Box sx={{ width: "100%", mt: "1rem" }}>
                {getModuleWiseView()}
              </Box>
            </HomeComponentsWrapper>
          ) : (
            ""
          )}
        </>
      )}

    </>
  );
};

export default RunningCampaigns;
