
import { Routes, Route } from "react-router-dom";
import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";
import Programs from "@/pages/Programs";
import NotFound from "@/pages/NotFound";
import Maps from "@/pages/Maps";
import Analysis from "@/pages/Analysis";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="pt-16 pb-12">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default Index;
