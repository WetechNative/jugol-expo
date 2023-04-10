export const getUserAge = (dob: Date | string | undefined) => {
  if (dob) {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const age = new Date(difference);

    return Math.abs(age.getUTCFullYear() - 1970);
  } else {
    return 0;
  }
};
