export const generatePassword = (characteristics, length) => {
    let chosenCharacteristics = characteristics.filter(({isEnabled}) => isEnabled).map(({value}) => value);
    if (chosenCharacteristics.length === 0) return "Choose characters";
    chosenCharacteristics = chosenCharacteristics.reduce((a, b) => a + b);
    return [...Array(length).keys()]
        .map(() => chosenCharacteristics.charAt(Math.floor(Math.random() * chosenCharacteristics.length)))
        .reduce((a, b) => a + b);
};
