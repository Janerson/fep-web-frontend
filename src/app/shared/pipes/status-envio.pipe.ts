import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "statusEnvio",
})
export class StatusEnvioPipe implements PipeTransform {
  transform(status: string): string {
    let css = "";
    switch (status) {
      case undefined:
        css = "danger";
        break;
      case "NAO_HOMOLOGADO":
        css = "warning";
        break;
      case "HOMOLOGADO":
        css = "success";
        break;
      default:
        css = "warning";
        break;
    }
    return css;
  }
}
