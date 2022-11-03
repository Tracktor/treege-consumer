const prefixName = (name: string, path?: string) => {
  if (!path) return name;
  return path.substring(1).replaceAll("/", ".").concat(".", name);
};

export default prefixName;
