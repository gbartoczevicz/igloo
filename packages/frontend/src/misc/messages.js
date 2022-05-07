const messages = {
    form: {
        signin: {
            email_required: "Digite o seu email.",
            email_format: "Digite um email válido.",
            password_required: "Digite sua senha."
        },
        signup: {
            name_required: "Digite o primeiro nome.",
            phone_required: "Digite o celular.",
            email_required: "Digite o seu email.",
            email_format: "Digite um email válido.",
            password_required: "Digite sua senha.",
            password_confirmation_required: "Digite a confirmação da senha.",
            password_confirmation_match: "As senhas devem ser iguais."
        },
        institutions: {
            create_institution: {
                name_required: "Digite o nome da instituição.",
                cnpj_required: "Digite o cnpj da instituição.",
                phone_required: "Digite o celular.",
            }
        }
    },
    api: {
        account: {
            signup: "Conta criada com sucesso!",
        },
        institutions: {
            create_institution: "Instituição criada com sucesso!",
            add_professor: "Professor adicionado com sucesso!",
            add_student: "Estudante adicionado com sucesso!"
        }
    }
};

export default messages;
