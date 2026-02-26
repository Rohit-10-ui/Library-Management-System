import React, { useState, useEffect, useCallback } from 'react';
import './BooksPage.css';

// ─── API ────────────────────────────────────────────────────────────────────
const BASE_URL = '/api';
const api = {
  getBooks: (params = {}) => {
    const q = new URLSearchParams();
    if (params.page !== undefined) q.set('page', params.page);
    if (params.size  !== undefined) q.set('size',  params.size);
    if (params.genre)     q.set('genre',     params.genre);
    if (params.author)    q.set('author',    params.author);
    if (params.publisher) q.set('publisher', params.publisher);
    if (params.title)     q.set('title',     params.title);
    if (params.sort)      params.sort.forEach(s => q.append('sort', s));
    return fetch(`${BASE_URL}/books?${q}`).then(r => r.json());
  },
  createBook:  (data)     => fetch(`${BASE_URL}/books`,       { method:'POST',   headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) }).then(r=>r.json()),
  updateBook:  (id, data) => fetch(`${BASE_URL}/books/${id}`, { method:'PUT',    headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) }).then(r=>r.json()),
  deleteBook:  (id)       => fetch(`${BASE_URL}/books/${id}`, { method:'DELETE' }),
  getIssues:   ()         => fetch(`${BASE_URL}/issues`).then(r=>r.json()),
  issueBook:   (data)     => fetch(`${BASE_URL}/issues`,      { method:'POST',   headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) }).then(r=>r.json()),
  returnBook:  (issueId)  => fetch(`${BASE_URL}/returns`,     { method:'POST',   headers:{'Content-Type':'application/json'}, body:JSON.stringify({issueId}) }).then(r=>r.json()),
};

