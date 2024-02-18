import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Table from "../components/Table";
import axios from "axios";
import { Alert, CircularProgress, Stack, Typography } from "@mui/material";
import { useSnackbar } from "../context/SnackbarProvider";
import { FlexCenter } from "../components/FLexCenter";
import { useSelector } from "react-redux";

export default function Home() {
  const { showSnackbar } = useSnackbar();
  const [employees, setEmployees] = useState(() => null);
  const [employeeStorage, setEmployeeStorage] = useState(() => null);
  const [disableDelete, setDisableDelete] = useState(() => false);
  const token = useSelector((state) => state.auth.token);

  const fetchEmployees = async () => {
    await axios
      .get("http://localhost:8080/api/v1/employees", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setEmployees(res.data);
        setEmployeeStorage(res.data);
      })
      .catch((err) => showSnackbar("Can't fetch employee details!", "error"));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function deleteEmp(id) {
    setDisableDelete(true);
    await axios
      .delete(`http://localhost:8080/api/v1/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setEmployees((prevEmps) =>
          prevEmps.filter((prevEmp) => prevEmp.id != id)
        );
      })
      .catch((err) => showSnackbar("Something went wrong!", "error"));
    setDisableDelete(false);
  }

  return (
    <div
      style={{
        marginBottom: 50,
      }}
    >
      <Appbar />
      <FlexCenter
        sx={{
          flexDirection: "column",
          alignItems: "center",
          my: 5,
        }}
      >
        {employees ? (
          <>
            <Typography
              variant="h6"
              sx={{ textDecoration: "underline", mb: 4 }}
            >
              Employee Table
            </Typography>
            <Table
              employees={employees}
              allEmps={employeeStorage}
              setEmployees={setEmployees}
              deleteEmp={(id) => deleteEmp(id)}
              disableDelete={disableDelete}
            />
          </>
        ) : (
          <CircularProgress />
        )}
      </FlexCenter>
    </div>
  );
}
