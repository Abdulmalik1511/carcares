import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import supabaseClient from "../services/supabaseClient";
import "../styles/AdminRequests.css";

const statusOptions = ["Pending", "In Progress", "Completed", "Cancelled"];

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [editingStatusId, setEditingStatusId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabaseClient
        .from("service_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setRequests(data);
      }

      setLoading(false);
    };

    fetchRequests();
  }, []);

  const handleEditClick = (id, currentStatus) => {
    setEditingStatusId(id);
    setNewStatus(currentStatus);
  };

  const handleSaveClick = async (id) => {
    const { error } = await supabaseClient
      .from("service_requests")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      const updated = requests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      );
      setRequests(updated);
      setEditingStatusId(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="admin-requests-page">
        <h2>📋 All Service Requests</h2>

        {loading ? (
          <p>Loading requests...</p>
        ) : (
          <table className="requests-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Car</th>
                <th>Service</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.full_name}</td>
                  <td>{req.phone}</td>
                  <td>{req.car_brand}</td>
                  <td>{req.service_type}</td>
                  <td>{req.preferred_date}</td>
                  <td>
                    {editingStatusId === req.id ? (
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    ) : (
                      req.status
                    )}
                  </td>
                  <td>
                    {editingStatusId === req.id ? (
                      <button onClick={() => handleSaveClick(req.id)}>
                        Save
                      </button>
                    ) : (
                      <button onClick={() => handleEditClick(req.id, req.status)}>
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AdminRequests;
