import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/components/material/material.module';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { InserirUsuariosComponent } from './usuarios/inserir-usuarios/inserir-usuarios.component';
import { RodapeComponent } from './shared/components/rodape/rodape.component';
import { TopoComponent } from './shared/components/topo/topo.component';
import { AlertaComponent } from './shared/components/alerta/alerta.component';
import { CamposModule } from './shared/components/campos/campos.module';
import { TableService } from './usuarios/table.service';


@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent,
    InserirUsuariosComponent,
    AlertaComponent,    
    RodapeComponent,
    TopoComponent    
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CamposModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    CommonModule  
  ],

  exports:[ MaterialModule ],

  entryComponents: [AlertaComponent],

  providers: [TableService],
  
  bootstrap: [AppComponent]
})

export class AppModule { }