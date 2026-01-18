# 🚀 VerifAI – AI-Powered Complaint Verification & Delivery Safety Platform

## 📌 Problem Statement

Online food delivery platforms face two critical problems:

### 1️⃣ False Refund Complaints
Many customers raise fake or exaggerated complaints (missing items, late delivery, wrong food) to receive refunds.  
This leads to:
- Revenue loss for companies
- Unfair penalties for restaurants and delivery agents
- Heavy manual review workload

### 2️⃣ Delivery Partner Safety
Delivery agents frequently deliver in:
- Risky or unsafe zones
- Late-night high-risk areas
- Regions with high complaint and fraud rates

There is currently no intelligent system to assess these risks in advance.

---

## 💡 How We Identified This Problem

The idea for **VerifAI** came from a podcast where **Zomato’s founder** discussed:
- Growing fake refund complaints
- Trust imbalance in food delivery platforms
- Challenges in protecting delivery partners

This inspired us to design a **data-driven, AI-based trust system**.

---

## 🧠 Our Solution – VerifAI

**VerifAI** is an AI-powered system that:
- Detects **genuine vs false complaints**
- Calculates **trust scores** for customers, restaurants, and delivery agents
- Assists companies in **refund decisions**
- Improves **delivery partner safety**

---

## 🔍 How VerifAI Works (Step-by-Step)

### 🧑 Customer Flow
1. Customer submits a complaint with:
   - Customer ID  
   - Restaurant ID  
   - Delivery Agent ID  
   - Complaint type (missing item, late delivery, etc.)
2. Customer can view:
   - Complaint status
   - Trust score
   - Approval / rejection result

---

### ⚙️ Backend + AI Flow
1. Backend API receives complaint data
2. Historical data is fetched for:
   - Customer
   - Restaurant
   - Delivery agent
3. Features are extracted:
   - Past complaints
   - False complaint ratio
   - Delivery delays
   - Risk patterns
4. **Machine Learning model (Logistic Regression)** predicts:
   - Whether the complaint is genuine
   - Probability score (0–1)
5. Trust score (0–100) is generated
6. Decision logic:
   - **High score → Auto approve**
   - **Medium score → Manual review**
   - **Low score → Flag as suspicious**

---

### 📊 Admin Dashboard
- View all complaints in a table
- AI-generated probability and trust score
- Recommended decision by ML model
- Final decision control for company/admin

---

## 🤖 Machine Learning Model

- **Algorithm Used:** Logistic Regression
- **Why Logistic Regression?**
  - Simple and interpretable
  - Works well for binary classification
  - Ideal for hackathon MVP

- **Current Accuracy:** ~65–70%  
  *(Using synthetic data)*

> ⚠️ Dataset is **synthetic (manually created)** for hackathon prototyping.

---

## 📁 Dataset Description

We use three CSV files:

### 👤 `customers_120.csv`
- customer_id  
- total_orders  
- total_complaints  
- false_complaints  
- account_age_days  
- device_trust_score  

### 🍽️ `restaurants_110.csv`
- restaurant_id  
- total_orders  
- missing_item_rate  
- prep_delay_rate  
- customer_rating_avg  

### 🚴 `agents_130.csv`
- agent_id  
- total_deliveries  
- late_delivery_rate  
- risky_area_pct  
- agent_rating_avg  

---

## 🛡️ Delivery Partner Safety (Second Problem)

VerifAI also helps in:
- Identifying **high-risk delivery zones**
- Detecting late-night and unsafe delivery patterns
- Assigning deliveries based on:
  - Agent experience
  - Area risk score
  - Historical complaints

This improves:
- Delivery partner safety
- Platform trust
- Operational efficiency

---

## 🧰 Tech Stack Used

| Layer | Technology |
|-----|-----------|
| Frontend | Next.js |
| Backend | Node.js / Express |
| Machine Learning | Python, Pandas, Scikit-learn |
| Model | Logistic Regression |
| Database | MongoDB (future integration) |
| Visualization | Mermaid, Napkin.ai |
| Version Control | Git & GitHub |

---

## 🌟 Innovation & USP

- AI-based refund verification system  
- Trust score instead of blind refunds  
- Fair system for customers, restaurants & agents  
- Focus on delivery partner safety  
- Scalable and production-ready architecture  

---

## 🔮 Future Enhancements

- Advanced models (Random Forest, XGBoost)
- NLP-based complaint text analysis
- Real-time GPS risk scoring
- Full production database integration

---

## 🏁 Conclusion

**VerifAI** brings trust, transparency, and safety to food delivery platforms by using AI to make smarter refund decisions and protect delivery partners.

---

## 👩‍💻 Team Contribution

- **AI / ML:** Complaint classification & trust scoring  
- **Backend:** APIs & data handling  
- **Frontend:** Customer & admin dashboards  

---


