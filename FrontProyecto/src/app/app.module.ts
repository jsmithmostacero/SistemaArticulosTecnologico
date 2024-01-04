import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { ToastrModule} from 'ngx-toastr';
//External
import { NgbModule,NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ListaComponentVenta } from './venta/lista.component';
import { NuevaComponentVenta } from './venta/nueva.component';
import { ListaComponentArticulo } from './articulo/lista.component';
import { NuevaComponentArticulo } from './articulo/nueva.component';
import { RouterModule } from '@angular/router';
import { ListaComponentDetalle } from './detalle/lista.component';

import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [
    AppComponent,
    ListaComponentArticulo,
    NuevaComponentArticulo,
    ListaComponentVenta,
    NuevaComponentVenta,
    ListaComponentDetalle
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    NgbModalModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule,
    ToastrModule.forRoot(),
    QRCodeModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
