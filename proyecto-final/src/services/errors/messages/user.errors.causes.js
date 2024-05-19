export const generateRegistrationError = (user) => {
    return `One or more properties were sent incomplete or are not valid.
    List of required properties:
    -> first_name: type String, reveiced: ${user.first_name}
    -> last_name: type String, reveiced: ${user.last_name}
    -> email: type String, reveiced: ${user.email}
    -> age: type Number, reveiced: ${user.age}
    -> password: type String, reveiced: ${user.password}
    `
}

export const generateUserExistsError = ({email}) => {
    return `Another user alredy exists with that email
    -> email: ${email}
    `
}

export const generateLoginError = (user) => {
    return `Invalid Credentials
    List of received credentials:
    -> email: ${user.email}
    -> password: ${user.password}
    `
}

export const generateNotFoundError = (user) => {
    return `Could not find user
    List of required properties:
    -> id: type ObjectID, received: ${user.id}
    -> email: tpye String, received: ${user.email}
    `
}