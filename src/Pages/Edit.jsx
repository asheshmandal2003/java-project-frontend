import { useLocation, useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../Layouts/EmployeeForm";
import { FlexCenter } from "../components/FLexCenter";
import dayjs from "dayjs";
import { useState } from "react";
import { useSnackbar } from "../context/SnackbarProvider";
import axios from "axios";
import Appbar from "../components/Appbar";
import { useSelector } from "react-redux";

export default function Edit() {
  const [disable, setDisable] = useState(() => false);
  const { id } = useParams();
  const { state } = useLocation();

  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const initialValues = {
    first_name: state.first_name,
    last_name: state.last_name,
    email: state.email,
    mobile_no: state.mobile_no,
    dob: dayjs(state.dob),
    country: state.country,
    city: state.city,
    skills: JSON.parse(state.skills),
  };

  async function editEmployee(values) {
    setDisable(() => true);
    await axios({
      method: "PUT",
      url: `http://localhost:8080/api/v1/employees/${id}?first_name=${
        values["first_name"]
      }&last_name=${values["last_name"]}&email=${
        values["email"]
      }&mobile_no=${values["mobile_no"].toString()}&dob=${
        values["dob"]
      }&country=${values["country"]}&city=${
        values["city"]
      }&skills=${encodeURIComponent(JSON.stringify(values["skills"]))}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        showSnackbar("Employee updated successfully!", "success");
        navigate("/");
      })
      .catch((err) => {
        showSnackbar("Something went wrong!", "error");
      });
    setDisable(() => false);
  }

  return (
    <>
      <Appbar />
      <FlexCenter
        sx={{
          mb: 9,
        }}
      >
        <EmployeeForm
          pageType="edit"
          initialValues={initialValues}
          onSubmit={editEmployee}
          disbale={disable}
        />
      </FlexCenter>
    </>
  );
}
