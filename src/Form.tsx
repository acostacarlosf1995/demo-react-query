import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";

import { specieOptions, userSchema } from "./validations/userSchema";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";

export type FormData = {
  characterName: string;
  specie: string;
  image: string;
  email: string;
};

export default function Form() {
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);

  const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
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
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("SUCCES", data);
  };

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
  //   width: 100%;
  //   padding: 10px 10px;
  //   margin: 8px 0;
  //   box-sizing: border-box;
  //   border: none;
  //   border-bottom: 2px solid #007bff;
  //   outline: none;
  //   transition: border-color 0.3s ease;
  //   appearance: none;

  //   &:focus {
  //     border-bottom: 2px solid #0056b3;
  //   }
  // `;

  return (
    <FormContainer>
      <FormTitle>
        Your characters are missing? Send us the info and we will be adding it
      </FormTitle>

      <FormRows onSubmit={handleSubmit(onSubmit)}>
        <FormLabel htmlFor="characterName"> Character Name</FormLabel>
        <FormInput
          {...register("characterName")}
          type="text"
          id="characterName"
        />
        {errors.characterName?.message && (
          <FormError>{`${errors.characterName?.message}`}</FormError>
        )}

        <Controller
          name="specie"
          control={control}
          render={({
            field: { value, onChange, onBlur, ref },
            fieldState: { error },
          }) => (
            <FormControl
              sx={{
                "& label": {
                  color: "#FFFFFFDE",
                  fontSize: "1rem",
                },
              }}
            >
              <Autocomplete
                onChange={(
                  _event: unknown,
                  item: (typeof specieOptions)[number] | null
                ) => {
                  onChange(item);
                }}
                value={value ?? null}
                options={specieOptions}
                sx={{
                  width: 350,
                  color: "#FFFFFFDE",
                  marginTop: "1em",
                  "& input": {
                    color: "#FFFFFFDE",
                  },
                  "& div": {
                    "& button": {
                      color: "#FFFFFFDE",
                    },
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    error={Boolean(error)}
                    onBlur={onBlur}
                    inputRef={ref}
                    label={"Select a specie"}
                  />
                )}
              />
              <FormHelperText
                sx={{
                  color: "error.main",
                }}
              >
                {error?.message ?? ""}
              </FormHelperText>
            </FormControl>
          )}
        />

        <FormLabel htmlFor="image">Image</FormLabel>
        <FormFile
          {...register("image")}
          type="file"
          name="image"
          onChange={onChangePicture}
        />
        {imgData && <FormImage src={imgData} alt="preview" />}

        <FormLabel htmlFor="email">Your email</FormLabel>
        <FormInput {...register("email")} type="email" id="email" />
        {errors.email?.message && (
          <FormError>{`${errors.email?.message}`}</FormError>
        )}

        <FormButton type="submit">Submit</FormButton>
      </FormRows>
    </FormContainer>
  );
}
