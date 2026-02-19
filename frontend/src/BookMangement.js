import { useState, useMemo } from "react";
import "./BookMangement.css";

/* ── DATA ── */
const INITIAL_BOOKS = [
  { id:1, title:"The Alchemist", series:"", description:"A young shepherd travels from Spain to the Egyptian desert in search of treasure buried near the Pyramids. Along the way he meets mentors, falls in love and learns the true importance of who he is.", pages:197, publicationDate:"1988-04-01", language:"English", rating:4.2, ratings:2140000, imageURL:"", genre:"Fiction", author:"Paulo Coelho", publisher:"Harper Collins", availability:3 },
  { id:2, title:"Atomic Habits", series:"", description:"No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear reveals practical strategies to form good habits, break bad ones, and master tiny behaviours that lead to remarkable results.", pages:320, publicationDate:"2018-10-16", language:"English", rating:4.7, ratings:980000, imageURL:"", genre:"Non-Fiction", author:"James Clear", publisher:"Penguin", availability:0 },
  { id:3, title:"Sapiens", series:"Homo Sapiens Series #1", description:"A brief history of humankind from the Stone Age to the twenty-first century. Harari weaves together insights from biology, anthropology, paleontology, and economics.", pages:443, publicationDate:"2011-01-01", language:"English", rating:4.4, ratings:1230000, imageURL:"", genre:"History", author:"Yuval Noah Harari", publisher:"Harper Collins", availability:2 },
  { id:4, title:"Dune", series:"Dune Chronicles #1", description:"Set on the desert planet Arrakis, Dune is the story of Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the spice melange.", pages:688, publicationDate:"1965-08-01", language:"English", rating:4.5, ratings:1100000, imageURL:"", genre:"Fantasy", author:"Frank Herbert", publisher:"Ace Books", availability:0 },
  { id:5, title:"Deep Work", series:"", description:"Rules for focused success in a distracted world. Newport argues that the ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable.", pages:296, publicationDate:"2016-01-05", language:"English", rating:4.3, ratings:410000, imageURL:"", genre:"Non-Fiction", author:"Cal Newport", publisher:"Grand Central", availability:5 },
  { id:6, title:"Clean Code", series:"Robert C. Martin Series", description:"A handbook of agile software craftsmanship. Even bad code can function, but if code isn't clean it can bring a development organization to its knees.", pages:464, publicationDate:"2008-08-01", language:"English", rating:4.3, ratings:310000, imageURL:"", genre:"Technology", author:"Robert C. Martin", publisher:"Prentice Hall", availability:4 },
  { id:7, title:"The Psychology of Money", series:"", description:"Timeless lessons on wealth, greed, and happiness. Doing well with money isn't necessarily about what you know — it's about how you behave.", pages:242, publicationDate:"2020-09-08", language:"English", rating:4.4, ratings:720000, imageURL:"", genre:"Non-Fiction", author:"Morgan Housel", publisher:"Harriman House", availability:1 },
  { id:8, title:"1984", series:"", description:"A dystopian novel set in a totalitarian future society where Big Brother watches everyone. Winston Smith secretly hates the Party and seeks love and truth in a world of lies.", pages:328, publicationDate:"1949-06-08", language:"English", rating:4.7, ratings:3800000, imageURL:"", genre:"Fiction", author:"George Orwell", publisher:"Penguin", availability:0 },
];

const INITIAL_MEMBERS = [
  { id:1, emoji:"👨", name:"Ravi Kumar",   memberId:"MEM-0023", plan:"Premium",  borrowed:3, returned:12, fine:280,  status:"active" },
  { id:2, emoji:"👩", name:"Priya Nair",   memberId:"MEM-0047", plan:"Standard", borrowed:1, returned:8,  fine:180,  status:"active" },
  { id:3, emoji:"🧑", name:"Arjun Singh",  memberId:"MEM-0091", plan:"Basic",    borrowed:0, returned:5,  fine:0,    status:"active" },
  { id:4, emoji:"👩", name:"Meena Pillai", memberId:"MEM-0012", plan:"Premium",  borrowed:5, returned:21, fine:0,    status:"active" },
  { id:5, emoji:"👨", name:"Kiran Reddy",  memberId:"MEM-0064", plan:"Standard", borrowed:2, returned:7,  fine:60,   status:"suspended" },
  { id:6, emoji:"🧑", name:"Swati Joshi",  memberId:"MEM-0033", plan:"Basic",    borrowed:0, returned:3,  fine:0,    status:"expired" },
];

