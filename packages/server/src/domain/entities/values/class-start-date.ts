type Param = Date | {
  month: number;
  year: number;
};

export class ClassStartDate {
  public readonly month: number;

  public readonly year: number;

  public get date(): Date {
    return new Date(this.year, this.month - 1, 1);
  }

  public constructor(param: Param) {
    const isDate = param instanceof Date;

    this.month = isDate ? param.getMonth() + 1 : param.month;
    this.year = isDate ? param.getFullYear() : param.year;
  }
}
