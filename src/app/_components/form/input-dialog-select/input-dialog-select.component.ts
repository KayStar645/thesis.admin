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
	selector: 'app-input-dialog-select',
	templateUrl: './input-dialog-select.component.html',
	styles: ``,
})
export class InputDialogSelectComponent implements OnChanges, OnInit {
	@Input({ required: true }) columns: any[] = [];
	@Input({ required: true }) api!: keyof typeof api;
	@Input({ required: true }) dialogHeader: string = '';
	@Input({ required: true }) valueField: string = '';
	@Input({ required: true }) labelField: string = '';
	@Input() label: string = '';
	@Input() value?: string | number = '';
	@Input() placeholder: string = '';
	@Input() required: boolean = false;
	@Input() errorMessage: string = '';
	@Input() disabled: boolean = false;
	@Input() isAllDetail: boolean = false;
	@Input() dialogWidth: string = '80vw';
	@Input() filters: string = '';
	@Input() sorts: string = '';

	@Output() onChange = new EventEmitter<any>();

	visible = false;
	loading = false;
	selected: any = {};
	baseUrl = environment.api;
	data: any[] = [];

	pagination: WritableSignal<ExtraList> = signal({
		currentPage: 1,
		totalPages: 10,
		totalCount: 100,
		pageSize: 10,
	});

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.getData();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.data.length === 0) {
			this.getData(() => {
				if (changes['value'] && changes['value'].currentValue) {
					const foundIndex = this.data?.findIndex(
						(t) => t[this.valueField] === changes['value'].currentValue,
					);

					if (foundIndex !== undefined && this.data?.[foundIndex]) {
						this.data[foundIndex].isChecked = true;
						this.value = this.data[foundIndex][this.labelField];

						this.onChange.emit(this.data[foundIndex]);
					}
				}
			});

			return;
		}

		if (changes['value'] && changes['value'].currentValue) {
			const foundIndex = this.data?.findIndex((t) => t[this.valueField] === changes['value'].currentValue);

			if (foundIndex !== undefined && this.data?.[foundIndex]) {
				this.data[foundIndex].isChecked = true;
				this.value = this.data[foundIndex][this.labelField];

				this.onChange.emit(this.data[foundIndex]);
			}
		}
	}

	async getData(onSuccess?: () => void) {
		const params: RequestParams = {
			filters: this.filters,
			sorts: this.sorts,
			page: this.pagination().currentPage!,
			pageSize: this.pagination().pageSize!,
			isAllDetail: this.isAllDetail,
		};

		const httpParams = new HttpParams()
			.set('Filters', params.filters)
			.set('Sorts', params.sorts)
			.set('Page', params.page)
			.set('PageSize', params.pageSize)
			.set('IsAllDetail', !!params.isAllDetail);

		this.loading = true;

		this.http
			.get<Response>(`${this.baseUrl}/smw-api${api[this.api]}`, {
				params: httpParams,
			})
			.subscribe({
				next: (value) => {
					this.data = value.data || [];
					this.pagination.set(value.extra);
					this.loading = false;

					onSuccess?.();
				},
				error: () => {
					this.loading = false;
				},
			});
	}

	_onChange() {
		this.onChange.emit(this.selected);
		this.value = this.selected[this.labelField] as string;
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
		this.selected = event;
	}
}
