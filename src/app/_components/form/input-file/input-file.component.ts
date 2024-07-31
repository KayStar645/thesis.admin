import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, viewChild } from '@angular/core';
import { environment } from 'environments/environment.development';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';

@Component({
	selector: 'app-input-file-component',
	templateUrl: './input-file.component.html',
})
export class InputFileComponent implements OnChanges {
	@Input({ required: true }) folder!: string;
	@Input() value: string[] = [];
	@Input() required: boolean = false;
	@Input() multiple: boolean = false;
	@Input() disabled: boolean = false;
	@Input() accept: string = 'image/*';
	@Input() label: string = '';
	@Input() errorMessage: string = '';

	@Output() onChange = new EventEmitter<string[]>();

	selectedFiles: {
		data?: File;
		path: string;
		isNew: boolean;
	}[] = [];

	inputFile = viewChild<ElementRef<HTMLInputElement>>('inputFile');
	isLoading = false;
	showAlert = false;

	constructor(private http: HttpClient, private toast: ToastrService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && changes['value'].currentValue) {
			const value: string[] = changes['value'].currentValue;

			this.selectedFiles = value.map((t) => ({
				isNew: false,
				path: t,
			}));

			this.onChange.emit(this.selectedFiles.map((t) => t.path));
		}
	}

	handleSelect(event: Event) {
		const target = event.target as HTMLInputElement;

		if (!target.files) {
			return;
		}

		const files = Array.from(target.files).map((t) => ({
			data: t,
			path: URL.createObjectURL(t),
			isNew: true,
		}));

		this.showAlert = true;

		if (this.multiple) {
			this.selectedFiles = [...this.selectedFiles, ...files];

			return;
		}

		this.selectedFiles = files;
	}

	onRemove(index: number) {
		this.selectedFiles = this.selectedFiles.filter((t, i) => i !== index);

		this.onChange.emit(this.selectedFiles.map((t) => t.path));
	}

	onSelectNew() {
		this.selectedFiles = [];

		this.inputFile()?.nativeElement.click();
	}

	async onUpload() {
		this.isLoading = true;

		const reponses = await Promise.all(
			this.selectedFiles
				.filter((t) => t.isNew)
				.map(async (file) => {
					const formData = new FormData();

					formData.append('pFile', file.data!);

					const request = this.http.post<{ url: string }>(
						`${environment.api}/smw-api/amazons3/upload?pPath=${this.folder}`,
						formData,
					);

					return await lastValueFrom(request);
				}),
		);

		this.isLoading = false;
		this.showAlert = false;

		this.toast.success('Tải file thành công');

		this.onChange.emit(reponses.map((t) => t.url));
	}
}
