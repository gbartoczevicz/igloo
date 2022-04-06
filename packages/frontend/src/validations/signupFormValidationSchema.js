import * as Yup from "yup";
import messages from "../misc/messages";

const signup = messages.form.signup;

export const schema = Yup.object().shape({
  name: Yup.string()
    .required(signup.name_required),
  surname: Yup.string()
    .required(signup.surname_required),
  phone: Yup.string().required(signup.phone_required),
  email: Yup.string()
    .required(signup.email_required)
    .email(signup.email_format),
  password: Yup.string()
    .required(signup.password_required),
  confirmPassword: Yup.string()
    .required(signup.password_confirmation_match)
    .test('passwords-match', signup.password_confirmation_match, function(value){
    return this.parent.password === value;
  })
});
