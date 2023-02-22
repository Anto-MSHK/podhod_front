import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import styles from "./Header.module.css";
export const Header = () => {
  return (
    <Navbar className={styles.header}>
      <NavbarBrand href="/">
        <h3 className={styles.name}>Подход</h3>
      </NavbarBrand>
    </Navbar>
  );
};
