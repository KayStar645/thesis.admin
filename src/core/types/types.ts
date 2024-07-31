export interface Result<T> {
	data?: T;
	messages?: string[];
	succeeded?: boolean;
	code?: number;
}

export interface ResultStatus {
	data?: boolean;
	messages?: string[];
	succeeded?: boolean;
	code?: number;
}
export interface ResultApply {
	data?: boolean;
	messages?: [];
	succeeded?: boolean;
	code?: number;
}
export interface Extra {
	currentPage?: number;
	totalPages?: number;
	totalCount?: number;
	pageSize?: number;
}

export interface PaginatedResult<T> extends Result<T> {
	extra?: Extra;
}

export interface ResultList<T> {
	data?: T[];
	messages?: any;
	succeeded?: boolean;
	code?: number;
}

export interface ExtraList {
	currentPage?: number;
	totalPages?: number;
	totalCount?: number;
	pageSize?: number;
	hasPreviousPage?: boolean;
	hasNextPage?: boolean;
}

export type Pagination = {
	currentPage: number;
	totalItems: number;
	itemsPerPage: number;
};

export type OptionTpe = {
	code: string;
	label: string;
	to?: string;
	icon?: string;
	permissions?: string[];
	shouldShow?: boolean;
	options?: OptionTpe[];
};

export type TokenData = {
	permission: string[];
	userName: string;
};
