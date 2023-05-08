import { Form, useLoaderData,redirect, } from "react-router-dom";
import React, { useState } from 'react';

export async function action() {
    await fetchPokemonDetails();
    return redirect(`/pokemon`);
  }
  export async function loader() {
    const contact = null;
    return { contact };
  }
export default function About() {
  
  return (
    <div>
   <h1>about: This project was made by using the react</h1>
  </div>
);
  }