// ─── Icons ──────────────────────────────────────────────────────────────────
const Ic = {
  Books:     ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke={c} strokeWidth="2"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke={c} strokeWidth="2"/></svg>,
  Search:    ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke={c} strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke={c} strokeWidth="2"/></svg>,
  Plus:      ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke={c} strokeWidth="2"/></svg>,
  Edit:      ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke={c} strokeWidth="2"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke={c} strokeWidth="2"/></svg>,
  Trash:     ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke={c} strokeWidth="2"/></svg>,
  Close:     ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke={c} strokeWidth="2"/></svg>,
  Eye:       ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={c} strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke={c} strokeWidth="2"/></svg>,
  Grid:      ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" stroke={c} strokeWidth="2"/><rect x="14" y="3" width="7" height="7" stroke={c} strokeWidth="2"/><rect x="3" y="14" width="7" height="7" stroke={c} strokeWidth="2"/><rect x="14" y="14" width="7" height="7" stroke={c} strokeWidth="2"/></svg>,
  List:      ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><line x1="8" y1="6" x2="21" y2="6" stroke={c} strokeWidth="2"/><line x1="8" y1="12" x2="21" y2="12" stroke={c} strokeWidth="2"/><line x1="8" y1="18" x2="21" y2="18" stroke={c} strokeWidth="2"/><line x1="3" y1="6" x2="3.01" y2="6" stroke={c} strokeWidth="2"/><line x1="3" y1="12" x2="3.01" y2="12" stroke={c} strokeWidth="2"/><line x1="3" y1="18" x2="3.01" y2="18" stroke={c} strokeWidth="2"/></svg>,
  ChevL:     ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke={c} strokeWidth="2"/></svg>,
  ChevR:     ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke={c} strokeWidth="2"/></svg>,
  Check:     ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke={c} strokeWidth="2"/></svg>,
  Refresh:   ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke={c} strokeWidth="2"/><path d="M3 3v5h5" stroke={c} strokeWidth="2"/></svg>,
  Star:      ({s=24,c="currentColor",f=false})=><svg width={s} height={s} viewBox="0 0 24 24" fill={f?c:"none"}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke={c} strokeWidth="2"/></svg>,
  Clock:     ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={c} strokeWidth="2"/><path d="M12 6v6l4 2" stroke={c} strokeWidth="2"/></svg>,
  Calendar:  ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke={c} strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke={c} strokeWidth="2"/></svg>,
  Dollar:    ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><line x1="12" y1="1" x2="12" y2="23" stroke={c} strokeWidth="2"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke={c} strokeWidth="2"/></svg>,
  Alert:     ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={c} strokeWidth="2"/><line x1="12" y1="8" x2="12" y2="12" stroke={c} strokeWidth="2"/><line x1="12" y1="16" x2="12.01" y2="16" stroke={c} strokeWidth="2"/></svg>,
  BookOpen:  ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke={c} strokeWidth="2"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke={c} strokeWidth="2"/></svg>,
  Globe:     ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={c} strokeWidth="2"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke={c} strokeWidth="2"/></svg>,
  Tag:       ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke={c} strokeWidth="2"/><line x1="7" y1="7" x2="7.01" y2="7" stroke={c} strokeWidth="2"/></svg>,
  Package:   ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21" stroke={c} strokeWidth="2"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke={c} strokeWidth="2"/><polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke={c} strokeWidth="2"/><line x1="12" y1="22.08" x2="12" y2="12" stroke={c} strokeWidth="2"/></svg>,
  Loader:    ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" className="spin-icon"><path d="M21 12a9 9 0 1 1-6.219-8.56" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
  Bookmark:  ({s=24,c="currentColor",f=false})=><svg width={s} height={s} viewBox="0 0 24 24" fill={f?c:"none"}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke={c} strokeWidth="2"/></svg>,
  User:      ({s=24,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={c} strokeWidth="2"/><circle cx="12" cy="7" r="4" stroke={c} strokeWidth="2"/></svg>,
};

const Skeleton = () => (
  <div className="book-card sk-card">
    <div className="sk sk-cover"/><div className="book-info">
      <div className="sk sk-h sk-title"/><div className="sk sk-h sk-auth"/>
      <div className="sk sk-h sk-meta"/><div className="sk sk-h sk-rate"/><div className="sk sk-h sk-btn"/>
    </div>
  </div>
);

// ─── Main ────────────────────────────────────────────────────────────────────
/**
 * BooksPage
 * @param {{ role:'admin'|'librarian'|'user', userId:number, userName:string }} props
 */
const BooksPage = ({ role='admin', userId=1, userName='Admin User' }) => {
  const isStaff = role==='admin' || role==='librarian';

  const [tab,          setTab]          = useState('catalog');
  const [books,        setBooks]        = useState([]);
  const [totalBooks,   setTotalBooks]   = useState(0);
  const [totalPages,   setTotalPages]   = useState(0);
  const [loading,      setLoading]      = useState(false);
  const [actionLoad,   setActionLoad]   = useState(false);
  const [issues,       setIssues]       = useState([]);
  const [issLoad,      setIssLoad]      = useState(false);
  const [wishlist,     setWishlist]     = useState([]);

  const [search,     setSearch]     = useState('');
  const [dbSearch,   setDbSearch]   = useState('');
  const [selGenres,  setSelGenres]  = useState(['all']);
  const [selPubs,    setSelPubs]    = useState(['all']);
  const [selAuths,   setSelAuths]   = useState(['all']);
  const [avail,      setAvail]      = useState('all');
  const [minRating,  setMinRating]  = useState(0);
  const [yearFrom,   setYearFrom]   = useState('');
  const [yearTo,     setYearTo]     = useState('');
  const [sortBy,     setSortBy]     = useState('title,asc');
  const [viewMode,   setViewMode]   = useState('grid');
  const [pg,         setPg]         = useState(0);
  const PS = 12;

  const [issuedFil,  setIssuedFil]  = useState('active');
  const [recsFil,    setRecsFil]    = useState('all');

  const [detailBook, setDetailBook] = useState(null);
  const [formBook,   setFormBook]   = useState(null);
  const [isEdit,     setIsEdit]     = useState(false);
  const [showForm,   setShowForm]   = useState(false);
  const [issueBook,  setIssueBook]  = useState(null);
  const [confirmFn,  setConfirmFn]  = useState(null);
  const [showConfirm,setShowConfirm]= useState(false);
  const [toast,      setToast]      = useState({show:false,msg:'',type:'success'});

  const members = [
    {id:1,name:'John Doe',    status:'active',membershipType:'premium'},
    {id:2,name:'Jane Smith',  status:'active',membershipType:'standard'},
    {id:3,name:'Mike Johnson',status:'active',membershipType:'basic'},
  ];

  // debounce
  useEffect(()=>{const t=setTimeout(()=>{setDbSearch(search);setPg(0);},400);return()=>clearTimeout(t);},[search]);

  const fetchBooks = useCallback(async()=>{
    setLoading(true);
    try{
      const p={page:pg,size:PS,sort:[sortBy]};
      if(dbSearch)                  p.title     = dbSearch;
      if(!selGenres.includes('all')) p.genre     = selGenres[0];
      if(!selPubs.includes('all'))   p.publisher = selPubs[0];
      if(!selAuths.includes('all'))  p.author    = selAuths[0];
      const d=await api.getBooks(p);
      if(Array.isArray(d)){setBooks(d);setTotalBooks(d.length);setTotalPages(Math.ceil(d.length/PS));}
      else{setBooks(d.content||[]);setTotalBooks(d.totalElements||0);setTotalPages(d.totalPages||1);}
    }catch{fallbackBooks();}
    finally{setLoading(false);}
  },[pg,sortBy,dbSearch,selGenres,selPubs,selAuths]);

  const fetchIssues = useCallback(async()=>{
    setIssLoad(true);
    try{const d=await api.getIssues();setIssues(Array.isArray(d)?d:[]);}
    catch{fallbackIssues();}
    finally{setIssLoad(false);}
  },[]);

  useEffect(()=>{fetchBooks();},[fetchBooks]);
  useEffect(()=>{fetchIssues();},[fetchIssues]);

  const fallbackBooks=()=>{
    const d=[
      {id:1,title:'The Great Gatsby',       author:'F. Scott Fitzgerald',publisher:'Scribner',      publicationDate:'1925-04-10',pages:180,genre:'Classic Literature',availability:3, imageURL:'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', rating:4.5,ratings:12000, language:'English',mrp:399, description:'A classic American novel set in the Jazz Age.'},
      {id:2,title:'Sapiens',                 author:'Yuval Noah Harari',  publisher:'Harper',        publicationDate:'2011-09-04',pages:443,genre:'History',           availability:6, imageURL:'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',rating:4.8,ratings:87000, language:'English',mrp:599, description:'A brief history of humankind.'},
      {id:3,title:'A Brief History of Time', author:'Stephen Hawking',    publisher:'Bantam',        publicationDate:'1988-04-01',pages:256,genre:'Cosmology',         availability:2, imageURL:'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400', rating:4.6,ratings:45000, language:'English',mrp:499, description:'An exploration of cosmology and the nature of time.'},
      {id:4,title:'Clean Code',              author:'Robert C. Martin',   publisher:'Prentice Hall', publicationDate:'2008-08-11',pages:464,genre:'Programming',       availability:8, imageURL:'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',rating:4.7,ratings:23000, language:'English',mrp:749, description:'A handbook of agile software craftsmanship.'},
      {id:5,title:'1984',                    author:'George Orwell',      publisher:'Signet Classic',publicationDate:'1949-06-08',pages:328,genre:'Dystopian',         availability:0, imageURL:'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',rating:4.9,ratings:156000,language:'English',mrp:349, description:'A dystopian social science fiction novel.'},
      {id:6,title:'Atomic Habits',           author:'James Clear',        publisher:'Penguin',       publicationDate:'2018-10-16',pages:320,genre:'Self Help',         availability:10,imageURL:'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',rating:4.8,ratings:98000, language:'English',mrp:499, description:'An easy & proven way to build good habits.'},
      {id:7,title:'The Alchemist',           author:'Paulo Coelho',       publisher:'HarperOne',     publicationDate:'1988-01-01',pages:208,genre:'Fiction',           availability:5, imageURL:'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400',rating:4.7,ratings:203000,language:'English',mrp:349, description:'A journey of self-discovery.'},
      {id:8,title:'Deep Work',               author:'Cal Newport',        publisher:'Grand Central', publicationDate:'2016-01-05',pages:296,genre:'Self Help',         availability:4, imageURL:'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=400',rating:4.6,ratings:31000, language:'English',mrp:449, description:'Rules for focused success in a distracted world.'},
    ];
    setBooks(d);setTotalBooks(d.length);setTotalPages(1);
  };
  const fallbackIssues=()=>setIssues([
    {id:1,bookId:1,bookTitle:'The Great Gatsby',       userId:1,memberName:'John Doe',  issueDate:'2024-01-15',dueDate:'2024-02-15',returnDate:null,        status:'borrowed',daysOverdue:0, lateFee:0},
    {id:2,bookId:2,bookTitle:'Sapiens',                 userId:2,memberName:'Jane Smith',issueDate:'2023-12-20',dueDate:'2024-01-20',returnDate:null,        status:'overdue', daysOverdue:15,lateFee:75},
    {id:3,bookId:3,bookTitle:'A Brief History of Time', userId:1,memberName:'John Doe',  issueDate:'2024-01-10',dueDate:'2024-02-10',returnDate:'2024-02-05',status:'returned',daysOverdue:0, lateFee:0},
  ]);

  // helpers
  const toast$ = (msg,type='success')=>{setToast({show:true,msg,type});setTimeout(()=>setToast({show:false,msg:'',type:'success'}),3500);};
  const fmt  = d=>d?new Date(d).toLocaleDateString('en-IN',{year:'numeric',month:'short',day:'numeric'}):'—';
  const curr = a=>`₹${Number(a).toFixed(0)}`;
  const stars = r=>Array.from({length:5},(_,i)=><Ic.Star key={i} s={13} c="#FF9B7A" f={i<Math.round(r)}/>);
  const toggleWish = id=>setWishlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);
  const multiTog = (list,setList,val)=>{
    if(val==='all'){setList(['all']);return;}
    const n=list.filter(x=>x!=='all');
    const u=n.includes(val)?n.filter(x=>x!==val):[...n,val];
    setList(u.length===0?['all']:u);setPg(0);
  };
  const resetFilters=()=>{setSelGenres(['all']);setSelPubs(['all']);setSelAuths(['all']);setAvail('all');setMinRating(0);setYearFrom('');setYearTo('');setSearch('');setSortBy('title,asc');setPg(0);};

  const genres = ['all',...new Set(books.map(b=>b.genre).filter(Boolean))];
  const pubs   = ['all',...new Set(books.map(b=>b.publisher).filter(Boolean))];
  const auths  = ['all',...new Set(books.map(b=>b.author).filter(Boolean))];

  const myIssues    = isStaff ? issues : issues.filter(i=>i.userId===userId);
  const shownIssued = issuedFil==='active' ? myIssues.filter(i=>i.status!=='returned') : issuedFil==='all' ? myIssues : myIssues.filter(i=>i.status===issuedFil);
  const shownRecs   = recsFil==='all' ? issues : issues.filter(i=>i.status===recsFil);

  // CRUD
  const openAdd = ()=>{if(!isStaff){toast$('Insufficient permissions','error');return;}setIsEdit(false);setFormBook(null);setShowForm(true);};
  const openEdit= b=>{if(!isStaff){toast$('Insufficient permissions','error');return;}setIsEdit(true);setFormBook(b);setShowForm(true);};
  const openDel = b=>{
    if(!isStaff){toast$('Insufficient permissions','error');return;}
    setConfirmFn(()=>async()=>{
      setActionLoad(true);
      try{await api.deleteBook(b.id);setBooks(p=>p.filter(x=>x.id!==b.id));toast$('Book deleted');}
      catch{toast$('Failed to delete','error');}
      finally{setActionLoad(false);setShowConfirm(false);}
    });
    setShowConfirm(true);
  };
  const submitForm = async e=>{
    e.preventDefault();
    const fd=new FormData(e.target);
    const data={
      title:fd.get('title'),author:fd.get('author'),publisher:fd.get('publisher'),
      publicationDate:fd.get('publicationDate'),pages:parseInt(fd.get('pages')),
      genre:fd.get('genre'),language:fd.get('language')||'English',
      description:fd.get('description'),
      imageURL:fd.get('imageURL')||'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
      rating:parseFloat(fd.get('rating'))||0,ratings:parseInt(fd.get('ratings'))||0,
      availability:parseInt(fd.get('availability')),mrp:parseFloat(fd.get('mrp')),
      series:fd.get('series')||null,
    };
    setActionLoad(true);
    try{
      if(isEdit){const r=await api.updateBook(formBook.id,data);setBooks(p=>p.map(b=>b.id===formBook.id?{...b,...data,...r}:b));toast$('Book updated!');}
      else{const r=await api.createBook(data);setBooks(p=>[...p,{id:r?.id||Date.now(),...data}]);toast$('Book added!');}
    }catch{
      if(isEdit)setBooks(p=>p.map(b=>b.id===formBook.id?{...b,...data}:b));
      else setBooks(p=>[...p,{id:Date.now(),...data}]);
      toast$(isEdit?'Updated (offline)':'Added (offline)','info');
    }finally{setActionLoad(false);setShowForm(false);}
  };
  const submitIssue = async e=>{
    e.preventDefault();
    const fd=new FormData(e.target);
    const memberId=isStaff?parseInt(fd.get('userId')):userId;
    const memberName=isStaff?(members.find(m=>m.id===memberId)?.name||'Unknown'):userName;
    setActionLoad(true);
    try{
      const r=await api.issueBook({userId:memberId,bookId:issueBook.id});
      setIssues(p=>[...p,{id:r?.id||Date.now(),bookId:issueBook.id,bookTitle:issueBook.title,userId:memberId,memberName,issueDate:new Date().toISOString().split('T')[0],dueDate:fd.get('dueDate'),returnDate:null,status:'borrowed',daysOverdue:0,lateFee:0}]);
      setBooks(p=>p.map(b=>b.id===issueBook.id?{...b,availability:Math.max(0,(b.availability??0)-1)}:b));
      toast$('Book issued!');
    }catch{toast$('Issued (offline)','info');}
    finally{setActionLoad(false);setIssueBook(null);}
  };
  const doReturn = async rec=>{
    if(!isStaff){toast$('Only staff can process returns','error');return;}
    setActionLoad(true);
    try{
      await api.returnBook(rec.id);
      const today=new Date(),due=new Date(rec.dueDate);
      const days=Math.max(0,Math.floor((today-due)/86400000));
      setIssues(p=>p.map(r=>r.id===rec.id?{...r,returnDate:today.toISOString().split('T')[0],status:'returned',daysOverdue:days,lateFee:days*5}:r));
      setBooks(p=>p.map(b=>b.id===rec.bookId?{...b,availability:(b.availability??0)+1}:b));
      toast$(days>0?`Returned — ₹${days*5} late fee`:'Returned!',days>0?'info':'success');
    }catch{toast$('Return processed (offline)','info');}
    finally{setActionLoad(false);}
  };

  // ── BookCard ──────────────────────────────────────────────────────────────
  const BookCard = ({book,idx})=>{
    const a=book.availability??0,inW=wishlist.includes(book.id);
    return(
      <div className={`book-card ${viewMode} card-enter`} style={{animationDelay:`${idx*0.045}s`}}>
        <div className="book-cover">
          <img src={book.imageURL} alt={book.title} loading="lazy"/>
          <div className="book-overlay">
            <button className="btn-ic" onClick={()=>setDetailBook(book)}><Ic.Eye s={20}/></button>
            {isStaff&&<><button className="btn-ic" onClick={()=>openEdit(book)}><Ic.Edit s={20}/></button>
              <button className="btn-ic danger" onClick={()=>openDel(book)}><Ic.Trash s={20}/></button></>}
          </div>
          <div className={`avail-chip ${a>0?'av':'un'}`}>{a>0?`${a} Available`:'All Issued'}</div>
          <button className={`wish-btn ${inW?'on':''}`} onClick={()=>toggleWish(book.id)}>
            <Ic.Bookmark s={15} c={inW?'#FF9B7A':'rgba(255,255,255,0.9)'} f={inW}/>
          </button>
          {book.mrp&&<div className="mrp-chip">{curr(book.mrp)}</div>}
        </div>
        <div className="book-info">
          <span className="genre-chip">{book.genre}</span>
          <h3 className="b-title">{book.title}</h3>
          <p className="b-author">{book.author}</p>
          <p className="b-pub">{book.publisher}{book.publicationDate&&` · ${new Date(book.publicationDate).getFullYear()}`}</p>
          <div className="b-rating">{stars(book.rating)}<span>{book.rating}</span>{book.ratings&&<span className="rc">({book.ratings.toLocaleString()})</span>}</div>
          <div className="b-actions">
            {a>0
              ?<button className="btn-issue" onClick={()=>setIssueBook(book)}><Ic.BookOpen s={14}/>Issue Book</button>
              :<button className="btn-un" disabled><Ic.Clock s={14}/>Unavailable</button>}
          </div>
        </div>
      </div>
    );
  };

  const IssRow=({rec,showMem=true})=>(
    <tr className={`rec-row rs-${rec.status}`}>
      <td><div className="ct">{rec.bookTitle}</div>{showMem&&<div className="cs">{rec.memberName}</div>}</td>
      <td>{fmt(rec.issueDate||rec.borrowDate)}</td>
      <td>{fmt(rec.dueDate)}</td>
      <td>{fmt(rec.returnDate)}</td>
      <td><span className={`sbadge sb-${rec.status}`}>{rec.status}</span></td>
      <td>{rec.daysOverdue>0?<span className="od">{rec.daysOverdue}d</span>:'—'}</td>
      <td>{(rec.lateFee||0)>0?<span className="pen">{curr(rec.lateFee)}</span>:'—'}</td>
      {isStaff&&<td>{rec.status==='borrowed'&&<button className="btn-ret" onClick={()=>doReturn(rec)} disabled={actionLoad}>{actionLoad?<Ic.Loader s={13}/>:'Return'}</button>}</td>}
    </tr>
  );

  // ── RENDER ────────────────────────────────────────────────────────────────
  return(
    <div className="bp">
      <div className="bg-shapes"><div className="bs b1"/><div className="bs b2"/><div className="bs b3"/></div>

      {/* NAV */}
      <nav className="bp-nav">
        <div className="nav-logo"><Ic.Books s={32} c="#FF9B7A"/><span>LibraryHub</span></div>
        <div className="nav-tabs">
          {[
            {k:'catalog', label:'Catalog',     icon:<Ic.Books s={15}/>},
            {k:'issued',  label:isStaff?'Issued Books':'My Books', icon:<Ic.BookOpen s={15}/>},
            ...(isStaff?[{k:'records',label:'All Records',icon:<Ic.List s={15}/>}]:[]),
          ].map(t=>(
            <button key={t.k} className={`ntab ${tab===t.k?'active':''}`} onClick={()=>setTab(t.k)}>
              {t.icon}{t.label}
              {t.k==='issued'&&myIssues.filter(i=>i.status==='borrowed').length>0&&
                <span className="tab-badge">{myIssues.filter(i=>i.status==='borrowed').length}</span>}
              {t.k==='issued'&&myIssues.filter(i=>i.status==='overdue').length>0&&
                <span className="tab-badge tab-badge-red">{myIssues.filter(i=>i.status==='overdue').length}</span>}
            </button>
          ))}
        </div>
        <div className="nav-right">
          <div className={`role-badge role-${role}`}>{role}</div>
          <div className="user-pill"><div className="user-av"><Ic.User s={16}/></div><span>{userName}</span></div>
        </div>
      </nav>

      <div className={`bp-body ${tab==='catalog'?'with-sidebar':'no-sidebar'}`}>

        {/* SIDEBAR */}
        {tab==='catalog'&&(
          <aside className="bp-side">
            <div className="side-head"><h3>Filters</h3><button className="btn-reset" onClick={resetFilters}><Ic.Refresh s={13}/>Reset</button></div>
            <FS title="Genre">{genres.map(g=><label key={g} className="fc"><input type="checkbox" checked={selGenres.includes(g)} onChange={()=>multiTog(selGenres,setSelGenres,g)}/><span>{g==='all'?'All Genres':g}</span></label>)}</FS>
            <FS title="Publisher">{pubs.map(p=><label key={p} className="fc"><input type="checkbox" checked={selPubs.includes(p)} onChange={()=>multiTog(selPubs,setSelPubs,p)}/><span>{p==='all'?'All Publishers':p}</span></label>)}</FS>
            <FS title="Author">{auths.slice(0,7).map(a=><label key={a} className="fc"><input type="checkbox" checked={selAuths.includes(a)} onChange={()=>multiTog(selAuths,setSelAuths,a)}/><span>{a==='all'?'All Authors':a}</span></label>)}</FS>
            <FS title="Availability">
              {['all','available','unavailable'].map(v=><label key={v} className="fr"><input type="radio" name="av" checked={avail===v} onChange={()=>setAvail(v)}/><span>{v==='all'?'All':v==='available'?'Available':'All Issued'}</span></label>)}
            </FS>
            <FS title="Min Rating">
              <input className="range-in" type="range" min="0" max="5" step="0.5" value={minRating} onChange={e=>setMinRating(parseFloat(e.target.value))}/>
              <div className="range-row"><span className="rv">{minRating.toFixed(1)}</span><div>{stars(minRating)}</div></div>
            </FS>
            <FS title="Pub Year">
              <div className="year-row"><input type="number" placeholder="From" value={yearFrom} onChange={e=>setYearFrom(e.target.value)} min="1900" max="2026"/><span>–</span><input type="number" placeholder="To" value={yearTo} onChange={e=>setYearTo(e.target.value)} min="1900" max="2026"/></div>
            </FS>
            <div className="side-stats">
              <div className="sstat"><Ic.Books s={13} c="#FF9B7A"/>{totalBooks} Books</div>
              <div className="sstat"><Ic.Bookmark s={13} c="#6B9BD1"/>{wishlist.length} Saved</div>
              <div className="sstat"><Ic.BookOpen s={13} c="#A8C5A8"/>{issues.filter(i=>i.status==='borrowed').length} Active</div>
              {issues.filter(i=>i.status==='overdue').length>0&&
                <div className="sstat danger-s"><Ic.Alert s={13} c="#E74C3C"/>{issues.filter(i=>i.status==='overdue').length} Overdue</div>}
            </div>
          </aside>
        )}

        {/* MAIN */}
        <main className="bp-main">
          {/* Top Bar */}
          <div className="top-bar">
            <div className="page-title">
              <h1>{tab==='catalog'?'Book Catalog':tab==='issued'?(isStaff?'Issued Books':'My Books'):'Issue Records'}</h1>
              <p>{tab==='catalog'?(loading?'Loading…':`${totalBooks} books`):tab==='issued'?`${shownIssued.length} records`:`${shownRecs.length} records`}</p>
            </div>
            <div className="top-actions">
              {tab==='catalog'&&(<>
                <div className="search-bar">
                  <Ic.Search s={17}/><input placeholder="Title, author, genre…" value={search} onChange={e=>setSearch(e.target.value)}/>
                  {loading&&<Ic.Loader s={15} c="#FF9B7A"/>}
                </div>
                <select className="sort-sel" value={sortBy} onChange={e=>{setSortBy(e.target.value);setPg(0);}}>
                  <option value="title,asc">Title A–Z</option><option value="title,desc">Title Z–A</option>
                  <option value="rating,desc">Rating ↓</option><option value="rating,asc">Rating ↑</option>
                  <option value="mrp,desc">Price ↓</option><option value="mrp,asc">Price ↑</option>
                  <option value="publicationDate,desc">Newest</option><option value="publicationDate,asc">Oldest</option>
                  <option value="availability,desc">Most Available</option>
                </select>
                <button className="btn-view" onClick={()=>setViewMode(v=>v==='grid'?'list':'grid')} title="Toggle view">
                  {viewMode==='grid'?<Ic.List s={17}/>:<Ic.Grid s={17}/>}
                </button>
                {isStaff&&<button className="btn-add" onClick={openAdd}><Ic.Plus s={17}/>Add Book</button>}
              </>)}
              {(tab==='issued'||tab==='records')&&(
                <div className="filter-pills">
                  {['all','borrowed','overdue','returned'].map(f=>(
                    <button key={f} className={`fpill ${(tab==='issued'?issuedFil:recsFil)===f?'on':''}`}
                      onClick={()=>tab==='issued'?setIssuedFil(f):setRecsFil(f)}>
                      {f==='all'?'All':f.charAt(0).toUpperCase()+f.slice(1)}
                    </button>
                  ))}
                </div>
              )}
              <button className="btn-refresh" onClick={()=>{fetchBooks();fetchIssues();}} title="Refresh"><Ic.Refresh s={16}/></button>
            </div>
          </div>

          {/* CATALOG */}
          {tab==='catalog'&&(<>
            {wishlist.length>0&&(
              <div className="wish-strip">
                <Ic.Bookmark s={15} c="#FF9B7A" f={true}/><span>{wishlist.length} book{wishlist.length>1?'s':''} in wishlist</span>
                <button className="wish-clr" onClick={()=>setWishlist([])}>Clear</button>
              </div>
            )}
            <div className={`books-grid ${viewMode}`}>
              {loading?Array(8).fill(0).map((_,i)=><Skeleton key={i}/>)
                :books.length===0?<div className="empty-s"><Ic.Books s={60} c="#FFD4B8"/><h3>No books found</h3><p>Try different filters</p></div>
                :books.map((b,i)=><BookCard key={b.id} book={b} idx={i}/>)}
            </div>
            {totalPages>1&&(
              <div className="pager">
                <button className="pgbtn" onClick={()=>setPg(p=>Math.max(0,p-1))} disabled={pg===0}><Ic.ChevL s={15}/>Prev</button>
                <div className="pg-nums">{[...Array(Math.min(totalPages,7))].map((_,i)=><button key={i} className={`pgnum ${pg===i?'on':''}`} onClick={()=>setPg(i)}>{i+1}</button>)}</div>
                <button className="pgbtn" onClick={()=>setPg(p=>Math.min(totalPages-1,p+1))} disabled={pg===totalPages-1}>Next<Ic.ChevR s={15}/></button>
              </div>
            )}
          </>)}

          {/* ISSUED / MY BOOKS */}
          {tab==='issued'&&(
            <div className="tbl-card">
              {issLoad?<div className="tbl-load"><Ic.Loader s={30} c="#FF9B7A"/><p>Loading…</p></div>
                :shownIssued.length===0?<div className="empty-s"><Ic.BookOpen s={60} c="#FFD4B8"/><h3>No records</h3></div>
                :<table className="rec-tbl">
                  <thead><tr><th>Book{isStaff?' / Member':''}</th><th>Issued</th><th>Due</th><th>Returned</th><th>Status</th><th>Overdue</th><th>Late Fee</th>{isStaff&&<th>Action</th>}</tr></thead>
                  <tbody>{shownIssued.map(r=><IssRow key={r.id} rec={r} showMem={isStaff}/>)}</tbody>
                </table>}
            </div>
          )}

          {/* RECORDS (staff) */}
          {tab==='records'&&isStaff&&(
            <div className="tbl-card">
              {issLoad?<div className="tbl-load"><Ic.Loader s={30} c="#FF9B7A"/><p>Loading…</p></div>
                :(<>
                  <div className="rec-stats">
                    {[
                      {l:'Total',   v:issues.length,                                  col:'var(--blue)'},
                      {l:'Active',  v:issues.filter(i=>i.status==='borrowed').length, col:'var(--info)'},
                      {l:'Overdue', v:issues.filter(i=>i.status==='overdue').length,  col:'var(--danger)'},
                      {l:'Returned',v:issues.filter(i=>i.status==='returned').length, col:'var(--success)'},
                      {l:'Late Fees',v:curr(issues.reduce((s,i)=>s+(i.lateFee||0),0)),col:'var(--warning)'},
                    ].map(s=><div key={s.l} className="rstat"><span style={{color:s.col}}>{s.v}</span><span>{s.l}</span></div>)}
                  </div>
                  {shownRecs.length===0?<div className="empty-s"><Ic.BookOpen s={60} c="#FFD4B8"/><h3>No records</h3></div>
                    :<table className="rec-tbl">
                      <thead><tr><th>Book / Member</th><th>Issued</th><th>Due</th><th>Returned</th><th>Status</th><th>Overdue</th><th>Late Fee</th><th>Action</th></tr></thead>
                      <tbody>{shownRecs.map(r=><IssRow key={r.id} rec={r} showMem/>)}</tbody>
                    </table>}
                </>)}
            </div>
          )}
        </main>
      </div>

      {/* ═══ MODALS ═══ */}

      {/* Details */}
      {detailBook&&(
        <div className="overlay" onClick={()=>setDetailBook(null)}>
          <div className="modal det-modal" onClick={e=>e.stopPropagation()}>
            <button className="mx" onClick={()=>setDetailBook(null)}><Ic.Close s={17}/></button>
            <div className="det-wrap">
              <div className="det-img-col">
                <img src={detailBook.imageURL} alt={detailBook.title}/>
                <div className={`det-av ${(detailBook.availability??0)>0?'av':'un'}`}>
                  {(detailBook.availability??0)>0?`${detailBook.availability} copies available`:'Currently unavailable'}
                </div>
              </div>
              <div className="det-info">
                <div className="det-genre"><Ic.Tag s={12}/>{detailBook.genre}</div>
                <h2>{detailBook.title}</h2>
                {detailBook.series&&<p className="det-series">Series: {detailBook.series}</p>}
                <p className="det-author">by {detailBook.author}</p>
                <div className="det-stars">{stars(detailBook.rating)}<strong>{detailBook.rating}</strong>{detailBook.ratings&&<span>({detailBook.ratings.toLocaleString()})</span>}</div>
                <p className="det-desc">{detailBook.description}</p>
                <div className="det-grid">
                  <div className="di"><Ic.Globe s={14}/><span>{detailBook.language||'English'}</span></div>
                  <div className="di"><Ic.BookOpen s={14}/><span>{detailBook.pages} pages</span></div>
                  <div className="di"><Ic.Calendar s={14}/><span>{fmt(detailBook.publicationDate)}</span></div>
                  <div className="di"><Ic.Package s={14}/><span>{detailBook.publisher}</span></div>
                  <div className="di mrp-di"><Ic.Dollar s={14}/><span>{detailBook.mrp?curr(detailBook.mrp):'N/A'}</span></div>
                </div>
                <div className="det-acts">
                  {(detailBook.availability??0)>0&&<button className="btn-add" onClick={()=>{setDetailBook(null);setIssueBook(detailBook);}}><Ic.BookOpen s={16}/>Issue Book</button>}
                  <button className={`btn-wish-lg ${wishlist.includes(detailBook.id)?'on':''}`} onClick={()=>toggleWish(detailBook.id)}>
                    <Ic.Bookmark s={16} f={wishlist.includes(detailBook.id)}/>{wishlist.includes(detailBook.id)?'Saved':'Wishlist'}
                  </button>
                  {isStaff&&<button className="btn-outline" onClick={()=>{setDetailBook(null);openEdit(detailBook);}}><Ic.Edit s={16}/>Edit</button>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Book Form */}
      {showForm&&(
        <div className="overlay" onClick={()=>setShowForm(false)}>
          <div className="modal form-modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head"><h2>{isEdit?'Edit Book':'Add New Book'}</h2><button className="mx" onClick={()=>setShowForm(false)}><Ic.Close s={17}/></button></div>
            <form onSubmit={submitForm} className="bk-form">
              <div className="form-grid">
                <div className="fg"><label>Title *</label><input name="title" required defaultValue={formBook?.title} placeholder="Book title"/></div>
                <div className="fg"><label>Author *</label><input name="author" required defaultValue={formBook?.author}/></div>
                <div className="fg"><label>Publisher</label><input name="publisher" defaultValue={formBook?.publisher}/></div>
                <div className="fg"><label>Series</label><input name="series" defaultValue={formBook?.series} placeholder="Optional"/></div>
                <div className="fg"><label>Genre *</label><input name="genre" required defaultValue={formBook?.genre} placeholder="e.g. Fiction"/></div>
                <div className="fg"><label>Language</label><input name="language" defaultValue={formBook?.language||'English'}/></div>
                <div className="fg"><label>Pub Date</label><input name="publicationDate" type="date" defaultValue={formBook?.publicationDate}/></div>
                <div className="fg"><label>Pages</label><input name="pages" type="number" defaultValue={formBook?.pages}/></div>
                <div className="fg"><label>Availability *</label><input name="availability" type="number" required defaultValue={formBook?.availability??1} min="0"/></div>
                <div className="fg"><label>MRP (₹) *</label><input name="mrp" type="number" step="0.01" required defaultValue={formBook?.mrp} placeholder="499"/></div>
                <div className="fg"><label>Rating</label><input name="rating" type="number" step="0.1" min="0" max="5" defaultValue={formBook?.rating}/></div>
                <div className="fg"><label>Total Ratings</label><input name="ratings" type="number" defaultValue={formBook?.ratings}/></div>
                <div className="fg fg-full"><label>Cover URL</label><input name="imageURL" defaultValue={formBook?.imageURL} placeholder="https://…"/></div>
                <div className="fg fg-full"><label>Description</label><textarea name="description" rows="3" defaultValue={formBook?.description}/></div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={()=>setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn-submit" disabled={actionLoad}>
                  {actionLoad?<><Ic.Loader s={15}/>Saving…</>:<>{isEdit?'Update Book':'Add Book'}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Issue Modal */}
      {issueBook&&(
        <div className="overlay" onClick={()=>setIssueBook(null)}>
          <div className="modal iss-modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head"><h2>Issue Book</h2><button className="mx" onClick={()=>setIssueBook(null)}><Ic.Close s={17}/></button></div>
            <div className="iss-prev">
              <img src={issueBook.imageURL} alt={issueBook.title}/>
              <div><h3>{issueBook.title}</h3><p>{issueBook.author}</p><span className="av-tag">{issueBook.availability} available</span></div>
            </div>
            <form onSubmit={submitIssue} className="bk-form" style={{padding:'0 2rem 2rem'}}>
              {isStaff&&<div className="fg" style={{marginBottom:'1rem'}}><label>Member *</label>
                <select name="userId" required><option value="">Select member…</option>
                  {members.filter(m=>m.status==='active').map(m=><option key={m.id} value={m.id}>{m.name} ({m.membershipType})</option>)}
                </select></div>}
              <div className="fg" style={{marginBottom:'1.5rem'}}><label>Due Date *</label>
                <input name="dueDate" type="date" required defaultValue={new Date(Date.now()+14*864e5).toISOString().split('T')[0]}/></div>
              <div className="form-actions" style={{borderTop:'none',padding:0}}>
                <button type="button" className="btn-cancel" onClick={()=>setIssueBook(null)}>Cancel</button>
                <button type="submit" className="btn-submit" disabled={actionLoad}>
                  {actionLoad?<><Ic.Loader s={15}/>Processing…</>:<><Ic.BookOpen s={15}/>Confirm Issue</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      {showConfirm&&(
        <div className="overlay" onClick={()=>setShowConfirm(false)}>
          <div className="modal confirm-modal" onClick={e=>e.stopPropagation()}>
            <div className="conf-icon"><Ic.Alert s={44} c="#E74C3C"/></div>
            <h2>Delete Book?</h2><p>This cannot be undone.</p>
            <div className="form-actions" style={{justifyContent:'center',borderTop:'none'}}>
              <button className="btn-cancel" onClick={()=>setShowConfirm(false)}>Cancel</button>
              <button className="btn-danger-s" onClick={confirmFn} disabled={actionLoad}>
                {actionLoad?<><Ic.Loader s={15}/>…</>:<><Ic.Trash s={15}/>Delete</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.show&&(
        <div className={`bp-toast ${toast.type}`}>
          <span className="t-ic">{toast.type==='success'?<Ic.Check s={15}/>:toast.type==='error'?<Ic.Close s={15}/>:<Ic.Alert s={15}/>}</span>
          {toast.msg}
        </div>
      )}
    </div>
  );
};

const FS=({title,children})=><div className="fsec"><h4>{title}</h4><div className="flist">{children}</div></div>;
export default BooksPage;
