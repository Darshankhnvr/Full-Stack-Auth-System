import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./dashboard.css";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const userId = user?._id || user?.id || "N/A";
    const userInitial = user?.username ? user.username.charAt(0).toUpperCase() : "U";

    const copyUserId = () => {
        if (userId !== "N/A") {
            navigator.clipboard.writeText(userId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="dashboard-container">
            {/* Top Navigation Bar */}
            <header className="dashboard-nav">
                <div className="dashboard-brand">
                    <div className="dashboard-brand-logo">A</div>
                    <span>AuthApp</span>
                </div>
                <div className="dashboard-nav-right">
                    <div className="status-badge">
                        <span className="status-dot"></span>
                        Authenticated
                    </div>
                    <div className="nav-user-pill">
                        <div className="user-avatar-sm">{userInitial}</div>
                        <span>{user?.username || "User"}</span>
                    </div>
                    <button onClick={handleLogout} className="btn-nav-logout">
                        Sign out
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="dashboard-content">
                <div className="dashboard-hero">
                    <h1>Welcome back, {user?.username || "User"} 👋</h1>
                    <p>Manage your account settings and view your current session context.</p>
                </div>

                <div className="dashboard-grid">
                    {/* User Profile Card */}
                    <div className="dash-card">
                        <div className="card-title">
                            <span>Account Details</span>
                            <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>Active</span>
                        </div>

                        <div className="profile-card-header">
                            <div className="avatar-large">{userInitial}</div>
                            <div className="profile-meta">
                                <h3>{user?.username || "Username"}</h3>
                                <p>{user?.email || "email@example.com"}</p>
                            </div>
                        </div>

                        <div className="info-group">
                            <div className="info-item">
                                <span className="info-label">Email Address</span>
                                <span className="info-value">
                                    {user?.email || "N/A"}
                                    <span style={{ fontSize: '11px', color: '#16a34a', background: '#dcfce7', padding: '2px 6px', borderRadius: '4px', fontWeight: 500, marginLeft: '6px' }}>
                                        Verified
                                    </span>
                                </span>
                            </div>

                            <div className="info-item" style={{ marginTop: '6px' }}>
                                <span className="info-label">User Identifier</span>
                                <div className="id-box">
                                    <span>{userId}</span>
                                    <button onClick={copyUserId} className={`btn-copy ${copied ? 'copied' : ''}`}>
                                        {copied ? "Copied!" : "Copy"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security & Session Card */}
                    <div className="dash-card">
                        <div className="card-title">
                            <span>Security & Session</span>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-row">
                                <div className="stat-info">
                                    <div className="stat-icon">🛡️</div>
                                    <span className="stat-title">Route Protection</span>
                                </div>
                                <span className="stat-value" style={{ color: '#16a34a' }}>JWT Shielded</span>
                            </div>

                            <div className="stat-row">
                                <div className="stat-info">
                                    <div className="stat-icon">🔑</div>
                                    <span className="stat-title">Token Storage</span>
                                </div>
                                <span className="stat-value">LocalStorage</span>
                            </div>

                            <div className="stat-row">
                                <div className="stat-info">
                                    <div className="stat-icon">🌐</div>
                                    <span className="stat-title">API Server</span>
                                </div>
                                <span className="stat-value">Connected (200 OK)</span>
                            </div>

                            <div className="stat-row">
                                <div className="stat-info">
                                    <div className="stat-icon">👤</div>
                                    <span className="stat-title">Role</span>
                                </div>
                                <span className="stat-value">Standard User</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* End Session Banner */}
                <div className="dash-card-wide">
                    <div className="wide-text">
                        <h4>End Session</h4>
                        <p>Sign out of your account to clear the access token from this browser.</p>
                    </div>
                    <button onClick={handleLogout} className="btn-logout-danger">
                        Sign Out
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;