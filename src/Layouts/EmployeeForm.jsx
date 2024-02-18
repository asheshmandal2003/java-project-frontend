import {
  Button,
  Card,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Field, Formik, Form } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  first_name: yup
    .string()
    .min(3, "First name must contain 3 characters!")
    .max(50, "First name must contain 50 characters")
    .required("First name is required!"),
  last_name: yup
    .string()
    .min(3, "Last name must contain 3 characters!")
    .max(50, "Last name must contain 50 characters")
    .required("Last name is required!"),
  email: yup.string().email("Invalid email").required("Email is required!"),
  mobile_no: yup
    .string()
    .min(10, "Phone no name must contain 10 digits!")
    .max(10, "Phone no must contain 50 digits")
    .required("Phone no is required!"),
  dob: yup.date().required("Date of birth is required!"),
  country: yup
    .string()
    .max(100, "Country must contain 100 characters")
    .required("Country is required!"),
  city: yup
    .string()
    .min(2, "City must contain 3 characters!")
    .max(100, "City must contain 100 characters")
    .required("City is required!"),
  skills: yup
    .array()
    .min(1, "Select at least one skill!")
    .required("Skills are required!"),
});

const skillsOptions = [
  { value: "AWS", label: "AWS" },
  { value: "Devops", label: "Devops" },
  { value: "Full Stack", label: "Full Stack" },
  { value: "QA Automation", label: "QA Automation" },
  { value: "Webservices", label: "Webservices" },
  { value: "Middleware", label: "Middleware" },
];

export default function EmployeeForm({
  pageType,
  initialValues,
  onSubmit,
  disbale,
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => (
        <Form>
          <Card
            sx={{
              width: 480,
              p: 4,
              mt: 5,
            }}
          >
            <Stack spacing={3}>
              <Typography alignSelf="center" variant="h6">
                {pageType === "create" ? "Add Employee" : "Edit Employee"}
              </Typography>
              <Stack direction="row" spacing={3}>
                <TextField
                  id="first_name"
                  name="first_name"
                  label="First Name"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    Boolean(touched.first_name) && Boolean(errors.first_name)
                  }
                  helperText={Boolean(touched.first_name) && errors.first_name}
                />
                <TextField
                  id="last_name"
                  name="last_name"
                  label="Last Name"
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    Boolean(touched.last_name) && Boolean(errors.last_name)
                  }
                  helperText={Boolean(touched.last_name) && errors.last_name}
                />
              </Stack>
              <TextField
                id="email"
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={Boolean(touched.email) && errors.email}
              />
              <TextField
                id="mobile_no"
                name="mobile_no"
                label="Phone no"
                value={values.mobile_no}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.mobile_no) && Boolean(errors.mobile_no)}
                helperText={Boolean(touched.mobile_no) && errors.mobile_no}
              />
              <FormControl
                fullWidth
                error={Boolean(touched.dob) && Boolean(errors.dob)}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    name="dob"
                    label="Select date of birth"
                    value={values.dob}
                    onChange={(value) => setFieldValue("dob", value)}
                    onBlur={handleBlur}
                  />
                </LocalizationProvider>
                <FormHelperText>
                  {Boolean(touched.dob) && errors.dob}
                </FormHelperText>
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.country) && Boolean(errors.country)}
              >
                <InputLabel>Country</InputLabel>
                <Select
                  name="country"
                  label="Country"
                  id="country"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                  <MenuItem value="Pakistan">Pakistan</MenuItem>
                  <MenuItem value="Shrilanka">Shrilanka</MenuItem>
                  <MenuItem value="Thailand">Thailand</MenuItem>
                </Select>
                <FormHelperText>
                  {Boolean(touched.country) && errors.country}
                </FormHelperText>
              </FormControl>
              <TextField
                id="city"
                name="city"
                label="City"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.city) && Boolean(errors.city)}
                helperText={Boolean(touched.city) && errors.city}
              />
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
                error={Boolean(touched.skills) && Boolean(errors.skills)}
              >
                <FormLabel component="legend">Select your skills</FormLabel>
                <FormGroup role="group" aria-labelledby="checkbox-group">
                  {skillsOptions.map((skill) => (
                    <FormControlLabel
                      key={skill.value}
                      control={
                        <Field
                          type="checkbox"
                          name="skills"
                          value={skill.value}
                        />
                      }
                      label={skill.label}
                    />
                  ))}
                </FormGroup>
                <FormHelperText>
                  {Boolean(touched.skills) && errors.skills}
                </FormHelperText>
              </FormControl>
              <Button
                variant="contained"
                color="success"
                type="submit"
                disabled={disbale}
              >
                {!disbale ? (
                  pageType === "create" ? (
                    "Add"
                  ) : (
                    "Edit"
                  )
                ) : (
                  <CircularProgress size={25} />
                )}
              </Button>
            </Stack>
          </Card>
        </Form>
      )}
    </Formik>
  );
}
