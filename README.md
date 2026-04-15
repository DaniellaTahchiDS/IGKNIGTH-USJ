# 🌿 IGKNIGHT — USJ's Sustainable Campus Initiative

> **Ignite Change – Shield the Future**

IGKNIGHT is a web-based platform developed for **Université Saint-Joseph de Beyrouth (USJ)** that incentivizes students to recycle on campus through a digital reward economy. Students earn **SCUDO** — the platform's virtual currency — by recycling waste at smart bins located across the university, and can spend those points in the campus store or invest them in student-run club projects.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [How It Works](#-how-it-works)
- [Sections & Modules](#-sections--modules)
- [Arduino Integration](#-arduino-integration)
- [SCUDO Economy](#-scudo-economy)
- [Supported Waste Types](#-supported-waste-types)
- [Screenshots](#-screenshots)
- [Future Improvements](#-future-improvements)
- [License](#-license)

---

## 🌍 Overview

IGKNIGHT bridges sustainability and technology by connecting students to **IoT-enabled smart bins** via a progressive web application. When a student approaches a smart bin, they scan its QR code using the app, select the waste type and quantity, and the bin unlocks via a servo motor controlled by an Arduino microcontroller. After the item is deposited and the bin closes, SCUDO tokens are automatically credited to the student's wallet.

The platform also features a campus **leaderboard**, a **club investment** module, an **eco-friendly store**, an **appointment scheduler**, and a **personal account dashboard** — all aimed at building a culture of sustainability at USJ.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Secure Login** | Student ID + password authentication portal |
| 🏠 **Dashboard** | Real-time stats: waste recycled, SCUDO earned, activity chart, leaderboard |
| 📷 **QR Scanner** | Camera-based QR code scanning to identify campus smart bins |
| ♻️ **Recycling Flow** | Select waste type, item, and quantity; unlock bin; earn SCUDO automatically |
| 🤖 **Arduino Sync** | Real-time serial communication with smart bin hardware via Web Serial API |
| 🛒 **Campus Store** | Redeem SCUDO for eco-friendly USJ-branded merchandise |
| 📈 **Invest** | Allocate SCUDO to support USJ student club projects (crowd-funding) |
| 💳 **Transactions** | Full transaction history with type/period filters and visual stats |
| 📅 **Appointments** | Schedule bulk recycling sessions at EcoHub locations across campuses |
| 👤 **Account** | Profile management, achievements, lifetime stats, password update |
| ❓ **Help Center** | FAQ accordion, volunteer registration form, contact support form |
| 🌙 **Dark Mode** | Automatic system-preference dark mode (desktop only) |
| 📱 **Responsive** | Mobile-first design with a hamburger menu; forced light mode on small screens |

---

## 🛠 Technology Stack

### Frontend
| Technology | Purpose |
|---|---|
| **HTML5** | Semantic page structure |
| **Tailwind CSS** (CDN v3) | Utility-first styling with a custom green design system |
| **Vanilla CSS** (`css/style.css`) | Animations, custom scrollbar, modal transitions |
| **JavaScript (ES6+)** (`js/app.js`) | All application logic, state management, DOM manipulation |
| **Chart.js** (v3.9.1) | Activity line chart and transaction bar chart |
| **HTML5-QRCode** (v2.3.4) | Camera-based QR code scanning |
| **Boxicons** (v2.1.4) | Icon set for UI elements |
| **Google Fonts — Poppins** | Typography |

### Hardware
| Component | Role |
|---|---|
| **Arduino UNO** | Smart bin microcontroller |
| **Servo Motor** | Physical bin lid open/close mechanism |
| **Green / Red / Yellow LEDs** | Bin status indicators |
| **Web Serial API** | Browser-to-Arduino serial communication |

---

## 📁 Project Structure

```
IGKNIGHT/
├── index.html                  # Main application entry point
│
├── css/
│   └── style.css               # Custom animations, scrollbar, dark mode overrides
│
├── js/
│   ├── app.js                  # Core application logic & state management
│   └── tailwind.config.js      # Tailwind CSS custom color tokens
│
├── assets/
│   └── images/
│       └── image.png           # IGKNIGHT logo
│
├── arduino/
│   └── sketch_apr23a.ino       # Arduino smart bin firmware (C++)
│
├── docs/
│   └── IGKNIGHT.pptx           # Project presentation slides
│
└── README.md                   # This file
```

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome or Edge recommended for Web Serial API support)
- No server or build tools required — IGKNIGHT is a **static web application**

### Running Locally

1. **Clone or download** the repository:
   ```bash
   git clone https://github.com/your-username/IGKNIGHT.git
   cd IGKNIGHT
   ```

2. **Open the app** by simply opening `index.html` in your browser:
   ```
   Double-click index.html
   ```
   Or serve it with a local server for best results:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js (npx)
   npx serve .
   ```
   Then navigate to `http://localhost:8000`.

3. **Login** using any Student ID and password (the app currently uses client-side validation — any non-empty credentials work).

### Setting Up the Arduino (Hardware)

1. Open `arduino/sketch_apr23a.ino` in the **Arduino IDE**.
2. Wire your components according to the pin assignments in the sketch:
   - **Servo motor** → Pin 9
   - **Green LED** → Pin 5
   - **Red LED** → Pin 6
   - **Yellow LED** → Pin 7
3. Upload the sketch to your **Arduino UNO** at **9600 baud**.
4. In the web app, navigate to the **Scan** section → click **Reconnect** to pair the browser with the Arduino via the Web Serial API.

> **Note:** Web Serial API requires Chrome or Edge on a desktop. Mobile browsers are not supported for hardware connectivity.

---

## ⚙️ How It Works

```
Student arrives at smart bin
         │
         ▼
   Open IGKNIGHT App
         │
         ▼
  Scan QR Code on Bin          ◄─── OR ─── Enter Bin Number Manually
         │
         ▼
  Select Waste Type & Item
  (Plastic / Paper / Metal / Glass)
         │
         ▼
  Set Quantity → View Estimated SCUDO Reward
         │
         ▼
  Click "Unlock Bin"
         │
         ▼
  App sends OPEN_BIN command via Web Serial API
         │
         ▼
  Arduino opens lid via Servo → LED turns green
         │
         ▼
  Student deposits waste → Lid closes
         │
         ▼
  Arduino sends BIN_CLOSED signal
         │
         ▼
  App processes reward → SCUDO added to wallet
         │
         ▼
  Transaction recorded in history ✅
```

---

## 📱 Sections & Modules

### 🏠 Home Dashboard
- Personalized welcome with student's first name
- **3 KPI cards**: Waste recycled (kg), SCUDO earnings this month, lifetime recycling activities
- **Activity chart** (line chart — monthly recycling sessions via Chart.js)
- **Recent transactions** preview (latest 3)
- **Campus leaderboard** with animated progress bars
- Quick-access "Open Scanner" CTA card

### 📷 Smart Bin Scanner
- Live camera QR code scanner using `html5-qrcode` library
- Fallback: manual bin number entry field
- Waste type selector (Plastic / Paper / Metal / Glass) with visual cards
- Item dropdown (dynamically populated per waste type)
- Quantity stepper with real-time estimated SCUDO calculation
- Unlock Bin button → triggers Arduino command
- Progress bar showing processing status
- Arduino connection status indicator with reconnect button

### 🛒 Campus Store
- Grid of eco-friendly USJ merchandise: hoodie, notebook, water bottle, tote bag, pen set, cap
- Category filters: All / Clothing / Stationery / Accessories
- SVG product illustrations for each item
- Add-to-Cart with quantity management
- Live cart sidebar with subtotal and checkout flow
- Balance check before purchase (insufficient funds guard)

### 📈 Invest
- SCUDO crowd-funding for active USJ club projects:
  - **Magis Club** — 5,000 SCUDO target
  - **Aumônerie** — 3,000 SCUDO target
  - **07Jour** — 4,000 SCUDO target
  - **FSS Social** — 3,500 SCUDO target
- Progress bars showing funding levels and supporter counts
- Invest form with amount input and real-time balance deduction

### 💳 Transactions
- Full filterable history (type: All / Earnings / Spendings / Investments)
- Summary stats: total balance, monthly earnings, monthly spendings, total count
- Bar chart (earnings vs. spending per month via Chart.js)
- Color-coded rows: green for earnings, red for spendings, blue for investments

### 📅 Appointments
- Book bulk recycling drop-offs at USJ EcoHub locations:
  - **CST** — Mar Roukoz EcoHub
  - **CSS** — Huvelin EcoHub
  - **CLS** — Innovation & Sport EcoHub
  - **CSM** — Medical Sciences EcoHub
- Time-slot picker (9AM–4PM)
- Volume selector (Small to Extra Large)
- Notes field
- Appointment cards with cancel and reschedule actions

### 👤 Account
- Profile card with initials avatar
- Editable fields: Full name, email, phone, faculty, campus
- Achievements badge collection (First Recycle, 10 Sessions, First Invest)
- Lifetime stats: total SCUDO earned, total kg recycled, total sessions, CO₂ reduced
- Password change section

### ❓ Help Center
- FAQ accordion (expandable Q&A)
- Volunteer registration form
- Contact support form
- Quick-action buttons linking to FAQ and contact sections

---

## 🤖 Arduino Integration

The smart bin hardware is controlled by an Arduino UNO running `sketch_apr23a.ino`. Communication between the browser and the Arduino happens over **USB Serial** using the **Web Serial API**.

### Serial Commands

| Command (App → Arduino) | Description |
|---|---|
| `OPEN_BIN\n` | Opens the bin lid (servo to 115°) |
| `CLOSE_BIN\n` | Closes the bin lid (servo to 55°) |
| `STATUS\n` | Requests current bin door status |

### Serial Responses

| Response (Arduino → App) | Description |
|---|---|
| `BIN_OPENED` | Lid successfully opened |
| `BIN_CLOSED` | Lid closed after use |
| `BIN_CLOSED:ITEM_DETECTED` | Lid closed and item was detected |
| `PROCESSING_COMPLETE` | Processing done, SCUDO will be awarded |
| `STATUS:OPEN` | Current status — bin is open |
| `STATUS:CLOSED` | Current status — bin is closed |

### LED Indicators

| LED Color | State |
|---|---|
| 🟢 Green | Bin is open & ready |
| 🔴 Red | Bin is closed |
| 🟡 Yellow | Processing / transitioning |

---

## 💰 SCUDO Economy

**SCUDO** is the internal virtual currency of IGKNIGHT. It cannot be withdrawn as cash — it is meant to incentivize sustainable behaviour on campus.

### Earning SCUDO (Recycling)

| Item | SCUDO Value |
|---|---|
| Water Bottle (Plastic) | 15 |
| Soda Bottle (Plastic) | 20 |
| Juice Bottle (Plastic) | 25 |
| Plastic Bag | 5 |
| Newspaper (Paper) | 10 |
| Notebook (Paper) | 15 |
| Cardboard Box (Paper) | 20 |
| Magazine (Paper) | 10 |
| Aluminum Can (Metal) | 25 |
| Food Can (Metal) | 20 |
| Bottle Caps — 10 pcs (Metal) | 15 |
| Metal Scrap — 100g (Metal) | 30 |
| Glass Bottle | 30 |
| Glass Jar | 25 |
| Broken Glass — 100g | 15 |
| Mirror Pieces (Glass) | 20 |

### Spending SCUDO (Store)

| Item | Price (SCUDO) |
|---|---|
| USJ Hoodie | 250 |
| Eco-Friendly Notebook | 120 |
| Eco Water Bottle | 180 |
| Canvas Tote Bag | 90 |
| Eco Pen Set | 60 |
| USJ Cap | 150 |

---

## ♻️ Supported Waste Types

- **Plastic** — bottles, bags, containers
- **Paper** — newspapers, notebooks, cardboard, magazines
- **Metal** — aluminum cans, food cans, bottle caps, metal scrap
- **Glass** — bottles, jars, broken glass, mirrors

---

## 🔮 Future Improvements

- [ ] **Backend integration** — REST API with a database for real user accounts, persistent balances, and real-time leaderboard
- [ ] **Push notifications** — Notify students about bonus SCUDO events or campaign days
- [ ] **Admin dashboard** — Monitor bin fill levels, manage store inventory, generate sustainability reports
- [ ] **Bluetooth Low Energy (BLE)** — Wireless bin connectivity as an alternative to USB Serial
- [ ] **NFC tap-to-recycle** — Tap student ID card on bin instead of QR scanning
- [ ] **Carbon footprint tracker** — Visualize CO₂ savings over time per student
- [ ] **PWA / Mobile app** — Installable progressive web app with offline support
- [ ] **Multi-language support** — Arabic and French localization for the USJ community

---

## 👥 Team

Developed as part of USJ's **Sustainable Campus Initiative** by the IGKNIGHT team.

---

## 📄 License

This project is developed for academic and university use at **Université Saint-Joseph de Beyrouth**. All rights reserved © 2025 USJ IGKNIGHT.

---

<div align="center">
  <strong>🌿 Ignite Change – Shield the Future 🌿</strong><br/>
  <em>USJ's Sustainable Campus Initiative</em>
</div>
