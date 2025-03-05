export const PART_OF_DAY = {
    1: "Morning",
    2: "Afternoon",
    3: "Evening",
};

export const PART_OF_DAY_OPTIONS = Object.entries(PART_OF_DAY).map(([value, label]) => ({
    value: Number(value),
    label,
}));
