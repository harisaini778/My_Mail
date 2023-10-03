// import React from "react";
// import { Navbar, Nav, Container } from "react-bootstrap";
// import logo from "../assests/logo.png";

// const headerStyle = {
//   backgroundColor: "linear-gradient(45deg, #8e2de2, #4a00e0)",
// };

// const logoStyle = {
//   width: "60px",
//   height: "60px",
// };

// const brandTextStyle = {
//   fontSize: "24px",
//   color: "black",
// };

// const Header = () => {
//   return (
//     <Navbar collapseOnSelect expand="lg" variant="dark" style={headerStyle}>
//       <Container>
//         <Navbar.Brand href="#home">
//           <img src={logo} alt="logo" style={logoStyle} />
//           <span style={brandTextStyle}>MailBox</span>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="ml-auto">
//             <Nav.Link href="#home">Home</Nav.Link>
//             <Nav.Link href="#inbox">Inbox</Nav.Link>
//             {/* Add more menu items as needed */}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;
import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
//icons
import logo from "../assests/logo.png";
import HomeIcon from '../assests/Home.png';
import { BsArrowUpRight } from 'react-icons/bs';

const navbarStyle = {
  backgroundColor: '#400090',
  color: 'white',
  padding: '5px',
};


const navLinkStyle = {
  marginRight: '10px',
  color: 'white',
};

const upgradeButtonStyle = {
  marginLeft: 'auto',
  backgroundColor: '#f7bc09',
};

const headerStyle = {
  backgroundColor: "#674ea7",
  boxShadow: "0 2px 9px rgba(0, 0, 0, 0.15)",
};

const logoStyle = {
  width: "50px",
  height: "50px",
  marginRight: "10px",
};

const brandTextStyle = {
  fontSize: "24px",
  color: "white",
  fontFamily: 'cursive',
  fontStyle: 'italic',
};

const Header = () => {
  return (
    <>
      <Navbar expand="lg" variant="light" style={navbarStyle}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home" style={navLinkStyle}>
            HOME
          </Nav.Link>
          <Nav.Link href="#mail" style={navLinkStyle}>
            MAIL
          </Nav.Link>
          <Nav.Link href="#news" style={navLinkStyle}>
            NEWS
          </Nav.Link>
          <Nav.Link href="#cricket" style={navLinkStyle}>
            CRICKET
          </Nav.Link>
          <Nav.Link href="#finance" style={navLinkStyle}>
            FINANCE
          </Nav.Link>
          <Nav.Link href="#women" style={navLinkStyle}>
            WOMEN
          </Nav.Link>
          <Nav.Link href="#life" style={navLinkStyle}>
            LIFE
          </Nav.Link>
          <Nav.Link href="#weather" style={navLinkStyle}>
            WEATHER
          </Nav.Link>
          <Nav.Link href="#more" style={navLinkStyle}>
            MORE...
          </Nav.Link>
        </Nav>
        <Button variant="outline-light" style={upgradeButtonStyle}>
          Upgrade now <BsArrowUpRight style={{ marginLeft: '5px' }} />
        </Button>
      </Navbar.Collapse>
    </Navbar>

    <Navbar collapseOnSelect expand="lg" variant="dark" style={headerStyle}>
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt="logo" style={logoStyle} />
          <span style={brandTextStyle}>Connect !</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav style={{ marginLeft: 'auto' }}>
            <Nav.Link href="#inbox">User</Nav.Link>
            <img src={HomeIcon} alt="home-icon" style={{width: '30px', height: '30px'}}/>
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default Header;
