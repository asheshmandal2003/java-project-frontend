import axios from "axios";
import AuthCard from "../Layouts/AuthCard";
import { FlexCenter } from "../components/FLexCenter";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../context/SnackbarProvider";

export default function Signup() {
  const navigate = useNavigate("/");

  const { showSnackbar } = useSnackbar();

  async function signup(values, setDisable) {
    setDisable(true);
    const data = new FormData();
    for (let value in values) {
      data.append(value, values[value]);
    }
    data.append("userRole", "USER");
    await axios
      .post("http://localhost:8080/api/v1/signup", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        showSnackbar(res.data.message, "success");
        navigate("/auth/signin");
      })
      .catch((err) => showSnackbar(err.response.data.message, "error"));
    setDisable(false);
  }

  return (
    <>
      <FlexCenter>
        <AuthCard
          pageType="signup"
          onSubmit={(values, setDisable) => signup(values, setDisable)}
        />
      </FlexCenter>
    </>
  );
}
