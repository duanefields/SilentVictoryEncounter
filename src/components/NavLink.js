import React from "react"
import { Link } from "react-router-dom"

export default function NavLink(props) {
  return <Link {...props} className="nav-link" activeClassName="active" />
}
