import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SafetyProvider } from "@/contexts/SafetyContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ChatOverview from "@/pages/ChatOverview";
import ChatDetail from "@/pages/ChatDetail";
import LocationSafety from "@/pages/LocationSafety";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/chats" component={ChatOverview} />
      <Route path="/chat/:id" component={ChatDetail} />
      <Route path="/location-safety" component={LocationSafety} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SafetyProvider>
          <Toaster />
          <Router />
        </SafetyProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
