import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { COUNTRIES } from "../../utils/Constants";
import { TextField, FormHelperText, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/images/UK.png";
import "./styles.scss";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object({
  phoneNumber: Yup.string()
    .required("Required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(7, "Minimum 7 numbers")
    .max(9, "Maximum 8 numbers"),
  selectPrefix: Yup.string().required("Required"),
});

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const PhoneInput = () => {
  const [selectPrefix, setSelectPrefix] = useState("");
  const [selectIsTouched, setSelectIsTouched] = useState(false);

  const classes = useStyles();

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema,
    validateOnChange: false,
    onSubmit(values) {
      console.log("+" + selectPrefix + values.phoneNumber);
    },
  });

  const errorInput =
    touched.phoneNumber && errors.phoneNumber
      ? Boolean(errors.phoneNumber)
      : false;

  return (
    <div className="container">
      <div>
        <Autocomplete
          style={{ width: 300 }}
          options={COUNTRIES}
          classes={{
            option: classes.option,
          }}
          autoHighlight
          onChange={(e, value) =>
            value && value.phone
              ? setSelectPrefix(value.phone)
              : setSelectPrefix("")
          }
          onBlur={() => setSelectIsTouched(true)}
          getOptionLabel={(option) => `${option.label} +${option.phone} `}
          renderOption={(option) => (
            <React.Fragment>
              {<img alt="country flag logo" src={logo} className="flag-logo" />}{" "}
              {option.label} ({option.code}) +{option.phone}
            </React.Fragment>
          )}
          renderInput={(params) => (
            <>
              <TextField
                {...params}
                error={selectIsTouched && !selectPrefix}
                label="Choose a country"
                variant="outlined"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              ></TextField>
              {selectIsTouched && !selectPrefix && (
                <FormHelperText error>Required</FormHelperText>
              )}
            </>
          )}
        />
      </div>
      <TextField
        error={errorInput}
        id="outlined-error-helper-text"
        label="Input your phone number"
        name="phoneNumber"
        disabled={!selectPrefix}
        helperText={touched.phoneNumber && errors.phoneNumber}
        variant="outlined"
        type="number"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Button
        disabled={!selectPrefix && !values.phoneNumber}
        variant="outlined"
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default React.memo(PhoneInput);
