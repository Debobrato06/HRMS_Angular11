import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Report} from '../model/report';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  BASE_URL = 'http://localhost:9090';
  API_URL = this.BASE_URL + '/hr/empApi';
  DESG_URL = this.API_URL + '/reportDesg?desgId=1&type=pdf';
  DEPT_URL = this.API_URL + '/reportDept?deptId=1&type=pdf';
  //   http://localhost:9090/hr/empApi/reportDesg?desgId=1&type=pdf
  //   http://localhost:9090/hr/empApi/reportDept?deptId=1&type=pdf
  constructor(
    private http: HttpClient
  ) { }

  printReport(model: Report): Observable<Blob> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(
      'http://localhost:9090/hr/reportApi/report', model,
      { headers, responseType: 'blob'}
    );
  }

  // getReportD(model: Registration): Observable<any> {
  //   const httpOptions = {
  //     responseType: 'arraybuffer' as 'json'
  //   };
  //
  //   // @ts-ignore
  //   return this.http.get<any>('http://localhost:9090/hr/reportApi/report' , httpOptions);
  // }

  // getReport(): Observable<any> {
  //   const httpOptions = {
  //     responseType: 'arraybuffer' as 'json'
  //   };
  //
  //   return this.http.get<any>(this.DESG_URL , httpOptions);
  // }
  // getReportDEPT(): Observable<any> {
  //   const httpOptions = {
  //     responseType: 'arraybuffer' as 'json'
  //   };
  //
  //   return this.http.get<any>(this.DEPT_URL , httpOptions);
  // }
}
