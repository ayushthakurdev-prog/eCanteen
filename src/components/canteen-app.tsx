import { useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Check,
  Cookie,
  CupSoda,
  ChevronRight,
  Grid2X2,
  Heart,
  Mail,
  Minus,
  Plus,
  Pizza,
  Popcorn,
  Search,
  Settings2,
  Sandwich,
  ShoppingBag,
  Trash2,
  UserRound,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useWishlist } from "@/lib/wishlist";
import { useTheme } from "@/lib/theme";
import bucketEmpty from "@/assets/bucket-empty.png";
import canteenWelcome from "@/assets/canteen-welcome.png";
import loginIllustration from "@/assets/login-illustration.png";
import notificationsEmpty from "@/assets/notifications-empty.png";
import profileAvatar from "@/assets/profile-avatar.png";

type Screen = "Dashboard" | "Bucket" | "Bills" | "Settings" | "Notifications" | "Support" | "Profile";
type Order = { name: string; price: number; quantity: number };

const initialOrders: Order[] = [
  { name: "Sandwitch", price: 50, quantity: 1 },
  { name: "Appy Fizz", price: 10, quantity: 2 },
  { name: "Bourbon Biscuit", price: 10, quantity: 2 },
];

const navigation: { label: Screen; href: "/" | "/bucket" | "/bills" | "/settings" | "/notifications" | "/support"; icon: typeof Grid2X2 }[] = [
  { label: "Dashboard", href: "/", icon: Grid2X2 },
  { label: "Bucket", href: "/bucket", icon: ShoppingBag },
  { label: "Bills", href: "/bills", icon: Wallet },
  { label: "Settings", href: "/settings", icon: Settings2 },
  { label: "Notifications", href: "/notifications", icon: Mail },
  { label: "Support", href: "/support", icon: UserRound },
];

const dishes = [
  { name: "Dish 01", price: 50, rating: "★★★★☆" },
  { name: "Dish 02", price: 20, rating: "★★★☆☆" },
  { name: "Dish 03", price: 10, rating: "★★★☆☆" },
];

const categories = [
  { name: "Menu1", Icon: Sandwich },
  { name: "Menu2", Icon: Popcorn },
  { name: "Menu3", Icon: Pizza },
  { name: "Menu4", Icon: CupSoda },
  { name: "Menu5", Icon: Cookie },
];

export function LoginScreen() {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (signUp) {
      setMessage("Your account details are ready.");
      return;
    }
    void navigate({ to: "/" });
  }

  return (
    <main className="login-screen">
      <section className="login-form-side">
        <div className="login-content">
          <p className="welcome-label">Welcome to</p>
          <Brand className="login-brand" />
          <p className="login-subtitle">Login to make your order.</p>
          <form className="login-form" onSubmit={submit}>
            {signUp && <input required aria-label="Full name" placeholder="Full Name" />}
            <input required autoComplete="username" aria-label="Username" placeholder="Username" />
            <input required type="password" autoComplete={signUp ? "new-password" : "current-password"} aria-label="Password" placeholder="Password" />
            <Button className="login-submit" type="submit">{signUp ? "SIGN UP" : "LOG IN"}</Button>
          </form>
          <p className="signup-prompt">
            {signUp ? "Already have an account ? " : "Don’t have an account ? "}
            <button className="text-action" onClick={() => { setSignUp(!signUp); setMessage(""); }} type="button">
              {signUp ? "Log In" : "Sign Up Now"}
            </button>
          </p>
          <div className="login-divider"><span />Or<span /></div>
          <p className="continue-label">Continue with</p>
          <div className="social-icons" aria-label="Social sign in options">
            <button aria-label="Continue with Google" type="button" onClick={() => setMessage("Social sign-in is not connected.")}>G</button>
            <button aria-label="Continue with Facebook" type="button" onClick={() => setMessage("Social sign-in is not connected.")}>f</button>
          </div>
          {message && <p className="login-message" role="status">{message}</p>}
        </div>
        <small className="copyright login-copyright">© 2022 eCanteen App</small>
      </section>
      <section className="login-art-side" aria-label="Canteen illustration">
        <img src={loginIllustration} alt="A chef preparing food in a canteen" />
      </section>
    </main>
  );
}

