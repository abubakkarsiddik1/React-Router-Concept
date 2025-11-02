👉 React Router-এ <Outlet /> হলো একটা placeholder component, যেখানে nested route বা child route-এর content render হয়।

🧩 ১. Outlet কী?

👉 <Outlet /> হলো React Router-এর একটা বিশেষ জায়গা (placeholder) —
যেখানে child route-এর content render হয়।

অর্থাৎ —
তুমি যদি parent route-এর নিচে child route define করো,
তাহলে child route-এর UI <Outlet /> এর জায়গায় দেখা যাবে।

🔧 ২. একটা সহজ উদাহরণ

ধরা যাক, তোমার নিচের মতো routing আছে:

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* nested routes */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

🔹 Layout.jsx
import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/about">About</Link> | 
        <Link to="/contact">Contact</Link>
      </nav>

      <hr />

      {/* এখানে child route render হবে */}
      <Outlet />
    </div>
  );
}

🧠 ৩. এখন কী হচ্ছে?

যখন / route এ যাবে → <Home /> <Outlet /> এ render হবে

যখন /about route এ যাবে → <About /> render হবে

যখন /contact route এ যাবে → <Contact /> render হবে

তোমার Layout (যেখানে navbar আছে) সব সময় থাকবে,
আর নিচে <Outlet /> এর জায়গায় child route পরিবর্তিত হবে।

⚙️ ৪. Outlet কেন দরকার?

✅ Reusable layout তৈরি করতে
✅ Navbar, Sidebar, Footer এক জায়গায় রাখতে
✅ Nested route system সহজভাবে দেখাতে

🧾 ৫. Extra Example (Nested UI)
<Route path="dashboard" element={<Dashboard />}>
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>


👉 তাহলে Dashboard.jsx এর ভিতরে <Outlet /> থাকলে
/dashboard/profile এ গেলে Profile render হবে
/dashboard/settings এ গেলে Settings render হবে।

সংক্ষেপে —

<Outlet /> = যেখানে child route-এর component render হয়।


🧩 ১. NavLink কী?

👉 NavLink হলো React Router-এর একটা special link component,
যেটা স্বয়ংক্রিয়ভাবে একটা active class বা style apply করে যখন route match করে।

অর্থাৎ —
তুমি যদি /dashboard route এ থাকো, তাহলে Dashboard link টা আলাদা রঙে দেখাবে।

🔧 ২. Basic Example
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="space-x-4">
      <NavLink to="/" className="px-2 py-1">
        Home
      </NavLink>
      <NavLink to="/about" className="px-2 py-1">
        About
      </NavLink>
      <NavLink to="/contact" className="px-2 py-1">
        Contact
      </NavLink>
    </nav>
  );
}


এটা <Link> এর মতোই কাজ করে, কিন্তু এখন আমরা active link আলাদা করে style দিতে পারি 👇

🎨 ৩. Active Style / Class ব্যবহার
✅ (A) className callback ব্যবহার করে
<NavLink
  to="/about"
  className={({ isActive }) =>
    isActive
      ? "text-yellow-400 font-bold border-b-2 border-yellow-400"
      : "text-white hover:text-yellow-300"
  }
>
  About
</NavLink>


এখানে isActive হলো React Router-এর দেওয়া property —
যখন path মিলে যায়, তখন isActive হয় true।

🧱 ৪. Sidebar উদাহরণ (Outlet সহ Layout.jsx এ)
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-5 space-y-4">
        <h2 className="text-2xl font-bold mb-6">My App</h2>

        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-500 text-black font-semibold rounded px-3 py-2"
                : "hover:bg-gray-800 rounded px-3 py-2"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-500 text-black font-semibold rounded px-3 py-2"
                : "hover:bg-gray-800 rounded px-3 py-2"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-500 text-black font-semibold rounded px-3 py-2"
                : "hover:bg-gray-800 rounded px-3 py-2"
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-500 text-black font-semibold rounded px-3 py-2"
                : "hover:bg-gray-800 rounded px-3 py-2"
            }
          >
            Settings
          </NavLink>
        </nav>
      </aside>

      {/* Main Area */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}

💡 ৫. NavLink vs Link পার্থক্য

বিষয়	Link	NavLink
Active Route Style	❌ নেই	✅ আছে
ClassName Function	❌	✅ ({ isActive }) => … ব্যবহার করা যায়
ব্যবহারের উদ্দেশ্য	সাধারণ navigation	Active highlighting সহ navigation
⚙️ ৬. ছোট টিপস:

