import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { queryClient } from "./lib/queryClient";
import Home from "@/pages/Home";
import SimayHome from "@/pages/SimayHome";
import LanguagePage from "@/pages/LanguagePage";
import ManifestoPage from "@/pages/ManifestoPage";
import JoinPage from "@/pages/JoinPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={SimayHome} />
      <Route path="/matrix" component={Home} />
      <Route path="/manifesto" component={ManifestoPage} />
      <Route path="/join" component={JoinPage} />
      <Route path="/:lang" component={LanguagePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
