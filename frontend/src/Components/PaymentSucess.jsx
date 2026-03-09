import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {

  const [params] = useSearchParams();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {

    const sessionId = params.get("session_id");

    if (sessionId) {
      fetch(`http://localhost:8080/api/payments/confirm?sessionId=${sessionId}`, {
        method: "POST"
      });
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      window.location.href = "http://localhost:3000/books";
    }, 3000);

    return () => clearInterval(timer);

  }, []);

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <div style={styles.icon}>
          ✓
        </div>

        <h1 style={styles.title}>Payment Successful</h1>

        <p style={styles.text}>
          Your fine payment was completed successfully.
        </p>

        <p style={styles.redirect}>
          Redirecting to books in <b>{countdown}</b> seconds...
        </p>

      </div>

    </div>
  );
}

const styles = {

  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#FFE0B2,#FFB74D)",
    fontFamily: "Segoe UI, sans-serif"
  },

  card: {
    background: "white",
    padding: "50px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    width: "420px"
  },

  icon: {
    fontSize: "70px",
    color: "#FB8C00",
    marginBottom: "15px"
  },

  title: {
    color: "#E65100",
    marginBottom: "10px"
  },

  text: {
    color: "#555",
    marginBottom: "15px"
  },

  redirect: {
    color: "#FF6F00",
    fontSize: "14px"
  }
};