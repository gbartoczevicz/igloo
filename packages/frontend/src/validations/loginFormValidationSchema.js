import * as Yup from "yup";
import messages from "../misc/messages";

export const schema = Yup.object().shape({
  email: Yup.string()
    .email(messages.form.signin.email_format)
    .required(messages.form.signin.email_required),
  password: Yup.string()
    .required(messages.form.signin.password_required),
});
