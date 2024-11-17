const Error = ({ status, message }) => {
  return (
    <div>
      <p>{status}</p>
      <p>{message}</p>
    </div>
  );
};

export default Error;
