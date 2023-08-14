import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import {Booking} from "../../booking";

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  generatePDF(data: Booking[]): void {
    let doc = new jsPDF();

    doc.text('Table Example', 10, 10);

    let headers = [['Date', 'Description', 'Amount']];
    let rows = data.map(booking => [booking.date, booking.description, booking.amount]);
    let startY = 20;

    autoTable(doc, {
      head: headers,
      body: rows,
      startY,
    });

    let pdfBlob = doc.output('blob');
    saveAs(pdfBlob, 'tabelle.pdf');
  }
}
