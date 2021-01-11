export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email alanı boş olamaz😧.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = (password) => {
  if (!password || password.length < 8 || password.length > 16) return 'Şifre en az 8 en fazla 16 karakterden olusmalidir😧.';

  return '';
};

export const nameValidator = (name) => {
  if (!name || name.length <= 0) return 'İsim alanı boş bırakılamaz😧.';

  return '';
};
