import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Profile() {
  const { id } = useParams();
  const [org, setOrg] = useState(null);

  useEffect(() => {
    API.get(`/organizations/${id}`).then(res => setOrg(res.data));
  }, [id]);

  if (!org) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Navbar/>
      {/* {org.media && <img src={org.media} alt="media" className="mt-2 rounded max-h-60" />} */}
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
  );
}