const PENALTIES = [
  { member:"Ravi Kumar", memberId:"MEM-0023", book:"The Alchemist", author:"Paulo Coelho", dueDate:"Feb 05, 2026", daysOverdue:14, fine:280, status:"Unpaid" },
  { member:"Priya Nair",  memberId:"MEM-0047", book:"Atomic Habits", author:"James Clear",   dueDate:"Feb 10, 2026", daysOverdue:9,  fine:180, status:"Pending" },
  { member:"Arjun Singh", memberId:"MEM-0091", book:"1984",          author:"George Orwell", dueDate:"Jan 28, 2026", daysOverdue:22, fine:440, status:"Waived" },
];

const HISTORY = [
  { member:"Ravi Kumar",   book:"The Alchemist",       author:"Paulo Coelho",    genre:"Fiction",     borrowDate:"Feb 02", dueDate:"Feb 16", returnDate:"—",    fine:280, status:"overdue" },
  { member:"Priya Nair",   book:"Atomic Habits",        author:"James Clear",     genre:"Non-Fiction", borrowDate:"Feb 11", dueDate:"Feb 25", returnDate:"—",    fine:0,   status:"active" },
  { member:"Meena Pillai", book:"Dune",                 author:"Frank Herbert",   genre:"Fantasy",     borrowDate:"Feb 05", dueDate:"Feb 19", returnDate:"Feb 18", fine:0, status:"returned" },
  { member:"Kiran Reddy",  book:"Deep Work",            author:"Cal Newport",     genre:"Non-Fiction", borrowDate:"Jan 20", dueDate:"Feb 03", returnDate:"—",    fine:60,  status:"overdue" },
  { member:"Swati Joshi",  book:"Sapiens",              author:"Yuval N. Harari", genre:"History",     borrowDate:"Jan 15", dueDate:"Jan 29", returnDate:"Jan 28", fine:0, status:"returned" },
];

const MY_BORROWED = [
  { emoji:"📙", title:"Atomic Habits",       series:"",             author:"James Clear",     genre:"Non-Fiction", pages:320, rating:4.7, borrowDate:"Feb 11", dueDate:"Feb 25", returnDate:null, fine:0,  status:"active" },
  { emoji:"📘", title:"The Midnight Library", series:"Standalone",  author:"Matt Haig",       genre:"Fiction",     pages:288, rating:4.1, borrowDate:"Feb 19", dueDate:"Mar 05", returnDate:null, fine:0,  status:"active" },
  { emoji:"📗", title:"Deep Work",           series:"",             author:"Cal Newport",     genre:"Non-Fiction", pages:296, rating:4.3, borrowDate:"Jan 20", dueDate:"Jan 30", returnDate:null, fine:40, status:"overdue" },
  { emoji:"📕", title:"Sapiens",             series:"",             author:"Yuval N. Harari", genre:"History",     pages:443, rating:4.4, borrowDate:"Jan 08", dueDate:"Jan 22", returnDate:"Jan 28", fine:0, status:"returned" },
];

const BOOK_EMOJIS = ["📘","📗","📙","📕","📒","📓","📔","📃"];
const GENRES = ["Fiction","Non-Fiction","Science","History","Technology","Mystery","Biography","Fantasy","Self-Help"];
const LANGUAGES = ["English","Tamil","Hindi","French","Spanish"];
const PUBLISHERS = ["Penguin","Harper Collins","Oxford Press","Random House","Ace Books","Prentice Hall","Grand Central","Harriman House"];
const PLANS = ["Basic — Free (2 books)","Standard — ₹150/mo (4 books)","Premium — ₹250/mo (8 books)"];

/* ── ROLE CONFIG ── */
const ROLES = {
  admin:     { init:"SA", name:"Sarah Admin",  label:"Administrator" },
  librarian: { init:"LJ", name:"Lena James",   label:"Librarian" },
  user:      { init:"RK", name:"Ravi Kumar",   label:"Member" },
};

/* ── SMALL UTILS ── */
const cs = (...a) => a.filter(Boolean).join(" ");
const fmt = (n) => n ? n.toLocaleString() : "—";

function Stars({ rating }) {
  return (
    <span style={{ display:"flex", alignItems:"center", gap:3 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? "#FF9B7A" : "#D4C5B5", fontSize:11 }}>★</span>
      ))}
      <span style={{ fontFamily:"'Lora', serif", fontSize:11, color:"#8B6F47", marginLeft:2 }}>{rating}</span>
    </span>
  );
}

