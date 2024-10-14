'use client'

import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"

export default function Pagina({ titulo, children }) {

  return (
    <>
      {/* Barra de Navegação */}
      <Navbar style={{ backgroundColor: '#FFFAF0' }}>
        <Container>
          <Navbar.Brand href="/" style={{ color: '#6A5ACD', fontWeight: 'bold' }}>Home</Navbar.Brand>
          <Nav className="me-auto">
            <NavDropdown title="Conversor" id="basic-nav-dropdown" style={{ color: '#333' }}>
              <NavDropdown.Item href="/formularios/conversor" style={{ backgroundColor: '#FFF0F5', color: '#6A5ACD' }}>
                Conversor de Moedas
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>

      {/* Barra de Titulo */}
      <div style={{ backgroundColor: '#7FFFD4', color: '#333', textAlign: 'center', padding: '20px 0' }}>
        <h1>{titulo}</h1>
      </div>

      {/* Conteúdo da Página */}
      <Container className="mt-4" style={{ backgroundColor: '#FFFAF0', padding: '20px', borderRadius: '10px' }}>
        {children}
      </Container>
    </>
  )
}