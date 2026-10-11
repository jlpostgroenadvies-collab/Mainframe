import { Switch, Route, Router as WouterRouter } from "wouter";
import { MotionConfig } from "framer-motion";

import Home from "@/pages/Home";
import Diensten from "@/pages/Diensten";
import Projecten from "@/pages/Projecten";
import OverMij from "@/pages/OverMij";
import Kennisbank from "@/pages/Kennisbank";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/diensten" component={Diensten} />
      <Route path="/projecten" component={Projecten} />
      <Route path="/over-mij" component={OverMij} />
      <Route path="/kennisbank" component={Kennisbank} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

// ssrPath wordt alleen gebruikt bij het vooraf maken van de pagina's (scripts/prerender.mjs).
function App({ ssrPath }: { ssrPath?: string }) {
  return (
    <MotionConfig reducedMotion="user">
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")} ssrPath={ssrPath}>
        <Router />
      </WouterRouter>
    </MotionConfig>
  );
}

export default App;
