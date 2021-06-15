export const emailValidator = (email) => {
  const regex = /\S+@\S+\.\S+/;

  if (!email || email.length === 0) return true;
  if (!regex.test(email)) return true;
  return false;
};

export const passwordValidator = (password) => {
  if (!password || password.length === 0) return true;
  return false;
};

export const nameValidator = (name) => {
  if (!name || name.length === 0) return true;
  return false;
};
