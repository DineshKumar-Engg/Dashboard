export const errTitle = 'Error!';
export const oopsTitle =' Oops!'
export const scc = 'Success';
export const poscent = 'center';
export const posTop = 'top-end';
export const errIcon = 'error';
export const sccIcon = 'success';
export const BtnCanCel = 'Cancel';
export const BtnGreat = 'Great!';
export const Years = [
    {
        label:"2023",
        value:"2023"
    },
    {
        label:"2024",
        value:"2024"
    },
    {
        label:"2025",
        value:"2025"
    },
    {
        label:"2026",
        value:"2026"
    }
]

const getNewYorkDate = () => {
    const nowInNewYork = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    return new Date(nowInNewYork);
};
export  const today = getNewYorkDate();



