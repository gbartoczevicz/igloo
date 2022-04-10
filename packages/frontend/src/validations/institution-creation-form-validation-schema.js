import * as Yup from "yup";
import messages from "../misc/messages";

const institution = messages.form.institutions.create_institution;

export const schema = Yup.object().shape({
  name: Yup.string()
    .required(institution.name_required),
  cnpj: Yup.string()
    .required(institution.cnpj_required),
  phone: Yup.string().required(institution.phone_required)
});
