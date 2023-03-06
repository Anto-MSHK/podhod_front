import React from "react";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import styles from "./Header.module.css";
export const Header = () => {
  return (
    <Navbar className={styles.header}>
      <NavbarBrand href="/">
        <h3 className={styles.name}>Подход</h3>
      </NavbarBrand>
      <Nav>
        <NavItem>
          <NavLink href='/registration' style={{fontWeight:'500', textDecoration:'none', color:'black'}}>Регистрация</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href='/event' style={{fontWeight:'500', textDecoration:'none', color:'black'}}>Список мероприятий</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href='/expocreate' style={{fontWeight:'500', textDecoration:'none', color:'black'}}>Создать мероприятие</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};
