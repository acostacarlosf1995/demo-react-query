import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";

import { userSchema } from "./validations/userSchema";

export default function Form() {
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `;

  const FormTitle = styled.h1`
    font-size: 2rem;
    margin-top: 2em;
  `;

  const FormRows = styled.form`
    display: flex;
    flex-direction: column;
  `;

  const FormLabel = styled.label`
    margin-top: 1em;
    margin-bottom: 0;
    text-align: initial;
  `;

  const FormButton = styled.button`
    margin-top: 1em;
    margin-bottom: 0.5em;
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    background-color: #007bff;
    border: none;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.3s ease;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }

    &:active {
      background-color: #004085;
    }
  `;

  const FormImage = styled.img`
    margin-top: 1em;
    margin-bottom: 0.5em;
    max-width: 200px;
  `;

  const FormInput = styled.input`
    width: 100%;
    padding: 10px 10px;
    margin: 6px 0;
    box-sizing: border-box;
    border: none;
    border-bottom: 2px solid #007bff;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
      border-bottom: 2px solid #0056b3;
    }
  `;

  const FormFile = styled.input`
    display: inline-block;
    padding: 10px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: none;
    border-bottom: 2px solid #007bff;
    color: #007bff;
    outline: none;
    transition: border-color 0.3s ease;

    &:hover {
      cursor: pointer;
      border-bottom: 2px solid #0056b3;
    }
  `;

  const FormError = styled.p`
    color: red;
    margin: 0;
    display: flex;
    justify-content: start;
  `;

  const FormSelect = styled.select`
    width: 100%;
    padding: 10px 10px;
    margin: 8px 0;
    box-sizing: border-box;
    border: none;
    border-bottom: 2px solid #007bff;
    outline: none;
    transition: border-color 0.3s ease;
    appearance:none;

    &:focus {
      border-bottom: 2px solid #0056b3;
    }
  `;

  return (
    <FormContainer>
      <FormTitle>
        Your characters are missing? Send us the info and we will be adding it
      </FormTitle>

      <FormRows
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <FormLabel htmlFor="characterName"> Character Name</FormLabel>
        <FormInput
          {...register("characterName")}
          type="text"
          id="characterName"
        />
        {errors.characterName?.message && (
          <FormError>{errors.characterName?.message}</FormError>
        )}

        <FormLabel htmlFor="specie">Specie</FormLabel>
        <FormSelect {...register("specie")} type="text" id="specie">
          <option value="human">Human</option>
          <option value="alien">Alien</option>
          <option value="other">Other</option>
        </FormSelect>
        {errors.specie?.message && (
          <FormError>{errors.specie?.message}</FormError>
        )}

        <FormLabel htmlFor="image">Image</FormLabel>
        <FormFile
          {...register("image")}
          type="file"
          name="image"
          onChange={onChangePicture}
        />
        {imgData && <FormImage src={imgData} alt="preview" />}
        {errors.image?.message && (
          <FormError>{errors.image?.message}</FormError>
        )}

        <FormLabel htmlFor="email">Your email</FormLabel>
        <FormInput {...register("email")} type="email" id="email" />
        {errors.email?.message && (
          <FormError>{errors.email?.message}</FormError>
        )}

        <FormButton type="submit">Submit</FormButton>
      </FormRows>
    </FormContainer>
  );
}