function Badge({ color="gold", children }) {
  const map = {
    gold:   { bg:"rgba(255, 155, 122, 0.15)",  color:"#FF9B7A",   border:"rgba(255, 155, 122, 0.3)" },
    green:  { bg:"rgba(76, 175, 138, 0.15)",   color:"#4CAF8A",   border:"rgba(76, 175, 138, 0.3)" },
    red:    { bg:"rgba(224, 92, 92, 0.15)",    color:"#E05C5C",   border:"rgba(224, 92, 92, 0.3)"  },
    amber:  { bg:"rgba(224, 148, 58, 0.15)",   color:"#E0943A",   border:"rgba(224, 148, 58, 0.3)" },
    blue:   { bg:"rgba(91, 141, 238, 0.15)",   color:"#5B8DEE",   border:"rgba(91, 141, 238, 0.3)" },
    purple: { bg:"rgba(167, 139, 250, 0.15)",  color:"#A78BFA",   border:"rgba(167, 139, 250, 0.3)" },
  };
  const s = map[color] || map.gold;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", padding:"3px 8px", borderRadius:20, fontSize:11, fontWeight:600, background:s.bg, color:s.color, border:`1px solid ${s.border}` }}>
      {children}
    </span>
  );
}

function Btn({ variant="outline", size="md", onClick, disabled, children, style={} }) {
  const base = { display:"inline-flex", alignItems:"center", gap:6, borderRadius:"6px", fontFamily:"'Lora', serif", fontWeight:600, cursor:disabled?"not-allowed":"pointer", border:"none", transition:"all .18s", opacity:disabled?.45:1, ...style };
  const pad = size==="sm" ? { padding:"5px 10px", fontSize:11 } : { padding:"8px 16px", fontSize:13 };
  const vars = {
    gold:    { background:"#FF9B7A", color:"white" },
    outline: { background:"transparent", border:"1px solid rgba(255, 155, 122, 0.3)", color:"#8B6F47" },
    danger:  { background:"rgba(224, 92, 92, 0.15)", border:"1px solid rgba(224, 92, 92, 0.3)", color:"#E05C5C" },
  };
  return <button style={{ ...base, ...pad, ...(vars[variant]||vars.outline) }} onClick={onClick} disabled={disabled}>{children}</button>;
}

function StatCard({ icon, value, label, change, changeType="up", className="" }) {
  const c = { up:"#4CAF8A", warn:"#E0943A", danger:"#E05C5C" };
  return (
    <div className={cs("fade-up", className)} style={{ background:"white", border:"1px solid rgba(255, 155, 122, 0.15)", borderRadius:"10px", padding:18 }}>
      <div style={{ fontSize:20, marginBottom:10 }}>{icon}</div>
      <div style={{ fontFamily:"'Lora', serif", fontSize:26, fontWeight:600, color:"#FF9B7A" }}>{value}</div>
      <div style={{ color:"#8B6F47", fontSize:12, marginTop:5 }}>{label}</div>
      {change && <div style={{ fontSize:11, marginTop:7, color: c[changeType] }}>{change}</div>}
    </div>
  );
}

function Toast({ msg, show }) {
  return (
    <div style={{
      position:"fixed", bottom:22, right:22, zIndex:500,
      background:"#5D4E37", border:"1px solid rgba(93, 78, 55, 0.3)", borderRadius:"10px",
      padding:"12px 18px", fontSize:13, display:"flex", alignItems:"center", gap:8, color:"white",
      boxShadow:"0 8px 32px rgba(0,0,0,.2)", maxWidth:320,
      transform: show ? "translateY(0)" : "translateY(90px)",
      transition:"transform .3s ease", pointerEvents:"none",
    }}>
      {msg}
    </div>
  );
}

function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div onClick={e => e.target===e.currentTarget && onClose()} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.8)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:16, backdropFilter:"blur(5px)" }}>
      <div style={{ background:"var(--surf)", border:"1px solid var(--bdr2)", borderRadius:16, width:640, maxHeight:"90vh", overflowY:"auto", animation:"fadeUp .25s ease" }}>
        <div style={{ padding:"22px 26px 18px", borderBottom:"1px solid var(--bdr)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:19 }}>{title}</h2>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"var(--t3)", cursor:"pointer", fontSize:19, padding:4 }}>✕</button>
        </div>
        <div style={{ padding:"22px 26px" }}>{children}</div>
        {footer && <div style={{ padding:"14px 26px 22px", borderTop:"1px solid var(--bdr)", display:"flex", gap:8, justifyContent:"flex-end" }}>{footer}</div>}
      </div>
    </div>
  );
}

function FormGroup({ label, hint, children }) {
  return (
    <div style={{ marginBottom:14 }}>
      <label style={{ display:"block", fontSize:11, fontWeight:600, color:"var(--t2)", textTransform:"uppercase", letterSpacing:".8px", marginBottom:5 }}>{label}</label>
      {children}
      {hint && <div style={{ fontSize:11, color:"var(--t3)", marginTop:4 }}>{hint}</div>}
    </div>
  );
}

