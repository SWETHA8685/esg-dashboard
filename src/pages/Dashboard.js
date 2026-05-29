import React, {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";

import "../styles/dashboard.css";


function Dashboard() {

  const [records, setRecords] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("ALL");

  const [formData, setFormData] =
    useState({
      source_type: "SAP",
      category: "",
      amount: "",
      unit: "",
      normalized_unit: "kgCO2e",
      date: "",
      status: "PENDING",
      suspicious: false,
    });


  useEffect(() => {
    fetchRecords();
  }, []);


  // FETCH RECORDS

  const fetchRecords = async () => {

    try {

      const response =
        await API.get("records/");

      setRecords(response.data);

    } catch (error) {

      console.log(error);

    }
  };


  // CREATE RECORD

  const createRecord = async () => {

    if (
      !formData.category ||
      !formData.amount ||
      !formData.unit ||
      !formData.date
    ) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    try {

      await API.post(
        "records/",
        formData
      );

      fetchRecords();

      alert(
        "Record created successfully"
      );

      setFormData({
        source_type: "SAP",
        category: "",
        amount: "",
        unit: "",
        normalized_unit: "kgCO2e",
        date: "",
        status: "PENDING",
        suspicious: false,
      });

    } catch (error) {

      console.log(error);

      alert(
        "Error creating record"
      );
    }
  };


  // APPROVE RECORD

  const approveRecord = async (id) => {

    try {

      await API.patch(
        `records/${id}/`,
        {
          status: "APPROVED",
        }
      );

      fetchRecords();

      alert(
        "Record approved"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Approval failed"
      );
    }
  };


  // REJECT RECORD

  const rejectRecord = async (id) => {

    const confirmReject =
      window.confirm(
        "Are you sure you want to reject this record?"
      );

    if (!confirmReject) {
      return;
    }

    try {

      await API.patch(
        `records/${id}/`,
        {
          status: "REJECTED",
        }
      );

      fetchRecords();

      alert(
        "Record rejected"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Reject failed"
      );
    }
  };


  // DELETE RECORD

  const deleteRecord = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this record?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      await API.delete(
        `records/${id}/`
      );

      fetchRecords();

      alert(
        "Record deleted successfully"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Delete failed"
      );
    }
  };


  // FILTER RECORDS

  const filteredRecords =
    records.filter((record) => {

      const matchesSearch =
        record.category
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesFilter =
        filter === "ALL"
          ? true
          : record.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });


  return (

    <div>

      <Navbar />

      <div className="dashboard">

        <h1 className="title">
          ESG Analyst Dashboard
        </h1>


        {/* FORM */}

        <div className="form-container">

          <h2>
            Add ESG Record
          </h2>

<select
  value={formData.category}
  onChange={(e) =>
    setFormData({
      ...formData,
      category: e.target.value,
    })
  }
>

  <option value="">
    Select Category
  </option>

  <option value="Electricity">
    Electricity
  </option>

  <option value="Fuel">
    Fuel
  </option>

  <option value="Travel">
    Travel
  </option>

  <option value="Water">
    Water
  </option>

  <option value="Waste">
    Waste
  </option>

  <option value="Manufacturing">
    Manufacturing
  </option>

</select>


          <input
            placeholder="Amount"
            type="number"
            value={formData.amount}
            onChange={(e) =>
              setFormData({
                ...formData,
                amount: e.target.value,
              })
            }
          />


          <input
            placeholder="Unit"
            value={formData.unit}
            onChange={(e) =>
              setFormData({
                ...formData,
                unit: e.target.value,
              })
            }
          />


          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({
                ...formData,
                date: e.target.value,
              })
            }
          />


          <select
            value={formData.source_type}
            onChange={(e) =>
              setFormData({
                ...formData,
                source_type:
                  e.target.value,
              })
            }
          >

            <option value="SAP">
              SAP
            </option>

            <option value="UTILITY">
              UTILITY
            </option>

            <option value="TRAVEL">
              TRAVEL
            </option>

          </select>


          <label>

            <input
              type="checkbox"
              checked={
                formData.suspicious
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  suspicious:
                    e.target.checked,
                })
              }
            />

            {" "}
            Suspicious Record

          </label>


          <button
            className="create-btn"
            onClick={createRecord}
          >
            Create Record
          </button>

        </div>


        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search category..."
          className="search-bar"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />


        {/* FILTER */}

        <div className="filter-buttons">

          <button
            onClick={() =>
              setFilter("ALL")
            }
          >
            All
          </button>

          <button
            onClick={() =>
              setFilter("PENDING")
            }
          >
            Pending
          </button>

          <button
            onClick={() =>
              setFilter("APPROVED")
            }
          >
            Approved
          </button>

          <button
            onClick={() =>
              setFilter("REJECTED")
            }
          >
            Rejected
          </button>

        </div>


        {/* RECORD CARDS */}

        <div className="card-container">

          {filteredRecords.map(
            (record) => (

              <div
                className="record-card"
                key={record.id}
              >

                <h2>
                  {record.category}
                </h2>


                <p>
                  <strong>
                    Source:
                  </strong>
                  {" "}
                  {record.source_type}
                </p>


                <p>
                  <strong>
                    Amount:
                  </strong>
                  {" "}
                  {record.amount}
                </p>


                <p>
                  <strong>
                    Unit:
                  </strong>
                  {" "}
                  {record.unit}
                </p>


                <p>

                  <strong>
                    Status:
                  </strong>
                  {" "}

                  <span
                    style={{
                      color:
                        record.status ===
                        "APPROVED"
                          ? "green"
                          : record.status ===
                            "REJECTED"
                          ? "red"
                          : "orange",

                      fontWeight:
                        "bold",
                    }}
                  >
                    {record.status}
                  </span>

                </p>


                {record.suspicious && (

                  <div className="warning">
                    Suspicious Record
                  </div>

                )}


                {record.status !==
                  "APPROVED" && (

                  <button
                    className="approve-btn"
                    onClick={() =>
                      approveRecord(
                        record.id
                      )
                    }
                  >
                    Approve
                  </button>

                )}


                {record.status !==
                  "REJECTED" && (

                  <button
                    className="reject-btn"
                    onClick={() =>
                      rejectRecord(
                        record.id
                      )
                    }
                  >
                    Reject
                  </button>

                )}


                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteRecord(
                      record.id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;