import axios from "axios";
import AuthCard from "../Layouts/AuthCard";
import { FlexCenter } from "../components/FLexCenter";
import { useSnackbar } from "../context/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../global/auth.js";

export default function SignIn() {
  const { showSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function signin(values, setDisable) {
    setDisable(true);
    const data = new FormData();
    for (let value in values) {
      data.append(value, values[value]);
    }
    await axios
      .post(`http://localhost:8080/api/v1/signin`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(
          login({ token: res.data.data.token, user: res.data.data.user })
        );
        showSnackbar("You're successfully logged in!", "success");
        navigate("/");
      })
      .catch((err) => showSnackbar(err.response.data.message, "error"));
    setDisable(false);
  }
  return (
    <>
      <FlexCenter>
        <AuthCard pageType="signin" onSubmit={signin} />
      </FlexCenter>
    </>
  );
}
