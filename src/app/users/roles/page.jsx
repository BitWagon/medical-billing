import Link from "next/link";

async function getRoles() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/roles`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch roles");
  }

  return res.json();
}

export default async function RolesPage() {
  const roles = await getRoles();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            User Roles
          </h1>
          <p className="text-sm text-gray-500">
            Manage roles and permissions for system users
          </p>
        </div>

        <Link
          href="/users/roles/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add New Role
        </Link>
      </div>

      {/* Roles Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <TableHead>Role Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {roles.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-10 text-gray-500"
                >
                  No roles defined.
                </td>
              </tr>
            ) : (
              roles.map((role) => (
                <tr
                  key={role._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {role.name}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {role.description || "—"}
                  </td>

                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/users/roles/${role._id}/edit`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                      onClick={() => handleDelete(role._id)}
                    >
                      Delete
                    </button>
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

/* ---------------- Helper / Action Functions ---------------- */

async function handleDelete(roleId) {
  if (!confirm("Are you sure you want to delete this role?")) return;

  try {
    const res = await fetch(
      `/api/users/roles/${roleId}`,
      { method: "DELETE" }
    );

    if (!res.ok) throw new Error("Failed to delete role");

    alert("Role deleted successfully");
    // Refresh page after deletion
    window.location.reload();
  } catch (err) {
    console.error(err);
    alert("Error deleting role");
  }
}

/* ---------------- Reusable Components ---------------- */

function TableHead({ children, className = "" }) {
  return (
    <th
      className={`px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  );
}