export const IsString = (x: any): x is string => typeof x === "string";

const TypeGuards = {
  IsString,
};

export default TypeGuards;
