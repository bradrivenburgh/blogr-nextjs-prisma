// Header.tsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className={styles.left}>
      <Link
        href="/"
        className={[styles.bold, styles.link].join(" ")}
        data-active={isActive("/")}
      >
        Feed
      </Link>
    </div>
  );

  let right = null;

  if (status === "loading") {
    left = (
      <div className={styles.left}>
        <Link
          href="/"
          className={[styles.bold, styles.link].join(" ")}
          data-active={isActive("/")}
        >
          Feed
        </Link>
      </div>
    );
    right = (
      <div className={styles.right}>
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className={styles.right}>
        <Link
          href="/api/auth/signin"
          data-active={isActive("/signup")}
          className={styles.link}
        >
          Log in
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className={styles.left}>
        <Link
          href="/"
          className={[styles.bold, styles.link].join(" ")}
          data-active={isActive("/")}
        >
          Feed
        </Link>
        <Link
          href="/drafts"
          data-active={isActive("/drafts")}
          className={[styles.bold, styles.link].join(" ")}
        >
          My drafts
        </Link>
      </div>
    );
    right = (
      <div className={styles.right}>
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <Link href="/create" className={styles.link}>
          <button>New post</button>
        </Link>
        <button onClick={() => signOut()}>Log out</button>
      </div>
    );
  }

  return (
    <nav className={styles.nav}>
      {left}
      {right}
    </nav>
  );
};

export default Header;
