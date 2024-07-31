import { NgModule } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { RemoveCommaPipe } from './remove-comma.pipe';
@NgModule({
  providers: [Pipe, RemoveCommaPipe],
})
export class RemoveCommaPipeModule {}
