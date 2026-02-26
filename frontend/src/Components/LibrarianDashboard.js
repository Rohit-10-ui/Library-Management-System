import React, { useState } from "react";
import "./Admindashboard.css"; // Reuse admin styles

/* Icons - Reuse from AdminDashboard */
const Icon = ({ d, size = 18, color = "currentColor", fill = "none", strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const Icons = {
  book:     (s=18,c="currentColor") => <Icon size={s} color={c} d={["M4 19.5A2.5 2.5 0 0 1 6.5 17H20","M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"]} />,
  books:    (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  users:    (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  chart:    (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  bell:     (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  clock:    (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  check:    (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
  x:        (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  plus:     (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  eye:      (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  edit:     (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  search:   (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  dollar:   (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  refresh:  (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
  logout:   (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  trending: (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  shield:   (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  trash:    (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  settings: (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
};

const COLORS = ["#FF9B7A","#6B9BD1","#A8C5A8","#C4956A","#9B8EC4","#E07A7A","#7AC4C4"];
const avatarColor = (name) => COLORS[name.charCodeAt(0) % COLORS.length];
const initials = (name) => name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0,2);

const CHART_DATA = [
  { label:"Mon", borrows:12 },
  { label:"Tue", borrows:19 },
  { label:"Wed", borrows:15 },
  { label:"Thu", borrows:22 },
  { label:"Fri", borrows:28 },
  { label:"Sat", borrows:18 },
  { label:"Sun", borrows:10 },
];
const MAX_BORROWS = Math.max(...CHART_DATA.map(d => d.borrows));

const NAV_ITEMS = [
  { id:"overview",    label:"Overview",          iconFn: Icons.chart,  section:"MAIN" },
  { id:"books",       label:"Books",             iconFn: Icons.books,  section:"MAIN" },
  { id:"borrows",     label:"Issue & Returns",   iconFn: Icons.book,   section:"MAIN" },
  { id:"members",     label:"Members",           iconFn: Icons.users,  section:"MAIN" },
  { id:"memberships", label:"Memberships",       iconFn: Icons.shield, section:"MANAGE" },
  { id:"fines",       label:"Fines",             iconFn: Icons.dollar, section:"MANAGE" },
  { id:"settings",    label:"Settings",          iconFn: Icons.settings, section:"SYSTEM" },
];

const Toast = ({ toasts }) => (
  <div className="ad-toast-wrap">
    {toasts.map(t => (
      <div key={t.id} className={`ad-toast ad-toast--${t.type}`}>
        <span className="ad-toast__icon">{t.type==="success"?Icons.check(16,"#4CAF50"):Icons.x(16,"#e05555")}</span>
        <span className="ad-toast__text">{t.msg}</span>
      </div>
    ))}
  </div>
);

/* Overview Section */
const OverviewSection = () => {
  const stats = [
    { label:"Total Books",    value:"1,248", sub:"89 borrowed",      icon:Icons.books,   color:"#FF9B7A" },
    { label:"Active Members", value:"342",   sub:"18 new this week", icon:Icons.users,   color:"#6B9BD1" },
    { label:"Today's Issues", value:"12",    sub:"8 returns",        icon:Icons.book,    color:"#4CAF50" },
    { label:"Overdue",        value:"14",    sub:"Action needed",    icon:Icons.clock,   color:"#FFA000" },
  ];

  return (
    <>
      <div className="ad-stats-grid">
        {stats.map((s,i) => (
          <div key={i} className="ad-stat-card">
            <div className="ad-stat-card__top">
              <div className="ad-stat-card__icon" style={{background:`${s.color}20`}}>{s.icon(22,s.color)}</div>
            </div>
            <div>
              <div className="ad-stat-card__value">{s.value}</div>
              <div className="ad-stat-card__label">{s.label}</div>
              <div className="ad-stat-card__sub">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="ad-row ad-row--3col">
        <div className="ad-card">
          <div className="ad-card__header">
            <div className="ad-card__title-wrap">
              {Icons.trending(18,"#FF9B7A")}
              <div className="ad-card__title">Weekly Activity</div>
            </div>
          </div>
          <div className="ad-card__body">
            <div className="ad-bar-chart">
              {CHART_DATA.map((d,i) => (
                <div key={i} className="ad-bar-chart__bar-wrap">
                  <div className="ad-bar-chart__bar" style={{height:`${(d.borrows/MAX_BORROWS)*100}%`}}/>
                  <span className="ad-bar-chart__label">{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ad-card">
          <div className="ad-card__header">
            <div className="ad-card__title-wrap">
              {Icons.bell(18,"#FF9B7A")}
              <div className="ad-card__title">Recent Activity</div>
            </div>
          </div>
          <div className="ad-card__body">
            {[
              {text:"Book issued to Arjun Sharma",time:"5 min ago",color:"#4CAF50"},
              {text:"Overdue: Sapiens by Kavya",time:"1 hr ago",color:"#e05555"},
              {text:"New member registered",time:"2 hrs ago",color:"#6B9BD1"},
            ].map((a,i) => (
              <div key={i} style={{display:"flex",gap:"0.75rem",padding:"0.75rem 0",borderBottom:i===2?"none":"1px solid rgba(255,155,122,0.07)"}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:a.color,marginTop:5,flexShrink:0}}/>
                <div style={{flex:1}}>
                  <p style={{fontSize:"0.85rem",color:"#5D4E37"}}>{a.text}</p>
                  <p style={{fontSize:"0.72rem",color:"#C4956A",marginTop:3}}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

/* Books Section */
const BooksSection = ({ books, onAdd, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");
  const filtered = books.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="ad-card">
      <div className="ad-card__header">
        <div className="ad-card__title-wrap">
          {Icons.books(18,"#FF9B7A")}
          <div>
            <div className="ad-card__title">Book Management</div>
            <div className="ad-card__subtitle">{books.length} books in catalogue</div>
          </div>
        </div>
        <div className="ad-card__actions">
          <div className="ad-search" style={{borderRadius:10,padding:"0.4rem 0.8rem"}}>
            {Icons.search(14,"#C4956A")}
            <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <button className="ad-pill ad-pill--filled" onClick={onAdd}>{Icons.plus(13,"white")} Add Book</button>
        </div>
      </div>
      <div className="ad-card__body" style={{padding:0}}>
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead>
              <tr><th>Book</th><th>ISBN</th><th>Category</th><th>Total</th><th>Available</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id}>
                  <td>
                    <div className="ad-table__user">
                      <div className="ad-table__avatar" style={{background:avatarColor(b.title),borderRadius:8,width:36,height:36}}>{Icons.book(16,"white")}</div>
                      <div>
                        <div className="ad-table__name">{b.title}</div>
                        <div className="ad-table__email">{b.author}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{fontFamily:"monospace",fontSize:"0.8rem",color:"#8B6F47"}}>{b.isbn}</td>
                  <td><span className="ad-badge ad-badge--returned">{b.category}</span></td>
                  <td style={{fontWeight:600,color:"#5D4E37"}}>{b.total}</td>
                  <td><span style={{fontWeight:700,color:b.available===0?"#e05555":b.available<=2?"#FFA000":"#2e7d32"}}>{b.available}</span></td>
                  <td>
                    <div className="ad-actions-cell">
                      <button className="ad-action-btn ad-action-btn--edit" onClick={()=>onEdit(b)}>{Icons.edit(13,"#cc5522")}</button>
                      <button className="ad-action-btn ad-action-btn--reject" onClick={()=>onDelete(b)}>{Icons.trash(13,"#c62828")}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* Memberships Section */
const MembershipsSection = ({ plans, onAdd, onEdit }) => {
  return (
    <div className="ad-card">
      <div className="ad-card__header">
        <div className="ad-card__title-wrap">
          {Icons.shield(18,"#FF9B7A")}
          <div>
            <div className="ad-card__title">Membership Plans</div>
            <div className="ad-card__subtitle">{plans.length} active plans</div>
          </div>
        </div>
        <button className="ad-pill ad-pill--filled" onClick={onAdd}>{Icons.plus(13,"white")} Add Plan</button>
      </div>
      <div className="ad-card__body">
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.5rem"}}>
          {plans.map(p => (
            <div key={p.id} style={{padding:"1.5rem",background:"rgba(255,248,240,0.5)",borderRadius:16,border:"2px solid rgba(255,155,122,0.15)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:"1rem"}}>
                <h3 style={{fontSize:"1.2rem",fontWeight:700,color:"#3D2817"}}>{p.name}</h3>
                <button className="ad-action-btn ad-action-btn--edit" onClick={()=>onEdit(p)}>{Icons.edit(13,"#cc5522")}</button>
              </div>
              <div style={{fontSize:"2rem",fontWeight:700,color:"#FF9B7A",marginBottom:"1rem"}}>₹{p.fee}<span style={{fontSize:"0.9rem",fontWeight:400,color:"#8B6F47"}}>/plan</span></div>
              <div style={{display:"flex",flexDirection:"column",gap:"0.5rem",fontSize:"0.85rem",color:"#5D4E37"}}>
                <div>• {p.borrowLimit} books at a time</div>
                <div>• {p.durationDays} day loan period</div>
                <div>• ₹{p.lateFeePerDay}/day late fee</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LibrarianDashboard = () => {
  const [activeNav, setActiveNav] = useState("overview");
  const [toasts, setToasts] = useState([]);
  const [books] = useState([
    {id:1,title:"The Midnight Library",author:"Matt Haig",isbn:"978-0525559474",category:"Fiction",total:5,available:3},
    {id:2,title:"Atomic Habits",author:"James Clear",isbn:"978-0735211292",category:"Self-Help",total:8,available:6},
  ]);
  const [plans] = useState([
    {id:1,name:"BASIC",borrowLimit:2,durationDays:14,fee:199,lateFeePerDay:3},
    {id:2,name:"STANDARD",borrowLimit:5,durationDays:30,fee:299,lateFeePerDay:5},
    {id:3,name:"PREMIUM",borrowLimit:10,durationDays:60,fee:499,lateFeePerDay:10},
  ]);

  const toast = (msg, type="success") => {
    const id = Date.now();
    setToasts(t => [...t, {id,msg,type}]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  };

  const navTitles = {
    overview:"Overview",
    books:"Book Management",
    borrows:"Issue & Returns",
    members:"Members",
    memberships:"Membership Plans",
    fines:"Fine Management",
    settings:"Settings",
  };

  const sections = NAV_ITEMS.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <div className="ad-root">
      <aside className="ad-sidebar">
        <div className="ad-sidebar__header">
          <div className="ad-sidebar__logo">
            <div className="ad-sidebar__logo-icon">{Icons.book(18,"#FF9B7A")}</div>
            <span className="ad-sidebar__logo-text">LibraryHub</span>
          </div>
        </div>

        <nav className="ad-nav">
          {Object.entries(sections).map(([sectionName, items]) => (
            <React.Fragment key={sectionName}>
              <div className="ad-nav-label">{sectionName}</div>
              {items.map(item => (
                <button key={item.id} className={`ad-nav__item${activeNav===item.id?" ad-nav__item--active":""}`} onClick={()=>setActiveNav(item.id)}>
                  <span className="ad-nav__icon">{item.iconFn(18,activeNav===item.id?"#FF9B7A":"currentColor")}</span>
                  <span className="ad-nav__text">{item.label}</span>
                </button>
              ))}
            </React.Fragment>
          ))}
        </nav>

        <div className="ad-sidebar__footer">
          <div className="ad-sidebar__admin">
            <div className="ad-sidebar__avatar">LB</div>
            <div className="ad-sidebar__admin-info">
              <div className="ad-sidebar__admin-name">Librarian</div>
              <div className="ad-sidebar__admin-role">Library Staff</div>
            </div>
          </div>
          <button className="ad-nav__item" style={{color:"rgba(255,212,184,0.5)",marginTop:"0.25rem"}} onClick={()=>alert("Logout")}>
            <span className="ad-nav__icon">{Icons.logout(18,"rgba(255,212,184,0.5)")}</span>
            <span className="ad-nav__text">Logout</span>
          </button>
        </div>
      </aside>

      <main className="ad-main">
        <div className="ad-topbar">
          <div className="ad-topbar__left">
            <h1 className="ad-topbar__title">{navTitles[activeNav]}</h1>
            <span className="ad-topbar__breadcrumb">LibraryHub › {navTitles[activeNav]}</span>
          </div>
          <div className="ad-topbar__right">
            <div className="ad-search">
              {Icons.search(14,"#C4956A")}
              <input placeholder="Search..."/>
            </div>
            <button className="ad-icon-btn">{Icons.bell(16)}</button>
          </div>
        </div>

        <div className="ad-content">
          {activeNav==="overview" && <OverviewSection/>}
          {activeNav==="books" && <BooksSection books={books} onAdd={()=>toast("Add book feature")} onEdit={()=>toast("Edit book")} onDelete={()=>toast("Delete book")}/>}
          {activeNav==="memberships" && <MembershipsSection plans={plans} onAdd={()=>toast("Add plan")} onEdit={()=>toast("Edit plan")}/>}
          {activeNav==="borrows" && <div className="ad-card"><div className="ad-card__header"><div className="ad-card__title">Issue & Returns</div></div><div className="ad-card__body"><p style={{color:"#8B6F47"}}>Manage book issues and returns here</p></div></div>}
          {activeNav==="members" && <div className="ad-card"><div className="ad-card__header"><div className="ad-card__title">Members</div></div><div className="ad-card__body"><p style={{color:"#8B6F47"}}>View and manage library members</p></div></div>}
          {activeNav==="fines" && <div className="ad-card"><div className="ad-card__header"><div className="ad-card__title">Fine Management</div></div><div className="ad-card__body"><p style={{color:"#8B6F47"}}>Track and collect fines</p></div></div>}
          {activeNav==="settings" && <div className="ad-card"><div className="ad-card__header"><div className="ad-card__title">Settings</div></div><div className="ad-card__body"><p style={{color:"#8B6F47"}}>Configure library settings</p></div></div>}
        </div>
      </main>

      <Toast toasts={toasts}/>
    </div>
  );
};

export default LibrarianDashboard;
