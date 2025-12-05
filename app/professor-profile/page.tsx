import Link from "next/link";

export default function ProfessorProfilePage() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4 relative">
      {/* X button to go home */}
      <Link
        href="/"
        className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-black"
      >
        ×
      </Link>

      <h1 className="text-2xl font-semibold mb-2">Professor Research Profile</h1>

      <form
        method="POST"
        action="/api/professor-profile"
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            name="fullName"
            type="text"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">University</label>
          <input
            name="University"
            type="text"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Department</label>
          <input
            name="department"
            type="text"
            className="w-full border rounded px-3 py-2 text-sm"
            
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Research Area
          </label>
          <textarea
            name="researchArea"
            className="w-full border rounded px-3 py-2 text-sm"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Lab Website</label>
          <input
            name="labWebsite"
            type="text"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Projects</label>
          <textarea
            name="projects"
            className="w-full border rounded px-3 py-2 text-sm"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            className="w-full border rounded px-3 py-2 text-sm"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded text-white bg-emerald-600 hover:bg-emerald-700"
        >
          Save Professor Profile
        </button>
      </form>
    </div>
  );
}
