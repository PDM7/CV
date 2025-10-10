import { Routes, Route } from "react-router";
import FormPage from "./pages/FormPage";
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<FormPage />} />
    </Routes>
  );
}
