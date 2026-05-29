# 🌿 ESG Dashboard

A multi-tenant ESG (Environmental, Social, Governance) data management dashboard that enables organizations to track, normalize, and audit sustainability metrics such as carbon emissions, energy usage, and ESG performance across Scope 1, 2, and 3 categories.

---

## 🚀 Live Demo

👉 https://esg-dashboard-one.vercel.app/

---

## 📌 Features

- 📊 ESG data dashboard for visualization
- 🏢 Multi-tenant organization support
- 🌍 Scope 1 / Scope 2 / Scope 3 emissions classification
- 🔄 Unit normalization for consistent analytics
- 🧾 Full audit trail for data changes
- 🔗 Source tracking for every data record
- 📁 Support for structured ESG datasets

---

## 🧠 Key System Design Concepts

This project is built with production-style architecture principles:

- **Multi-tenancy** → Each organization has isolated data using `organization_id`
- **Data lineage tracking** → Every record is linked to its original source
- **Audit logging** → All changes are tracked in an append-only audit system
- **Normalization layer** → ESG values are standardized into common units
- **Scope classification** → Emissions categorized into Scope 1, 2, and 3

---

## 🛠 Tech Stack

### Frontend
- React (Create React App)
- JavaScript
- Vercel Deployment

### Backend
- Django / Django REST Framework
- SQLite / PostgreSQL (based on setup)
- REST APIs

---
esg-dashboard/
│
├── backend/ # Django backend (API + models)
├── frontend/ # React dashboard UI
├── MODEL.md # Data model design
├── DECISIONS.md # Architecture decisions
├── TRADEOFFS.md # Design tradeoffs

## 🧩 Project Structure