export function CanteenScreen({ screen }: { screen: Screen }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(initialOrders);
  const [category, setCategory] = useState("Menu1");
  const { items: wishlist, toggleItem: toggleWishlist } = useWishlist();
  const { theme, setTheme } = useTheme();
  const [search, setSearch] = useState("");
  const [ordered, setOrdered] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [faq, setFaq] = useState(0);
  const [feedback, setFeedback] = useState("");

  const total = useMemo(() => orders.reduce((sum, item) => sum + item.price * item.quantity, 0), [orders]);
  const filteredDishes = dishes.filter((dish) => dish.name.toLowerCase().includes(search.toLowerCase()));

  function updateOrder(name: string, change: number) {
    setOrders((previous) => {
      const existing = previous.find((item) => item.name === name);
      if (!existing && change > 0) return [...previous, { name, price: dishes.find((item) => item.name === name)?.price ?? 10, quantity: 1 }];
      return previous.flatMap((item) => {
        if (item.name !== name) return [item];
        const quantity = item.quantity + change;
        return quantity > 0 ? [{ ...item, quantity }] : [];
      });
    });
  }

  return (
    <main className={`canteen-app${screen === "Support" ? " support-layout" : ""}${screen === "Bills" ? " bills-layout" : ""}`}>
      <Sidebar active={screen} />
      {screen === "Support" ? (
        <SupportPage faq={faq} setFaq={setFaq} />
      ) : screen === "Bills" ? (
        <BillsPage />
      ) : (
        <>
          <section className="main-column">
            <SearchBar value={search} onChange={setSearch} />
            {screen === "Bucket" ? <WishlistBucket items={dishes.filter((dish) => wishlist.includes(dish.name) && dish.name.toLowerCase().includes(search.toLowerCase()))} onRemove={toggleWishlist} /> : <>
              <WelcomePanel />
              <div className="section-heading"><h2>Menu Category</h2><button type="button" className="view-all" onClick={() => setCategory("Menu1")}>View All <span><ChevronRight size={16} /></span></button></div>
              <div className="category-list">{categories.map((item) => <button key={item.name} type="button" className={`category-tile${category === item.name ? " selected" : ""}`} onClick={() => setCategory(item.name)}><span className="category-emoji"><item.Icon size={38} strokeWidth={1.7} /></span><span>{item.name}</span><span className="round-arrow"><ChevronRight size={16} /></span></button>)}</div>
              <div className="dish-list">{filteredDishes.map((dish) => <article className="dish-card" key={dish.name}><button aria-label={`${wishlist.includes(dish.name) ? "Remove" : "Add"} ${dish.name} from Wishlist`} className={`favorite-toggle${wishlist.includes(dish.name) ? " is-favorite" : ""}`} type="button" onClick={() => { const adding = !wishlist.includes(dish.name); toggleWishlist(dish.name); if (adding) toast.success("Added to Wishlist and Bucket List"); }}><Heart size={16} fill="currentColor" /></button><div className="dish-placeholder" /><div className="dish-details"><span>{dish.name}</span><span className="dish-rating">{dish.rating}</span><strong><i>₹</i>{dish.price}</strong></div><Button aria-label={`Add ${dish.name} to orders`} size="icon" className="dish-add" onClick={() => updateOrder(dish.name, 1)}><Plus size={22} /></Button></article>)}</div>
            </>}
          </section>
          <aside className="utility-column">
            {screen === "Profile" ? <ProfilePanel onSave={() => setFeedback("Profile saved")} feedback={feedback} /> : screen === "Settings" ? <SettingsPanel notifications={notifications} setNotifications={setNotifications} theme={theme} setTheme={setTheme} feedback={feedback} onUpdate={() => setFeedback("Password updated")} onLogout={() => void navigate({ to: "/login" })} /> : screen === "Notifications" ? <NotificationsPage /> : <OrderPanel orders={orders} total={total} updateOrder={updateOrder} ordered={ordered} showDateTime={screen !== "Bucket"} placeOrder={() => { if (orders.length) { setOrdered(true); } }} />}
          </aside>
        </>
      )}
    </main>
  );
}

function Brand({ className = "" }: { className?: string }) {
  return <div className={`brand ${className}`}><span>e</span>Canteen</div>;
}

function Sidebar({ active }: { active: Screen }) {
  return <aside className="sidebar"><Link to="/" className="brand-link" aria-label="eCanteen home"><Brand /></Link><nav className="side-nav" aria-label="Main navigation">{navigation.slice(0, 4).map((item) => <NavItem key={item.label} item={item} active={active === item.label} />)}<span className="nav-caption">other</span>{navigation.slice(4).map((item) => <NavItem key={item.label} item={item} active={active === item.label} />)}</nav><div className="sidebar-bottom"><img src={profileAvatar} alt="Tony Stark" /><strong>Tony Stark</strong><small>Teacher</small><Link to="/profile" className="profile-link">Open profile</Link></div><small className="copyright">© 2022 eCanteen App</small></aside>;
}

