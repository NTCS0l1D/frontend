import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Card, Container } from 'react-bootstrap';

export default function UserDetail() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`https://dummyjson.com/users/${id}`)
        .then(response => setUser(response.data))
        .catch(error => console.error('Erro ao buscar o usuário:', error));
    }
  }, [id]);

  if (!user) return <p>Carregando...</p>;

  return (
    <Container>
      <h1 className="my-4">Detalhes do Usuário</h1>
      <Card>
        <Card.Img variant="top" src={user.image} />
        <Card.Body>
          <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
          <Card.Text>Email: {user.email}</Card.Text>
          <Card.Text>Telefone: {user.phone}</Card.Text>
          <Card.Text>Gênero: {user.gender}</Card.Text>
          <Card.Text>Idade: {user.age}</Card.Text>
          <Card.Text>Data de Nascimento: {user.birthDate}</Card.Text>
          <Card.Text>Universidade: {user.university}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
