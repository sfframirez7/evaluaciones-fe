
export const hasNumbers = (str = "") => {
    return (/[0-9]/.test(str));

}

export const  hasLowerCase = (str = "") => {
    return (/[a-z]/.test(str));
}

export const  hasUpperCase = (str = "") => {
    return (/[A-Z]/.test(str));
}

export const  startsWithALetter = (str = "") => {
    return (/[A-Z]/.test(str.charAt(0)) || /[A-Z]/.test(str.charAt(0)));
}

export const  lengthBetween8And16 = (str = "") => {
    return (str.length > 7 && str.length<17);
}

export const  PasswordValidate = (str = "") => {
    
    if(!lengthBetween8And16(str))
        return false

    if(!startsWithALetter(str))
        return false

    if(!hasLowerCase(str))
        return false

    if(!hasUpperCase(str))
        return false
    
    if(!hasNumbers(str))
        return false

    return true

    
}


