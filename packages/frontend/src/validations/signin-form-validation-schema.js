import * as Yup from "yup";
import messages from "../misc/messages";

const signin = messages.form.signin;

export const schema = Yup.object().shape({
  email: Yup.string()
    .email(signin.email_format)
    .required(signin.email_required),
  password: Yup.string()
    .required(signin.password_required),
});
