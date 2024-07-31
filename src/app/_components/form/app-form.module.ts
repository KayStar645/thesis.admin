import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AppUiComponentModule } from '../ui/app-ui-component.module';
import { AppFormService } from './app-form.service';
import { GenericTableComponent } from './generic-table/generic.table.component';
import { InputCheckboxComponent } from './input-checkbox/input-checkbox.component';
import { InputDateComponent } from './input-date/input-date.component';
import { InputDialogSelectDrawMultiComponent } from './input-dialog-select-draw-multi/input-dialog-select-draw-multi.component';
import { InputDialogSelectMultiComponent } from './input-dialog-select-multi/input-dialog-select-multi.component';
import { InputDialogSelectComponent } from './input-dialog-select/input-dialog-select.component';
import { InputEditorComponent } from './input-editor/input-editor.component';
import { InputFileComponent } from './input-file/input-file.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputPriceComponent } from './input-price/input-price.component';
import { InputRadioMultiComponent } from './input-radio-multi/input-radio-multi.component';
import { InputSelectComponent } from './input-select/input-select.component';
import { InputTextComponent } from './input-text/input-text.component';
import { InputDateTimeComponent } from './intput-datetime/inputdatetime.component';
import { TextareaComponent } from './textarea/textarea.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ImageModule } from 'primeng/image';
import { InputDialogComponent } from './input-dialog/input-dialog.component';

@NgModule({
	declarations: [
		InputCheckboxComponent,
		InputEditorComponent,
		GenericTableComponent,
		InputDateComponent,
		InputFileComponent,
		InputNumberComponent,
		InputTextComponent,
		InputDateTimeComponent,
		InputPriceComponent,
		InputSelectComponent,
		InputDialogSelectComponent,
		InputDialogSelectMultiComponent,
		InputRadioMultiComponent,
		InputDialogSelectDrawMultiComponent,
		TextareaComponent,
		InputDialogComponent,
	],
	imports: [
		CommonModule,
		CKEditorModule,
		FormsModule,
		ReactiveFormsModule,
		AppUiComponentModule,
		CalendarModule,
		DropdownModule,
		FileUploadModule,
		DialogModule,
		AccordionModule,
		CheckboxModule,
		ConfirmDialogModule,
		CardModule,
		InputTextareaModule,
		ImageModule,
	],
	exports: [
		InputCheckboxComponent,
		InputEditorComponent,
		GenericTableComponent,
		InputDateComponent,
		InputFileComponent,
		InputNumberComponent,
		InputTextComponent,
		InputDateTimeComponent,
		InputPriceComponent,
		FormsModule,
		InputSelectComponent,
		InputDialogSelectComponent,
		DialogModule,
		AccordionModule,
		CheckboxModule,
		ConfirmDialogModule,
		CardModule,
		InputDialogSelectMultiComponent,
		InputRadioMultiComponent,
		RadioButtonModule,
		InputDialogSelectDrawMultiComponent,
		TextareaComponent,
		ImageModule,
		InputDialogComponent,
	],
	providers: [AppFormService, ConfirmationService],
})
export class AppFormModule {}
