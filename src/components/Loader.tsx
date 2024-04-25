import { Oval } from "react-loader-spinner";

type LoaderProps = {
  height: string;
  width: string;
};

const Loader = ({ height, width }: LoaderProps) => {
  return (
    <>
      <Oval
        visible={true}
        height={height}
        width={width}
        color="#2196f3"
        secondaryColor="white"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </>
  );
};

export default Loader;
