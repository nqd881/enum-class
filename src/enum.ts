export type EnumValue = string | number;

export class Enum {
  private readonly _value: EnumValue;

  constructor(value: EnumValue) {
    this._value = value;
  }

  static parse<T extends Enum>(this: EnumClass<T>, value: EnumValue) {
    const instance = this.values().find(
      (instance: T) => instance.value === value
    );

    if (!instance)
      throw new Error(`Cannot parse value ${value} to enum ${this.name}`);

    return instance;
  }

  static parseSafe<T extends Enum>(this: EnumClass<T>, value: EnumValue) {
    try {
      return this.parse(value);
    } catch (error) {
      return null;
    }
  }

  static values<T extends Enum>(this: EnumClass<T>): T[] {
    const properties = Object.getOwnPropertyNames(this);

    return properties
      .map((name) => (this as any)[name])
      .filter((value) => value instanceof this);
  }

  get value() {
    return this._value;
  }
}

export type EnumClass<T extends Enum> = {
  new (...params: ConstructorParameters<typeof Enum>): T;
  prototype: T;
} & Omit<typeof Enum, "constructor" | "prototype"> & {
    [K in keyof T]?: T;
  };
