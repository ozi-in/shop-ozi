// import React from "react";
// import * as Yup from "yup";
// import { useTranslation } from "react-i18next";

// const ValidationSchemaForAddAddress = () => {
//   const { t } = useTranslation();
//   return Yup.object({
//     address: Yup.string().required(t("Address is required")),
//     contact_person_name: Yup.string().required(t("Name is required")),
//     contact_person_number: Yup.string().required(t("Phone Number is required")),
//   });
// };
// export default ValidationSchemaForAddAddress;
import React from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const ValidationSchemaForAddAddress = () => {
  const { t } = useTranslation();
  return Yup.object({
    address_type: Yup.string().required(t("Label is required")),
    contact_person_name: Yup.string().required(t("Name is required")),
    contact_person_number: Yup.string().required(t("Phone Number is required")),
    house: Yup.string().required(t("House is required")),
    floor: Yup.string().required(t("Floor is required")),
    Apartment: Yup.string().required(t("Apartment is required")),
  });
};
export default ValidationSchemaForAddAddress;
