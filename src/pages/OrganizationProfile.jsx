import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function OrganizationProfile() {
  const { id } = useParams();
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/organizations/${id}`)
      .then(res => {
        setOrganization(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching organization:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Organization not found!</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <h2 className="text-2xl font-bold mb-2">{organization.name}</h2>
        <p className="text-gray-600">{organization.organizationType}</p>
        <p className="mt-3">{organization.about}</p>

        {Array.isArray(organization.ventures) && organization.ventures.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold">Ventures:</h3>
            <ul className="list-disc ml-5">
              {organization.ventures.map((venture, idx) => (
                <li key={idx}>{venture}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 border-t pt-4">
          <p className="font-semibold">CEO: {organization.ceoName}</p>
          <p className="text-sm text-gray-500">{organization.ceoBio}</p>
        </div>

        <div className="mt-6">
          <Link to={`/dm/${organization.id}`} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Start Chat
          </Link>
        </div>
      </div>
    </div>
  );
}
