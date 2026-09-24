import { useMemo, useState } from "react";

const WHATSAPP_NUMBER = "254796681162";

const services = [
  {
    id: 1,
    category: "Instagram",
    icon: "◎",
    name: "Instagram Followers",
    description: "High-quality Instagram followers",
    price: 40,
    unit: "1K",
  },
  {
    id: 2,
    category: "Instagram",
    icon: "♥",
    name: "Instagram Likes",
    description: "Instagram post likes",
    price: 35,
    unit: "1K",
  },
  {
    id: 3,
    category: "TikTok",
    icon: "♪",
    name: "TikTok Followers",
    description: "TikTok profile followers",
    price: 50,
    unit: "1K",
  },
  {
    id: 4,
    category: "TikTok",
    icon: "▶",
    name: "TikTok Views",
    description: "Increase video views",
    price: 25,
    unit: "1K",
  },
  {
    id: 5,
    category: "Facebook",
    icon: "f",
    name: "Facebook Page Likes",
    description: "Grow your Facebook page",
    price: 45,
    unit: "1K",
  },
  {
    id: 6,
    category: "YouTube",
    icon: "▶",
    name: "YouTube Views",
    description: "YouTube video views",
    price: 30,
    unit: "1K",
  },
  {
    id: 7,
    category: "YouTube",
    icon: "▶",
    name: "YouTube Subscribers",
    description: "Grow your YouTube channel",
    price: 70,
    unit: "1K",
  },
  {
    id: 8,
    category: "X",
    icon: "𝕏",
    name: "X Followers",
    description: "Followers for X profiles",
    price: 55,
    unit: "1K",
  },
];

const categories = ["All", "Instagram", "TikTok", "Facebook", "YouTube", "X"];

