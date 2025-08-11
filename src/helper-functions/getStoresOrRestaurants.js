import { t } from "i18next";
import { getCurrentModuleType } from "helper-functions/getCurrentModuleType";

export const getStoresOrRestaurants = () => {
  const moduleType = getCurrentModuleType();

  if (moduleType === "food") {
    return t("Restaurants");
  } else {
    return t("Stores");
  }
};
