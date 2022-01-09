import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  transform(list: any, searchText: string): any {
    if (!list) {
      return [];
    }
    if (!searchText) {
      return list;
    }

    if (typeof list === 'number') {
      list = (<number>list).toString();
    }
   
    const value = list.replace(
      new RegExp(searchText, 'gi'),
      `<span style='background-color:yellow'>${searchText.toUpperCase()}</span>`
    );

    return this._sanitizer.bypassSecurityTrustHtml(value);
  }
}
