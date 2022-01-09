import {
  Component,
  OnInit,
  ContentChild,
  AfterViewInit,
  ElementRef,
  Renderer2,
} from "@angular/core";
import { FormControlName, FormControl, ValidationErrors } from "@angular/forms";

@Component({
  selector: "[validator]",
  templateUrl: "./validator-component.component.html",
  styleUrls: ["./validator-component.component.css"],
})
export class ValidatorComponent implements OnInit, AfterViewInit {
  @ContentChild(FormControlName) formControl: FormControl;

  constructor(private el: ElementRef, private render: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.formControl.valueChanges.subscribe((value) => {  
      this.erros(this.formControl.errors);
      this.isValid();
    });

    this.render.listen(
      this.el.nativeElement.querySelector(".form-control"),
      "blur",
      () => {
        this.erros(this.formControl.errors);
      }
    );
  }

  error_msg = "";
  private erros(err: ValidationErrors) {
    this.isValid();

    if (!err) return;

    Object.keys(err).forEach((key) => {
      switch (key) {
        case "email":
          this.error_msg = "E-mail inválido!";
          break;
        case "required":
          this.error_msg = "Campo obrigatório!";
          break;
        case "pattern":
          this.error_msg = "Formato inválido!";
          break;
        case "mask":
          this.error_msg = `Formato inválido, esperado ${err[key].requiredMask}`;
          break;
        case "dateFormat":
          this.error_msg = `Data inválida!`;
          break;
        case "minlength":
        case "maxlength":
          this.error_msg = `Limite de ${err[key].requiredLength} caracteres`;
          break;
        case "min":
          this.error_msg = `Valor mínimo: ${err[key].min}`;
          break;
        case "max":
          this.error_msg = `Valor máximo: ${err[key].max}`;
          break;
        default:
          break;
      }
    });
  }

  private isValid() {
    // console.log(
    //   this.formControl.valid,
    //   this.formControl["name"],
    //   this.formControl.pristine
    // );
    if (
      this.formControl.valid &&
      (this.formControl.touched || this.formControl.dirty)
    ) {
      this.el.nativeElement
        .querySelector(".form-control")
        .classList.remove("has-error");
      this.el.nativeElement
        .querySelector(".form-control")
        .classList.remove("is-invalid");
      if (this.formControl.value) {
        this.el.nativeElement
          .querySelector(".form-control")
          .classList.add("is-valid");
      } else {
        this.el.nativeElement
          .querySelector(".form-control")
          .classList.remove("is-valid");
      }
    } else if (
      (this.formControl.dirty || this.formControl.touched) &&
      this.formControl.invalid
    ) {
      this.el.nativeElement
        .querySelector(".form-control")
        .classList.add("has-error");
      this.el.nativeElement
        .querySelector(".form-control")
        .classList.add("is-invalid");
      this.el.nativeElement
        .querySelector(".form-control")
        .classList.remove("is-valid");
    } else {
      this.el.nativeElement
        .querySelector(".form-control")
        .classList.remove("is-valid");
      this.el.nativeElement
        .querySelector(".form-control")
        .classList.remove("has-error");
      this.el.nativeElement
        .querySelector(".form-control")
        .classList.remove("is-invalid");
    }
  }
}
