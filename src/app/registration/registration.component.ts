import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DismissReason } from '../shared/common/dismissReason';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../shared/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, AfterViewInit {
  userRegister!: FormGroup;
  listUsers: User[] = [];
  closeResult!: string;
  displayedColumns: string[] = ['name', 'lastName', 'dni', 'birthDate', 'phone', 'actions'];
  dataSource = new MatTableDataSource<User>(this.listUsers);
  idUser!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private modalService: NgbModal,
    private _snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.creatrForm();
    this.getListUsers();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getListUsers() {
    this.dataSource = new MatTableDataSource<User>(this.listUsers);
    this.dataSource.paginator = this.paginator;
  }

  creatrForm() {
    this.userRegister = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      birthDate: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    });
  }

  onSubmit() {
    if (this.userRegister.valid) {
      console.log(this.userRegister.value);
      if (this.idUser) {
        this.listUsers = this.listUsers.map((user) => {
          if (user.id === this.idUser) {
            return this.userRegister.value;
          }
          return user;
        });
      } else {
        if (this.listUsers.find((user) => user.dni === this.userRegister.value.dni)) {
          alert('El DNI ya se encuentra registrado');
          return;
        }
      }
      
      if (this.userRegister.value.id === null || this.userRegister.value.id === undefined || this.userRegister.value.id === '') {
        this.userRegister.value.id = uuidv4();
        this.listUsers.push(this.userRegister.value);
      }
      this._snackBar.open("Usuario registrado correctamente", "Cerrar", { duration: 2000 });

    }
    this.getListUsers();
  }

  onModal(content: any, id: string) {
    this.userRegister.reset();
    if (id !== null || id !== undefined || id !== '') {
      this.onGetById(id);
    }
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title", size: "lg", centered: true }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${new DismissReason(reason).control()}`;
      }
    );
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userRegister.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  onDelete(id: string) {
    //delete user
    this.listUsers = this.listUsers.filter((user) => user.id !== id);
    this.getListUsers();

  }
  onGetById(id: string) {
    const user = this.listUsers.find((user) => user.id === id);
    this.idUser = id;
    this.userRegister.patchValue(user!);
  }
}
