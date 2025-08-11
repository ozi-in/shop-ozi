import { getTatFromDeliveryLocation } from "../../../ApiRoutes";
import MainApi from "../../../MainApi";
import { useQuery } from "react-query";
import { onErrorResponse } from "../../../api-error-response/ErrorResponses";

export const getTatFromLocation = async (pageParams) => {
  const { originLat, originLng, destLat, destLng } = pageParams;

  const { data } = await MainApi.get("/api/v1/tat", {
    params: {
      origin_lat: originLat,
      origin_lng: originLng,
      dest_lat: destLat,
      dest_lng: destLng,
    },
  });

  return data;
};

export default function useGetTat(pageParams) {
  return useQuery("get-tat", () => getTatFromLocation(pageParams), {
    enabled: false,
    onError: onErrorResponse,
  });
}
