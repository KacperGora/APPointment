const phoneNumberFormatter = (phoneNumber: string) => {
  return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(
    3,
    6
  )} ${phoneNumber.slice(6, 9)}`;
};
export default phoneNumberFormatter;
