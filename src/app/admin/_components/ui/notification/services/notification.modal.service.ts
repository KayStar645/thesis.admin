import { DOCUMENT } from '@angular/common';
import { ComponentFactoryResolver, Inject, Injectable, Injector, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationComponent } from '../notification.component';

@Injectable()
export class NotificationModalService {
	private modalNotifier?: Subject<string>;
	constructor(
		private resolver: ComponentFactoryResolver,
		private injector: Injector,
		@Inject(DOCUMENT) private document: Document,
	) {}

	open(content: TemplateRef<any>, options?: { size?: string; title?: string; status?: boolean }) {
		const modalComponentFactory = this.resolver.resolveComponentFactory(NotificationComponent);
		const contentViewRef = content.createEmbeddedView(null);
		const notificationComponent = modalComponentFactory.create(this.injector, [contentViewRef.rootNodes]);

		notificationComponent.instance.size = options?.size;
		notificationComponent.instance.title = options?.title;
		notificationComponent.instance.status = options?.status;
		notificationComponent.instance.closeEvent.subscribe(() => this.closeModal());
		notificationComponent.instance.submitEvent.subscribe(() => this.submitModal());

		notificationComponent.hostView.detectChanges();

		this.document.body.appendChild(notificationComponent.location.nativeElement);
		this.modalNotifier = new Subject();
		return this.modalNotifier?.asObservable();
	}

	closeModal() {
		this.modalNotifier?.complete();
	}

	submitModal() {
		this.modalNotifier?.next('confirm');
		this.closeModal();
	}
}
