import { t } from "i18next";
import { getCurrentModuleType } from "helper-functions/getCurrentModuleType";

export const getItemsOrFoods = () => {
  const moduleType = getCurrentModuleType();

  if (moduleType === "food") {
    return t("foods");
  } else {
    return t("items");
  }
};
