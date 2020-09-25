// name validation check of length
export const nameCheck = (event) =>{
    const length = event.target.value.length > 2;
    if (length) {
        return true;
    } else {
        return false;
    }
}
// email validation check to have @ , dot
export const emailCheck = (event) => {
    if (event.target.name === 'email') {
        const response = /\S+@\S+\.\S+/;
        return response.test(event.target.value);
    }
}

// password validation check 
export const passwordCheck = (event) => {
    const length = event.target.value.length > 5;
    const hasNumber = /\d{1}/.test(event.target.value);
    if (length && hasNumber) {
        return true;
    } else {
        return false;
    }
}
