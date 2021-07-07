import { Linking } from "react-native";


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

export const nbValidator = (nb) => {
  if (!nb || nb.length === 0 || typeof nb != "number") return true;
  return false;
};

export const nboptValidator = (nb) => {
  if (typeof nb != "number") return true;
  return false;
};

export const _goToURL = (url) => {
  
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log('Impossible d\'ouvrir le lien: ' + url);
    }
  });
}
