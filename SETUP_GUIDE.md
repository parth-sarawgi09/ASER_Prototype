# EduTrack AI — React Prototype Setup Guide

## 🚀 Quick Start (5 minutes)

### Option 1: Deploy on Vercel (RECOMMENDED — fastest)

1. **Create GitHub account** (if you don't have one)
   - Go to github.com
   - Sign up

2. **Create a new GitHub repo**
   - Click "New repository"
   - Name it: `edutrack-ai`
   - Initialize with README

3. **Upload your React file**
   - Create folder structure in the repo:
     ```
     src/
       App.jsx
     package.json
     ```

4. **Add package.json**
   ```json
   {
     "name": "edutrack-ai",
     "version": "1.0.0",
     "type": "module",
     "dependencies": {
       "react": "^18.2.0",
       "react-dom": "^18.2.0",
       "lucide-react": "^0.383.0"
     },
     "devDependencies": {
       "@vitejs/plugin-react": "^4.0.0",
       "vite": "^4.3.9"
     },
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview"
     }
   }
   ```

5. **Deploy to Vercel**
   - Go to vercel.com
   - Click "New Project"
   - Import your GitHub repo
   - Click Deploy
   - **Done!** You get a live URL in ~2 minutes

---

### Option 2: Run Locally (for testing)

1. **Install Node.js** (if you don't have it)
   - Download from nodejs.org
   - Install it

2. **Create project folder**
   ```bash
   mkdir edutrack-ai
   cd edutrack-ai
   ```

3. **Initialize React project**
   ```bash
   npm create vite@latest . -- --template react
   npm install
   ```

4. **Add lucide-react icons**
   ```bash
   npm install lucide-react
   ```

5. **Replace src/App.jsx** with the code from `edutrack-ai-prototype.jsx`

6. **Run locally**
   ```bash
   npm run dev
   ```
   - Opens at `http://localhost:5173`

7. **Build for production**
   ```bash
   npm run build
   ```

---

## 📝 What the Prototype Does

### ✅ Features (Impress Flexera)

1. **State Filtering** — Select any of 6 states, data updates instantly
2. **Grade Selection** — Switch between Grade 3 and Grade 5
3. **Year Comparison** — View trends across 2018, 2022, 2024
4. **Risk Assessment** — Color-coded risk levels (Red/Yellow/Green)
5. **AI-Generated Insights** — Dynamic insights based on selected state/grade
6. **Grade Drop Analysis** — Shows % decline from Grade 3 → Grade 5
7. **Recommended Actions** — Actionable next steps for DEOs
8. **Responsive Design** — Works on desktop and mobile

---

## 🎯 How to Present This in Interview

### What to Say:

*"I built an interactive React dashboard for District Education Officers. The key features are:*

1. *Real-time filtering by state, grade, and year — so officers can drill down to specific data*
2. *Risk-based color coding — automatically highlights critical areas (red) vs. good performance (green)*
3. *AI-generated insights — instead of just showing numbers, the system analyzes patterns and recommends actions*
4. *Grade drop analysis — this was important from the data, showing how students decline as they progress*

*The core problem it solves: DEOs were looking at static reports. Now they get an interactive tool that surfaces insights automatically."*

---

## 🧠 Why This Wins vs. Static HTML

| Feature | Static HTML | React |
|---------|------------|-------|
| Interactivity | Basic dropdowns | Full state management |
| Performance | Slow re-renders | Optimized updates |
| Complexity | Limited logic | Can handle real complexity |
| Scalability | Hard to extend | Easy to add features |
| Interview Vibe | "You built UI" | "You built a real product" |

---

## 💪 How to Make It Even Better (Next Level)

### Add Chart Visualization
```bash
npm install recharts
```

Then add to App.jsx:
```jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const chartData = [
  { year: 2018, reading: 24.5, math: 12.3 },
  { year: 2022, reading: 26.1, math: 13.5 },
  { year: 2024, reading: 27.3, math: 14.2 }
];

<LineChart width={600} height={300} data={chartData}>
  <CartesianGrid />
  <XAxis dataKey="year" />
  <YAxis />
  <Tooltip />
  <Line type="monotone" dataKey="reading" stroke="#3b82f6" />
  <Line type="monotone" dataKey="math" stroke="#ef4444" />
</LineChart>
```

### Add Database Integration
- Use Firebase or Supabase for real data
- Show live data from ASER API
- Add user authentication

### Add Export Feature
```jsx
const exportToCSV = () => {
  const csv = // convert data to CSV
  const url = URL.createObjectURL(new Blob([csv]));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'edutrack-report.csv';
  a.click();
};
```

---

## 🔧 Troubleshooting

### "Module not found" error
```bash
npm install lucide-react
```

### "Port 5173 already in use"
```bash
npm run dev -- --port 3000
```

### Vercel build failing
- Make sure `package.json` has all dependencies
- Check that `lucide-react` is in dependencies, not devDependencies

---

## 📊 Sample Data in the Prototype

All 6 states across 3 years (2018, 2022, 2024):
- **Bihar** — lowest performance (critical focus)
- **UP** — moderate performance
- **Rajasthan** — improving trend
- **MP** — moderate with decline
- **Maharashtra** — strong performer
- **Tamil Nadu** — highest performance (case study)

Each includes Grade 3 & 5, Reading & Arithmetic

---

## 🎬 Interview Scenario

### They ask: "Walk us through the code"

**You say:**

*"The component uses React hooks for state management. When a user selects a state, it filters the dataset using `useMemo` for performance. The insight generation is logic-based — it checks if arithmetic is critical, if there's a grade drop, and generates text accordingly.*

*The color coding uses a risk assessment function — red if below 20%, yellow if below 30%, green above. This happens dynamically based on the selected data.*

*Instead of static dashboards, this gives DEOs a tool that thinks for them — automatically highlighting problems and suggesting actions."*

---

## 🚀 Final Checklist

- [ ] Code works locally (`npm run dev`)
- [ ] No console errors
- [ ] All filters work (state, grade, year)
- [ ] Risk colors change correctly
- [ ] AI insight changes when you select different states
- [ ] Deployed to Vercel or similar
- [ ] Shareable link ready
- [ ] Can explain every feature in interview

---

## 📞 If Something Breaks

**Error in console?**
- Check browser DevTools (F12)
- Post error message here

**Doesn't filter correctly?**
- Check that selected state matches ASER_DATA state names exactly
- Clear browser cache (Ctrl+Shift+Delete)

**Styling issues?**
- All styling is inline (no CSS issues)
- If colors don't work, check the hex values

---

## 💡 Pro Tip for Interview

When they ask "What would you improve?", say:

*"Right now it's hardcoded data. In production, I'd integrate with the ASER API for real-time data. I'd also add time-series charts, geospatial visualization of schools, and allow DEOs to set intervention thresholds that auto-trigger alerts."*

👉 This shows you're thinking beyond the prototype.

---

Ready? Deploy it and share the link! 🚀
