import React, { useState, useEffect, useCallback } from 'react';
import './MembershipsPage.css';

// ─── API ─────────────────────────────────────────────────────────────────────
const BASE_URL = '/api';
const api = {
  getMemberships:      ()         => fetch(`${BASE_URL}/memberships`).then(r=>r.json()),
  getMembershipById:   (id)       => fetch(`${BASE_URL}/memberships/${id}`).then(r=>r.json()),
  createMembership:    (data)     => fetch(`${BASE_URL}/memberships`,     {method:'POST', headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(r=>r.json()),
  updateMembership:    (id,data)  => fetch(`${BASE_URL}/memberships/${id}`,{method:'PUT',  headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(r=>r.json()),
  deleteMembership:    (id)       => fetch(`${BASE_URL}/memberships/${id}`,{method:'DELETE'}),
  getMembersByPlan:    (id,pg=0,sz=10,sort='username,asc') => fetch(`${BASE_URL}/memberships/${id}/members?page=${pg}&size=${sz}&sort=${sort}`).then(r=>r.json()),
  getMemberHistory:    (uid)      => fetch(`${BASE_URL}/members/${uid}/history`).then(r=>r.json()),
  getIssues:           ()         => fetch(`${BASE_URL}/issues`).then(r=>r.json()),
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const Ic = {
  Award:    ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="6" stroke={c} strokeWidth="2"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" stroke={c} strokeWidth="2"/></svg>,
  User:     ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={c} strokeWidth="2"/><circle cx="12" cy="7" r="4" stroke={c} strokeWidth="2"/></svg>,
  Users:    ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={c} strokeWidth="2"/><circle cx="9" cy="7" r="4" stroke={c} strokeWidth="2"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke={c} strokeWidth="2"/></svg>,
  Books:    ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke={c} strokeWidth="2"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke={c} strokeWidth="2"/></svg>,
  Clock:    ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={c} strokeWidth="2"/><path d="M12 6v6l4 2" stroke={c} strokeWidth="2"/></svg>,
  Dollar:   ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><line x1="12" y1="1" x2="12" y2="23" stroke={c} strokeWidth="2"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke={c} strokeWidth="2"/></svg>,
  Edit:     ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke={c} strokeWidth="2"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke={c} strokeWidth="2"/></svg>,
  Trash:    ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke={c} strokeWidth="2"/></svg>,
  Plus:     ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke={c} strokeWidth="2"/></svg>,
  Close:    ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke={c} strokeWidth="2"/></svg>,
  Check:    ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke={c} strokeWidth="2"/></svg>,
  Alert:    ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={c} strokeWidth="2"/><line x1="12" y1="8" x2="12" y2="12" stroke={c} strokeWidth="2"/><line x1="12" y1="16" x2="12.01" y2="16" stroke={c} strokeWidth="2"/></svg>,
  History:  ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke={c} strokeWidth="2"/><path d="M3 3v5h5" stroke={c} strokeWidth="2"/></svg>,
  Loader:   ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" className="spin-icon"><path d="M21 12a9 9 0 1 1-6.219-8.56" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
  Calendar: ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke={c} strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke={c} strokeWidth="2"/></svg>,
  Shield:   ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={c} strokeWidth="2"/></svg>,
  Star:     ({s=24,c="currentColor",f=false})=><svg width={s} height={s} viewBox="0 0 24 24" fill={f?c:"none"}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke={c} strokeWidth="2"/></svg>,
  ChevR:    ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke={c} strokeWidth="2"/></svg>,
  Crown:    ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M2 20h20M5 20l-2-10 5 4 4-8 4 8 5-4-2 10" stroke={c} strokeWidth="2" strokeLinejoin="round"/></svg>,
  Refresh:  ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke={c} strokeWidth="2"/><path d="M3 3v5h5" stroke={c} strokeWidth="2"/></svg>,
  BookOpen: ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke={c} strokeWidth="2"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke={c} strokeWidth="2"/></svg>,
};

// ─── Main ─────────────────────────────────────────────────────────────────────
/**
 * MembershipsPage
 * @param {{ role:'admin'|'librarian'|'user', userId:number, userName:string, userEmail:string }} props
 */
const MembershipsPage = ({ role='user', userId=1, userName='User 1', userEmail='john@example.com' }) => {
  const isAdmin = role==='admin';
  const isStaff = role==='admin' || role==='librarian';

  const [tab,         setTab]         = useState('plans');
  const [plans,       setPlans]       = useState([]);
  const [plansLoad,   setPlansLoad]   = useState(false);
  const [history,     setHistory]     = useState([]);
  const [histLoad,    setHistLoad]    = useState(false);
  const [activeIss,   setActiveIss]   = useState([]);
  const [actionLoad,  setActionLoad]  = useState(false);

  // admin: members list per plan
  const [planMembers,    setPlanMembers]    = useState([]);
  const [planMembLoad,   setPlanMembLoad]   = useState(false);
  const [viewPlan,       setViewPlan]       = useState(null);

  // modals
  const [showForm,    setShowForm]    = useState(false);
  const [isEdit,      setIsEdit]      = useState(false);
  const [formPlan,    setFormPlan]    = useState(null);
  const [confirmFn,   setConfirmFn]   = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast,       setToast]       = useState({show:false,msg:'',type:'success'});

  // mock user membership info
  const myMembership = {
    planName: 'Standard Plan',
    membershipType: 'standard',
    joinDate: '2024-01-10',
    expiryDate: '2025-01-10',
    status: 'active',
    borrowLimit: 5,
    durationDays: 30,
    fee: 29,
    lateFeePerDay: 5,
    borrowedBooks: 2,
    overdueBooks: 0,
    totalPenalties: 0,
  };

  const toast$ = (msg,type='success')=>{setToast({show:true,msg,type});setTimeout(()=>setToast({show:false,msg:'',type:'success'}),3500);};
  const fmt    = d=>d?new Date(d).toLocaleDateString('en-IN',{year:'numeric',month:'short',day:'numeric'}):'—';
  const curr   = a=>`₹${Number(a).toFixed(0)}`;

  const fetchPlans = useCallback(async()=>{
    setPlansLoad(true);
    try{const d=await api.getMemberships();setPlans(Array.isArray(d)?d:[]);}
    catch{setPlans([
      {id:1,name:'BASIC',        borrowLimit:2, durationDays:14, fee:49,  lateFeePerDay:3,  active:true},
      {id:2,name:'STANDARD',     borrowLimit:5, durationDays:30, fee:99,  lateFeePerDay:5,  active:true},
      {id:3,name:'PREMIUM',      borrowLimit:10,durationDays:60, fee:139,  lateFeePerDay:10, active:true},
    ]);}
    finally{setPlansLoad(false);}
  },[]);

  const fetchHistory = useCallback(async()=>{
    setHistLoad(true);
    try{const d=await api.getMemberHistory(userId);setHistory(Array.isArray(d)?d:[]);}
    catch{setHistory([
      {id:1,bookTitle:'The Great Gatsby',       issueDate:'2024-01-15',dueDate:'2024-02-15',returnDate:'2024-02-10',status:'returned',daysOverdue:0, lateFee:0},
      {id:2,bookTitle:'Sapiens',                 issueDate:'2023-11-20',dueDate:'2023-12-20',returnDate:'2023-12-25',status:'returned',daysOverdue:5, lateFee:25},
      {id:3,bookTitle:'Clean Code',              issueDate:'2024-01-10',dueDate:'2024-02-10',returnDate:null,        status:'borrowed',daysOverdue:0, lateFee:0},
    ]);}
    finally{setHistLoad(false);}
  },[userId]);

  const fetchActive = useCallback(async()=>{
    try{
      const d=await api.getIssues();
      const mine=(Array.isArray(d)?d:[]).filter(i=>i.userId===userId&&i.status==='borrowed');
      setActiveIss(mine);
    }catch{
      setActiveIss([
        {id:3,bookId:4,bookTitle:'Clean Code',issueDate:'2024-01-10',dueDate:'2024-02-10',returnDate:null,status:'borrowed',daysOverdue:0,lateFee:0},
      ]);
    }
  },[userId]);

  useEffect(()=>{fetchPlans();},[fetchPlans]);
  useEffect(()=>{if(tab==='history')fetchHistory();},[tab,fetchHistory]);
  useEffect(()=>{if(tab==='profile')fetchActive();},[tab,fetchActive]);

  const fetchPlanMembers = async(plan)=>{
    setViewPlan(plan);setPlanMembLoad(true);
    try{const d=await api.getMembersByPlan(plan.id);setPlanMembers(Array.isArray(d)?d:d.content||[]);}
    catch{setPlanMembers([
      {id:1,name:'John Doe',  email:'john@example.com', status:'active',joinDate:'2024-01-01'},
      {id:2,name:'Jane Smith',email:'jane@example.com', status:'active',joinDate:'2024-02-15'},
    ]);}
    finally{setPlanMembLoad(false);}
  };

  // CRUD
  const submitPlan = async e=>{
    e.preventDefault();
    const fd=new FormData(e.target);
    const data={
      name:fd.get('name'),borrowLimit:parseInt(fd.get('borrowLimit')),
      durationDays:parseInt(fd.get('durationDays')),fee:parseFloat(fd.get('fee')),
      lateFeePerDay:parseFloat(fd.get('lateFeePerDay')),active:fd.get('active')==='true',
    };
    setActionLoad(true);
    try{
      if(isEdit){const r=await api.updateMembership(formPlan.id,data);setPlans(p=>p.map(m=>m.id===formPlan.id?{...m,...data,...r}:m));toast$('Plan updated!');}
      else{const r=await api.createMembership(data);setPlans(p=>[...p,{id:r?.id||Date.now(),...data}]);toast$('Plan created!');}
    }catch{
      if(isEdit)setPlans(p=>p.map(m=>m.id===formPlan.id?{...m,...data}:m));
      else setPlans(p=>[...p,{id:Date.now(),...data}]);
      toast$(isEdit?'Updated (offline)':'Created (offline)','info');
    }finally{setActionLoad(false);setShowForm(false);}
  };
  const deletePlan = plan=>{
    setConfirmFn(()=>async()=>{
      setActionLoad(true);
      try{await api.deleteMembership(plan.id);setPlans(p=>p.filter(m=>m.id!==plan.id));toast$('Plan deleted');}
      catch{toast$('Failed to delete','error');}
      finally{setActionLoad(false);setShowConfirm(false);}
    });
    setShowConfirm(true);
  };

  const planColors = {
    BASIC:'#6B9BD1', STANDARD:'#A8C5A8', PREMIUM:'#FF9B7A', STUDENT_BASIC:'#B8D4ED',
  };
  const getPlanColor = name=>{
    const key=Object.keys(planColors).find(k=>name?.toUpperCase().includes(k));
    return key?planColors[key]:'#FFD4B8';
  };

  const daysLeft = expiry=>{
    if(!expiry) return null;
    const d=Math.ceil((new Date(expiry)-new Date())/86400000);
    return d;
  };

  const membershipDaysLeft = daysLeft(myMembership.expiryDate);

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return(
    <div className="mp">
      <div className="mp-bg"><div className="mp-bs mp-b1"/><div className="mp-bs mp-b2"/><div className="mp-bs mp-b3"/></div>

      {/* NAV */}
      <nav className="mp-nav">
        <div className="mp-logo"><Ic.Award s={32} c="#FF9B7A"/><span>LibraryHub</span></div>
        <div className="mp-tabs">
          {[
            {k:'plans',   label:'Membership Plans', icon:<Ic.Crown s={15}/>},
            {k:'profile', label:'My Membership',     icon:<Ic.Shield s={15}/>},
            {k:'history', label:'My History',        icon:<Ic.History s={15}/>},
            ...(isStaff?[{k:'members',label:'All Members',icon:<Ic.Users s={15}/>}]:[]),
          ].map(t=>(
            <button key={t.k} className={`mp-tab ${tab===t.k?'active':''}`} onClick={()=>setTab(t.k)}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>
        <div className="mp-nav-right">
          <div className={`role-badge role-${role}`}>{role}</div>
          <div className="mp-user"><div className="mp-av">{userName.split(' ').map(n=>n[0]).join('').toUpperCase()}</div><span>{userName}</span></div>
        </div>
      </nav>

      <div className="mp-body">

        {/* ── PLANS TAB ───────────────────────────────────── */}
        {tab==='plans'&&(
          <div className="mp-content">
            <div className="mp-topbar">
              <div><h1>Membership Plans</h1><p>{plans.length} plans available</p></div>
              <div style={{display:'flex',gap:'1rem',alignItems:'center'}}>
                {isAdmin&&<button className="btn-add-plan" onClick={()=>{setIsEdit(false);setFormPlan(null);setShowForm(true);}}><Ic.Plus s={17}/>New Plan</button>}
                <button className="btn-ref" onClick={fetchPlans}><Ic.Refresh s={16}/></button>
              </div>
            </div>

            {plansLoad?<div className="mp-load"><Ic.Loader s={36} c="#FF9B7A"/><p>Loading plans…</p></div>
              :plans.length===0?<div className="mp-empty"><Ic.Award s={64} c="#FFD4B8"/><h3>No plans yet</h3>{isAdmin&&<button className="btn-add-plan" onClick={()=>{setIsEdit(false);setFormPlan(null);setShowForm(true);}}><Ic.Plus s={16}/>Create First Plan</button>}</div>
              :(
                <div className="plans-grid">
                  {plans.map((plan,i)=>{
                    const col=getPlanColor(plan.name);
                    const isMyPlan=plan.name===myMembership.planName||plan.name===myMembership.membershipType?.toUpperCase();
                    return(
                      <div key={plan.id} className={`plan-card card-enter ${isMyPlan&&!isStaff?'my-plan':''}`} style={{'--pc':col,animationDelay:`${i*0.07}s`}}>
                        {isMyPlan&&!isStaff&&<div className="cur-badge"><Ic.Star s={12} f/> Current Plan</div>}
                        <div className="plan-top">
                          <div className="plan-icon-wrap" style={{background:`${col}18`,border:`2px solid ${col}30`}}>
                            <Ic.Crown s={26} c={col}/>
                          </div>
                          <div className="plan-title-col">
                            <h3>{plan.name.replace(/_/g,' ')}</h3>
                            <span className={`plan-status ${plan.active?'on':'off'}`}>{plan.active?'Active':'Inactive'}</span>
                          </div>
                        </div>
                        <div className="plan-price">{curr(plan.fee)}<span> /plan</span></div>
                        <div className="plan-features">
                          <div className="pf"><Ic.Books s={15} c={col}/><span><strong>{plan.borrowLimit}</strong> books at a time</span></div>
                          <div className="pf"><Ic.Clock s={15} c={col}/><span><strong>{plan.durationDays}</strong> day loan period</span></div>
                          <div className="pf"><Ic.Dollar s={15} c={col}/><span><strong>{curr(plan.lateFeePerDay)}</strong>/day late fee</span></div>
                        </div>
                        {isAdmin&&(
                          <div className="plan-btns">
                            <button className="pb-edit" onClick={()=>{setIsEdit(true);setFormPlan(plan);setShowForm(true);}}><Ic.Edit s={14}/>Edit</button>
                            <button className="pb-members" onClick={()=>fetchPlanMembers(plan)}><Ic.Users s={14}/>Members</button>
                            <button className="pb-del" onClick={()=>deletePlan(plan)}><Ic.Trash s={14}/></button>
                          </div>
                        )}
                        {!isStaff&&!isMyPlan&&<button className="btn-upgrade" style={{borderColor:col,color:col}}>Upgrade to this plan</button>}
                      </div>
                    );
                  })}
                </div>
              )
            }
          </div>
        )}

        {/* ── MY MEMBERSHIP / PROFILE TAB ─────────────────── */}
        {tab==='profile'&&(
          <div className="mp-content">
            <div className="mp-topbar"><h1>My Membership</h1></div>
            <div className="profile-layout">

              {/* Profile Card */}
              <div className="profile-card card-enter">
                <div className="profile-hero" style={{background:`linear-gradient(135deg, ${getPlanColor(myMembership.membershipType)} 0%, #FFF8F0 100%)`}}>
                  <div className="profile-avatar">{userName.split(' ').map(n=>n[0]).join('').toUpperCase()}</div>
                  <div className="profile-user-info">
                    <h2>{userName}</h2>
                    <p>{userEmail}</p>
                    <div className={`pstatus st-${myMembership.status}`}>{myMembership.status}</div>
                  </div>
                </div>
                <div className="profile-body">
                  <div className="profile-plan-info">
                    <div className="pp-icon"><Ic.Crown s={22} c={getPlanColor(myMembership.membershipType)}/></div>
                    <div>
                      <div className="pp-name">{myMembership.planName}</div>
                      <div className={`pp-type type-${myMembership.membershipType}`}>{myMembership.membershipType}</div>
                    </div>
                    <div className="pp-fee">{curr(myMembership.fee)}</div>
                  </div>
                  <div className="profile-rows">
                    <div className="pr"><Ic.Calendar s={15} c="#FF9B7A"/><span>Joined</span><strong>{fmt(myMembership.joinDate)}</strong></div>
                    <div className="pr"><Ic.Calendar s={15} c="#6B9BD1"/><span>Expires</span><strong>{fmt(myMembership.expiryDate)}</strong></div>
                    <div className="pr"><Ic.Books s={15} c="#A8C5A8"/><span>Borrow Limit</span><strong>{myMembership.borrowLimit} books</strong></div>
                    <div className="pr"><Ic.Clock s={15} c="#FF9B7A"/><span>Loan Period</span><strong>{myMembership.durationDays} days</strong></div>
                    <div className="pr"><Ic.Dollar s={15} c="#E74C3C"/><span>Late Fee</span><strong>{curr(myMembership.lateFeePerDay)}/day</strong></div>
                  </div>
                  {membershipDaysLeft!==null&&(
                    <div className={`expiry-bar ${membershipDaysLeft<30?'soon':''}`}>
                      <div className="eb-info">
                        <span>{membershipDaysLeft>0?`${membershipDaysLeft} days remaining`:'Membership expired'}</span>
                        {membershipDaysLeft<30&&membershipDaysLeft>0&&<span className="eb-warn"><Ic.Alert s={13} c="#F39C12"/>Renew soon</span>}
                      </div>
                      <div className="eb-track"><div className="eb-fill" style={{width:`${Math.max(0,Math.min(100,(membershipDaysLeft/365)*100))}%`}}/></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats Cards */}
              <div className="profile-right">
                <div className="stat-cards">
                  {[
                    {label:'Books Borrowed',val:myMembership.borrowedBooks,icon:<Ic.BookOpen s={22} c="#FF9B7A"/>,col:'#FF9B7A'},
                    {label:'Overdue Books',  val:myMembership.overdueBooks, icon:<Ic.Alert s={22} c="#E74C3C"/>,  col:'#E74C3C'},
                    {label:'Total Penalties',val:curr(myMembership.totalPenalties),icon:<Ic.Dollar s={22} c="#F39C12"/>,col:'#F39C12'},
                    {label:'Books Read',     val:history.filter(h=>h.status==='returned').length,icon:<Ic.Books s={22} c="#A8C5A8"/>,col:'#A8C5A8'},
                  ].map(s=>(
                    <div key={s.label} className="stat-card card-enter" style={{'--sc':s.col}}>
                      <div className="sc-icon" style={{background:`${s.col}18`}}>{s.icon}</div>
                      <div className="sc-val">{s.val}</div>
                      <div className="sc-lbl">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Currently Borrowed */}
                <div className="active-iss-card card-enter">
                  <h3><Ic.BookOpen s={18} c="#FF9B7A"/>Currently Borrowed</h3>
                  {activeIss.length===0
                    ?<div className="no-active"><Ic.Books s={40} c="#FFD4B8"/><p>No books currently borrowed</p></div>
                    :<div className="active-list">
                      {activeIss.map(i=>{
                        const due=new Date(i.dueDate),today=new Date();
                        const dLeft=Math.ceil((due-today)/86400000);
                        return(
                          <div key={i.id} className={`active-item ${dLeft<0?'overdue':dLeft<3?'warn':''}`}>
                            <div className="ai-icon"><Ic.Books s={18} c="#FF9B7A"/></div>
                            <div className="ai-info">
                              <strong>{i.bookTitle}</strong>
                              <span>Due: {fmt(i.dueDate)}</span>
                            </div>
                            <div className={`ai-days ${dLeft<0?'red':dLeft<3?'orange':''}`}>
                              {dLeft<0?`${Math.abs(dLeft)}d overdue`:dLeft===0?'Due today':`${dLeft}d left`}
                            </div>
                          </div>
                        );
                      })}
                    </div>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── HISTORY TAB ─────────────────────────────────── */}
        {tab==='history'&&(
          <div className="mp-content">
            <div className="mp-topbar">
              <div><h1>Borrowing History</h1><p>{history.length} total records</p></div>
              <button className="btn-ref" onClick={fetchHistory}><Ic.Refresh s={16}/></button>
            </div>

            {/* Summary */}
            <div className="hist-summary card-enter">
              {[
                {l:'Total Borrowed', v:history.length,                                      c:'#6B9BD1'},
                {l:'Returned',       v:history.filter(h=>h.status==='returned').length,     c:'#27AE60'},
                {l:'Active',         v:history.filter(h=>h.status==='borrowed').length,     c:'#3498DB'},
                {l:'Overdue Ever',   v:history.filter(h=>h.daysOverdue>0).length,           c:'#E74C3C'},
                {l:'Fines Paid',     v:curr(history.reduce((s,h)=>s+(h.lateFee||0),0)),     c:'#F39C12'},
              ].map(s=>(
                <div key={s.l} className="hs-item"><span style={{color:s.c,fontWeight:700}}>{s.v}</span><span>{s.l}</span></div>
              ))}
            </div>

            {histLoad?<div className="mp-load"><Ic.Loader s={32} c="#FF9B7A"/><p>Loading…</p></div>
              :history.length===0?<div className="mp-empty"><Ic.History s={56} c="#FFD4B8"/><h3>No history yet</h3></div>
              :(
                <div className="hist-list">
                  {history.map((h,i)=>{
                    const returned=h.status==='returned';
                    return(
                      <div key={h.id} className={`hist-item card-enter hs-${h.status}`} style={{animationDelay:`${i*0.05}s`}}>
                        <div className="hi-icon"><Ic.Books s={20} c={returned?'#27AE60':h.status==='overdue'?'#E74C3C':'#3498DB'}/></div>
                        <div className="hi-main">
                          <strong>{h.bookTitle||h.bookId}</strong>
                          <div className="hi-dates">
                            <span><Ic.Calendar s={12}/>Issued: {fmt(h.issueDate||h.borrowDate)}</span>
                            <span><Ic.Calendar s={12}/>Due: {fmt(h.dueDate)}</span>
                            {h.returnDate&&<span><Ic.Check s={12} c="#27AE60"/>Returned: {fmt(h.returnDate)}</span>}
                          </div>
                        </div>
                        <div className="hi-right">
                          <span className={`sbadge sb-${h.status}`}>{h.status}</span>
                          {(h.lateFee||0)>0&&<span className="hi-fee">{curr(h.lateFee)} fine</span>}
                          {h.daysOverdue>0&&<span className="hi-over">{h.daysOverdue}d overdue</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            }
          </div>
        )}

        {/* ── ALL MEMBERS TAB (staff) ─────────────────────── */}
        {tab==='members'&&isStaff&&(
          <div className="mp-content">
            <div className="mp-topbar"><h1>All Members</h1><button className="btn-ref" onClick={()=>{}}><Ic.Refresh s={16}/></button></div>
            <div className="members-by-plan">
              {plansLoad?<div className="mp-load"><Ic.Loader s={32} c="#FF9B7A"/></div>
                :plans.map(plan=>(
                  <div key={plan.id} className="plan-member-section card-enter">
                    <div className="pms-head" onClick={()=>viewPlan?.id===plan.id?setViewPlan(null):fetchPlanMembers(plan)}>
                      <div className="pms-plan-info">
                        <Ic.Crown s={18} c={getPlanColor(plan.name)}/>
                        <strong>{plan.name.replace(/_/g,' ')}</strong>
                        <span className={`plan-status ${plan.active?'on':'off'}`}>{plan.active?'Active':'Inactive'}</span>
                      </div>
                      <Ic.ChevR s={18} c="#8B6F47" style={{transform:viewPlan?.id===plan.id?'rotate(90deg)':'rotate(0)',transition:'0.2s'}}/>
                    </div>
                    {viewPlan?.id===plan.id&&(
                      <div className="pms-members">
                        {planMembLoad?<div className="pml"><Ic.Loader s={24} c="#FF9B7A"/></div>
                          :planMembers.length===0?<div className="pml"><p>No members in this plan</p></div>
                          :planMembers.map(m=>(
                            <div key={m.id} className="pms-mem-row">
                              <div className="pmm-av">{(m.name||m.username||'?').split(' ').map(n=>n[0]).join('').toUpperCase()}</div>
                              <div className="pmm-info">
                                <strong>{m.name||m.username}</strong>
                                <span>{m.email}</span>
                              </div>
                              <span className={`pstatus st-${m.status||'active'}`}>{m.status||'active'}</span>
                              <span className="pmm-date">{fmt(m.joinDate)}</span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* ═══ MODALS ═══ */}

      {/* Plan Form */}
      {showForm&&(
        <div className="mp-overlay" onClick={()=>setShowForm(false)}>
          <div className="mp-modal mp-form" onClick={e=>e.stopPropagation()}>
            <div className="mh"><h2>{isEdit?'Edit Plan':'New Membership Plan'}</h2><button className="mx" onClick={()=>setShowForm(false)}><Ic.Close s={17}/></button></div>
            <form onSubmit={submitPlan} className="plan-form">
              <div className="pf-grid">
                <div className="fg fg-full"><label>Plan Name *</label><input name="name" required defaultValue={formPlan?.name} placeholder="e.g. STUDENT_BASIC"/></div>
                <div className="fg"><label>Borrow Limit</label><input name="borrowLimit" type="number" defaultValue={formPlan?.borrowLimit||3} min="1"/></div>
                <div className="fg"><label>Duration (days)</label><input name="durationDays" type="number" defaultValue={formPlan?.durationDays||14} min="1"/></div>
                <div className="fg"><label>Plan Fee (₹)</label><input name="fee" type="number" step="0.01" defaultValue={formPlan?.fee||299} placeholder="499"/></div>
                <div className="fg"><label>Late Fee/Day (₹)</label><input name="lateFeePerDay" type="number" step="0.01" defaultValue={formPlan?.lateFeePerDay||5}/></div>
                <div className="fg"><label>Status</label><select name="active" defaultValue={formPlan?.active!==false?'true':'false'}><option value="true">Active</option><option value="false">Inactive</option></select></div>
              </div>
              <div className="pf-actions">
                <button type="button" className="btn-cancel" onClick={()=>setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn-submit" disabled={actionLoad}>{actionLoad?<><Ic.Loader s={15}/>Saving…</>:isEdit?'Update Plan':'Create Plan'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm */}
      {showConfirm&&(
        <div className="mp-overlay" onClick={()=>setShowConfirm(false)}>
          <div className="mp-modal mp-confirm" onClick={e=>e.stopPropagation()}>
            <Ic.Alert s={44} c="#E74C3C"/>
            <h2>Delete Plan?</h2><p>This cannot be undone.</p>
            <div className="pf-actions" style={{justifyContent:'center',borderTop:'none',padding:0,marginTop:'1.5rem'}}>
              <button className="btn-cancel" onClick={()=>setShowConfirm(false)}>Cancel</button>
              <button className="btn-danger-s" onClick={confirmFn} disabled={actionLoad}>{actionLoad?<><Ic.Loader s={15}/>…</>:<><Ic.Trash s={15}/>Delete</>}</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.show&&(
        <div className={`mp-toast ${toast.type}`}>
          <span className="t-ic">{toast.type==='success'?<Ic.Check s={15}/>:toast.type==='error'?<Ic.Close s={15}/>:<Ic.Alert s={15}/>}</span>
          {toast.msg}
        </div>
      )}
    </div>
  );
};

export default MembershipsPage;
