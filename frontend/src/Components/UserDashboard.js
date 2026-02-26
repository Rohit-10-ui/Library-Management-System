import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

/* ══════════════════════════════════════════
   SVG ICONS
══════════════════════════════════════════ */
const Icon = ({ d, size = 18, color = "currentColor", fill = "none", sw = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const Icons = {
  book:       (s=18,c="currentColor") => <Icon size={s} color={c} d={["M4 19.5A2.5 2.5 0 0 1 6.5 17H20","M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"]} />,
  books:      (s=18,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  home:       (s=18,c="currentColor") => <Icon size={s} color={c} d={["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z","M9 22V12h6v10"]} />,
  clock:      (s=18,c="currentColor") => <Icon size={s} color={c} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill={c} stroke="none" />,
  search:     (s=18,c="currentColor") => <Icon size={s} color={c} d={["M11 19a8 8 0 100-16 8 8 0 000 16z","M21 21l-4.35-4.35"]} />,
  user:       (s=18,c="currentColor") => <Icon size={s} color={c} d={["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2","M12 11a4 4 0 100-8 4 4 0 000 8z"]} />,
  bell:       (s=18,c="currentColor") => <Icon size={s} color={c} d={["M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 01-3.46 0"]} />,
  heart:      (s=18,c="currentColor") => <Icon size={s} color={c} d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />,
  history:    (s=18,c="currentColor") => <Icon size={s} color={c} d={["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z","M12 9v4l2 2"]} />,
  refresh:    (s=18,c="currentColor") => <Icon size={s} color={c} d={["M23 4v6h-6","M1 20v-6h6","M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"]} />,
  settings:   (s=18,c="currentColor") => <Icon size={s} color={c} d="M12 15a3 3 0 100-6 3 3 0 000 6z" />,
  logout:     (s=18,c="currentColor") => <Icon size={s} color={c} d={["M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4","M16 17l5-5-5-5","M21 12H9"]} />,
  check:      (s=18,c="currentColor") => <Icon size={s} color={c} d="M20 6L9 17l-5-5" />,
  x:          (s=18,c="currentColor") => <Icon size={s} color={c} d={["M18 6L6 18","M6 6l12 12"]} />,
  plus:       (s=18,c="currentColor") => <Icon size={s} color={c} d={["M12 5v14","M5 12h14"]} />,
  dollar:     (s=18,c="currentColor") => <Icon size={s} color={c} d={["M12 1v22","M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"]} />,
  trending:   (s=18,c="currentColor") => <Icon size={s} color={c} d={["M23 6l-9.5 9.5-5-5L1 18","M17 6h6v6"]} />,
};

/* ══════════════════════════════════════════
   MOCK DATA
══════════════════════════════════════════ */
const COLORS = ["#FF9B7A","#6B9BD1","#A8C5A8","#C4956A","#9B8EC4","#E07A7A","#7AC4C4"];
const avatarColor = (name) => COLORS[name.charCodeAt(0) % COLORS.length];
const initials = (name) => name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0,2);

const USER_DATA = {
  name: "Arjun Sharma",
  email: "arjun.sharma@example.com",
  memberId: "LH-2025-0342",
  joinedDate: "August 15, 2025",
  phone: "+91 98765 43210",
  address: "Plot 23, Sector 5, Hitech City, Hyderabad, Telangana 500081",
};

const mockBorrowedBooks = [
  { id:1, title:"The Midnight Library", author:"Matt Haig",         isbn:"978-0525559474", borrowed:"2026-01-20", due:"2026-02-20", status:"active",   fine:0  },
  { id:2, title:"Atomic Habits",        author:"James Clear",        isbn:"978-0735211292", borrowed:"2026-02-01", due:"2026-03-03", status:"active",   fine:0  },
  { id:3, title:"Sapiens",              author:"Yuval Noah Harari",  isbn:"978-0062316097", borrowed:"2026-01-10", due:"2026-02-10", status:"overdue",  fine:20 },
];

const mockBrowseBooks = [
  { id:1,  title:"1984",                    author:"George Orwell",      category:"Dystopian",  available:true,  color:"#FF9B7A" },
  { id:2,  title:"The Alchemist",           author:"Paulo Coelho",       category:"Fiction",    available:true,  color:"#6B9BD1" },
  { id:3,  title:"Clean Code",              author:"Robert C. Martin",   category:"Technology", available:false, color:"#A8C5A8" },
  { id:4,  title:"Deep Work",               author:"Cal Newport",        category:"Productivity",available:true, color:"#C4956A" },
  { id:5,  title:"The Psychology of Money", author:"Morgan Housel",      category:"Finance",    available:true,  color:"#9B8EC4" },
  { id:6,  title:"Ikigai",                  author:"Héctor García",      category:"Self-Help",  available:true,  color:"#E07A7A" },
  { id:7,  title:"The Design of Everyday Things",author:"Don Norman",    category:"Design",     available:false, color:"#7AC4C4" },
  { id:8,  title:"Thinking, Fast and Slow",author:"Daniel Kahneman",    category:"Psychology", available:true,  color:"#FF9B7A" },
];

const mockHistory = [
  { id:1, title:"Rich Dad Poor Dad",    author:"Robert Kiyosaki",   borrowed:"2025-11-05", returned:"2025-11-28", fine:0  },
  { id:2, title:"The Lean Startup",     author:"Eric Ries",         borrowed:"2025-10-10", returned:"2025-11-03", fine:10 },
  { id:3, title:"Zero to One",          author:"Peter Thiel",       borrowed:"2025-09-12", returned:"2025-10-05", fine:0  },
  { id:4, title:"The Subtle Art",       author:"Mark Manson",       borrowed:"2025-08-20", returned:"2025-09-15", fine:0  },
];

const mockNotifications = [
  { id:1, text:"Your book 'Sapiens' is overdue. Please return it to avoid additional fines.",   time:"2 hours ago",  type:"warning" },
  { id:2, text:"'The Covenant of Water' you requested is now available for pickup.",           time:"1 day ago",    type:"success" },
  { id:3, text:"You have an unpaid fine of ₹20 for 'Sapiens'. Pay now to continue borrowing.", time:"2 days ago",   type:"error"   },
  { id:4, text:"Book reminder: 'Atomic Habits' is due in 3 days.",                             time:"3 days ago",   type:"info"    },
];

/* ══════════════════════════════════════════
   NAV CONFIG
══════════════════════════════════════════ */
const NAV_ITEMS = [
  { id:"dashboard",     label:"Dashboard",        iconFn: Icons.home,    section:"MAIN"      },
  { id:"browse",        label:"Browse Books",     iconFn: Icons.books,   section:"MAIN"      },
  { id:"borrowed",      label:"My Books",         iconFn: Icons.book,    section:"MAIN", badge: 3 },
  { id:"history",       label:"Borrow History",   iconFn: Icons.history, section:"MAIN"      },
  { id:"membership",    label:"Membership",       iconFn: (s,c)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, section:"LIBRARY" },
  { id:"favorites",     label:"Favorites",        iconFn: Icons.heart,   section:"LIBRARY"   },
  { id:"notifications", label:"Notifications",    iconFn: Icons.bell,    section:"LIBRARY", badge: 3 },
  { id:"profile",       label:"My Profile",       iconFn: Icons.user,    section:"ACCOUNT"   },
  { id:"settings",      label:"Settings",         iconFn: Icons.settings,section:"ACCOUNT"   },
];

/* ══════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════ */

/* Toast */
const Toast = ({ toasts }) => (
  <div className="ud-toast-wrap">
    {toasts.map(t => (
      <div key={t.id} className={`ud-toast ud-toast--${t.type}`}>
        <span>{t.type==="success" ? Icons.check(16,"#4CAF50") : Icons.x(16,"#e05555")}</span>
        <span className="ud-toast__text">{t.msg}</span>
      </div>
    ))}
  </div>
);

/* Change Password Modal */
const ChangePasswordModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const EyeIcon = ({ show }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4956A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {show ? (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      ) : (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );

  const validate = () => {
    const e = {};
    if (!form.currentPassword) e.currentPassword = "Current password is required";
    if (!form.newPassword) e.newPassword = "New password is required";
    else if (form.newPassword.length < 6) e.newPassword = "Password must be at least 6 characters";
    if (!form.confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (form.newPassword !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    return e;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave(form);
  };

  return (
    <div className="ud-modal-overlay" onClick={onClose}>
      <div className="ud-modal" onClick={e => e.stopPropagation()}>
        <button className="ud-modal__close" onClick={onClose}>{Icons.x(14)}</button>
        <h3 className="ud-modal__title">Change Password</h3>
        <p className="ud-modal__sub">Enter your current password and choose a new one</p>

        {/* Current Password */}
        <div className="ud-modal__field">
          <label className="ud-modal__label">Current Password</label>
          <div style={{ position:"relative" }}>
            <input
              className="ud-modal__input"
              type={showCurrent ? "text" : "password"}
              placeholder="Enter current password"
              value={form.currentPassword}
              onChange={e => { setForm({ ...form, currentPassword: e.target.value }); setErrors({ ...errors, currentPassword: "" }); }}
              style={{ paddingRight:"2.5rem" }}
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              style={{ position:"absolute", right:"0.75rem", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", display:"flex" }}
            >
              <EyeIcon show={showCurrent} />
            </button>
          </div>
          {errors.currentPassword && <p style={{ fontSize:"0.75rem", color:"#e05555", marginTop:"0.3rem" }}>{errors.currentPassword}</p>}
        </div>

        {/* New Password */}
        <div className="ud-modal__field">
          <label className="ud-modal__label">New Password</label>
          <div style={{ position:"relative" }}>
            <input
              className="ud-modal__input"
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
              value={form.newPassword}
              onChange={e => { setForm({ ...form, newPassword: e.target.value }); setErrors({ ...errors, newPassword: "" }); }}
              style={{ paddingRight:"2.5rem" }}
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              style={{ position:"absolute", right:"0.75rem", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", display:"flex" }}
            >
              <EyeIcon show={showNew} />
            </button>
          </div>
          {errors.newPassword && <p style={{ fontSize:"0.75rem", color:"#e05555", marginTop:"0.3rem" }}>{errors.newPassword}</p>}
        </div>

        {/* Confirm Password */}
        <div className="ud-modal__field">
          <label className="ud-modal__label">Confirm New Password</label>
          <div style={{ position:"relative" }}>
            <input
              className="ud-modal__input"
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter new password"
              value={form.confirmPassword}
              onChange={e => { setForm({ ...form, confirmPassword: e.target.value }); setErrors({ ...errors, confirmPassword: "" }); }}
              style={{ paddingRight:"2.5rem" }}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              style={{ position:"absolute", right:"0.75rem", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", display:"flex" }}
            >
              <EyeIcon show={showConfirm} />
            </button>
          </div>
          {errors.confirmPassword && <p style={{ fontSize:"0.75rem", color:"#e05555", marginTop:"0.3rem" }}>{errors.confirmPassword}</p>}
        </div>

        {/* Info box */}
        <div style={{ display:"flex", gap:"0.5rem", padding:"0.75rem 1rem", background:"rgba(107,155,209,0.08)", border:"1px solid rgba(107,155,209,0.2)", borderRadius:8, fontSize:"0.8rem", color:"#5D4E37", lineHeight:1.5, marginTop:"0.5rem" }}>
          <span style={{ flexShrink:0 }}>{Icons.bell(14,"#6B9BD1")}</span>
          <span>Password must be at least 6 characters long and include a mix of letters and numbers.</span>
        </div>

        <div className="ud-modal__actions">
          <button className="ud-modal__btn-cancel" onClick={onClose}>Cancel</button>
          <button className="ud-modal__btn-submit" onClick={handleSubmit}>
            {Icons.check(14,"white")} Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

/* Book Detail Modal */
const BookDetailModal = ({ book, onClose, onAction }) => {
  if (!book) return null;
  return (
    <div className="ud-modal-overlay" onClick={onClose}>
      <div className="ud-modal" onClick={e => e.stopPropagation()}>
        <button className="ud-modal__close" onClick={onClose}>{Icons.x(14)}</button>
        <h3 className="ud-modal__title">{book.title}</h3>
        <p className="ud-modal__sub">by {book.author}</p>
        <div className="ud-modal__body">
          <div className="ud-modal__field">
            <label className="ud-modal__label">ISBN</label>
            <div className="ud-modal__value">{book.isbn || "Not available"}</div>
          </div>
          <div className="ud-modal__field">
            <label className="ud-modal__label">Category</label>
            <div className="ud-modal__value">{book.category || "General"}</div>
          </div>
          <div className="ud-modal__field">
            <label className="ud-modal__label">Availability</label>
            <div className="ud-modal__value">
              {book.available ? (
                <span className="ud-badge ud-badge--available ud-badge--dot">Available</span>
              ) : (
                <span className="ud-badge ud-badge--borrowed ud-badge--dot">Currently Borrowed</span>
              )}
            </div>
          </div>
        </div>
        <div className="ud-modal__actions">
          <button className="ud-modal__btn-cancel" onClick={onClose}>Close</button>
          {book.available && (
            <button className="ud-modal__btn-submit" onClick={() => { onAction("borrow", book); onClose(); }}>
              {Icons.book(14,"white")} Borrow Book
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   SECTION VIEWS
══════════════════════════════════════════ */

/* ── Dashboard Overview ── */
const DashboardSection = ({ stats, onQuickNav }) => (
  <>
    {/* Stats */}
    <div className="ud-stats-grid">
      {stats.map((s, i) => (
        <div key={i} className="ud-stat-card">
          <div className={`ud-stat-card__icon ud-stat-card__icon--${s.color}`}>
            {s.icon(24, s.color==="orange"?"#FF9B7A":s.color==="green"?"#4CAF50":s.color==="blue"?"#6B9BD1":"#FFA000")}
          </div>
          <div className="ud-stat-card__content">
            <div className="ud-stat-card__value">{s.value}</div>
            <div className="ud-stat-card__label">{s.label}</div>
          </div>
        </div>
      ))}
    </div>

    <div className="ud-row ud-row--2col">
      {/* Currently Borrowed */}
      <div className="ud-card">
        <div className="ud-card__header">
          <div className="ud-card__title-wrap">
            {Icons.book(18,"#FF9B7A")}
            <div>
              <div className="ud-card__title">Currently Borrowed</div>
              <div className="ud-card__subtitle">Books in your possession</div>
            </div>
          </div>
          <button className="ud-pill ud-pill--outline" onClick={() => onQuickNav("borrowed")}>View All</button>
        </div>
        <div className="ud-card__body" style={{ padding:0 }}>
          {mockBorrowedBooks.length === 0 ? (
            <div className="ud-empty">
              <div className="ud-empty__icon">{Icons.book(40,"#C4956A")}</div>
              <p className="ud-empty__text">No books borrowed yet</p>
            </div>
          ) : (
            <div className="ud-table-wrap">
              <table className="ud-table">
                <tbody>
                  {mockBorrowedBooks.slice(0,3).map(b => (
                    <tr key={b.id}>
                      <td>
                        <div className="ud-table__book">
                          <div className="ud-table__book-cover" style={{ background: avatarColor(b.title) }}>
                            {Icons.book(16,"white")}
                          </div>
                          <div className="ud-table__book-info">
                            <div className="ud-table__book-title">{b.title}</div>
                            <div className="ud-table__book-author">{b.author}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ textAlign:"right" }}>
                        <div style={{ fontSize:"0.8rem", color:"#8B6F47", marginBottom:3 }}>Due: {b.due}</div>
                        <span className={`ud-badge ud-badge--${b.status} ud-badge--dot`}>
                          {b.status==="overdue" ? "Overdue" : "Active"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="ud-card">
        <div className="ud-card__header">
          <div className="ud-card__title-wrap">
            {Icons.bell(18,"#FF9B7A")}
            <div className="ud-card__title">Notifications</div>
          </div>
          <button className="ud-pill ud-pill--outline" onClick={() => onQuickNav("notifications")}>View All</button>
        </div>
        <div className="ud-card__body">
          {mockNotifications.slice(0,4).map(n => (
            <div key={n.id} style={{ display:"flex", gap:"0.75rem", alignItems:"flex-start", padding:"0.75rem 0", borderBottom: n.id===4 ? "none" : "1px solid rgba(255,155,122,0.07)" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background: n.type==="warning"?"#FFA000":n.type==="error"?"#e05555":n.type==="success"?"#4CAF50":"#6B9BD1", marginTop:5, flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <p style={{ fontSize:"0.85rem", color:"#5D4E37", lineHeight:1.5 }}>{n.text}</p>
                <p style={{ fontSize:"0.72rem", color:"#C4956A", marginTop:3 }}>{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

/* ── Browse Books ── */
const BrowseSection = ({ books, onBookClick }) => {
  const [search, setSearch] = useState("");
  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ud-card">
      <div className="ud-card__header">
        <div className="ud-card__title-wrap">
          {Icons.books(18,"#FF9B7A")}
          <div>
            <div className="ud-card__title">Browse Books</div>
            <div className="ud-card__subtitle">{books.length} books available</div>
          </div>
        </div>
        <div className="ud-search" style={{ borderRadius:10, padding:"0.4rem 0.8rem" }}>
          {Icons.search(14,"#C4956A")}
          <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="ud-card__body">
        {filtered.length === 0 ? (
          <div className="ud-empty">
            <div className="ud-empty__icon">{Icons.books(40,"#C4956A")}</div>
            <p className="ud-empty__text">No books found</p>
          </div>
        ) : (
          <div className="ud-book-grid">
            {filtered.map((b, i) => (
              <div key={b.id} className="ud-book-item" onClick={() => onBookClick(b)} style={{ animationDelay: `${i*0.05}s` }}>
                <div className="ud-book-item__cover" style={{ background: b.color }}>
                  {Icons.book(32,"white")}
                  <span className={`ud-badge ${b.available?"ud-badge--available":"ud-badge--borrowed"} ud-book-item__badge`}>
                    {b.available ? "Available" : "Borrowed"}
                  </span>
                </div>
                <div className="ud-book-item__title">{b.title}</div>
                <div className="ud-book-item__author">{b.author}</div>
                <div className="ud-book-item__footer">
                  <span className="ud-book-item__category">{b.category}</span>
                  {b.available && (
                    <button className="ud-action-btn ud-action-btn--borrow" onClick={(e) => { e.stopPropagation(); onBookClick(b); }}>
                      {Icons.plus(11,"#cc5522")} Borrow
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ── My Books (Borrowed) ── */
const BorrowedSection = ({ books, onReturn, onRenew }) => (
  <div className="ud-card">
    <div className="ud-card__header">
      <div className="ud-card__title-wrap">
        {Icons.book(18,"#FF9B7A")}
        <div>
          <div className="ud-card__title">My Borrowed Books</div>
          <div className="ud-card__subtitle">{books.length} book{books.length!==1?"s":""} currently borrowed</div>
        </div>
      </div>
    </div>
    <div className="ud-card__body" style={{ padding:0 }}>
      {books.length === 0 ? (
        <div className="ud-empty">
          <div className="ud-empty__icon">{Icons.book(40,"#C4956A")}</div>
          <p className="ud-empty__text">You haven't borrowed any books yet</p>
          <button className="ud-pill ud-pill--filled ud-empty__btn">Browse Library</button>
        </div>
      ) : (
        <div className="ud-table-wrap">
          <table className="ud-table">
            <thead>
              <tr>
                <th>Book</th>
                <th>Borrowed Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Fine</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map(b => (
                <tr key={b.id}>
                  <td>
                    <div className="ud-table__book">
                      <div className="ud-table__book-cover" style={{ background: avatarColor(b.title) }}>
                        {Icons.book(16,"white")}
                      </div>
                      <div className="ud-table__book-info">
                        <div className="ud-table__book-title">{b.title}</div>
                        <div className="ud-table__book-author">{b.author}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize:"0.85rem", color:"#8B6F47" }}>{b.borrowed}</td>
                  <td style={{ fontSize:"0.85rem", fontWeight:600, color: b.status==="overdue"?"#e05555":"#5D4E37" }}>{b.due}</td>
                  <td>
                    <span className={`ud-badge ud-badge--${b.status} ud-badge--dot`}>
                      {b.status==="overdue" ? "Overdue" : "Active"}
                    </span>
                  </td>
                  <td style={{ fontWeight:700, color: b.fine > 0 ? "#e05555" : "#4CAF50", fontFamily:"'DM Serif Display', serif" }}>
                    {b.fine > 0 ? `₹${b.fine}` : "—"}
                  </td>
                  <td>
                    <div style={{ display:"flex", gap:"0.4rem" }}>
                      <button className="ud-action-btn ud-action-btn--return" onClick={() => onReturn(b)}>
                        {Icons.check(11,"#2e7d32")} Return
                      </button>
                      {b.status === "active" && (
                        <button className="ud-action-btn ud-action-btn--renew" onClick={() => onRenew(b)}>
                          {Icons.refresh(11,"#1565c0")} Renew
                        </button>
                      )}
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

/* ── Borrow History ── */
const HistorySection = ({ history }) => (
  <div className="ud-card">
    <div className="ud-card__header">
      <div className="ud-card__title-wrap">
        {Icons.history(18,"#FF9B7A")}
        <div>
          <div className="ud-card__title">Borrow History</div>
          <div className="ud-card__subtitle">{history.length} total books borrowed</div>
        </div>
      </div>
    </div>
    <div className="ud-card__body" style={{ padding:0 }}>
      <div className="ud-table-wrap">
        <table className="ud-table">
          <thead>
            <tr>
              <th>Book</th>
              <th>Borrowed</th>
              <th>Returned</th>
              <th>Fine Paid</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map(h => (
              <tr key={h.id}>
                <td>
                  <div className="ud-table__book">
                    <div className="ud-table__book-cover" style={{ background: avatarColor(h.title) }}>
                      {Icons.book(16,"white")}
                    </div>
                    <div className="ud-table__book-info">
                      <div className="ud-table__book-title">{h.title}</div>
                      <div className="ud-table__book-author">{h.author}</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontSize:"0.85rem", color:"#8B6F47" }}>{h.borrowed}</td>
                <td style={{ fontSize:"0.85rem", color:"#8B6F47" }}>{h.returned}</td>
                <td style={{ fontWeight:600, color: h.fine > 0 ? "#e05555" : "#4CAF50" }}>
                  {h.fine > 0 ? `₹${h.fine}` : "—"}
                </td>
                <td>
                  <span className="ud-badge ud-badge--returned ud-badge--dot">Returned</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

/* ── Notifications ── */
const NotificationsSection = ({ notifications }) => (
  <div className="ud-card">
    <div className="ud-card__header">
      <div className="ud-card__title-wrap">
        {Icons.bell(18,"#FF9B7A")}
        <div>
          <div className="ud-card__title">All Notifications</div>
          <div className="ud-card__subtitle">{notifications.length} notifications</div>
        </div>
      </div>
      <button className="ud-pill ud-pill--outline">{Icons.check(12,"#FF9B7A")} Mark all read</button>
    </div>
    <div className="ud-card__body">
      {notifications.map(n => (
        <div key={n.id} style={{ display:"flex", gap:"1rem", alignItems:"flex-start", padding:"1rem 0", borderBottom: n.id===notifications.length ? "none" : "1px solid rgba(255,155,122,0.07)" }}>
          <div style={{
            width:12, height:12, borderRadius:"50%", marginTop:3, flexShrink:0,
            background: n.type==="warning"?"#FFA000":n.type==="error"?"#e05555":n.type==="success"?"#4CAF50":"#6B9BD1"
          }} />
          <div style={{ flex:1 }}>
            <p style={{ fontSize:"0.9rem", color:"#5D4E37", lineHeight:1.6, marginBottom:4 }}>{n.text}</p>
            <p style={{ fontSize:"0.75rem", color:"#C4956A" }}>{n.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ── Profile ── */
const ProfileSection = ({ user, onUpdateProfile }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const stats = [
    { value: "3",  label: "Books Borrowed" },
    { value: "12", label: "Total Reads" },
    { value: "5",  label: "Months Member" },
  ];

  const handleSave = () => {
    onUpdateProfile(formData);
    setEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...user });
    setEditing(false);
  };

  return (
    <div className="ud-card">
      <div className="ud-card__header">
        <div className="ud-card__title-wrap">
          {Icons.user(18,"#FF9B7A")}
          <div className="ud-card__title">My Profile</div>
        </div>
        {!editing ? (
          <button className="ud-pill ud-pill--outline" onClick={() => setEditing(true)}>
            {Icons.settings(12,"#FF9B7A")} Edit Profile
          </button>
        ) : (
          <div style={{ display:"flex", gap:"0.5rem" }}>
            <button className="ud-pill ud-pill--outline" onClick={handleCancel}>Cancel</button>
            <button className="ud-pill ud-pill--filled" onClick={handleSave}>
              {Icons.check(12,"white")} Save Changes
            </button>
          </div>
        )}
      </div>
      <div className="ud-card__body">
        {/* Header */}
        <div className="ud-profile-header">
          <div className="ud-profile-avatar">{initials(user.name)}</div>
          <div className="ud-profile-info">
            <h2 className="ud-profile-name">{user.name}</h2>
            <p className="ud-profile-email">{user.email}</p>
            <div className="ud-profile-stats">
              {stats.map((s, i) => (
                <div key={i} className="ud-profile-stat-item">
                  <div className="ud-profile-stat-value">{s.value}</div>
                  <div className="ud-profile-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="ud-profile-fields">
          {/* Member ID (read-only) */}
          <div className="ud-profile-field">
            <div className="ud-profile-field__label">Member ID</div>
            <div className="ud-profile-field__value">{user.memberId}</div>
          </div>

          {/* Joined Date (read-only) */}
          <div className="ud-profile-field">
            <div className="ud-profile-field__label">Joined</div>
            <div className="ud-profile-field__value">{user.joinedDate}</div>
          </div>

          {/* Editable: First Name */}
          <div className="ud-profile-field">
            <div className="ud-profile-field__label">First Name</div>
            {editing ? (
              <input
                className="ud-modal__input"
                value={formData.firstName || user.name.split(" ")[0]}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                style={{ border:"1.5px solid rgba(196,149,106,0.3)", padding:"0.7rem 1rem" }}
              />
            ) : (
              <div className="ud-profile-field__value">{user.name.split(" ")[0]}</div>
            )}
          </div>

          {/* Editable: Last Name */}
          <div className="ud-profile-field">
            <div className="ud-profile-field__label">Last Name</div>
            {editing ? (
              <input
                className="ud-modal__input"
                value={formData.lastName || user.name.split(" ").slice(1).join(" ")}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                style={{ border:"1.5px solid rgba(196,149,106,0.3)", padding:"0.7rem 1rem" }}
              />
            ) : (
              <div className="ud-profile-field__value">{user.name.split(" ").slice(1).join(" ")}</div>
            )}
          </div>

          {/* Editable: Phone Number */}
          <div className="ud-profile-field">
            <div className="ud-profile-field__label">Phone Number</div>
            {editing ? (
              <input
                className="ud-modal__input"
                type="tel"
                value={formData.phone || user.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                style={{ border:"1.5px solid rgba(196,149,106,0.3)", padding:"0.7rem 1rem" }}
              />
            ) : (
              <div className="ud-profile-field__value">{user.phone}</div>
            )}
          </div>

          {/* Email (read-only for now) */}
          <div className="ud-profile-field">
            <div className="ud-profile-field__label">Email</div>
            <div className="ud-profile-field__value">{user.email}</div>
          </div>

          {/* Editable: Address */}
          <div className="ud-profile-field" style={{ gridColumn:"1 / -1" }}>
            <div className="ud-profile-field__label">Address</div>
            {editing ? (
              <textarea
                className="ud-modal__input"
                rows="2"
                value={formData.address || user.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                style={{ border:"1.5px solid rgba(196,149,106,0.3)", padding:"0.7rem 1rem", fontFamily:"'Lora', serif", resize:"vertical" }}
              />
            ) : (
              <div className="ud-profile-field__value">{user.address}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Membership Section ── */
const MembershipSection = () => {
  const [membershipTab, setMembershipTab] = useState('myplan');
  const myMembership = {
    planName: 'Standard Plan',
    membershipType: 'STANDARD',
    joinDate: '2024-01-10',
    expiryDate: '2025-01-10',
    status: 'active',
    borrowLimit: 5,
    durationDays: 30,
    fee: 299,
    lateFeePerDay: 5,
    borrowedBooks: 2,
    overdueBooks: 0,
    totalPenalties: 0,
  };

  const plans = [
    {id:1,name:'BASIC',        borrowLimit:2, durationDays:14, fee:199,  lateFeePerDay:3,  active:true},
    {id:2,name:'STANDARD',     borrowLimit:5, durationDays:30, fee:299,  lateFeePerDay:5,  active:true},
    {id:3,name:'PREMIUM',      borrowLimit:10,durationDays:60, fee:499,  lateFeePerDay:10, active:true},
    {id:4,name:'STUDENT_BASIC',borrowLimit:3, durationDays:14, fee:99,   lateFeePerDay:2,  active:true},
  ];

  const daysLeft = Math.ceil((new Date(myMembership.expiryDate)-new Date())/86400000);
  const planColors = {BASIC:'#6B9BD1', STANDARD:'#A8C5A8', PREMIUM:'#FF9B7A', STUDENT_BASIC:'#B8D4ED'};
  const getPlanColor = name => planColors[name?.toUpperCase()] || '#FFD4B8';

  return (
    <>
      {/* Tabs */}
      <div style={{display:'flex',gap:'0.5rem',marginBottom:'1.5rem',borderBottom:'2px solid rgba(255,155,122,0.1)',paddingBottom:'0.5rem'}}>
        {[{k:'myplan',l:'My Membership'},{k:'plans',l:'All Plans'}].map(t=>(
          <button key={t.k} onClick={()=>setMembershipTab(t.k)} style={{padding:'0.6rem 1.2rem',background:membershipTab===t.k?'rgba(255,155,122,0.1)':'transparent',border:'none',borderRadius:8,color:membershipTab===t.k?'#FF9B7A':'#8B6F47',fontWeight:membershipTab===t.k?600:400,cursor:'pointer',fontSize:'0.9rem',transition:'all 0.2s'}}>{t.l}</button>
        ))}
      </div>

      {membershipTab==='myplan'&&(
        <div style={{display:'grid',gap:'1.5rem'}}>
          {/* Current Plan Card */}
          <div className="ud-card">
            <div className="ud-card__header">
              <div className="ud-card__title-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF9B7A" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <div><div className="ud-card__title">Current Membership</div><div className="ud-card__subtitle">{myMembership.planName}</div></div>
              </div>
              <span className={`ud-badge ud-badge--${myMembership.status}`} style={{textTransform:'capitalize'}}>{myMembership.status}</span>
            </div>
            <div className="ud-card__body">
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'1.5rem',marginBottom:'1.5rem'}}>
                {[
                  {l:'Plan Type',v:myMembership.membershipType,i:Icons.trending},
                  {l:'Borrow Limit',v:`${myMembership.borrowLimit} books`,i:Icons.book},
                  {l:'Loan Period',v:`${myMembership.durationDays} days`,i:Icons.clock},
                  {l:'Late Fee',v:`₹${myMembership.lateFeePerDay}/day`,i:Icons.dollar},
                  {l:'Joined',v:new Date(myMembership.joinDate).toLocaleDateString('en-IN',{year:'numeric',month:'short',day:'numeric'}),i:Icons.user},
                  {l:'Expires',v:new Date(myMembership.expiryDate).toLocaleDateString('en-IN',{year:'numeric',month:'short',day:'numeric'}),i:Icons.bell},
                ].map((f,i)=>(
                  <div key={i} style={{display:'flex',gap:'0.75rem',alignItems:'center',padding:'1rem',background:'rgba(255,248,240,0.5)',borderRadius:10}}>
                    <div style={{width:36,height:36,borderRadius:8,background:'rgba(255,155,122,0.15)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{f.i(16,'#FF9B7A')}</div>
                    <div><div style={{fontSize:'0.75rem',color:'#8B6F47',marginBottom:2}}>{f.l}</div><div style={{fontSize:'0.9rem',fontWeight:600,color:'#3D2817'}}>{f.v}</div></div>
                  </div>
                ))}
              </div>
              {daysLeft!==null&&(
                <div style={{padding:'1rem',background:daysLeft<30?'rgba(255,152,0,0.08)':'rgba(76,175,80,0.08)',borderRadius:10,border:`1.5px solid ${daysLeft<30?'rgba(255,152,0,0.2)':'rgba(76,175,80,0.2)'}`}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.5rem'}}>
                    <span style={{fontSize:'0.85rem',fontWeight:600,color:'#3D2817'}}>{daysLeft>0?`${daysLeft} days remaining`:'Membership expired'}</span>
                    {daysLeft<30&&daysLeft>0&&<span style={{fontSize:'0.75rem',color:'#F57C00',display:'flex',alignItems:'center',gap:'0.3rem'}}>{Icons.bell(12,'#F57C00')}Renew soon</span>}
                  </div>
                  <div style={{height:8,background:'rgba(0,0,0,0.05)',borderRadius:4,overflow:'hidden'}}><div style={{height:'100%',background:daysLeft<30?'#FFA000':'#4CAF50',width:`${Math.max(0,Math.min(100,(daysLeft/365)*100))}%`,transition:'width 0.3s'}}/></div>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'1rem'}}>
            {[
              {l:'Books Borrowed',v:myMembership.borrowedBooks,c:'#FF9B7A',i:Icons.book},
              {l:'Overdue Books',v:myMembership.overdueBooks,c:'#e05555',i:Icons.bell},
              {l:'Total Penalties',v:`₹${myMembership.totalPenalties}`,c:'#F39C12',i:Icons.dollar},
            ].map((s,i)=>(
              <div key={i} style={{padding:'1.25rem',background:'white',borderRadius:12,border:'1.5px solid rgba(255,155,122,0.1)',display:'flex',alignItems:'center',gap:'1rem'}}>
                <div style={{width:48,height:48,borderRadius:10,background:`${s.c}15`,display:'flex',alignItems:'center',justifyContent:'center'}}>{s.i(22,s.c)}</div>
                <div><div style={{fontSize:'1.5rem',fontWeight:700,color:'#3D2817',marginBottom:2}}>{s.v}</div><div style={{fontSize:'0.8rem',color:'#8B6F47'}}>{s.l}</div></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {membershipTab==='plans'&&(
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1.5rem'}}>
          {plans.map(plan=>{
            const col=getPlanColor(plan.name);
            const isMyPlan=plan.name===myMembership.membershipType;
            return(
              <div key={plan.id} style={{padding:'1.5rem',background:'white',borderRadius:16,border:`2px solid ${isMyPlan?col:'rgba(255,155,122,0.1)'}`,position:'relative',transition:'all 0.3s',boxShadow:isMyPlan?`0 4px 20px ${col}30`:'none'}}>
                {isMyPlan&&<div style={{position:'absolute',top:12,right:12,padding:'0.3rem 0.7rem',background:col,color:'white',fontSize:'0.7rem',fontWeight:600,borderRadius:6,display:'flex',alignItems:'center',gap:'0.3rem'}}>CURRENT</div>}
                <div style={{width:56,height:56,borderRadius:12,background:`${col}18`,border:`2px solid ${col}30`,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'1rem'}}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3 style={{fontSize:'1.2rem',fontWeight:700,color:'#3D2817',marginBottom:'0.3rem'}}>{plan.name.replace(/_/g,' ')}</h3>
                <div style={{fontSize:'2rem',fontWeight:700,color:col,marginBottom:'1.5rem'}}>₹{plan.fee}<span style={{fontSize:'0.9rem',fontWeight:400,color:'#8B6F47'}}>/plan</span></div>
                <div style={{display:'flex',flexDirection:'column',gap:'0.75rem',marginBottom:'1.5rem'}}>
                  {[
                    {l:`${plan.borrowLimit} books at a time`,i:Icons.book},
                    {l:`${plan.durationDays} day loan period`,i:Icons.clock},
                    {l:`₹${plan.lateFeePerDay}/day late fee`,i:Icons.dollar},
                  ].map((f,i)=>(
                    <div key={i} style={{display:'flex',alignItems:'center',gap:'0.6rem',fontSize:'0.85rem',color:'#5D4E37'}}>{f.i(14,col)}<span>{f.l}</span></div>
                  ))}
                </div>
                {!isMyPlan&&<button style={{width:'100%',padding:'0.75rem',background:'transparent',border:`2px solid ${col}`,color:col,borderRadius:10,fontWeight:600,cursor:'pointer',fontSize:'0.9rem',transition:'all 0.2s'}} onMouseOver={e=>{e.target.style.background=col;e.target.style.color='white';}} onMouseOut={e=>{e.target.style.background='transparent';e.target.style.color=col;}}>Upgrade to this plan</button>}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

/* ── Settings Section ── */
const SettingsSection = ({ onChangePassword }) => (
  <>
    {/* Account Security */}
    <div className="ud-card">
      <div className="ud-card__header">
        <div className="ud-card__title-wrap">
          {Icons.settings(18,"#FF9B7A")}
          <div>
            <div className="ud-card__title">Account Security</div>
            <div className="ud-card__subtitle">Manage your password and security settings</div>
          </div>
        </div>
      </div>
      <div className="ud-card__body">
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1.25rem", background:"rgba(255,248,240,0.6)", borderRadius:12, marginBottom:"1rem" }}>
          <div>
            <div style={{ fontSize:"0.95rem", fontWeight:600, color:"#3D2817", marginBottom:4 }}>Password</div>
            <div style={{ fontSize:"0.8rem", color:"#8B6F47" }}>Last changed 3 months ago</div>
          </div>
          <button className="ud-pill ud-pill--filled" onClick={onChangePassword}>
            Change Password
          </button>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1.25rem", background:"rgba(255,248,240,0.6)", borderRadius:12 }}>
          <div>
            <div style={{ fontSize:"0.95rem", fontWeight:600, color:"#3D2817", marginBottom:4 }}>Two-Factor Authentication</div>
            <div style={{ fontSize:"0.8rem", color:"#8B6F47" }}>Add an extra layer of security</div>
          </div>
          <button className="ud-pill ud-pill--outline">
            Enable 2FA
          </button>
        </div>
      </div>
    </div>

    {/* Notification Preferences */}
    <div className="ud-card">
      <div className="ud-card__header">
        <div className="ud-card__title-wrap">
          {Icons.bell(18,"#FF9B7A")}
          <div>
            <div className="ud-card__title">Notification Preferences</div>
            <div className="ud-card__subtitle">Choose how you want to be notified</div>
          </div>
        </div>
      </div>
      <div className="ud-card__body">
        {[
          { label:"Email Notifications",         desc:"Receive important updates via email",     checked:true  },
          { label:"SMS Reminders",               desc:"Get text reminders for due dates",        checked:false },
          { label:"Due Date Alerts",             desc:"Alert 3 days before book is due",         checked:true  },
          { label:"New Arrivals Newsletter",     desc:"Weekly updates on new books in library",  checked:true  },
          { label:"Fine Payment Reminders",      desc:"Notify me about outstanding fines",       checked:true  },
        ].map((s, i) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1rem 0", borderBottom: i===4 ? "none" : "1px solid rgba(255,155,122,0.07)" }}>
            <div>
              <div style={{ fontSize:"0.9rem", color:"#3D2817", fontWeight:600, marginBottom:3 }}>{s.label}</div>
              <div style={{ fontSize:"0.78rem", color:"#8B6F47" }}>{s.desc}</div>
            </div>
            <label style={{ display:"flex", alignItems:"center", gap:"0.5rem", cursor:"pointer" }}>
              <input type="checkbox" defaultChecked={s.checked} style={{ accentColor:"#FF9B7A", width:18, height:18 }} />
            </label>
          </div>
        ))}
      </div>
    </div>
  </>
);

/* ══════════════════════════════════════════
   MAIN USER DASHBOARD
══════════════════════════════════════════ */
const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("dashboard");
  const [toasts, setToasts]       = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const toast = (msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  };

  const navTitles = {
    dashboard:     "Dashboard",
    browse:        "Browse Books",
    borrowed:      "My Books",
    history:       "Borrow History",
    membership:    "Membership",
    favorites:     "My Favorites",
    notifications: "Notifications",
    profile:       "My Profile",
    settings:      "Settings",
  };

  const stats = [
    { label:"Books Borrowed", value:"3",  icon: Icons.book,     color:"orange" },
    { label:"Active Borrows", value:"3",  icon: Icons.clock,    color:"blue"   },
    { label:"Total Reads",    value:"12", icon: Icons.trending, color:"green"  },
    { label:"Outstanding",    value:"₹20",icon: Icons.dollar,   color:"amber"  },
  ];

  const handleBookAction = (action, book) => {
    if (action === "borrow") {
      toast(`"${book.title}" borrowed successfully!`);
    }
  };

  const handleReturn = (book) => {
    toast(`"${book.title}" returned successfully!`);
  };

  const handleRenew = (book) => {
    toast(`"${book.title}" renewed for 21 more days.`);
  };

  const handleChangePassword = (form) => {
    // TODO: Connect to API
    // POST /api/auth/change-password
    // Body: { currentPassword, newPassword }
    console.log("Change password payload:", form);
    setShowChangePassword(false);
    toast("Password changed successfully!");
  };

  const handleUpdateProfile = (formData) => {
    // TODO: Connect to API
    // PUT /api/user/profile
    // Body: { firstName, lastName, phone, address }
    console.log("Update profile payload:", formData);
    toast("Profile updated successfully!");
  };

  const sections = NAV_ITEMS.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <div className="ud-root">

      {/* ══════════════ SIDEBAR ══════════════ */}
      <aside className="ud-sidebar">

        <div className="ud-sidebar__header">
          <div className="ud-sidebar__logo">
            <div className="ud-sidebar__logo-icon">
              {Icons.book(18,"#FF9B7A")}
            </div>
            <span className="ud-sidebar__logo-text">LibraryHub</span>
          </div>
        </div>

        <nav className="ud-nav">
          {Object.entries(sections).map(([sectionName, items]) => (
            <React.Fragment key={sectionName}>
              <div className="ud-nav-label">{sectionName}</div>
              {items.map(item => (
                <button
                  key={item.id}
                  className={`ud-nav__item${activeNav === item.id ? " ud-nav__item--active" : ""}`}
                  onClick={() => {
                    if(item.id === 'browse') navigate('/books');
                    else setActiveNav(item.id);
                  }}
                >
                  <span className="ud-nav__icon">{item.iconFn(18, activeNav===item.id ? "#FF9B7A" : "currentColor")}</span>
                  <span>{item.label}</span>
                  {item.badge && <span className="ud-nav__badge">{item.badge}</span>}
                </button>
              ))}
            </React.Fragment>
          ))}
        </nav>

        <div className="ud-sidebar__footer">
          <div className="ud-sidebar__user">
            <div className="ud-sidebar__avatar">{initials(USER_DATA.name)}</div>
            <div className="ud-sidebar__user-info">
              <div className="ud-sidebar__user-name">{USER_DATA.name}</div>
              <div className="ud-sidebar__user-email">{USER_DATA.email}</div>
            </div>
          </div>
          <button
            className="ud-nav__item"
            style={{ color:"rgba(255,212,184,0.5)", marginTop:"0.25rem" }}
            onClick={() => alert("Logout (connect to your API)")}
          >
            <span className="ud-nav__icon">{Icons.logout(18,"rgba(255,212,184,0.5)")}</span>
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {/* ══════════════ MAIN ══════════════ */}
      <main className="ud-main">

        {/* Top bar */}
        <div className="ud-topbar">
          <div className="ud-topbar__left">
            <h1 className="ud-topbar__title">{navTitles[activeNav]}</h1>
            <span className="ud-topbar__breadcrumb">LibraryHub › {navTitles[activeNav]}</span>
          </div>
          <div className="ud-topbar__right">
            <div className="ud-search">
              {Icons.search(14,"#C4956A")}
              <input placeholder="Search..." />
            </div>
            <button className="ud-icon-btn" onClick={() => setActiveNav("notifications")}>
              {Icons.bell(16)}
              <span className="ud-icon-btn__dot" />
            </button>
            <button className="ud-icon-btn" onClick={() => setActiveNav("profile")}>
              {Icons.user(16)}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="ud-content">

          {activeNav === "dashboard" && (
            <DashboardSection stats={stats} onQuickNav={setActiveNav} />
          )}

          {activeNav === "browse" && (
            <BrowseSection books={mockBrowseBooks} onBookClick={setSelectedBook} />
          )}

          {activeNav === "borrowed" && (
            <BorrowedSection
              books={mockBorrowedBooks}
              onReturn={handleReturn}
              onRenew={handleRenew}
            />
          )}

          {activeNav === "history" && (
            <HistorySection history={mockHistory} />
          )}

          {activeNav === "membership" && (
            <MembershipSection />
          )}

          {activeNav === "favorites" && (
            <div className="ud-card">
              <div className="ud-card__header">
                <div className="ud-card__title-wrap">
                  {Icons.heart(18,"#FF9B7A")}
                  <div className="ud-card__title">My Favorites</div>
                </div>
              </div>
              <div className="ud-card__body">
                <div className="ud-empty">
                  <div className="ud-empty__icon">{Icons.heart(40,"#C4956A")}</div>
                  <p className="ud-empty__text">No favorite books yet. Start adding books you love!</p>
                </div>
              </div>
            </div>
          )}

          {activeNav === "notifications" && (
            <NotificationsSection notifications={mockNotifications} />
          )}

          {activeNav === "profile" && (
            <ProfileSection user={USER_DATA} onUpdateProfile={handleUpdateProfile} />
          )}

          {activeNav === "settings" && (
            <SettingsSection onChangePassword={() => setShowChangePassword(true)} />
          )}

        </div>
      </main>

      {/* ══════ MODALS ══════ */}
      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        onAction={handleBookAction}
      />
      {showChangePassword && (
        <ChangePasswordModal
          onClose={() => setShowChangePassword(false)}
          onSave={handleChangePassword}
        />
      )}

      {/* ══════ TOASTS ══════ */}
      <Toast toasts={toasts} />

    </div>
  );
};

export default UserDashboard;
