// On importe les modules nécessaires
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

// On définit la fonction de composant Connexion
function Connexion() {
  // On utilise le hook useState pour gérer l'état des champs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // On utilise le hook useHistory pour gérer la redirection après la connexion
  const history = useHistory();

  // On définit la fonction handleSubmit qui sera appelée lors de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault(); // On empêche le comportement par défaut du formulaire

    // On effectue une requête POST vers l'API pour tenter la connexion
    try {
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });
      const data = response.data;

      // Si la connexion est réussie, on enregistre le token d'authentification dans le localStorage
      localStorage.setItem("token", data.token);

      // On redirige l'utilisateur vers la page d'accueil
      history.push("/");
    } catch (error) {
      // Si la connexion échoue, on affiche un message d'erreur
      setErrorMessage(error.response.data.message);
    }
  };

  // On retourne le formulaire de connexion
  return (
    <div className="connexion">
      <h2>Connexion</h2>
      <Form onSubmit={handleSubmit}>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Adresse email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrez votre adresse email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Se connecter
        </Button>
      </Form>
    </div>
  );
}

// On exporte la fonction de composant Connexion pour pouvoir l'utiliser ailleurs dans l'application
export default Connexion;