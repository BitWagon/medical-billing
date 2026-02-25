import Link from "next/link";

async function getPaymentHistory() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch payment history");
  }

  return res.json();
}

export default async function PaymentHistoryPage() {
  const payments = await getPaymentHistory();

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);

  const totalRevenue = payments.reduce(
    (sum, p) => sum + (p.status === "Completed" ? p.amount : 0),
    0
  );

  const refundedAmount = payments.reduce(
    (sum, p) => sum + (p.status === "Refunded" ? p.amount : 0),
    0
  );

  const statusColors = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Failed: "bg-red-100 text-red-700",
    Refunded: "bg-gray-200 text-gray-700",
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Payment History
          </h1>
          <p className="text-sm text-gray-500">
            Complete transaction log and financial activity
          </p>
        </div>

        <Link
          href="/payments"
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          ← Back to Payments
        </Link>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        <SummaryCard
          title="Total Collected Revenue"
          value={formatCurrency(totalRevenue)}
        />

        <SummaryCard
          title="Total Refunded Amount"
          value={formatCurrency(refundedAmount)}
        />

      </div>

      {/* History Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">

          <thead className="bg-gray-50">
            <tr>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {payments.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10 text-gray-500"
                >
                  No payment history available.
                </td>
              </tr>
            ) : (
              payments
                .sort(
                  (a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
                )
                .map((payment) => (
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
                      {new Date(payment.createdAt).toLocaleString()}
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

function TableHead({ children }) {
  return (
    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
      {children}
    </th>
  );
}