function NavItem({ item, active }: { item: (typeof navigation)[number]; active: boolean }) {
  const Icon = item.icon;
  return <Link to={item.href} className={`nav-item${active ? " active" : ""}`}><Icon size={22} strokeWidth={2.7} /><span>{item.label}</span></Link>;
}

function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <label className="search-bar"><input placeholder="Search..." aria-label="Search dishes" value={value} onChange={(event) => onChange(event.target.value)} /><Search size={19} /></label>;
}

function WelcomePanel() {
  return <section className="welcome-panel"><img src={canteenWelcome} alt="A woman greeting you" /><div className="welcome-copy"><h1>Hello Tony,</h1><p>Lorem ipsum dolor sit amet, cotetur adipiscing elit.</p><Button className="coral-button" size="sm">Learn more</Button></div></section>;
}

function WishlistBucket({ items, onRemove }: { items: typeof dishes; onRemove: (name: string) => void }) {
  if (items.length === 0) {
    return <div className="bucket-empty-copy"><img src={bucketEmpty} alt="A person packing a box" /><p>You haven’t marked any favourites yet.</p></div>;
  }

  return (
    <section className="wishlist-bucket" aria-label="Wishlist items in your bucket list">
      <h1>Bucket List</h1>
      <div className="wishlist-bucket-list">
        {items.map((dish) => (
          <article className="wishlist-bucket-item" key={dish.name}>
            <div className="wishlist-bucket-copy"><strong>{dish.name}</strong><span><i>₹</i>{dish.price}</span></div>
            <Button aria-label={`Remove ${dish.name} from Wishlist and Bucket List`} variant="ghost" size="icon" className="wishlist-remove" onClick={() => onRemove(dish.name)}><Heart size={19} fill="currentColor" /></Button>
          </article>
        ))}
      </div>
    </section>
  );
}

function OrderPanel({ orders, total, updateOrder, ordered, showDateTime, placeOrder }: { orders: Order[]; total: number; updateOrder: (name: string, change: number) => void; ordered: boolean; showDateTime: boolean; placeOrder: () => void }) {
  return (
    <div className="orders-panel">
      <h1>Your Orders</h1>
      {showDateTime && <div className="order-datetime"><label>Date<input type="date" defaultValue="2022-04-08" /></label><label>Time<input type="time" defaultValue="09:00" /></label></div>}
      <div className="order-list">
        {orders.map((item) => (
          <div className="order-row" key={item.name}>
            <div><span>{item.name}</span><small>Rs. {item.price}</small></div>
            <div className="order-controls">
              <Button aria-label={`Increase ${item.name}`} size="icon" className="qty-button" onClick={() => updateOrder(item.name, 1)}><Plus size={13} /></Button>
              <span>{item.quantity}</span>
              <Button aria-label={`Decrease ${item.name}`} size="icon" className="qty-button" onClick={() => updateOrder(item.name, -1)}><Minus size={13} /></Button>
              <Button aria-label={`Remove ${item.name}`} size="icon" className="remove-button" onClick={() => updateOrder(item.name, -item.quantity)}><Trash2 size={13} /></Button>
            </div>
          </div>
        ))}
      </div>
      <div className="grand-total"><span>Grand Total</span><span>Rs. {total}</span></div>
      {ordered && <p className="order-confirmation" role="status"><Check size={16} /> Order placed</p>}
      <Button className="place-order" onClick={placeOrder}>Place Order <ChevronRight size={22} strokeWidth={3} /></Button>
    </div>
  );
}

function ProfilePanel({ onSave, feedback }: { onSave: () => void; feedback: string }) {
  return <div className="profile-panel"><h1>Profile</h1><div className="profile-photo"><img src={profileAvatar} alt="Tony Stark" /><button aria-label="Change profile photo" type="button"><span>▣</span></button></div><p className="profile-email">tonystark@gmail.com</p><form className="profile-fields" onSubmit={(event) => { event.preventDefault(); onSave(); }}><label>First Name<input defaultValue="Tony" /></label><label>Last Name<input defaultValue="Stark" /></label><label>Date of Birth<select defaultValue="04 March 1977"><option>04 March 1977</option><option>04 March 1978</option></select></label><label>Designation<select defaultValue="Teacher"><option>Teacher</option><option>Student</option></select></label><Button className="coral-button profile-save">Save Profile</Button>{feedback && <small role="status">{feedback}</small>}</form></div>;
}

