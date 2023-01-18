const removeAtSymbol = (userMediaTag) => {
  return userMediaTag.replace("@", "");
};

export const convertSocialMediaURL = (userMediaTag, socialMedia) => {
  return socialMedia + removeAtSymbol(userMediaTag);
};
