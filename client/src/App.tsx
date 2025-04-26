import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { queryClient } from "./lib/queryClient";
import Home from "@/pages/Home";
import SimayHome from "@/pages/SimayHome";
import SimayHome2 from "@/pages/SimayHome2";
import SimayHome3 from "@/pages/SimayHome3";

import LanguagePage from "@/pages/LanguagePage";
import ManifestoPage from "@/pages/ManifestoPage";
import JoinPage from "@/pages/JoinPage";
import AmacsavasPage from "@/pages/AmacsavasPage";
import AnayasaPage from "@/pages/AnayasaPage";
import GorevlerPage from "@/pages/GorevlerPage";
import KatilPage from "@/pages/KatilPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={SimayHome2} />
      <Route path="/matrix" component={Home} />
      <Route path="/manifesto" component={ManifestoPage} />
      <Route path="/join" component={JoinPage} />
      <Route path="/amaclar" component={AmacsavasPage} />
      <Route path="/anayasa" component={AnayasaPage} />
      <Route path="/gorevler" component={GorevlerPage} />
      <Route path="/katil" component={KatilPage} />
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
