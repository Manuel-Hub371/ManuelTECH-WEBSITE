import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AllProductsPage from './pages/AllProductsPage'
import AllProjectsPage from './pages/AllProjectsPage'
import AllCaseStudiesPage from './pages/AllCaseStudiesPage'
import CaseStudyPage from './pages/CaseStudyPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import ContactPage from './pages/ContactPage'
import ProtectedRoute from './admin/ProtectedRoute'
import AdminLayout from './admin/AdminLayout'
import AdminLoginPage from './admin/pages/LoginPage'
import AdminDashboardPage from './admin/pages/DashboardPage'
import BlogListPage from './admin/pages/BlogListPage'
import BlogEditorPage from './admin/pages/BlogEditorPage'
import FeaturedManagerPage from './admin/pages/FeaturedManagerPage'
import ProductListPage from './admin/pages/ProductListPage'
import ProductEditorPage from './admin/pages/ProductEditorPage'
import CaseStudyListPage from './admin/pages/CaseStudyListPage'
import CaseStudyEditorPage from './admin/pages/CaseStudyEditorPage'
import AboutInfoPage from './admin/pages/AboutInfoPage'
import TeamMembersPage from './admin/pages/TeamMembersPage'
import ServiceListPage from './admin/pages/ServiceListPage'
import ServiceEditorPage from './admin/pages/ServiceEditorPage'
import LegalPage from './pages/LegalPage'
import LegalEditorPage from './admin/pages/LegalEditorPage'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public site ── */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />

          {/* Services */}
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />

          {/* About */}
          <Route path="/about" element={<AboutPage />} />

          {/* Portfolio */}
          <Route path="/portfolio" element={<ProductsPage />} />
          <Route path="/portfolio/products" element={<AllProductsPage />} />
          <Route path="/portfolio/case-studies" element={<AllCaseStudiesPage />} />
          <Route path="/portfolio/projects" element={<AllProjectsPage />} />
          <Route path="/portfolio/case-study/:id" element={<CaseStudyPage />} />
          <Route path="/portfolio/:id" element={<ProductDetailPage />} />

          {/* Blog */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />

          {/* Contact */}
          <Route path="/contact" element={<ContactPage />} />

          {/* Legal Pages */}
          <Route path="/privacy" element={<LegalPage type="privacy" />} />
          <Route path="/terms" element={<LegalPage type="terms" />} />
          <Route path="/cookies" element={<LegalPage type="cookies" />} />
          <Route path="/disclaimer" element={<LegalPage type="disclaimer" />} />
        </Route>

        {/* ── Admin ── */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            {/* About management */}
            <Route path="about/info" element={<AboutInfoPage />} />
            <Route path="about/team" element={<TeamMembersPage />} />
            {/* Service management */}
            <Route path="services" element={<ServiceListPage />} />
            <Route path="services/new" element={<ServiceEditorPage />} />
            <Route path="services/edit/:slug" element={<ServiceEditorPage />} />
            {/* Blog management */}
            <Route path="blog" element={<BlogListPage />} />
            <Route path="blog/new" element={<BlogEditorPage />} />
            <Route path="blog/edit/:id" element={<BlogEditorPage />} />
            <Route path="blog/featured" element={<FeaturedManagerPage />} />
            {/* Product management */}
            <Route path="products" element={<ProductListPage />} />
            <Route path="products/new" element={<ProductEditorPage />} />
            <Route path="products/edit/:id" element={<ProductEditorPage />} />
            {/* Case study management */}
            <Route path="case-studies" element={<CaseStudyListPage />} />
            <Route path="case-studies/new" element={<CaseStudyEditorPage />} />
            <Route path="case-studies/edit/:id" element={<CaseStudyEditorPage />} />
            {/* Legal policies management */}
            <Route path="legal" element={<LegalEditorPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
