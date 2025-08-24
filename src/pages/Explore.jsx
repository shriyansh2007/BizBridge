import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Explore() {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    API.get("/organizations")
      .then(res => {
        setOrganizations(res.data);
      })
      .catch(err => console.error("Error fetching organizations:", err));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Explore Organizations</h2>
        {organizations.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {organizations.map(org => (
              <div key={org.id} className="p-4 border rounded-lg shadow-md bg-white">
                <h3 className="text-lg font-bold">{org.name}</h3>
                <p className="text-gray-600">{org.organizationType}</p>
                <p className="mt-2">{org.about}</p>
                
                <div>
                  <Link
                    to={`/organization/${org.id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Reach Out
                  </Link>
                </div>



              </div>
            ))}
          </div>
        ) : (
          <p>No organizations found.</p>
        )}
      </div>
    </div>
  );
}
