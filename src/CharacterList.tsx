import { useQuery } from "@tanstack/react-query";

import CharacterCard from "./components/CharacterCard";
import styled from "styled-components";
import Form from "./Form";

type CharacterData = {
  id?: number;
  character?: any;
};

const CharacterList = () => {
  const getCharacters = async () => {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    return data;
  };

  const CharacterListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 1rem;
    justify-content: center;
  `;

  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["characters"],
    queryFn: getCharacters,
  });

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    isSuccess && (
      <div>
        <CharacterListContainer>
          {data.results.map((character: CharacterData) => (
            <CharacterCard key={character.id} {...character} />
          ))}
        </CharacterListContainer>
        <Form />
      </div>
    )
  );
};

export default CharacterList;
