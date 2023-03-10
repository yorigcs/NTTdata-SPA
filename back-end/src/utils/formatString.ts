export class FormatString {
  constructor(
    private readonly originalString: string,
    private readonly replace: string,
    private readonly replaceBy: string,
  ) {}

  format(): string {
    return this.originalString
      .split(this.replace)
      .map((word) => word.toLowerCase().trim())
      .join(this.replaceBy);
  }
}
