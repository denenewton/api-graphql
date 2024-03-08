const InputRegister = ({ type, name, register, lable, errors }) => {
  return (
    <>
      <label id={name}>
        <span className="font-satoshi font-semibold text-base">{lable}</span>

        <input
          {...register(name, { required: true, minLength: 3 })}
          id={name}
          type={type}
          name={name}
          className="form_input"
        />
      </label>
      {errors.name?.type == "required" && <p>This fild must be fill out.</p>}
      {errors.name?.type == "minLength" && (
        <p>The name must be at least 3 characters.</p>
      )}
    </>
  );
};

export default InputRegister;