end prop ব্যবহার করলে exact path match করে (যেমন / route এর জন্য)।

Tailwind বা CSS দিয়ে সহজেই Active item আলাদা করে ডিজাইন করা যায়।


🧠 ১. Loader কী?

👉 loader হচ্ছে React Router v6.4+ এর একটা function,
যেটা route render হওয়ার আগে চলে এবং data return করে।
ওই data পরে তোমার component-এ useLoaderData() দিয়ে পাওয়া যায়।

⚙️ ২. Loader কবে দরকার?

✅ যখন তুমি API থেকে data আনবে (fetch করবা)
✅ যখন component load হওয়ার আগেই data দরকার
✅ যখন SSR (Server-side rendering) এর মতো preloaded data দরকার

🧩 ৩. Basic Example
👉 Step 1: Route define করা
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Users from "./Users";

const router = createBrowserRouter([
  {
    path: "/users",
    element: <Users />,
    loader: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      return res.json();
    },
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

👉 Step 2: Component-এ Loader Data ব্যবহার করা
import { useLoaderData } from "react-router-dom";

export default function Users() {
  const users = useLoaderData();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👥 User List</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="bg-gray-100 p-3 rounded">
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}


🧩 এখানে কী হচ্ছে:

Route load হওয়ার সময় loader function প্রথমে চলে।

loader থেকে fetch করা data component render হওয়ার আগে পাওয়া যায়।

Component-এ useLoaderData() দিয়ে সেই data নেওয়া হয়।

🧾 ৪. Loader এর সুবিধা
সুবিধা	বর্ণনা
⚡ Fast Load	Component render হওয়ার আগেই data পাওয়া যায়
🔄 Auto Retry	Error হলে React Router data পুনরায় আনতে পারে
🧩 Separation	Data fetching আর UI rendering আলাদা থাকে
🧭 Integration	Navigation এর সাথে সুন্দরভাবে কাজ করে
🚨 ৫. Loader Error Handle করা

তুমি যদি loader এর ভিতরে error পাও, তাহলে errorElement ব্যবহার করে তা handle করা যায় 👇

const router = createBrowserRouter([
  {
    path: "/users",
    element: <Users />,
    loader: async () => {
      const res = await fetch("https://invalid-url.com");
      if (!res.ok) {
        throw new Response("Failed to load users", { status: 404 });
      }
      return res.json();
    },
    errorElement: <h2>❌ Failed to load users</h2>,
  },
]);

⚙️ ৬. Nested Route + Loader একসাথে

তুমি চাইলে parent layout বা nested route — উভয় জায়গাতেই loader ব্যবহার করতে পারো।

{
  path: "/dashboard",
  element: <Dashboard />,
  loader: async () => {
    const data = await fetch("/api/dashboard-data");
    return data.json();
  },
  children: [
    {
      path: "profile",
      element: <Profile />,
      loader: async () => fetch("/api/profile").then(res => res.json()),
    },
  ],
}

💡 সংক্ষেপে:

loader হলো route load হওয়ার আগে চলা data-fetching function,
আর useLoaderData() দিয়ে সেই data component এ পাওয়া যায়।


🧩 ১. Suspense কী?

👉 <Suspense> হলো React এর একটা built-in component,
যেটা loading state দেখানোর কাজ করে যতক্ষণ না lazy-loaded component বা data প্রস্তুত হয়।

অর্থাৎ —

কোনো component যদি আসতে দেরি করে (যেমন lazy loading বা data loading এর সময়),
তখন <Suspense> একটা fallback UI (যেমন "Loading...") দেখায়।

⚙️ ২. Suspense কবে দরকার?

✅ যখন তুমি lazy load করে component import করো
✅ যখন React.lazy() ব্যবহার করো
✅ যখন data fetch করতে সময় লাগে (React 18 এর concurrent feature সহ)

🧱 ৩. Basic Example (Lazy Loading সহ)
👉 Step 1: Lazy Import
import React, { Suspense, lazy } from "react";

const About = lazy(() => import("./About"));
const Contact = lazy(() => import("./Contact"));

👉 Step 2: Suspense দিয়ে Wrap করা
function App() {
  return (
    <div>
      <h1>React Suspense Example</h1>

      <Suspense fallback={<h3>⏳ Loading page...</h3>}>
        <About />
        <Contact />
      </Suspense>
    </div>
  );
}

export default App;


🧩 এখন যখন About বা Contact component লোড হতে সময় নিবে,
React তখন fallback <h3>⏳ Loading page...</h3> দেখাবে।

🚀 ৪. Lazy Load কেন দরকার?

👉 Lazy load মানে হলো — component গুলো প্রয়োজন পড়লে তবেই লোড হবে।
এতে initial load fast হয়।

🔹 উদাহরণ:

const Dashboard = lazy(() => import("./Dashboard"));


React এই ফাইলটা bundle করবে না যতক্ষণ না Dashboard আসলে render হচ্ছে।

🧠 ৫. Nested Suspense Example

তুমি চাইলে আলাদা আলাদা অংশেও Suspense ব্যবহার করতে পারো 👇

<Suspense fallback={<p>Loading Navbar...</p>}>
  <Navbar />
</Suspense>

<Suspense fallback={<p>Loading Main Content...</p>}>
  <MainContent />
</Suspense>

💡 ৬. React Router এর সাথে Suspense

React Router + Lazy loading একসাথে ব্যবহার করলে সাধারণত এমন হয় 👇

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
const Contact = lazy(() => import("./Contact"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-6 text-lg">🌀 Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;


🟢 এখন Route অনুযায়ী page load হবে, আর লোড হতে দেরি হলে “🌀 Loading…” দেখা যাবে।

⚙️ ৭. Suspense (Data Fetching সহ — React 18+)

React 18 এ data fetching ও Suspense দিয়ে করা যায় (যখন concurrent feature চালু থাকে)।

উদাহরণ:

const resource = fetchData();

function Profile() {
  const user = resource.user.read();
  return <h2>{user.name}</h2>;
}

function App() {
  return (
    <Suspense fallback={<h3>Loading user...</h3>}>
      <Profile />
    </Suspense>
  );
}

🧾 ৮. সংক্ষেপে
বিষয়	বর্ণনা
🔹 Component	<Suspense>
🔹 কাজ	Lazy component বা data লোড না হওয়া পর্যন্ত fallback UI দেখায়
🔹 মূল Props	fallback
🔹 ব্যবহারের জায়গা	Lazy Loading, Data Fetching, Routing
✨ সারাংশ:

<Suspense> = "Loading state দেখানোর wrapper"
React.lazy() = "Component lazy load করার function"
একসাথে ব্যবহার করলে performance বাড়ে, UI smooth হয় 🚀


🧩 ১. Context

React Router এর নতুন ভার্সনে তুমি useNavigation() হুক ব্যবহার করতে পারো,
যেটা তোমাকে জানায় — user বর্তমানে নতুন কোনো পেজে যাচ্ছে কিনা (navigating)।

import { useNavigation } from "react-router-dom";


এই হুক তোমাকে একটি navigation object দেয়,
যার ভিতরে থাকে route পরিবর্তনের সময় সম্পর্কিত তথ্য।

⚙️ ২. কোড ব্যাখ্যা
const navigation = useNavigation();
const isNavigating = Boolean(navigation.location);


🔹 navigation.location → যদি user নতুন route এ যায় (navigate করে),
তাহলে এখানে সেই নতুন route-এর location object পাওয়া যাবে।

🔹 Boolean(navigation.location) →
এটা true হবে যখন কোনো navigation চলছে,
আর false হবে যখন কিছুই হচ্ছে না।

অর্থাৎ,

isNavigating === true 👉 ইউজার নতুন পেজে যাচ্ছে
isNavigating === false 👉 ইউজার স্থির আছে (কোনো লোডিং নেই)

🚀 ৩. Practical Example (Loading Spinner সহ)
import { useNavigation, Outlet } from "react-router-dom";

export default function Layout() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <div>
      <header className="p-4 bg-blue-600 text-white">
        <h1>My React App</h1>
      </header>

      {isNavigating && (
        <div className="p-2 bg-yellow-100 text-center text-sm">
          ⏳ Navigating... Please wait
        </div>
      )}

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}


🧠 এখানে কী হচ্ছে:

যখন তুমি কোনো লিঙ্কে ক্লিক করে নতুন route এ যাও,
তখন navigation.location truthy হয় → isNavigating = true
তখন “Navigating...” বার্তা দেখাবে।

নতুন route render হয়ে গেলে → navigation.location null হয়,
তখন বার্তাটা অদৃশ্য হয়ে যায়।

🧾 ৪. কেন দরকার?

✅ Smooth UX — route change চলাকালীন loading indicator দেখানো যায়
✅ Loader data আসা পর্যন্ত skeleton বা spinner দেখানো যায়
✅ Full page reload ছাড়া SPA navigation animation করা যায়

⚙️ ৫. সংক্ষেপে
বিষয়	কাজ
useNavigation()	বর্তমান navigation status দেয়
navigation.location	যদি নতুন route এ যাচ্ছে, তাহলে location object দেয়
Boolean(navigation.location)	true = navigating চলছে
isNavigating	লোডিং UI দেখাতে কাজে লাগে
💡 সারাংশ:

const isNavigating = Boolean(navigation.location);
👉 এর মানে — “React Router এখন নতুন কোনো পেজে যাচ্ছে কিনা তা চেক করা।”


🧭 ১. Navigate কী?

👉 <Navigate> হলো React Router-এর একটা component,
যেটা render হলে স্বয়ংক্রিয়ভাবে ইউজারকে অন্য route এ redirect করে।

অর্থাৎ —

এটা React এর <Redirect> (পুরনো ভার্সন) এর আধুনিক সংস্করণ।

⚙️ ২. Basic Example
import { Navigate } from "react-router-dom";

function PrivateRoute({ user, children }) {
  if (!user) {
    // user লগইন না করলে redirect করবে
    return <Navigate to="/login" replace />;
  }
  return children;
}


এখানে:

to="/login" → কোথায় পাঠাবে

replace → ইতিহাসে (browser history) পুরোনো পেজটা রাখবে না (Back দিলে আগেরটায় যাবে না)

🔐 ৩. Protected Route Example
<Route
  path="/dashboard"
  element={
    <PrivateRoute user={isLoggedIn}>
      <Dashboard />
    </PrivateRoute>
  }
/>


🧩 কাজের ধরণ:

যদি isLoggedIn false হয়, তাহলে <Navigate to="/login" /> চালু হবে → redirect করবে।

নইলে <Dashboard /> render হবে।

🧱 ৪. Programmatic Navigation (useNavigate Hook)

👉 কখনও তুমি button click বা function এর ভেতর থেকে** route change করতে চাও**, তখন <Navigate> না ব্যবহার করে useNavigate() ব্যবহার করো।

✅ Example: useNavigate()
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // লগইন সফল হলে
    navigate("/dashboard"); // dashboard এ যাবে
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login Now</button>
    </div>
  );
}


এখন বোতাম চাপলেই /dashboard এ redirect হবে।

🧠 ৫. useNavigate Extra Features
navigate("/home");           // নতুন route এ যাবে
navigate(-1);                // এক ধাপ পিছনে যাবে (Back)
navigate("/login", { replace: true }); // replace করে redirect
navigate("/profile", { state: { from: "dashboard" } }); // data সহ পাঠানো


👉 পাঠানো data তুমি useLocation() দিয়ে পেতে পারো।

🧩 ৬. Navigate এবং useNavigate এর পার্থক্য
বিষয়	<Navigate>	useNavigate()
ধরন	Component	Hook
কাজের সময়	Render হওয়ার সময় redirect করে	Function এর মাধ্যমে redirect করে
ব্যবহারের জায়গা	Conditional rendering	Button click, API success ইত্যাদি
Replace option	replace prop	{ replace: true } option
⚙️ ৭. Example: Conditional Redirect
function Profile({ user }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <h2>Welcome, {user.name}</h2>;
}

🚀 ৮. Example: useNavigate with Delay
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return <h2>✅ Payment successful! Redirecting to home...</h2>;
}


👉 ৩ সেকেন্ড পর স্বয়ংক্রিয়ভাবে হোমপেজে চলে যাবে।

💡 সারসংক্ষেপ
কাজ	ব্যবহার
Route render এর সময় redirect করা	<Navigate to="/path" />
Function এর ভিতর থেকে redirect করা	const navigate = useNavigate()
আগের পেজে ফেরা	navigate(-1)
ইতিহাস replace করা	navigate("/path", { replace: true })

এক কথায়:

🔹 <Navigate> — JSX এর মধ্যে redirect করতে
🔹 useNavigate() — Function বা event এর মধ্যে redirect করতে




