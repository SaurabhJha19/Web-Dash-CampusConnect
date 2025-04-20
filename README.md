# 🎓 CampusConnect

CampusConnect is a modern web-based alumni networking platform designed to bridge the gap between students and alumni across colleges. It offers features like real-time one-on-one messaging, a searchable alumni directory, community posts, and user dashboards—all built using **HTML**, **CSS**, **JavaScript**, and **Supabase**.

---

## 🚀 Features

### 💬 Real-Time Chat System
- One-on-one messaging between students and alumni
- Real-time updates powered by Supabase Realtime
- Clean UI for seamless conversations

### 🏠 User Dashboard
- Personalized dashboard after login
- Displays user info and quick navigation
- Secure session handling via Supabase Auth

### 🧑‍🎓 Alumni Directory
- Filter and search alumni by batch, college, department, profession, and location
- View verified alumni profiles
- Directly connect via chat

### 🌐 Community Feed
- Post announcements, updates, and news
- Real-time rendering of new posts
- Lightweight and easy-to-use interface

---

## 🧱 Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Supabase (Database, Auth, Realtime)
- **Database**: PostgreSQL (via Supabase)
- **Deployment**: Google Firebase

---

## Databases

#### messages
| Column       | Type      |
|--------------|-----------|
| id           | uuid (PK) |
| sender_id    | text      |
| receiver_id  | text      |
| message      | text      |
| timestamp    | timestamp (default: now()) |

#### posts
| Column       | Type      |
|--------------|-----------|
| id           | uuid (PK) |
| userId       | text      |
| username     | text      |
| content      | text      |
| created_at   | timestamp (default: now()) |

#### alumni
| Column       | Type      |
|--------------|-----------|
| id           | uuid (PK) |
| name         | text      |
| batch        | text      |
| college      | text      |
| department   | text      |
| profession   | text      |
| location     | text      |
| uid          | text      |
| profileImageUrl | text   |

---

## Deployed Website link - https://campusconnect-8dd66.web.app/

---

### 👨‍💻 Made by Saurabh Jha for Web dash

## connect here -
linkedin - https://www.linkedin.com/in/saurabhjha19/
instagram -  https://www.instagram.com/saurabh_jha_006/
