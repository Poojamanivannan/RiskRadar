import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Layout
import { Layout } from "@/components/Layout";

// Pages
import Home from "@/pages/Home";
import Scanner from "@/pages/Scanner";
import Dashboard from "@/pages/Dashboard";
import BreachChecker from "@/pages/BreachChecker";
import AttackSimulation from "@/pages/AttackSimulation";
import SecurityTips from "@/pages/SecurityTips";
import About from "@/pages/About";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/scanner" component={Scanner} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/breach-checker" component={BreachChecker} />
        <Route path="/attack-simulation" component={AttackSimulation} />
        <Route path="/security-tips" component={SecurityTips} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
