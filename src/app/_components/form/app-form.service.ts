import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
	providedIn: 'root',
})
export class AppFormService {
	constructor() {}

	async validate<T>(
		schema: any,
		value: any,
	): Promise<{ valid: boolean; message?: { [key: string]: string }; data?: T }> {
		try {
			const result = await schema.validate(value, {
				abortEarly: false,
			});

			return {
				valid: true,
				data: result,
				message: undefined,
			};
		} catch (ex: any) {
			const errors: ValidationErrors[] = ex.inner;
			const result: { [key: string]: string } = {};

			errors.map((err) => {
				result[err['path']] = err['message'];
			});

			return {
				valid: false,
				message: result,
				data: {} as T,
			};
		}
	}
}
