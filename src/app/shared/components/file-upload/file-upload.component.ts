import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  
  @Input() extensions: string;

  @Output() onUpload = new EventEmitter<File>();

  @ViewChild('file') _file: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  onFileChange(file: FileList) {
    this.onUpload.emit(file[0]);
    this._file.nativeElement.value = null;
  }
}
