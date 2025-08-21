export const validateEmail = (email: string) => {
  const regexTemplate =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com)$/;
  return regexTemplate.test(email);
};

export const getInitials = (title: string) => {
  if (!title) return "";
  const words = title.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials;
};
