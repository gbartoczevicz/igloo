namespace Errors {
  export class EmailAlreadyInUse extends Error {
    public constructor() {
      super("E-mail is already in use");
    }
  }

  export class PhoneAlreadyInUse extends Error {
    public constructor() {
      super("Phone is already in use");
    }
  }
}

export default Errors;
