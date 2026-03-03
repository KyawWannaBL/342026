import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/state/i18n'; // Updated to match our state folder
import { Button } from '@/ui/Button'; // Adjusted to our UI path
import { ShieldCheck, Mail, Lock, Download, Globe, AlertTriangle, KeyRound, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase'; // Using the singleton instance

export default function Login() {
  const navigate = useNavigate();
  const { toggleLang, lang } = useLanguage();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const [requirePasswordChange, setRequirePasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');

  const finishLogin = (userEmail: string, role: string) => {
    localStorage.setItem('btx_session', JSON.stringify({ email: userEmail, role: role }));
    navigate('/admin/dashboard');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');
    
    try {
      const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authErr) throw authErr;

      const { data: profile, error: profileErr } = await supabase
        .from('profiles')
        .select('must_change_password, role')
        .eq('id', authData.user.id)
        .single();

      if (profileErr) throw profileErr;

      if (profile.must_change_password) {
        setUserId(authData.user.id);
        setUserRole(profile.role);
        setRequirePasswordChange(true);
        setIsLoading(false);
        return;
      }

      finishLogin(authData.user.email!, profile.role);
    } catch (error: any) {
      setAuthError(lang === 'en' ? 'Invalid clearance credentials.' : 'လျှို့ဝှက်ကုဒ် မှားယွင်းနေပါသည်။');
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setAuthError(lang === 'en' ? 'Passwords do not match.' : 'စကားဝှက်များ မတူညီပါ။');
      return;
    }
    setIsLoading(true);
    try {
      const { error: authUpdateErr } = await supabase.auth.updateUser({ password: newPassword });
      if (authUpdateErr) throw authUpdateErr;

      await supabase.from('profiles').update({ must_change_password: false }).eq('id', userId);
      
      await supabase.from('audit_logs').insert({
        user_id: userId,
        event_type: 'PASSWORD_CHANGE',
        metadata: { status: 'SUCCESS_MANDATORY_ROTATION' }
      });

      finishLogin(email, userRole);
    } catch (err: any) {
      setAuthError(lang === 'en' ? 'Security Policy Violation' : 'စနစ် လုံခြုံရေး အမှားအယွင်း');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="loginWrap">
      <div className="loginCard">
        <div className="brandBadge mx-auto mb-4 flex items-center justify-center">
           {requirePasswordChange ? <KeyRound className="text-amber-500" /> : <ShieldCheck className="text-emerald-500" />}
        </div>
        <h1 className="loginTitle">
          {requirePasswordChange ? 'SECURITY UPDATE' : 'BRITIUM EXPRESS'}
        </h1>
        
        {authError && <div className="muted mb-4 text-xs">{authError}</div>}

        {!requirePasswordChange ? (
          <form onSubmit={handleLogin} className="loginForm">
             <input type="email" placeholder="Email" className="input" onChange={e => setEmail(e.target.value)} required />
             <input type="password" placeholder="Password" className="input" onChange={e => setPassword(e.target.value)} required />
             <button type="submit" disabled={isLoading} className="btn-gold">
               {isLoading ? 'VALIDATING...' : 'AUTHENTICATE'}
             </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordUpdate} className="loginForm">
             <input type="password" placeholder="New Password" className="input" onChange={e => setNewPassword(e.target.value)} required />
             <input type="password" placeholder="Confirm Password" className="input" onChange={e => setConfirmPassword(e.target.value)} required />
             <button type="submit" disabled={isLoading} className="btn-gold">
               {isLoading ? 'UPDATING...' : 'UPDATE & PROCEED'}
             </button>
          </form>
        )}
      </div>
    </div>
  );
}
