import Link from "next/link";

async function getInvoices() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/invoices`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch invoices");
  }

  return res.json();
}

export default async function InvoicesPage() {
  const invoices = await getInvoices();

  const statusColors = {
    Paid: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Overdue: "bg-red-100 text-red-700",
    Cancelled: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Invoices
          </h1>
          <p className="text-sm text-gray-500">
            Manage and track all billing invoices
          </p>
        </div>

        <Link
          href="/invoices/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Create Invoice
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          
          <thead className="bg-gray-50">
            <tr>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {invoices.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10 text-gray-500"
                >
                  No invoices found.
                </td>
              </tr>
            ) : (
              invoices.map((invoice) => (
                <tr key={invoice._id} className="hover:bg-gray-50 transition">
                  
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                    {invoice._id}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {invoice.patientName || invoice.patientId}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    ${invoice.amount}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusColors[invoice.status] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(invoice.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/invoices/${invoice._id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View
                    </Link>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

/* Reusable Table Header Component */
function TableHead({ children, className = "" }) {
  return (
    <th
      className={`px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  );
}