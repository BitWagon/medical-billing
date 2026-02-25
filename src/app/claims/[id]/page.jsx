'use client';

import { notFound } from "next/navigation";

async function getClaim(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/claims/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

export default async function ClaimDetailsPage({ params }) {
  const { id } = params;
  const claim = await getClaim(id);

  if (!claim) return notFound();

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Submitted: "bg-blue-100 text-blue-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Claim Details
            </h1>
            <p className="text-sm text-gray-500">Claim ID: {claim._id}</p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              statusColors[claim.status] || "bg-gray-100 text-gray-600"
            }`}
          >
            {claim.status}
          </span>
        </div>

        {/* Claim Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <Detail label="Patient ID" value={claim.patientId} />
          <Detail label="Provider Name" value={claim.providerName} />
          <Detail label="Diagnosis Code (ICD-10)" value={claim.diagnosisCode} />
          <Detail label="Procedure Code (CPT)" value={claim.procedureCode} />
          <Detail label="Insurance Provider" value={claim.insuranceProvider} />
          <Detail label="Service Date" value={new Date(claim.serviceDate).toLocaleDateString()} />
          <Detail label="Claim Amount" value={`$${claim.claimAmount}`} />
          <Detail label="Created At" value={new Date(claim.createdAt).toLocaleDateString()} />

        </div>

        {/* Notes Section */}
        {claim.notes && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Notes
            </h2>
            <div className="bg-gray-50 p-4 rounded-md text-gray-700">
              {claim.notes}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* Reusable Detail Component */
function Detail({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium text-gray-800 mt-1">{value || "—"}</p>
    </div>
  );
}