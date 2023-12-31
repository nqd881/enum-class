import { Enum, EnumClass, EnumValue } from "./enum";

export const Value = <T extends Enum>(enumValue?: EnumValue) => {
  return <U extends EnumClass<T>>(target: U, propertyKey: string) => {
    if (!target[propertyKey])
      target[propertyKey] = new target(enumValue ?? propertyKey);
  };
};
