
export namespace date {

    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    export const GetMonthAsString = (date: Date | null) => {
        if(!date) return "";
        return monthNames[date.getMonth()]
    }

    export const AsString = (date: Date | null) => {
        if(!date) return "";
        const yyyy = date.getFullYear();
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let dateStr;
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
    
}