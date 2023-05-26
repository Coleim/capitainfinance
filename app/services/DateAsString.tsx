
export namespace date {

    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    export const GetNumberOfDaysInCurrentMonth = (today: Date) => {
        console.log("GetNumberOfDaysInCurrentMonth")
        console.log(today)
        const numberOfDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        console.log(numberOfDays)
        return numberOfDays;
    }
    
    export const GetMonthAsString = (date: Date | undefined) => {
        if(!date) return "";
        return monthNames[date.getMonth()]
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
    
}