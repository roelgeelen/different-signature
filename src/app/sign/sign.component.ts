import {Component, OnInit, ViewChild} from '@angular/core';
import {SignaturePad} from "angular2-signaturepad";
import {ActivatedRoute, Routes} from "@angular/router";
import {HubspotService} from "../_service/hubspot.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Deal} from "../models/Deal";

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {
  deal: Deal | undefined;
  title = 'hubspot-signature';
  signatureImg: string | undefined;
  progress: { percentage: number } = {percentage: 0};
  signed = false;
  dealID: string | null | undefined;
  error: string = '';
  loading = false;
  @ViewChild(SignaturePad) signaturePad: SignaturePad | undefined;

  signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 280,
    'canvasHeight': 150
  };

  constructor(private route: ActivatedRoute, private hubspotService: HubspotService) {
  }

  ngOnInit(): void {
    this.loading = true;
    // @ts-ignore
    this.route.paramMap.subscribe(queryParams => {
      if (queryParams.get('id') === null) {
        this.error = 'Geen deal id aanwezig';
        this.loading = false;
      }
      this.dealID = queryParams.get('id');
      this.hubspotService.getDealByID(this.dealID).subscribe(r => {
        this.deal = r;
        this.error = '';
        this.loading = false;
        if (this.deal?.properties?.signature) {
          this.signatureImg = 'https://25493451.fs1.hubspotusercontent-eu1.net/hubfs/25493451/Signatures/handtekening-' + this.dealID + '.png';
        }
      }, error => {
        this.error = 'Deal ' + this.dealID + ' niet gevonden';
        this.loading = false;
      })
    });
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
    this.loading = true;
    this.signed = true;
    // @ts-ignore
    const base64Data = this.signaturePad.toDataURL();
    this.hubspotService.uploadSignature(this.dealID, base64Data).subscribe(r => {
      if (r.type === HttpEventType.UploadProgress) {
        // @ts-ignore
        this.progress.percentage = Math.round(100 * r.loaded / r.total);
      } else if (r instanceof HttpResponse) {
        this.signatureImg = base64Data;
        this.loading = false;
      }
    })
  }

}
