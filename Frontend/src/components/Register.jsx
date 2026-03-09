import React from 'react'
import { useForm } from 'react-hook-form';

function Register() {
    let {register,handleSubmit,formState:{errors}}=useForm();
    function onSubmit(data){
        console.log(data);
    }
  return (
    <div>
        <p>Register Form</p>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register()} />
        </form>
    </div>
  )
}

export default Register