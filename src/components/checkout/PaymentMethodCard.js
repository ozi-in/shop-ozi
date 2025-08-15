import React from "react";
import {
  FormControlLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Stack } from "@mui/system";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useDispatch } from "react-redux";
import CustomImageContainer from "../CustomImageContainer";
import {
  setOfflineInfoStep,
  setOfflineMethod,
} from "redux/slices/offlinePaymentData";
import NextImage from "components/NextImage";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PaymentMethodCard = (props) => {
  const {
    image,
    type,
    paymentMethod,
    setPaymentMethod,
    paymentType,
    parcel,
    digitalPaymentMethodActive,
    imageUrl,
    setIsCheckedOffline,
    setPaymentMethodImage,
    storage,
    configData,
  } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const handleChange = () => {
    setPaymentMethod?.(type);
    if (!parcel) {
      setPaymentMethodImage?.(
        digitalPaymentMethodActive ? `${image}` : image.src
      );
    }
    dispatch(setOfflineMethod(""));
    setIsCheckedOffline?.(false);
    dispatch(setOfflineInfoStep(0));
  };

  const radioLabel = () => {
    return (
      <Stack
        direction="row"
        gap="8px"
        alignItems="center"
        py={{ xs: "10px", sm: "10px", md: "0px" }}

      >
        {/* {parcel === "true" ? (
          <CustomImageContainer
            src={digitalPaymentMethodActive ? image : image.src}
            width="20px"
            height="20px"
            objectfit="contain"
            borderRadius="50%"
          />
        ) : (
          !isSmall && (
            <CustomImageContainer
              width="auto"
              height="20px"
              objectfit="contain"
              borderRadius="50%"
              src={digitalPaymentMethodActive ? image : image.src}
            />
          )
        )} */}
        <NextImage
          src={"../ic_razorpay.svg"}
          height={20}
          width={20}
        ></NextImage>

        <Typography
          fontWeight={parcel === "true" ? "400" : "500"}
          fontSize={{ xs: "12px", sm: "12px", md: "12px" }}
        >
          {paymentType}
        </Typography>
      </Stack>
    );
  };
  return (
    <Stack >
      <FormControl
      >
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={handleChange}
        >
          <FormControlLabel
          labelPlacement="start"

            sx={{
              flexGrow: 1, marginInlineStart: { xs: "0px", md: "0px" },mt:"20px", border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "12px 12px",
              transition: "0.3s",
              justifyContent:"space-between"
            }}
            value={type}
            control={
              <Radio
               icon={<RadioButtonUncheckedIcon />}
                sx={{ padding: { xs: "2px", md: "10px" } }}
                checked={paymentMethod === type}
                  checkedIcon={<CheckCircleIcon color="primary" />}

              />
            }
            label={radioLabel()}
          />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};

export default PaymentMethodCard;
