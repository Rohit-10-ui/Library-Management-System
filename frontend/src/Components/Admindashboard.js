import React, { useState, useEffect } from "react";
import "./Admindashboard.css";

/* ══════════════════════════════════════════
   SVG ICONS
══════════════════════════════════════════ */
const Icon = ({ d, size = 18, color = "currentColor", fill = "none", strokeWidth = 2, viewBox = "0 0 24 24" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill={fill} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const Icons = {
  book:       (s=18,c="currentColor") => <Icon size={s} color={c} d={["M4 19.5A2.5 2.5 0 0 1 6.5 17H20","M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"]} />,
  books:      (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  users:      (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  user:       (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  chart:      (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6"  y1="20" x2="6"  y2="14"/></svg>,
  bell:       (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  clock:      (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  check:      (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  x:          (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  plus:       (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  eye:        (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  edit:       (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  search:     (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  menu:       (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6"  x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  chevLeft:   (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  chevRight:  (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  dollar:     (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  refresh:    (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
  logout:     (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  trending:   (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  shield:     (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  inbox:      (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>,
  settings:   (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
};

/* ══════════════════════════════════════════
   MOCK DATA
══════════════════════════════════════════ */
const AVATARS_COLORS = ["#FF9B7A","#6B9BD1","#A8C5A8","#C4956A","#9B8EC4","#E07A7A","#7AC4C4"];
const avatarColor = (name) => AVATARS_COLORS[name.charCodeAt(0) % AVATARS_COLORS.length];
const initials    = (name) => name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0,2);

const mockPendingUsers = [
  { id:1, name:"Arjun Sharma",    email:"arjun@example.com",   role:"USER",      date:"2026-02-08", phone:"9876543210", city:"Mumbai" },
  { id:2, name:"Priya Nair",      email:"priya@example.com",   role:"USER",      date:"2026-02-07", phone:"9123456789", city:"Chennai" },
  { id:3, name:"Ravi Patel",      email:"ravi@example.com",    role:"LIBRARIAN", date:"2026-02-07", phone:"9988776655", city:"Ahmedabad" },
  { id:4, name:"Meera Iyer",      email:"meera@example.com",   role:"USER",      date:"2026-02-06", phone:"9765432100", city:"Bangalore" },
  { id:5, name:"Suresh Kumar",    email:"suresh@example.com",  role:"LIBRARIAN", date:"2026-02-05", phone:"9654321098", city:"Hyderabad" },
];

const mockBorrows = [
  { id:1, user:"Kavya Reddy",  book:"The Midnight Library",     isbn:"978-0525559474", issued:"2026-01-20", due:"2026-02-10", status:"overdue"  },
  { id:2, user:"Aman Gupta",   book:"Atomic Habits",            isbn:"978-0735211292", issued:"2026-01-28", due:"2026-02-18", status:"active"   },
  { id:3, user:"Sneha Joshi",  book:"The Alchemist",            isbn:"978-0061122415", issued:"2026-02-01", due:"2026-02-21", status:"active"   },
  { id:4, user:"Vikram Nair",  book:"Sapiens",                  isbn:"978-0062316097", issued:"2026-01-15", due:"2026-02-05", status:"overdue"  },
  { id:5, user:"Lakshmi Rao",  book:"1984",                     isbn:"978-0451524935", issued:"2026-01-25", due:"2026-02-15", status:"returned" },
  { id:6, user:"Rohan Mehta",  book:"Clean Code",               isbn:"978-0132350884", issued:"2026-02-03", due:"2026-02-23", status:"active"   },
];

const mockBooks = [
  { id:1, title:"The Midnight Library",  author:"Matt Haig",         isbn:"978-0525559474", category:"Fiction",    total:5, available:3 },
  { id:2, title:"Atomic Habits",         author:"James Clear",        isbn:"978-0735211292", category:"Self-Help",  total:8, available:6 },
  { id:3, title:"The Alchemist",         author:"Paulo Coelho",       isbn:"978-0061122415", category:"Fiction",    total:6, available:4 },
  { id:4, title:"Sapiens",               author:"Yuval Noah Harari",  isbn:"978-0062316097", category:"History",    total:4, available:2 },
  { id:5, title:"1984",                  author:"George Orwell",      isbn:"978-0451524935", category:"Dystopian",  total:7, available:7 },
  { id:6, title:"Clean Code",            author:"Robert C. Martin",   isbn:"978-0132350884", category:"Technology", total:3, available:1 },
];

const mockFines = [
  { id:1, user:"Kavya Reddy",  book:"The Midnight Library", amount:45,  days:9,  status:"unpaid" },
  { id:2, user:"Vikram Nair",  book:"Sapiens",              amount:25,  days:5,  status:"unpaid" },
  { id:3, user:"Aman Gupta",   book:"Rich Dad Poor Dad",   amount:10,  days:2,  status:"paid"   },
  { id:4, user:"Sneha Joshi",  book:"Deep Work",            amount:30,  days:6,  status:"unpaid" },
];

const mockActivity = [
  { id:1, text:<>Arjun Sharma registered as <strong>Member</strong></>,          time:"2 min ago",  color:"#FF9B7A" },
  { id:2, text:<><strong>Kavya Reddy</strong> has an overdue book since 2 days</>, time:"15 min ago", color:"#e05555" },
  { id:3, text:<>New book <strong>"The Covenant of Water"</strong> added</>,       time:"1 hr ago",   color:"#A8C5A8" },
  { id:4, text:<><strong>Ravi Patel</strong> applied as Librarian</>,              time:"2 hrs ago",  color:"#6B9BD1" },
  { id:5, text:<><strong>Lakshmi Rao</strong> returned "1984" on time</>,          time:"3 hrs ago",  color:"#4CAF50" },
  { id:6, text:<>Fine of ₹10 collected from <strong>Aman Gupta</strong></>,        time:"5 hrs ago",  color:"#C4956A" },
];

const CHART_DATA = [
  { label:"Aug",  borrows:28 },
  { label:"Sep",  borrows:35 },
  { label:"Oct",  borrows:42 },
  { label:"Nov",  borrows:38 },
  { label:"Dec",  borrows:25 },
  { label:"Jan",  borrows:55 },
  { label:"Feb",  borrows:40 },
];
const MAX_BORROWS = Math.max(...CHART_DATA.map(d => d.borrows));

/* ══════════════════════════════════════════
   NAV CONFIG
══════════════════════════════════════════ */
const NAV_ITEMS = [
  { id:"overview",       label:"Overview",          iconFn: Icons.chart,    section:"MAIN"      },
  { id:"registrations",  label:"Registrations",     iconFn: Icons.inbox,    section:"MAIN", badge: 5 },
  { id:"books",          label:"Book Management",   iconFn: Icons.books,    section:"MAIN"      },
  { id:"borrows",        label:"Borrows & Returns", iconFn: Icons.book,     section:"MAIN"      },
  { id:"fines",          label:"Fine Management",   iconFn: Icons.dollar,   section:"MAIN"      },
  { id:"users",          label:"User Management",   iconFn: Icons.users,    section:"MANAGE"    },
  { id:"notifications",  label:"Notifications",     iconFn: Icons.bell,     section:"MANAGE", badge: 3 },
  { id:"settings",       label:"Settings",          iconFn: Icons.settings, section:"SYSTEM"    },
];

/* ══════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════ */

/* Toast */
const Toast = ({ toasts }) => (
  <div className="ad-toast-wrap">
    {toasts.map(t => (
      <div key={t.id} className={`ad-toast ad-toast--${t.type}`}>
        <span className="ad-toast__icon">
          {t.type === "success" ? Icons.check(16,"#4CAF50") : Icons.x(16,"#e05555")}
        </span>
        <span className="ad-toast__text">{t.msg}</span>
      </div>
    ))}
  </div>
);

/* Confirm Modal */
const ConfirmModal = ({ modal, onClose, onConfirm }) => {
  if (!modal) return null;
  const isApprove = modal.action === "approve";
  return (
    <div className="ad-modal-overlay" onClick={onClose}>
      <div className="ad-modal" style={{ textAlign:"center", maxWidth:400 }} onClick={e => e.stopPropagation()}>
        <div className={`ad-confirm-icon ad-confirm-icon--${modal.action}`}>
          {isApprove ? Icons.check(28,"#2e7d32") : Icons.x(28,"#c62828")}
        </div>
        <h3 className="ad-modal__title">{isApprove ? "Approve Registration" : "Reject Registration"}</h3>
        <p className="ad-modal__sub">
          {isApprove
            ? `Approve ${modal.user.name}? Login credentials will be sent to ${modal.user.email}.`
            : `Reject and remove ${modal.user.name}'s registration request?`
          }
        </p>
        <div className="ad-modal__actions">
          <button className="ad-modal__btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className="ad-modal__btn-submit"
            style={!isApprove ? { background:"linear-gradient(135deg,#e05555,#c62828)" } : {}}
            onClick={() => onConfirm(modal.user.id, modal.action)}
          >
            {isApprove ? "Yes, Approve" : "Yes, Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* Add Book Modal */
const AddBookModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({ title:"", author:"", isbn:"", category:"", total:"", description:"" });
  const set = (k,v) => setForm(f => ({ ...f, [k]:v }));
  return (
    <div className="ad-modal-overlay" onClick={onClose}>
      <div className="ad-modal" onClick={e => e.stopPropagation()}>
        <button className="ad-modal__close" onClick={onClose}>{Icons.x(14)}</button>
        <h3 className="ad-modal__title">Add New Book</h3>
        <p className="ad-modal__sub">Fill in book details to add to the catalogue</p>
        <div className="ad-modal__field">
          <label className="ad-modal__label">Book Title</label>
          <input className="ad-modal__input" placeholder="e.g. The Great Gatsby" value={form.title} onChange={e => set("title",e.target.value)} />
        </div>
        <div className="ad-modal__grid">
          <div className="ad-modal__field">
            <label className="ad-modal__label">Author</label>
            <input className="ad-modal__input" placeholder="Author Name" value={form.author} onChange={e => set("author",e.target.value)} />
          </div>
          <div className="ad-modal__field">
            <label className="ad-modal__label">ISBN</label>
            <input className="ad-modal__input" placeholder="978-XXXXXXXXXX" value={form.isbn} onChange={e => set("isbn",e.target.value)} />
          </div>
        </div>
        <div className="ad-modal__grid">
          <div className="ad-modal__field">
            <label className="ad-modal__label">Category</label>
            <select className="ad-modal__input" value={form.category} onChange={e => set("category",e.target.value)}>
              <option value="">Select Category</option>
              {["Fiction","Self-Help","History","Technology","Science","Dystopian","Biography","Other"].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="ad-modal__field">
            <label className="ad-modal__label">Total Copies</label>
            <input className="ad-modal__input" type="number" min="1" placeholder="5" value={form.total} onChange={e => set("total",e.target.value)} />
          </div>
        </div>
        <div className="ad-modal__actions">
          <button className="ad-modal__btn-cancel" onClick={onClose}>Cancel</button>
          <button className="ad-modal__btn-submit" onClick={() => { onSave(form); onClose(); }}>Add Book</button>
        </div>
      </div>
    </div>
  );
};

/* Issue Book Modal */
const IssueBookModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({ username:"", bookIsbn:"", dueDate:"" });
  const set = (k,v) => setForm(f => ({ ...f, [k]:v }));
  return (
    <div className="ad-modal-overlay" onClick={onClose}>
      <div className="ad-modal" onClick={e => e.stopPropagation()}>
        <button className="ad-modal__close" onClick={onClose}>{Icons.x(14)}</button>
        <h3 className="ad-modal__title">Issue a Book</h3>
        <p className="ad-modal__sub">Issue a book to a registered library member</p>
        <div className="ad-modal__field">
          <label className="ad-modal__label">Member Username</label>
          <input className="ad-modal__input" placeholder="Enter username" value={form.username} onChange={e => set("username",e.target.value)} />
        </div>
        <div className="ad-modal__field">
          <label className="ad-modal__label">Book ISBN</label>
          <input className="ad-modal__input" placeholder="978-XXXXXXXXXX" value={form.bookIsbn} onChange={e => set("bookIsbn",e.target.value)} />
        </div>
        <div className="ad-modal__field">
          <label className="ad-modal__label">Due Date</label>
          <input className="ad-modal__input" type="date" value={form.dueDate} onChange={e => set("dueDate",e.target.value)} />
        </div>
        <div className="ad-modal__actions">
          <button className="ad-modal__btn-cancel" onClick={onClose}>Cancel</button>
          <button className="ad-modal__btn-submit" onClick={() => { onSave(form); onClose(); }}>Issue Book</button>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   SECTION VIEWS
══════════════════════════════════════════ */

/* ── Overview ── */
const OverviewSection = ({ onQuickAction }) => {
  const [tab, setTab] = useState("week");

  const stats = [
    { label:"Total Books",       value:"1,248", sub:"12 added this week",   icon: Icons.books,   iconClass:"orange", trend:"+5%",   trendType:"up"      },
    { label:"Active Members",    value:"342",   sub:"18 new this month",     icon: Icons.users,   iconClass:"blue",   trend:"+12%",  trendType:"up"      },
    { label:"Books Borrowed",    value:"89",    sub:"Currently checked out", icon: Icons.book,    iconClass:"green",  trend:"-3%",   trendType:"down"    },
    { label:"Overdue Books",     value:"14",    sub:"Action required",       icon: Icons.clock,   iconClass:"amber",  trend:"↑ 2",   trendType:"neutral" },
    { label:"Fines Collected",   value:"₹2,340",sub:"This month",           icon: Icons.dollar,  iconClass:"teal",   trend:"+8%",   trendType:"up"      },
    { label:"Pending Approvals", value:"5",     sub:"Awaiting review",       icon: Icons.inbox,   iconClass:"red",    trend:"New",   trendType:"neutral" },
  ];

  return (
    <>
      {/* Stats */}
      <div className="ad-stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="ad-stat-card">
            <div className="ad-stat-card__top">
              <div className={`ad-stat-card__icon ad-stat-card__icon--${s.iconClass}`}>
                {s.icon(22, s.iconClass==="orange"?"#FF9B7A":s.iconClass==="blue"?"#6B9BD1":s.iconClass==="green"?"#4CAF50":s.iconClass==="amber"?"#FFA000":s.iconClass==="teal"?"#00897B":"#e05555")}
              </div>
              <span className={`ad-stat-card__trend ad-stat-card__trend--${s.trendType}`}>{s.trend}</span>
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
        {/* Borrow chart */}
        <div className="ad-card">
          <div className="ad-card__header">
            <div className="ad-card__title-wrap">
              {Icons.trending(18,"#FF9B7A")}
              <div>
                <div className="ad-card__title">Borrow Trends</div>
                <div className="ad-card__subtitle">Monthly borrowing activity</div>
              </div>
            </div>
            <div className="ad-tabs">
              {["week","month","year"].map(t => (
                <button key={t} className={`ad-tab${tab===t?" ad-tab--active":""}`} onClick={() => setTab(t)}>
                  {t.charAt(0).toUpperCase()+t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="ad-card__body">
            <div className="ad-bar-chart">
              {CHART_DATA.map((d, i) => (
                <div key={i} className="ad-bar-chart__bar-wrap">
                  <div
                    className={`ad-bar-chart__bar${i < CHART_DATA.length-1 ? " ad-bar-chart__bar--muted":""}`}
                    style={{ height: `${(d.borrows/MAX_BORROWS)*100}%` }}
                  />
                  <span className="ad-bar-chart__label">{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity feed */}
        <div className="ad-card">
          <div className="ad-card__header">
            <div className="ad-card__title-wrap">
              {Icons.bell(18,"#FF9B7A")}
              <div className="ad-card__title">Recent Activity</div>
            </div>
            <button className="ad-pill ad-pill--outline">{Icons.refresh(12,"#FF9B7A")} Refresh</button>
          </div>
          <div className="ad-card__body" style={{ padding:"0.5rem 1.5rem 1.25rem" }}>
            <div className="ad-feed">
              {mockActivity.map(a => (
                <div key={a.id} className="ad-feed__item">
                  <div className="ad-feed__dot-wrap">
                    <div className="ad-feed__dot" style={{ background: a.color }} />
                    <div className="ad-feed__line" />
                  </div>
                  <div className="ad-feed__content">
                    <p className="ad-feed__text">{a.text}</p>
                    <p className="ad-feed__time">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="ad-card">
        <div className="ad-card__header">
          <div className="ad-card__title-wrap">
            {Icons.shield(18,"#FF9B7A")}
            <div className="ad-card__title">Quick Actions</div>
          </div>
        </div>
        <div className="ad-card__body">
          <div className="ad-quick-actions" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))" }}>
            {[
              { label:"Add Book",         icon: Icons.plus,    color:"#FF9B7A", bg:"rgba(255,155,122,0.1)",  action:"addBook"   },
              { label:"Issue Book",       icon: Icons.book,    color:"#6B9BD1", bg:"rgba(107,155,209,0.12)", action:"issueBook" },
              { label:"Pending Reviews",  icon: Icons.inbox,   color:"#FFA000", bg:"rgba(255,160,0,0.1)",    action:"registrations" },
              { label:"Manage Fines",     icon: Icons.dollar,  color:"#4CAF50", bg:"rgba(76,175,80,0.1)",    action:"fines"     },
              { label:"View Reports",     icon: Icons.chart,   color:"#9B8EC4", bg:"rgba(155,142,196,0.12)", action:"reports"   },
              { label:"Send Notification",icon: Icons.bell,    color:"#E07A7A", bg:"rgba(224,122,122,0.1)",  action:"notify"    },
            ].map((qa, i) => (
              <button key={i} className="ad-quick-btn" onClick={() => onQuickAction(qa.action)}>
                <div className="ad-quick-btn__icon" style={{ background: qa.bg }}>
                  {qa.icon(20, qa.color)}
                </div>
                <span className="ad-quick-btn__label">{qa.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

/* ── Registrations ── */
const RegistrationsSection = ({ pending, onAction }) => {
  const [search, setSearch] = useState("");
  const filtered = pending.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ad-card">
      <div className="ad-card__header">
        <div className="ad-card__title-wrap">
          {Icons.inbox(18,"#FF9B7A")}
          <div>
            <div className="ad-card__title">Pending Registrations</div>
            <div className="ad-card__subtitle">{pending.length} awaiting admin approval</div>
          </div>
        </div>
        <div className="ad-search" style={{ borderRadius:10, padding:"0.4rem 0.8rem" }}>
          {Icons.search(14,"#C4956A")}
          <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="ad-card__body" style={{ padding:0 }}>
        {filtered.length === 0 ? (
          <div className="ad-empty">
            <div className="ad-empty__icon">{Icons.users(40,"#C4956A")}</div>
            <p className="ad-empty__text">No pending registrations</p>
          </div>
        ) : (
          <div className="ad-table-wrap">
            <table className="ad-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>City</th>
                  <th>Phone</th>
                  <th>Applied On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div className="ad-table__user">
                        <div className="ad-table__avatar" style={{ background: avatarColor(u.name) }}>
                          {initials(u.name)}
                        </div>
                        <div>
                          <div className="ad-table__name">{u.name}</div>
                          <div className="ad-table__email">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`ad-badge ${u.role==="LIBRARIAN" ? "ad-badge--returned" : "ad-badge--active"} ad-badge--dot`}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ color:"#8B6F47" }}>{u.city}</td>
                    <td style={{ color:"#8B6F47", fontFamily:"monospace", fontSize:"0.82rem" }}>{u.phone}</td>
                    <td style={{ color:"#8B6F47", fontSize:"0.82rem" }}>{u.date}</td>
                    <td>
                      <div className="ad-actions-cell">
                        <button className="ad-action-btn ad-action-btn--view" title="View Details" onClick={() => onAction("view", u)}>
                          {Icons.eye(13,"#1565c0")}
                        </button>
                        <button className="ad-action-btn ad-action-btn--approve" title="Approve" onClick={() => onAction("approve", u)}>
                          {Icons.check(13,"#2e7d32")}
                        </button>
                        <button className="ad-action-btn ad-action-btn--reject" title="Reject" onClick={() => onAction("reject", u)}>
                          {Icons.x(13,"#c62828")}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Books ── */
const BooksSection = ({ books, onAddBook }) => {
  const [search, setSearch] = useState("");
  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase()) ||
    b.isbn.includes(search)
  );

  return (
    <div className="ad-card">
      <div className="ad-card__header">
        <div className="ad-card__title-wrap">
          {Icons.books(18,"#FF9B7A")}
          <div>
            <div className="ad-card__title">Book Catalogue</div>
            <div className="ad-card__subtitle">{books.length} books in library</div>
          </div>
        </div>
        <div className="ad-card__actions">
          <div className="ad-search" style={{ borderRadius:10, padding:"0.4rem 0.8rem" }}>
            {Icons.search(14,"#C4956A")}
            <input placeholder="Search books..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="ad-pill ad-pill--filled" onClick={onAddBook}>
            {Icons.plus(13,"white")} Add Book
          </button>
        </div>
      </div>
      <div className="ad-card__body" style={{ padding:0 }}>
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead>
              <tr>
                <th>Book</th>
                <th>ISBN</th>
                <th>Category</th>
                <th>Total</th>
                <th>Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id}>
                  <td>
                    <div className="ad-table__user">
                      <div className="ad-table__avatar" style={{ background: avatarColor(b.title), borderRadius:8, width:36, height:36 }}>
                        {Icons.book(16,"white")}
                      </div>
                      <div>
                        <div className="ad-table__name">{b.title}</div>
                        <div className="ad-table__email">{b.author}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontFamily:"monospace", fontSize:"0.8rem", color:"#8B6F47" }}>{b.isbn}</td>
                  <td>
                    <span className="ad-badge ad-badge--returned">{b.category}</span>
                  </td>
                  <td style={{ fontWeight:600, color:"#5D4E37" }}>{b.total}</td>
                  <td>
                    <span style={{
                      fontWeight: 700,
                      color: b.available === 0 ? "#e05555" : b.available <= 2 ? "#FFA000" : "#2e7d32"
                    }}>
                      {b.available}
                    </span>
                  </td>
                  <td>
                    <div className="ad-actions-cell">
                      <button className="ad-action-btn ad-action-btn--view" title="View">{Icons.eye(13,"#1565c0")}</button>
                      <button className="ad-action-btn ad-action-btn--edit" title="Edit">{Icons.edit(13,"#cc5522")}</button>
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

/* ── Borrows ── */
const BorrowsSection = ({ borrows, onIssue }) => {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? borrows : borrows.filter(b => b.status === filter);

  const statusMap = {
    active:   { label:"Active",   cls:"ad-badge--active"   },
    overdue:  { label:"Overdue",  cls:"ad-badge--overdue"  },
    returned: { label:"Returned", cls:"ad-badge--returned" },
  };

  return (
    <div className="ad-card">
      <div className="ad-card__header">
        <div className="ad-card__title-wrap">
          {Icons.book(18,"#FF9B7A")}
          <div>
            <div className="ad-card__title">Borrows & Returns</div>
            <div className="ad-card__subtitle">{borrows.filter(b=>b.status==="overdue").length} overdue books require action</div>
          </div>
        </div>
        <div className="ad-card__actions">
          <div className="ad-tabs">
            {["all","active","overdue","returned"].map(f => (
              <button key={f} className={`ad-tab${filter===f?" ad-tab--active":""}`} onClick={() => setFilter(f)}>
                {f.charAt(0).toUpperCase()+f.slice(1)}
              </button>
            ))}
          </div>
          <button className="ad-pill ad-pill--filled" onClick={onIssue}>
            {Icons.plus(13,"white")} Issue Book
          </button>
        </div>
      </div>
      <div className="ad-card__body" style={{ padding:0 }}>
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Book</th>
                <th>ISBN</th>
                <th>Issued</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id}>
                  <td>
                    <div className="ad-table__user">
                      <div className="ad-table__avatar" style={{ background: avatarColor(b.user) }}>
                        {initials(b.user)}
                      </div>
                      <span className="ad-table__name">{b.user}</span>
                    </div>
                  </td>
                  <td style={{ fontWeight:600, color:"#3D2817", maxWidth:160 }}>
                    <span style={{ display:"block", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.book}</span>
                  </td>
                  <td style={{ fontFamily:"monospace", fontSize:"0.78rem", color:"#8B6F47" }}>{b.isbn}</td>
                  <td style={{ fontSize:"0.82rem", color:"#8B6F47" }}>{b.issued}</td>
                  <td style={{ fontSize:"0.82rem", fontWeight:600, color: b.status==="overdue"?"#e05555":"#5D4E37" }}>{b.due}</td>
                  <td>
                    <span className={`ad-badge ${statusMap[b.status].cls} ad-badge--dot`}>
                      {statusMap[b.status].label}
                    </span>
                  </td>
                  <td>
                    <div className="ad-actions-cell">
                      <button className="ad-action-btn ad-action-btn--view" title="View">{Icons.eye(13,"#1565c0")}</button>
                      {b.status !== "returned" && (
                        <button className="ad-action-btn ad-action-btn--approve" title="Mark Returned">{Icons.check(13,"#2e7d32")}</button>
                      )}
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

/* ── Fines ── */
const FinesSection = ({ fines }) => (
  <div className="ad-card">
    <div className="ad-card__header">
      <div className="ad-card__title-wrap">
        {Icons.dollar(18,"#FF9B7A")}
        <div>
          <div className="ad-card__title">Fine Management</div>
          <div className="ad-card__subtitle">
            Total outstanding: ₹{fines.filter(f=>f.status==="unpaid").reduce((a,f)=>a+f.amount,0)}
          </div>
        </div>
      </div>
      <div style={{ display:"flex", gap:"0.5rem" }}>
        <span className="ad-badge ad-badge--overdue ad-badge--dot">
          {fines.filter(f=>f.status==="unpaid").length} Unpaid
        </span>
        <span className="ad-badge ad-badge--paid ad-badge--dot">
          {fines.filter(f=>f.status==="paid").length} Paid
        </span>
      </div>
    </div>
    <div className="ad-card__body">
      {fines.map(f => (
        <div key={f.id} className="ad-fine-row">
          <div className="ad-fine-row__info">
            <div className="ad-fine-row__name">{f.user}</div>
            <div className="ad-fine-row__book">{f.book} · {f.days} day{f.days!==1?"s":""} overdue</div>
          </div>
          <div className="ad-fine-row__right">
            <span className={`ad-badge ${f.status==="paid"?"ad-badge--paid":"ad-badge--overdue"} ad-badge--dot`}>
              {f.status.charAt(0).toUpperCase()+f.status.slice(1)}
            </span>
            <span className={`ad-fine-row__amount${f.status==="paid"?" ad-fine-row__amount--paid":""}`}>
              ₹{f.amount}
            </span>
            {f.status === "unpaid" && (
              <button className="ad-action-btn ad-action-btn--approve" title="Mark as Paid" style={{ width:72, borderRadius:50, fontSize:"0.72rem", color:"#2e7d32", fontWeight:700 }}>
                {Icons.check(13,"#2e7d32")} Collect
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ── Users ── */
const UsersSection = () => {
  const users = [
    { id:1, name:"Kavya Reddy",  email:"kavya@example.com",  role:"USER",      status:"active",  joined:"2025-08-12", books:3 },
    { id:2, name:"Aman Gupta",   email:"aman@example.com",   role:"USER",      status:"active",  joined:"2025-09-03", books:1 },
    { id:3, name:"Ravi Patel",   email:"ravi@example.com",   role:"LIBRARIAN", status:"active",  joined:"2025-10-15", books:0 },
    { id:4, name:"Sneha Joshi",  email:"sneha@example.com",  role:"USER",      status:"active",  joined:"2025-11-20", books:2 },
    { id:5, name:"Vikram Nair",  email:"vikram@example.com", role:"USER",      status:"suspended", joined:"2025-07-05", books:1 },
  ];
  return (
    <div className="ad-card">
      <div className="ad-card__header">
        <div className="ad-card__title-wrap">
          {Icons.users(18,"#FF9B7A")}
          <div>
            <div className="ad-card__title">User Management</div>
            <div className="ad-card__subtitle">{users.length} registered members</div>
          </div>
        </div>
        <button className="ad-pill ad-pill--outline">{Icons.refresh(12,"#FF9B7A")} Refresh</button>
      </div>
      <div className="ad-card__body" style={{ padding:0 }}>
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Role</th>
                <th>Books Held</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>
                    <div className="ad-table__user">
                      <div className="ad-table__avatar" style={{ background: avatarColor(u.name) }}>
                        {initials(u.name)}
                      </div>
                      <div>
                        <div className="ad-table__name">{u.name}</div>
                        <div className="ad-table__email">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`ad-badge ${u.role==="LIBRARIAN"?"ad-badge--returned":"ad-badge--active"} ad-badge--dot`}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ fontWeight:600, color: u.books > 0 ? "#FF9B7A" : "#C4956A" }}>{u.books}</td>
                  <td style={{ fontSize:"0.82rem", color:"#8B6F47" }}>{u.joined}</td>
                  <td>
                    <span className={`ad-badge ad-badge--dot ${u.status==="active"?"ad-badge--active":"ad-badge--overdue"}`}>
                      {u.status.charAt(0).toUpperCase()+u.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="ad-actions-cell">
                      <button className="ad-action-btn ad-action-btn--view" title="View">{Icons.eye(13,"#1565c0")}</button>
                      <button className="ad-action-btn ad-action-btn--edit" title="Edit">{Icons.edit(13,"#cc5522")}</button>
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

/* ── Notifications Placeholder ── */
const NotificationsSection = () => (
  <div className="ad-card">
    <div className="ad-card__header">
      <div className="ad-card__title-wrap">
        {Icons.bell(18,"#FF9B7A")}
        <div className="ad-card__title">Notifications</div>
      </div>
    </div>
    <div className="ad-card__body">
      {[
        { title:"5 Pending Registrations",         msg:"New members awaiting approval.", time:"2 min ago",  color:"#FFA000" },
        { title:"Overdue Books Alert",              msg:"14 books are overdue. Send reminders?", time:"15 min ago", color:"#e05555" },
        { title:"Fine Payment Received",            msg:"Aman Gupta paid ₹10 fine.",     time:"1 hr ago",   color:"#4CAF50" },
        { title:"New Book Request",                 msg:'"Ikigai" requested by 5 members.', time:"3 hrs ago",  color:"#6B9BD1" },
      ].map((n,i) => (
        <div key={i} className="ad-fine-row">
          <div style={{ display:"flex", gap:"0.9rem", alignItems:"flex-start" }}>
            <div style={{ width:10, height:10, borderRadius:"50%", background:n.color, marginTop:5, flexShrink:0 }} />
            <div>
              <div style={{ fontWeight:600, color:"#3D2817", fontSize:"0.9rem" }}>{n.title}</div>
              <div style={{ color:"#8B6F47", fontSize:"0.8rem", marginTop:2 }}>{n.msg}</div>
            </div>
          </div>
          <span style={{ fontSize:"0.72rem", color:"#C4956A", whiteSpace:"nowrap" }}>{n.time}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ── Settings Placeholder ── */
const SettingsSection = () => (
  <div className="ad-card">
    <div className="ad-card__header">
      <div className="ad-card__title-wrap">
        {Icons.settings(18,"#FF9B7A")}
        <div className="ad-card__title">Settings</div>
      </div>
    </div>
    <div className="ad-card__body">
      {[
        { label:"Library Name",        value:"LibraryHub Central",   type:"text"   },
        { label:"Max Borrow Days",     value:"21",                    type:"number" },
        { label:"Fine Per Day (₹)",    value:"5",                     type:"number" },
        { label:"Max Books Per Member",value:"5",                     type:"number" },
        { label:"Admin Email",         value:"admin@libraryhub.com",  type:"email"  },
      ].map((s,i) => (
        <div key={i} className="ad-modal__field">
          <label className="ad-modal__label">{s.label}</label>
          <input className="ad-modal__input" type={s.type} defaultValue={s.value} />
        </div>
      ))}
      <div style={{ marginTop:"1.25rem" }}>
        <button className="ad-modal__btn-submit" style={{ width:"100%" }}>Save Settings</button>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════
   MAIN ADMIN DASHBOARD
══════════════════════════════════════════ */
const AdminDashboard = () => {
  const [activeNav,    setActiveNav]    = useState("overview");
  const [collapsed,    setCollapsed]    = useState(false);
  const [searchQuery,  setSearchQuery]  = useState("");
  const [confirmModal, setConfirmModal] = useState(null);   // { action, user }
  const [showAddBook,  setShowAddBook]  = useState(false);
  const [showIssue,    setShowIssue]    = useState(false);
  const [toasts,       setToasts]       = useState([]);
  const [pending,      setPending]      = useState(mockPendingUsers);
  const [books,        setBooks]        = useState(mockBooks);

  /* toast helper */
  const toast = (msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  };

  /* nav label map */
  const navTitles = {
    overview:       "Overview",
    registrations:  "Pending Registrations",
    books:          "Book Management",
    borrows:        "Borrows & Returns",
    fines:          "Fine Management",
    users:          "User Management",
    notifications:  "Notifications",
    settings:       "Settings",
  };

  /* registration actions */
  const handleRegAction = (action, user) => {
    if (action === "approve" || action === "reject") {
      setConfirmModal({ action, user });
    }
  };

  const handleConfirm = (userId, action) => {
    setPending(p => p.filter(u => u.id !== userId));
    setConfirmModal(null);
    toast(
      action === "approve"
        ? "Registration approved! Credentials sent via email."
        : "Registration rejected and removed.",
      action === "approve" ? "success" : "error"
    );
  };

  /* quick action nav */
  const handleQuickAction = (action) => {
    if (action === "addBook")      { setShowAddBook(true); return; }
    if (action === "issueBook")    { setShowIssue(true);   return; }
    if (action === "registrations" || action === "fines" || action === "users") {
      setActiveNav(action); return;
    }
    toast("Feature coming soon!", "success");
  };

  const handleAddBook = (form) => {
    const newBook = { id: books.length+1, ...form, total: parseInt(form.total)||1, available: parseInt(form.total)||1 };
    setBooks(b => [...b, newBook]);
    toast(`"${form.title}" added to catalogue.`);
  };

  const handleIssue = (form) => {
    toast(`Book issued to ${form.username}.`);
  };

  const sections = NAV_ITEMS.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <div className="ad-root">

      {/* ══════════════ SIDEBAR ══════════════ */}
      <aside className={`ad-sidebar${collapsed ? " ad-sidebar--collapsed" : ""}`}>

        <div className="ad-sidebar__header">
          <div className="ad-sidebar__logo">
            <div className="ad-sidebar__logo-icon">
              {Icons.book(18,"#FF9B7A")}
            </div>
            <span className="ad-sidebar__logo-text">LibraryHub</span>
          </div>
          <button className="ad-sidebar__collapse-btn" onClick={() => setCollapsed(c => !c)}>
            {collapsed ? Icons.chevRight(14) : Icons.chevLeft(14)}
          </button>
        </div>

        <nav className="ad-nav">
          {Object.entries(sections).map(([sectionName, items]) => (
            <React.Fragment key={sectionName}>
              <div className="ad-nav-label">{sectionName}</div>
              {items.map(item => (
                <button
                  key={item.id}
                  className={`ad-nav__item${activeNav === item.id ? " ad-nav__item--active" : ""}`}
                  onClick={() => setActiveNav(item.id)}
                  title={collapsed ? item.label : ""}
                >
                  <span className="ad-nav__icon">{item.iconFn(18, activeNav===item.id ? "#FF9B7A" : "currentColor")}</span>
                  <span className="ad-nav__text">{item.label}</span>
                  {item.badge && <span className="ad-nav__badge">{item.badge}</span>}
                </button>
              ))}
            </React.Fragment>
          ))}
        </nav>

        <div className="ad-sidebar__footer">
          <div className="ad-sidebar__admin">
            <div className="ad-sidebar__avatar">AD</div>
            <div className="ad-sidebar__admin-info">
              <div className="ad-sidebar__admin-name">Admin</div>
              <div className="ad-sidebar__admin-role">Super Administrator</div>
            </div>
          </div>
          <button
            className="ad-nav__item"
            style={{ color:"rgba(255,212,184,0.5)", marginTop:"0.25rem" }}
            onClick={() => alert("Logout (connect to your API)")}
          >
            <span className="ad-nav__icon">{Icons.logout(18,"rgba(255,212,184,0.5)")}</span>
            <span className="ad-nav__text">Logout</span>
          </button>
        </div>

      </aside>

      {/* ══════════════ MAIN ══════════════ */}
      <main className="ad-main">

        {/* Top bar */}
        <div className="ad-topbar">
          <div className="ad-topbar__left">
            <h1 className="ad-topbar__title">{navTitles[activeNav]}</h1>
            <span className="ad-topbar__breadcrumb">LibraryHub Admin › {navTitles[activeNav]}</span>
          </div>
          <div className="ad-topbar__right">
            <div className="ad-search">
              {Icons.search(14,"#C4956A")}
              <input
                placeholder="Search anything..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="ad-icon-btn" title="Notifications" onClick={() => setActiveNav("notifications")}>
              {Icons.bell(16)}
              <span className="ad-icon-btn__dot" />
            </button>
            <button className="ad-icon-btn" title="Settings" onClick={() => setActiveNav("settings")}>
              {Icons.settings(16)}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="ad-content">

          {activeNav === "overview" && (
            <OverviewSection onQuickAction={handleQuickAction} />
          )}

          {activeNav === "registrations" && (
            <RegistrationsSection
              pending={pending}
              onAction={handleRegAction}
            />
          )}

          {activeNav === "books" && (
            <BooksSection
              books={books}
              onAddBook={() => setShowAddBook(true)}
            />
          )}

          {activeNav === "borrows" && (
            <BorrowsSection
              borrows={mockBorrows}
              onIssue={() => setShowIssue(true)}
            />
          )}

          {activeNav === "fines" && (
            <FinesSection fines={mockFines} />
          )}

          {activeNav === "users" && (
            <UsersSection />
          )}

          {activeNav === "notifications" && (
            <NotificationsSection />
          )}

          {activeNav === "settings" && (
            <SettingsSection />
          )}

        </div>
      </main>

      {/* ══════ MODALS ══════ */}
      <ConfirmModal
        modal={confirmModal}
        onClose={() => setConfirmModal(null)}
        onConfirm={handleConfirm}
      />
      {showAddBook && (
        <AddBookModal
          onClose={() => setShowAddBook(false)}
          onSave={handleAddBook}
        />
      )}
      {showIssue && (
        <IssueBookModal
          onClose={() => setShowIssue(false)}
          onSave={handleIssue}
        />
      )}

      {/* ══════ TOASTS ══════ */}
      <Toast toasts={toasts} />

    </div>
  );
};

export default AdminDashboard;
