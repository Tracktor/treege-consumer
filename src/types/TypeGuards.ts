export const IsString = (x: unknown): x is string => typeof x === "string";

const TypeGuards = {
  IsString,
};

export default TypeGuards;
