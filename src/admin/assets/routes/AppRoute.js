import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../component/Layout';
import Shimmer from '../component/Shimmer';
import Cookies from 'js-cookie';
import AgentView from '../pages/agents/AgentView';
import AgentDetails from '../pages/agents/AgentDetails';
import UserView from '../pages/user/UserView';

// Lazy load the components
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Login = lazy(() => import("../login/Login"));
const Master = lazy(() => import("../pages/Master/Master"));

const AppRoutes = () => {
  const token = Cookies.get("auth_token");

  return (
    <Suspense
      fallback={
        <div>
          <Shimmer />
        </div>
      }
    >
      <Routes>
        {/* Route for Login (Redirect to Dashboard if already logged in) */}
        <Route
          path="login"
          element={
            token ? <Navigate to="/admin/dashboard" replace /> : <Login />
          }
        />

        {/* Protected Route for Dashboard */}
        <Route
          path="dashboard"
          element={
            token ? (
              <Layout>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        {/* Protected Route for Add/Describe */}
        <Route
          path="add/describe"
          element={
            token ? (
              <Layout>
                <Master value={"master"} title={"Describe"} />
              </Layout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        {/* Protected Route for Add/Role */}
        <Route
          path="add/role"
          element={
            token ? (
              <Layout>
                <Master value={"roleMaster"} title={"Role"} />
              </Layout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        {/* Protected Route for Add/Agency Describe */}
        <Route
          path="add/agency_describe"
          element={
            token ? (
              <Layout>
                <Master value={"describeMaster"} title={"Agency Describe"} />
              </Layout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        {/* Protected Route for Add/Service Provide */}
        <Route
          path="add/service_provide"
          element={
            token ? (
              <Layout>
                <Master value={"serviceProvide"} title={"Service Provider"} />
              </Layout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        {/* Protected Route for Add/Sale Method */}
        <Route
          path="add/sale/method"
          element={
            token ? (
              <Layout>
                <Master value={"salemethod"} title={"Sale Method"} />
              </Layout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        {/* Protected Route for Add/Duration */}
        <Route
          path="add/duration"
          element={
            token ? (
              <Layout>
                <Master
                  value={"durationRoute"}
                  title={"Buyer Agency Duration Agreement"}
                />
              </Layout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        {/* Protected Route for Add/Specalize */}
        <Route
          path="add/specalize"
          element={
            token ? (
              <Layout>
                <Master value={"specalize"} title={"Specialize"} />
              </Layout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        {/* Protected Route for Add/Typically */}
        <Route
          path="add/typically"
          element={
            token ? (
              <Layout>
                <Master value={"typically"} title={"Typically Work"} />
              </Layout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        {/* Protected Route for Add/Video Call Tech */}
        <Route
          path="add/videoCalltech"
          element={
            token ? (
              <Layout>
                <Master value={"videoCalltech"} title={"Video Call Tech"} />
              </Layout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        {/* Protected Route for Add/Digital Tech */}
        <Route
          path="add/digitalTech"
          element={
            token ? (
              <Layout>
                <Master value={"digitalTech"} title={"Digital Tech"} />
              </Layout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        {/* Protected Route for Add/Property */}
        <Route
          path="add/property"
          element={
            token ? (
              <Layout>
                <Master value={"property"} title={"Property Type"} />
              </Layout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        {/* Protected Route for Add/Purchase */}
        <Route
          path="add/purchase"
          element={
            token ? (
              <Layout>
                <Master value={"purchase"} title={"Purpose of Purchase"} />
              </Layout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        {/* Protected Route for Add/Communicate */}
        <Route
          path="add/communicate"
          element={
            token ? (
              <Layout>
                <Master
                  value={"communicate"}
                  title={"Preferred Communication"}
                />
              </Layout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />



        <Route
          path="show/agents"
          element={token ? (
            <Layout>
              <AgentView />
            </Layout>
          ) : (
            <Navigate to="/admin/login" replace />
          )}
        />


        <Route
          path="/agent-details/:id"
          element={
            token ? (
              <Layout>
                <AgentDetails />
              </Layout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />


        <Route
          path="/agent-details/:id"
          element={
            token ? (
              <Layout>
                <AgentDetails />
              </Layout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />


        <Route
          path="/user/view"
          element={
            token ? (
              <Layout>
                <UserView />
              </Layout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />


        {/* Catch-all Route for Unknown Paths */}
        <Route
          path="*"
          element={
            token ? (
              <Layout>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />






      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
