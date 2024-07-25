const validateForm = (input) => {
  if (input.type === "email") {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(input.value);
  }

  const isPasswordField = input.id === "password" || input.id === "confirmPassword" || input.id === "currentPassword" || input.id === "newPassword";
  if (isPasswordField) {
    return input.value.length >= 8;
  }

  return input.value.trim() !== "";
}

export default validateForm;
