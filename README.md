# 🏠 Room Finder Website

A modern Room Finder web application that allows users to **sign up, verify email via OTP, and manage their own room listings securely**.  
Built using **React** for the frontend and **Supabase** as the backend (Authentication, Database, Storage).

---

## 🔗 Live Project
- **Live App:** _https://roomfinder1.netlify.app_
- **Demo Video:** _https://www.loom.com/share/cb48afe8a0a84c6987a4b1df9321d36f_

---

## ✨ Features

### 🔐 Authentication
- Email & password signup
- **OTP-based email verification** (no magic links)
- Password-based login
- Secure authentication using Supabase Auth

### 🏘️ Room Listings
- Each user can:
  - Add room listings
  - View **only their own rooms**
  - Delete their rooms
- User data isolation using **Row Level Security (RLS)**

### 🖼️ Image Upload
- Room images stored using **Supabase Storage**
- Public image URLs for fast loading

### 🎨 UI / UX
- Dark mode (carbon theme)
- Responsive design
- Clean and modern layout

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend as a Service:** Supabase
- **Authentication:** Supabase Auth (Email)
- **Database:** PostgreSQL (Supabase)
- **Storage:** Supabase Storage

---

## 🗂️ Database Schema (Rooms)

```sql
rooms
├── id (uuid)
├── owner_id (uuid → auth.users.id)
├── title (text)
├── location (text)
├── price (integer)
├── property_type (text)
├── tenant_preference (text)
├── contact (text)
├── description (text)
├── images (text[])
├── created_at (timestamp)
├── updated_at (timestamp)
