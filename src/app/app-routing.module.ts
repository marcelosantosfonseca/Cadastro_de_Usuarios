import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InserirUsuariosComponent } from './usuarios/inserir-usuarios/inserir-usuarios.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';




const routes: Routes = [

  {
      path: '',
      redirectTo: 'lista-usuarios',
      pathMatch: 'full'
  },
  {
    path: 'lista-usuarios',    
    children: [
      {
        path: '',
        component: ListaUsuariosComponent
      },
      {
        path: 'inserir-usuarios',
        children: [
          {
            path: '',
            component: InserirUsuariosComponent
          },
          {
            path: ':id',
            component: InserirUsuariosComponent
          }
        ]
      },
      {
        path: ':id',
        component: InserirUsuariosComponent
      }
    ]
  },
  { path: '**', redirectTo: 'lista-usuarios' },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }