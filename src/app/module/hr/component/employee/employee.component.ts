import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Employee} from '../../model/employee';
import {EmployeeService} from '../../service/emp/employee.service';
import {Deperment} from '../../model/deperment';
import {DepermentService} from '../../service/dept/deperment.service';
import { Observable } from 'rxjs';
import {Designation} from '../../model/designation';
import {DesignationService} from '../../service/desg/designation.service';
import {UserEmp} from '../../model/user';
import {UserServiceService} from '../../service/user/user-service.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})


export class EmployeeComponent implements OnInit, AfterViewInit {

  // -----------------------------------------------------------------------------------------------------
  // @ property declaration
  // -----------------------------------------------------------------------------------------------------

  message: string;
  employeeForm: FormGroup;
  model: Employee =  new Employee();
  modelList: Employee[] = new Array();
  dataSource = new MatTableDataSource();
  displayedColumns = ['id' , 'photo' , 'code' , 'name' , 'fatherName' , 'dob' , 'doj' , 'nid' , 'gender' , 'email' , 'mobileNo' , 'active' , 'userId' , 'deptId' , 'desgId' , 'supervisorId' , 'action'];

  genders: any[] = [{id: 1, name: 'MALE'}, {id: 2, name: 'FEMALE'}, {id: 3, name: 'OTHER'}];

  modelDeptList: Observable<Deperment[]>;

  modelDesgList: Observable<Designation[]>;

  modelUserList: Observable<UserEmp[]>;

  // -----------------------------------------------------------------------------------------------------
  // @ constructor and initialization
  // -----------------------------------------------------------------------------------------------------

  constructor(
    private formBuilder: FormBuilder,
    private service: EmployeeService,
    private depermentService: DepermentService,
    private designationService: DesignationService,
    private userServiceService: UserServiceService,
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.initFormValue();
    this.getAll();
    this.getDeptData();
    this.getDesgData();
    this.getUserData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  // tslint:disable-next-line:typedef
  initFormValue() {
    this.employeeForm = this.formBuilder.group({
      id: ['', ''],
      photo: ['', ''],
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      fatherName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      doj: ['', [Validators.required]],
      nid: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required]],
      userId: ['', [Validators.required, Validators.min(1)]],
      deptId: ['', [Validators.required, Validators.min(1)]],
      desgId: ['', [Validators.required, Validators.min(1)]],
      supervisorId: ['', ''],
      active: [false],

    });
  }


  // -----------------------------------------------------------------------------------------------------
  // @ API Calling
  // -----------------------------------------------------------------------------------------------------

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  // tslint:disable-next-line:typedef
  getDeptData(): any
  {
    this.depermentService.getList().subscribe(res => {
      this.modelDeptList = res.content;
      }
    );
  }

  // tslint:disable-next-line:typedef
  getDesgData(): any
  {
    this.designationService.getList().subscribe(res => {
        this.modelDesgList = res.content;
      }
    );
  }

  // tslint:disable-next-line:typedef
  getUserData(): any
  {
    this.userServiceService.getList().subscribe(res => {
        this.modelUserList = res.content;
      }
    );
  }

  getAll(): any{
    this.service.getList().subscribe(res => {
      this.modelList = res.content;
      this.dataSource = new MatTableDataSource(this.modelList);
    });
  }

  submit(): any{
    if (this.employeeForm.value.id){
      this.generateModel(false);
      this.service.update(this.model, this.model.id).subscribe(res => {
        this.message = 'Update Success';
        this.getAll();
        this.initFormValue();
      }, error => {
        console.log(error);
      });
    }else{
      this.generateModel(true);
      console.log(this.model);
      this.service.create(this.model).subscribe(res => {
        this.message = 'Save Success';
        this.getAll();
        this.initFormValue();
      }, error => {
        console.log(error);
      });
    }
  }

  delete(row: Employee): any{
    this.service.delete(row.id).subscribe(res => {
      this.message = 'Delete Success';
      this.getAll();
    }, error => {
      console.log(error);
    });
  }


  // -----------------------------------------------------------------------------------------------------
  // @ View functionality
  // -----------------------------------------------------------------------------------------------------

  edit(row: Employee): any{
    this.employeeForm = this.formBuilder.group({

      id: [row.id, ''],
      photo: [row.photo, ''],
      code: [row.code, ''],
      name: [row.name, [Validators.required]],
      fatherName: [row.fatherName, [Validators.required]],
      dob: [row.dob, ''],
      doj: [row.doj, ''],
      nid: [row.nid, ''],
      gender: [row.gender, ''],
      email: [row.email, ''],
      mobileNo: [row.mobileNo, ''],
      userId: [row.userId, ''],
      deptId: [row.deptId, ''],
      desgId: [row.desgId, ''],
      supervisorId: [row.supervisorId, ''],
      active: [row.active],

    });
  }

  generateModel(isCreate: boolean): any{
    // this.model = this.designationForm.value;
    if (isCreate){
      this.model.id = undefined;
    }else{
      this.model.id = this.employeeForm.value.id;
    }
    this.model.photo = this.employeeForm.value.photo;
    this.model.code = this.employeeForm.value.code;
    this.model.name = this.employeeForm.value.name;
    this.model.fatherName = this.employeeForm.value.fatherName;
    this.model.dob = this.employeeForm.value.dob;
    this.model.doj = this.employeeForm.value.doj;
    this.model.nid = this.employeeForm.value.nid;
    this.model.email = this.employeeForm.value.email;
    this.model.mobileNo = this.employeeForm.value.mobileNo;
    this.model.gender = this.employeeForm.value.gender;
    this.model.userId = this.employeeForm.value.userId;
    this.model.deptId = this.employeeForm.value.deptId;
    this.model.desgId = this.employeeForm.value.desgId;
    this.model.supervisorId = this.employeeForm.value.supervisorId;
    this.model.active = this.employeeForm.value.active;

  }

  clear(): any{
    this.initFormValue();
    this.message = '';
  }

}
