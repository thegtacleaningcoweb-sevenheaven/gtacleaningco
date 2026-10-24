import { readFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { checklists, type ChecklistSection } from "../src/data/checklists.ts";
import { site } from "../src/data/site.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fonts = resolve(root, "node_modules/@fontsource");
const navy = rgb(9 / 255, 64 / 255, 120 / 255);
const ink = rgb(18 / 255, 20 / 255, 22 / 255);
const muted = rgb(92 / 255, 101 / 255, 108 / 255);
const line = rgb(220 / 255, 226 / 255, 230 / 255);
const pageWidth = 612;
const pageHeight = 792;
const margin = 40;

function wrap(text: string, font: PDFFont, size: number, maxWidth: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawTracked(page: PDFPage, text: string, x: number, y: number, size: number, font: PDFFont, color: ReturnType<typeof rgb>, tracking: number) {
  let cursor = x;
  for (const char of text) {
    page.drawText(char, { x: cursor, y, size, font, color });
    cursor += font.widthOfTextAtSize(char, size) + tracking;
  }
}

type Line = { text: string; bullet: boolean };
type Block = { title: string; lines: Line[] };

function blocksFor(sections: ChecklistSection[], body: PDFFont, size: number, width: number): Block[] {
  return sections.map((section) => ({
    title: (section.title === "Optional add-ons" ? "Add-ons" : section.title).toUpperCase(),
    lines: section.items.flatMap((item) =>
      wrap(item, body, size, width - 16).map((text, index) => ({ text, bullet: index === 0 })),
    ),
  }));
}

const itemStep = 16.5;
const headerStep = 20;

function blockHeight(block: Block) {
  return headerStep + block.lines.length * itemStep;
}

function drawBlock(page: PDFPage, block: Block, x: number, top: number, body: PDFFont, strong: PDFFont, itemSize: number) {
  drawTracked(page, block.title, x, top, 9, strong, navy, 0.7);
  let cursor = top - headerStep;
  for (const item of block.lines) {
    if (item.bullet) page.drawCircle({ x: x + 3, y: cursor + 3, size: 2.1, color: navy });
    page.drawText(item.text, { x: x + 14, y: cursor, size: itemSize, font: body, color: ink });
    cursor -= itemStep;
  }
}

for (const checklist of checklists) {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  doc.setTitle(checklist.title);
  doc.setAuthor(site.name);
  doc.setSubject(checklist.lead);
  doc.setCreator(site.name);
  doc.setProducer(site.name);
  doc.setCreationDate(new Date("2026-10-21T21:00:00Z"));
  doc.setModificationDate(new Date("2026-10-21T21:00:00Z"));

  const body = await doc.embedFont(await readFile(resolve(fonts, "figtree/files/figtree-latin-400-normal.woff")));
  const bodyStrong = await doc.embedFont(await readFile(resolve(fonts, "figtree/files/figtree-latin-600-normal.woff")));
  const display = await doc.embedFont(await readFile(resolve(fonts, "poppins/files/poppins-latin-600-normal.woff")));
  const page = doc.addPage([pageWidth, pageHeight]);

  page.drawRectangle({ x: 0, y: pageHeight - 52, width: pageWidth, height: 52, color: navy });
  page.drawText(site.name, { x: margin, y: pageHeight - 32, size: 15, font: display, color: rgb(1, 1, 1) });
  const city = "Toronto & the GTA";
  page.drawText(city, {
    x: pageWidth - margin - body.widthOfTextAtSize(city, 10),
    y: pageHeight - 30,
    size: 10,
    font: body,
    color: rgb(1, 1, 1),
  });

  let y = pageHeight - 86;
  page.drawText(checklist.title, { x: margin, y, size: 22, font: display, color: navy });
  y -= 20;
  page.drawText(checklist.lead, { x: margin, y, size: 11, font: body, color: muted });
  y -= 16;
  page.drawLine({
    start: { x: margin, y },
    end: { x: pageWidth - margin, y },
    thickness: 1,
    color: line,
  });

  const contentTop = y - 26;
  const contentBottom = 46;
  const itemSize = 11;
  const rooms = checklist.sections.filter((section) => section.title !== "Optional add-ons");
  const extras = checklist.sections.find((section) => section.title === "Optional add-ons");
  if (rooms.length !== 4 || !extras) throw new Error(`${checklist.id} needs four areas plus add-ons`);

  const addonCols = 2;
  const addonGap = 16;
  const addonW = (pageWidth - margin * 2 - addonGap * (addonCols - 1)) / addonCols;
  const addonLines = extras.items.map((item) => wrap(item, body, itemSize, addonW - 16));
  const perColumn = Math.ceil(addonLines.length / addonCols);
  const addonRow = Math.max(
    ...Array.from({ length: addonCols }, (_, index) =>
      addonLines.slice(index * perColumn, (index + 1) * perColumn).reduce((total, lines) => total + lines.length, 0),
    ),
  );
  const addonStep = 16.5;
  const addonHeight = 22 + addonRow * addonStep;
  const colGap = 32;
  const colW = (pageWidth - margin * 2 - colGap) / 2;
  const roomBlocks = blocksFor(rooms, body, itemSize, colW);
  const rowHeights = [0, 1].map((row) => Math.max(blockHeight(roomBlocks[row * 2]), blockHeight(roomBlocks[row * 2 + 1])));
  const betweenRows = 28;
  const roomsEnd = contentTop - rowHeights[0] - betweenRows - rowHeights[1];
  const pinnedAddonTop = contentBottom + addonHeight;
  const addonTop = Math.min(pinnedAddonTop, roomsEnd - 24);

  roomBlocks.forEach((block, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const x = margin + column * (colW + colGap);
    const top = contentTop - row * (rowHeights[0] + betweenRows);
    drawBlock(page, block, x, top, body, bodyStrong, itemSize);
  });
  drawTracked(page, "ADD-ONS", margin, addonTop, 9, bodyStrong, navy, 0.7);
  addonLines.forEach((lines, itemIndex) => {
    const column = Math.floor(itemIndex / perColumn);
    const rowItems = addonLines.slice(column * perColumn, itemIndex);
    const row = rowItems.reduce((total, item) => total + item.length, 0);
    const x = margin + column * (addonW + addonGap);
    let cursor = addonTop - 20 - row * addonStep;
    lines.forEach((text, lineIndex) => {
      if (lineIndex === 0) page.drawCircle({ x: x + 3, y: cursor + 3, size: 2.1, color: navy });
      page.drawText(text, { x: x + 14, y: cursor, size: itemSize, font: body, color: ink });
      cursor -= addonStep;
    });
  });

  page.drawText(`${site.phoneDisplay}   ·   ${site.email}`, {
    x: margin,
    y: 26,
    size: 9,
    font: body,
    color: muted,
  });

  if (doc.getPageCount() !== 1) throw new Error(`${checklist.id} produced ${doc.getPageCount()} pages`);

  const bytes = await doc.save();
  const file = resolve(root, "public", checklist.pdf.slice(1));
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, bytes);
  console.log(`wrote ${checklist.pdf} (${doc.getPageCount()} page)`);
}
