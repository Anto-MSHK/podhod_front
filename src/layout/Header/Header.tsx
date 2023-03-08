import React from "react";/* 
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap"; */
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__logo_container}>
        <NavLink to='/'><h3 className={styles.header__logo}>Подход</h3></NavLink>
      </div>
      <div className={styles.header__nav_links}>
        <NavLink to='/registration'><p>Регистрация</p></NavLink>
        <NavLink to='/event' ><p>Список мероприятий</p></NavLink>
        <NavLink to='/expocreate' ><p>Создать мероприятие</p></NavLink>
      </div>
    </div>
  );
};
