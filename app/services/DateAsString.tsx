
export namespace date {

    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    export const GetNumberOfDaysInCurrentMonth = (today: Date) => {
        const numberOfDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        return numberOfDays;
    }
    
    export const GetMonthAsString = (date: Date | undefined) => {
        if(!date) return "";
        return monthNames[date.getMonth()]
    }

    export const GetYearAsString = (date: Date | undefined) => {
        if(!date) return "";
        return date.getFullYear()
    }

    

    export const AsString = (date: Date | undefined) => {
        if(!date) return "";
        const yyyy = date.getFullYear();
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let dateStr = '';
        if (dd < 10) {
            dateStr = '0';
        }
        dateStr += String(dd) + "/";
        if (mm < 10) {
            dateStr += '0';
        }
        dateStr += String(mm) + "/" + yyyy;
        return dateStr;
    }

    export const AsDatabaseString= (date: Date | undefined) => {
        //"2023-04-20"
        if(!date) return "";
        const yyyy = date.getFullYear();
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let dateStr = yyyy + '-';
        if (mm < 10) {
            dateStr += '0';
        }
        dateStr += String(mm) + "-";
        if (dd < 10) {
            dateStr += '0';
        }
        dateStr += String(dd);
        return dateStr;
    }

    export const GetFirstDayOfMonth = () => {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        return AsDatabaseString(firstDay);
    }
    export const GetLastDayOfMonth = () => {
        const today = new Date();
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return AsDatabaseString(lastDay);
    }

    export const GetMonthKey = (date: Date) => {
        const month = Number(date.getMonth()+1).toString().padStart(2, '0');
        const dateKey = date.getFullYear() + '_' + month;
        return dateKey;
    }

    export const GetKeyDisplay = (key: string) => {
        const arr = key.split("_");
        
        const month = Number(arr[1]);
        const year = arr[0];
        return monthNames[(month-1)] + " " + year;
    }

    export const GetMonthFromKey = (key: string) => {
        const arr = key.split("_");
        const month = Number(arr[1]);
        return month;
    }
    
}