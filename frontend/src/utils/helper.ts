export const validateEmail = (email: string) => {
  const regexTemplate =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com)$/;
  return regexTemplate.test(email);
};
