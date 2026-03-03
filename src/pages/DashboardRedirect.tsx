// @ts-nocheck
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function DashboardRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    async function routeUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return navigate('/login');

      const { data: profile } = await supabase
        .from('profiles')
        .select('role_code')
        .eq('id', session.user.id)
        .single();
      
      if (!profile) return navigate('/login');

      // DYNAMIC ROUTING BASED ON ROLE
      const role = profile.role_code;

      if (role === 'SYS' || role === 'ADM') {
        navigate('/admin/dashboard'); // Executives & Admins
      } else if (role === 'MERCHANT_01') {
        navigate('/merchant/portal'); // Merchants
      } else if (role === 'RIDER_YGN0001') {
        navigate('/rider/app'); // Field Staff
      } else {
        // Default landing for all other operational roles
        navigate('/admin/dashboard'); 
      }
    }
    routeUser();
  }, [navigate]);

  return (
    <div className="h-screen bg-[#0B101B] flex items-center justify-center">
      <div className="text-emerald-500 font-black animate-pulse uppercase tracking-[0.2em]">
        Opening Britium Portal...
      </div>
    </div>
  );
}
