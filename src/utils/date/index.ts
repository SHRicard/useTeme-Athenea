export const formatDate = (date?: Date): string => {
    if (!date) return "DD/MM/YYYY";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
    //Return  DD/MM/YYYY
};

export const formatDateWeb = (input: string) => {
    const cleanedInput = input.replace(/[^0-9]/g, "").substring(0, 8);
    let day = cleanedInput.substring(0, 2);
    let month = cleanedInput.substring(2, 4);
    let year = cleanedInput.substring(4, 8);

    if (day.length > 0 && month.length > 0 && year.length > 0) {
        return `${day}/${month}/${year}`;
    } else if (day.length > 0 && month.length > 0) {
        return `${day}/${month}`;
    } else if (day.length > 0) {
        return `${day}`;
    }
    return "";
    //Return  DD/MM/YYYY
};

export const fullDateTime = () => {
    const date = new Date();

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
    // Return: "DD/MM/YYYY HH:mm:ss"
};