const inputStyle = { width:"100%", background:"white", border:"2px solid rgba(255, 155, 122, 0.2)", color:"#5D4E37", padding:"10px 12px", borderRadius:"6px", fontSize:13, fontFamily:"'Lora', serif", outline:"none" };

function Input({ ...props }) { return <input className="form-input" {...props} />; }
function Select({ options, ...props }) {
  return (
    <select className="form-select" {...props}>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}
function Textarea({ ...props }) { return <textarea className="form-textarea" {...props} />; }

/* ── DETAIL PANEL (deprecated for new design) ── */
function DetailPanel({ book, open, onClose, role, onEdit, onBorrow }) {
  return null;
}

/* ── EDIT BOOK MODAL (deprecated for new design) ── */
function EditBookModal({ book, open, onClose, onSave }) {
  return null;
}

/* ── BOOK CATALOG ── */
function BookCatalog({ books, setBooks, role, onAddBook, toast }) {
  const [search, setSearch] = useState("");
  const [availFilter, setAvailFilter] = useState("all");
  const [genre, setGenre] = useState("");
  const isUser = role === "user";

  const filtered = useMemo(() => {
    let d = books.filter(b => {
      if (availFilter === "available" && b.availability <= 0) return false;
      if (availFilter === "unavailable" && b.availability > 0) return false;
      if (genre && b.genre !== genre) return false;
      if (search) {
        const hay = [b.title, b.author, b.genre, b.publisher, b.series || "", b.language].join(" ").toLowerCase();
        if (!hay.includes(search.toLowerCase())) return false;
      }
      return true;
    });
    return [...d].sort((a, b) => a.title.localeCompare(b.title));
  }, [books, search, availFilter, genre]);

  const totalCopies = books.reduce((s, b) => s + b.availability, 0);
  const outOfStock = books.filter(b => b.availability === 0).length;
  const avgRating = (books.reduce((s, b) => s + b.rating, 0) / books.length).toFixed(1);

  return (
    <div>
      <div className="content-header">
        <h1 className="content-title">📚 Book Catalog</h1>
        <p className="content-subtitle">Explore our complete library collection</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-value">{books.length}</div>
          <div className="stat-label">Total Books</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{totalCopies}</div>
          <div className="stat-label">Available Copies</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📤</div>
          <div className="stat-value">{outOfStock}</div>
          <div className="stat-label">Out of Stock</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{avgRating}</div>
          <div className="stat-label">Avg Rating</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-container">
        <input 
          type="text"
          className="search-box"
          placeholder="🔍 Search by title, author, genre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <div className="filter-group">
          <label className="filter-label">Availability:</label>
          {[["all", "All"], ["available", "Available"], ["unavailable", "Out of Stock"]].map(([val, label]) => (
            <button
              key={val}
              className={`btn btn-small ${availFilter === val ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setAvailFilter(val)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <label className="filter-label">Genre:</label>
          <select 
            className="filter-select"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        {!isUser && (
          <button className="btn btn-primary" onClick={onAddBook}>
            ➕ Add Book
          </button>
        )}
      </div>

      {/* Book Grid */}
      <div className="book-section">
        <div className="book-grid">
          {filtered.map((book, idx) => (
            <div key={book.id} className="book-card">
              <div className="book-icon">{BOOK_EMOJIS[idx % BOOK_EMOJIS.length]}</div>
              <div className="book-title">{book.title}</div>
              <div className="book-author">{book.author}</div>
              <div className="book-meta">
                <span>{book.genre}</span>
                <span>•</span>
                <span>{book.pages} pages</span>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <div style={{ fontSize: "12px", color: "#8B6F47", marginBottom: "4px" }}>
                  ⭐ {book.rating} ({fmt(book.ratings)} reviews)
                </div>
              </div>
              <div className={`book-badge ${book.availability > 0 ? "available" : "unavailable"}`}>
                {book.availability > 0 ? `${book.availability} Available` : "Unavailable"}
              </div>
              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                {book.availability > 0 ? (
                  <button 
                    className="btn btn-primary btn-small"
                    style={{ flex: 1 }}
                    onClick={() => toast("📖 Borrow request sent!")}
                  >
                    Borrow
                  </button>
                ) : (
                  <button 
                    className="btn btn-secondary btn-small"
                    style={{ flex: 1, opacity: 0.5, cursor: "not-allowed" }}
                    disabled
                  >
                    Unavailable
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── ADD BOOK FORM ── */
function AddBookForm({ role, toast, onBack }) {
  const isUser = role === "user";
  const [form, setForm] = useState({ title:"", series:"", author:"", publisher:"", genre:"Fiction", language:"English", publicationDate:"", pages:"", rating:"", ratings:"", imageURL:"", availability:"", description:"" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div>
      <div className="content-header">
        <h1 className="content-title">➕ Add New Book</h1>
        <p className="content-subtitle">Add a new book to the library catalog</p>
      </div>

      {isUser ? (
        <div className="book-section">
          <div style={{ background: "rgba(224, 92, 92, 0.1)", border: "1px solid rgba(224, 92, 92, 0.2)", borderRadius: "10px", padding: "20px", display: "flex", alignItems: "center", gap: "16px", fontSize: "16px" }}>
            <span style={{ fontSize: "24px" }}>🔒</span>
            <div>
              <strong style={{ color: "#E05C5C" }}>Access Restricted</strong>
              <p style={{ color: "#8B6F47", fontSize: "14px", marginTop: "4px" }}>Only Admins and Librarians can add or edit books.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="book-section">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input type="text" className="form-input" value={form.title} onChange={e=>set("title",e.target.value)} placeholder="e.g. The Great Gatsby" />
            </div>
            <div className="form-group">
              <label className="form-label">Series</label>
              <input type="text" className="form-input" value={form.series} onChange={e=>set("series",e.target.value)} placeholder="e.g. Dune Chronicles #1" />
              <p className="form-hint">Leave blank for standalone books</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div className="form-group">
              <label className="form-label">Author *</label>
              <input type="text" className="form-input" value={form.author} onChange={e=>set("author",e.target.value)} placeholder="Author full name" />
            </div>
            <div className="form-group">
              <label className="form-label">Publisher</label>
              <input type="text" className="form-input" value={form.publisher} onChange={e=>set("publisher",e.target.value)} placeholder="Publisher name" />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div className="form-group">
              <label className="form-label">Genre</label>
              <select value={form.genre} onChange={e=>set("genre",e.target.value)} className="form-select">
                {GENRES.map(g=><option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Language</label>
              <select value={form.language} onChange={e=>set("language",e.target.value)} className="form-select">
                {LANGUAGES.map(l=><option key={l}>{l}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Publication Date</label>
              <input type="date" className="form-input" value={form.publicationDate} onChange={e=>set("publicationDate",e.target.value)} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div className="form-group">
              <label className="form-label">Pages</label>
              <input type="number" className="form-input" value={form.pages} onChange={e=>set("pages",e.target.value)} placeholder="e.g. 320" min="1" />
            </div>
            <div className="form-group">
              <label className="form-label">Rating (0.0–5.0)</label>
              <input type="number" className="form-input" value={form.rating} onChange={e=>set("rating",e.target.value)} placeholder="e.g. 4.3" min="0" max="5" step="0.1" />
            </div>
            <div className="form-group">
              <label className="form-label">No. of Ratings</label>
              <input type="number" className="form-input" value={form.ratings} onChange={e=>set("ratings",e.target.value)} placeholder="e.g. 12400" min="0" />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div className="form-group">
              <label className="form-label">Image URL</label>
              <input type="url" className="form-input" value={form.imageURL} onChange={e=>set("imageURL",e.target.value)} placeholder="https://..." />
              <p className="form-hint">Direct link to book cover image</p>
            </div>
            <div className="form-group">
              <label className="form-label">Availability (copies) *</label>
              <input type="number" className="form-input" value={form.availability} onChange={e=>set("availability",e.target.value)} placeholder="e.g. 3" min="0" />
              <p className="form-hint">Number of physical copies available</p>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description ({form.description.length}/2000)</label>
            <textarea className="form-textarea" value={form.description} onChange={e=>set("description",e.target.value.slice(0,2000))} placeholder="Synopsis or description of the book..." />
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button className="btn btn-primary" onClick={() => { toast("✅ Book saved to catalog!"); onBack(); }}>
              💾 Save Book
            </button>
            <button className="btn btn-secondary" onClick={onBack}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── MEMBERS ── */
function Members({ role, toast }) {
  const [members] = useState(INITIAL_MEMBERS);
  const isUser = role === "user";

  return (
    <div>
      <div className="content-header">
        <h1 className="content-title">👥 Members</h1>
        <p className="content-subtitle">Manage library membership and member information</p>
      </div>

      {isUser ? (
        <div className="book-section">
          <div style={{ background: "rgba(224, 92, 92, 0.1)", border: "1px solid rgba(224, 92, 92, 0.2)", borderRadius: "10px", padding: "20px", display: "flex", alignItems: "center", gap: "16px", fontSize: "16px" }}>
            <span style={{ fontSize: "24px" }}>🔒</span>
            <div>
              <strong style={{ color: "#E05C5C" }}>Access Restricted</strong>
              <p style={{ color: "#8B6F47", fontSize: "14px", marginTop: "4px" }}>Only Admins and Librarians can view member data.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="book-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🧑‍🤝‍🧑</div>
              <div className="stat-value">1,204</div>
              <div className="stat-label">Total Members</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💎</div>
              <div className="stat-value">347</div>
              <div className="stat-label">Premium Members</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⚠️</div>
              <div className="stat-value">₹12,400</div>
              <div className="stat-label">Pending Fines</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "24px" }}>
            {members.map(m => (
              <div key={m.id} className="book-card" style={{ background: "white", border: "1px solid rgba(255, 155, 122, 0.15)" }}>
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>{m.emoji}</div>
                <div className="book-title" style={{ fontSize: "16px" }}>{m.name}</div>
                <div className="book-author" style={{ marginBottom: "8px" }}>{m.memberId}</div>
                <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
                  <span className="book-badge" style={{ background: "rgba(255, 155, 122, 0.15)", color: "#FF9B7A" }}>{m.plan}</span>
                  <span className={`book-badge ${m.status === "active" ? "available" : ""}`}>{m.status}</span>
                </div>
                {m.fine > 0 && (
                  <div style={{ background: "rgba(224, 92, 92, 0.1)", border: "1px solid rgba(224, 92, 92, 0.2)", borderRadius: "6px", padding: "6px 10px", fontSize: "12px", color: "#E05C5C", marginBottom: "10px" }}>
                    ⚠️ Fine: ₹{m.fine}
                  </div>
                )}
                <div style={{ display: "flex", gap: "10px", marginTop: "12px", fontSize: "12px" }}>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ fontSize: "18px", fontWeight: "600" }}>{m.borrowed}</div>
                    <div style={{ fontSize: "10px", color: "#8B6F47", marginTop: "4px" }}>Active</div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ fontSize: "18px", fontWeight: "600" }}>{m.returned}</div>
                    <div style={{ fontSize: "10px", color: "#8B6F47", marginTop: "4px" }}>Returned</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── PENALTIES ── */
function Penalties({ role, toast }) {
  const isUser = role === "user";
  
  return (
    <div>
      <div className="content-header">
        <h1 className="content-title">⚠️ Penalties & Overdue</h1>
        <p className="content-subtitle">Track fines and overdue books</p>
      </div>

      {isUser ? (
        <div className="book-section">
          <div style={{ background: "rgba(224, 92, 92, 0.1)", border: "1px solid rgba(224, 92, 92, 0.2)", borderRadius: "10px", padding: "20px", display: "flex", alignItems: "center", gap: "16px", fontSize: "16px" }}>
            <span style={{ fontSize: "24px" }}>🔒</span>
            <div>
              <strong style={{ color: "#E05C5C" }}>Access Restricted</strong>
              <p style={{ color: "#8B6F47", fontSize: "14px", marginTop: "4px" }}>Only Admins and Librarians can view penalties.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="book-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">💸</div>
              <div className="stat-value">₹12,400</div>
              <div className="stat-label">Total Pending Fines</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏰</div>
              <div className="stat-value">38</div>
              <div className="stat-label">Overdue Books</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-value">₹45,200</div>
              <div className="stat-label">Collected This Month</div>
            </div>
          </div>

          <div style={{ marginTop: "24px", overflowX: "auto", borderRadius: "10px", border: "1px solid rgba(255, 155, 122, 0.15)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#FFF8F0", borderBottom: "2px solid rgba(255, 155, 122, 0.15)" }}>
                  {["Member", "Book Title", "Due Date", "Days Overdue", "Fine (₹)", "Status"].map(h => (
                    <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#8B6F47", fontWeight: "600" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PENALTIES.map((p, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255, 155, 122, 0.1)" }}>
                    <td style={{ padding: "12px 14px", fontWeight: "600", color: "#5D4E37" }}>{p.member}</td>
                    <td style={{ padding: "12px 14px", color: "#5D4E37" }}>{p.book}</td>
                    <td style={{ padding: "12px 14px", color: "#8B6F47", fontSize: "12px" }}>{p.dueDate}</td>
                    <td style={{ padding: "12px 14px", fontWeight: "600", color: "#E05C5C" }}>{p.overdue}</td>
                    <td style={{ padding: "12px 14px", fontWeight: "600", color: "#E05C5C" }}>₹{p.fine}</td>
                    <td style={{ padding: "12px 14px" }}>
                      <span className="book-badge unavailable">{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── HISTORY ── */
function BorrowingHistory({ role, toast }) {
  const isUser = role === "user";
  
  return (
    <div>
      <div className="content-header">
        <h1 className="content-title">🕐 Borrowing History</h1>
        <p className="content-subtitle">Complete transaction log across all members</p>
      </div>

      {isUser ? (
        <div className="book-section">
          <div style={{ background: "rgba(224, 92, 92, 0.1)", border: "1px solid rgba(224, 92, 92, 0.2)", borderRadius: "10px", padding: "20px", display: "flex", alignItems: "center", gap: "16px", fontSize: "16px" }}>
            <span style={{ fontSize: "24px" }}>🔒</span>
            <div>
              <strong style={{ color: "#E05C5C" }}>Access Restricted</strong>
              <p style={{ color: "#8B6F47", fontSize: "14px", marginTop: "4px" }}>Only Admins and Librarians can view all transactions.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="book-section">
          <div style={{ overflowX: "auto", borderRadius: "10px", border: "1px solid rgba(255, 155, 122, 0.15)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#FFF8F0", borderBottom: "2px solid rgba(255, 155, 122, 0.15)" }}>
                  {["Member", "Book", "Borrow Date", "Due Date", "Return Date", "Status", "Fine"].map(h => (
                    <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#8B6F47", fontWeight: "600" }}>{h}</th>

                  ))}
                </tr>
              </thead>
              <tbody>
                {HISTORY.map((h, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255, 155, 122, 0.1)" }}>
                    <td style={{ padding: "12px 14px", fontWeight: "600", color: "#5D4E37" }}>{h.member}</td>
                    <td style={{ padding: "12px 14px", color: "#5D4E37" }}>{h.book}</td>
                    <td style={{ padding: "12px 14px", fontSize: "12px", color: "#8B6F47" }}>{h.borrowDate}</td>
                    <td style={{ padding: "12px 14px", fontSize: "12px", color: "#8B6F47" }}>{h.dueDate}</td>
                    <td style={{ padding: "12px 14px", fontSize: "12px", color: "#8B6F47" }}>{h.returnDate || "—"}</td>
                    <td style={{ padding: "12px 14px" }}>
                      <span className={`book-badge ${h.status === "returned" ? "available" : h.status === "overdue" ? "unavailable" : ""}`}>
                        {h.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px", fontWeight: "600", color: h.fine ? "#E05C5C" : "#8B6F47" }}>
                      {h.fine ? `₹${h.fine}` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── MY BORROWED ── */
function MyBorrowed() {
  return (
    <div>
      <div className="content-header">
        <h1 className="content-title">📋 My Borrowed Books</h1>
        <p className="content-subtitle">Your personal borrowing history and due dates</p>
      </div>

      <div className="book-section">
        <div style={{ background: "rgba(76, 175, 138, 0.1)", border: "1px solid rgba(76, 175, 138, 0.2)", borderRadius: "10px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px", fontSize: "14px" }}>
          <span style={{ fontSize: "28px" }}>💎</span>
          <div>
            <div style={{ fontWeight: "600", color: "#5D4E37" }}>Premium Membership — Active</div>
            <div style={{ color: "#8B6F47", fontSize: "12px", marginTop: "3px" }}>Borrow up to 8 books · Valid until Aug 2026</div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{ fontSize: "24px", fontWeight: "600", color: "#FF9B7A" }}>3 / 8</div>
            <div style={{ fontSize: "11px", color: "#8B6F47", marginTop: "2px" }}>Books Active</div>
          </div>
        </div>

        <div style={{ overflowX: "auto", borderRadius: "10px", border: "1px solid rgba(255, 155, 122, 0.15)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#FFF8F0", borderBottom: "2px solid rgba(255, 155, 122, 0.15)" }}>
                {["Book", "Author", "Borrowed", "Due Date", "Status", "Fine"].map(h => (
                  <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#8B6F47", fontWeight: "600" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MY_BORROWED.map((b, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255, 155, 122, 0.1)" }}>
                  <td style={{ padding: "12px 14px", fontWeight: "600", color: "#5D4E37" }}>
                    <div>{b.title}</div>
                    <div style={{ fontSize: "11px", color: "#8B6F47", marginTop: "2px" }}>{b.emoji} {b.genre}</div>
                  </td>
                  <td style={{ padding: "12px 14px", color: "#5D4E37", fontSize: "13px" }}>{b.author}</td>
                  <td style={{ padding: "12px 14px", fontSize: "12px", color: "#8B6F47" }}>{b.borrowDate}</td>
                  <td style={{ padding: "12px 14px", fontSize: "12px", color: "#8B6F47", fontWeight: "600" }}>{b.dueDate}</td>
                  <td style={{ padding: "12px 14px" }}>
                    <span className={`book-badge ${b.status === "returned" ? "available" : b.status === "archived" ? "" : b.status}`}>
                      {b.status}
                    </span>
                  </td>
                  <td style={{ padding: "12px 14px", fontWeight: "600", color: b.fine ? "#E05C5C" : "#8B6F47" }}>
                    {b.fine ? `₹${b.fine}` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── TOPBAR HELPER (deprecated) ── */
function Topbar({ title, subtitle, children }) {
  return null;
}

/* ── SIDEBAR NAV ITEM (deprecated) ── */
function NavItem({ icon, label, active, locked, badge, onClick }) {
  return null;
}

/* ══════════════════════════════
   ROOT APP
══════════════════════════════ */
export default function App() {
  const [role, setRole] = useState("admin");
  const [section, setSection] = useState("books");
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [toast, setToastMsg] = useState("");
  const [toastShow, setToastShow] = useState(false);

  const showToast = (msg) => {
    setToastMsg(msg); setToastShow(true);
    setTimeout(() => setToastShow(false), 3000);
  };

  const switchRole = (r) => {
    setRole(r);
    const restricted = ["addbook","members","addmember","penalties","history"];
    if (r === "user" && restricted.includes(section)) setSection("books");
    showToast(`🔄 Switched to ${ROLES[r].label} view`);
  };

  const isUser = role === "user";
  const nav = [
    { id:"books", icon:"📖", label:"Book Catalog", section:"catalog" },
    { id:"addbook", icon:"➕", label:"Add Book", section:"catalog", adminOnly:true },
    { id:"members", icon:"👥", label:"Members", section:"members", adminOnly:true },
    { id:"addmember", icon:"🧑‍💼", label:"Add Member", section:"members", adminOnly:true },
    { id:"penalties", icon:"⚠️", label:"Penalties", badge:"3", section:"members", adminOnly:true },
    { id:"history", icon:"🕐", label:"All Transactions", section:"borrow", adminOnly:true },
    { id:"myborrowed", icon:"📋", label:"My Borrowed", section:"borrow", userOnly:true },
  ];

  const renderSection = () => {
    switch(section) {
      case "books": return <BookCatalog books={books} setBooks={setBooks} role={role} onAddBook={() => setSection("addbook")} toast={showToast} />;
      case "addbook": return <AddBookForm role={role} toast={showToast} onBack={() => setSection("books")} />;
      case "members": return <Members role={role} toast={showToast} />;
      case "addmember": return <Members role={role} toast={showToast} />;
      case "penalties": return <Penalties role={role} toast={showToast} />;
      case "history": return <BorrowingHistory role={role} toast={showToast} />;
      case "myborrowed": return <MyBorrowed />;
      default: return <BookCatalog books={books} setBooks={setBooks} role={role} onAddBook={() => setSection("addbook")} toast={showToast} />;
    }
  };

  return (
    <div className="book-management-page">
      <div className="book-management-bg">
        <div className="book-management-bg__shape book-management-bg__shape--1"></div>
        <div className="book-management-bg__shape book-management-bg__shape--2"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="nav-bar">
        <div className="nav-container">
          <a href="#" className="nav-brand">
            <span>📚</span> LibraryHub
          </a>

          <div className="nav-menu">
            <button 
              className={`nav-link ${section === "books" ? "active" : ""}`}
              onClick={() => setSection("books")}
            >
              📖 Catalog
            </button>
            
            {role !== "user" && (
              <>
                <button 
                  className={`nav-link ${section === "addbook" ? "active" : ""}`}
                  onClick={() => setSection("addbook")}
                >
                  ➕ Add Book
                </button>

                <button 
                  className={`nav-link ${section === "members" ? "active" : ""}`}
                  onClick={() => setSection("members")}
                >
                  👥 Members
                </button>

                <button 
                  className={`nav-link ${section === "penalties" ? "active" : ""}`}
                  onClick={() => setSection("penalties")}
                >
                  ⚠️ Penalties
                </button>

                <button 
                  className={`nav-link ${section === "history" ? "active" : ""}`}
                  onClick={() => setSection("history")}
                >
                  🕐 History
                </button>
              </>
            )}

            {role === "user" && (
              <button 
                className={`nav-link ${section === "myborrowed" ? "active" : ""}`}
                onClick={() => setSection("myborrowed")}
              >
                📋 My Books
              </button>
            )}

            <div className="nav-separator"></div>

            <select 
              className="nav-link"
              value={role} 
              onChange={(e) => switchRole(e.target.value)}
              style={{ padding: "6px 12px", cursor: "pointer" }}
            >
              <option value="user">User</option>
              <option value="librarian">Librarian</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="book-management-content">
        {renderSection()}
      </div>

      <Toast msg={toast} show={toastShow} />
    </div>
  );
}
