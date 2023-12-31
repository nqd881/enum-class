import { Value } from "./src/decorator";
import { Enum } from "./src/enum";

export class UserStatus extends Enum {
  @Value("active")
  static readonly Active: UserStatus;

  static readonly Inactive = new UserStatus("inactive");
}

console.log(UserStatus.Active);
console.log(UserStatus.values());
console.log(UserStatus.parse("active"));
