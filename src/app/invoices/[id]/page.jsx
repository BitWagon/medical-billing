import Link from "next/link";
import { notFound } from "next/navigation";

async function getInvoice(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/invoices/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  return res.json();
}

export default async function InvoiceDetailsPage({ params }) {
  const { id } = params;
  const invoice = await getInvoice(id);

  if (!invoice) return notFound();

  const statusColors = {
    Paid: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Overdue: "bg-red-100 text-red-700",
    Cancelled: "bg-gray-100 text-gray-600",
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-8">

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Invoice Details
            </h1>
            <p className="text-sm text-gray-500">
              Invoice ID: {invoice._id}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              statusColors[invoice.status] ||
              "bg-gray-100 text-gray-600"
            }`}
          >
            {invoice.status}
          </span>
        </div>

        {/* Patient & Invoice Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

          <InfoBlock
            title="Patient Information"
            items={[
              { label: "Patient ID", value: invoice.patientId },
              { label: "Patient Name", value: invoice.patientName },
            ]}
          />

          <InfoBlock
            title="Invoice Information"
            items={[
              { label: "Invoice Number", value: invoice.invoiceNumber },
              {
                label: "Created At",
                value: new Date(invoice.createdAt).toLocaleDateString(),
              },
              {
                label: "Due Date",
                value: new Date(invoice.dueDate).toLocaleDateString(),
              },
            ]}
          />

        </div>

        {/* Financial Summary */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Financial Summary
          </h2>

          <div className="space-y-3 text-sm">

            <SummaryRow
              label="Base Amount"
              value={formatCurrency(invoice.amount)}
            />

            <SummaryRow
              label="Tax"
              value={formatCurrency(invoice.tax)}
            />

            <SummaryRow
              label="Discount"
              value={`- ${formatCurrency(invoice.discount)}`}
            />

            <hr />

            <SummaryRow
              label="Total Amount"
              value={formatCurrency(invoice.totalAmount)}
              bold
            />

          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Notes
            </h2>
            <div className="bg-gray-50 p-4 rounded-md text-gray-700">
              {invoice.notes}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center">

          <Link
            href="/invoices"
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            ← Back to Invoices
          </Link>

          <Link
            href={`/invoices/${invoice._id}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm"
          >
            Edit Invoice
          </Link>

        </div>

      </div>
    </div>
  );
}

/* ---------------- Reusable Components ---------------- */

function InfoBlock({ title, items }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        {title}
      </h2>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index}>
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-base font-medium text-gray-800">
              {item.value || "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SummaryRow({ label, value, bold = false }) {
  return (
    <div className="flex justify-between">
      <span
        className={`${
          bold
            ? "font-semibold text-gray-800"
            : "text-gray-600"
        }`}
      >
        {label}
      </span>
      <span
        className={`${
          bold
            ? "font-semibold text-gray-800"
            : "text-gray-700"
        }`}
      >
        {value}
      </span>
    </div>
  );
}