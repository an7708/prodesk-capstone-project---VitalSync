    import { format, formatDistanceToNow, isToday, isTomorrow } from 'date-fns';

    export const formatDate = (date) => format(new Date(date), 'dd MMM yyyy');

    export const formatDateTime = (date) => format(new Date(date), 'dd MMM yyyy, h:mm a');

    export const formatTime = (date) => format(new Date(date), 'h:mm a');

    export const timeAgo = (date) => formatDistanceToNow(new Date(date), { addSuffix: true });

    export const formatAppointmentDate = (date) => {
    const d = new Date(date);
    if (isToday(d)) return `Today at ${formatTime(d)}`;
    if (isTomorrow(d)) return `Tomorrow at ${formatTime(d)}`;
    return formatDateTime(d);
    };