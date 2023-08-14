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
    doc.setFillColor("#FEFEFE")
    doc.setFont("courier")
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F")

    let dates = [(new Date(data[0].date)).toLocaleDateString("de", {day:"2-digit", month: "2-digit", year:"numeric"}), (new Date(data[data.length - 1].date)).toLocaleDateString("de", {day:"2-digit", month: "2-digit", year:"numeric"})];
    doc.text(`Buchungen von ${dates[0]} bis ${dates[1]}`, 10, 10);

    let headers = [['Datum', 'Beschreibung', 'Betrag']];
    let rows = data.map(booking => [new Date(booking.date).toLocaleDateString("de", {day:"2-digit", month: "2-digit", year:"numeric"}), booking.description, booking.amount]);
    let startY = 20;

    autoTable(doc, {
      head: headers,
      body: rows,
      startY,
      headStyles:{
        font: "courier",
        textColor: "#000000",
        fillColor: "#D3D3D3"
      },
      columnStyles: {
        0:{
          font:"courier"
        },
        1:{
          font:"courier"
        },
        2:{
          font:"courier"
        }
      }
    });

    let pdfBlob = doc.output('blob');
    saveAs(pdfBlob, `bookings-${dates[0].replace(" ", "_")}-${dates[0].replace(" ", "_")}.pdf`);
  }
}
