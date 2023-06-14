const emailRegex = new RegExp("^[a-z0-9]+@[a-z]+.[a-z]{2,3}$");
const phoneNumberRegex = new RegExp("^\\+[0-9]{12}$");

function validateEmail(email) {
  return emailRegex.test(email);
}
function validatePhoneNumber(email) {
  return phoneNumberRegex.test(email);
}

module.exports = {
  validateEmail,
  validatePhoneNumber,
};
