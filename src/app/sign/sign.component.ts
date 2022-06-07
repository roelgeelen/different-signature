import {Component, OnInit, ViewChild} from '@angular/core';
import {SignaturePad} from "angular2-signaturepad";
import {ActivatedRoute, Routes} from "@angular/router";
import {HubspotService} from "../_service/hubspot.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {
  title = 'hubspot-signature';
  signatureImg: string | undefined;
  signed = false;
  date: Date | undefined;
  dealID: string | null | undefined;
  @ViewChild(SignaturePad) signaturePad: SignaturePad | undefined;

  signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 280,
    'canvasHeight': 150
  };

  constructor(private route: ActivatedRoute, private hubspotService: HubspotService) {
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    // @ts-ignore
    this.signaturePad.set('minWidth', 2);
    // @ts-ignore
    this.signaturePad.clear();
  }

  drawComplete() {
    // @ts-ignore
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    console.log('begin drawing');
  }

  clearSignature() {
    // @ts-ignore
    this.signaturePad.clear();
  }

  savePad() {
    this.signed = true;
    this.date = new Date();
    // @ts-ignore
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.hubspotService.uploadSignature(this.dealID, base64Data).subscribe(r => {
      if (r.type === HttpEventType.UploadProgress) {
        // @ts-ignore
        this.progress.percentage = Math.round(100 * r.loaded / r.total);
      } else if (r instanceof HttpResponse) {
        console.log('saved');
      }
    })
  }

  ngOnInit(): void {
    // @ts-ignore
    this.route.paramMap.subscribe(queryParams => {
      if (queryParams.get('id') === null) {
        return null;
      }
      this.dealID = queryParams.get('id');
    });
  }

}
