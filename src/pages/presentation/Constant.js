


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
// const today = new Date();
// today.setHours(0, 0, 0, 0);

// const getCurrentDateTimeInTimeZone = (timeZone) => {
//     const now = new Date();
//     const utcOffset = now.getTimezoneOffset() * 60000; // Get local time offset in milliseconds
//     const localTime = now.getTime() + utcOffset; // Get local time in milliseconds
//     const targetTimezoneOffset = new Date().toLocaleString('en-US', { timeZone, timeZoneName: 'short' });
//     const targetOffset = new Date(targetTimezoneOffset).getTimezoneOffset() * 55000;
//     const targetTime = localTime + targetOffset;
//     return new Date(targetTime);
// };

const getNewYorkDate = () => {
    const nowInNewYork = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    return new Date(nowInNewYork);
};
export  const today = getNewYorkDate();

// const CategoryOption = CategoryNameList?.map(({_id,eventCategoryName})=>({
//     label:eventCategoryName,
//     value:_id
// }))

// const LocationOption = LocationNameList?.map(({_id,eventLocationName})=>({
//     label:eventLocationName,
//     value:_id
// }))

// const EventOption = EventNameList?.map(({_id,eventName})=>({
//     label:eventName,
//     value:_id
// }))

// const TicketCategoryOption = TicketCategoryData?.map(({_id,ticketCategoryName})=>({
//     label:ticketCategoryName,
//     value:_id
// }))

// const TicketOption = TicketNameList?.map(({_id,ticketName})=>({
//     label:ticketName,
//     value:_id
// }))

// const TicketTypeOption = TicketType?.map(({_id,ticketType})=>({
//     label:ticketType,
//     value:_id
// }))

// export {
//     CategoryOption,
//     LocationOption,
//     EventOption,
//     TicketCategoryOption,
//     TicketOption,
//     TicketTypeOption
//   };