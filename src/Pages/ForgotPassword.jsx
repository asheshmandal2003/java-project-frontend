import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Email } from "@mui/icons-material";
import { FlexCenter } from "../components/FLexCenter";
import { useSnackbar } from "../context/SnackbarProvider";

export function ForgotPassword() {
  const phone = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [disable, setDisable] = useState(() => false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values, onSubmitProps) => sendEmail(onSubmitProps),
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid Email!")
        .required("Email is required!"),
    }),
  });
  async function sendEmail(onSubmitProps) {
    setDisable(true);
    await axios({
      method: "POST",
      url: `http://localhost:8080/api/v1/forgot-password?email=${formik.values.email}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        showSnackbar("Password sent to your email!", "success");
        navigate("/auth/signin");
      })
      .catch((err) => showSnackbar(err.response.data.message, "error"));
    setDisable(false);
    onSubmitProps.resetForm();
  }
  return (
    <FlexCenter sx={{ my: 5 }}>
      <Card
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          width: phone ? 300 : 400,
          height: 600,
          p: 4,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          component="img"
          width={200}
          height={200}
          src="https://img.freepik.com/premium-vector/email-messaging-email-marketing-campaign_183665-8.jpg?w=740"
          sx={{ borderRadius: "50%" }}
        />
        <Typography variant="h6" mb={1}>
          Find your password
        </Typography>
        <Typography mb={3} variant="body2" color="text.secondary">
          Enter your registered email here
        </Typography>
        <TextField
          fullWidth
          autoFocus
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
          name="email"
          label="Email"
          error={Boolean(formik.touched.email) && Boolean(formik.errors.email)}
          helperText={Boolean(formik.touched.email) && formik.errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />
        <Box
          width="100%"
          sx={{ display: "flex", justifyContent: "end", mt: 2 }}
        >
          <Button disabled={disable} variant="contained" type="submit">
            Next
          </Button>
        </Box>
      </Card>
    </FlexCenter>
  );
}
