"use client";

import { AnimatePresence, motion } from "framer-motion";
import css from "styled-jsx/css";
import { FC } from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { useAppContext } from "../../context/app.context";
import Link from "next/link";

const { className, styles } = css.resolve`
  aside {
    position: fixed;
    z-index: 90;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: var(--main-light);
    padding: 200px 20px 130px;
    display: flex;
    flex-direction: column;
  }
  nav {
    display: grid;
    grid-auto-flow: row;
  }

  nav ul {
    display: grid;
    grid-gap: 16px;
    grid-auto-flow: row;
    font-size: 30px;
    font-weight: 500;
    color: var(--main-dark);
  }
  nav ul li {
    display: flex;
    grid-gap: 10px;
    overflow: hidden;
  }
  .social {
    margin-top: auto;
    display: grid;
    grid-gap: 5px;
    grid-auto-flow: column;
    width: fit-content;
  }
  .social li {
    overflow: hidden;
  }
`;

const MobileAside: FC = () => {
  const { menuIsOpen, setMenuIsOpen } = useAppContext();

  const variants = {
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.7,
      },
    }),
    hidden: { opacity: 0, y: 100 },
  };

  return (
    <AnimatePresence>
      {menuIsOpen && (
        <motion.aside
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {styles}
          <nav className={className}>
            <ul className={className}>
              <li className={className}>
                <motion.div
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                  className={className}
                  onClick={() => setMenuIsOpen(false)}
                >
                  <Link href="/">Категории</Link>
                </motion.div>
              </li>
              <li className={className} onClick={() => setMenuIsOpen(false)}>
                <motion.div
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                  className={className}
                >
                  <Link href="/about">About</Link>
                </motion.div>
              </li>
            </ul>
          </nav>
          <ul className={`social ${className}`}>
            <li className={className}>
              <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={variants}
                className={className}
              >
                <motion.a
                  href="http://instagram.com/_u/yulianalegkodumova/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiOutlineInstagram
                    style={{
                      width: "26px",
                      height: "26px",
                      fill: "var(--main-dark)",
                    }}
                  />
                </motion.a>
              </motion.div>
            </li>
            <li className={className}>
              <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={variants}
                className={className}
              >
                <a
                  href="tg://resolve?domain=YulianaLegkodumova"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTelegramPlane
                    style={{
                      width: "26px",
                      height: "26px",
                      fill: "var(--main-dark)",
                    }}
                  />
                </a>
              </motion.div>
            </li>
          </ul>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default MobileAside;
