// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Loader2, AlertCircle, CheckCircle2, ArrowRight, ArrowLeft, Globe, Lock, Mail, UserPlus } from 'lucide-react';

export default function Login() {
  const { lang, setLanguage } = useLanguage();
  const [currentLang, setCurrentLang] = useState(lang || 'en');
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [step, setStep] = useState('login');

  useEffect(() => { if (lang) setCurrentLang(lang); }, [lang]);
  const t = (en: string, my: string) => (currentLang === 'en' ? en : my);
  
  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'my' : 'en';
    setCurrentLang(newLang);
    if (typeof setLanguage === 'function') setLanguage(newLang);
  };

  const clearMessages = () => { setErrorMsg(''); setSuccessMsg(''); };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); clearMessages();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const { data: profile, error: pError } = await supabase.from('profiles').select('requires_password_change').eq('id', data.user.id).single();

      if (profile?.requires_password_change) {
        setStep('force_change');
        setLoading(false);
        return;
      }

      navigate('/');
    } catch (err: any) {
      setErrorMsg(t('Access Denied: Invalid Credentials', 'ဝင်ရောက်ခွင့် ငြင်းပယ်ခံရသည်- အချက်အလက်မှားယွင်းနေသည်'));
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); clearMessages();
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      setSuccessMsg(t('Registration successful! Please verify your email.', 'စာရင်းသွင်းခြင်း အောင်မြင်ပါသည်။ အီးမေးလ်ကို စစ်ဆေးပါ။'));
      setTimeout(() => setStep('login'), 3000);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally { setLoading(false); }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); clearMessages();
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      setSuccessMsg(t('Recovery instructions sent to your email.', 'လင့်ခ်ကို အီးမေးလ်သို့ ပေးပို့ထားပါသည်။'));
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally { setLoading(false); }
  };

  const handleForceChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { setErrorMsg(t('Passwords do not match.', 'စကားဝှက်များ မကိုက်ညီပါ။')); return; }
    setLoading(true); clearMessages();
    try {
      const { data, error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      await supabase.from('profiles').update({ requires_password_change: false }).eq('id', data.user.id);
      setSuccessMsg(t('Password updated. Logging you in...', 'စကားဝှက်ကို ပြောင်းလဲပြီးပါပြီ...'));
      setTimeout(() => navigate('/'), 2000);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#05080F]">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none">
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-6 right-6 z-50">
        <Button onClick={toggleLanguage} variant="outline" className="bg-black/50 border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/20 backdrop-blur-md rounded-full px-4">
          <Globe className="w-4 h-4 mr-2" />
          <span className="font-bold tracking-widest uppercase">{currentLang === 'en' ? 'MY' : 'EN'}</span>
        </Button>
      </div>
      <div className="relative z-10 w-full max-w-md p-4 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-4">
          <div className="mx-auto h-24 w-24 bg-black/60 border border-white/10 rounded-2xl flex items-center justify-center mb-2 overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.2)] backdrop-blur-md">
            <object data="/logo.png" type="image/png" className="w-full h-full object-contain p-2">
              <ShieldCheck className="h-10 w-10 text-emerald-500" />
            </object>
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter drop-shadow-lg">Britium <span className="text-emerald-500">Express</span></h1>
          <p className="text-xs font-mono text-slate-300 tracking-widest uppercase drop-shadow-md">
            {step === 'login' && t('Welcome back • Please authenticate', 'ပြန်လည်ကြိုဆိုပါသည် • ကျေးဇူးပြု၍ အကောင့်ဝင်ပါ')}
            {step === 'signup' && t('Create New Profile', 'အကောင့်အသစ် ဖန်တီးပါ')}
            {step === 'forgot' && t('Secure Password Recovery', 'စကားဝှက် ပြန်လည်ရယူခြင်း')}
            {step === 'force_change' && t('Mandatory Security Update', 'မဖြစ်မနေ လုံခြုံရေး အဆင့်မြှင့်တင်ခြင်း')}
          </p>
        </div>
        <Card className="bg-[#0B101B]/85 backdrop-blur-xl border-white/10 shadow-2xl rounded-[2rem] overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-teal-400" />
          <CardContent className="p-8">
            {errorMsg && <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-3 text-rose-400"><AlertCircle className="h-5 w-5 shrink-0 mt-0.5" /><p className="text-xs font-bold leading-relaxed">{errorMsg}</p></div>}
            {successMsg && <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-3 text-emerald-400"><CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" /><p className="text-xs font-bold leading-relaxed">{successMsg}</p></div>}
            {step === 'login' && (
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-4">
                  <div className="relative"><Mail className="absolute left-4 top-4 h-5 w-5 text-slate-400" /><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-black/50 border-white/10 text-white h-14 rounded-xl pl-12" placeholder={t("Corporate Email", "အီးမေးလ်")} /></div>
                  <div className="relative"><Lock className="absolute left-4 top-4 h-5 w-5 text-slate-400" /><Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="bg-black/50 border-white/10 text-white h-14 rounded-xl pl-12" placeholder={t("Password", "စကားဝှက်")} /></div>
                </div>
                <div className="flex justify-end"><button type="button" onClick={() => { setStep('forgot'); clearMessages(); }} className="text-[10px] text-slate-400 hover:text-emerald-400 font-bold uppercase">{t('Forgot Access Code?', 'စကားဝှက် မေ့နေပါသလား?')}</button></div>
                <Button type="submit" disabled={loading} className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-black tracking-widest uppercase rounded-xl flex items-center justify-center gap-2">{loading ? <Loader2 className="animate-spin" /> : <>{t('Authenticate', 'အကောင့်ဝင်မည်')} <ArrowRight className="w-5 h-5" /></>}</Button>
                <div className="pt-4 border-t border-white/10 text-center"><p className="text-xs text-slate-400">{t('No authorized profile? ', 'အကောင့်မရှိသေးပါသလား? ')}<button type="button" onClick={() => { setStep('signup'); clearMessages(); }} className="text-emerald-500 hover:text-emerald-400 font-bold uppercase ml-1">{t('Request Access', 'စာရင်းသွင်းမည်')}</button></p></div>
              </form>
            )}
            {step === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-5">
                <button type="button" onClick={() => setStep('login')} className="flex items-center gap-2 text-[10px] text-slate-400 hover:text-white font-bold uppercase mb-4"><ArrowLeft className="w-4 h-4" /> {t('Back to Login', 'နောက်သို့ ပြန်သွားမည်')}</button>
                <div className="space-y-4">
                  <div className="relative"><UserPlus className="absolute left-4 top-4 h-5 w-5 text-slate-400" /><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-black/50 border-white/10 text-white h-14 rounded-xl pl-12" placeholder={t("New Email", "အီးမေးလ်အသစ်")} /></div>
                  <div className="relative"><Lock className="absolute left-4 top-4 h-5 w-5 text-slate-400" /><Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="bg-black/50 border-white/10 text-white h-14 rounded-xl pl-12" placeholder={t("New Password", "စကားဝှက်အသစ်")} /></div>
                </div>
                <Button type="submit" disabled={loading} className="w-full h-14 bg-[#D4AF37] hover:bg-[#b5952f] text-black font-black tracking-widest uppercase rounded-xl">{loading ? <Loader2 className="animate-spin" /> : t('Register Profile', 'စာရင်းသွင်းမည်')}</Button>
              </form>
            )}
            {step === 'forgot' && (
              <form onSubmit={handleForgot} className="space-y-5">
                <button type="button" onClick={() => setStep('login')} className="flex items-center gap-2 text-[10px] text-slate-400 hover:text-white font-bold uppercase mb-4"><ArrowLeft className="w-4 h-4" /> {t('Back to Login', 'နောက်သို့ ပြန်သွားမည်')}</button>
                <p className="text-xs text-slate-400 mb-4">{t('Enter your email to receive a secure recovery link.', 'လင့်ခ်ရယူရန် အီးမေးလ် ထည့်ပါ။')}</p>
                <div className="relative"><Mail className="absolute left-4 top-4 h-5 w-5 text-slate-400" /><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-black/50 border-white/10 text-white h-14 rounded-xl pl-12" placeholder={t("Corporate Email", "အီးမေးလ်")} /></div>
                <Button type="submit" disabled={loading} className="w-full h-14 bg-slate-700 hover:bg-slate-600 text-white font-black tracking-widest uppercase rounded-xl">{loading ? <Loader2 className="animate-spin" /> : t('Send Recovery Link', 'လင့်ခ် ပို့မည်')}</Button>
              </form>
            )}
            {step === 'force_change' && (
              <form onSubmit={handleForceChangePassword} className="space-y-5">
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl mb-6"><p className="text-xs text-amber-400 font-bold leading-relaxed">{t('System requires a password update.', 'စကားဝှက်အသစ်ပြောင်းရန် လိုအပ်ပါသည်။')}</p></div>
                <div className="space-y-4">
                  <div className="relative"><Lock className="absolute left-4 top-4 h-5 w-5 text-slate-400" /><Input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="bg-black/50 border-amber-500/30 text-white h-14 rounded-xl pl-12" placeholder={t("New Password", "စကားဝှက်အသစ်")} /></div>
                  <div className="relative"><CheckCircle2 className="absolute left-4 top-4 h-5 w-5 text-slate-400" /><Input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-black/50 border-amber-500/30 text-white h-14 rounded-xl pl-12" placeholder={t("Confirm Password", "စကားဝှက် အတည်ပြုပါ")} /></div>
                </div>
                <Button type="submit" disabled={loading} className="w-full h-14 bg-amber-600 hover:bg-amber-500 text-white font-black tracking-widest uppercase rounded-xl flex items-center justify-center gap-2">{loading ? <Loader2 className="animate-spin" /> : <>{t('Update & Proceed', 'ပြောင်းလဲပြီး ရှေ့ဆက်မည်')} <ArrowRight className="w-5 h-5" /></>}</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
