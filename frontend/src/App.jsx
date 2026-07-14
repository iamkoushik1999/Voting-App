import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";
import AdminLayout from "./components/layout/AdminLayout";
import VoterLayout from "./components/layout/VoterLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";

import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Terms from "./pages/public/Terms";
import Privacy from "./pages/public/Privacy";
import FAQ from "./pages/public/FAQ";
import Login from "./pages/public/Login";
import NotFound from "./pages/public/NotFound";
import ResultsPage from "./pages/ResultsPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCandidates from "./pages/admin/AdminCandidates";
import AdminVoters from "./pages/admin/AdminVoters";
import AdminMessages from "./pages/admin/AdminMessages";

import VoterDashboard from "./pages/voter/VoterDashboard";
import VoterVote from "./pages/voter/VoterVote";
import VoterProfile from "./pages/voter/VoterProfile";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute role="either" />}>
            <Route path="/results" element={<ResultsPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<ProtectedRoute role="admin" />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/candidates" element={<AdminCandidates />} />
            <Route path="/admin/voters" element={<AdminVoters />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute role="voter" />}>
          <Route element={<VoterLayout />}>
            <Route path="/voter" element={<VoterDashboard />} />
            <Route path="/voter/vote" element={<VoterVote />} />
            <Route path="/voter/profile" element={<VoterProfile />} />
          </Route>
        </Route>
      </Routes>
      <ScrollToTopButton />
    </>
  );
}

export default App;
