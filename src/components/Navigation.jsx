import { NavLink } from "react-router-dom";


const linkStyle = ({ isActive }) => ({
width:"100vh",

margin: "8px",
padding: "8px 12px",
borderRadius: 8,
textDecoration: "none",
fontWeight: 700,
fontSize: 50,
textAlign: "center",
background: isActive ? "#ae2020ff" : "#eee",
color: isActive ? "#fff" : "#111",
});


export default function Navigation() {
return (
<nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
<NavLink to="/" style={linkStyle}>Home</NavLink>
<NavLink to="/movies" style={linkStyle}>Movies</NavLink>
</nav>
);
}