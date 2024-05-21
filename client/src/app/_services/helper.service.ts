import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  maxDescription: number = 10000;

  constructor() { }

  changeTimeZone(uploadedDate: string) {
    var time = Number(uploadedDate?.substring(11,13));
    var day = Number(uploadedDate?.substring(8,10));

    var date = new Date(uploadedDate)

    var hours = 1;
    // var newDate = new Date(date.setHours(date.getHours() + hours));

    // if (hours === 0) return uploadedDate;
    // else return newDate.toDateString();
    
    var newTime = time - hours;
    if (time >= 2) {
      if (time > 10) {
        uploadedDate = uploadedDate.replace((uploadedDate.substring(11,14)), newTime.toString() + ":");
      } else {
        uploadedDate = uploadedDate.replace((uploadedDate.substring(11,14)), "0" + newTime.toString() + ":");
      }
    } else if (time === 0) {
      var newDay = day - 1;
      newTime = 23;
      if (Number(uploadedDate.substring(5,7)) > 1) {
        uploadedDate = this.adjustDay(uploadedDate, newTime, newDay);
      } else {
        uploadedDate = this.adjustDay(uploadedDate, newTime, newDay);
        uploadedDate = this.adjustYear(uploadedDate);
      }
    } 
    return uploadedDate
  }

  adjustDay(uploadedDate: string, newTime: number, newDay: number) {
    var year = uploadedDate.substring(0,4);
    uploadedDate = uploadedDate.replace((uploadedDate.substring(0,4)), 'XXXX')
    if (Number(uploadedDate.substring(8,10)) > 1) {
      uploadedDate = uploadedDate.replace((uploadedDate.substring(11,14)), newTime.toString() + ":");
      uploadedDate = uploadedDate.replace((uploadedDate.substring(8,10)), newDay.toString());
    } else if (Number(uploadedDate.substring(8,10)) === 1) {
      newDay = 31;
      var newMonth = Number(uploadedDate.substring(5,7)) - 1;
      uploadedDate = uploadedDate.replace((uploadedDate.substring(11,14)), newTime.toString() + ":");
      uploadedDate = uploadedDate.replace((uploadedDate.substring(8,10)), newDay.toString() + "T");
      uploadedDate = uploadedDate.replace((uploadedDate.substring(4,8)), "-0" + newMonth.toString() + "-");
      var month = Number(uploadedDate.substring(5,7));
      if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {         
        newDay = 31;
      } else if (month === 4 || month === 6 || month === 9 || month === 11) {
        newDay = 30;
      } else if (month === 2) {
        newDay = this.checkLeapYear(uploadedDate);
      }
      uploadedDate = uploadedDate.replace((uploadedDate.substring(8,11)), newDay.toString() + "T");
    }
    uploadedDate = uploadedDate.replace((uploadedDate.substring(0,4)), year)
    return uploadedDate;
  }

  adjustYear(uploadedDate: string) {
    var newYear = Number(uploadedDate.substring(0,4)) - 1;
    uploadedDate = uploadedDate.replace(uploadedDate.substring(4,8), "-" + 12 + "-");
    uploadedDate = uploadedDate.replace(uploadedDate.substring(0,5), newYear.toString() + "-");
    return uploadedDate;
  }

  checkLeapYear(uploadedDate: string) {
    var year = Number(uploadedDate.substring(0,4));
    var day = 28;
    if ((year%4 === 0 && year%100 !== 0) || year%400 === 0) {
      day = 29;
    } else {
      day = 28;
    }
    return day;
  }

  checkIfOlderThan15Mins(date: any, user: any) {
    var currentDate = new Date().getTime();
    var newDate = new Date(Number(Date.parse(date))).getTime();
    if (user.roles[0] !== 'Admin' || user.roles[1] !== 'Moderator') {
      if ((currentDate - newDate) > 15 * 60 * 1000) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  checkIfOlderThan1Hour(date: any, user: any) {
    var currentDate = new Date().getTime();
    var newDate = new Date(Number(Date.parse(date))).getTime();
    if (user.roles[0] !== 'Admin' || user.roles[1] !== 'Moderator') {
      if ((currentDate - newDate) > 60 * 60 * 1000) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  checkIfUserWorthy(mainMemes: number) {
    if (mainMemes > 5) {
      return true;
    } else {
      return false;
    }
  }
}
