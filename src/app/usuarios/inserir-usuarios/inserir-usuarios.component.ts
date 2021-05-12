import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../user';
import { TableService } from '../table.service';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/components/models/alerta';


@Component({
  selector: 'msf-inserir-usuarios', 
  templateUrl: './inserir-usuarios.component.html',
  styleUrls: ['./inserir-usuarios.component.css']
})

export class InserirUsuariosComponent implements OnInit {

  x!: string;
  diaHoraAtual!: string;
  id!: number;
  cadastro!: FormGroup;
  
  @Input() foto: string = '';


  constructor(public validacao: ValidarCamposService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private tableService: TableService,
              private router: Router,
              private activatedRoute: ActivatedRoute) 
              {this.diaHoraAtual = new Date().toISOString();                    // +" "+ new Date().toLocaleTimeString();
                setInterval(() =>{ this.x = new Date().toLocaleDateString() ;   //+" "+ new Date().toLocaleTimeString();
                  },1000);
              }

  get f() {
    return this.cadastro.controls;
  }
  

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) { 
      this.tableService.getById(this.id)
        .subscribe((user: User) => this.criarFormulario(user));
    } else {
      this.criarFormulario(this.criarFormularioEmBranco());
    }  
  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const user = this.cadastro.getRawValue() as User;
    if (this.id) {
      user.id = this.id;
      this.editar(user);
    } else {
      this.salvar(user);
    }
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

    // Cancelar e voltar para lista-usuarios.
  retorno(): void {
    this.router.navigateByUrl('/lista-usuarios');
  }

  
  private criarFormulario(user: User): void {
    this.cadastro = this.fb.group({      
      photo: [user.photo,[Validators.minLength(5)] ],
      name: [user.name, [Validators.required, Validators.minLength(2), Validators.maxLength(256)] ],
      email: [user.email,  [Validators.required, Validators.maxLength(50)] ],
      contato: [user.contato , [Validators.maxLength(256)] ],
      Added_on: [user.Added_on,  [Validators.required] ]
    });
    console.log(user.name);
  }

  
  private criarFormularioEmBranco(): User {
    return { 
      id: null, 
      photo: null, 
      name: null, 
      email: null, 
      contato: null, 
      Added_on: this.diaHoraAtual
    } as unknown as User;
  }


  private salvar(user: User): void {
    this.tableService.saveNewUser(user).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo usuário',
          corBtnCancelar: 'primary',
          possuirBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.router.navigateByUrl('lista-usuarios');
        } else {
          this.reiniciarForm();
        }
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao salvar o registro!',
          descricao: 'Não conseguimos salvar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }


  private editar(user: User): void {
    this.tableService.updateById(user).subscribe(() => {
      const config = {
        data: {
          descricao: 'Seu registro foi atualizado com sucesso!',
          btnSucesso: 'Ir para a listagem',
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('lista-usuarios'));
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao editar o registro!',
          descricao: 'Não conseguimos editar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }
}