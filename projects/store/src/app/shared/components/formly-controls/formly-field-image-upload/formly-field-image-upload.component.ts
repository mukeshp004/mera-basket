import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FieldType } from '@ngx-formly/bootstrap/form-field';
import { FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-image-upload',
  templateUrl: './formly-field-image-upload.component.html',
  styleUrls: ['./formly-field-image-upload.component.scss'],
})
export class FormlyFieldImageUploadComponent extends FieldType<FieldTypeConfig> {
  // url: string | ArrayBuffer | null | undefined;
  url: any;
  file: any;

  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      
      this.file = event.target.files[0]

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.url = event?.target?.result;
        this.cd.detectChanges();
      };


      this.formControl.setValue(this.file);
    }
  }
}
