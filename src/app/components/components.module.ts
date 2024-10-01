import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmptyScreenComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [EmptyScreenComponent],
})
export class ComponentsModule {}
