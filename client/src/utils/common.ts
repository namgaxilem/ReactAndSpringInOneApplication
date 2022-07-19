const getUserFirstAndLastNameCharacter = (name: string = "") => {
    let array = name.split(" ");
    return array[0].charAt(0) + array[array.length - 1].charAt(0);
}

export {
    getUserFirstAndLastNameCharacter
}