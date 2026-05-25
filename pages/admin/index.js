import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import AdminLayout from '../../components/layout/AdminLayout';

const COLORS = ['#c9921a', '#4caf50', '#2d6a35', '#e8b84b'];

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.replace('/dashboard');
    } else {
      router.replace('/admin');
    }
  }, [session, status]);

  useEffect(() => {
    if (session?.user?.role == 'admin') return;

    Promise.all([
      fetch('/api/admin/users').then(r => r.json()),
      fetch('/api/admin/investments').then(r => r.json()),
    ]).then(([ud, id]) => {
      setUsers(ud.users || []);
      setInvestments(id.investments || []);
      setLoading(false);
    });
  }, [session]);

  const totalInvested = investments.reduce((s, i) => s + i.amount, 0);
  const totalProjected = investments.reduce((s, i) => s + (i.projectedReturn || 0), 0);

  const statusBreakdown = ['pending', 'active', 'harvested', 'cancelled'].map(s => ({
    name: s,
    count: investments.filter(i => i.status === s).length,
  }));

  const cropBreakdown = ['Maize', 'Groundnut', 'Soybean'].map(crop => ({
    name: crop,
    value: investments.filter(i => i.crop === crop).reduce((s, i) => s + i.amount, 0),
  }));

  return (
    <AdminLayout title="Admin Overview">

      {/* STATS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))',
        gap: 16,
        marginBottom: 28
      }}>
        ...
      </div>

      {/* CHARTS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: 20
      }}>
        ...
      </div>

    </AdminLayout>
  );
}