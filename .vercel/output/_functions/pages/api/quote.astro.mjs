import { a as asRecord, b as readJson, c as clientError, t as textField, j as json, n as normalizeEmail, d as normalizePhone, l as listField, s as sendMail, g as customerQuoteMail, h as ownerQuoteMail, f as serverError } from '../../chunks/mailer_cFFu9cQd.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
function blank(value) {
  return value || "—";
}
const POST = async ({ request }) => {
  try {
    const body = asRecord(await readJson(request));
    if (!body) return clientError("Please complete the form and try again.");
    if (textField(body.company, 200)) return json({ ok: true });
    const name = textField(body.name, 120);
    const email = normalizeEmail(textField(body.email, 254));
    const phoneDisplay = textField(body.phone, 40);
    if (!name) return clientError("Please add your name.");
    if (!email) return clientError("Enter a valid email so we can confirm we received your request.");
    if (phoneDisplay && !normalizePhone(phoneDisplay)) return clientError("Enter a 10-digit phone number, or leave the phone blank.");
    const details = {
      name,
      email,
      phone: phoneDisplay,
      address: textField(body.address, 200),
      when: textField(body.when, 120),
      propertyType: textField(body.propertyType, 80),
      bedrooms: textField(body.bedrooms, 8),
      bathrooms: textField(body.bathrooms, 8),
      levels: textField(body.levels, 8),
      sqft: textField(body.sqft, 12),
      basement: textField(body.basement, 80),
      household: blank(listField(body.household).join(", ")),
      pets: textField(body.pets, 200),
      service: textField(body.service, 80),
      frequency: textField(body.frequency, 40),
      lastClean: textField(body.lastClean, 200),
      neglected: textField(body.neglected, 1e3),
      addons: blank(listField(body.addons).join(", ")),
      delicate: textField(body.delicate, 300),
      priorities: textField(body.priorities, 1e3)
    };
    await Promise.all([sendMail(customerQuoteMail(details)), sendMail(ownerQuoteMail(details))]);
    return json({ ok: true });
  } catch (error) {
    return serverError(error);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
