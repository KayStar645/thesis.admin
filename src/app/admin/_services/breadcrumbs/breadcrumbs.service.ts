import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBreadcrumb } from './breadcrumb.interface';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbsSource = new BehaviorSubject<IBreadcrumb[]>([]);
  breadcrumbs$ = this.breadcrumbsSource.asObservable();

  constructor() {}

  setBreadcrumbs(breadcrumbs: IBreadcrumb[]) {
    this.breadcrumbsSource.next(breadcrumbs);
  }
}