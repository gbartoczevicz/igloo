import * as Yup from "yup";
import { schema as signinFormValidationSchema } from "./signinFormValidationSchema";
import { schema as signupFormValidationSchema } from "./signupFormValidationSchema";

async function validateForm({ schema, data, formRef }) {
  await schema.validate(data, {
    abortEarly: false,
  });
  formRef.current.setErrors({});
}

function setErrorsFromForm({ errors, formRef }) {
  if (errors instanceof Yup.ValidationError) {
    const errorMessages = {};
    errors.inner.map((error) => {
      errorMessages[error.path] = error.message;
      return errorMessages;
    });
    formRef.current.setErrors(errorMessages);
  }
}

export {
  signinFormValidationSchema,
  signupFormValidationSchema,
  validateForm,
  setErrorsFromForm
};
