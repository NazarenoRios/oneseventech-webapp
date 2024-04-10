import styled from 'styled-components'

export const Wrapper = styled.aside`
  font-family: Arial, Helvetica, sans-serif;
  width: 500px;
  padding: 20px;

  @media screen and (max-width: 600px) {
    width: 90%; /* Cambiamos el ancho a un porcentaje del ancho del contenedor padre en dispositivos móviles */
    max-width: 300px; /* Establecemos un ancho máximo para evitar que el aside se expanda demasiado en dispositivos muy pequeños */
    margin: 0 auto; /* Centramos el aside horizontalmente en dispositivos móviles */
  }
`
