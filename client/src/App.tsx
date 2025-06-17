import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MobileNav } from "@/components/MobileNav";
import { QuickNavigation } from "@/components/QuickNavigation";
import NotFound from "@/pages/not-found";
import { queryClient } from "./lib/queryClient";

// Page imports
import Home from "@/pages/Home";
import SimayHome from "@/pages/SimayHome";
import SimayHome2 from "@/pages/SimayHome2";
import SimayHome3 from "@/pages/SimayHome3";
import SimayHome4 from "@/pages/SimayHome4";
import SimayHomeProfessional from "@/pages/SimayHomeProfessional";
import SimayHomeModern from "@/pages/SimayHomeModern";
import TurkiyePage from "@/pages/TurkiyePage";
import TurkNedirPage from "@/pages/TurkNedirPage";
import TurkNedirDetayPage from "@/pages/TurkNedirDetayPage";
import GorevDavetPage from "@/pages/GorevDavetPage";
import KurucuEksikleriPage from "@/pages/KurucuEksikleriPage";
import HalkDefteriPage from "@/pages/HalkDefteriPage";
import AnayasaPage from "@/pages/AnayasaPage";
import LanguagePage from "@/pages/LanguagePage";
import ManifestoPage from "@/pages/ManifestoPage";
import JoinPage from "@/pages/JoinPage";
import AmacsavasPage from "@/pages/AmacsavasPage";
import GorevlerPage from "@/pages/GorevlerPage";
import KatilPage from "@/pages/KatilPage";
import RussiaPage from "@/pages/RussiaPage";
import IranPage from "@/pages/IranPage";
import PalestinePage from "@/pages/PalestinePage";
import OppressedNationsPage from "@/pages/OppressedNationsPage";
import HalkManifestolarPage from "@/pages/HalkManifestolarPage";
import { CagriPage } from "@/pages/CagriPage";
import { AnayasalarPage } from "@/pages/AnayasalarPage";
import SertifikaPage from "@/pages/SertifikaPage";
import EntegrasyonPage from "@/pages/EntegrasyonPage";
import EntegrasyonSureciPage from "@/pages/EntegrasyonSureciPage";
import HalkKoordinasyonPage from "@/pages/HalkKoordinasyonPage";
import BirlesikManifestoPage from "@/pages/BirlesikManifestoPage";
import UlkeEklePage from "@/pages/UlkeEklePage";
import DijitalKimlikPage from "@/pages/DijitalKimlikPage";
import PremiumPackagesPage from "@/pages/PremiumPackagesPage";
import CheckoutPageNew from "@/pages/CheckoutPageNew";
import PaymentMethodSelectionPage from "@/pages/PaymentMethodSelectionPage";
import IyzicoCheckoutPage from "@/pages/IyzicoCheckoutPage";
import TaskSelectionPage from "@/pages/TaskSelectionPage";
import ForumRegistrationPage from "@/pages/ForumRegistrationPage";
import CanliGelirGiderPage from "@/pages/CanliGelirGiderPage";
import PremiumLoginPage from "@/pages/PremiumLoginPage";
import PremiumDashboardPage from "@/pages/PremiumDashboardPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LanguagePage} />
      <Route path="/dil-secimi" component={LanguagePage} />
      <Route path="/ulke-ekle" component={UlkeEklePage} />
      <Route path="/home" component={SimayHomeModern} />
      <Route path="/anasayfa" component={SimayHomeModern} />
      <Route path="/professional" component={SimayHomeProfessional} />
      <Route path="/turkiye" component={TurkiyePage} />
      <Route path="/turknedir" component={TurkNedirPage} />
      <Route path="/turkdetay" component={TurkNedirDetayPage} />
      <Route path="/anayasa" component={AnayasaPage} />
      <Route path="/anayasalar" component={AnayasalarPage} />
      <Route path="/amac-savas" component={AmacsavasPage} />
      <Route path="/amaclar" component={AmacsavasPage} />
      <Route path="/cagri" component={CagriPage} />
      <Route path="/gorevler" component={GorevlerPage} />
      <Route path="/gorev-davet" component={GorevDavetPage} />
      <Route path="/kurucu-eksikleri" component={KurucuEksikleriPage} />
      <Route path="/halk-defteri" component={HalkDefteriPage} />
      <Route path="/katil" component={KatilPage} />
      <Route path="/katil/success" component={KatilPage} />
      <Route path="/payment-method-selection" component={PaymentMethodSelectionPage} />
      <Route path="/checkout" component={CheckoutPageNew} />
      <Route path="/iyzico-checkout" component={IyzicoCheckoutPage} />
      <Route path="/task-selection" component={TaskSelectionPage} />
      <Route path="/forum-kayit" component={ForumRegistrationPage} />
      <Route path="/canli-gelir-gider" component={CanliGelirGiderPage} />
      <Route path="/birlesik-manifesto" component={BirlesikManifestoPage} />
      <Route path="/manifesto" component={BirlesikManifestoPage} />
      <Route path="/join" component={JoinPage} />
      <Route path="/russia" component={RussiaPage} />
      <Route path="/iran" component={IranPage} />
      <Route path="/palestine" component={PalestinePage} />
      <Route path="/oppressed" component={OppressedNationsPage} />
      <Route path="/halk-manifestolar" component={HalkManifestolarPage} />
      <Route path="/halkmanifestolari" component={HalkManifestolarPage} />
      <Route path="/sertifika" component={SertifikaPage} />
      <Route path="/entegrasyon" component={EntegrasyonPage} />
      <Route path="/entegrasyon-sureci" component={EntegrasyonSureciPage} />
      <Route path="/halk-koordinasyon" component={HalkKoordinasyonPage} />
      <Route path="/dijital-kimlik" component={DijitalKimlikPage} />
      <Route path="/premium-paketler" component={PremiumPackagesPage} />
      <Route path="/premium-login" component={PremiumLoginPage} />
      <Route path="/premium-dashboard" component={PremiumDashboardPage} />
      <Route path="/matrix" component={Home} />
      <Route path="/simay" component={SimayHome} />
      <Route path="/simay2" component={SimayHome2} />
      <Route path="/simay3" component={SimayHome3} />
      <Route path="/simay4" component={SimayHome4} />
      <Route path="/tr" component={TurkiyePage} />
      <Route path="/:lang" component={LanguagePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MobileNav />
        <QuickNavigation />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;