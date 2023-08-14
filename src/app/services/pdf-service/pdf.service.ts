import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import {Booking} from "../../booking";

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  generatePDF(data: Booking[]){
    let doc = new jsPDF();

    let dates = [(new Date(data[0].date)).toLocaleDateString("de", {month: "long", year:"numeric"}), (new Date(data[data.length - 1].date)).toLocaleDateString("de", {month: "long", year: "numeric"})];
    doc.text(`Buchungen von ${dates[0]} bis ${dates[1]}`, 10, 10);

    let headers = [['Datum', 'Beschreibung', 'Betrag']];
    let rows = data.map(booking => [booking.date, booking.description, booking.amount]);
    let startY = 20;

    autoTable(doc, {
      head: headers,
      body: rows,
      startY,
      theme: "grid",
    });

    let pdfBlob = doc.output('blob');
    saveAs(pdfBlob, `bookings-${dates[0].replace(" ", "_")}-${dates[0].replace(" ", "_")}.pdf`);
  }
}
