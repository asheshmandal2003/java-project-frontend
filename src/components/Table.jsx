import MUITable from "@mui/material/Table";
import {
  Alert,
  CircularProgress,
  IconButton,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import TableMenu from "./TableMenu";

function showSkills(values) {
  let skills = "";
  values.map((value) => {
    skills += value;
    skills += ", ";
  });
  return skills;
}

export default function Table({
  employees,
  setEmployees,
  allEmps,
  deleteEmp,
  disableDelete,
}) {
  return (
    <>
      <TableMenu setValues={setEmployees} allEmps={allEmps} />
      {employees.length !== 0 ? (
        <TableContainer component={Paper} sx={{ width: "80%", mt: 3 }}>
          <MUITable sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone No</TableCell>
                <TableCell align="right">Date of Birth</TableCell>
                <TableCell align="right">Country</TableCell>
                <TableCell align="right">City</TableCell>
                <TableCell align="right">Skills</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    {employee.first_name + " " + employee.last_name}
                  </TableCell>
                  <TableCell align="right">{employee.email}</TableCell>
                  <TableCell align="right">{employee.mobile_no}</TableCell>
                  <TableCell align="right">{employee.dob}</TableCell>
                  <TableCell align="right">{employee.country}</TableCell>
                  <TableCell align="right">{employee.city}</TableCell>
                  <TableCell align="right">
                    {showSkills(JSON.parse(employee.skills))}
                  </TableCell>
                  <TableCell align="right">
                    <Link
                      to={`/employee/${employee.id}`}
                      state={{
                        first_name: employee.first_name,
                        last_name: employee.last_name,
                        email: employee.email,
                        mobile_no: employee.mobile_no,
                        dob: employee.dob,
                        country: employee.country,
                        city: employee.city,
                        skills: employee.skills,
                      }}
                    >
                      <IconButton>
                        <Edit />
                      </IconButton>
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    {disableDelete ? (
                      <CircularProgress size={30} />
                    ) : (
                      <IconButton onClick={() => deleteEmp(employee.id)}>
                        <Delete color="error" />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MUITable>
        </TableContainer>
      ) : (
        <Alert severity="warning" sx={{ mt: 3, width: "80%" }}>
          No Employees to show!
        </Alert>
      )}
    </>
  );
}