function SettingsPanel({ notifications, setNotifications, theme, setTheme, feedback, onUpdate, onLogout }: { notifications: boolean; setNotifications: (value: boolean) => void; theme: "light" | "dark"; setTheme: (value: "light" | "dark") => void; feedback: string; onUpdate: () => void; onLogout: () => void }) {
  return <div className="settings-panel"><h1>Settings</h1><fieldset><legend>Notification</legend><RadioOption name="notifications" label="On" checked={notifications} onChange={() => setNotifications(true)} /><RadioOption name="notifications" label="Off" checked={!notifications} onChange={() => setNotifications(false)} /></fieldset><fieldset><legend>Theme</legend><RadioOption name="theme" label="Light" checked={theme === "light"} onChange={() => setTheme("light")} /><RadioOption name="theme" label="Dark" checked={theme === "dark"} onChange={() => setTheme("dark")} /></fieldset><form className="password-form" onSubmit={(event) => { event.preventDefault(); onUpdate(); }}><h2>Change Password</h2><label>Current Password<input type="password" /></label><label>New Password<input type="password" /></label><label>Confirm New Password<input type="password" /></label><Button className="update-password">Update Password</Button>{feedback && <small role="status">{feedback}</small>}</form><p className="feedback-link">Feedback</p><button type="button" className="logout-link" onClick={onLogout}>Logout</button></div>;
}

function RadioOption({ name, label, checked, onChange }: { name: string; label: string; checked: boolean; onChange: () => void }) {
  return <label className="radio-option"><input type="radio" name={name} checked={checked} onChange={onChange} /><span>{label}</span></label>;
}

function NotificationsPage() {
  return <div className="notifications-page"><h1>Notifications</h1><div className="notification-empty"><img src={notificationsEmpty} alt="A notification message with an alert symbol" /><p>No message notification</p></div></div>;
}

function BillsPage() {
  const [selected, setSelected] = useState(0);
  const transactions = [{ description: "Dish001", date: "04 Apr, 10:41", amount: 150 }, { description: "Dish014", date: "28 Mar, 12:32", amount: 10 }, { description: "Dish003", date: "26 Mar, 01:15", amount: 20 }, { description: "Dish023", date: "20 Mar, 10:20", amount: 75 }, { description: "Dish002", date: "17 Mar, 10:48", amount: 100 }, { description: "Dish001", date: "21 Feb, 03:05", amount: 15 }];
  return <><section className="transactions-panel"><h1>Transactions</h1><div className="transaction-table"><div className="transaction-header"><span>Description</span><span>Transaction ID</span><span>Date</span><span>Amount</span></div>{transactions.map((item, index) => <button className={`transaction-row${selected === index ? " chosen" : ""}`} key={`${item.description}-${item.date}`} onClick={() => setSelected(index)} type="button"><span>{item.description}</span><span>1347284340</span><span>{item.date}</span><span>₹ {item.amount}</span></button>)}</div></section><aside className="receipt-column"><h1>Receipt</h1><article className="receipt-card"><div className="receipt-success"><span>Transaction Successful</span><small>10:41 AM on 04 Feb 2022</small></div><div className="receipt-details"><span>Transaction ID</span><strong>1347284340</strong><span>Payment through</span><strong className="phonepe">◉ PhonePe</strong><span>Amount</span><strong>₹ {transactions[selected]?.amount ?? 150}</strong></div></article></aside></>;
}

const faqs = ["Can I cancel my order at any time ?", "Can I show screenshot of receipt ?", "I am unable to change password", "I have payment or refund related query", "I have a query related to placing an order"];

function SupportPage({ faq, setFaq }: { faq: number; setFaq: (value: number) => void }) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="support-page">
      <div className="support-content">
        <div className="support-intro"><h1>How can we help you ?</h1><p>If you cannot find answer to your question in our FAQ, you can always contact us.<br />We will answer to you shortly!</p></div>
        <form className="support-form" onSubmit={(event) => { event.preventDefault(); if (message.trim()) { setSent(true); setMessage(""); } }}>
          <textarea placeholder="Write a question or problem" value={message} onChange={(event) => { setMessage(event.target.value); setSent(false); }} />
          <Button type="submit" className="coral-button support-send">Send</Button>
          {sent && <small role="status">Message sent</small>}
        </form>
        <h2>Frequently asked questions</h2>
        <div className="faq-list">{faqs.map((question, index) => <button className={`faq-item${faq === index ? " open" : ""}`} key={question} type="button" onClick={() => setFaq(faq === index ? -1 : index)}><span className="faq-question">{question}<span>{faq === index ? "−" : "+"}</span></span>{faq === index && <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis pulvinar nisi sit lacinia congue sem fermentum lacus, faucibus. Vel mi nibh semper rutrum semper facilisi sed. Id eget massa in nulla mus et sed.</small>}</button>)}</div>
      </div>
    </section>
  );
}
