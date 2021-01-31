export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email boş olamaz.🥲';
  if (!re.test(email)) return 'Ooops! Gerçek bir email adresi olmalıdır.';

  return '';
};

export const passwordValidator = (password) => {
  if (!password || password.length <= 0) return 'Şifre boş olamaz.🥲';

  return '';
};

export const nameValidator = (name) => {
  if (!name || name.length <= 0) return 'İsim boş bırakılamaz.🥲';

  return '';
};
