import { HttpClient, HttpParams } from '@angular/common/http';
import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	signal,
	SimpleChanges,
	WritableSignal,
} from '@angular/core';
import { api } from 'config/api';
import { RequestParams } from 'core/params/requestParams';
import { ExtraList, ResultList } from 'core/types/types';
import { environment } from 'environments/environment.development';

type Response = ResultList<any> & {
	extra: ExtraList;
};

@Component({
	selector: 'app-input-dialog-select-multi',
	templateUrl: './input-dialog-select-multi.component.html',
	styles: ``,
})
export class InputDialogSelectMultiComponent implements OnChanges, OnInit {
	@Input({ required: true }) columns: any[] = [];
	@Input({ required: true }) api!: keyof typeof api;
	@Input({ required: true }) dialogHeader: string = '';
	@Input({ required: true }) valueField: string = '';
	@Input({ required: true }) labelField: string = '';
	@Input() filter: string = '';
	@Input() param: { [key: string]: string | number } = {};
	@Input() subValueField: string = '';
	@Input() label: string = '';
	@Input() value: any[] = [];
	@Input() placeholder: string = '';
	@Input() required: boolean = false;
	@Input() queryEnable: boolean = true;
	@Input() errorMessage: string = '';
	@Input() disabled: boolean = false;
	@Input() dataDisplay: 'table' | 'inbox' = 'inbox';
	@Input() dialogWidth = '60rem';
	@Input() dataReturn: 'all' | 'valueField' = 'valueField';

	@Output() onChange = new EventEmitter<any[]>();

	visible = false;
	loading = false;
	selected: any[] = [];
	baseUrl = environment.api;
	data: any[] = [];

	formattedValue: WritableSignal<any[]> = signal([]);

	pagination: WritableSignal<ExtraList> = signal({
		currentPage: 1,
		pageSize: 10,
	});

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.getData();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && changes['value'].currentValue && changes['value'].firstChange) {
			if (this.data.length === 0) {
				this.getData(() => this.formatValue(changes['value'].currentValue));
				return;
			}

			this.formatValue(changes['value'].currentValue);
		}
	}

	formatValue(value: any[]) {
		const result: any[] = [];

		value.forEach((item) => {
			const foundIndex = this.data?.findIndex(
				(t) =>
					(t[this.subValueField] || t[this.valueField]) ===
					(item[this.subValueField] || item[this.valueField] || item),
			);

			if (foundIndex !== undefined && this.data?.[foundIndex]) {
				this.data[foundIndex].isChecked = true;

				result?.push(this.data[foundIndex]);
			}
		});

		this.selected = result;
		this.formattedValue.set(result);

		this.onChange.emit(this.dataReturn === 'all' ? result : result?.map((t) => t[this.valueField]));
	}

	async getData(onSuccess?: (data: any[]) => void) {
		if (!this.queryEnable) {
			return;
		}

		const params = {
			filters: this.filter,
			sorts: '',
			page: this.pagination().currentPage!,
			pageSize: this.pagination().pageSize!,
			isAllDetail: true,
			...this.param,
		};

		this.loading = true;

		await this.http
			.get<Response>(`${this.baseUrl}/smw-api${api[this.api]}`, {
				params,
			})
			.subscribe({
				next: (value) => {
					this.data = value.data || [];

					if (value.extra) {
						this.pagination.set(value.extra);
					}

					this.loading = false;

					onSuccess?.(value.data || []);
				},
				error: () => {
					this.loading = false;
				},
			});
	}

	_onChange() {
		this.formattedValue.set(this.selected);
		console.log('🚀 ~ InputDialogSelectMultiComponent ~ _onChange ~ this.selected:', this.selected);

		this.onChange.emit(this.dataReturn === 'all' ? this.selected : this.selected.map((t) => t[this.valueField]));

		this.visible = false;
	}

	onPageChange(event: number) {
		this.pagination.set({
			...this.pagination(),
			currentPage: event,
		});

		this.getData();
	}

	onSelect(event: any) {
		const foundIndex = this.selected.findIndex((t) => t[this.valueField] === event[this.valueField]);

		if (foundIndex === undefined || foundIndex === -1) {
			this.selected = [...this.selected, event];
			return;
		}

		this.selected = this.selected.filter((t, i) => i !== foundIndex);
	}
}
