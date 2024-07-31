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
	selector: 'app-input-dialog',
	templateUrl: './input-dialog.component.html',
	styles: ``,
})
export class InputDialogComponent implements OnInit {
	constructor(private http: HttpClient) {}
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
	currentPage = signal(1);
	keyword = signal('');
	errors: WritableSignal<{ [key: string]: string }> = signal({});
	loading = false;
	selected: any = {};
	baseUrl = environment.api;
	data: any[] = [];
	@Input() visible: boolean = false;
	@Output() visibleChange = new EventEmitter<boolean>();
	get isVisible(): boolean {
		return this.visible;
	}

	set isVisible(value: boolean) {
		this.visible = value;
		this.visibleChange.emit(this.visible);
	}

	pagination: WritableSignal<ExtraList> = signal({
		currentPage: 1,
		totalPages: 10,
		totalCount: 100,
		pageSize: 10,
	});
	ngOnInit(): void {
		this.getData();
	}

	async getData(onSuccess?: () => void) {
		const params: RequestParams = {
			filters: this.filters,
			sorts: '',
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

	onPageChange(event: number) {
		this.pagination.set({
			...this.pagination(),
			currentPage: event,
		});

		this.getData();
	}
	@Output() dialogClose = new EventEmitter<boolean>();

	closeDialog() {
		this.dialogClose.emit();
	}
}
