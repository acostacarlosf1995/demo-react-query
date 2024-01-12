import styled from "styled-components";

export default function CharacterCard({ character }) {
  const CharacterCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0.5rem;
    background-color: rgb(60, 62, 68);
    transition: 0.2s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    cursor: pointer;
    max-width: 300px;

    &:hover {
      transform: scale(1.05);
    }
  `;

  const CharacterCardTitle = styled.h2`
    font-size: 1.5rem;
    margin: 0;
    padding: 0.5rem;
    overflow-wrap: break-word;
  `;

  const CharacterCardImg = styled.img`
    border-radius: 0.5rem 0.5rem 0 0;
  `;

  return (
    <CharacterCardContainer>
      <CharacterCardImg src={character.image} alt={character.name} />
      <CharacterCardTitle>{character.name}</CharacterCardTitle>
      <p>{`${character.status} (${character.species})`}</p>
    </CharacterCardContainer>
  );
}
