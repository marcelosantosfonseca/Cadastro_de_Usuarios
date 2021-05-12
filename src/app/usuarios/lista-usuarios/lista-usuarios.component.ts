import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


import { User } from '../user';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/components/models/alerta';
import { TableService } from '../table.service';



@Component({
  selector: 'msf-lista-usuarios',  
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})

export class ListaUsuariosComponent implements OnInit, AfterViewInit {
  readonly semFoto =  "https://github.com/marcelosantosfonseca/Cadastro_de_Usuarios/blob/master/src/assets/img/avatar-02.jpg";
  //"https://cdn.pixabay.com/photo/2015/04/10/08/36/picture-frame-715870_960_720.jpg"

  // Data table with sorting, pagination, and filtering.   
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

  //Table with selection
  displayedColumns: string[] = ['select',   'photo', 'name', 'actions-edit'];
  dataSource = new MatTableDataSource<User>([]);
  selection = new SelectionModel<User>(true, []);
 
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {         
    const numSelected = this.selection.selected.length;   /*console.log(this.selection.selected); this.selection.selected.forEach((item, index, array) => {console.log(item.id); console.log(index); console.log(array);});*/
    const numRows = this.dataSource.data.length;          //console.log(numRows);
    return numSelected === numRows;
  }
 
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
    
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id! + 1}`;
  }


  constructor(private tableService: TableService,
              private router: Router,              
              public dialog: MatDialog) { }

    
  ngOnInit(): void { 
    this.getAll();
    //this.dataSource.paginator = this.paginator;
  }

  // Chamada ao serviço para obtém todos os users  
  getAll(){
    this.tableService.getAll().subscribe((data: User[]) => {
      this.dataSource.data = data;
      //console.log('xxxxx');
      //console.log(data);
    });
  }

  // Copia o user para ser editado.
  editar(id: number) {
    this.router.navigateByUrl('/lista-usuarios/' + id);
  }

  // Novo user.
  new() {
    this.router.navigateByUrl('/lista-usuarios/inserir-usuarios');
  }

  // Limpa o formulario.
  cleanForm(form: NgForm) {
    this.getAll();
    form.resetForm();    
  }

  //Deletar usuarios
  delete(id: number): void {
    const config = {
      data: {
        titulo: 'Você tem certeza que deseja excluir?',
        descricao: 'Caso você tenha certceza que deseja excluir, clique no botão OK',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuirBtnFechar: true
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.tableService.deleteById(id)
        .subscribe(() => this.getAll());
      }
    });
  }  
} 