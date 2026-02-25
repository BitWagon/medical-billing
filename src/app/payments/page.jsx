import Link from "next/link";

async function getPayments() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch payments");
  }

  return res.json();
}

export default async function PaymentsPage() {
  const payments = await getPayments();

  const totalAmount = payments.reduce(
    (sum, payment) => sum + (payment.amount || 0),
    0
  );

  const completedPayments = payments.filter(
    (payment) => payment.status === "Completed"
  ).length;

  const pendingPayments = payments.filter(
    (payment) => payment.status === "Pending"
  ).length;

  const statusColors = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Failed: "bg-red-100 text-red-700",
    Refunded: "bg-gray-100 text-gray-600",
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Payments
          </h1>
          <p className="text-sm text-gray-500">
            Track and manage all payment transactions
          </p>
        </div>

        <Link
          href="/payments/history"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          View Payment History
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <SummaryCard
          title="Total Revenue"
          value={formatCurrency(totalAmount)}
        />

        <SummaryCard
          title="Completed Payments"
          value={completedPayments}
        />

        <SummaryCard
          title="Pending Payments"
          value={pendingPayments}
        />

      </div>

      {/* Payments Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">

          <thead className="bg-gray-50">
            <tr>
              <TableHead>Payment ID</TableHead>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {payments.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-10 text-gray-500"
                >
                  No payments found.
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {payment._id}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {payment.invoiceId}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {payment.patientName || payment.patientId}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {formatCurrency(payment.amount)}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {payment.method}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusColors[payment.status] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/payments/${payment._id}`}
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

/* ---------------- Reusable Components ---------------- */

function SummaryCard({ title, value }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold text-gray-800 mt-2">
        {value}
      </p>
    </div>
  );
}

function TableHead({ children, className = "" }) {
  return (
    <th
      className={`px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  );
}