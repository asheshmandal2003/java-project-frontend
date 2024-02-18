import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FlexCenter } from "../components/FLexCenter";
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import YupPassword from "yup-password";
YupPassword(yup);

const initialValuesForSignup = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

const initialValuesForSignin = {
  email: "",
  password: "",
};

const validationSchemaForSignup = yup.object({
  first_name: yup
    .string()
    .min(3, "First name must contain 3 characters!")
    .max(50, "First name cannot contain more than 50 characters!")
    .required("First name is required!"),
  last_name: yup
    .string()
    .min(3, "Last name must contain 3 characters!")
    .max(50, "Last name cannot contain more than 50 characters!")
    .required("Last name is required!"),
  email: yup.string().email("Invalid email!").required("Email is required!"),
  password: yup
    .string()
    .required("Password is required!")
    .min(
      8,
      "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
    )
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character"),
});

const validationSchemaForSignin = yup.object({
  email: yup.string().email("Invalid email!").required("Email is required!"),
  password: yup
    .string()
    .required("Password is required!")
    .min(
      8,
      "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
    )
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character"),
});

export default function AuthCard({ pageType, onSubmit }) {
  const phone = useMediaQuery("(max-width:600px)");
  const [visible, setVisible] = useState(() => false);
  const [disable, setDisable] = useState(() => false);

  const changeVisibility = () => setVisible(!visible);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues:
      pageType === "signup" ? initialValuesForSignup : initialValuesForSignin,
    onSubmit: (values) => onSubmit(values, setDisable),
    validationSchema:
      pageType === "signup"
        ? validationSchemaForSignup
        : validationSchemaForSignin,
  });
  return (
    <Card
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        mt: phone ? 3 : 5,
        p: phone ? 3 : 4,
        pb: 5,
        width: phone ? "80%" : 450,
      }}
    >
      <Stack spacing={3} mb={5}>
        <Typography alignSelf="center" variant="h6">
          {pageType == "signup" ? "Sign Up" : "Sign In"}
        </Typography>
        {pageType == "signup" && (
          <Stack direction={phone ? "column" : "row"} spacing={3}>
            <TextField
              autoFocus
              id="first_name"
              label="First name"
              name="first_name"
              type="text"
              size={phone ? "small" : "medium"}
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                Boolean(formik.touched.first_name) &&
                Boolean(formik.errors.first_name)
              }
              helperText={
                Boolean(formik.touched.first_name) && formik.errors.first_name
              }
            />
            <TextField
              id="last_name"
              label="Last name"
              name="last_name"
              type="text"
              size={phone ? "small" : "medium"}
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                Boolean(formik.touched.last_name) &&
                Boolean(formik.errors.last_name)
              }
              helperText={
                Boolean(formik.touched.last_name) && formik.errors.last_name
              }
            />
          </Stack>
        )}
        <TextField
          id="email"
          label="Email"
          name="email"
          type="email"
          size={phone ? "small" : "medium"}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.email) && Boolean(formik.errors.email)}
          helperText={Boolean(formik.touched.email) && formik.errors.email}
        />
        <TextField
          id="password"
          label="Password"
          name="password"
          type={visible ? "text" : "password"}
          size={phone ? "small" : "medium"}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            Boolean(formik.touched.password) && Boolean(formik.errors.password)
          }
          helperText={
            Boolean(formik.touched.password) && formik.errors.password
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={changeVisibility}>
                  {visible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {pageType == "signin" && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormGroup>
              <FormControlLabel
                control={<Checkbox size={phone ? "small" : "medium"} />}
                label={
                  <Typography variant={phone ? "body2" : "body1"}>
                    Remember me
                  </Typography>
                }
              />
            </FormGroup>
            <Typography
              onClick={() => navigate("/auth/forgot-password")}
              variant={phone ? "body2" : "body1"}
              color="error"
              sx={{ cursor: "pointer" }}
            >
              Forgot Password
            </Typography>
          </div>
        )}
        <Button
          type="submit"
          variant="contained"
          size={phone ? "small" : "medium"}
          disabled={disable}
        >
          {pageType === "signup" ? "Sign up" : "Sign in"}
        </Button>
      </Stack>
      <FlexCenter>
        {pageType == "signup" ? (
          <Typography>
            Already have an account?{" "}
            <Typography
              component="span"
              color="primary"
              onClick={() => navigate("/auth/signin")}
              sx={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Sign in
            </Typography>
          </Typography>
        ) : (
          <Typography>
            Don't have an account?{" "}
            <Typography
              component="span"
              color="primary"
              onClick={() => navigate("/auth/signup")}
              sx={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Sign up
            </Typography>
          </Typography>
        )}
      </FlexCenter>
    </Card>
  );
}
