import { useQuery } from "@tanstack/react-query";
import { create } from 'zustand'

import CharacterCard from "./components/CharacterCard";
import styled from "styled-components";
import Form from "./Form";
import { useEffect } from "react";

type CharacterData = {
  id?: number;
  character?: () => void;
};

interface StoreData {
  characters: CharacterData;
  setCharacters: (characters: CharacterData) => void;
}

const useStore = create<StoreData>((set) => ({
  characters: [],
  setCharacters: (characters) => set({ characters }),
}));

const CharacterListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 1rem;
  justify-content: center;
`;

const CharacterList = () => {
  const { characters, setCharacters } = useStore();

  const getCharacters = async () => {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    return data;
  };

  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["characters"],
    queryFn: getCharacters,
  });

  useEffect(() => {
    if (isSuccess) {
      setCharacters(data.results);
    }
  }, [data, isSuccess, setCharacters]);

  console.log(characters);

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
