import { useState } from "react";
import EmployeeForm from "../Layouts/EmployeeForm";
import dayjs from "dayjs";
import axios from "axios";
import { useSnackbar } from "../context/SnackbarProvider";
import Appbar from "../components/Appbar";
import { FlexCenter } from "../components/FLexCenter";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  mobile_no: "",
  dob: dayjs("2000-01-01"),
  country: "",
  city: "",
  skills: [],
};

export default function Create() {
  const [disable, setDisable] = useState(() => false);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate("/");
  const token = useSelector((state) => state.auth.token);

  async function addEmployee(values, resetForm) {
    setDisable(() => true);
    const data = new FormData();
    for (let value in values) {
      if (value === "dob") {
        data.append(value, dayjs(values[value]).format("YYYY-MM-DD"));
        continue;
      }
      if (value === "skills") {
        data.append("skills", JSON.stringify(values["skills"]));
        continue;
      } else {
        data.append(value, values[value]);
      }
    }
    await axios({
      method: "POST",
      url: "http://localhost:8080/api/v1/employees",
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        showSnackbar("Employee added successfully!", "success");
        navigate("/");
      })
      .catch((err) => showSnackbar("Something went wrong!", "error"));
    setDisable(() => false);
    resetForm();
  }

  return (
    <>
      <Appbar />
      <FlexCenter sx={{ mt: 4, mb: 9 }}>
        <EmployeeForm
          pageType="create"
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => addEmployee(values, resetForm)}
          disbale={disable}
        />
      </FlexCenter>
    </>
  );
}
