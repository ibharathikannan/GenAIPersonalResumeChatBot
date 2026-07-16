import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";

declare const ga: any;
declare const s: any;
declare const g_countryCode: any;
declare const g_tagging_data: any;

@Injectable()
export class Helper {
  constructor() { }

  //Tagging-START
  static setupGa(trackingId: string):void {
    ga('create', trackingId, 'auto');
  }

  static trackGaPageView(pageName: string, campaignName: string, division: string):void {
    const siteCode = 'sg';
    ga('set', 'title', `${siteCode}:sespAppointmentBooking:${division}:${campaignName}:${pageName}`);
    ga('set', 'contentGroup1', `${siteCode}`);
    ga('set', 'contentGroup2', `${siteCode}:sespAppointmentBooking`);
    ga('set', 'contentGroup3', `${siteCode}:sespAppointmentBooking:${division}`);
    ga('set', 'contentGroup4', `${siteCode}:sespAppointmentBooking:${division}:${campaignName}`);
    ga('set', 'contentGroup5', `${siteCode}:sespAppointmentBooking:${division}:${campaignName}:${pageName}`);

    ga('set', 'dimension1', `${siteCode}`);
    ga('set', 'dimension2', `${siteCode}:sespAppointmentBooking`);
    ga('set', 'dimension3', 'microsite');
    ga('set', 'dimension6', document.URL);
    ga('set', 'dimension7', document.referrer);

    ga('send', 'pageview');
  }

  static trackGaAction(action: string, label: string, campaignName:string):void {
    ga('send', 'event', 'microsite', action, `${campaignName}:${label}`);
  }

  static trackAaPageView(pageName:string, campaignName: string, subCode: string) {
    const siteCode = 'sg';
    subCode = subCode.toLowerCase();
    s.pageName = siteCode + ':sespAppointmentBooking:' + subCode + ':' + campaignName + ':' + pageName;
    s.hier1 = siteCode + '>sespAppointmentBooking>' + subCode + '>' + campaignName + '>' + pageName;
    s.channel = siteCode + ':sespAppointmentBooking';
    s.prop1 = siteCode;
    s.prop2 = siteCode + ':sespAppointmentBooking';
    s.prop3 = siteCode + ':sespAppointmentBooking:' + subCode;
    s.prop4 = siteCode + ':sespAppointmentBooking:' + subCode + ':' + campaignName;
    s.prop5 = siteCode + ':sespAppointmentBooking:' + subCode + ':' + campaignName + ':' + pageName;
    const s_code = s.t();
    if (s_code) {
        document.write(s_code);
    }
    if (navigator.appVersion.indexOf('MSIE') >= 0) {
        document.write(unescape('%3C') + '\!-' + '-');
    }
  }

  static trackAaAction(action: string, campaignName:string):void {
    s.linkTrackVars = 'eVar33,events';
    s.linkTrackEvents = 'event45';
    s.eVar33 = g_countryCode + ':' + campaignName + ':' + action;
    s.events = 'event45'; s.tl(this, 'o', campaignName + ':' + action);
}


  //Tagging-END


  static isNumeric(numString: string) {
    return !Number.isNaN(Number(numString));
  }

  static isEmptyFile(files: FileList) {
    return files == null || files.length === 0;
  }

  static isOverSizeFile(files: FileList) {
    // max file size 10 MB;
    return files != null && (files[0].size / 1000000 > 10);
  }

  static isValidFileExtension(files: FileList) {
    const validFileExtensions = [".jpg", ".jpeg", ".gif", ".png"];
    if (files != null && files.length !== 0) {
      const file = files[0];
      const ext = file.name.substring(file.name.indexOf("."));
      return ext && validFileExtensions.indexOf(ext.toLowerCase()) > -1;
    }
    return false;
  }

  static isJson(value: string): boolean {
    try {
      JSON.parse(value);
    } catch (e) {
      return false;
    }
    return true;
  }

  //To avoid padStart in IE
  static zeroFill(number: string, width: number) {
    width -= number.toString().length;
    if (width > 0) {
      return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + ""; // always return a string
  }

  static getDateString(date: Date): string {
    const year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    month = this.zeroFill(month, 2);
    day = this.zeroFill(day, 2);
    return year + month + day;
  }

  static unsubscriber(sub: Subscription) {
    if (sub) {
      sub.unsubscribe()
    }
  }
}