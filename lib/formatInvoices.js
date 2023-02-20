export default function formatInvoices(data) {
  const invoices = [];

  data.forEach(
    ({
      number,
      amount_paid,
      lines: { data },
      metadata,
      invoice_pdf,
      shipping_details: { name, address },
      status_transitions: { paid_at },
    }) => {
      const images = metadata.images.split(', ');
      const slugs = metadata.slugs.split(', ');
      const desc = metadata.desc.split(', ');
      const lines = [];

      data.forEach(({ description, metadata }, i) => {
        metadata.image = images[i];
        metadata.slug = slugs[i];
        metadata.desc = desc[i];

        lines.push({
          name: description,
          image: metadata.image,
          slug: metadata.slug,
          desc: metadata.desc,
        });
      });

      invoices.push({ number, amount_paid, lines, invoice_pdf, name, address, paid_at });
    }
  );

  return invoices;
}
