import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

@Component({
	selector: 'app-input-editor-component',
	templateUrl: './input-editor.component.html',
})
export class InputEditorComponent implements OnChanges {
	@Input() label: string = '';
	@Input() required: boolean = false;
	@Input() disabled: boolean = false;
	@Input() value?: string = '';
	@Input() errorMessage: string = '';

	@Output() onChange = new EventEmitter<string>();

	Editor = ClassicEditor;

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && changes['value'].currentValue) {
			this.onChange.emit(changes['value'].currentValue);
		}
	}

	onReady(editor: DecoupledEditor): void {
		const element = editor.ui.getEditableElement()!;
		const parent = element.parentElement!;

		parent.insertBefore(editor.ui.view.toolbar.element!, element);
	}

	_onChange(event: ChangeEvent) {
		const inputValue = event.editor.getData();
		this.onChange.emit(inputValue);
	}
}
