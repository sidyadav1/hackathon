const validateEmail = (email) => {
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return emailRegex.test(email);
};

const validateName = (username) => {
    if (username) {
        return true;
    }
    return false;
};

const validatePassword = (password) => {
    const number = /[0-9]/g;
    const upperCase = /[A-Z]/g;
    const lowerCase = /[a-z]/g;
    if (
        !password ||
        password.length < 8 ||
        !number.test(password) ||
        !upperCase.test(password) ||
        !lowerCase.test(password)
    ) {
        return false;
    }
    return true;
};

module.exports = { validateEmail, validateName, validatePassword };
