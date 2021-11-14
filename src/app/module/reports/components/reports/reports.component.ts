import { Component, OnInit } from '@angular/core';
import {ReportServiceService} from '../../service/report-service.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Report} from '../../model/report';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private service: ReportServiceService,
  ) { }

  message: string;
  reportForm: FormGroup;
  model: Report = new Report();

  disableSelect = new FormControl(false);

  reportName: any[] = [
    {name: 'Employee Department', value: 'ListOfEmployeeDepartment.jrxml'},
    {name: 'Employee Designation', value: 'ListOfEmployeeDesignation.jrxml'}
];
reportFormat: string[] = [
    'pdf',
    'xls',
];

  ngOnInit(): void {
    this.initFormValue();
    // this.getReportDept();
  }

  // tslint:disable-next-line:typedef
  initFormValue() {
    this.reportForm = this.formBuilder.group({
      format: ['', ''],
      name:  ['', ''],
      department:  ['', ''],
      designation:  ['', ''],
      hr_department:  ['', ''],
      fromDate:  ['', ''],
      toDate:  ['', ''],
    });
  }

  // getReportDept(): any{
  //   // this.service.getReport().subscribe(res => {
  //   //
  //   // });
  //   this.service.getReport().subscribe(res => {
  //     // window.open(window.URL.createObjectURL(res));
  //
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  printReport(): any {

    const params = new Map<string, object>();
    // params.set('id', this.frmGroup.value.reportMaster.id);
    // params.set('P_MODULE_ID', this.frmGroup.value.module.id);
    // params.set('reportFormat', 'pdf');
    params.set('P_DEPT_ID', this.reportForm.value.department );
    params.set('P_DESG_ID', this.reportForm.value.designation );

    // params.set('P_EMP_HR_DEPT_ID', this.reportForm.value.hr_department );
    // params.set('FROM_DATE', this.reportForm.value.fromDate );
    // params.set('TO_DATE', this.reportForm.value.toDate );

    const convertAsJavaMap = {};
    params.forEach((val: object, key: string) => {
      convertAsJavaMap[key] = val;
    });

    this.model.format = this.reportForm.value.format;
    this.model.name = this.reportForm.value.name;
    this.model.params = convertAsJavaMap;

    this.service.printReport(this.model).subscribe(blob => {
      window.open(window.URL.createObjectURL(blob));
    }, error => {
      console.log(error);
    });
  }


  // getReportDept(): any {
  //   this.service.getReportDEPT().subscribe((response) => {
  //
  //     const file = new Blob([response], { type: 'application/pdf' });
  //     const fileURL = URL.createObjectURL(file);
  //     window.open(fileURL);
  //   });
  // }
  //
  // getReportDesg(): any {
  //   this.service.getReport().subscribe((response) => {
  //
  //     const file = new Blob([response], { type: 'application/pdf' });
  //     const fileURL = URL.createObjectURL(file);
  //     window.open(fileURL);
  //   });
  // }

  // generateModel(): any{
  //   // this.model = this.designationForm.value;
  //
  //   this.model.format = this.reportForm.value.format;
  //   this.model.name = this.reportForm.value.name;
  //   this.model.params = this.reportForm.value.params;
  //
  // }

  clear(): any{
    this.initFormValue();
    this.message = '';
  }


}
