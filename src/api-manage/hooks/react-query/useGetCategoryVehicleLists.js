
import MainApi from "api-manage/MainApi";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { onSingleErrorResponse } from "api-manage/api-error-response/ErrorResponses";
import { vehicle_category_list } from "api-manage/ApiRoutes";


// Define a standalone fetcher function
const fetchCategoryVehicleLists = async () => {
  const { data } = await MainApi.get(`${vehicle_category_list}`);
  return data;
};
