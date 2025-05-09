import countries from "@/data/pais.data.json";

export const countryOptions = countries.map((country) => ({
    code: country.code,
    label: `${country.flag} - ${country.name}`,
    value: country.name,
}));
