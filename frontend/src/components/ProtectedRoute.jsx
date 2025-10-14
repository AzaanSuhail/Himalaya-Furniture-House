import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute now directly queries the backend to determine auth state.
const ProtectedRoute = ({ children, adminOnly = false }) => {
    const [loading, setLoading] = useState(true);
    const [authed, setAuthed] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        let mounted = true;
        const check = async () => {
            try {
                const res = await fetch('/api/auth/me', { credentials: 'include' });
                if (!mounted) return;
                if (!res.ok) {
                    setAuthed(false);
                } else {
                    const d = await res.json();
                    setAuthed(true);
                    setIsAdmin(d.role === 'admin');
                }
            } catch (_e) {
                void _e;
                setAuthed(false);
            } finally {
                if (mounted) setLoading(false);
            }
        };
        check();
        return () => { mounted = false };
    }, []);

    if (loading) return null; // or a spinner component

    if (!authed) return <Navigate to="/login" replace />;
    if (adminOnly && !isAdmin) return <Navigate to="/" replace />;

    return children;
};

export default ProtectedRoute;
