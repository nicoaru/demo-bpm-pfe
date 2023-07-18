export class Task {
  constructor(
    private title?: string,
    private description?: string,

  ) {}

  set _title(value: string | undefined) {
    this.title = value;
  }

  get _title(): string | undefined {
    return this.title;
  }

  set _description(value: string | undefined) {
    this.description = value;
  }

  get _description(): string | undefined {
    return this.description;
  }

}
