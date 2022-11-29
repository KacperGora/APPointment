export const validateFullName = (fullName) => {
  return /^[A-Z][A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{3,}(?: [A-Z][A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*){0,2}$/.test(
    fullName
  );
};
export const validatePhoneNumber = (phoneNumber) => {
  return /\d{3}[ ]?\d{3}[ ]?\d{3}(?!\w)/.test(phoneNumber);
};
