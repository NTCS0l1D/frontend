import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup, Container } from 'react-bootstrap';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/users')
      .then(response => setUsers(response.data.users))
      .catch(error => console.error('Erro ao buscar usuários:', error));
  }, []);

  return (
    <Container>
      <h1 className="my-4">Lista de Usuários</h1>
      <ListGroup>
        {users.map(user => (
          <Card key={user.id} className="mb-3">
            <Card.Img variant="top" src={user.image} />
            <Card.Body>
              <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
              <Card.Text>Idade: {user.age}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Home;
