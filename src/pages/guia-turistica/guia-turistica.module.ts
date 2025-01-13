import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuiaTuristicaPage } from './guia-turistica';

@NgModule({
  declarations: [
    GuiaTuristicaPage,
  ],
  imports: [
    IonicPageModule.forChild(GuiaTuristicaPage),
  ],
})
export class GuiaTuristicaPageModule {}
