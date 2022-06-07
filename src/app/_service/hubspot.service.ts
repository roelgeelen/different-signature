import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HubspotService {

  constructor(private http: HttpClient) {
  }

  uploadSignature(dealID: string | null | undefined, file: string): Observable<HttpEvent<{}>> {
    console.log('test');
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('folderPath', '/Signatures');
    formdata.append('options', '{"access": "PUBLIC_INDEXABLE", "overwrite":false}');
    const req = new HttpRequest('POST', `https://api.hubapi.com/filemanager/api/v3/files/upload?hapikey=eu1-a12a-c74a-45fa-809d-8ef902c25b96`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }
}
