export const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^01[0-9]{9}$/;
    return phoneRegex.test(phoneNumber);
  };