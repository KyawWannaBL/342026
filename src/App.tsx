import { useRoutes } from "react-router-dom";
import { routes } from "./routes/routes";

export default function App() {
  const content = useRoutes(routes);
  return <div className="antialiased min-h-screen">{content}</div>;
}
