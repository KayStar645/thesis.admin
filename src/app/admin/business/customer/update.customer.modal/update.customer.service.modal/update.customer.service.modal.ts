import { DOCUMENT } from '@angular/common';
import { ComponentFactoryResolver, Inject, Injectable, Injector, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { UpdateCustomerModalComponent } from '../update.customer.modal';
import { ICustomer } from 'data/requests/customer/customer.request';

@Injectable()
export class UpdateCustomerModalService {
	private modalNotifier?: Subject<string>;
	constructor(
		private resolver: ComponentFactoryResolver,
		private injector: Injector,
		@Inject(DOCUMENT) private document: Document,
	) {}

	open(content: TemplateRef<any>, options?: { customer: ICustomer }) {
		const modalComponentFactory = this.resolver.resolveComponentFactory(UpdateCustomerModalComponent);
		const contentViewRef = content.createEmbeddedView(null);
		const modalComponent = modalComponentFactory.create(this.injector, [contentViewRef.rootNodes]);
		modalComponent.instance.customer = options?.customer;
		modalComponent.instance.closeEvent.subscribe(() => this.closeModal());
		modalComponent.instance.submitEvent.subscribe(() => this.submitModal());

		modalComponent.hostView.detectChanges();

		this.document.body.appendChild(modalComponent.location.nativeElement);
		this.modalNotifier = new Subject();
		return this.modalNotifier?.asObservable();
	}

	closeModal() {
		this.modalNotifier?.next('closed');
		this.modalNotifier?.complete();
	}

	submitModal() {
		this.modalNotifier?.next('confirm');
		this.closeModal();
	}
}