function App() {
  const [page, setPage] = useState("home");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [quantity, setQuantity] = useState(1000);
  const [orders, setOrders] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory =
        category === "All" || service.category === category;

      const text =
        `${service.name} ${service.description} ${service.category}`.toLowerCase();

      return matchesCategory && text.includes(search.toLowerCase());
    });
  }, [category, search]);

  const openOrder = (service) => {
    setSelectedService(service);
    setQuantity(1000);
    setPage("order");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPrice = selectedService
    ? (selectedService.price * quantity) / 1000
    : 0;

  const showNotice = (message) => {
    setNotice(message);
    setTimeout(() => setNotice(""), 3500);
  };

  const placeDemoOrder = (event) => {
    event.preventDefault();

    if (!selectedService) return;

    const link = event.currentTarget.elements.link.value.trim();

    if (!link) {
      showNotice("Please enter your social media link.");
      return;
    }

    const order = {
      id: `CC-${Date.now().toString().slice(-7)}`,
      service: selectedService.name,
      quantity,
      total: totalPrice.toFixed(2),
      status: "Awaiting Payment",
      date: new Date().toLocaleDateString(),
    };

    setOrders((current) => [order, ...current]);
    showNotice("Order created. Connect PesaPal to complete payment.");
    setPage("orders");
  };

  const goTo = (destination) => {
    setPage(destination);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="site">

      {notice && (
        <div className="toast">
          <span>✓</span>
          {notice}
        </div>
      )}

      <header className="navbar">
        <div className="nav-inner">

          <button className="brand" onClick={() => goTo("home")}>
            <span className="brand-mark">C</span>
            <span>
              <strong>Cyber<span>Cute</span></strong>
              <small>SMM PANEL</small>
            </span>
          </button>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <button
              className={page === "home" ? "active" : ""}
              onClick={() => goTo("home")}
            >
              Home
            </button>

            <button
              className={page === "services" ? "active" : ""}
              onClick={() => goTo("services")}
            >
              Services
            </button>

            <button
              className={page === "order" ? "active" : ""}
              onClick={() => goTo("order")}
            >
              New Order
            </button>

            <button
              className={page === "orders" ? "active" : ""}
              onClick={() => goTo("orders")}
            >
              My Orders
            </button>
          </nav>

          <div className="nav-actions">
            <div className="balance">
              <small>Balance</small>
              <strong>KSh 0.00</strong>
            </div>

            <button
              className="add-funds"
              onClick={() =>
                showNotice("PesaPal payment integration will be connected here.")
              }
            >
              + Add Funds
            </button>
          </div>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </header>

      {page === "home" && (
        <>
          <section className="hero">
            <div className="hero-glow glow-one"></div>
            <div className="hero-glow glow-two"></div>

            <div className="hero-content">
              <div className="badge">
                <span className="pulse"></span>
                Fast • Secure • Reliable
              </div>

              <h1>
                Grow Your Social
                <span> Presence Faster.</span>
              </h1>

              <p>
                Professional social media services at affordable prices.
                Get more followers, likes, views and engagement from one
                simple dashboard.
              </p>

              <div className="hero-buttons">
                <button
                  className="primary-button"
                  onClick={() => goTo("services")}
                >
                  Explore Services <span>→</span>
                </button>

                <a
                  className="secondary-button"
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20CyberCute,%20I%20need%20support.`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp Support
                </a>
              </div>

              <div className="trust-row">
                <span>✓ Secure payments</span>
                <span>✓ Fast delivery</span>
                <span>✓ 24/7 support</span>
              </div>
            </div>
          </section>

          <section className="stats-section">
            <div className="stat-card">
              <strong>8+</strong>
              <span>Services</span>
            </div>
            <div className="stat-card">
              <strong>24/7</strong>
              <span>Support</span>
            </div>
            <div className="stat-card">
              <strong>Fast</strong>
              <span>Delivery</span>
            </div>
            <div className="stat-card">
              <strong>Secure</strong>
              <span>Payments</span>
            </div>
          </section>

          <section className="section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">POPULAR SERVICES</span>
                <h2>Choose what you want to grow</h2>
              </div>

              <button className="text-button" onClick={() => goTo("services")}>
                View all →
              </button>
            </div>

            <div className="service-grid">
              {services.slice(0, 6).map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onOrder={openOrder}
                />
              ))}
            </div>
          </section>

          <section className="how-section">
            <div className="section-heading centered">
              <span className="eyebrow">HOW IT WORKS</span>
              <h2>Start growing in 3 simple steps</h2>
            </div>

            <div className="steps">
              <div className="step">
                <div className="step-number">01</div>
                <h3>Choose a service</h3>
                <p>Select the social media service you need.</p>
              </div>

              <div className="step">
                <div className="step-number">02</div>
                <h3>Place your order</h3>
                <p>Enter your link and the quantity you want.</p>
              </div>

              <div className="step">
                <div className="step-number">03</div>
                <h3>Watch it grow</h3>
                <p>Track your order directly from your dashboard.</p>
              </div>
            </div>
          </section>
        </>
      )}

      {page === "services" && (
        <main className="page-container">
          <div className="page-title">
            <span className="eyebrow">SERVICES</span>
            <h1>All Services</h1>
            <p>Choose the service that fits your social media goals.</p>
          </div>

          <div className="filters">
            <div className="search-box">
              <span>⌕</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search services..."
              />
            </div>

            <div className="categories">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? "selected" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="service-grid">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onOrder={openOrder}
              />
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="empty-state">
              <div>⌕</div>
              <h3>No services found</h3>
              <p>Try another search or category.</p>
            </div>
          )}
        </main>
      )}

      {page === "order" && (
        <main className="page-container">
          <div className="page-title">
            <span className="eyebrow">NEW ORDER</span>
            <h1>Place an Order</h1>
            <p>Complete the form below to create your order.</p>
          </div>

          <div className="order-layout">
            <form className="order-form" onSubmit={placeDemoOrder}>
              <div className="form-group">
                <label>Service</label>

                <select
                  value={selectedService?.id || ""}
                  onChange={(event) => {
                    const service = services.find(
                      (item) => item.id === Number(event.target.value)
                    );
                    setSelectedService(service || null);
                  }}
                >
                  <option value="">Select a service</option>

                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} — KSh {service.price}/1K
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Social Media Link</label>

                <input
                  name="link"
                  type="url"
                  placeholder="https://instagram.com/yourprofile"
                  required
                />

                <small>
                  Enter the profile, post or video link where the service
                  should be delivered.
                </small>
              </div>

              <div className="form-group">
                <label>Quantity</label>

                <input
                  type="number"
                  min="100"
                  step="100"
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(Math.max(100, Number(event.target.value)))
                  }
                />

                <small>Minimum quantity: 100</small>
              </div>

              <button
                className="primary-button full-button"
                type="submit"
                disabled={!selectedService}
              >
                Create Order →
              </button>
            </form>

            <div className="order-summary">
              <div className="summary-icon">
                {selectedService?.icon || "C"}
              </div>

              <h3>{selectedService?.name || "Select a service"}</h3>

              <p>
                {selectedService?.description ||
                  "Your selected service will appear here."}
              </p>

              <div className="summary-line">
                <span>Price / 1K</span>
                <strong>
                  KSh {selectedService?.price?.toFixed(2) || "0.00"}
                </strong>
              </div>

              <div className="summary-line">
                <span>Quantity</span>
                <strong>{quantity.toLocaleString()}</strong>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <strong>KSh {totalPrice.toFixed(2)}</strong>
              </div>

              <div className="payment-note">
                <span>🔒</span>
                Secure payment via PesaPal
              </div>
            </div>
          </div>
        </main>
      )}

      {page === "orders" && (
        <main className="page-container">
          <div className="page-title">
            <span className="eyebrow">ORDERS</span>
            <h1>My Orders</h1>
            <p>Track your recent CyberCute orders.</p>
          </div>

          {orders.length === 0 ? (
            <div className="empty-state">
              <div>📦</div>
              <h3>No orders yet</h3>
              <p>Your orders will appear here after you place one.</p>

              <button
                className="primary-button"
                onClick={() => goTo("services")}
              >
                Browse Services
              </button>
            </div>
          ) : (
            <div className="orders-table">
              <div className="table-head">
                <span>Order ID</span>
                <span>Service</span>
                <span>Quantity</span>
                <span>Total</span>
                <span>Status</span>
              </div>

              {orders.map((order) => (
                <div className="table-row" key={order.id}>
                  <span className="order-id">{order.id}</span>
                  <span>{order.service}</span>
                  <span>{order.quantity.toLocaleString()}</span>
                  <span>KSh {order.total}</span>
                  <span>
                    <b className="status-pill">{order.status}</b>
                  </span>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      <footer>
        <div className="footer-inner">
          <div>
            <div className="footer-brand">
              <span className="brand-mark">C</span>
              <strong>Cyber<span>Cute</span></strong>
            </div>

            <p>
              Simple, fast and reliable social media services.
            </p>
          </div>

          <div className="footer-links">
            <button onClick={() => goTo("home")}>Home</button>
            <button onClick={() => goTo("services")}>Services</button>
            <button onClick={() => goTo("order")}>New Order</button>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="copyright">
          © {new Date().getFullYear()} CyberCute. All rights reserved.
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20CyberCute,%20I%20need%20help.`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp support"
      >
        <span>◉</span>
      </a>
    </div>
  );
}

function ServiceCard({ service, onOrder }) {
  return (
    <article className="service-card">
      <div className="service-top">
        <div className="service-icon">{service.icon}</div>

        <span className="service-category">{service.category}</span>
      </div>

      <h3>{service.name}</h3>

      <p>{service.description}</p>

      <div className="service-bottom">
        <div>
          <strong>KSh {service.price}</strong>
          <span> / {service.unit}</span>
        </div>

        <button onClick={() => onOrder(service)}>
          Order
        </button>
      </div>
    </article>
  );
}

export default App;
