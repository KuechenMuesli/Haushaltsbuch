import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {PdfService} from "../../services/pdf-service/pdf.service";
import {Booking} from "../../booking";

@Component({
  selector: 'app-export-pdf',
  templateUrl: './export-pdf.component.html',
  styleUrls: ['./export-pdf.component.css']
})
export class ExportPdfComponent implements OnChanges{
  @Input() tableData: Booking[] | null = null;
  constructor(private pdfService: PdfService) {}

  ngOnChanges(changes: SimpleChanges) {
    if(this.tableData !== null){
      this.generatePDF();
    }
  }

  generatePDF(): void {
    if(this.tableData == null){
      throw Error("Table data is null");
    }
    this.pdfService.generatePDF(this.tableData);
  }
}
