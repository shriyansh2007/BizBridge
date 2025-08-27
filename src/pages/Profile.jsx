import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Avatar from "../components/Avatar";

export default function Profile() {
  const { id } = useParams();
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
    const fetchOrg = async () => {
      try {
        const res = await API.get("/organizations");
        const foundOrg = res.data.find((o) => String(o.id) === String(id));
        if (!foundOrg) {
          setError("Organization not found!");
        } else {
          setOrg(foundOrg);
        }
      } catch (err) {
        console.error("Error fetching organization:", err);
        setError("Failed to fetch organization data.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrg();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading organization...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="p-4 max-w-xl mx-auto">
      
      {/* {org.media && <img src={org.media} alt="media" className="mt-2 rounded max-h-60" />} */}
      <Avatar name={org.name} />
      <h1 className="text-4xl font-bold">{org.name}</h1>
      <p className="mt-2 text-gray-600">{org.organizationType}</p>
      <p className="text 3-xl font-bold mt-4">About the Organisaton</p>
      <p className="">{org.about || "No about info yet."}</p>
      {org.ventures?.length > 0 && (
        <div className="mt-4">
          <h2 className="font-bold">Ventures</h2>
          <ul className="list-disc ml-6">
            {org.ventures.map((v, i) => <li key={i}>{v}</li>)}
          </ul>
        </div>
      )}
      <p className="text 3-xl font-bold mt-4">About the CEO</p>
      <p className="font-bold">{org.ceoName}</p>
      <p>{org.ceoBio}</p>

    </div>

    </>
    
  );
}
