import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, StandardFonts, rgb, type PDFFont } from "pdf-lib";
import { checklists } from "../src/data/checklists.ts";
import { addOnChargeNotice, billingNotice } from "../src/data/notices.ts";
import { site } from "../src/data/site.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const navy = rgb(9 / 255, 64 / 255, 120 / 255);
const ink = rgb(0.07, 0.08, 0.09);
const muted = rgb(0.28, 0.32, 0.36);
const paper = rgb(1, 0.93, 0.72);
const pageWidth = 612;
const pageHeight = 792;
const margin = 28;

const sheetPolicies = [
  {
    title: "Payment",
    text: "Payment is due as soon as the cleaning is completed. If it is not received within 15 minutes, a $20 late fee applies.",
  },
  {
    title: "Arrival",
    text: "We do not knock or ring the doorbell. The team waits in the vehicle until you confirm that we may come to the door.",
  },
  {
    title: "Children",
    text: "Children must be supervised and kept away from cleaning areas and equipment. We do not re-clean an area if it is disrupted after we finish it.",
  },
  {
    title: "Health",
    text: "If anyone at home is sick or was recently exposed to illness, contact us right away so we can reschedule.",
  },
  {
    title: "Add-ons",
    text: `${addOnChargeNotice} Request them when you book. Add-ons requested after booking are scheduled for the next cleaning.`,
  },
];

function wrap(text: string, font: PDFFont, size: number, maxWidth: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

for (const checklist of checklists) {
  const doc = await PDFDocument.create();
  doc.setTitle(`${checklist.title} and policies`);
  doc.setAuthor(site.name);
  doc.setSubject(`${checklist.lead}. Includes policies for this service.`);
  doc.setCreator(site.name);
  doc.setProducer(site.name);
  doc.setCreationDate(new Date("2026-10-21T21:00:00Z"));
  doc.setModificationDate(new Date("2026-10-21T21:00:00Z"));

  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const page = doc.addPage([pageWidth, pageHeight]);
  const contentWidth = pageWidth - margin * 2;

  page.drawRectangle({ x: 0, y: pageHeight - 36, width: pageWidth, height: 36, color: navy });
  page.drawText("THE GTA CLEANING CO.", {
    x: margin,
    y: pageHeight - 23,
    size: 11,
    font: bold,
    color: rgb(1, 1, 1),
  });
  const city = "Toronto & the GTA";
  page.drawText(city, {
    x: pageWidth - margin - font.widthOfTextAtSize(city, 9),
    y: pageHeight - 22,
    size: 9,
    font,
    color: rgb(1, 1, 1),
  });

  let y = pageHeight - 56;
  page.drawText(checklist.title, { x: margin, y, size: 16, font: bold, color: navy });
  y -= 16;
  page.drawText(checklist.lead, { x: margin, y, size: 9, font, color: muted });
  y -= 18;

  const colGap = 12;
  const colCount = 3;
  const colW = (contentWidth - colGap * (colCount - 1)) / colCount;
  const buckets: (typeof checklist.sections)[] = [[], [], []];
  const weights = [0, 0, 0];
  for (const section of checklist.sections) {
    const index = weights.indexOf(Math.min(...weights));
    buckets[index].push(section);
    weights[index] += section.items.length + 2;
  }

  let lowest = y;
  buckets.forEach((bucket, index) => {
    let cursor = y;
    const x = margin + index * (colW + colGap);
    for (const section of bucket) {
      const title = section.title === "Optional add-ons" ? "Add-ons" : section.title;
      page.drawText(title, { x, y: cursor, size: 9, font: bold, color: navy });
      cursor -= 12;
      if (section.title === "Optional add-ons") {
        for (const line of wrap(addOnChargeNotice, bold, 7.5, colW)) {
          page.drawText(line, { x, y: cursor, size: 7.5, font: bold, color: navy });
          cursor -= 9;
        }
        cursor -= 2;
      }
      for (const item of section.items) {
        const lines = wrap(item, font, 7.5, colW - 9);
        lines.forEach((line, lineIndex) => {
          if (lineIndex === 0) {
            page.drawRectangle({ x, y: cursor + 1, width: 3, height: 3, color: navy });
          }
          page.drawText(line, { x: x + 8, y: cursor, size: 7.5, font, color: ink });
          cursor -= 9.5;
        });
      }
      cursor -= 7;
    }
    if (cursor < lowest) lowest = cursor;
  });

  y = lowest - 4;
  page.drawText("Policies for this service", { x: margin, y, size: 11, font: bold, color: navy });
  y -= 14;

  const policyGap = 14;
  const policyW = (contentWidth - policyGap) / 2;
  const policyColumns: { title: string; text: string }[][] = [[], []];
  sheetPolicies.forEach((policy, index) => {
    policyColumns[index % 2].push(policy);
  });
  let policyLowest = y;
  policyColumns.forEach((column, index) => {
    let cursor = y;
    const x = margin + index * (policyW + policyGap);
    for (const policy of column) {
      page.drawText(policy.title, { x, y: cursor, size: 8, font: bold, color: ink });
      cursor -= 10;
      for (const line of wrap(policy.text, font, 7.5, policyW)) {
        page.drawText(line, { x, y: cursor, size: 7.5, font, color: muted });
        cursor -= 9;
      }
      cursor -= 6;
    }
    if (cursor < policyLowest) policyLowest = cursor;
  });

  const boxPad = 10;
  const noticeLines = wrap(billingNotice, bold, 9, contentWidth - boxPad * 2);
  const boxH = 16 + noticeLines.length * 12 + boxPad;
  const boxY = policyLowest - 14 - boxH;
  if (boxY < 40) {
    throw new Error(`${checklist.id} does not fit on one page (box starts at ${boxY})`);
  }

  page.drawRectangle({
    x: margin,
    y: boxY,
    width: contentWidth,
    height: boxH,
    color: paper,
    borderColor: navy,
    borderWidth: 2.5,
  });
  let noticeY = boxY + boxH - 16;
  page.drawText("BILLING & CANCELLATION", {
    x: margin + boxPad,
    y: noticeY,
    size: 10,
    font: bold,
    color: navy,
  });
  noticeY -= 14;
  for (const line of noticeLines) {
    page.drawText(line, { x: margin + boxPad, y: noticeY, size: 9, font: bold, color: ink });
    noticeY -= 12;
  }

  page.drawText(`${site.name}  ·  ${site.phoneDisplay}  ·  ${site.email}`, {
    x: margin,
    y: 22,
    size: 8,
    font,
    color: muted,
  });

  if (doc.getPageCount() !== 1) {
    throw new Error(`${checklist.id} produced ${doc.getPageCount()} pages`);
  }

  const bytes = await doc.save();
  const file = resolve(root, "public", checklist.pdf.slice(1));
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, bytes);
  console.log(`wrote ${checklist.pdf} (${doc.getPageCount()} page)`);
}
