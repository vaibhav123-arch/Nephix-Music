import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Music2, Sparkles } from "lucide-react";
import gsap from "gsap";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [error, setError] = useState("");

  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const googleButtonRef = useRef(null);
  const loginCardRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    /* =========================
       GSAP LOGIN ENTRANCE
    ========================= */

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline
        .from(".login-glow", {
          opacity: 0,
          scale: 0.5,
          duration: 1.2,
          ease: "power3.out",
        })
        .from(
          loginCardRef.current,
          {
            opacity: 0,
            y: 45,
            scale: 0.96,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.7"
        )
        .from(
          ".login-brand > *",
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.45"
        )
        .from(
          ".login-content > *",
          {
            opacity: 0,
            y: 15,
            duration: 0.45,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.3"
        );

      /* Subtle floating glow */
      gsap.to(glowRef.current, {
        y: -20,
        x: 10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (window.google && googleButtonRef.current) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,

        callback: async (response) => {
          try {
            await googleLogin(response.credential);
            navigate("/");
          } catch {
            setError("Google login failed");

            gsap.fromTo(
              ".login-error",
              {
                x: -8,
              },
              {
                x: 8,
                duration: 0.08,
                repeat: 5,
                yoyo: true,
              }
            );
          }
        },
      });

      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        {
          theme: "outline",
          size: "large",
          width: 300,
        }
      );
    }
  }, [googleLogin, navigate]);

  return (
    <main className="login-screen">

      {/* Ambient background */}
      <div
        ref={glowRef}
        className="login-glow"
      />

      <div className="login-orb login-orb-one" />
      <div className="login-orb login-orb-two" />

      {/* Login card */}
      <section
        ref={loginCardRef}
        className="login-card"
      >

        {/* Brand */}
        <div className="login-brand">

          <div className="login-logo">
            <Music2 size={25} />
          </div>

          <p className="login-brand-name">
            Sangeet Sabha
          </p>

          <div className="login-line" />

        </div>

        {/* Content */}
        <div className="login-content">

          <div className="login-icon">
            <Sparkles size={18} />
          </div>

          <p className="login-kicker">
            ENTER THE MEHFIL
          </p>

          <h1>
            Welcome back.
          </h1>

          <p className="login-description">
            Return to your listening room and
            continue your journey through timeless music.
          </p>

          {error && (
            <p className="error login-error">
              {error}
            </p>
          )}

          <div
            ref={googleButtonRef}
            className="google-login"
          />

          <p className="login-footer-text">
            Your personal mehfil awaits.
          </p>

        </div>
      </section>

      <p className="login-bottom">
        A space for music, tradition &amp; connection
      </p>

    </main>
  );
};

export default Login;
