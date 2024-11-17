import Error from "../../components/Error/Error";

const NotFoundPage = () => {
  return <Error status={"404"} message={"Oops! Page not Found..."} />;
};

export default NotFoundPage;
