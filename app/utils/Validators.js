const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const re = /^[0-9]{5}$/;
// var reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.([a-zA-Z]{2,5}|[a-zA-z]{2,5}\.[a-zA-Z]{2,5})$/

export const isEmailValid = email => {
  var re =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.([a-zA-Z]{2,5}|[a-zA-z]{2,5}\.[a-zA-Z]{2,5})$/;
  return re.test(email);
};

export const validatePassword = password => {
  if (password.length === 0) {
    return true;
  } else if (password.length >= 6) {
    return password;
  }
};
