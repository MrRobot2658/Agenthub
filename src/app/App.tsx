import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { AgentHubPage } from './pages/AgentHubPage';
import { AgentDetailPage } from './pages/AgentDetailPage';
import { AgentWorkspacePage } from './pages/AgentWorkspacePage';
import { CreateAgentPage } from './pages/CreateAgentPage';
import { AppCenterPage } from './pages/AppCenterPage';
import { KnowledgeBasePage } from './pages/KnowledgeBasePage';
import { CustomerDataPlatformPage } from './pages/CustomerDataPlatformPage';
import { UserDetailPage } from './pages/UserDetailPage';
import { BillingPage } from './pages/BillingPage';
import { OrganizationPage } from './pages/OrganizationPage';
import { PermissionsPage } from './pages/PermissionsPage';
import { AssetsPage } from './pages/AssetsPage';
import { NotificationsPage } from './pages/NotificationsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/agenthub" element={<AgentHubPage />} />
        <Route path="/create-agent" element={<CreateAgentPage />} />
        <Route path="/app-center" element={<AppCenterPage />} />
        <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
        <Route path="/customer-data" element={<CustomerDataPlatformPage />} />
        <Route path="/customer-data/user/:userId" element={<UserDetailPage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/organization" element={<OrganizationPage />} />
        <Route path="/permissions" element={<PermissionsPage />} />
        <Route path="/assets" element={<AssetsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/agent/:agentId" element={<AgentDetailPage />} />
        <Route path="/agent/:agentId/workspace" element={<AgentWorkspacePage />} />
      </Routes>
    </Router>
  );
}

export default App;